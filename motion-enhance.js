const counters=document.querySelectorAll('[data-count]');
const counterObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  const el=entry.target,target=Number(el.dataset.count),start=performance.now();
  const tick=now=>{const p=Math.min((now-start)/1500,1);el.textContent=Math.round(target*(1-Math.pow(1-p,3))).toLocaleString();if(p<1)requestAnimationFrame(tick)};
  requestAnimationFrame(tick);counterObserver.unobserve(el);
}),{threshold:.45});
counters.forEach(el=>counterObserver.observe(el));
