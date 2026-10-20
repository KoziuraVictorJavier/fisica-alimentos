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
function balanced(s,pos){if(s[pos]!=='{') return ['',pos];let dep=1,i=pos+1;const start=i;while(i<s.length&&dep){if(s[i]==='{')dep++;else if(s[i]==='}')dep--;i++}return [s.slice(start,i-1),i]}
function latexToSpeech(input){
 let s=String(input||'').replace(/\\\[|\\\]|\\\(|\\\)/g,'').replace(/\$/g,'').replace(/\\left|\\right/g,'');
 // Recursively turn mathematical fractions into descriptive Spanish.
 for(let rounds=0;rounds<14;rounds++){
  const m=/\\(?:dfrac|tfrac|frac)\s*\{/.exec(s);if(!m)break;let start=m.index, a=balanced(s,start+m[0].length-1),p=a[1];while(s[p]===' ')p++;if(s[p]!=='{')break;const b=balanced(s,p);s=s.slice(0,start)+' fracción con numerador '+a[0]+' y denominador '+b[0]+' fin de fracción '+s.slice(b[1]);
 }
 s=s.replace(/\\sqrt\s*\{([^{}]+)\}/g,' raíz cuadrada de $1 fin de raíz ');
 const maps=[
 [/\\Delta\b/g,' delta '],[/\\delta\b/g,' delta '],[/\\alpha\b/g,' alfa '],[/\\beta\b/g,' beta '],[/\\gamma\b/g,' gamma '],[/\\eta\b/g,' eta '],[/\\rho\b/g,' ro '],[/\\sigma\b/g,' sigma '],[/\\tau\b/g,' tau '],[/\\varepsilon\b|\\epsilon\b/g,' épsilon '],[/\\mu\b/g,' mu '],[/\\pi\b/g,' pi '],[/\\omega\b/g,' omega '],[/\\theta\b/g,' teta '],[/\\lambda\b/g,' lambda '],[/\\infty\b/g,' infinito '],[/\\sum\b/g,' sumatoria '],[/\\int\b/g,' integral de '],[/\\dot\s*\{([^{}]+)\}/g,' $1 punto, tasa de $1 '],[/\\mathrm\s*\{([^{}]+)\}/g,' $1 '],[/\\text\s*\{([^{}]+)\}/g,' $1 '],[/\\underbrace\b/g,' '],[/\\overbrace\b/g,' '],[/\\approx\b|\\simeq\b/g,' aproximadamente igual a '],[/\\geq\b|\\ge\b/g,' mayor o igual que '],[/\\leq\b|\\le\b/g,' menor o igual que '],[/\\times\b|\\cdot\b/g,' por '],[/\\Rightarrow\b|\\rightarrow\b|\\to\b/g,' implica '],[/\\qquad|\\quad|\\,|\\;|\\!/g,' '],[/\\circ\b/g,' grados '],[/\\partial\b/g,' derivada parcial '],[/\\nabla\b/g,' gradiente ']
 ];for(const [re,rep] of maps)s=s.replace(re,rep);
 s=s.replace(/\bCOP_R\b/g,'coeficiente de desempeño frigorífico').replace(/\bCOP\b/g,'coeficiente de desempeño');
 s=s.replace(/\\(?:begin|end)\{[^}]+\}/g,' ').replace(/\\(?:displaystyle|mathit|mathbf|operatorname)\b/g,' ');
 s=s.replace(/\^\s*\{([^{}]+)\}/g,(_,x)=>' elevado a '+x+' ')
   .replace(/\^\s*(-?\d+|[A-Za-z])/g,(_,x)=> x==='2'?' al cuadrado ':x==='3'?' al cubo ':' elevado a '+x+' ')
   .replace(/_\s*\{([^{}]+)\}/g,(_,x)=>' subíndice '+x+' ').replace(/_([A-Za-z0-9]+)/g,' subíndice $1 ')
   .replace(/\\/g,' ').replace(/[{}]/g,' ').replace(/&/g,' ')
   .replace(/=/g,' igual a ').replace(/\+/g,' más ').replace(/−|-/g,' menos ').replace(/\*/g,' por ').replace(/\//g,' dividido por ')
   .replace(/≥/g,' mayor o igual que ').replace(/≤/g,' menor o igual que ')
   .replace(/\bkg\b/g,' kilogramos ').replace(/\bkW\b/g,' kilovatios ').replace(/\bkJ\b/g,' kilojulios ').replace(/\bMJ\b/g,' megajulios ').replace(/\bK\b/g,' kelvin ').replace(/\bW\b/g,' vatios ').replace(/\bJ\b/g,' julios ').replace(/\bm\b/g,' metros ');
 s=s.replace(/\s+/g,' ').trim();return s||'expresión matemática';
}
function textWithMath(txt){
 let t=String(txt||'').replace(/\\\[([\s\S]*?)\\\]|\\\(([\s\S]*?)\\\)/g,(_,a,b)=>' Ecuación: '+latexToSpeech(a||b)+'. Fin de ecuación. ');
 return t.replace(/\s+/g,' ').trim();
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
  if(el.classList.contains('eq'))raw='Ecuación: '+latexToSpeech(raw)+'. Fin de ecuación.';
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
