const links=document.querySelectorAll(".index__link");
const sections=document.querySelectorAll(".section[id]");
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const id=entry.target.id;
      links.forEach(link=>link.classList.toggle("is-active",link.getAttribute("href")===`#${id}`));
    }
  });
},{rootMargin:"-40% 0px -55% 0px"});
sections.forEach(section=>observer.observe(section));

const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const stats=document.querySelectorAll("#ledger-strip dd[data-count]");
function animateCount(el){
  const target=parseFloat(el.dataset.count), prefix=el.dataset.prefix||"", suffix=el.dataset.suffix||"";
  const start=performance.now(), duration=900;
  function tick(now){
    const p=Math.min((now-start)/duration,1), eased=1-Math.pow(1-p,3), value=target*eased;
    el.textContent=`${prefix}${String(target).includes(".")?value.toFixed(1):Math.round(value)}${suffix}`;
    if(p<1)requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
window.addEventListener("load",()=>{
  stats.forEach(el=>{
    if(reduced) el.textContent=`${el.dataset.prefix||""}${el.dataset.count}${el.dataset.suffix||""}`;
    else animateCount(el);
  });
});

const tabs=document.querySelectorAll(".rec-tab");
const panels=document.querySelectorAll("[data-panel]");
tabs.forEach(tab=>{
  tab.addEventListener("click",()=>{
    const filter=tab.dataset.filter;
    tabs.forEach(t=>t.classList.toggle("is-active",t===tab));
    panels.forEach(panel=>{
      const show=panel.dataset.panel===filter;
      panel.classList.toggle("is-visible",show);
      if(panel.dataset.panel==="received") panel.style.display=filter==="received"?"grid":"none";
    });
  });
});
