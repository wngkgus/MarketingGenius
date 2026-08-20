(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const targets=[...document.querySelectorAll('.section-head,.service-tile,.plan-card,.keyword-card,.method,.faq details,.region-nav a,.cta h2,.cta p,.cta .btn')];
  targets.forEach((el,i)=>{el.classList.add('reveal'); if(el.classList.contains('service-tile')||el.classList.contains('method')) el.style.setProperty('--delay',`${(i%4)*70}ms`);});
  if(!reduced){
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target);}}),{threshold:.1,rootMargin:'0px 0px -35px'});
    targets.forEach(el=>io.observe(el));
  } else targets.forEach(el=>el.classList.add('is-visible'));

  // Visible circles / diagonals / cross marks across the actual page.
  const zones=[...document.querySelectorAll('.entry-intro,.hero,.section,.cta')];
  zones.forEach((zone,i)=>{
    const layer=document.createElement('div');
    layer.className='motion-geometry';
    layer.innerHTML='<i class="geo-ring r1"></i><i class="geo-ring r2"></i><i class="geo-ring r3"></i><i class="geo-line l1"></i><i class="geo-line l2"></i><i class="geo-line l3"></i><i class="geo-cross c1"></i><i class="geo-cross c2"></i><i class="geo-dotgrid"></i>';
    zone.prepend(layer);
    if(i>0){
      const word=document.createElement('div'); word.className='motion-word';
      word.textContent=zone.classList.contains('hero')?'MARKETING':zone.classList.contains('cta')?'CONTACT':(['STRATEGY','CONTENT','SEARCH','GROWTH'][i%4]);
      zone.append(word);
    }
  });

  // Add a clear moving strip under the main hero.
  const hero=document.querySelector('.hero');
  if(hero){
    const ticker=document.createElement('div'); ticker.className='motion-ticker';
    const words=['HOMEPAGE','SNS MARKETING','CODE SEO','BLOG','CAFE','LOCAL SEARCH'];
    const set=words.map(w=>`<span>${w}</span>`).join('');
    ticker.innerHTML=`<div class="motion-ticker__track">${set}${set}</div>`;
    hero.insertAdjacentElement('afterend',ticker);
  }

  // Give key text a scanning highlight.
  document.querySelectorAll('.entry-title .accent,.hero h1 em,.section-head h2').forEach(el=>el.classList.add('text-scan'));

  if(reduced) return;
  zones.forEach(zone=>{
    zone.addEventListener('pointermove',e=>{
      if(innerWidth<760)return;
      const r=zone.getBoundingClientRect(), nx=(e.clientX-r.left)/r.width-.5, ny=(e.clientY-r.top)/r.height-.5;
      zone.querySelectorAll('.geo-ring').forEach((el,j)=>el.style.transform=`translate3d(${nx*(12+j*8)}px,${ny*(12+j*8)}px,0)`);
      zone.querySelectorAll('.geo-line').forEach((el,j)=>el.style.marginLeft=`${nx*(5+j*4)}px`);
      zone.style.setProperty('--px',`${(nx+.5)*100}%`); zone.style.setProperty('--py',`${(ny+.5)*100}%`);
      zone.style.setProperty('--dx',`${nx*18}px`); zone.style.setProperty('--dy',`${ny*18}px`);
    });
  });
})();

// 2026-08-20 richer but lightweight decorative motion.
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const intro = document.querySelector('.entry-intro');
  if (intro) {
    const deco = document.createElement('div');
    deco.className = 'intro-microdots';
    deco.setAttribute('aria-hidden','true');
    deco.innerHTML = '<i></i><i></i><i></i><i></i><i></i><i></i>';
    intro.append(deco);
    const s = document.createElement('style');
    s.textContent = '.intro-microdots{position:absolute;inset:0;pointer-events:none;z-index:1}.intro-microdots i{position:absolute;width:5px;height:5px;border:1px solid rgba(117,220,235,.7);border-radius:50%;animation:microFloat 7s ease-in-out infinite alternate}.intro-microdots i:nth-child(1){left:8%;top:23%}.intro-microdots i:nth-child(2){left:16%;top:72%;animation-delay:-2s}.intro-microdots i:nth-child(3){left:43%;top:13%;animation-delay:-4s}.intro-microdots i:nth-child(4){right:22%;top:68%;animation-delay:-1s}.intro-microdots i:nth-child(5){right:8%;top:30%;animation-delay:-3s}.intro-microdots i:nth-child(6){right:36%;bottom:9%;animation-delay:-5s}@keyframes microFloat{to{transform:translate(18px,-14px) scale(1.45);opacity:.35}}';
    document.head.append(s);
  }
})();

// v5: clearer geometric motion on main + every regional landing page.
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const zones = [...document.querySelectorAll('.hero,.section,.cta')];
  zones.forEach((zone, idx) => {
    if (zone.querySelector('.premium-geo')) return;
    const layer = document.createElement('div');
    layer.className = 'premium-geo';
    layer.setAttribute('aria-hidden','true');
    layer.innerHTML = '<i class="pg-orbit"></i><i class="pg-orbit2"></i><i class="pg-axis"></i><i class="pg-axis2"></i><i class="pg-cross"></i><i class="pg-dot"></i>';
    zone.prepend(layer);
    if (!reduced && matchMedia('(pointer:fine)').matches) {
      zone.addEventListener('pointermove', e => {
        const r=zone.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
        layer.querySelector('.pg-orbit').style.margin=`${y*10}px ${x*18}px`;
        layer.querySelector('.pg-orbit2').style.margin=`${-y*7}px ${-x*12}px`;
        layer.querySelector('.pg-cross').style.translate=`${x*24}px ${y*18}px`;
      }, {passive:true});
    }
  });
})();
