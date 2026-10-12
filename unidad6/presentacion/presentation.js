
const slides=[...document.querySelectorAll('.slide')];
let current=0,notesOpen=false,utter=null;
let autoplay=false, speechToken=0, manuallyPaused=false, speechStarted=false;
const speechStatus=document.getElementById('speechStatus');
const autoButton=document.getElementById('auto');
const pauseButton=document.getElementById('pause');
function updateSpeechUI(message){
 autoButton.setAttribute('aria-pressed',String(autoplay));
 pauseButton.setAttribute('aria-pressed',String(manuallyPaused));
 if(message)speechStatus.textContent=message;
}
function cancelVoice(){
 ++speechToken;
 utter=null;
 speechStarted=false;
 if('speechSynthesis' in window){
   window.speechSynthesis.cancel();
   if(window.speechSynthesis.paused)window.speechSynthesis.resume();
 }
}
function stopPlayback(message='Lectura detenida'){
 autoplay=false;manuallyPaused=false;cancelVoice();updateSpeechUI(message);
}
function readCurrent(automatic){
 if(!('speechSynthesis' in window)){stopPlayback('Este navegador no admite voz');return;}
 cancelVoice();manuallyPaused=false;autoplay=!!automatic;
 const myToken=speechToken;
 const slide=slides[current];
 const note=(notes[slide.id]||{}).guion||'';
 if(!note.trim()){
   if(autoplay&&current<slides.length-1){jump(current+1,true);}
   else stopPlayback('No hay guion para esta página');
   return;
 }
 utter=new SpeechSynthesisUtterance(note);
 utter.lang='es-AR';utter.rate=.94;utter.pitch=1;
 utter.onstart=()=>{if(myToken!==speechToken)return;speechStarted=true;updateSpeechUI(`Leyendo ${current+1} de ${slides.length}`)};
 utter.onend=()=>{
   if(myToken!==speechToken)return;
   utter=null;speechStarted=false;
   if(autoplay){
     if(current<slides.length-1)jump(current+1,true);
     else stopPlayback('Finalizada la presentación');
   }else updateSpeechUI('Guion finalizado');
 };
 utter.onerror=ev=>{
   if(myToken!==speechToken||ev.error==='canceled'||ev.error==='interrupted')return;
   stopPlayback(`Error de voz: ${ev.error}`);
 };
 updateSpeechUI(automatic?'Iniciando lectura automática':'Iniciando lectura');
 window.speechSynthesis.speak(utter);
}

const byId=Object.fromEntries(slides.map((s,i)=>[s.id,i]));
const notes=window.presentationNotes||{};
const noteUpload=document.getElementById('noteUpload');if(noteUpload)noteUpload.addEventListener('change',async e=>{const f=e.target.files&&e.target.files[0];if(!f)return;try{const imported=JSON.parse(await f.text());let count=0;for(const [id,obj] of Object.entries(imported)){if(notes[id]&&typeof obj.guion==='string'){notes[id].guion=obj.guion;count++}}document.getElementById('noteText').textContent=notes[slides[current].id]?.guion||'Sin guion';document.getElementById('uploadStatus').textContent=count+' guiones cargados';}catch(err){document.getElementById('uploadStatus').textContent='Archivo JSON no válido';}});
function jump(i,continueAuto=false){if(!continueAuto){stopPlayback("Lectura detenida al cambiar de página");}else{cancelVoice();}current=Math.max(0,Math.min(slides.length-1,i));slides.forEach((s,j)=>s.classList.toggle('active',j===current));const s=slides[current];window.location.hash=s.id;document.getElementById('slideSel').value=String(current);document.getElementById('status').textContent=`${current+1} / ${slides.length} · Clase ${s.dataset.class}`;document.getElementById('bar').style.width=((current+1)/slides.length*100)+'%';document.querySelectorAll('.nav button[data-slide]').forEach(b=>b.classList.toggle('active',+b.dataset.slide===current));document.getElementById('noteText').textContent=(notes[s.id]&&notes[s.id].guion)||'Sin guion';window.scrollTo({top:0,behavior:'instant'});if(window.MathJax&&MathJax.typesetPromise){MathJax.typesetPromise([s]).catch(()=>{});} drawSims();if(continueAuto)readCurrent(true);}
document.getElementById('next').onclick=()=>jump(current+1);document.getElementById('prev').onclick=()=>jump(current-1);document.getElementById('slideSel').onchange=e=>jump(+e.target.value);document.getElementById('toggleNotes').onclick=()=>{notesOpen=!notesOpen;document.getElementById('notesPanel').classList.toggle('open',notesOpen)};document.getElementById('zen').onclick=()=>document.body.classList.toggle('zen');document.getElementById('tts').onclick=()=>{stopPlayback();readCurrent(false)};
document.getElementById('auto').onclick=()=>{if(autoplay)stopPlayback();else readCurrent(true)};
document.getElementById('pause').onclick=()=>{
 if(!('speechSynthesis' in window))return;
 if(!speechSynthesis.speaking&&!speechSynthesis.paused)return;
 if(speechSynthesis.paused){speechSynthesis.resume();manuallyPaused=false;updateSpeechUI('Lectura reanudada');}
 else{speechSynthesis.pause();manuallyPaused=true;updateSpeechUI('Lectura en pausa');}
};
document.getElementById('stop').onclick=()=>stopPlayback();

document.addEventListener('keydown',e=>{if(e.target.matches('input,textarea,select'))return;if(e.key==='ArrowRight'||e.key==='PageDown'){e.preventDefault();jump(current+1)}if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();jump(current-1)}if(e.key==='Escape'){document.getElementById('zoom').classList.remove('open');document.getElementById('notesPanel').classList.remove('open')}if(e.key.toLowerCase()==='g')document.getElementById('toggleNotes').click()});
document.querySelectorAll('.infographic img').forEach(im=>im.addEventListener('dblclick',()=>{document.getElementById('zoomImg').src=im.src;document.getElementById('zoom').classList.add('open')}));document.getElementById('closeZoom').onclick=()=>document.getElementById('zoom').classList.remove('open');document.getElementById('zoom').addEventListener('click',e=>{if(e.target.id==='zoom')e.currentTarget.classList.remove('open')});
function format(n,k=1){return n.toLocaleString('es-AR',{minimumFractionDigits:k,maximumFractionDigits:k})}
function drawSims(){const id=slides[current].id;const sim=slides[current].querySelector('[data-sim]');if(!sim)return;const t=sim.dataset.sim;
if(t==='convert'){let v=+document.getElementById('s-temp').value;document.getElementById('s-temp-c').textContent=v+' °C';document.getElementById('s-temp-k').textContent=format(v+273.15,2)+' K';document.getElementById('s-temp-f').textContent=format(1.8*v+32,1)+' °F';document.getElementById('temp-dot').setAttribute('cx',40+(v+40)*680/180);document.getElementById('temp-dot').setAttribute('cy',124-(v+40)*108/180)}
if(t==='wall'){const L=+document.getElementById('wall-l').value/100,k=+document.getElementById('wall-k').value;const R=L/k,Q=20/R;document.getElementById('wall-q').textContent='Potencia: '+format(Q,1)+' W';document.getElementById('wall-r').textContent='R: '+format(R,3)+' K/W';}
if(t==='carnot'){const TH=+document.getElementById('carnot-th').value,TC=+document.getElementById('carnot-tc').value;document.getElementById('carnot-eta').textContent='η ideal: '+format(100*(1-TC/TH),1)+' %';document.getElementById('carnot-tr').textContent='TH/TC = '+format(TH/TC,2); const n=1,R=1,gamma=1.4,Th=TH/300,Tc=TC/300,V1=1.6,V2=2.65,V3=V2*Math.pow(Th/Tc,1/(gamma-1)),V4=V1*Math.pow(Th/Tc,1/(gamma-1));const A=[{v:V1,p:Th/V1},{v:V2,p:Th/V2},{v:V3,p:Tc/V3},{v:V4,p:Tc/V4}];let segs=[[V1,V2,Th,'iso','#dd6e3b'],[V2,V3,0,'adi','#346dae'],[V3,V4,Tc,'iso','#37a37f'],[V4,V1,0,'adi','#8251b3']];let sampled=[];segs.forEach((seg,j)=>{let pts=[];for(let i=0;i<=50;i++){let v=seg[0]+(seg[1]-seg[0])*i/50;let p=seg[3]==='iso'?seg[2]/v:A[j].p*Math.pow(A[j].v/v,gamma);pts.push([v,p]);}sampled.push(pts)});let mx=Math.max(...sampled.flat().map(p=>p[0])),my=Math.max(...sampled.flat().map(p=>p[1]));let map=p=>[(90+580*(p[0]-0.7)/(mx-0.5)),(280-240*p[1]/(my*1.1))];const out=sampled.map((pts,i)=>{let path=pts.map((p,j)=>{let [x,y]=map(p);return(j?'L':'M')+x.toFixed(1)+','+y.toFixed(1)}).join(' ');return `<path d="${path}" fill="none" stroke="${segs[i][4]}" stroke-width="4"/>`}).join('')+A.map((p,i)=>{let [x,y]=map([p.v,p.p]);return `<circle cx="${x}" cy="${y}" r="5" fill="#193f53"/><text x="${x+8}" y="${y-8}" fill="#193f53" font-size="17">${i+1}</text>`}).join('');document.getElementById('carnot-path').innerHTML=out;}
}
document.querySelectorAll('.interactive input').forEach(el=>el.addEventListener('input',drawSims));
const start=window.location.hash.slice(1);jump(start in byId?byId[start]:0);

window.addEventListener('load',()=>{
  const active=slides[current];
  if(window.MathJax&&MathJax.typesetPromise){MathJax.typesetPromise([active]).catch(err=>console.warn('MathJax:',err));}
});
window.addEventListener('beforeunload',()=>cancelVoice());


/* V4: simulaciones físicas independientes recuperadas */
(()=>{
const fmt=(v,n=1)=>Number(v).toLocaleString('es-AR',{maximumFractionDigits:n,minimumFractionDigits:n});
function draw(box){
 const typ=box.dataset.extraSim,P={};box.querySelectorAll('[data-param]').forEach(input=>{P[input.dataset.param]=+input.value;box.querySelector('[data-out="'+input.dataset.param+'"]').textContent=fmt(+input.value, input.step&&input.step.includes('.')?2:0)});
 const graph=box.querySelector('[data-plot]'),result=box.querySelector('[data-result]');
 const txt=(x,y,t,size=17,color='#21485e')=>`<text x="${x}" y="${y}" font-size="${size}" fill="${color}">${t}</text>`;
 if(typ==='expansion'){
   let dl=P.alpha*1e-6*P.length*(P.tf-P.ti),mill=dl*1000;
   result.textContent='ΔL = '+fmt(mill,2)+' mm · L final = '+fmt(P.length+dl,5)+' m';
   graph.innerHTML=`<rect x="80" y="40" width="560" height="28" fill="#89b5c9" rx="5"/><rect x="80" y="105" width="${Math.min(620,560+Math.abs(mill)*7)}" height="28" fill="#dd8d57" rx="5"/>${txt(90,30,'Inicial: '+fmt(P.length,2)+' m')}${txt(90,97,'Calentado: +'+fmt(mill,2)+' mm')}${txt(20,150,'La deformación se amplifica visualmente para facilitar la observación.',14)}`;
 }
 if(typ==='refrigeration'){
   let Tc=P.cold+273.15,Th=P.hot+273.15,cop=Tc/(Th-Tc);
   result.textContent='COP ideal máximo = '+fmt(cop,2)+' · Por cada 1 kJ de trabajo, se extraen hasta '+fmt(cop,2)+' kJ del foco frío.';
   graph.innerHTML=`<rect x="50" y="55" width="180" height="85" rx="9" fill="#d7f0fa" stroke="#2681a9" stroke-width="2"/><rect x="530" y="55" width="180" height="85" rx="9" fill="#ffe6d3" stroke="#d78340" stroke-width="2"/><rect x="310" y="60" width="140" height="75" rx="9" fill="#eaf1eb" stroke="#3e8b58" stroke-width="2"/>${txt(85,90,'Foco frío')}${txt(95,114,fmt(P.cold,0)+' °C')}${txt(552,90,'Foco caliente')}${txt(585,114,fmt(P.hot,0)+' °C')}${txt(327,88,'Refrigerador')}${txt(344,115,'W = 1 kJ',15)}<path d="M230 92H307M450 92H530" stroke="#245f7d" stroke-width="5"/><path d="M295 84l13 8-13 8M518 84l13 8-13 8" fill="#245f7d"/>${txt(240,75,'Q frío')}${txt(458,75,'Q caliente',15)}${txt(70,176,'Balance: Q caliente = Q frío + W',17)}`;
 }
 if(typ==='exchanger'){
   const Ch=P.mh*4.18,Cc=P.mc*3.9,Q=P.eps*Math.min(Ch,Cc)*(80-15),Tho=80-Q/Ch,Tco=15+Q/Cc;
   result.textContent='Potencia transferida: '+fmt(Q,2)+' kW · Salida caliente: '+fmt(Tho,1)+' °C · Salida fría: '+fmt(Tco,1)+' °C';
   let hY=t=>210-(t/90)*170;
   graph.innerHTML=`<path d="M65 20V216H730" stroke="#345266" stroke-width="2" fill="none"/>${txt(21,25,'T')}${txt(540,237,'Posición en el equipo')}`+`<path d="M90 ${hY(80)} L650 ${hY(Tho)}" stroke="#d66f3d" stroke-width="5"/>`+`<path d="M90 ${hY(Tco)} L650 ${hY(15)}" stroke="#1488a7" stroke-width="5"/>`+txt(110,hY(80)-12,'Caliente 80 °C',15,'#ac5731')+txt(470,hY(Tho)-12,fmt(Tho,1)+' °C',16,'#ac5731')+txt(120,hY(Tco)+20,fmt(Tco,1)+' °C',16,'#087c97')+txt(508,hY(15)+22,'Fría 15 °C',16,'#087c97');
 }
 if(typ==='pasteur'){
   const cp=3.9,md=P.flow/3600,raw=md*cp*(P.target-P.ti),external=raw*(1-P.regen/100),volume=P.flow/1000/3600*P.time*1000;
   result.textContent='Carga sin regeneración: '+fmt(raw,1)+' kW · Calor externo: '+fmt(external,1)+' kW · Retención nominal: '+fmt(volume,2)+' L (ρ = 1000 kg/m³).';
   let total=Math.max(1,raw),x=220,w=460;
   graph.innerHTML=txt(22,35,'Sin recuperación',16)+`<rect x="${x}" y="15" width="${w}" height="35" rx="5" fill="#d87a45"/>`+txt(22,115,'Con recuperación',16)+`<rect x="${x}" y="90" width="${w*external/total}" height="35" rx="5" fill="#1a8ba3"/>`+txt(235,165,'Área azul: aporte térmico externo necesario',15);
 }
}
function init(){document.querySelectorAll('.restored-sim').forEach(box=>{if(box.dataset.initialized)return;box.dataset.initialized='1';box.querySelectorAll('input').forEach(i=>i.addEventListener('input',()=>draw(box)));draw(box);});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
