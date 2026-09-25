window.CINEMATICA_MATH = {
  async typeset(node){
    if(!node || !window.MathJax) return;
    try{
      if(MathJax.startup?.promise) await MathJax.startup.promise;
      if(MathJax.typesetClear) MathJax.typesetClear([node]);
      if(MathJax.typesetPromise) await MathJax.typesetPromise([node]);
    }catch(err){
      console.warn("MathJax dynamic typeset error:", err);
    }
  }
};