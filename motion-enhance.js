const counters=document.querySelectorAll('[data-count]');
const counterObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  const el=entry.target,target=Number(el.dataset.count),start=performance.now();
  const tick=now=>{const p=Math.min((now-start)/1500,1);el.textContent=Math.round(target*(1-Math.pow(1-p,3))).toLocaleString();if(p<1)requestAnimationFrame(tick)};
  requestAnimationFrame(tick);counterObserver.unobserve(el);
}),{threshold:.45});
counters.forEach(el=>counterObserver.observe(el));
const storyItems=document.querySelectorAll('.article-main h2,.article-main h3,.article-main p,.aside');
const storyObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('on');storyObserver.unobserve(entry.target)}}),{threshold:.12});
storyItems.forEach(el=>storyObserver.observe(el));
document.querySelectorAll('.kakao-float').forEach(el=>el.addEventListener('click',e=>e.preventDefault()));
if(matchMedia('(min-width:621px) and (prefers-reduced-motion:no-preference)').matches){const c=document.createElement('canvas'),x=c.getContext('2d');c.className='interactive-lines';document.body.prepend(c);let w,h,mx=-999,my=-999;const d=Array.from({length:32},()=>({x:Math.random(),y:Math.random(),vx:(Math.random()-.5)*.00009,vy:(Math.random()-.5)*.00009})),size=()=>{w=c.width=innerWidth*devicePixelRatio;h=c.height=innerHeight*devicePixelRatio;x.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);w=innerWidth;h=innerHeight};size();addEventListener('resize',size,{passive:true});addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY},{passive:true});(function draw(){x.clearRect(0,0,w,h);d.forEach(a=>{a.x+=a.vx;a.y+=a.vy;if(a.x<0||a.x>1)a.vx*=-1;if(a.y<0||a.y>1)a.vy*=-1});for(let i=0;i<d.length;i++){const a=d[i],ax=a.x*w,ay=a.y*h;for(let j=i+1;j<d.length;j++){const b=d[j],bx=b.x*w,by=b.y*h,q=Math.hypot(ax-bx,ay-by);if(q<145){x.strokeStyle=`rgba(65,112,220,${(1-q/145)*.1})`;x.beginPath();x.moveTo(ax,ay);x.lineTo(bx,by);x.stroke()}}const q=Math.hypot(ax-mx,ay-my);if(q<210){x.strokeStyle=`rgba(42,199,222,${(1-q/210)*.4})`;x.beginPath();x.moveTo(ax,ay);x.lineTo(mx,my);x.stroke();x.fillStyle='rgba(49,99,225,.38)';x.beginPath();x.arc(ax,ay,2,0,Math.PI*2);x.fill()}}requestAnimationFrame(draw)})()}
