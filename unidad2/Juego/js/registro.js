(() => {
  const PREFIX="CIN";

  function cleanStudent(student={}){
    return {
      name:String(student.name||"").trim(),
      id:String(student.id||"").trim(),
      group:String(student.group||"").trim()
    };
  }

  function durationSeconds(startedAt,finishedAt){
    const a=new Date(startedAt).getTime(), b=new Date(finishedAt).getTime();
    return Number.isFinite(a)&&Number.isFinite(b)&&b>=a ? Math.round((b-a)/1000) : null;
  }

  function baseRecord(session,generatedAt){
    const checkpointsPassed=Object.values(session.checkpointPassed||{}).filter(Boolean).length;
    const completed=!!session.finishedAt && session.position>=36 && checkpointsPassed>0;
    return {
      format:"FISICA_UTN_GAME_RESULT_V2",
      game:{
        id:session.gameId,
        version:session.gameVersion,
        bankVersion:session.bankVersion,
        unit:"Unidad 2 · Cinemática"
      },
      student:cleanStudent(session.student),
      run:{
        attemptNumber:(session.previousRuns||[]).length+1,
        previousAttempts:(session.previousRuns||[]).length,
        totalAttempts:(session.previousRuns||[]).length+1,
        startedAt:session.startedAt,
        finishedAt:session.finishedAt,
        generatedAt,
        timezone:Intl.DateTimeFormat().resolvedOptions().timeZone||null,
        durationSeconds:durationSeconds(session.startedAt,session.finishedAt),
        completed
      },
      result:{
        finalCell:session.position,
        score:session.score,
        correct:session.correct,
        incorrect:session.incorrect,
        rolls:session.rolls,
        energyFinal:session.energy,
        energyMax:session.energyMax,
        simulationsSolved:session.simulationsSolved,
        checkpointsPassed,
        checkpointAttempts:(session.checkpointAttempts||[]).length
      },
      researchData:{
        previousRuns:session.previousRuns||[],
        attention:{
          focusLossCount:Number(session.attention?.lossCount)||0,
          totalAwaySeconds:Number(session.attention?.totalAwaySeconds)||0,
          pageHideCount:Number(session.attention?.pageHideCount)||0,
          note:"Indicadores del navegador. Una pérdida de foco no identifica qué recurso externo fue consultado."
        },
        answers:session.answers||[],
        simulations:session.simulations||[],
        energyChallenges:session.energyChallenges||[],
        checkpointAttempts:session.checkpointAttempts||[],
        energyHistory:session.energyHistory||[],
        events:session.events||[]
      }
    };
  }

  function fallbackHash(text){
    let h1=0x811c9dc5, h2=0x9e3779b9;
    for(let i=0;i<text.length;i++){
      const c=text.charCodeAt(i);
      h1=Math.imul(h1^c,0x01000193)>>>0;
      h2=Math.imul(h2^c,0x85ebca6b)>>>0;
    }
    return (h1.toString(16).padStart(8,"0")+h2.toString(16).padStart(8,"0")).repeat(4).slice(0,64);
  }

  async function sha256(text){
    try{
      if(globalThis.crypto?.subtle){
        const data=new TextEncoder().encode(text);
        const buf=await crypto.subtle.digest("SHA-256",data);
        return [...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,"0")).join("");
      }
    }catch(e){}
    return fallbackHash(text);
  }

  function shortCode(hex){
    const s=String(hex).toUpperCase();
    return `${PREFIX}-${s.slice(0,4)}-${s.slice(4,8)}-${s.slice(8,12)}`;
  }

  async function createRecord(session,generatedAt=null){
    const when=generatedAt||new Date().toISOString();
    const base=baseRecord(session,when);
    const canonical=JSON.stringify(base);
    const digest=await sha256(canonical);
    return {
      ...base,
      validation:{
        purpose:"Control de consistencia local; no constituye firma criptográfica del servidor.",
        algorithm:globalThis.crypto?.subtle?"SHA-256":"FALLBACK-LOCAL-HASH",
        digest,
        code:shortCode(digest)
      }
    };
  }

  function fileName(record){
    const sid=(record.student.id||record.student.name||"sin_id").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-zA-Z0-9_-]+/g,"_").slice(0,40);
    const stamp=(record.run.finishedAt||record.run.generatedAt||new Date().toISOString()).replace(/[-:]/g,"").replace(/\.\d{3}Z$/,"Z").replace("T","_");
    return `Fisica_U2_${sid}_${stamp}.json`;
  }

  function download(record){
    const blob=new Blob([JSON.stringify(record,null,2)],{type:"application/json;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;a.download=fileName(record);document.body.append(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  }

  window.CINEMATICA_REGISTRO={createRecord,download,fileName,sha256,shortCode};
})();
