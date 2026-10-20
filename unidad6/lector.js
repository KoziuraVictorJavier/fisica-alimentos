/* Lector de apunte – Unidad 6. Web Speech API, sin dependencias adicionales. */
(() => {
'use strict';
const speech = window.speechSynthesis;
const sections = [...document.querySelectorAll('main > section')];
if (!speech || !window.SpeechSynthesisUtterance || !sections.length) {
  const p=document.createElement('div');p.className='reader-unavailable';p.textContent='El lector por voz no está disponible en este navegador. El apunte sigue funcionando normalmente.';document.body.append(p);return;
}
// Preserve original TeX before asynchronous MathJax typesetting transforms text nodes.
for(const e of document.querySelectorAll('main .eq, main p, main li, main h2, main h3, main h4, main figcaption, main .answer, main .result')) {
  if(!e.hasAttribute('data-reader-text')) e.setAttribute('data-reader-text',e.textContent.trim());
}
const ui=document.createElement('div');ui.id='reader-ui';ui.setAttribute('role','region');ui.setAttribute('aria-label','Lector de la Unidad 6');
ui.innerHTML=`<div class="reader-primary"><span class="reader-title">🔊 Lector del apunte</span><select id="reader-section" aria-label="Sección de lectura"></select><button id="reader-once" type="button" title="Leer únicamente el apartado seleccionado">Leer apartado</button><button id="reader-auto" type="button" title="Leer apartados sucesivos automáticamente">Lectura continua</button><button id="reader-pause" type="button">Pausar</button><button id="reader-stop" type="button">Detener</button><button id="reader-min" type="button" aria-label="Minimizar lector">−</button></div><div class="reader-secondary"><button id="reader-prev" type="button">◀ Apartado</button><button id="reader-next" type="button">Apartado ▶</button><label>Voz <select id="reader-voice" aria-label="Voz de lectura"></select></label><label>Velocidad <input id="reader-speed" type="range" min="0.7" max="1.4" value="0.95" step="0.05"><output id="reader-speed-label">0,95×</output></label><span id="reader-state" aria-live="polite">Listo para leer.</span></div>`;
document.body.append(ui);
const $=id=>document.getElementById(id);
const secSel=$('reader-section'),voiceSel=$('reader-voice'),speed=$('reader-speed'),status=$('reader-state');
sections.forEach((s,i)=>{const opt=new Option(`${i+1}. ${s.dataset.title||s.querySelector('h2')?.textContent||'Apartado'}`,String(i));secSel.add(opt)});
let voices=[],chosenVoice='',position=0,items=[],cursor=0,active=false,paused=false,continuous=false,token=0,utterance=null,highlight=null;
function populateVoices(){voices=speech.getVoices();const old=voiceSel.value||chosenVoice;voiceSel.replaceChildren();let preferred=voices.filter(v=>/^es([-_]|$)/i.test(v.lang));if(!preferred.length)preferred=voices;
 preferred.forEach(v=>voiceSel.add(new Option(`${v.name} (${v.lang})`,v.voiceURI)));
 if(preferred.length){const def=preferred.find(v=>/es[-_]AR/i.test(v.lang))||preferred.find(v=>/es/i.test(v.lang))||preferred[0];voiceSel.value=preferred.some(v=>v.voiceURI===old)?old:def.voiceURI;chosenVoice=voiceSel.value}
}
populateVoices();speech.addEventListener?.('voiceschanged',populateVoices);
voiceSel.onchange=()=>{chosenVoice=voiceSel.value};speed.oninput=()=>{$('reader-speed-label').textContent=Number(speed.value).toFixed(2).replace('.',',')+'×'};
// Interpretación matemática estructurada: nunca verbaliza delimitadores o comandos TeX.
// Mantiene el código matemático original que se capturó antes de MathJax.
const GreekWords={alpha:'alfa',beta:'beta',gamma:'gamma',Gamma:'gamma',delta:'delta',Delta:'delta',epsilon:'épsilon',varepsilon:'épsilon',eta:'eta',theta:'teta',vartheta:'teta',lambda:'lambda',mu:'mu',nu:'nu',pi:'pi',rho:'ro',sigma:'sigma',Sigma:'sigma',tau:'tau',phi:'fi',varphi:'fi',omega:'omega',Omega:'omega',infty:'infinito'};
const MathCommands={times:'por',cdot:'por',ast:'por',pm:'más o menos',mp:'menos o más',approx:'aproximadamente igual a',simeq:'aproximadamente igual a',sim:'aproximadamente',equiv:'equivalente a',ge:'mayor o igual que',geq:'mayor o igual que',le:'menor o igual que',leq:'menor o igual que',neq:'distinto de',ne:'distinto de',to:'tiende a',rightarrow:'tiende a',Rightarrow:'por lo tanto',Longrightarrow:'por lo tanto',leftrightarrow:'en ambos sentidos',partial:'derivada parcial',nabla:'gradiente',int:'integral de',sum:'sumatoria de',prod:'producto de',forall:'para todo',in:'pertenece a',propto:'proporcional a',circ:'grados',degree:'grados',prime:'prima',ldots:'y así sucesivamente',dots:'y así sucesivamente',quad:' ',qquad:' ',textdegree:'grados',mid:'tal que',vert:'valor absoluto de',langle:' ',rangle:' ',mathrm:'',text:'',operatorname:'',mathit:'',mathbf:'',mathsf:'',mathcal:'',displaystyle:'',textstyle:'',left:'',right:'',big:'',Big:'',bigl:'',bigr:'',biggl:'',biggr:'','!':' ', ',':' ',';':' ',':':' ', ' ':' '};
function mathSpeak(source){
 const input=String(source||'').replace(/\\\[|\\\]|\\\(|\\\)/g,'').replace(/\$\$/g,'')
  .replace(/\bmc(?=\\|[A-Z({])/g,'m\\cdot c').replace(/\bkA(?=[(\\])/g,'k\\cdot A')
  .replace(/(\d)\s*\(/g,'$1\\cdot(').replace(/\)\s*\(/g,')\\cdot(').trim();
 let pos=0;
 function spaces(){while(pos<input.length&&/\s/.test(input[pos]))pos++;}
 function argument(){
  spaces();
  if(input[pos]==='{'){pos++;const content=read('}');if(input[pos]==='}')pos++;return content;}
  if(input[pos]==='\\')return atom();
  if(pos>=input.length)return '';
  if(/[0-9]/.test(input[pos])){ // A bare TeX argument consumes a single character, not a whole number.
    return input[pos++];
  }
  return atom();
 }
 function group(){pos++;const content=read('}');if(input[pos]==='}')pos++;return content;}
 function plainMathText(t){return String(t).replace(/\\(?:,|;|!|:|quad|qquad)/g,' ').replace(/[_{}]/g,' ').replace(/\s+/g,' ').trim();}
 function command(){
  pos++;
  let name='';
  while(pos<input.length&&/[A-Za-z]/.test(input[pos]))name+=input[pos++];
  if(!name&&pos<input.length)name=input[pos++];
  if(name==='frac'||name==='dfrac'||name==='tfrac'||name==='cfrac'){
   const numerator=argument(),denominator=argument();
   return ` ${numerator} dividido por ${denominator} `;
  }
  if(name==='sqrt'){
   spaces();let index='';if(input[pos]==='['){pos++;let start=pos;while(pos<input.length&&input[pos]!==']')pos++;index=input.slice(start,pos);if(input[pos]===']')pos++;}
   const body=argument();return index?` raíz de índice ${index} de ${body} `:` raíz cuadrada de ${body} `;
  }
  if(name==='dot'||name==='ddot'||name==='bar'||name==='overline'||name==='hat'||name==='vec'||name==='tilde'){
   const body=argument();
   if(name==='dot')return ` tasa de cambio de ${body} `;
   if(name==='ddot')return ` segunda derivada temporal de ${body} `;
   if(name==='vec')return ` vector ${body} `;
   return ` ${body} `;
  }
  if(name==='begin'||name==='end'){argument();return ' ';}
  if(['mathrm','text','operatorname','mathit','mathbf','mathsf','mathcal','textbf','textrm'].includes(name)){
   spaces();
   const inner=argument();return ` ${inner} `;
  }
  if(name==='left'||name==='right'){
   if('()[]|.'.includes(input[pos]||''))pos++;
   return ' ';
  }
  if(name==='underbrace'||name==='overbrace'){return argument();}
  if(name==='overset'||name==='underset'){const annotation=argument(),body=argument();return body+' '+annotation;}
  if(name==='color'){argument();return argument();}
  if(name==='ce'){return argument();}
  if(name==='log'||name==='ln'||name==='sin'||name==='cos'||name==='tan'||name==='exp'||name==='lim'||name==='max'||name==='min')return ' '+({ln:'logaritmo natural',sin:'seno',cos:'coseno',tan:'tangente',exp:'exponencial',lim:'límite',log:'logaritmo',max:'máximo',min:'mínimo'}[name])+' ';
  return ' '+(GreekWords[name]||MathCommands[name]||(name.length===1?name:name.replace(/([a-z])([A-Z])/g,'$1 $2')))+' ';
 }
 function atom(){
  if(pos>=input.length)return '';
  const ch=input[pos];
  if(ch==='{')return group();
  if(ch==='\\')return command();
  if(/[A-Za-z0-9]/.test(ch)){const start=pos;while(pos<input.length&&/[A-Za-z0-9]/.test(input[pos]))pos++;return input.slice(start,pos);}
  pos++;
  const characters={'=':'igual a','+':'más','-':'menos','−':'menos','*':'por','×':'por','·':'por','/':'dividido por','<':'menor que','>':'mayor que','≈':'aproximadamente igual a','≤':'menor o igual que','≥':'mayor o igual que','→':'tiende a','°':'grados','%':'por ciento','∞':'infinito','(':'',')':'', '[':'',']':'','&':'',',':',',';':'.',':':':','\n':' ','|':'', '!':''};
  return Object.prototype.hasOwnProperty.call(characters,ch)?` ${characters[ch]} `:ch;
 }
 function read(stop){
  const tokens=[];
  while(pos<input.length && (!stop||input[pos]!==stop)){
   spaces();if(pos>=input.length||(stop&&input[pos]===stop))break;
   if(input[pos]==='^'||input[pos]==='_'){
    const mark=input[pos++],val=argument();
    if(mark==='^'){
     const trimmed=val.trim();tokens.push(trimmed==='2'?' al cuadrado ':trimmed==='3'?' al cubo ':trimmed==='menos 1'?' a la menos uno ':` elevado a ${val} `);
    } else {
     const v=val.trim();
     // Subíndices en magnitudes físicas se pronuncian como un modificador.
     tokens.push(v==='0'?' inicial ':v==='f'?' final ':v==='i'?' inicial ':v==='s'?' de superficie ':v==='h'?' caliente ':v==='c'?' fría ':` subíndice ${val} `);
    }
    continue;
   }
   tokens.push(atom());
  }
  return tokens.join(' ');
 }
 let result=read('');
 result=result.replace(/\\[A-Za-z]+/g,' ')
  .replace(/\bkg\b/gi,' kilogramos ').replace(/\bmg\b/g,' miligramos ').replace(/\bkW\b/g,' kilovatios ')
  .replace(/\bkJ\b/g,' kilojulios ').replace(/\bMJ\b/g,' megajulios ').replace(/\bK\b/g,' kelvin ')
  .replace(/\bW\b/g,' vatios ').replace(/\bJ\b/g,' julios ').replace(/\bPa\b/g,' pascales ')
  .replace(/\bHz\b/g,' hercios ').replace(/\bmm\b/g,' milímetros ').replace(/\bm\b(?=\s+(?:al cuadrado|al cubo)\b)/g,' metros ')
  .replace(/\bmathrm\b/g,' ')
  .replace(/(\d)\s*,\s*(\d)/g,'$1 coma $2').replace(/\s+([,.;:])/g,'$1').replace(/\s+/g,' ').trim();
 return result;
}
function textWithMath(raw){
 const text=String(raw||'');
 // Every inline/display TeX region becomes a spoken mathematical expression;
 // no repetitive introductory or closing announcements.
 const out=text.replace(/\\\[([\s\S]*?)\\\]|\\\(([\s\S]*?)\\\)/g,(_,display,inline)=>{
   const spoken=mathSpeak(display===undefined?inline:display);
   return ' '+spoken+'. ';
 });
 return out.replace(/\s+/g,' ').trim();
}
function collect(sec){const out=[];
 const nodes=sec.querySelectorAll('h2,h3,h4,p,li,.eq,figcaption,figure>svg,.sim>svg,.sim .result,.cycle-live-results,.phase-svg,details>summary,table tr');
 nodes.forEach(el=>{
  if(el.closest('#reader-ui'))return;
  if(el.closest('.eq')&& !el.classList.contains('eq'))return;
  if(el.closest('table')&&el.tagName!=='TR')return;
  if(el.closest('details:not([open])')&&!el.matches('details > summary'))return;
  if(el.closest('li')&&el.tagName!=='LI')return;
  if(el.matches('figure > svg,.sim > svg,.phase-svg')){
   const title=el.getAttribute('aria-label')||el.closest('figure')?.getAttribute('aria-label')||'';
   if(title)out.push({el,text:'Gráfico. '+title+'. Se dispone de su representación visual en la pantalla.'});return;
  }
  if(el.matches('figcaption')){
   const txt=el.getAttribute('data-reader-text')||el.textContent;
   if(txt)out.push({el,text:'Descripción del gráfico. '+textWithMath(txt)});return;
  }
  if(el.matches('table tr')){
   let row=[...el.children].map(c=>textWithMath(c.textContent.trim())).filter(Boolean).join('. ');
   if(row)out.push({el,text:'Fila de tabla. '+row});return;
  }
  let raw=el.getAttribute('data-reader-text')||el.textContent||'';
  if(el.classList.contains('eq'))raw=textWithMath(raw);
  else raw=textWithMath(raw);
  if(raw)out.push({el,text:raw});
 });
 return out.flatMap(item=>{
   const s=item.text.replace(/\s+/g,' ').trim();if(s.length<260)return [{...item,text:s}];
   const chunks=s.match(/.{1,190}(?:[.!?;,:](?=\s)|\s|$)|.{1,190}/g)||[s];return chunks.filter(x=>x.trim()).map(x=>({...item,text:x.trim()}));
 });
}
function mark(el){if(highlight)highlight.classList.remove('reader-current');highlight=el;if(el){el.classList.add('reader-current');if(el.getBoundingClientRect().top<115||el.getBoundingClientRect().bottom>window.innerHeight-155)el.scrollIntoView({behavior:'smooth',block:'center'})}}
function clearSpeech(){token++;active=false;paused=false;speech.cancel();utterance=null;mark(null);$('reader-pause').textContent='Pausar'}
function start(mode){clearSpeech();continuous=mode==='all';position=Number(secSel.value)||0;items=collect(sections[position]);cursor=0;active=true;status.textContent=`${items.length} fragmentos · ${sections[position].dataset.title||'Apartado'}`;readNext(token)}
function readNext(own){if(!active||own!==token||paused)return;
 if(cursor>=items.length){if(continuous&&position<sections.length-1){position++;secSel.value=String(position);items=collect(sections[position]);cursor=0;sections[position].scrollIntoView({behavior:'smooth',block:'start'});status.textContent='Apartado '+(position+1)+' de '+sections.length;readNext(own);return}clearSpeech();status.textContent='Lectura finalizada.';return}
 const item=items[cursor++];mark(item.el);const u=new SpeechSynthesisUtterance(item.text);utterance=u;const v=voices.find(v=>v.voiceURI===voiceSel.value);if(v)u.voice=v;u.lang=v?.lang||'es-AR';u.rate=Number(speed.value);u.pitch=1;
 u.onend=()=>{if(own===token)readNext(own)};
 u.onerror=e=>{if(own!==token||!active)return;if(e.error==='interrupted'||e.error==='canceled')return;status.textContent='No se pudo leer un fragmento. Se continúa.';readNext(own)};
 status.textContent=`Apartado ${position+1}/${sections.length} · fragmento ${cursor}/${items.length}`;speech.speak(u);
}
$('reader-once').onclick=()=>start('section');$('reader-auto').onclick=()=>start('all');
$('reader-pause').onclick=()=>{
 if(!active)return;
 if(paused){paused=false;$('reader-pause').textContent='Pausar';speech.resume();status.textContent='Lectura reanudada.'}
 else{paused=true;$('reader-pause').textContent='Reanudar';speech.pause();status.textContent='Lectura pausada.'}
};
$('reader-stop').onclick=()=>{clearSpeech();status.textContent='Lectura detenida.'};
function go(n){const was=active,mode=continuous?'all':'section';clearSpeech();position=Math.max(0,Math.min(sections.length-1,n));secSel.value=String(position);sections[position].scrollIntoView({behavior:'smooth',block:'start'});status.textContent='Seleccionado: '+(sections[position].dataset.title||'Apartado');if(was)start(mode)}
$('reader-prev').onclick=()=>go(Number(secSel.value)-1);$('reader-next').onclick=()=>go(Number(secSel.value)+1);
secSel.onchange=()=>go(Number(secSel.value));
$('reader-min').onclick=()=>{ui.classList.toggle('reader-collapsed');$('reader-min').textContent=ui.classList.contains('reader-collapsed')?'+':'−'};
window.addEventListener('pagehide',()=>speech.cancel());
})();
