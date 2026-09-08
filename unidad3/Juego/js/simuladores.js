window.CINEMATICA_SIM = {
  accelerationTarget(container, state, onSolved){
    const targets=[1.5,2.0,2.5,3.0,4.0];
    const target=targets[Math.floor(Math.random()*targets.length)];
    const tolerance=0.05;

    container.innerHTML=String.raw`
      <div class="sim-challenge">
        <div class="sim-target">
          Objetivo: <strong>a = ${target.toFixed(2)} m/s²</strong>
        </div>

        <div class="sim-grid">
          <label>
            Δv
            <input id="simDv" type="range" min="1" max="12" step="0.1" value="5">
            <span id="simDvVal">5.0 m/s</span>
          </label>

          <label>
            Δt
            <input id="simDt" type="range" min="0.5" max="6" step="0.1" value="2">
            <span id="simDtVal">2.0 s</span>
          </label>
        </div>

        <div class="sim-equation">
          \[a=\frac{\Delta v}{\Delta t}\]
        </div>

        <div class="sim-live pending" id="simResultBox">
          <span>Resultado</span>
          <strong id="simAVal">Sin evaluar</strong>
          <span id="simDelta">Elegí los parámetros y presioná Evaluar.</span>
        </div>

        <canvas id="simAccCanvas" width="720" height="260"></canvas>

        <button class="primary" id="simCheckBtn">Evaluar configuración</button>
      </div>`;

    const dv=container.querySelector("#simDv");
    const dt=container.querySelector("#simDt");
    const dvVal=container.querySelector("#simDvVal");
    const dtVal=container.querySelector("#simDtVal");
    const aVal=container.querySelector("#simAVal");
    const delta=container.querySelector("#simDelta");
    const resultBox=container.querySelector("#simResultBox");
    const canvas=container.querySelector("#simAccCanvas");

    function updateSelectedValues(){
      dvVal.textContent=parseFloat(dv.value).toFixed(1)+" m/s";
      dtVal.textContent=parseFloat(dt.value).toFixed(1)+" s";
      resultBox.classList.add("pending");
      resultBox.classList.remove("evaluated");
      aVal.textContent="Sin evaluar";
      delta.textContent="Elegí los parámetros y presioná Evaluar.";
      drawBlank();
    }

    function drawBlank(){
      const ctx=canvas.getContext("2d");
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle="#fff";
      ctx.fillRect(0,0,canvas.width,canvas.height);

      const x0=70,x1=670,y=145;
      ctx.strokeStyle="#334155";
      ctx.lineWidth=2;
      ctx.beginPath();
      ctx.moveTo(x0,y);
      ctx.lineTo(x1,y);
      ctx.stroke();

      ctx.fillStyle="#64748b";
      ctx.font="16px system-ui,sans-serif";
      ctx.fillText("La gráfica se actualizará al evaluar la configuración.",160,105);
      ctx.fillText("v inicial",x0-15,y+30);
      ctx.fillText("v final",x1-40,y+30);
    }

    function evaluate(){
      const Dv=parseFloat(dv.value);
      const Dt=parseFloat(dt.value);
      const a=Dv/Dt;
      const err=Math.abs(a-target);

      state.simulationAttempts=(state.simulationAttempts||0)+1;
      resultBox.classList.remove("pending");
      resultBox.classList.add("evaluated");
      aVal.textContent=a.toFixed(2)+" m/s²";
      delta.textContent="error = "+err.toFixed(2)+" m/s²";

      drawEvaluated(Dv,Dt);

      if(err<=tolerance){
        onSolved({
          target,
          dv:Dv,
          dt:Dt,
          a,
          attempts:state.simulationAttempts
        });
      }else{
        resultBox.classList.add("shake");
        setTimeout(()=>resultBox.classList.remove("shake"),350);
      }
    }

    function drawEvaluated(Dv,Dt){
      const ctx=canvas.getContext("2d");
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle="#fff";
      ctx.fillRect(0,0,canvas.width,canvas.height);

      const x0=70,x1=670,y=145;
      ctx.strokeStyle="#334155";
      ctx.lineWidth=2;
      ctx.beginPath();
      ctx.moveTo(x0,y);
      ctx.lineTo(x1,y);
      ctx.stroke();

      ctx.fillStyle="#64748b";
      ctx.font="16px system-ui,sans-serif";
      ctx.fillText("v inicial",x0-15,y+30);
      ctx.fillText("v final",x1-40,y+30);

      const xf=x0+(x1-x0)*(Dv/12);
      ctx.strokeStyle="#2563eb";
      ctx.lineWidth=5;
      ctx.beginPath();
      ctx.moveTo(x0,y-35);
      ctx.lineTo(xf,y-35);
      ctx.stroke();

      ctx.fillStyle="#2563eb";
      ctx.beginPath();
      ctx.arc(xf,y-35,7,0,Math.PI*2);
      ctx.fill();
      ctx.fillText("Δv = "+Dv.toFixed(1)+" m/s",x0+180,68);

      ctx.strokeStyle="#f59e0b";
      ctx.lineWidth=4;
      const tw=(x1-x0)*(Dt/6);
      ctx.beginPath();
      ctx.moveTo(x0,y+70);
      ctx.lineTo(x0+tw,y+70);
      ctx.stroke();

      ctx.fillStyle="#f59e0b";
      ctx.fillText("Δt = "+Dt.toFixed(1)+" s",x0+180,238);
    }

    dv.addEventListener("input",updateSelectedValues);
    dt.addEventListener("input",updateSelectedValues);
    container.querySelector("#simCheckBtn").addEventListener("click",evaluate);

    updateSelectedValues();
    window.CINEMATICA_MATH?.typeset(container);
  },

  mruTarget(container,state,onSolved){
    const cases=[
      {t:4,targetX:12},
      {t:5,targetX:20},
      {t:3,targetX:15},
      {t:6,targetX:18}
    ];
    const c=cases[Math.floor(Math.random()*cases.length)];
    const tolerance=0.08;

    container.innerHTML=String.raw`
      <div class="sim-challenge">
        <div class="sim-target">
          Objetivo: desde <strong>x₀ = 0 m</strong>, llegar a
          <strong>x = ${c.targetX.toFixed(1)} m</strong> en
          <strong>t = ${c.t.toFixed(1)} s</strong>.
        </div>

        <div class="sim-grid one">
          <label>
            Velocidad constante v
            <input id="mruV" type="range" min="0.5" max="8" step="0.1" value="2.0">
            <span id="mruVVal">2.0 m/s</span>
          </label>
        </div>

        <div class="sim-equation">\[x=x_0+v\,t\]</div>

        <div class="sim-live pending" id="mruResultBox">
          <span>Posición obtenida</span>
          <strong id="mruXVal">Sin evaluar</strong>
          <span id="mruErr">Elegí v y presioná Evaluar.</span>
        </div>

        <canvas id="mruCanvas" width="760" height="250"></canvas>

        <button class="primary" id="mruCheck">Evaluar configuración</button>
      </div>`;

    const v=container.querySelector("#mruV");
    const vVal=container.querySelector("#mruVVal");
    const xVal=container.querySelector("#mruXVal");
    const err=container.querySelector("#mruErr");
    const resultBox=container.querySelector("#mruResultBox");
    const canvas=container.querySelector("#mruCanvas");

    function updateSelectedValues(){
      vVal.textContent=parseFloat(v.value).toFixed(1)+" m/s";
      xVal.textContent="Sin evaluar";
      err.textContent="Elegí v y presioná Evaluar.";
      resultBox.classList.add("pending");
      resultBox.classList.remove("evaluated");
      drawBlank();
    }

    function drawBlank(){
      const ctx=canvas.getContext("2d");
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle="#fff";
      ctx.fillRect(0,0,canvas.width,canvas.height);

      const x0=70,x1=700,y=150,maxX=30;
      ctx.strokeStyle="#334155";
      ctx.lineWidth=2;
      ctx.beginPath();
      ctx.moveTo(x0,y);
      ctx.lineTo(x1,y);
      ctx.stroke();

      const targetPx=x0+(x1-x0)*(c.targetX/maxX);
      ctx.strokeStyle="#16a34a";
      ctx.setLineDash([5,5]);
      ctx.beginPath();
      ctx.moveTo(targetPx,65);
      ctx.lineTo(targetPx,195);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle="#16a34a";
      ctx.font="16px system-ui,sans-serif";
      ctx.fillText("objetivo",targetPx-25,55);

      ctx.fillStyle="#64748b";
      ctx.fillText("La posición del móvil se mostrará al evaluar.",200,225);
    }

    function evaluate(){
      const V=parseFloat(v.value);
      const x=V*c.t;
      const e=Math.abs(x-c.targetX);

      state.simulationAttempts=(state.simulationAttempts||0)+1;
      xVal.textContent=x.toFixed(2)+" m";
      err.textContent="error = "+e.toFixed(2)+" m";
      resultBox.classList.remove("pending");
      resultBox.classList.add("evaluated");

      drawEvaluated(x);

      if(e<=tolerance){
        onSolved({
          targetX:c.targetX,
          time:c.t,
          v:V,
          x,
          attempts:state.simulationAttempts
        });
      }else{
        resultBox.classList.add("shake");
        setTimeout(()=>resultBox.classList.remove("shake"),350);
      }
    }

    function drawEvaluated(x){
      const ctx=canvas.getContext("2d");
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle="#fff";
      ctx.fillRect(0,0,canvas.width,canvas.height);

      const x0=70,x1=700,y=150,maxX=30;
      ctx.strokeStyle="#334155";
      ctx.lineWidth=2;
      ctx.beginPath();
      ctx.moveTo(x0,y);
      ctx.lineTo(x1,y);
      ctx.stroke();

      const targetPx=x0+(x1-x0)*(c.targetX/maxX);
      ctx.strokeStyle="#16a34a";
      ctx.setLineDash([5,5]);
      ctx.beginPath();
      ctx.moveTo(targetPx,65);
      ctx.lineTo(targetPx,195);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle="#16a34a";
      ctx.font="16px system-ui,sans-serif";
      ctx.fillText("objetivo",targetPx-25,55);

      const px=x0+(x1-x0)*(Math.min(x,maxX)/maxX);
      ctx.fillStyle="#2563eb";
      ctx.fillRect(px-24,y-22,48,44);

      ctx.fillStyle="#0b1f4d";
      ctx.fillText("x = "+x.toFixed(1)+" m",px-35,y+52);
    }

    v.addEventListener("input",updateSelectedValues);
    container.querySelector("#mruCheck").addEventListener("click",evaluate);

    updateSelectedValues();
    window.CINEMATICA_MATH?.typeset(container);
  },

  mruvVelocityTarget(container,state,onSolved){
    const cases=[
      {v0:2,t:4,vf:14},
      {v0:1,t:5,vf:11},
      {v0:4,t:3,vf:10},
      {v0:0,t:6,vf:18}
    ];
    const c=cases[Math.floor(Math.random()*cases.length)];
    const tolerance=0.08;

    container.innerHTML=String.raw`
      <div class="sim-challenge">
        <div class="sim-target">
          Objetivo: con <strong>v₀ = ${c.v0.toFixed(1)} m/s</strong> alcanzar
          <strong>v_f = ${c.vf.toFixed(1)} m/s</strong> en
          <strong>t = ${c.t.toFixed(1)} s</strong>.
        </div>

        <div class="sim-grid one">
          <label>
            Aceleración a
            <input id="mruvA" type="range" min="-1" max="6" step="0.1" value="1.0">
            <span id="mruvAVal">1.0 m/s²</span>
          </label>
        </div>

        <div class="sim-equation">\[v_f=v_0+a\,t\]</div>

        <div class="sim-live pending" id="mruvResultBox">
          <span>Velocidad final obtenida</span>
          <strong id="mruvVfVal">Sin evaluar</strong>
          <span id="mruvErr">Elegí a y presioná Evaluar.</span>
        </div>

        <canvas id="mruvCanvas" width="760" height="270"></canvas>

        <button class="primary" id="mruvCheck">Evaluar configuración</button>
      </div>`;

    const a=container.querySelector("#mruvA");
    const aVal=container.querySelector("#mruvAVal");
    const vfVal=container.querySelector("#mruvVfVal");
    const err=container.querySelector("#mruvErr");
    const resultBox=container.querySelector("#mruvResultBox");
    const canvas=container.querySelector("#mruvCanvas");

    function updateSelectedValues(){
      aVal.textContent=parseFloat(a.value).toFixed(1)+" m/s²";
      vfVal.textContent="Sin evaluar";
      err.textContent="Elegí a y presioná Evaluar.";
      resultBox.classList.add("pending");
      resultBox.classList.remove("evaluated");
      drawBlank();
    }

    function drawBlank(){
      const ctx=canvas.getContext("2d");
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle="#fff";
      ctx.fillRect(0,0,canvas.width,canvas.height);

      const left=70,right=700,top=40,bottom=220,maxV=Math.max(22,c.vf+4);
      ctx.strokeStyle="#334155";
      ctx.lineWidth=2;
      ctx.beginPath();
      ctx.moveTo(left,bottom);
      ctx.lineTo(right,bottom);
      ctx.moveTo(left,bottom);
      ctx.lineTo(left,top);
      ctx.stroke();

      ctx.fillStyle="#64748b";
      ctx.font="15px system-ui,sans-serif";
      ctx.fillText("t",right+8,bottom+5);
      ctx.fillText("v",left-18,top);

      const targetY=bottom-(bottom-top)*(c.vf/maxV);
      ctx.strokeStyle="#16a34a";
      ctx.setLineDash([5,5]);
      ctx.beginPath();
      ctx.moveTo(left,targetY);
      ctx.lineTo(right,targetY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle="#16a34a";
      ctx.fillText("v objetivo",right-82,targetY-8);

      ctx.fillStyle="#64748b";
      ctx.fillText("La recta v(t) aparecerá al evaluar.",235,252);
    }

    function evaluate(){
      const A=parseFloat(a.value);
      const vf=c.v0+A*c.t;
      const e=Math.abs(vf-c.vf);

      state.simulationAttempts=(state.simulationAttempts||0)+1;
      vfVal.textContent=vf.toFixed(2)+" m/s";
      err.textContent="error = "+e.toFixed(2)+" m/s";
      resultBox.classList.remove("pending");
      resultBox.classList.add("evaluated");

      drawEvaluated(A,vf);

      if(e<=tolerance){
        onSolved({
          v0:c.v0,
          targetVf:c.vf,
          time:c.t,
          a:A,
          vf,
          attempts:state.simulationAttempts
        });
      }else{
        resultBox.classList.add("shake");
        setTimeout(()=>resultBox.classList.remove("shake"),350);
      }
    }

    function drawEvaluated(A,vf){
      const ctx=canvas.getContext("2d");
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle="#fff";
      ctx.fillRect(0,0,canvas.width,canvas.height);

      const left=70,right=700,top=40,bottom=220,maxV=Math.max(22,c.vf+4);
      ctx.strokeStyle="#334155";
      ctx.lineWidth=2;
      ctx.beginPath();
      ctx.moveTo(left,bottom);
      ctx.lineTo(right,bottom);
      ctx.moveTo(left,bottom);
      ctx.lineTo(left,top);
      ctx.stroke();

      ctx.fillStyle="#64748b";
      ctx.font="15px system-ui,sans-serif";
      ctx.fillText("t",right+8,bottom+5);
      ctx.fillText("v",left-18,top);

      const tx=left+(right-left)*(c.t/6);
      const vy0=bottom-(bottom-top)*(c.v0/maxV);
      const vyf=bottom-(bottom-top)*(vf/maxV);

      ctx.strokeStyle="#2563eb";
      ctx.lineWidth=4;
      ctx.beginPath();
      ctx.moveTo(left,vy0);
      ctx.lineTo(tx,vyf);
      ctx.stroke();

      ctx.fillStyle="#2563eb";
      ctx.beginPath();
      ctx.arc(tx,vyf,7,0,Math.PI*2);
      ctx.fill();

      const targetY=bottom-(bottom-top)*(c.vf/maxV);
      ctx.strokeStyle="#16a34a";
      ctx.setLineDash([5,5]);
      ctx.beginPath();
      ctx.moveTo(left,targetY);
      ctx.lineTo(right,targetY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle="#16a34a";
      ctx.fillText("v objetivo",right-82,targetY-8);

      ctx.fillStyle="#0b1f4d";
      ctx.fillText("a = "+A.toFixed(1)+" m/s²",left+30,top+18);
    }

    a.addEventListener("input",updateSelectedValues);
    container.querySelector("#mruvCheck").addEventListener("click",evaluate);

    updateSelectedValues();
    window.CINEMATICA_MATH?.typeset(container);
  },

  freeFallHeightTarget(container,state,onSolved){
    const g=9.8;
    const targets=[1.0,1.2,1.5,1.8];
    const targetT=targets[Math.floor(Math.random()*targets.length)];
    const tolerance=0.03;

    container.innerHTML=String.raw`
      <div class="sim-challenge">
        <div class="sim-target">
          Objetivo: lograr un tiempo de caída de
          <strong>${targetT.toFixed(2)} s</strong> con \(g=9.8\,\mathrm{m/s^2}\).
        </div>

        <div class="sim-grid one">
          <label>
            Altura h
            <input id="ffH" type="range" min="1" max="20" step="0.1" value="5">
            <span id="ffHVal">5.0 m</span>
          </label>
        </div>

        <div class="sim-equation">\[t=\sqrt{\frac{2h}{g}}\]</div>

        <div class="sim-live pending" id="ffResultBox">
          <span>Tiempo calculado</span>
          <strong id="ffTVal">Sin evaluar</strong>
          <span id="ffErr">Elegí h y presioná Evaluar.</span>
        </div>

        <canvas id="ffCanvas" width="760" height="310"></canvas>

        <button class="primary" id="ffCheck">Evaluar configuración</button>
      </div>`;

    const h=container.querySelector("#ffH");
    const hVal=container.querySelector("#ffHVal");
    const tVal=container.querySelector("#ffTVal");
    const err=container.querySelector("#ffErr");
    const resultBox=container.querySelector("#ffResultBox");
    const canvas=container.querySelector("#ffCanvas");

    function updateSelection(){
      hVal.textContent=parseFloat(h.value).toFixed(1)+" m";
      tVal.textContent="Sin evaluar";
      err.textContent="Elegí h y presioná Evaluar.";
      resultBox.classList.add("pending");
      resultBox.classList.remove("evaluated");
      drawBlank();
    }

    function drawBase(ctx){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle="#fff";
      ctx.fillRect(0,0,canvas.width,canvas.height);

      ctx.strokeStyle="#334155";
      ctx.lineWidth=3;
      ctx.beginPath();
      ctx.moveTo(110,55);
      ctx.lineTo(110,265);
      ctx.stroke();

      ctx.strokeStyle="#64748b";
      ctx.lineWidth=2;
      ctx.beginPath();
      ctx.moveTo(70,265);
      ctx.lineTo(690,265);
      ctx.stroke();

      ctx.fillStyle="#64748b";
      ctx.font="16px system-ui,sans-serif";
      ctx.fillText("suelo",635,290);
    }

    function drawBlank(){
      const ctx=canvas.getContext("2d");
      drawBase(ctx);
      ctx.fillStyle="#2563eb";
      ctx.beginPath();
      ctx.arc(110,75,13,0,Math.PI*2);
      ctx.fill();

      ctx.fillStyle="#64748b";
      ctx.font="16px system-ui,sans-serif";
      ctx.fillText("La caída se mostrará al evaluar.",250,150);
    }

    function drawEvaluated(H,T){
      const ctx=canvas.getContext("2d");
      drawBase(ctx);

      ctx.fillStyle="#2563eb";
      ctx.beginPath();
      ctx.arc(110,75,13,0,Math.PI*2);
      ctx.fill();

      ctx.strokeStyle="#2563eb";
      ctx.setLineDash([5,5]);
      ctx.beginPath();
      ctx.moveTo(110,88);
      ctx.lineTo(110,250);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle="#0b1f4d";
      ctx.font="17px system-ui,sans-serif";
      ctx.fillText("h = "+H.toFixed(1)+" m",145,130);
      ctx.fillText("t = "+T.toFixed(2)+" s",145,160);

      ctx.fillStyle="#f59e0b";
      ctx.beginPath();
      ctx.arc(110,250,13,0,Math.PI*2);
      ctx.fill();
    }

    h.addEventListener("input",updateSelection);
    container.querySelector("#ffCheck").addEventListener("click",()=>{
      const H=parseFloat(h.value);
      const T=Math.sqrt(2*H/g);
      const e=Math.abs(T-targetT);

      state.simulationAttempts=(state.simulationAttempts||0)+1;
      tVal.textContent=T.toFixed(2)+" s";
      err.textContent="error = "+e.toFixed(2)+" s";
      resultBox.classList.remove("pending");
      resultBox.classList.add("evaluated");

      drawEvaluated(H,T);

      if(e<=tolerance){
        onSolved({
          targetTime:targetT,
          h:H,
          g,
          calculatedTime:T,
          attempts:state.simulationAttempts
        });
      }else{
        resultBox.classList.add("shake");
        setTimeout(()=>resultBox.classList.remove("shake"),350);
      }
    });

    updateSelection();
    window.CINEMATICA_MATH?.typeset(container);
  },

  conveyorLandingTarget(container,state,onSolved){
    const g=9.8;
    const cases=[
      {h:1.2,targetR:1.5},
      {h:1.5,targetR:2.0},
      {h:2.0,targetR:2.4},
      {h:0.8,targetR:1.2}
    ];
    const c=cases[Math.floor(Math.random()*cases.length)];
    const tolerance=0.06;

    container.innerHTML=String.raw`
      <div class="sim-challenge">
        <div class="sim-target">
          La descarga está a <strong>h = ${c.h.toFixed(2)} m</strong>.
          Ajustá la velocidad de la cinta para que el producto caiga en una bandeja
          centrada a <strong>R = ${c.targetR.toFixed(2)} m</strong>.
        </div>

        <div class="sim-grid one">
          <label>
            Velocidad de la cinta \(v_{0x}\)
            <input id="cvV" type="range" min="0.5" max="8" step="0.1" value="2.0">
            <span id="cvVVal">2.0 m/s</span>
          </label>
        </div>

        <div class="sim-equation">
          \[
            t_{caída}=\sqrt{\frac{2h}{g}},
            \qquad
            R=v_{0x}t_{caída}
          \]
        </div>

        <div class="sim-live pending" id="cvResultBox">
          <span>Alcance obtenido</span>
          <strong id="cvRVal">Sin evaluar</strong>
          <span id="cvErr">Elegí la velocidad y presioná Evaluar.</span>
        </div>

        <canvas id="cvCanvas" width="820" height="360"></canvas>

        <button class="primary" id="cvCheck">Evaluar configuración</button>
      </div>`;

    const v=container.querySelector("#cvV");
    const vVal=container.querySelector("#cvVVal");
    const rVal=container.querySelector("#cvRVal");
    const err=container.querySelector("#cvErr");
    const resultBox=container.querySelector("#cvResultBox");
    const canvas=container.querySelector("#cvCanvas");

    function updateSelection(){
      vVal.textContent=parseFloat(v.value).toFixed(1)+" m/s";
      rVal.textContent="Sin evaluar";
      err.textContent="Elegí la velocidad y presioná Evaluar.";
      resultBox.classList.add("pending");
      resultBox.classList.remove("evaluated");
      drawBlank();
    }

    function drawScene(ctx){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle="#fff";
      ctx.fillRect(0,0,canvas.width,canvas.height);

      // cinta
      ctx.fillStyle="#dbe5f0";
      ctx.fillRect(60,80,300,38);
      ctx.strokeStyle="#334155";
      ctx.lineWidth=3;
      ctx.strokeRect(60,80,300,38);

      ctx.fillStyle="#0b1f4d";
      ctx.font="16px system-ui,sans-serif";
      ctx.fillText("cinta transportadora",115,70);

      // borde de descarga
      ctx.fillStyle="#2563eb";
      ctx.beginPath();
      ctx.arc(360,75,10,0,Math.PI*2);
      ctx.fill();

      // suelo
      ctx.strokeStyle="#64748b";
      ctx.lineWidth=2;
      ctx.beginPath();
      ctx.moveTo(40,305);
      ctx.lineTo(780,305);
      ctx.stroke();

      // bandeja objetivo
      const scale=170;
      const trayX=360+c.targetR*scale;
      ctx.fillStyle="#ecfdf3";
      ctx.strokeStyle="#16a34a";
      ctx.lineWidth=4;
      ctx.fillRect(trayX-38,280,76,25);
      ctx.strokeRect(trayX-38,280,76,25);

      ctx.fillStyle="#16a34a";
      ctx.font="15px system-ui,sans-serif";
      ctx.fillText("bandeja objetivo",trayX-60,270);

      return {scale,trayX};
    }

    function drawBlank(){
      const ctx=canvas.getContext("2d");
      drawScene(ctx);
      ctx.fillStyle="#64748b";
      ctx.font="16px system-ui,sans-serif";
      ctx.fillText("La trayectoria y el punto de impacto aparecerán al evaluar.",240,180);
    }

    function drawEvaluated(V,R,T){
      const ctx=canvas.getContext("2d");
      const scene=drawScene(ctx);
      const scale=scene.scale;

      const x0=360;
      const y0=75;
      const groundY=292;

      ctx.strokeStyle="#f59e0b";
      ctx.lineWidth=4;
      ctx.beginPath();

      const steps=80;
      for(let i=0;i<=steps;i++){
        const tt=T*i/steps;
        const x=V*tt;
        const y=0.5*g*tt*tt;

        const px=x0+x*scale;
        const py=y0+(groundY-y0)*(y/c.h);

        if(i===0) ctx.moveTo(px,py);
        else ctx.lineTo(px,py);
      }
      ctx.stroke();

      const impactX=x0+R*scale;
      ctx.fillStyle="#dc2626";
      ctx.beginPath();
      ctx.arc(impactX,groundY,9,0,Math.PI*2);
      ctx.fill();

      ctx.fillStyle="#0b1f4d";
      ctx.font="16px system-ui,sans-serif";
      ctx.fillText("R = "+R.toFixed(2)+" m",impactX-35,330);
      ctx.fillText("t caída = "+T.toFixed(2)+" s",395,145);
    }

    v.addEventListener("input",updateSelection);
    container.querySelector("#cvCheck").addEventListener("click",()=>{
      const V=parseFloat(v.value);
      const T=Math.sqrt(2*c.h/g);
      const R=V*T;
      const e=Math.abs(R-c.targetR);

      state.simulationAttempts=(state.simulationAttempts||0)+1;

      rVal.textContent=R.toFixed(2)+" m";
      err.textContent="error = "+e.toFixed(2)+" m";
      resultBox.classList.remove("pending");
      resultBox.classList.add("evaluated");

      drawEvaluated(V,R,T);

      if(e<=tolerance){
        onSolved({
          h:c.h,
          targetRange:c.targetR,
          v0x:V,
          fallTime:T,
          range:R,
          g,
          attempts:state.simulationAttempts
        });
      }else{
        resultBox.classList.add("shake");
        setTimeout(()=>resultBox.classList.remove("shake"),350);
      }
    });

    updateSelection();
    window.CINEMATICA_MATH?.typeset(container);
  }
,

  angularFrequencyTarget(container,state,onSolved){
    const targets=[0.25,0.40,0.50,0.80];
    const target=targets[Math.floor(Math.random()*targets.length)];
    const tolerance=0.015;

    container.innerHTML=String.raw`
      <div class="sim-challenge">
        <div class="sim-target">Objetivo: obtener <strong>f = ${target.toFixed(2)} Hz</strong>.</div>
        <div class="sim-grid one">
          <label>Período T
            <input id="afT" type="range" min="0.5" max="6" step="0.1" value="2.0">
            <span id="afTVal">2.0 s</span>
          </label>
        </div>
        <div class="sim-equation">\[f=\frac{1}{T},\qquad \omega=2\pi f\]</div>
        <div class="sim-live pending" id="afBox">
          <span>Frecuencia calculada</span><strong id="afF">Sin evaluar</strong>
          <span id="afErr">Elegí T y presioná Evaluar.</span>
        </div>
        <canvas id="afCanvas" width="760" height="300"></canvas>
        <button class="primary" id="afCheck">Evaluar configuración</button>
      </div>`;

    const T=container.querySelector("#afT"),Tval=container.querySelector("#afTVal"),
          fval=container.querySelector("#afF"),err=container.querySelector("#afErr"),
          box=container.querySelector("#afBox"),canvas=container.querySelector("#afCanvas");

    function blank(){
      Tval.textContent=parseFloat(T.value).toFixed(1)+" s";
      fval.textContent="Sin evaluar";err.textContent="Elegí T y presioná Evaluar.";
      box.classList.add("pending");box.classList.remove("evaluated");
      const ctx=canvas.getContext("2d");ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle="#fff";ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.strokeStyle="#d8e3f1";ctx.lineWidth=2;ctx.beginPath();ctx.arc(380,150,90,0,2*Math.PI);ctx.stroke();
      ctx.fillStyle="#64748b";ctx.font="16px system-ui,sans-serif";
      ctx.fillText("El movimiento se representará después de evaluar.",205,275);
    }

    function evaluated(period,f){
      const ctx=canvas.getContext("2d");ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle="#fff";ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.strokeStyle="#94a3b8";ctx.lineWidth=2;ctx.beginPath();ctx.arc(380,150,90,0,2*Math.PI);ctx.stroke();
      const theta=2*Math.PI*Math.min(1,1/period);
      const px=380+90*Math.cos(theta),py=150-90*Math.sin(theta);
      ctx.strokeStyle="#2563eb";ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(380,150);ctx.lineTo(px,py);ctx.stroke();
      ctx.fillStyle="#2563eb";ctx.beginPath();ctx.arc(px,py,9,0,2*Math.PI);ctx.fill();
      ctx.fillStyle="#0b1f4d";ctx.font="17px system-ui,sans-serif";
      ctx.fillText("T = "+period.toFixed(1)+" s",75,85);
      ctx.fillText("f = "+f.toFixed(2)+" Hz",75,115);
      ctx.fillText("ω = "+(2*Math.PI*f).toFixed(2)+" rad/s",75,145);
    }

    T.addEventListener("input",blank);
    container.querySelector("#afCheck").addEventListener("click",()=>{
      const period=parseFloat(T.value),f=1/period,e=Math.abs(f-target);
      state.simulationAttempts=(state.simulationAttempts||0)+1;
      fval.textContent=f.toFixed(2)+" Hz";err.textContent="error = "+e.toFixed(3)+" Hz";
      box.classList.remove("pending");box.classList.add("evaluated");evaluated(period,f);
      if(e<=tolerance) onSolved({targetFrequency:target,T:period,f,omega:2*Math.PI*f,attempts:state.simulationAttempts});
      else{box.classList.add("shake");setTimeout(()=>box.classList.remove("shake"),350);}
    });

    blank();window.CINEMATICA_MATH?.typeset(container);
  },

  tangentialSpeedTarget(container,state,onSolved){
    const omega=[2.5,3.0,4.0,5.0][Math.floor(Math.random()*4)];
    const target=[1.0,1.5,2.0,2.4][Math.floor(Math.random()*4)];
    const tolerance=0.04;

    container.innerHTML=String.raw`
      <div class="sim-challenge">
        <div class="sim-target">
          Con <strong>ω = ${omega.toFixed(1)} rad/s</strong>, ajustá r para obtener
          <strong>v_t = ${target.toFixed(2)} m/s</strong>.
        </div>
        <div class="sim-grid one">
          <label>Radio r
            <input id="vtR" type="range" min="0.10" max="1.20" step="0.01" value="0.40">
            <span id="vtRVal">0.40 m</span>
          </label>
        </div>
        <div class="sim-equation">\[v_t=r\,\omega\]</div>
        <div class="sim-live pending" id="vtBox">
          <span>Rapidez tangencial</span><strong id="vtOut">Sin evaluar</strong>
          <span id="vtErr">Elegí r y presioná Evaluar.</span>
        </div>
        <canvas id="vtCanvas" width="760" height="300"></canvas>
        <button class="primary" id="vtCheck">Evaluar configuración</button>
      </div>`;

    const R=container.querySelector("#vtR"),Rval=container.querySelector("#vtRVal"),
          out=container.querySelector("#vtOut"),err=container.querySelector("#vtErr"),
          box=container.querySelector("#vtBox"),canvas=container.querySelector("#vtCanvas");

    function blank(){
      Rval.textContent=parseFloat(R.value).toFixed(2)+" m";out.textContent="Sin evaluar";
      err.textContent="Elegí r y presioná Evaluar.";box.classList.add("pending");box.classList.remove("evaluated");
      const ctx=canvas.getContext("2d");ctx.clearRect(0,0,760,300);ctx.fillStyle="#fff";ctx.fillRect(0,0,760,300);
      ctx.fillStyle="#64748b";ctx.font="16px system-ui,sans-serif";ctx.fillText("El radio y la velocidad tangencial se visualizarán al evaluar.",165,155);
    }

    function evaluated(r,v){
      const ctx=canvas.getContext("2d");ctx.clearRect(0,0,760,300);ctx.fillStyle="#fff";ctx.fillRect(0,0,760,300);
      const radius=55+100*r/1.2,cx=365,cy=150;
      ctx.strokeStyle="#94a3b8";ctx.lineWidth=3;ctx.beginPath();ctx.arc(cx,cy,radius,0,2*Math.PI);ctx.stroke();
      ctx.strokeStyle="#2563eb";ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+radius,cy);ctx.stroke();
      ctx.fillStyle="#2563eb";ctx.beginPath();ctx.arc(cx+radius,cy,9,0,2*Math.PI);ctx.fill();
      ctx.strokeStyle="#16a34a";ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(cx+radius,cy);ctx.lineTo(cx+radius,cy-80);ctx.stroke();
      ctx.fillStyle="#16a34a";ctx.font="17px system-ui,sans-serif";ctx.fillText("vₜ",cx+radius+8,cy-70);
      ctx.fillStyle="#0b1f4d";ctx.fillText("r = "+r.toFixed(2)+" m",90,85);ctx.fillText("vₜ = "+v.toFixed(2)+" m/s",90,115);
    }

    R.addEventListener("input",blank);
    container.querySelector("#vtCheck").addEventListener("click",()=>{
      const r=parseFloat(R.value),v=r*omega,e=Math.abs(v-target);
      state.simulationAttempts=(state.simulationAttempts||0)+1;
      out.textContent=v.toFixed(2)+" m/s";err.textContent="error = "+e.toFixed(2)+" m/s";
      box.classList.remove("pending");box.classList.add("evaluated");evaluated(r,v);
      if(e<=tolerance) onSolved({omega,targetVt:target,r,vt:v,attempts:state.simulationAttempts});
      else{box.classList.add("shake");setTimeout(()=>box.classList.remove("shake"),350);}
    });

    blank();window.CINEMATICA_MATH?.typeset(container);
  },

  pulleyRatioTarget(container,state,onSolved){
    const r1=[0.20,0.25,0.30][Math.floor(Math.random()*3)];
    const w1=[4,5,6][Math.floor(Math.random()*3)];
    const target=[2.0,2.5,3.0,4.0][Math.floor(Math.random()*4)];
    const tolerance=0.05;

    container.innerHTML=String.raw`
      <div class="sim-challenge">
        <div class="sim-target">
          Datos: <strong>r₁=${r1.toFixed(2)} m</strong>,
          <strong>ω₁=${w1.toFixed(1)} rad/s</strong>.
          Ajustá r₂ para obtener <strong>ω₂=${target.toFixed(2)} rad/s</strong>.
        </div>
        <div class="sim-grid one">
          <label>Radio de salida r₂
            <input id="prR2" type="range" min="0.10" max="0.80" step="0.01" value="0.35">
            <span id="prR2Val">0.35 m</span>
          </label>
        </div>
        <div class="sim-equation">\[\omega_2=\omega_1\frac{r_1}{r_2}\]</div>
        <div class="sim-live pending" id="prBox">
          <span>Velocidad angular de salida</span><strong id="prW2">Sin evaluar</strong>
          <span id="prErr">Elegí r₂ y presioná Evaluar.</span>
        </div>
        <canvas id="prCanvas" width="800" height="310"></canvas>
        <button class="primary" id="prCheck">Evaluar configuración</button>
      </div>`;

    const R2=container.querySelector("#prR2"),R2val=container.querySelector("#prR2Val"),
          W2=container.querySelector("#prW2"),err=container.querySelector("#prErr"),
          box=container.querySelector("#prBox"),canvas=container.querySelector("#prCanvas");

    function blank(){
      R2val.textContent=parseFloat(R2.value).toFixed(2)+" m";W2.textContent="Sin evaluar";
      err.textContent="Elegí r₂ y presioná Evaluar.";box.classList.add("pending");box.classList.remove("evaluated");
      const ctx=canvas.getContext("2d");ctx.clearRect(0,0,800,310);ctx.fillStyle="#fff";ctx.fillRect(0,0,800,310);
      ctx.fillStyle="#64748b";ctx.font="16px system-ui,sans-serif";ctx.fillText("La transmisión se dibujará después de evaluar.",225,155);
    }

    function evaluated(r2,w2){
      const ctx=canvas.getContext("2d");ctx.clearRect(0,0,800,310);ctx.fillStyle="#fff";ctx.fillRect(0,0,800,310);
      const c1={x:230,y:155,r:45+90*r1/0.8},c2={x:570,y:155,r:45+90*r2/0.8};
      ctx.strokeStyle="#2563eb";ctx.lineWidth=4;ctx.beginPath();ctx.arc(c1.x,c1.y,c1.r,0,2*Math.PI);ctx.stroke();
      ctx.strokeStyle="#dc2626";ctx.beginPath();ctx.arc(c2.x,c2.y,c2.r,0,2*Math.PI);ctx.stroke();
      ctx.strokeStyle="#64748b";ctx.lineWidth=5;
      ctx.beginPath();ctx.moveTo(c1.x,c1.y-c1.r);ctx.lineTo(c2.x,c2.y-c2.r);ctx.moveTo(c1.x,c1.y+c1.r);ctx.lineTo(c2.x,c2.y+c2.r);ctx.stroke();
      ctx.fillStyle="#0b1f4d";ctx.font="16px system-ui,sans-serif";
      ctx.fillText("r₁="+r1.toFixed(2)+" m",165,285);ctx.fillText("r₂="+r2.toFixed(2)+" m",510,285);ctx.fillText("ω₂="+w2.toFixed(2)+" rad/s",505,45);
    }

    R2.addEventListener("input",blank);
    container.querySelector("#prCheck").addEventListener("click",()=>{
      const r2=parseFloat(R2.value),w2=w1*r1/r2,e=Math.abs(w2-target);
      state.simulationAttempts=(state.simulationAttempts||0)+1;
      W2.textContent=w2.toFixed(2)+" rad/s";err.textContent="error = "+e.toFixed(2)+" rad/s";
      box.classList.remove("pending");box.classList.add("evaluated");evaluated(r2,w2);
      if(e<=tolerance) onSolved({r1,r2,omega1:w1,targetOmega2:target,omega2:w2,attempts:state.simulationAttempts});
      else{box.classList.add("shake");setTimeout(()=>box.classList.remove("shake"),350);}
    });

    blank();window.CINEMATICA_MATH?.typeset(container);
  },

  centripetalTarget(container,state,onSolved){
    const r=[0.30,0.45,0.60,0.80][Math.floor(Math.random()*4)];
    const target=[2.0,3.0,4.5,6.0][Math.floor(Math.random()*4)];
    const tolerance=0.08;

    container.innerHTML=String.raw`
      <div class="sim-challenge">
        <div class="sim-target">
          Con <strong>r=${r.toFixed(2)} m</strong>, ajustá ω para obtener
          <strong>a_c=${target.toFixed(2)} m/s²</strong>.
        </div>
        <div class="sim-grid one">
          <label>Velocidad angular ω
            <input id="cpW" type="range" min="0.5" max="7" step="0.1" value="2.0">
            <span id="cpWVal">2.0 rad/s</span>
          </label>
        </div>
        <div class="sim-equation">\[a_c=\omega^2 r\]</div>
        <div class="sim-live pending" id="cpBox">
          <span>Aceleración centrípeta</span><strong id="cpOut">Sin evaluar</strong>
          <span id="cpErr">Elegí ω y presioná Evaluar.</span>
        </div>
        <canvas id="cpCanvas" width="760" height="300"></canvas>
        <button class="primary" id="cpCheck">Evaluar configuración</button>
      </div>`;

    const W=container.querySelector("#cpW"),Wval=container.querySelector("#cpWVal"),out=container.querySelector("#cpOut"),
          err=container.querySelector("#cpErr"),box=container.querySelector("#cpBox"),canvas=container.querySelector("#cpCanvas");

    function blank(){
      Wval.textContent=parseFloat(W.value).toFixed(1)+" rad/s";out.textContent="Sin evaluar";err.textContent="Elegí ω y presioná Evaluar.";
      box.classList.add("pending");box.classList.remove("evaluated");
      const ctx=canvas.getContext("2d");ctx.clearRect(0,0,760,300);ctx.fillStyle="#fff";ctx.fillRect(0,0,760,300);
      ctx.fillStyle="#64748b";ctx.font="16px system-ui,sans-serif";ctx.fillText("El vector a_c aparecerá al evaluar.",245,155);
    }

    function evaluated(w,ac){
      const ctx=canvas.getContext("2d");ctx.clearRect(0,0,760,300);ctx.fillStyle="#fff";ctx.fillRect(0,0,760,300);
      const cx=400,cy=150,R=95;
      ctx.strokeStyle="#94a3b8";ctx.lineWidth=3;ctx.beginPath();ctx.arc(cx,cy,R,0,2*Math.PI);ctx.stroke();
      const px=cx+R,py=cy;ctx.fillStyle="#2563eb";ctx.beginPath();ctx.arc(px,py,10,0,2*Math.PI);ctx.fill();
      const L=Math.min(120,30+ac*12);ctx.strokeStyle="#dc2626";ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(px-L,py);ctx.stroke();
      ctx.fillStyle="#dc2626";ctx.font="17px system-ui,sans-serif";ctx.fillText("a_c",px-L+8,py-12);
      ctx.fillStyle="#0b1f4d";ctx.fillText("ω="+w.toFixed(1)+" rad/s",80,90);ctx.fillText("a_c="+ac.toFixed(2)+" m/s²",80,120);
    }

    W.addEventListener("input",blank);
    container.querySelector("#cpCheck").addEventListener("click",()=>{
      const w=parseFloat(W.value),ac=w*w*r,e=Math.abs(ac-target);
      state.simulationAttempts=(state.simulationAttempts||0)+1;
      out.textContent=ac.toFixed(2)+" m/s²";err.textContent="error = "+e.toFixed(2)+" m/s²";
      box.classList.remove("pending");box.classList.add("evaluated");evaluated(w,ac);
      if(e<=tolerance) onSolved({r,targetAc:target,omega:w,ac,attempts:state.simulationAttempts});
      else{box.classList.add("shake");setTimeout(()=>box.classList.remove("shake"),350);}
    });

    blank();window.CINEMATICA_MATH?.typeset(container);
  },

  masFrequencyTarget(container,state,onSolved){
    const targets=[0.25,0.40,0.50,0.80];
    const target=targets[Math.floor(Math.random()*targets.length)];
    const tolerance=0.015;

    container.innerHTML=String.raw`
      <div class="sim-challenge">
        <div class="sim-target">Objetivo: obtener <strong>f=${target.toFixed(2)} Hz</strong> en el MAS.</div>
        <div class="sim-grid one">
          <label>Período T
            <input id="mfT" type="range" min="0.5" max="6" step="0.1" value="2.0">
            <span id="mfTVal">2.0 s</span>
          </label>
        </div>
        <div class="sim-equation">\[f=\frac{1}{T},\qquad \omega=\frac{2\pi}{T}\]</div>
        <div class="sim-live pending" id="mfBox">
          <span>Frecuencia calculada</span><strong id="mfOut">Sin evaluar</strong>
          <span id="mfErr">Elegí T y presioná Evaluar.</span>
        </div>
        <canvas id="mfCanvas" width="780" height="300"></canvas>
        <button class="primary" id="mfCheck">Evaluar configuración</button>
      </div>`;

    const T=container.querySelector("#mfT"),Tval=container.querySelector("#mfTVal"),out=container.querySelector("#mfOut"),
          err=container.querySelector("#mfErr"),box=container.querySelector("#mfBox"),canvas=container.querySelector("#mfCanvas");

    function blank(){
      Tval.textContent=parseFloat(T.value).toFixed(1)+" s";out.textContent="Sin evaluar";err.textContent="Elegí T y presioná Evaluar.";
      box.classList.add("pending");box.classList.remove("evaluated");
      const ctx=canvas.getContext("2d");ctx.clearRect(0,0,780,300);ctx.fillStyle="#fff";ctx.fillRect(0,0,780,300);
      ctx.fillStyle="#64748b";ctx.font="16px system-ui,sans-serif";ctx.fillText("La oscilación se graficará al evaluar.",245,155);
    }

    function evaluated(period,f){
      const ctx=canvas.getContext("2d");ctx.clearRect(0,0,780,300);ctx.fillStyle="#fff";ctx.fillRect(0,0,780,300);
      const l=70,r=735,cy=150,A=85,view=2*period;
      ctx.strokeStyle="#475569";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(l,cy);ctx.lineTo(r,cy);ctx.stroke();
      ctx.strokeStyle="#2563eb";ctx.lineWidth=4;ctx.beginPath();
      for(let i=0;i<=180;i++){const t=view*i/180,x=l+(r-l)*i/180,y=cy-A*Math.cos(2*Math.PI*t/period);if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}ctx.stroke();
      ctx.fillStyle="#0b1f4d";ctx.font="16px system-ui,sans-serif";ctx.fillText("T="+period.toFixed(1)+" s",80,45);ctx.fillText("f="+f.toFixed(2)+" Hz",220,45);
    }

    T.addEventListener("input",blank);
    container.querySelector("#mfCheck").addEventListener("click",()=>{
      const period=parseFloat(T.value),f=1/period,e=Math.abs(f-target);
      state.simulationAttempts=(state.simulationAttempts||0)+1;
      out.textContent=f.toFixed(2)+" Hz";err.textContent="error = "+e.toFixed(3)+" Hz";
      box.classList.remove("pending");box.classList.add("evaluated");evaluated(period,f);
      if(e<=tolerance) onSolved({targetFrequency:target,T:period,f,omega:2*Math.PI/period,attempts:state.simulationAttempts});
      else{box.classList.add("shake");setTimeout(()=>box.classList.remove("shake"),350);}
    });

    blank();window.CINEMATICA_MATH?.typeset(container);
  },

  masPhaseTarget(container,state,onSolved){
    const A=0.30,T=2.0,omega=2*Math.PI/T;
    const cases=[
      {t:0,target:0.30},
      {t:0,target:0.00},
      {t:0.50,target:0.30},
      {t:0.50,target:0.00}
    ];
    const c=cases[Math.floor(Math.random()*cases.length)];
    const tolerance=0.015;

    container.innerHTML=String.raw`
      <div class="sim-challenge">
        <div class="sim-target">
          Datos: <strong>A=${A.toFixed(2)} m</strong>, <strong>T=${T.toFixed(1)} s</strong>,
          <strong>t=${c.t.toFixed(2)} s</strong>. Ajustá φ para obtener
          <strong>x=${c.target.toFixed(2)} m</strong>.
        </div>
        <div class="sim-grid one">
          <label>Fase inicial φ
            <input id="mpPhi" type="range" min="-3.14" max="3.14" step="0.01" value="0">
            <span id="mpPhiVal">0.00 rad</span>
          </label>
        </div>
        <div class="sim-equation">\[x(t)=A\cos(\omega t+\varphi)\]</div>
        <div class="sim-live pending" id="mpBox">
          <span>Posición calculada</span><strong id="mpOut">Sin evaluar</strong>
          <span id="mpErr">Elegí φ y presioná Evaluar.</span>
        </div>
        <canvas id="mpCanvas" width="800" height="310"></canvas>
        <button class="primary" id="mpCheck">Evaluar configuración</button>
      </div>`;

    const P=container.querySelector("#mpPhi"),Pval=container.querySelector("#mpPhiVal"),out=container.querySelector("#mpOut"),
          err=container.querySelector("#mpErr"),box=container.querySelector("#mpBox"),canvas=container.querySelector("#mpCanvas");

    function blank(){
      Pval.textContent=parseFloat(P.value).toFixed(2)+" rad";out.textContent="Sin evaluar";err.textContent="Elegí φ y presioná Evaluar.";
      box.classList.add("pending");box.classList.remove("evaluated");
      const ctx=canvas.getContext("2d");ctx.clearRect(0,0,800,310);ctx.fillStyle="#fff";ctx.fillRect(0,0,800,310);
      ctx.fillStyle="#64748b";ctx.font="16px system-ui,sans-serif";ctx.fillText("La posición y la curva se revelarán al evaluar.",220,155);
    }

    function evaluated(phi,xval){
      const ctx=canvas.getContext("2d");ctx.clearRect(0,0,800,310);ctx.fillStyle="#fff";ctx.fillRect(0,0,800,310);
      const l=90,r=750,cy=160,Ap=95,view=4;
      ctx.strokeStyle="#475569";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(l,cy);ctx.lineTo(r,cy);ctx.stroke();
      ctx.strokeStyle="#2563eb";ctx.lineWidth=4;ctx.beginPath();
      for(let i=0;i<=200;i++){const tt=view*i/200,px=l+(r-l)*i/200,py=cy-Ap*Math.cos(omega*tt+phi);if(i===0)ctx.moveTo(px,py);else ctx.lineTo(px,py);}ctx.stroke();
      const px=l+(r-l)*c.t/view,py=cy-Ap*Math.cos(omega*c.t+phi);
      ctx.fillStyle="#dc2626";ctx.beginPath();ctx.arc(px,py,8,0,2*Math.PI);ctx.fill();
      ctx.fillStyle="#0b1f4d";ctx.font="16px system-ui,sans-serif";ctx.fillText("x="+xval.toFixed(2)+" m",90,45);ctx.fillText("φ="+phi.toFixed(2)+" rad",250,45);
    }

    P.addEventListener("input",blank);
    container.querySelector("#mpCheck").addEventListener("click",()=>{
      const phi=parseFloat(P.value),xval=A*Math.cos(omega*c.t+phi),e=Math.abs(xval-c.target);
      state.simulationAttempts=(state.simulationAttempts||0)+1;
      out.textContent=xval.toFixed(2)+" m";err.textContent="error = "+e.toFixed(3)+" m";
      box.classList.remove("pending");box.classList.add("evaluated");evaluated(phi,xval);
      if(e<=tolerance) onSolved({A,T,time:c.t,targetX:c.target,phi,x:xval,attempts:state.simulationAttempts});
      else{box.classList.add("shake");setTimeout(()=>box.classList.remove("shake"),350);}
    });

    blank();window.CINEMATICA_MATH?.typeset(container);
  },

  pendulumPeriodTarget(container,state,onSolved){
    const g=9.8;
    const targets=[1.5,2.0,2.5,3.0];
    const target=targets[Math.floor(Math.random()*targets.length)];
    const tolerance=0.03;

    container.innerHTML=String.raw`
      <div class="sim-challenge">
        <div class="sim-target">
          Para pequeñas oscilaciones y <strong>g=9.8 m/s²</strong>, ajustá L para obtener
          <strong>T=${target.toFixed(2)} s</strong>.
        </div>
        <div class="sim-grid one">
          <label>Longitud L
            <input id="pdL" type="range" min="0.10" max="3.0" step="0.01" value="1.0">
            <span id="pdLVal">1.00 m</span>
          </label>
        </div>
        <div class="sim-equation">\[T\approx 2\pi\sqrt{\frac{L}{g}}\]</div>
        <div class="sim-live pending" id="pdBox">
          <span>Período calculado</span><strong id="pdOut">Sin evaluar</strong>
          <span id="pdErr">Elegí L y presioná Evaluar.</span>
        </div>
        <canvas id="pdCanvas" width="760" height="320"></canvas>
        <button class="primary" id="pdCheck">Evaluar configuración</button>
      </div>`;

    const L=container.querySelector("#pdL"),Lval=container.querySelector("#pdLVal"),out=container.querySelector("#pdOut"),
          err=container.querySelector("#pdErr"),box=container.querySelector("#pdBox"),canvas=container.querySelector("#pdCanvas");

    function blank(){
      Lval.textContent=parseFloat(L.value).toFixed(2)+" m";out.textContent="Sin evaluar";err.textContent="Elegí L y presioná Evaluar.";
      box.classList.add("pending");box.classList.remove("evaluated");
      const ctx=canvas.getContext("2d");ctx.clearRect(0,0,760,320);ctx.fillStyle="#fff";ctx.fillRect(0,0,760,320);
      ctx.fillStyle="#64748b";ctx.font="16px system-ui,sans-serif";ctx.fillText("La longitud del péndulo se representará al evaluar.",210,165);
    }

    function evaluated(length,period){
      const ctx=canvas.getContext("2d");ctx.clearRect(0,0,760,320);ctx.fillStyle="#fff";ctx.fillRect(0,0,760,320);
      const cx=400,top=45,scale=80,lenpx=70+length*scale;
      const ang=0.28,px=cx+lenpx*Math.sin(ang),py=top+lenpx*Math.cos(ang);
      ctx.fillStyle="#0b1f4d";ctx.beginPath();ctx.arc(cx,top,6,0,2*Math.PI);ctx.fill();
      ctx.strokeStyle="#2563eb";ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(cx,top);ctx.lineTo(px,py);ctx.stroke();
      ctx.fillStyle="#2563eb";ctx.beginPath();ctx.arc(px,py,16,0,2*Math.PI);ctx.fill();
      ctx.fillStyle="#0b1f4d";ctx.font="16px system-ui,sans-serif";ctx.fillText("L="+length.toFixed(2)+" m",80,90);ctx.fillText("T="+period.toFixed(2)+" s",80,120);
    }

    L.addEventListener("input",blank);
    container.querySelector("#pdCheck").addEventListener("click",()=>{
      const length=parseFloat(L.value),period=2*Math.PI*Math.sqrt(length/g),e=Math.abs(period-target);
      state.simulationAttempts=(state.simulationAttempts||0)+1;
      out.textContent=period.toFixed(2)+" s";err.textContent="error = "+e.toFixed(2)+" s";
      box.classList.remove("pending");box.classList.add("evaluated");evaluated(length,period);
      if(e<=tolerance) onSolved({g,targetPeriod:target,L:length,T:period,attempts:state.simulationAttempts});
      else{box.classList.add("shake");setTimeout(()=>box.classList.remove("shake"),350);}
    });

    blank();window.CINEMATICA_MATH?.typeset(container);
  }
,

  centrifugeRpmTarget(container,state,onSolved){
    const cases=[
      {r:0.10,rpm:600},
      {r:0.12,rpm:900},
      {r:0.15,rpm:1200},
      {r:0.20,rpm:600}
    ];
    const c=cases[Math.floor(Math.random()*cases.length)];
    const targetOmega=2*Math.PI*(c.rpm/60);
    const targetAc=c.r*targetOmega*targetOmega;
    const tolerance=Math.max(6,targetAc*0.025);

    container.innerHTML=String.raw`
      <div class="sim-challenge">
        <div class="sim-target">
          Radio efectivo: <strong>r=${c.r.toFixed(2)} m</strong>.
          Ajustá las rpm para obtener <strong>a_c≈${targetAc.toFixed(0)} m/s²</strong>.
        </div>
        <div class="sim-grid one">
          <label>Velocidad de giro
            <input id="cfRpm" type="range" min="200" max="1800" step="50" value="600">
            <span id="cfRpmVal">600 rpm</span>
          </label>
        </div>
        <div class="sim-equation">
          \[
            f=\frac{\mathrm{rpm}}{60},
            \qquad \omega=2\pi f,
            \qquad a_c=r\,\omega^2
          \]
        </div>
        <div class="sim-live pending" id="cfBox">
          <span>Aceleración calculada</span>
          <strong id="cfAc">Sin evaluar</strong>
          <span id="cfErr">Elegí las rpm y presioná Evaluar.</span>
        </div>
        <canvas id="cfCanvas" width="800" height="330"></canvas>
        <button class="primary" id="cfCheck">Evaluar configuración</button>
      </div>`;

    const rpm=container.querySelector("#cfRpm");
    const rpmVal=container.querySelector("#cfRpmVal");
    const acVal=container.querySelector("#cfAc");
    const err=container.querySelector("#cfErr");
    const box=container.querySelector("#cfBox");
    const canvas=container.querySelector("#cfCanvas");

    function blank(){
      rpmVal.textContent=parseFloat(rpm.value).toFixed(0)+" rpm";
      acVal.textContent="Sin evaluar";
      err.textContent="Elegí las rpm y presioná Evaluar.";
      box.classList.add("pending");
      box.classList.remove("evaluated");

      const ctx=canvas.getContext("2d");
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle="#fff";ctx.fillRect(0,0,canvas.width,canvas.height);
      ctx.strokeStyle="#cbd5e1";ctx.lineWidth=3;
      ctx.beginPath();ctx.arc(430,165,105,0,2*Math.PI);ctx.stroke();
      ctx.fillStyle="#64748b";ctx.font="16px system-ui,sans-serif";
      ctx.fillText("Los valores derivados se mostrarán solamente al evaluar.",190,305);
    }

    function evaluated(RPM,f,w,vt,ac){
      const ctx=canvas.getContext("2d");
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle="#fff";ctx.fillRect(0,0,canvas.width,canvas.height);

      const cx=430,cy=165,R=105;
      ctx.strokeStyle="#64748b";ctx.lineWidth=4;
      ctx.beginPath();ctx.arc(cx,cy,R,0,2*Math.PI);ctx.stroke();

      const theta=0.35,px=cx+R*Math.cos(theta),py=cy-R*Math.sin(theta);
      ctx.fillStyle="#2563eb";ctx.beginPath();ctx.arc(px,py,10,0,2*Math.PI);ctx.fill();

      const L=Math.min(120,35+ac/25);
      const dx=cx-px,dy=cy-py,n=Math.hypot(dx,dy);
      ctx.strokeStyle="#dc2626";ctx.lineWidth=5;
      ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(px+dx/n*L,py+dy/n*L);ctx.stroke();

      ctx.fillStyle="#0b1f4d";ctx.font="16px system-ui,sans-serif";
      ctx.fillText("rpm = "+RPM.toFixed(0),70,75);
      ctx.fillText("f = "+f.toFixed(2)+" Hz",70,105);
      ctx.fillText("ω = "+w.toFixed(1)+" rad/s",70,135);
      ctx.fillText("vₜ = "+vt.toFixed(2)+" m/s",70,165);
      ctx.fillText("a_c = "+ac.toFixed(0)+" m/s²",70,195);
      ctx.fillText("a_c/g ≈ "+(ac/9.8).toFixed(1),70,225);
    }

    rpm.addEventListener("input",blank);

    container.querySelector("#cfCheck").addEventListener("click",()=>{
      const RPM=parseFloat(rpm.value);
      const f=RPM/60;
      const w=2*Math.PI*f;
      const vt=c.r*w;
      const ac=c.r*w*w;
      const e=Math.abs(ac-targetAc);

      state.simulationAttempts=(state.simulationAttempts||0)+1;
      acVal.textContent=ac.toFixed(0)+" m/s²";
      err.textContent="error = "+e.toFixed(0)+" m/s²";
      box.classList.remove("pending");
      box.classList.add("evaluated");
      evaluated(RPM,f,w,vt,ac);

      if(e<=tolerance){
        onSolved({r:c.r,targetAc,rpm:RPM,f,omega:w,vt,ac,attempts:state.simulationAttempts});
      }else{
        box.classList.add("shake");
        setTimeout(()=>box.classList.remove("shake"),350);
      }
    });

    blank();
    window.CINEMATICA_MATH?.typeset(container);
  }

};