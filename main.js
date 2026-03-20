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
      waFloat.href = 'https://wa.me/573117757407?text=Hola%20Saramantha%20%F0%9F%8C%B8';
      waLabel.textContent = 'Precio mayorista';
    } else {
      waFloat.href = 'https://wa.me/573117757407?text=Hola%20Saramantha%20%F0%9F%8C%B8';
      waLabel.textContent = 'Pide ahora';
    }
  }
}
btnMayor?.addEventListener('click',()=>setAudience('mayor'));
btnDetal?.addEventListener('click',()=>setAudience('detal'));

/* ════════════════════════════════
   CALCULADORA DE RENTABILIDAD
════════════════════════════════ */
const unitPrices = { 6:21500, 12:19500, 18:19500, 24:17500, 30:17500, 36:17500, 42:17500, 48:16500, 54:16500, 60:16500, 66:16500, 72:16500, 78:16500, 84:16000, 90:16000, 96:16000, 102:16000, 108:16000, 114:16000, 120:16000, 126:16000, 132:16000, 138:16000, 144:16000 };

function fmt(n) {
  return '$' + Math.round(n).toLocaleString('es-CO');
}

function calcUpdate() {
  const units   = parseInt(document.getElementById('c-units')?.value || 24);
  const sell    = parseInt(document.getElementById('c-price-sell')?.value || 42000);
  const unitCost = unitPrices[units] || 16000;
  const invest   = units * unitCost;
  const revenue  = units * sell;
  const profit   = revenue - invest;
  const margin   = Math.round((profit / invest) * 100);
  const breakEven = Math.ceil(invest / sell);

  const set = (id, val) => { const el=document.getElementById(id); if(el) el.textContent=val; };

  set('d-units',  `${units} unidades (${units/12 === Math.floor(units/12) ? units/12 + (units/12===1?' docena':' docenas') : units + ' und'})`);
  set('d-sell',   `${fmt(sell)} por unidad`);
  set('r-invest',  fmt(invest));
  set('r-unit-cost', `${fmt(unitCost)}/und`);
  set('r-revenue', fmt(revenue));
  set('r-units-sold', `${units} × ${fmt(sell)}`);
  set('r-profit',  fmt(profit));
  set('r-margin',  `Margen: ${margin}%`);
  set('ci-units',  units);
  set('ci-invest', fmt(invest));
  set('ci-sell',   fmt(sell));
  set('ci-profit', fmt(profit));
  set('ci-break',  breakEven);

  // Actualizar enlace WA con los datos calculados
  const waBtn = document.getElementById('calc-wa-btn');
  if (waBtn) {
    waBtn.href = `https://wa.me/573117757407?text=Hola!%20Calculé%20mi%20pedido%3A%20${units}%20unidades%20a%20${fmt(unitCost)}%20c/u%20=%20${fmt(invest)}%20de%20inversión.%20Quiero%20coordinar%20el%20pedido%20📦`;
  }
}

document.getElementById('c-units')?.addEventListener('input', calcUpdate);
document.getElementById('c-price-sell')?.addEventListener('input', calcUpdate);
calcUpdate(); // Inicializar

/* ── ViewContent pixel calculadora ─────────────── */
const calcObs = new IntersectionObserver((entries)=>{
  if (entries[0].isIntersecting) {
    try { fbq?.('track','ViewContent',{content_name:'calculadora_rentabilidad'}); ttq?.track('ViewContent'); } catch(e){}
    calcObs.disconnect();
  }
},{threshold:0.3});
const calcSection = document.getElementById('calculadora');
if (calcSection) calcObs.observe(calcSection);

/* ── ViewContent precio tabla ───────────────────── */
const pricingObs = new IntersectionObserver((entries)=>{
  if (entries[0].isIntersecting) {
    try { fbq?.('track','ViewContent',{content_name:'tabla_precios_mayorista'}); } catch(e){}
    pricingObs.disconnect();
  }
},{threshold:0.2});
const pricingSection = document.getElementById('precios');
if (pricingSection) pricingObs.observe(pricingSection);

/* ════════════════════════════════
   LIGHTBOX
════════════════════════════════ */
const colItems = Array.from(document.querySelectorAll('.col-item'));
const lightbox  = document.getElementById('lightbox');
const lbImg     = document.getElementById('lb-img');
const lbWa      = document.getElementById('lb-wa');
const lbClose   = document.getElementById('lb-close');
const lbPrev    = document.getElementById('lb-prev');
const lbNext    = document.getElementById('lb-next');
let lbCurrent   = 0;
const mayorPrices = ['$8.500','$8.500','$8.500','$8.500','$8.500','$8.500','$8.500','$8.500','$8.500','$8.500','$8.500','$8.500','$8.500','$10.500','$10.500'];
const detalPrices = ['$15.500','$15.500','$15.500','$15.500','$15.500','$15.500','$15.500','$15.500','$15.500','$15.500','$15.500','$15.500','$15.500','$22.000','$22.000'];

function openLb(idx) {
  lbCurrent = idx;
  const imgEl = colItems[idx]?.querySelector('img');
  if (!imgEl) return;
  lbImg.src = imgEl.src;
  lbImg.alt = imgEl.alt;
  const lbMayor = document.getElementById('lb-price-mayor');
  const lbDetal = document.getElementById('lb-price-detal');
  if (lbMayor) lbMayor.textContent = (mayorPrices[idx]||'$8.500') + '/ud (x12+)';
  if (lbDetal) lbDetal.textContent = detalPrices[idx]||'$15.500';
  if (lbWa) lbWa.href = `https://wa.me/573117757407?text=Hola!%20Me%20interesa%20el%20diseño%20${idx+1}%20📦%20¿Tienen%20disponibilidad%20y%20en%20qué%20tallas?`;
  lightbox?.classList.add('active');
  document.body.style.overflow = 'hidden';
  trackEvent('lightbox_open',{event_label:`design_${idx+1}`});
}
function closeLb() { lightbox?.classList.remove('active'); document.body.style.overflow=''; }
function prevLb() { openLb((lbCurrent-1+colItems.length)%colItems.length); }
function nextLb() { openLb((lbCurrent+1)%colItems.length); }

colItems.forEach((item,idx)=>{
  item.addEventListener('click',e=>{ if(e.target.closest('a')) return; openLb(idx); });
  item.setAttribute('tabindex','0');
  item.setAttribute('role','button');
  item.setAttribute('aria-label',`Ver pijama diseño ${idx+1}`);
  item.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); openLb(idx); } });
});
lbClose?.addEventListener('click',closeLb);
lbPrev?.addEventListener('click',prevLb);
lbNext?.addEventListener('click',nextLb);
lightbox?.addEventListener('click',e=>{ if(e.target===lightbox) closeLb(); });
let lbTS=0;
lightbox?.addEventListener('touchstart',e=>{ lbTS=e.touches[0].clientX; },{passive:true});
lightbox?.addEventListener('touchend',e=>{ const d=lbTS-e.changedTouches[0].clientX; if(Math.abs(d)>50) d>0?nextLb():prevLb(); });
document.addEventListener('keydown',e=>{
  if (!lightbox?.classList.contains('active')) return;
  if(e.key==='Escape') closeLb();
  if(e.key==='ArrowLeft') prevLb();
  if(e.key==='ArrowRight') nextLb();
});

/* ════════════════════════════════
   LIVE TICKER
════════════════════════════════ */
const tickerMsgs = [
  '📦 Un revendedor de Bogotá acaba de pedir 3 docenas · diseños mixtos',
  '🌸 Valentina (Medellín) pidió su pijama detal hace 8 min',
  '💰 Juliana aumentó su pedido de 12 a 24 und al ver el margen',
  '⚡ Pedido mayorista de Cali · 2 docenas · despachado hoy',
  '🏪 Una tienda de Barranquilla hizo su segundo pedido del mes',
  '🎁 María eligió 2 diseños de regalo — detal',
  '📊 48 unidades pedidas por distribuidora de Manizales',
  '🌸 Daniela (Pereira) consultó tallas y ya tiene su pedido listo',
];
let tIdx=0;
const tEl=document.getElementById('ticker-text');
if (tEl) {
  tEl.textContent=tickerMsgs[0];
  setInterval(()=>{
    tIdx=(tIdx+1)%tickerMsgs.length;
    Object.assign(tEl.style,{opacity:'0',transform:'translateY(-8px)',transition:'opacity .3s,transform .3s'});
    setTimeout(()=>{
      tEl.textContent=tickerMsgs[tIdx];
      Object.assign(tEl.style,{opacity:'1',transform:'translateY(0)'});
    },340);
  },5000);
}

/* ── FAQ accordion ─────────────────────────────── */
document.querySelectorAll('.faq-item').forEach(item=>{
  item.addEventListener('toggle',()=>{
    if(item.open) document.querySelectorAll('.faq-item[open]').forEach(o=>{ if(o!==item) o.removeAttribute('open'); });
  });
});

/* ── Exit intent ───────────────────────────────── */
let exitShown=false;
document.addEventListener('mouseleave',e=>{
  if(e.clientY<5 && !exitShown) { exitShown=true; showExit(); }
});
function showExit() {
  const p=document.createElement('div');
  p.className='exit-popup-overlay';
  p.setAttribute('role','dialog');
  p.innerHTML=`
    <div class="exit-popup-box">
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
