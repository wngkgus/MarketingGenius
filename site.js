const menu=document.querySelector('.menu'),nav=document.querySelector('.nav');
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav?.classList.remove('open')));
const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('on');io.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async event=>{event.preventDefault();await navigator.clipboard.writeText(button.dataset.copy);const original=button.innerHTML;button.textContent='카카오톡 ID 복사 완료';setTimeout(()=>button.innerHTML=original,1800)}));
const glow=document.querySelector('.cursor-glow');let glowFrame=0,pointerX=0,pointerY=0;
addEventListener('pointermove',event=>{pointerX=event.clientX;pointerY=event.clientY;if(!glow||glowFrame)return;glowFrame=requestAnimationFrame(()=>{glow.style.left=pointerX+'px';glow.style.top=pointerY+'px';glowFrame=0})},{passive:true});
const modal=document.querySelector('.detail-modal'),modalImage=modal?.querySelector('.detail-modal-image'),modalTitle=modal?.querySelector('h2'),modalDescription=modal?.querySelector('.detail-modal-copy p');let lastTrigger=null;
const closeModal=()=>{if(!modal)return;modal.hidden=true;document.body.classList.remove('modal-open');modalImage.removeAttribute('src');lastTrigger?.focus()};
document.addEventListener('click',event=>{const trigger=event.target.closest('.card-detail-trigger');if(trigger&&modal){lastTrigger=trigger;modalTitle.textContent=trigger.dataset.detailTitle;modalDescription.textContent=trigger.dataset.detailDescription;modalImage.alt=trigger.dataset.detailTitle+' 작업 이미지';modalImage.src=trigger.dataset.detailImage;modal.hidden=false;document.body.classList.add('modal-open');modal.querySelector('.detail-modal-close').focus();return}if(event.target.closest('.detail-modal-close,.detail-modal-backdrop'))closeModal()});
addEventListener('keydown',event=>{if(event.key==='Escape'&&!modal?.hidden)closeModal()});
const heroVideo=document.querySelector('.home-visual video');
if(heroVideo){const videoObserver=new IntersectionObserver(([entry])=>entry.isIntersecting?heroVideo.play().catch(()=>{}):heroVideo.pause(),{threshold:.05});videoObserver.observe(heroVideo);document.addEventListener('visibilitychange',()=>document.hidden?heroVideo.pause():heroVideo.play().catch(()=>{}))}
