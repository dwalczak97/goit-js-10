import"./assets/styles-f3635d75.js";import{i as a}from"./assets/vendor-77e16229.js";const n=document.querySelector(".form");n.addEventListener("submit",s=>{s.preventDefault();const e=n.elements.delay.value,t=n.elements.state.value;console.log("Form submitted!",{delayForm:e},{stateForm:t}),l(e,t).then(o=>{console.log(o)}).catch(o=>{console.error(o)})});function l(s,e){return new Promise((t,o)=>{setTimeout(()=>{const r=`Promise ${e} in ${s}ms`;e==="fulfilled"?(a.success({message:r,backgroundColor:"#59a10d",messageColor:"#fff"}),t(r)):(a.warning({message:r,backgroundColor:"#ef4040",messageColor:"#fff"}),o(r))},parseInt(s))})}
//# sourceMappingURL=commonHelpers2.js.map
