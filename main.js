'use strict';

/* ── Pixel helpers ─────────────────────────────── */
function trackEvent(name, params={}) {
  try {
    if (typeof gtag!=='undefined') gtag('event', name, {...params, event_category:'conversion'});
    if (typeof fbq!=='undefined') fbq('track', name==='whatsapp_click'?'Contact':'ViewContent', params);
    if (typeof ttq!=='undefined') ttq.track(name==='whatsapp_click'?'Contact':'ViewContent');
    if (typeof clarity!=='undefined') clarity('set','event',name);
  } catch(e){}
}

/* ── Scroll Reveal ─────────────────────────────── */
const revealObs = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if (!entry.isIntersecting) return;
    const siblings = entry.target.parentElement.querySelectorAll('.reveal');
    const idx = Array.from(siblings).indexOf(entry.target);
    entry.target.style.transitionDelay = `${Math.min(idx*80,300)}ms`;
    entry.target.classList.add('visible');
    revealObs.unobserve(entry.target);
  });
},{threshold:0.1, rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el=>revealObs.observe(el));

/* ── Navbar scroll ─────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll',()=>navbar?.classList.toggle('scrolled',window.scrollY>50),{passive:true});

/* ── Hamburger ─────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('nav-mobile');
hamburger?.addEventListener('click',()=>{
  const open = hamburger.classList.toggle('open');
  navMobile?.classList.toggle('open',open);
  hamburger.setAttribute('aria-expanded',open);
  document.body.style.overflow = open?'hidden':'';
});
navMobile?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  hamburger?.classList.remove('open');
  navMobile.classList.remove('open');
  document.body.style.overflow='';
}));

/* ── Smooth scroll ─────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener('click',e=>{
    const t = document.querySelector(link.getAttribute('href'));
    if(!t) return;
    e.preventDefault();
    window.scrollTo({top: t.getBoundingClientRect().top+window.scrollY-80, behavior:'smooth'});
  });
});

/* ── WA click tracking ─────────────────────────── */
document.querySelectorAll('a[href*="wa.me"]').forEach(link=>{
  link.addEventListener('click',()=>{
    const section = link.closest('section')?.getAttribute('aria-label') || link.closest('section')?.id || 'unknown';
    trackEvent('whatsapp_click',{event_label: section});
  });
});

/* ════════════════════════════════
   AUDIENCE SWITCHER
════════════════════════════════ */
const btnMayor = document.getElementById('btn-mayor');
const btnDetal = document.getElementById('btn-detal');
const heroMayor = document.getElementById('hero-mayor');
const heroDetal = document.getElementById('hero-detal');

function setAudience(aud) {
  const isMayor = aud === 'mayor';
  btnMayor.classList.toggle('aud-active', isMayor);
  btnDetal.classList.toggle('aud-active', !isMayor);
  btnMayor.setAttribute('aria-selected', isMayor);
  btnDetal.setAttribute('aria-selected', !isMayor);
  if (heroMayor) { heroMayor.classList.toggle('hero-layout--hidden', !isMayor); heroMayor.setAttribute('aria-hidden', !isMayor); }
  if (heroDetal) { heroDetal.classList.toggle('hero-layout--hidden', isMayor); heroDetal.setAttribute('aria-hidden', isMayor); }
  trackEvent('audience_switch', {event_label: aud});
  // Actualizar WA flotante según audiencia
  const waFloat = document.querySelector('.wa-float');
  const waLabel = document.querySelector('.wa-label');
  if (waFloat && waLabel) {
    if (isMayor) {
      waFloat.href = 'https://wa.me/573117757407?text=Hola%20Saramantha%20%F0%9F%8C%B8"exit-popup-box">
      <button class="exit-close-btn">✕</button>
      <span class="exit-popup-icon">💰</span>
      <h3>¿Todavía no te decidiste?</h3>
      <p>Con <strong>solo 6 pijamas</strong> empezás a generar ingresos. La inversión mínima es <strong>$129.000</strong> — y la ganancia potencial es <strong>$123.000</strong>.</p>
      <div class="exit-anchor" style="margin-bottom:20px">
        <span style="font-size:.85rem;color:var(--muted)">Inversión: $129.000</span>
        <span>→</span>
        <strong style="font-family:var(--font-display);font-size:1.4rem;color:var(--wine)">Ganás $123.000</strong>
      </div>
      <a href="https://wa.me/573117757407?text=Hola%20Saramantha%20%F0%9F%8C%B8" class="exit-popup-cta" target="_blank" rel="noopener">Empezar con 6 pijamas</a>
      <p class="exit-popup-note">Sin compromiso · Respondemos en &lt;1 hora</p>
    </div>`;
  document.body.appendChild(p);
  p.querySelector('.exit-close-btn')?.addEventListener('click',()=>p.remove());
  p.addEventListener('click',e=>{ if(e.target===p) p.remove(); });
  p.querySelector('a')?.addEventListener('click',()=>trackEvent('whatsapp_click',{event_label:'exit_intent_mayor'}));
}

console.log('%c🌸 Saramantha Pijamas · Indisutex SAS','font-size:18px;font-weight:700;color:#691F4D;font-family:Georgia,serif;');
console.log('%cFabricantes de pijamas en Colombia 🇨🇴','color:#B16A8D;font-size:12px;');
