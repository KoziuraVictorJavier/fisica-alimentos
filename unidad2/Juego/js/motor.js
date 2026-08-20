(() => {
  const BANK=window.CINEMATICA_BANK;
  const STORAGE_KEY="fisica_u2_juego_v081";
  const CONFIG={finalCell:50,energy:{start:10,max:30,correct:0.5,incorrect:-1,purchaseReward:3},difficultyPoints:{1:100,2:150,3:200}};
  const $=s=>document.querySelector(s);
  const board=$("#board"),diceBtn=$("#diceBtn"),energyShopBtn=$("#energyShopBtn"),resetBtn=$("#resetBtn"),modal=$("#challengeModal"),modalBody=$("#modalBody"),feedback=$("#feedback"),continueBtn=$("#continueBtn"),statsBtn=$("#statsBtn"),statsModal=$("#statsModal"),statsBody=$("#statsBody"),closeStats=$("#closeStats");

  function blankSession(){
    return {schemaVersion:2,gameId:BANK.meta.gameId,gameVersion:BANK.meta.gameVersion,bankVersion:BANK.meta.bankVersion,startedAt:new Date().toISOString(),updatedAt:new Date().toISOString(),finishedAt:null,position:0,score:0,energy:CONFIG.energy.start,energyMax:CONFIG.energy.max,energyHistory:[],rolls:0,correct:0,incorrect:0,simulationsSolved:0,pending:null,events:[],answers:[],simulations:[],energyChallenges:[]};
  }

  let session;
  try{session=JSON.parse(localStorage.getItem(STORAGE_KEY))||blankSession();}catch{session=blankSession();}
  if(typeof session.energy!=="number")session.energy=CONFIG.energy.start;
  if(!Array.isArray(session.energyHistory))session.energyHistory=[];
  if(!Array.isArray(session.energyChallenges))session.energyChallenges=[];
  session.energyMax=CONFIG.energy.max;session.pending=null;

  function save(){session.updatedAt=new Date().toISOString();localStorage.setItem(STORAGE_KEY,JSON.stringify(session));}
  function log(type,data={}){session.events.push({at:new Date().toISOString(),type,...data});save();}
  function answerIndex(q){if(typeof q.answer==="number")return q.answer;if(typeof q.answer==="string"){const s=q.answer.trim().toUpperCase();if(/^[A-D]$/.test(s))return s.charCodeAt(0)-65;const n=Number(s);if(Number.isInteger(n))return n;}return -1;}

  function shuffledOptions(q){
    const arr=q.options.map((text,originalIndex)=>({text,originalIndex}));
    for(let i=arr.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [arr[i],arr[j]]=[arr[j],arr[i]];
    }
    return arr;
  }

  function difficultyPoints(q){
    const level=Number(q?.difficulty)||1;
    return CONFIG.difficultyPoints[level] || CONFIG.difficultyPoints[1];
  }

  function difficultyLabel(q){
    const level=Number(q?.difficulty)||1;
    return `Nivel ${level} · ${difficultyPoints(q)} pts`;
  }

  function renderEnergy(delta=null){
    const val=$("#energyVal"),bar=$("#energyBar"),wrap=$("#energyWrap"),flash=$("#energyFlash");
    if(!val||!bar)return;
    val.textContent=session.energy.toFixed(1)+" / "+CONFIG.energy.max;
    const pct=session.energy/CONFIG.energy.max*100;bar.style.width=pct+"%";
    bar.classList.toggle("low",pct<=25);bar.classList.toggle("mid",pct>25&&pct<=55);
    if(delta!==null&&wrap&&flash){
      wrap.classList.remove("gain","loss");wrap.classList.add(delta>0?"gain":"loss");
      flash.textContent=(delta>0?"+":"")+delta.toFixed(1);flash.className="energy-flash "+(delta>0?"positive":"negative");
      setTimeout(()=>{flash.className="energy-flash";flash.textContent="";},900);
    }
  }

  function changeEnergy(delta,reason){
    const before=session.energy;
    session.energy=Math.max(0,Math.min(CONFIG.energy.max,+(session.energy+delta).toFixed(1)));
    session.energyHistory.push({at:new Date().toISOString(),before,delta,after:session.energy,reason});
    log("energy_change",{before,delta,after:session.energy,reason});renderEnergy(delta);
  }

  function renderBoard(){
    board.innerHTML="";
    BANK.cells.forEach(cell=>{
      const el=document.createElement("div");el.className="cell";
      if(cell.id<session.position)el.classList.add("passed");
      if(cell.id===session.position)el.classList.add("current");
      if([4,9,14,17,22,28,35,41,46].includes(cell.id))el.classList.add("checkpoint");
      if(cell.id<=9)el.classList.add("zone-foundations");
      else if(cell.id<=17)el.classList.add("zone-rectilinear");
      else if(cell.id<=22)el.classList.add("zone-2d");
      else if(cell.id<=28)el.classList.add("zone-circular");
      else if(cell.id<=35)el.classList.add("zone-mas");
      else if(cell.id<=46)el.classList.add("zone-integration");
      else el.classList.add("zone-summary");
      el.innerHTML=`<span class="cell-number">${cell.id}</span><span class="cell-topic">${cell.topic}</span><span class="cell-title">${cell.title}</span>`;
      if(cell.id===session.position){const pawn=document.createElement("span");pawn.className="pawn";pawn.textContent="●";el.append(pawn);}
      board.append(el);
    });
    $("#positionVal").textContent=session.position===0?"Salida":`${session.position} / ${CONFIG.finalCell}`;
    $("#scoreVal").textContent=session.score;$("#correctVal").textContent=session.correct;$("#progressBar").style.width=`${session.position/CONFIG.finalCell*100}%`;renderEnergy();
    diceBtn.disabled=!!session.pending||session.position>=CONFIG.finalCell||session.energy<=0;
    if(energyShopBtn){
      energyShopBtn.disabled=!!session.pending||session.energy<=0||session.energy>=CONFIG.energy.max;
      energyShopBtn.textContent=session.energy>=CONFIG.energy.max
        ?"⚡ Energía completa"
        :"⚡ Comprar energía (+3)";
    }
    const st=$("#gameStatus");st.classList.remove("done","danger");
    if(session.energy<=0){st.textContent="Sin energía · reiniciar";st.classList.add("danger");}
    else if(session.position>=CONFIG.finalCell){st.textContent="Prototipo completado";st.classList.add("done");}
    else st.textContent="Recorrido de práctica";
  }

  function rollDice(){
    if(session.pending||session.position>=CONFIG.finalCell||session.energy<=0)return;
    const roll=1+Math.floor(Math.random()*3),from=session.position,target=Math.min(CONFIG.finalCell,session.position+roll);
    session.rolls++;session.pending={kind:"board",from,target,roll,startedAt:Date.now()};log("roll",{from,target,roll});animateDie(roll,()=>openChallenge(target));
  }
  function animateDie(value,done){const die=$("#die");let n=0;const timer=setInterval(()=>{die.textContent=1+Math.floor(Math.random()*6);if(++n>8){clearInterval(timer);die.textContent=value;done();}},70);}
  function chooseQuestion(cellId){const list=BANK.questions[cellId]||[],recent=session.answers.slice(-10).map(x=>x.questionId),preferred=list.filter(q=>!recent.includes(q.id)),pool=preferred.length?preferred:list;return pool[Math.floor(Math.random()*pool.length)];}
  function challengeLabel(q){return q.type==="simulation"?"Desafío interactivo":q.type==="graph_mcq"?"Interpretación gráfica":"Pregunta";}


  function energyQuestionPool(){
    const pool=[];
    Object.entries(BANK.questions).forEach(([cellId,list])=>{
      list.forEach(q=>{
        if(Number(q.difficulty)===3 && (q.type==="mcq" || q.type==="graph_mcq")){
          const cell=BANK.cells.find(c=>c.id===Number(cellId));
          pool.push({cellId:Number(cellId),cell,q});
        }
      });
    });
    return pool;
  }

  function chooseEnergyQuestion(){
    const pool=energyQuestionPool();
    if(!pool.length)return null;
    const recent=session.energyChallenges.slice(-8).map(e=>e.questionId);
    const preferred=pool.filter(item=>!recent.includes(item.q.id));
    const source=preferred.length?preferred:pool;
    return source[Math.floor(Math.random()*source.length)];
  }

  function openEnergyChallenge(){
    if(session.pending || session.energy<=0 || session.energy>=CONFIG.energy.max)return;

    const item=chooseEnergyQuestion();
    if(!item){
      alert("No hay preguntas de nivel 3 disponibles para recuperar energía.");
      return;
    }

    const {cellId,cell,q}=item;

    session.pending={
      kind:"energy",
      sourceCell:cellId,
      sourceTopic:cell?.topic||"",
      questionId:q.id,
      questionType:q.type,
      questionStarted:Date.now()
    };
    save();

    modal.classList.add("open");
    modal.setAttribute("aria-hidden","false");
    feedback.innerHTML="";
    continueBtn.hidden=true;
    continueBtn.textContent="Continuar";

    $("#challengeCell").textContent="Compra de energía";
    $("#challengeTopic").textContent=`Desafío de nivel 3 · ${cell?.topic||"Tema aleatorio"}`;
    $("#challengePrompt").innerHTML=q.prompt;
    $("#challengeType").textContent=`Premio: +${CONFIG.energy.purchaseReward} energía`;

    const difficultyBadge=$("#challengeDifficulty");
    if(difficultyBadge){
      difficultyBadge.textContent="Nivel 3 · sin puntaje";
      difficultyBadge.dataset.level="3";
    }

    modalBody.innerHTML="";

    if(q.type==="graph_mcq"){
      const fig=document.createElement("div");
      fig.className="graph-question";
      const canvas=document.createElement("canvas");
      canvas.width=760;canvas.height=300;
      fig.append(canvas);
      modalBody.append(fig);
      drawQuestionGraph(canvas,q.graph);
    }

    const choices=document.createElement("div");
    choices.className="choices";

    const displayOptions=shuffledOptions(q);
    displayOptions.forEach((item,displayIndex)=>{
      const b=document.createElement("button");
      b.className="choice";
      b.dataset.originalIndex=String(item.originalIndex);
      b.dataset.displayIndex=String(displayIndex);
      b.innerHTML=`<span class="choice-letter">${String.fromCharCode(65+displayIndex)}</span><span>${item.text}</span>`;
      b.addEventListener("click",()=>answerMCQ(q,item.originalIndex,displayIndex,b,choices));
      choices.append(b);
    });

    modalBody.append(choices);
    window.CINEMATICA_MATH?.typeset(modal);
  }

  function openChallenge(cellId){
    const cell=BANK.cells.find(c=>c.id===cellId),q=chooseQuestion(cellId);if(!q)return;
    modal.classList.add("open");modal.setAttribute("aria-hidden","false");feedback.innerHTML="";continueBtn.hidden=true;continueBtn.textContent="Continuar";
    $("#challengeCell").textContent=`Casilla ${cellId}`;
    $("#challengeTopic").textContent=cell.title;
    $("#challengePrompt").innerHTML=q.prompt;
    $("#challengeType").textContent=challengeLabel(q);
    const difficultyBadge=$("#challengeDifficulty");
    if(difficultyBadge){
      difficultyBadge.textContent=difficultyLabel(q);
      difficultyBadge.dataset.level=String(q.difficulty||1);
    }
    modalBody.innerHTML="";
    session.pending.kind=session.pending.kind||"board";session.pending.questionId=q.id;session.pending.questionType=q.type;session.pending.questionStarted=Date.now();save();

    if(q.type==="mcq"||q.type==="graph_mcq"){
      if(q.type==="graph_mcq"){const fig=document.createElement("div");fig.className="graph-question";const canvas=document.createElement("canvas");canvas.width=760;canvas.height=300;fig.append(canvas);modalBody.append(fig);drawQuestionGraph(canvas,q.graph);}
      const choices=document.createElement("div");
      choices.className="choices";

      const displayOptions=shuffledOptions(q);
      displayOptions.forEach((item,displayIndex)=>{
        const b=document.createElement("button");
        b.className="choice";
        b.dataset.originalIndex=String(item.originalIndex);
        b.dataset.displayIndex=String(displayIndex);
        b.innerHTML=`<span class="choice-letter">${String.fromCharCode(65+displayIndex)}</span><span>${item.text}</span>`;
        b.addEventListener("click",()=>answerMCQ(q,item.originalIndex,displayIndex,b,choices));
        choices.append(b);
      });

      modalBody.append(choices);
      window.CINEMATICA_MATH?.typeset(modal);
    }else if(q.type==="simulation"){
      const sim=document.createElement("div");modalBody.append(sim);const simState={simulationAttempts:0};window.CINEMATICA_SIM[q.simulator](sim,simState,result=>finishSimulation(q,result));
    }
  }

  function drawQuestionGraph(canvas,g){
    const ctx=canvas.getContext("2d"),l=70,r=710,t=35,b=245;
    ctx.clearRect(0,0,canvas.width,canvas.height);ctx.fillStyle="#fff";ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle="#475569";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(l,b);ctx.lineTo(r,b);ctx.moveTo(l,b);ctx.lineTo(l,t);ctx.stroke();
    ctx.fillStyle="#475569";ctx.font="16px system-ui,sans-serif";
    if(g.kind==="xt_mru"){
      ctx.fillText("x",l-25,t+5);ctx.fillText("t",r+8,b+5);const maxT=6,maxX=Math.max(14,g.x0+g.slope*maxT+2),yA=b-(b-t)*(g.x0/maxX),yB=b-(b-t)*((g.x0+g.slope*maxT)/maxX);
      ctx.strokeStyle="#2563eb";ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(l,yA);ctx.lineTo(r,yB);ctx.stroke();ctx.fillStyle="#2563eb";ctx.fillText("x(t)",r-48,yB-10);ctx.fillStyle="#64748b";ctx.fillText("recta → pendiente constante",330,285);
    }else if(g.kind==="vt_mru"){
      ctx.fillText("v",l-25,t+5);ctx.fillText("t",r+8,b+5);
      const y=b-(b-t)*(g.value/5);
      ctx.strokeStyle="#16a34a";ctx.lineWidth=4;
      ctx.beginPath();ctx.moveTo(l,y);ctx.lineTo(r,y);ctx.stroke();
      ctx.fillStyle="rgba(37,99,235,.10)";ctx.fillRect(l,y,r-l,b-y);
      ctx.fillStyle="#16a34a";ctx.fillText("v = constante",r-120,y-10);
      ctx.fillStyle="#64748b";ctx.fillText("área bajo v(t)",330,285);

    }else if(g.kind==="vt_accel"){
      ctx.fillText("v",l-25,t+5);ctx.fillText("t",r+8,b+5);
      const maxT=6,maxV=12;
      const y0=b-(b-t)*(g.v0/maxV);
      const y1=b-(b-t)*((g.v0+g.slope*maxT)/maxV);
      ctx.strokeStyle="#2563eb";ctx.lineWidth=4;
      ctx.beginPath();ctx.moveTo(l,y0);ctx.lineTo(r,y1);ctx.stroke();
      ctx.fillStyle="#2563eb";ctx.fillText("v(t)",r-44,y1-10);
      ctx.fillStyle="#64748b";ctx.fillText("pendiente = Δv/Δt",300,285);

    }else if(g.kind==="at_const"){
      ctx.fillText("a",l-25,t+5);ctx.fillText("t",r+8,b+5);
      const maxA=4;
      const y=b-(b-t)*(g.value/maxA);
      ctx.fillStyle="rgba(245,158,11,.16)";
      ctx.fillRect(l,y,r-l,b-y);
      ctx.strokeStyle="#f59e0b";ctx.lineWidth=4;
      ctx.beginPath();ctx.moveTo(l,y);ctx.lineTo(r,y);ctx.stroke();
      ctx.fillStyle="#f59e0b";ctx.fillText("a = constante",r-125,y-10);
      ctx.fillStyle="#64748b";ctx.fillText("área = Δv",330,285);

    }else if(g.kind==="xt_accel"){
      ctx.fillText("x",l-25,t+5);ctx.fillText("t",r+8,b+5);
      ctx.strokeStyle="#7c3aed";ctx.lineWidth=4;
      ctx.beginPath();
      for(let i=0;i<=100;i++){
        const u=i/100;
        const x=l+(r-l)*u;
        const y=b-(b-t)*(0.08+0.82*u*u);
        if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
      }
      ctx.stroke();
      ctx.fillStyle="#7c3aed";ctx.fillText("x(t)",r-45,t+25);
      ctx.fillStyle="#64748b";ctx.fillText("pendiente creciente",315,285);
    }
  }


  function answerEnergyMCQ(q,originalIndex,displayIndex,button,choices){
    [...choices.children].forEach(b=>b.disabled=true);

    const ci=answerIndex(q);
    const ok=originalIndex===ci;

    button.classList.add(ok?"correct":"wrong");

    if(!ok){
      const correctButton=[...choices.children].find(
        b=>Number(b.dataset.originalIndex)===ci
      );
      if(correctButton)correctButton.classList.add("correct");
    }

    const elapsed=(Date.now()-session.pending.questionStarted)/1000;
    const before=session.energy;
    const delta=ok?CONFIG.energy.purchaseReward:CONFIG.energy.incorrect;

    changeEnergy(delta,ok?"compra_energia_correcta":"compra_energia_incorrecta");

    session.energyChallenges.push({
      at:new Date().toISOString(),
      sourceCell:session.pending.sourceCell,
      topic:session.pending.sourceTopic,
      questionId:q.id,
      type:q.type,
      difficulty:3,
      selectedOriginalIndex:originalIndex,
      selectedDisplayIndex:displayIndex,
      displayedLetter:String.fromCharCode(65+displayIndex),
      correctOriginalIndex:ci,
      correct:ok,
      elapsedSeconds:+elapsed.toFixed(1),
      energyBefore:before,
      energyDelta:delta,
      energyAfter:session.energy
    });

    log(ok?"energy_purchase_correct":"energy_purchase_incorrect",{
      questionId:q.id,
      sourceCell:session.pending.sourceCell,
      delta,
      energyAfter:session.energy
    });

    if(ok){
      feedback.className="feedback success";
      feedback.innerHTML=
        `<strong>Desafío superado.</strong> ${q.explanation}
         <br><span class="energy-note">Recuperaste +${CONFIG.energy.purchaseReward} de energía.</span>
         <br><span class="small-feedback">Este desafío no suma puntaje ni desplaza la ficha.</span>`;
    }else{
      feedback.className="feedback error";
      feedback.innerHTML=
        `<strong>Respuesta incorrecta.</strong> ${q.explanation}
         <br><span class="energy-note">Energía ${CONFIG.energy.incorrect.toFixed(1)}</span>
         <br><span class="small-feedback">La compra de energía no modifica tu posición ni tu puntaje.</span>`;
    }

    continueBtn.hidden=false;
    diceBtn.disabled=true;
    if(energyShopBtn)energyShopBtn.disabled=true;

    if(session.energy<=0){
      continueBtn.textContent="Reiniciar partida";
      feedback.innerHTML+=`<div class="energy-zero"><strong>La energía llegó a 0.</strong> Para continuar es necesario iniciar una nueva partida.</div>`;
    }

    save();
    window.CINEMATICA_MATH?.typeset(feedback);
  }

  function answerMCQ(q,originalIndex,displayIndex,button,choices){
    if(session.pending?.kind==="energy"){
      answerEnergyMCQ(q,originalIndex,displayIndex,button,choices);
      return;
    }

    [...choices.children].forEach(b=>b.disabled=true);

    const ci=answerIndex(q);
    const ok=originalIndex===ci;

    button.classList.add(ok?"correct":"wrong");

    if(!ok){
      const correctButton=[...choices.children].find(
        b=>Number(b.dataset.originalIndex)===ci
      );
      if(correctButton) correctButton.classList.add("correct");
    }

    const elapsed=(Date.now()-session.pending.questionStarted)/1000;

    session.answers.push({
      at:new Date().toISOString(),
      cell:session.pending.target,
      slide:BANK.cells[session.pending.target-1].slide,
      topic:BANK.cells[session.pending.target-1].topic,
      questionId:q.id,
      type:q.type,

      // Para analítica futura conservamos ambos órdenes:
      selectedOriginalIndex:originalIndex,
      selectedDisplayIndex:displayIndex,
      displayedLetter:String.fromCharCode(65+displayIndex),
      correctOriginalIndex:ci,

      difficulty:Number(q.difficulty)||1,
      pointsPossible:difficultyPoints(q),
      pointsAwarded:ok?difficultyPoints(q):0,

      correct:ok,
      elapsedSeconds:+elapsed.toFixed(1)
    });

    if(ok){
      session.correct++;
      session.score+=difficultyPoints(q);
      changeEnergy(CONFIG.energy.correct,"respuesta_correcta");

      feedback.className="feedback success";
      feedback.innerHTML=
        `<strong>Correcto.</strong> ${q.explanation}
         <br><span class="points-note">+${difficultyPoints(q)} puntos</span>
         · <span class="energy-note">Energía +${CONFIG.energy.correct.toFixed(1)}</span>`;

      consolidateAdvance(true);
    }else{
      session.incorrect++;
      changeEnergy(CONFIG.energy.incorrect,"respuesta_incorrecta");

      feedback.className="feedback error";
      feedback.innerHTML=
        `<strong>Revisá la idea.</strong> ${q.explanation}
         <br><span class="energy-note">Energía ${CONFIG.energy.incorrect.toFixed(1)}</span>
         <br><span class="small-feedback">
           No perdés casillas: permanecés en tu posición anterior y en la próxima tirada aparecerá otra actividad.
         </span>`;

      consolidateAdvance(false);
    }

    window.CINEMATICA_MATH?.typeset(feedback);
  }

  function finishSimulation(q,result){
    const elapsed=(Date.now()-session.pending.questionStarted)/1000;
    session.simulations.push({
      at:new Date().toISOString(),
      cell:session.pending.target,
      slide:BANK.cells[session.pending.target-1].slide,
      topic:BANK.cells[session.pending.target-1].topic,
      challengeId:q.id,
      difficulty:Number(q.difficulty)||1,
      pointsPossible:difficultyPoints(q),
      pointsAwarded:difficultyPoints(q),
      elapsedSeconds:+elapsed.toFixed(1),
      ...result
    });
    session.correct++;
    session.simulationsSolved++;
    session.score+=difficultyPoints(q);
    changeEnergy(CONFIG.energy.correct,"simulacion_resuelta");
    feedback.className="feedback success";feedback.innerHTML=`<strong>Objetivo alcanzado.</strong> ${q.explanation}<br><span class="points-note">+${difficultyPoints(q)} puntos</span>
      · <span class="energy-note">Energía +${CONFIG.energy.correct.toFixed(1)}</span>`;consolidateAdvance(true);window.CINEMATICA_MATH?.typeset(feedback);
  }

  function consolidateAdvance(success){
    const p=session.pending;log(success?"challenge_correct":"challenge_incorrect",{cell:p.target,questionId:p.questionId,type:p.questionType});
    if(success){session.position=p.target;if(session.position>=CONFIG.finalCell)session.finishedAt=new Date().toISOString();}
    save();continueBtn.hidden=false;diceBtn.disabled=true;
    if(session.energy<=0){continueBtn.textContent="Reiniciar partida";feedback.innerHTML+=`<div class="energy-zero"><strong>La energía llegó a 0.</strong> Para continuar es necesario iniciar una nueva partida.</div>`;}
  }

  function closeChallenge(){if(session.energy<=0){restartImmediately();return;}session.pending=null;save();modal.classList.remove("open");modal.setAttribute("aria-hidden","true");renderBoard();}
  function restartImmediately(){localStorage.removeItem(STORAGE_KEY);session=blankSession();modal.classList.remove("open");modal.setAttribute("aria-hidden","true");renderBoard();}
  function resetGame(){if(confirm("¿Reiniciar la partida? Se borrará el progreso guardado en este navegador."))restartImmediately();}

  function showStats(){
    const mins=(Date.now()-new Date(session.startedAt).getTime())/60000;
    const total=session.correct+session.incorrect;
    const accuracy=total?Math.round(session.correct/total*100):0;

    const byTopic={};
    session.answers.forEach(a=>{
      byTopic[a.topic]||={n:0,ok:0,time:0};
      byTopic[a.topic].n++;
      if(a.correct)byTopic[a.topic].ok++;
      byTopic[a.topic].time+=a.elapsedSeconds||0;
    });

    const topicRows=Object.entries(byTopic).map(([topic,v])=>
      `<tr>
        <td>${topic}</td>
        <td>${v.ok}/${v.n}</td>
        <td>${Math.round(v.ok/v.n*100)}%</td>
        <td>${(v.time/v.n).toFixed(1)} s</td>
      </tr>`
    ).join("");

    const byDifficulty={
      1:{label:"Nivel 1",attempts:0,ok:0,time:0,possible:0,earned:0},
      2:{label:"Nivel 2",attempts:0,ok:0,time:0,possible:0,earned:0},
      3:{label:"Nivel 3",attempts:0,ok:0,time:0,possible:0,earned:0}
    };

    session.answers.forEach(a=>{
      const d=byDifficulty[a.difficulty||1];
      d.attempts++;
      if(a.correct)d.ok++;
      d.time+=a.elapsedSeconds||0;
      d.possible+=a.pointsPossible||0;
      d.earned+=a.pointsAwarded||0;
    });

    session.simulations.forEach(s=>{
      const d=byDifficulty[s.difficulty||1];
      d.attempts++;
      d.ok++;
      d.time+=s.elapsedSeconds||0;
      d.possible+=s.pointsPossible||0;
      d.earned+=s.pointsAwarded||0;
    });


    const energyTotal=session.energyChallenges.length;
    const energyCorrect=session.energyChallenges.filter(e=>e.correct).length;
    const energyRecovered=session.energyChallenges
      .filter(e=>e.energyDelta>0)
      .reduce((sum,e)=>sum+e.energyDelta,0);
    const energyLost=session.energyChallenges
      .filter(e=>e.energyDelta<0)
      .reduce((sum,e)=>sum+Math.abs(e.energyDelta),0);

    const difficultyRows=Object.entries(byDifficulty).map(([level,d])=>{
      const pct=d.attempts?Math.round(d.ok/d.attempts*100):0;
      const avg=d.attempts?(d.time/d.attempts).toFixed(1):"—";
      return `<tr>
        <td>${d.label}</td>
        <td>${CONFIG.difficultyPoints[level]} pts</td>
        <td>${d.attempts}</td>
        <td>${pct}%</td>
        <td>${avg}${avg==="—"?"":" s"}</td>
        <td>${d.earned}/${d.possible}</td>
      </tr>`;
    }).join("");

    statsBody.innerHTML=`
      <div class="stats-cards">
        <div><span>Puntaje ponderado</span><strong>${session.score}</strong></div>
        <div><span>Precisión global</span><strong>${accuracy}%</strong></div>
        <div><span>Casilla</span><strong>${session.position}/${CONFIG.finalCell}</strong></div>
        <div><span>Energía</span><strong>${session.energy.toFixed(1)}/${CONFIG.energy.max}</strong></div>
      </div>

      <h4 class="stats-subtitle">Desempeño por dificultad</h4>
      <table class="stats-table">
        <thead>
          <tr>
            <th>Dificultad</th>
            <th>Valor</th>
            <th>Intentos</th>
            <th>Aciertos</th>
            <th>Tiempo medio</th>
            <th>Puntos logrados</th>
          </tr>
        </thead>
        <tbody>${difficultyRows}</tbody>
      </table>

      <h4 class="stats-subtitle">Desempeño por tema</h4>
      <table class="stats-table">
        <thead>
          <tr><th>Tema</th><th>Aciertos</th><th>%</th><th>Tiempo medio</th></tr>
        </thead>
        <tbody>${topicRows||`<tr><td colspan="4">Todavía no hay respuestas registradas.</td></tr>`}</tbody>
      </table>

      <h4 class="stats-subtitle">Recuperación de energía</h4>
      <div class="stats-cards energy-stats">
        <div><span>Desafíos</span><strong>${energyTotal}</strong></div>
        <div><span>Correctos</span><strong>${energyCorrect}</strong></div>
        <div><span>Energía ganada</span><strong>+${energyRecovered.toFixed(1)}</strong></div>
        <div><span>Energía perdida</span><strong>−${energyLost.toFixed(1)}</strong></div>
      </div>

      <div class="schema-note">
        <strong>Lectura del puntaje:</strong>
        Nivel 1 = 100 pts · Nivel 2 = 150 pts · Nivel 3 = 200 pts.
        Los desafíos de compra de energía son nivel 3, pero <strong>no suman puntaje</strong>:
        sólo modifican la energía. Todo queda registrado para la futura exportación estadística.
      </div>`;

    statsModal.classList.add("open");
    statsModal.setAttribute("aria-hidden","false");
  }

  diceBtn.addEventListener("click",rollDice);if(energyShopBtn)energyShopBtn.addEventListener("click",openEnergyChallenge);continueBtn.addEventListener("click",closeChallenge);resetBtn.addEventListener("click",resetGame);statsBtn.addEventListener("click",showStats);closeStats.addEventListener("click",()=>{statsModal.classList.remove("open");statsModal.setAttribute("aria-hidden","true");});
  renderBoard();
})();