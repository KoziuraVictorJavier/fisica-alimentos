(() => {
  const original = window.CINEMATICA_BANK;
  if(!original){
    document.body.innerHTML="<p>No se pudo cargar js/banco_preguntas.js</p>";
    return;
  }

  const state = JSON.parse(JSON.stringify(original));
  let currentCellId = state.cells[0]?.id || 1;
  let currentQuestionIndex = 0;

  const $ = s => document.querySelector(s);

  const els = {
    cellSelect:$("#cellSelect"),
    search:$("#search"),
    activityList:$("#activityList"),
    cellTitle:$("#cellTitle"),
    cellTopic:$("#cellTopic"),
    qId:$("#qId"),
    qType:$("#qType"),
    qDifficulty:$("#qDifficulty"),
    prompt:$("#prompt"),
    optA:$("#optA"),
    optB:$("#optB"),
    optC:$("#optC"),
    optD:$("#optD"),
    answer:$("#answer"),
    explanation:$("#explanation"),
    simulator:$("#simulator"),
    graphJson:$("#graphJson"),
    simRow:$("#simRow"),
    graphRow:$("#graphRow"),
    bankVersion:$("#bankVersion"),
    gameVersion:$("#gameVersion"),
    validation:$("#validation"),
    previewPrompt:$("#previewPrompt"),
    previewOptions:$("#previewOptions"),
    previewExplanation:$("#previewExplanation")
  };

  function currentCell(){
    return state.cells.find(c=>c.id===currentCellId);
  }

  function questionsForCell(){
    return state.questions[String(currentCellId)] || [];
  }

  function currentQuestion(){
    return questionsForCell()[currentQuestionIndex] || null;
  }

  function letterToIndex(v){
    if(typeof v==="number")return v;
    const s=String(v||"A").toUpperCase();
    return Math.max(0,Math.min(3,s.charCodeAt(0)-65));
  }

  function indexToLetter(i){
    return String.fromCharCode(65+Math.max(0,Math.min(3,Number(i)||0)));
  }

  function populateCells(){
    els.cellSelect.innerHTML="";
    state.cells.forEach(c=>{
      const o=document.createElement("option");
      o.value=c.id;
      o.textContent=`${c.id}. ${c.title}`;
      els.cellSelect.append(o);
    });
    els.cellSelect.value=String(currentCellId);
  }

  function renderActivityList(){
    const query=els.search.value.trim().toLowerCase();
    const qs=questionsForCell();
    els.activityList.innerHTML="";

    qs.forEach((q,i)=>{
      const hay=(q.id+" "+q.prompt+" "+(q.explanation||"")).toLowerCase();
      if(query && !hay.includes(query))return;

      const div=document.createElement("div");
      div.className="activity-item"+(i===currentQuestionIndex?" active":"");
      div.innerHTML=`
        <div class="activity-top">
          <span class="activity-id">${q.id}</span>
          <span class="activity-diff d${q.difficulty||1}">Nivel ${q.difficulty||1}</span>
        </div>
        <div class="activity-text">${escapeHtml(q.prompt).slice(0,110)}</div>`;
      div.addEventListener("click",()=>{
        applyForm();
        currentQuestionIndex=i;
        loadForm();
        renderActivityList();
      });
      els.activityList.append(div);
    });
  }

  function loadForm(){
    const cell=currentCell();
    const q=currentQuestion();

    els.cellTitle.value=cell?.title||"";
    els.cellTopic.value=cell?.topic||"";
    els.bankVersion.value=state.meta.bankVersion||"";
    els.gameVersion.value=state.meta.gameVersion||"";

    if(!q){
      ["qId","prompt","optA","optB","optC","optD","explanation","simulator","graphJson"].forEach(k=>els[k].value="");
      return;
    }

    els.qId.value=q.id||"";
    els.qType.value=q.type||"mcq";
    els.qDifficulty.value=String(q.difficulty||1);
    els.prompt.value=q.prompt||"";

    const opts=q.options||["","","",""];
    els.optA.value=opts[0]||"";
    els.optB.value=opts[1]||"";
    els.optC.value=opts[2]||"";
    els.optD.value=opts[3]||"";

    els.answer.value=indexToLetter(letterToIndex(q.answer));
    els.explanation.value=q.explanation||"";
    els.simulator.value=q.simulator||"";
    els.graphJson.value=q.graph?JSON.stringify(q.graph,null,2):"";

    toggleAdvancedRows();
    renderPreview();
  }

  function applyForm(){
    const cell=currentCell();
    const q=currentQuestion();
    if(!cell||!q)return;

    cell.title=els.cellTitle.value.trim();
    cell.topic=els.cellTopic.value.trim();
    state.meta.bankVersion=els.bankVersion.value.trim();
    state.meta.gameVersion=els.gameVersion.value.trim();

    q.id=els.qId.value.trim();
    q.type=els.qType.value;
    q.difficulty=Number(els.qDifficulty.value);
    q.prompt=els.prompt.value.trim();
    q.options=[els.optA.value.trim(),els.optB.value.trim(),els.optC.value.trim(),els.optD.value.trim()];
    q.answer=els.answer.value;
    q.explanation=els.explanation.value.trim();

    if(q.type==="simulation"){
      q.simulator=els.simulator.value.trim();
      delete q.graph;
    }else if(q.type==="graph_mcq"){
      delete q.simulator;
      const raw=els.graphJson.value.trim();
      if(raw){
        try{q.graph=JSON.parse(raw);}catch{}
      }
    }else{
      delete q.simulator;
      delete q.graph;
    }

    // No repoblar aquí el selector de casillas:
    // hacerlo durante un evento "change" volvería a seleccionar la casilla anterior.
    // Sólo actualizamos el texto de la opción actualmente seleccionada.
    const selectedOption=[...els.cellSelect.options].find(
      o=>Number(o.value)===currentCellId
    );
    if(selectedOption && cell){
      selectedOption.textContent=`${cell.id}. ${cell.title}`;
    }

    renderPreview();
  }

  function toggleAdvancedRows(){
    els.simRow.classList.toggle("hidden",els.qType.value!=="simulation");
    els.graphRow.classList.toggle("hidden",els.qType.value!=="graph_mcq");
  }

  function renderPreview(){
    const q=currentQuestion();
    if(!q)return;
    // First sync text fields into q.
    q.prompt=els.prompt.value;
    q.explanation=els.explanation.value;
    q.options=[els.optA.value,els.optB.value,els.optC.value,els.optD.value];
    q.answer=els.answer.value;

    els.previewPrompt.innerHTML=q.prompt||"<em>Sin enunciado</em>";
    const correct=letterToIndex(q.answer);
    els.previewOptions.innerHTML=q.options.map((x,i)=>
      `<div class="preview-block"><strong>${String.fromCharCode(65+i)})</strong> ${x||"<em>vacío</em>"} ${i===correct?"✓":""}</div>`
    ).join("");
    els.previewExplanation.innerHTML=q.explanation||"<em>Sin retroalimentación</em>";

    if(window.CINEMATICA_MATH?.typeset){
      window.CINEMATICA_MATH.typeset(document.querySelector(".preview"));
    }
  }

  function newQuestion(){
    applyForm();
    const qs=questionsForCell();
    const base=`U2_C${String(currentCellId).padStart(2,"0")}_NEW`;
    let n=1,id=`${base}_${String(n).padStart(3,"0")}`;
    const allIds=new Set(Object.values(state.questions).flat().map(q=>q.id));
    while(allIds.has(id)){n++;id=`${base}_${String(n).padStart(3,"0")}`;}

    qs.push({
      id,
      type:"mcq",
      difficulty:1,
      prompt:"Nueva pregunta",
      options:["Opción A","Opción B","Opción C","Opción D"],
      answer:"A",
      explanation:"Retroalimentación."
    });
    currentQuestionIndex=qs.length-1;
    loadForm();renderActivityList();
  }

  function duplicateQuestion(){
    applyForm();
    const q=currentQuestion();
    if(!q)return;
    const copy=JSON.parse(JSON.stringify(q));
    const allIds=new Set(Object.values(state.questions).flat().map(x=>x.id));
    let n=2,id=`${q.id}_COPIA`;
    while(allIds.has(id)){id=`${q.id}_COPIA${n++}`;}
    copy.id=id;
    questionsForCell().push(copy);
    currentQuestionIndex=questionsForCell().length-1;
    loadForm();renderActivityList();
  }

  function deleteQuestion(){
    const q=currentQuestion();
    if(!q)return;
    if(!confirm(`¿Eliminar ${q.id}?`))return;
    const qs=questionsForCell();
    qs.splice(currentQuestionIndex,1);
    currentQuestionIndex=Math.max(0,Math.min(currentQuestionIndex,qs.length-1));
    loadForm();renderActivityList();
  }

  function validateBank(){
    applyForm();
    const errors=[];
    const warnings=[];
    const ids=new Set();

    state.cells.forEach(cell=>{
      const qs=state.questions[String(cell.id)]||[];
      if(qs.length<1)errors.push(`Casilla ${cell.id}: no tiene actividades.`);
      if(qs.length<5)warnings.push(`Casilla ${cell.id}: tiene ${qs.length} actividades (menos de 5).`);

      qs.forEach(q=>{
        if(!q.id)errors.push(`Casilla ${cell.id}: actividad sin ID.`);
        else if(ids.has(q.id))errors.push(`ID duplicado: ${q.id}`);
        else ids.add(q.id);

        if(!["mcq","graph_mcq","simulation"].includes(q.type))errors.push(`${q.id}: tipo no válido.`);
        if(![1,2,3].includes(Number(q.difficulty)))errors.push(`${q.id}: dificultad debe ser 1, 2 o 3.`);
        if(!q.prompt)errors.push(`${q.id}: falta enunciado.`);
        if(!Array.isArray(q.options)||q.options.length!==4)errors.push(`${q.id}: debe tener 4 opciones.`);
        if(letterToIndex(q.answer)<0||letterToIndex(q.answer)>3)errors.push(`${q.id}: respuesta correcta inválida.`);
        if(q.type==="simulation"&&!q.simulator)errors.push(`${q.id}: falta nombre del simulador.`);
        if(q.type==="graph_mcq"&&!q.graph)warnings.push(`${q.id}: pregunta gráfica sin objeto graph.`);
      });
    });

    els.validation.className="validation "+(errors.length?"bad":"ok");
    els.validation.innerHTML=errors.length
      ? `<strong>Se encontraron ${errors.length} errores.</strong><br>${errors.slice(0,15).join("<br>")}${warnings.length?`<br><br><strong>Advertencias:</strong><br>${warnings.slice(0,10).join("<br>")}`:""}`
      : `<strong>Banco válido.</strong> ${ids.size} actividades, ${state.cells.length} casillas.${warnings.length?`<br>Advertencias: ${warnings.join("<br>")}`:""}`;
  }

  function exportText(){
    applyForm();
    state.meta.editedAt=new Date().toISOString();
    return `/*
 BANCO DE PREGUNTAS EDITADO CON editor_banco.html

 IMPORTANTE:
 - answer se refiere al orden original del archivo.
 - el juego mezcla las opciones al mostrarlas.
 - conserve los id si quiere mantener comparabilidad estadística.
*/

window.CINEMATICA_BANK = ${JSON.stringify(state,null,2)};
`;
  }

  function downloadBank(){
    validateBank();
    const text=exportText();
    const blob=new Blob([text],{type:"text/javascript;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;
    a.download="banco_preguntas.js";
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  }

  async function saveAsBank(){
    const text=exportText();
    if(!window.showSaveFilePicker){
      downloadBank();
      return;
    }
    try{
      const handle=await window.showSaveFilePicker({
        suggestedName:"banco_preguntas.js",
        types:[{description:"JavaScript",accept:{"text/javascript":[".js"]}}]
      });
      const writable=await handle.createWritable();
      await writable.write(text);
      await writable.close();
      alert("Banco guardado.");
    }catch(err){
      if(err?.name!=="AbortError"){
        console.warn(err);
        downloadBank();
      }
    }
  }

  function escapeHtml(str){
    return String(str||"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]));
  }

  els.cellSelect.addEventListener("change",()=>{
    // Guardar primero la nueva selección, porque applyForm() trabaja con
    // la casilla actual y no debe sobrescribir el valor elegido en el select.
    const nextCellId=Number(els.cellSelect.value);

    applyForm();

    currentCellId=nextCellId;
    currentQuestionIndex=0;

    // Confirmar visualmente la nueva casilla y cargar sus preguntas.
    els.cellSelect.value=String(currentCellId);
    loadForm();
    renderActivityList();
  });
  els.search.addEventListener("input",renderActivityList);
  els.qType.addEventListener("change",()=>{toggleAdvancedRows();renderPreview();});

  [els.prompt,els.optA,els.optB,els.optC,els.optD,els.answer,els.explanation,els.qDifficulty]
    .forEach(el=>el.addEventListener("input",renderPreview));

  $("#applyBtn").addEventListener("click",()=>{applyForm();renderActivityList();validateBank();});
  $("#newBtn").addEventListener("click",newQuestion);
  $("#duplicateBtn").addEventListener("click",duplicateQuestion);
  $("#deleteBtn").addEventListener("click",deleteQuestion);
  $("#validateBtn").addEventListener("click",validateBank);
  $("#downloadBtn").addEventListener("click",downloadBank);
  $("#saveAsBtn").addEventListener("click",saveAsBank);

  populateCells();
  loadForm();
  renderActivityList();
  validateBank();
})();