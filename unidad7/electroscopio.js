(() => {
 'use strict';
 const by = id => document.getElementById(id);
 if (!by('electroscope-svg')) return;
 const state={q:0,ext:5,d:12,near:false};
 const fmt=(v,n=1)=>new Intl.NumberFormat('es-AR',{minimumFractionDigits:n,maximumFractionDigits:n}).format(v);
 // Stylized mechanical equilibrium. q_leaf=0.5*Q_effective represented in nC.
 const k=8.9875517923e9,L=0.045,m=0.000035,g=9.81;
 const theta=q=>{
  const leaf=Math.abs(q)*1e-9*0.5;
  if(leaf<1e-14)return 0;
  const target=k*leaf*leaf/(4*L*L*m*g);
  let lo=1e-7,hi=1.35;
  for(let i=0;i<65;i++){
    let mid=(lo+hi)/2;
    const v=Math.sin(mid)**2*Math.tan(mid);
    if(v<target)lo=mid;else hi=mid;
  }
  return (lo+hi)/2;
 };
 function effective(){
  // Qualitative polarization parameter. Not a model of induced charges in a real electroscope.
  return state.q + (state.near ? state.ext*0.55*Math.pow(12/(state.d+6),2) : 0);
 }
 const set=(id,str)=>{by(id).textContent=str;};
 function graph(){
  const c=by('eGraph'),ctx=c.getContext('2d');if(!ctx)return;
  const rect=c.getBoundingClientRect(),w=Math.max(260,rect.width),h=180,dpr=Math.min(2,window.devicePixelRatio||1);
  c.width=Math.round(w*dpr);c.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
  ctx.clearRect(0,0,w,h);const left=48,right=w-16,top=17,bottom=143;
  ctx.fillStyle='#f8fbfe';ctx.fillRect(left,top,right-left,bottom-top);
  ctx.strokeStyle='#d5e3ef';ctx.font='12px system-ui';ctx.textAlign='center';ctx.fillStyle='#496179';
  for(let i=0;i<=4;i++){const y=bottom-i*(bottom-top)/4;ctx.beginPath();ctx.moveTo(left,y);ctx.lineTo(right,y);ctx.stroke();ctx.textAlign='right';ctx.fillText(String(i*20)+'°',left-5,y+4);}
  ctx.textAlign='center';ctx.fillText('|Q equivalente| (nC)',(left+right)/2,h-6);
  const x=q=>left+q/12*(right-left),y=q=>bottom-2*theta(q)*180/Math.PI/80*(bottom-top);
  ctx.strokeStyle='#176ba5';ctx.lineWidth=3;ctx.beginPath();for(let i=0;i<=160;i++){let q=12*i/160;if(i===0)ctx.moveTo(x(q),y(q));else ctx.lineTo(x(q),y(q));}ctx.stroke();
  const qe=Math.min(12,Math.abs(effective()));ctx.fillStyle='#d45a35';ctx.beginPath();ctx.arc(x(qe),y(qe),5,0,Math.PI*2);ctx.fill();
 }
 function update(){
  set('eQout',`${state.q>0?'+':''}${fmt(state.q)} nC`);set('eExtout',`${state.ext>0?'+':''}${fmt(state.ext)} nC`);set('eDistout',`${state.d} cm`);
  const qeff=effective(), ang=theta(qeff),deg=ang*180/Math.PI;
  const xx=110*Math.sin(ang), yy=110*Math.cos(ang);
  by('eLeft').setAttribute('d',`M235 203 L${235-xx} ${203+yy}`);by('eRight').setAttribute('d',`M235 203 L${235+xx} ${203+yy}`);
  set('eAngleLabel',`Apertura: ${fmt(2*deg)}° (entre hojas)`);
  set('eChargeSign',state.q>0?'Carga neta +':state.q<0?'Carga neta −':state.near?'Polarización':'Neutro');
  by('eExternal').style.opacity=state.near?'1':'.35';by('eExternalSign').textContent=state.ext>=0?'+':'−';
  by('eExternal').setAttribute('cx',state.near?String(295+state.d*3.5):'405');by('eExternalSign').setAttribute('x',state.near?String(295+state.d*3.5):'405');
  set('eState',state.near?'Inducción idealizada: sin contacto, la carga neta se conserva.':'Sin cuerpo externo próximo. Carga neta del electroscopio: '+(state.q===0?'nula.':(state.q>0?'positiva.':'negativa.')));
  graph();
 }
 by('eQ').addEventListener('input',ev=>{state.q=Number(ev.target.value);update()});
 by('eExt').addEventListener('input',ev=>{state.ext=Number(ev.target.value);update()});
 by('eDist').addEventListener('input',ev=>{state.d=Number(ev.target.value);update()});
 by('eContact').addEventListener('click',()=>{state.near=false;state.q=Math.max(-10,Math.min(10,state.q+state.ext*0.5));by('eQ').value=state.q;update()});
 by('eApproach').addEventListener('click',()=>{state.near=!state.near;update()});
 by('eGround').addEventListener('click',()=>{state.q=0;state.near=false;by('eQ').value=0;update()});
 by('eReset').addEventListener('click',()=>{state.q=0;state.ext=5;state.d=12;state.near=false;by('eQ').value=0;by('eExt').value=5;by('eDist').value=12;update()});
 window.addEventListener('resize',graph);update();
})();
