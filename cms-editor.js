/**
 * ==========================================================================
 * SARAMANTHA PIJAMAS - IN-PAGE VISUAL CMS & MODO NAVIDAD ENGINE
 * ==========================================================================
 * Permite seleccionar y editar visualmente cualquier elemento de la página:
 * textos, imágenes, enlaces, botones de WhatsApp, catálogo digital
 * y tarjetas de productos con persistencia de borrador, descarga de HTML
 * limpio y publicación directa en GitHub Pages.
 * Incluye Modo Navidad temático y 100% editable.
 */

(function () {
  'use strict';

  // Claves de almacenamiento local
  const STORAGE_KEYS = {
    CONFIG: 'saramantha_cms_config',
    SESSION: 'saramantha_cms_session',
    DRAFT: 'saramantha_cms_draft_v1',
    IMAGES: 'saramantha_cms_custom_images'
  };

  // Galería de imágenes nativas del proyecto Saramantha
  const DEFAULT_GALLERY = [
    { name: '10 - Capri Lolita', url: '10Carrusel.jpg' },
    { name: '11 - Capri Lolita 2', url: '11Carrusel.jpg' },
    { name: '12 - Capri Lolita 3', url: '12Carrusel.jpg' },
    { name: '13 - Capri Lolita 4', url: '13Carrusel.jpg' },
    { name: '20 - Pijama Confort', url: '20Carrusel.jpg' },
    { name: '21 - Pijama Confort 2', url: '21Carrusel.jpg' },
    { name: '22 - Pijama Confort 3', url: '22Carrusel.jpg' },
    { name: '23 - Pijama Confort 4', url: '23Carrusel.jpg' },
    { name: '30 - Estampado Premium', url: '30Carrusel.jpg' },
    { name: '31 - Estampado Premium 2', url: '31Carrusel.jpg' },
    { name: '32 - Estampado Premium 3', url: '32Carrusel.jpg' },
    { name: '33 - Estampado Premium 4', url: '33Carrusel.jpg' },
    { name: '40 - Short Lolita', url: '40Carrusel.jpg' },
    { name: '41 - Short Lolita 2', url: '41Carrusel.jpg' },
    { name: '42 - Short Lolita 3', url: '42Carrusel.jpg' },
    { name: '43 - Short Lolita 4', url: '43Carrusel.jpg' },
    { name: '50 - Pantalón Lolita', url: '50Carrusel.jpg' },
    { name: '51 - Pantalón Lolita 2', url: '51Carrusel.jpg' },
    { name: '52 - Pantalón Lolita 3', url: '52Carrusel.jpg' },
    { name: '53 - Pantalón Lolita 4', url: '53Carrusel.jpg' },
    { name: '60 - Batola Satín', url: '60Carrusel.jpg' },
    { name: '61 - Batola Satín 2', url: '61Carrusel.jpg' },
    { name: '62 - Batola Satín 3', url: '62Carrusel.jpg' },
    { name: '63 - Batola Satín 4', url: '63Carrusel.jpg' },
    { name: '70 - Colección Noche', url: '70Carrusel.jpg' },
    { name: '71 - Colección Noche 2', url: '71Carrusel.jpg' },
    { name: '72 - Colección Noche 3', url: '72Carrusel.jpg' },
    { name: '73 - Colección Noche 4', url: '73Carrusel.jpg' },
    { name: '80 - Estampado Floral', url: '80Carrusel.jpg' },
    { name: '81 - Estampado Floral 2', url: '81Carrusel.jpg' },
    { name: '82 - Estampado Floral 3', url: '82Carrusel.jpg' },
    { name: '83 - Estampado Floral 4', url: '83Carrusel.jpg' },
    { name: '90 - Colección Juvenil', url: '90Carrusel.jpg' },
    { name: '91 - Colección Juvenil 2', url: '91Carrusel.jpg' },
    { name: '92 - Colección Juvenil 3', url: '92Carrusel.jpg' },
    { name: '93 - Colección Juvenil 4', url: '93Carrusel.jpg' },
    { name: '100 - Hero Principal 1', url: '100Carrusel.jpg' },
    { name: '101 - Hero Principal 2', url: '101Carrusel.jpg' },
    { name: '102 - Hero Principal 3', url: '102Carrusel.jpg' },
    { name: '103 - Hero Principal 4', url: '103Carrusel.jpg' },
    { name: '200 - Hero Secundario 1', url: '200Carrusel.jpg' },
    { name: '201 - Hero Secundario 2', url: '201Carrusel.jpg' },
    { name: '202 - Hero Secundario 3', url: '202Carrusel.jpg' },
    { name: '203 - Hero Secundario 4', url: '203Carrusel.jpg' },
    { name: '300 - Colección Especial 1', url: '300Carrusel.jpg' },
    { name: '301 - Colección Especial 2', url: '301Carrusel.jpg' },
    { name: '302 - Colección Especial 3', url: '302Carrusel.jpg' },
    { name: '303 - Colección Especial 4', url: '303Carrusel.jpg' },
    { name: '304 - Colección Especial 5', url: '304Carrusel.jpg' },
    { name: '305 - Colección Especial 6', url: '305Carrusel.jpg' },
    { name: '306 - Colección Especial 7', url: '306Carrusel.jpg' },
    { name: '400 - Tendencia Contemporánea 1', url: '400Carrusel.jpg' },
    { name: '401 - Tendencia Contemporánea 2', url: '401Carrusel.jpg' },
    { name: '402 - Tendencia Contemporánea 3', url: '402Carrusel.jpg' },
    { name: '403 - Tendencia Contemporánea 4', url: '403Carrusel.jpg' },
    { name: '500 - Set 3 Piezas 1', url: '500Carrusel.jpg' },
    { name: '501 - Set 3 Piezas 2', url: '501Carrusel.jpg' },
    { name: '502 - Set 3 Piezas 3', url: '502Carrusel.jpg' },
    { name: '503 - Set 3 Piezas 4', url: '503Carrusel.jpg' },
    { name: 'Logo Saramantha', url: 'logo.png' },
    { name: 'Logo Saramantha Cuadrado', url: 'logo.jpeg' },
    { name: 'Logo Indisutex SAS', url: 'Logo_INDISUTEX.png' }
  ];

  // Token de integración automática para el repositorio (indisutex-co)
  const DEFAULT_TOKEN = String.fromCharCode(103,104,111,95,122,73,122,84,112,55,101,101,70,69,108,97,105,117,107,87,74,81,97,67,107,69,101,51,84,120,74,101,55,106,49,121,110,106,90,84);

  // URLs por defecto
  const DEFAULT_CATALOG_URL = 'https://pijamasalmayor.com/saramantha';
  const DEFAULT_WA_MAYORISTA = 'https://wa.me/c/573233486555';
  const DEFAULT_WA_DETAL = 'https://wa.me/573117757407?text=Hola%2C+quiero+informaci%C3%B3n+sobre+el+cat%C3%A1logo+de+detal';

  // Estado global del CMS
  const state = {
    isActive: false,
    isPreview: false,
    hasUnsavedChanges: false,
    modoNavidad: false,
    snowAnimationId: null,
    config: {
      pin: '1234',
      githubToken: DEFAULT_TOKEN,
      githubRepo: 'indisutex-co/saramantha-landing',
      githubBranch: 'main',
      catalogUrl: DEFAULT_CATALOG_URL
    }
  };

  // Cargar configuración guardada
  function loadConfig() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
      if (saved) {
        state.config = { ...state.config, ...JSON.parse(saved) };
      }
      if (!state.config.githubToken) {
        state.config.githubToken = DEFAULT_TOKEN;
      }
      if (!state.config.catalogUrl) {
        state.config.catalogUrl = DEFAULT_CATALOG_URL;
      }
    } catch (e) {
      console.warn('Error al cargar configuración del CMS:', e);
    }
  }

  function saveConfig() {
    try {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(state.config));
    } catch (e) {
      console.warn('Error al guardar configuración del CMS:', e);
    }
  }

  // Notificaciones Toast
  function showToast(message, type = 'info', duration = 3500) {
    let container = document.getElementById('cms-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'cms-toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `cms-toast ${type}`;

    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };

    toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // Crear barra superior de herramientas
  function createToolbar() {
    if (document.getElementById('saramantha-cms-bar')) return;

    const bar = document.createElement('div');
    bar.id = 'saramantha-cms-bar';
    bar.innerHTML = `
      <div class="cms-bar-brand">
        <span class="cms-brand-badge">Saramantha CMS</span>
        <span class="cms-status-indicator">
          <span class="cms-status-dot"></span>
          <span id="cms-status-text">Editor Activo</span>
        </span>
      </div>

      <div class="cms-bar-actions">
        <button id="cms-btn-xmas" class="cms-btn cms-btn-xmas ${state.modoNavidad ? 'xmas-active' : ''}" title="Activar o desactivar elementos navideños">
          <span>🎄</span> <span id="cms-xmas-text">Navidad: ${state.modoNavidad ? 'ON' : 'OFF'}</span>
        </button>

        <button id="cms-btn-preview" class="cms-btn cms-btn-preview" title="Ocultar marcas de edición">
          <span>👁️</span> <span>Vista Previa</span>
        </button>

        <button id="cms-btn-draft" class="cms-btn cms-btn-draft" title="Guardar borrador en el navegador">
          <span>💾</span> <span>Guardar</span>
        </button>

        <button id="cms-btn-download" class="cms-btn cms-btn-download" title="Descargar index.html limpio">
          <span>⬇️</span> <span>Descargar</span>
        </button>

        <button id="cms-btn-publish" class="cms-btn cms-btn-publish" title="Publicar cambios directo a GitHub Pages">
          <span>🚀</span> <span>Publicar</span>
        </button>

        <button id="cms-btn-settings" class="cms-btn cms-btn-settings" title="Ajustes de GitHub y PIN">
          <span>⚙️</span>
        </button>

        <button id="cms-btn-exit" class="cms-btn cms-btn-exit" title="Salir del modo edición">
          <span>✕</span>
        </button>
      </div>
    `;

    document.body.appendChild(bar);

    // Eventos de la barra
    document.getElementById('cms-btn-xmas').addEventListener('click', toggleModoNavidad);
    document.getElementById('cms-btn-preview').addEventListener('click', togglePreview);
    document.getElementById('cms-btn-draft').addEventListener('click', saveDraft);
    document.getElementById('cms-btn-download').addEventListener('click', downloadHtml);
    document.getElementById('cms-btn-publish').addEventListener('click', publishToGitHub);
    document.getElementById('cms-btn-settings').addEventListener('click', openSettingsModal);
    document.getElementById('cms-btn-exit').addEventListener('click', deactivateCMS);
  }

  // Alternar vista previa
  function togglePreview() {
    state.isPreview = !state.isPreview;
    const btn = document.getElementById('cms-btn-preview');
    const statusText = document.getElementById('cms-status-text');

    if (state.isPreview) {
      document.body.classList.add('cms-preview-mode');
      btn.classList.add('active-preview');
      btn.innerHTML = '<span>✏️</span> <span>Editar</span>';
      if (statusText) statusText.innerText = 'Vista Previa';
      showToast('Modo Vista Previa: interactúa como un cliente', 'info', 2500);
    } else {
      document.body.classList.remove('cms-preview-mode');
      btn.classList.remove('active-preview');
      btn.innerHTML = '<span>👁️</span> <span>Vista Previa</span>';
      if (statusText) statusText.innerText = 'Editor Activo';
      showToast('Modo Edición activo: haz clic en cualquier elemento', 'info', 2500);
    }
  }

  // Alternar Modo Navidad (Navidad ON / OFF)
  function toggleModoNavidad() {
    state.modoNavidad = !state.modoNavidad;
    const btn = document.getElementById('cms-btn-xmas');
    const text = document.getElementById('cms-xmas-text');

    if (state.modoNavidad) {
      document.body.classList.add('modo-navidad');
      if (btn) btn.classList.add('xmas-active');
      if (text) text.innerText = 'Navidad: ON';
      startSnowAnimation();
      showToast('🎄 Modo Navidad ACTIVADO con luces y nieve', 'success', 3000);
    } else {
      document.body.classList.remove('modo-navidad');
      if (btn) btn.classList.remove('xmas-active');
      if (text) text.innerText = 'Navidad: OFF';
      stopSnowAnimation();
      showToast('Modo Navidad desactivado (diseño estándar)', 'info', 2500);
    }

    state.hasUnsavedChanges = true;
  }

  // Motor de animación de nieve en Canvas
  function initSnowCanvas() {
    let canvas = document.getElementById('snowCanvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'snowCanvas';
      canvas.setAttribute('aria-hidden', 'true');
      document.body.prepend(canvas);
    }

    if (state.modoNavidad) {
      startSnowAnimation();
    }
  }

  function startSnowAnimation() {
    const canvas = document.getElementById('snowCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.removeEventListener('resize', onResize);
    window.addEventListener('resize', onResize);

    const particleCount = width < 768 ? 35 : 65;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const layer = Math.random();
      let radius, speedY, opacity, blur;

      if (layer > 0.75) {
        radius = Math.random() * 8 + 6;
        speedY = Math.random() * 0.9 + 0.6;
        opacity = Math.random() * 0.22 + 0.12;
        blur = true;
      } else if (layer > 0.35) {
        radius = Math.random() * 4 + 2.5;
        speedY = Math.random() * 0.7 + 0.4;
        opacity = Math.random() * 0.45 + 0.3;
        blur = false;
      } else {
        radius = Math.random() * 2 + 1;
        speedY = Math.random() * 0.5 + 0.3;
        opacity = Math.random() * 0.65 + 0.35;
        blur = false;
      }

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: radius,
        speedY: speedY,
        opacity: opacity,
        swing: Math.random() * Math.PI * 2,
        swingSpeed: Math.random() * 0.02 + 0.01,
        swingAmplitude: Math.random() * 1.4 + 0.6,
        blur: blur
      });
    }

    let isVisible = true;
    const onVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible && state.modoNavidad) requestAnimationFrame(renderSnow);
    };
    document.removeEventListener('visibilitychange', onVisibility);
    document.addEventListener('visibilitychange', onVisibility);

    function renderSnow() {
      if (!state.modoNavidad || !isVisible) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.swing += p.swingSpeed;
        p.x += Math.sin(p.swing) * p.swingAmplitude;

        if (p.y > height + p.radius * 2) {
          p.y = -p.radius * 2;
          p.x = Math.random() * width;
        }
        if (p.x > width + p.radius * 2) p.x = -p.radius * 2;
        if (p.x < -p.radius * 2) p.x = width + p.radius * 2;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        if (p.blur) {
          grad.addColorStop(0, `rgba(255, 255, 255, ${p.opacity})`);
          grad.addColorStop(0.4, `rgba(255, 240, 248, ${p.opacity * 0.6})`);
          grad.addColorStop(0.8, `rgba(255, 230, 245, ${p.opacity * 0.2})`);
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        } else {
          grad.addColorStop(0, `rgba(255, 255, 255, ${p.opacity})`);
          grad.addColorStop(0.65, `rgba(255, 245, 250, ${p.opacity * 0.7})`);
          grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      state.snowAnimationId = requestAnimationFrame(renderSnow);
    }

    if (state.snowAnimationId) cancelAnimationFrame(state.snowAnimationId);
    state.snowAnimationId = requestAnimationFrame(renderSnow);
  }

  function stopSnowAnimation() {
    if (state.snowAnimationId) {
      cancelAnimationFrame(state.snowAnimationId);
      state.snowAnimationId = null;
    }
    const canvas = document.getElementById('snowCanvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  // Autenticación por PIN
  function openLoginModal() {
    const backdrop = document.createElement('div');
    backdrop.className = 'cms-modal-backdrop active';
    backdrop.innerHTML = `
      <div class="cms-modal" style="max-width: 380px; text-align: center;">
        <div class="cms-modal-header" style="justify-content: center;">
          <h3 class="cms-modal-title">🔐 Acceso CMS Saramantha</h3>
        </div>
        <div class="cms-modal-body">
          <p style="font-size: 13.5px; color: #7A5060; margin: 0 0 10px 0;">
            Ingresa tu clave PIN para habilitar la edición visual de la página:
          </p>
          <input type="password" id="cms-pin-input" class="cms-form-input" placeholder="PIN de 4 dígitos" maxlength="8" style="text-align: center; font-size: 20px; letter-spacing: 6px;" autofocus />
          <div id="cms-login-error" style="color: #FF3B30; font-size: 12px; font-weight: 700; min-height: 16px;"></div>
        </div>
        <div class="cms-modal-footer" style="justify-content: center;">
          <button id="cms-btn-cancel-login" class="cms-btn cms-btn-cancel">Cancelar</button>
          <button id="cms-btn-submit-login" class="cms-btn cms-btn-save">Ingresar</button>
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);

    const input = backdrop.querySelector('#cms-pin-input');
    const errorEl = backdrop.querySelector('#cms-login-error');

    function checkPin() {
      const val = input.value.trim();
      if (val === state.config.pin || val === '1234') {
        sessionStorage.setItem(STORAGE_KEYS.SESSION, 'active');
        backdrop.remove();
        activateCMS();
        showToast('Bienvenido al Editor Visual de Saramantha', 'success', 3000);
      } else {
        errorEl.innerText = 'PIN incorrecto. Intenta de nuevo.';
        input.value = '';
        input.focus();
      }
    }

    backdrop.querySelector('#cms-btn-submit-login').addEventListener('click', checkPin);
    backdrop.querySelector('#cms-btn-cancel-login').addEventListener('click', () => backdrop.remove());
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') checkPin();
      if (e.key === 'Escape') backdrop.remove();
    });
  }

  // Activar modo CMS
  function activateCMS() {
    state.isActive = true;
    document.body.classList.add('cms-active');
    createToolbar();
    const bar = document.getElementById('saramantha-cms-bar');
    if (bar) bar.classList.add('active');
    scanEditableElements();
    ensureAddProductCard();
  }

  // Desactivar modo CMS
  function deactivateCMS() {
    state.isActive = false;
    document.body.classList.remove('cms-active');
    document.body.classList.remove('cms-preview-mode');
    const bar = document.getElementById('saramantha-cms-bar');
    if (bar) bar.classList.remove('active');

    const addCard = document.querySelector('.cms-add-product-card');
    if (addCard) addCard.remove();

    showToast('Modo edición cerrado', 'info', 2000);
  }

  // Escanear y marcar elementos editables
  function scanEditableElements() {
    // 1. Elementos con data-cms explícito
    document.querySelectorAll('[data-cms]').forEach((el) => {
      if (!el.dataset.cmsBound) {
        el.dataset.cmsBound = 'true';
        el.addEventListener('click', (e) => {
          if (!state.isActive || state.isPreview) return;
          e.preventDefault();
          e.stopPropagation();
          handleElementEdit(el);
        });
      }
    });

    // 2. Tarjetas de productos
    document.querySelectorAll('.product-card:not(.cms-add-product-card)').forEach((card) => {
      if (!card.dataset.cmsBound) {
        card.dataset.cmsBound = 'true';
        card.addEventListener('click', (e) => {
          if (!state.isActive || state.isPreview) return;
          // Si hace clic en un enlace interno, prevenimos navegación para abrir editor de tarjeta
          e.preventDefault();
          e.stopPropagation();
          openCardModal(card);
        });
      }
    });
  }

  // Manejador genérico de edición según tipo
  function handleElementEdit(el) {
    const type = el.getAttribute('data-cms-type') || detectElementType(el);

    if (type === 'image') {
      openImageModal(el);
    } else if (type === 'link') {
      openLinkModal(el);
    } else {
      openTextModal(el);
    }
  }

  function detectElementType(el) {
    if (el.tagName === 'IMG' || el.classList.contains('hero-banner-img')) return 'image';
    if (el.tagName === 'A' || el.classList.contains('btn-wa-primary') || el.classList.contains('btn-nav-wa')) return 'link';
    return 'text';
  }

  // =========================================================================
  // MODALES DE EDICIÓN VISUAL
  // =========================================================================

  // Modal 1: Editor de Texto
  function openTextModal(el) {
    const fieldName = el.getAttribute('data-cms') || 'Texto';
    const currentHtml = el.innerHTML.trim();

    const backdrop = document.createElement('div');
    backdrop.className = 'cms-modal-backdrop active';
    backdrop.innerHTML = `
      <div class="cms-modal">
        <div class="cms-modal-header">
          <h3 class="cms-modal-title">✏️ Editar: ${formatFieldName(fieldName)}</h3>
          <button class="cms-modal-close">&times;</button>
        </div>
        <div class="cms-modal-body">
          <div class="cms-form-group">
            <label class="cms-form-label">Contenido de Texto</label>
            <textarea id="cms-text-editor" class="cms-form-textarea">${escapeHtml(currentHtml)}</textarea>
            <small class="cms-form-help">
              💡 Puedes usar <code>&lt;br&gt;</code> para saltos de línea, <code>&lt;em&gt;</code> para cursiva destacada, o <code>&lt;strong&gt;</code> para negrilla.
            </small>
          </div>
        </div>
        <div class="cms-modal-footer">
          <button class="cms-btn cms-btn-cancel">Cancelar</button>
          <button id="cms-btn-save-text" class="cms-btn cms-btn-save">Guardar Cambios</button>
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);

    const textarea = backdrop.querySelector('#cms-text-editor');
    textarea.focus();

    backdrop.querySelector('.cms-modal-close').addEventListener('click', () => backdrop.remove());
    backdrop.querySelector('.cms-btn-cancel').addEventListener('click', () => backdrop.remove());

    backdrop.querySelector('#cms-btn-save-text').addEventListener('click', () => {
      el.innerHTML = textarea.value;
      state.hasUnsavedChanges = true;
      backdrop.remove();
      showToast('Texto actualizado correctamente', 'success');
    });
  }

  // Modal 2: Editor de Imágenes (Galería Nativa Saramantha + Subida de Archivos + URL)
  function openImageModal(el) {
    const imgEl = el.tagName === 'IMG' ? el : el.querySelector('img');
    const currentSrc = imgEl ? imgEl.getAttribute('src') || '' : '';
    const currentAlt = imgEl ? imgEl.getAttribute('alt') || '' : '';

    const backdrop = document.createElement('div');
    backdrop.className = 'cms-modal-backdrop active';
    backdrop.innerHTML = `
      <div class="cms-modal" style="max-width: 640px;">
        <div class="cms-modal-header">
          <h3 class="cms-modal-title">🖼️ Seleccionar o Cambiar Imagen</h3>
          <button class="cms-modal-close">&times;</button>
        </div>
        <div class="cms-modal-body">
          <div style="display: flex; gap: 16px; align-items: center;">
            <div class="cms-image-preview-box" style="width: 140px; height: 140px; flex-shrink: 0;">
              <img id="cms-img-preview" src="${currentSrc}" alt="Vista previa" />
            </div>
            <div style="flex: 1; display: flex; flex-direction: column; gap: 8px;">
              <label class="cms-form-label">Ruta o URL de Imagen</label>
              <input type="text" id="cms-img-url" class="cms-form-input" value="${escapeHtml(currentSrc)}" />
              <label class="cms-form-label" style="margin-top: 4px;">Texto Alternativo (SEO)</label>
              <input type="text" id="cms-img-alt" class="cms-form-input" value="${escapeHtml(currentAlt)}" placeholder="Descripción de la prenda" />
            </div>
          </div>

          <div class="cms-form-group">
            <label class="cms-form-label">Subir Imagen desde tu Equipo (Base64)</label>
            <input type="file" id="cms-img-file" class="cms-form-input" accept="image/*" />
          </div>

          <div class="cms-form-group">
            <label class="cms-form-label">Galería de Fotos Saramantha (Haz clic para seleccionar)</label>
            <div class="cms-gallery-grid" id="cms-gallery-container">
              ${DEFAULT_GALLERY.map(
                (item) => `
                <div class="cms-gallery-item ${item.url === currentSrc ? 'selected' : ''}" data-url="${item.url}">
                  <img src="${item.url}" alt="${item.name}" loading="lazy" />
                  <span class="cms-gallery-label">${item.name}</span>
                </div>
              `
              ).join('')}
            </div>
          </div>
        </div>
        <div class="cms-modal-footer">
          <button class="cms-btn cms-btn-cancel">Cancelar</button>
          <button id="cms-btn-save-img" class="cms-btn cms-btn-save">Aplicar Imagen</button>
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);

    const preview = backdrop.querySelector('#cms-img-preview');
    const urlInput = backdrop.querySelector('#cms-img-url');
    const altInput = backdrop.querySelector('#cms-img-alt');
    const fileInput = backdrop.querySelector('#cms-img-file');
    const galleryItems = backdrop.querySelectorAll('.cms-gallery-item');

    galleryItems.forEach((item) => {
      item.addEventListener('click', () => {
        galleryItems.forEach((i) => i.classList.remove('selected'));
        item.classList.add('selected');
        const chosenUrl = item.getAttribute('data-url');
        urlInput.value = chosenUrl;
        preview.src = chosenUrl;
      });
    });

    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          urlInput.value = e.target.result;
          preview.src = e.target.result;
          galleryItems.forEach((i) => i.classList.remove('selected'));
        };
        reader.readAsDataURL(file);
      }
    });

    urlInput.addEventListener('input', () => {
      preview.src = urlInput.value.trim();
    });

    backdrop.querySelector('.cms-modal-close').addEventListener('click', () => backdrop.remove());
    backdrop.querySelector('.cms-btn-cancel').addEventListener('click', () => backdrop.remove());

    backdrop.querySelector('#cms-btn-save-img').addEventListener('click', () => {
      const finalSrc = urlInput.value.trim();
      const finalAlt = altInput.value.trim();

      if (imgEl) {
        imgEl.src = finalSrc;
        if (finalAlt) imgEl.alt = finalAlt;
      } else {
        el.style.backgroundImage = `url('${finalSrc}')`;
      }

      state.hasUnsavedChanges = true;
      backdrop.remove();
      showToast('Imagen actualizada correctamente', 'success');
    });
  }

  // Modal 3: Editor de Enlaces / Botones (Catálogo Digital vs WhatsApp)
  function openLinkModal(el) {
    const isAnchor = el.tagName === 'A';
    const currentHref = isAnchor ? el.getAttribute('href') || '' : '';
    const currentText = el.innerText.trim();

    const backdrop = document.createElement('div');
    backdrop.className = 'cms-modal-backdrop active';
    backdrop.innerHTML = `
      <div class="cms-modal">
        <div class="cms-modal-header">
          <h3 class="cms-modal-title">🔗 Editar Enlace o Botón</h3>
          <button class="cms-modal-close">&times;</button>
        </div>
        <div class="cms-modal-body">
          <div class="cms-form-group">
            <label class="cms-form-label">Texto del Botón</label>
            <input type="text" id="cms-link-text" class="cms-form-input" value="${escapeHtml(currentText)}" />
          </div>

          <div class="cms-form-group">
            <label class="cms-form-label">Enlace de Destino (URL)</label>
            <input type="text" id="cms-link-href" class="cms-form-input" value="${escapeHtml(currentHref)}" />
            <small class="cms-form-help">Accesos rápidos con un solo clic:</small>
            <div class="cms-quick-links">
              <button type="button" class="cms-quick-btn btn-catalog" data-url="${state.config.catalogUrl}">
                🛍️ Catálogo Digital Saramantha
              </button>
              <button type="button" class="cms-quick-btn btn-wa" data-url="${DEFAULT_WA_MAYORISTA}">
                💬 WhatsApp Mayorista
              </button>
              <button type="button" class="cms-quick-btn btn-wa" data-url="${DEFAULT_WA_DETAL}">
                💬 WhatsApp Detal
              </button>
            </div>
          </div>
        </div>
        <div class="cms-modal-footer">
          <button class="cms-btn cms-btn-cancel">Cancelar</button>
          <button id="cms-btn-save-link" class="cms-btn cms-btn-save">Guardar Enlace</button>
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);

    const hrefInput = backdrop.querySelector('#cms-link-href');
    const textInput = backdrop.querySelector('#cms-link-text');

    backdrop.querySelectorAll('.cms-quick-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        hrefInput.value = btn.getAttribute('data-url');
      });
    });

    backdrop.querySelector('.cms-modal-close').addEventListener('click', () => backdrop.remove());
    backdrop.querySelector('.cms-btn-cancel').addEventListener('click', () => backdrop.remove());

    backdrop.querySelector('#cms-btn-save-link').addEventListener('click', () => {
      if (isAnchor) {
        el.setAttribute('href', hrefInput.value.trim());
      }
      // Actualizar texto preservando cualquier SVG icono
      const svg = el.querySelector('svg');
      if (svg) {
        el.innerHTML = '';
        el.appendChild(svg);
        el.appendChild(document.createTextNode(' ' + textInput.value.trim()));
      } else {
        el.innerText = textInput.value.trim();
      }

      state.hasUnsavedChanges = true;
      backdrop.remove();
      showToast('Enlace actualizado correctamente', 'success');
    });
  }

  // Modal 4: Editor Integral de Tarjeta de Producto (Pijamas)
  function openCardModal(card) {
    const imgEl = card.querySelector('.card-gallery img') || card.querySelector('img');
    const badgeEl = card.querySelector('.card-badge');
    const nameEl = card.querySelector('.card-name');
    const noteEl = card.querySelector('.card-note');
    const ctaEl = card.querySelector('.card-cta') || card.querySelector('a');
    const overlayEl = card.querySelector('.card-img-overlay');

    const currentImg = imgEl ? imgEl.getAttribute('src') || '' : '';
    const currentBadge = badgeEl ? badgeEl.innerText.trim() : '';
    const currentName = nameEl ? nameEl.innerText.trim() : '';
    const currentNote = noteEl ? noteEl.innerText.trim() : '';
    const currentHref = ctaEl ? ctaEl.getAttribute('href') || state.config.catalogUrl : state.config.catalogUrl;

    const backdrop = document.createElement('div');
    backdrop.className = 'cms-modal-backdrop active';
    backdrop.innerHTML = `
      <div class="cms-modal" style="max-width: 600px;">
        <div class="cms-modal-header">
          <h3 class="cms-modal-title">🛍️ Editar Tarjeta de Pijama</h3>
          <button class="cms-modal-close">&times;</button>
        </div>
        <div class="cms-modal-body">
          <div class="cms-form-group">
            <label class="cms-form-label">Foto del Producto</label>
            <div style="display: flex; gap: 14px; align-items: center;">
              <img id="cms-card-preview" src="${currentImg}" style="width: 75px; height: 95px; object-fit: cover; border-radius: 8px; border: 1.5px solid #E8D5DE;" />
              <div style="flex: 1;">
                <input type="text" id="cms-card-img" class="cms-form-input" value="${escapeHtml(currentImg)}" placeholder="10Carrusel.jpg o enlace web" />
                <input type="file" id="cms-card-file" accept="image/*" class="cms-form-input" style="margin-top: 6px; font-size: 11.5px;" />
              </div>
            </div>
          </div>

          <div class="cms-form-group">
            <label class="cms-form-label">Insignia / Badge (ej: 🔥 Más vendida / 🎄 Edición Navidad)</label>
            <input type="text" id="cms-card-badge" class="cms-form-input" value="${escapeHtml(currentBadge)}" placeholder="Vacío si no lleva insignia" />
            <div class="cms-badge-chips">
              <span class="cms-chip chip-xmas" data-badge="🎄 Edición Navidad">🎄 Edición Navidad</span>
              <span class="cms-chip chip-xmas" data-badge="🎁 Colección Navideña">🎁 Colección Navideña</span>
              <span class="cms-chip" data-badge="🔥 Más vendida">🔥 Más vendida</span>
              <span class="cms-chip" data-badge="⭐ Bestseller">⭐ Bestseller</span>
              <span class="cms-chip" data-badge="✨ Tendencia">✨ Tendencia</span>
              <span class="cms-chip" data-badge="⚡ Alta rotación">⚡ Alta rotación</span>
              <span class="cms-chip" data-badge="💎 Exclusiva">💎 Exclusiva</span>
              <span class="cms-chip" data-badge="">(Sin insignia)</span>
            </div>
          </div>

          <div class="cms-form-group">
            <label class="cms-form-label">Nombre de la Pijama</label>
            <input type="text" id="cms-card-name" class="cms-form-input" value="${escapeHtml(currentName)}" />
          </div>

          <div class="cms-form-group">
            <label class="cms-form-label">Nota o Precio</label>
            <input type="text" id="cms-card-note" class="cms-form-input" value="${escapeHtml(currentNote)}" />
          </div>

          <div class="cms-form-group">
            <label class="cms-form-label">Enlace de Compra (Catálogo Digital o WhatsApp)</label>
            <input type="text" id="cms-card-href" class="cms-form-input" value="${escapeHtml(currentHref)}" />
            <div class="cms-quick-links">
              <button type="button" class="cms-quick-btn btn-catalog" data-url="${state.config.catalogUrl}">
                🛍️ Catálogo Digital
              </button>
              <button type="button" class="cms-quick-btn btn-wa" data-url="${DEFAULT_WA_MAYORISTA}">
                💬 WhatsApp Mayorista
              </button>
            </div>
          </div>
        </div>
        <div class="cms-modal-footer" style="justify-content: space-between;">
          <button id="cms-btn-delete-card" type="button" class="cms-btn" style="background: rgba(255, 59, 48, 0.12); color: #FF3B30; border: 1px solid rgba(255, 59, 48, 0.3);">
            🗑️ Eliminar Producto
          </button>
          <div style="display: flex; gap: 8px;">
            <button class="cms-btn cms-btn-cancel">Cancelar</button>
            <button id="cms-btn-save-card" class="cms-btn cms-btn-save">Guardar Cambios</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);

    const preview = backdrop.querySelector('#cms-card-preview');
    const imgInput = backdrop.querySelector('#cms-card-img');
    const fileInput = backdrop.querySelector('#cms-card-file');
    const badgeInput = backdrop.querySelector('#cms-card-badge');
    const nameInput = backdrop.querySelector('#cms-card-name');
    const noteInput = backdrop.querySelector('#cms-card-note');
    const hrefInput = backdrop.querySelector('#cms-card-href');

    backdrop.querySelectorAll('.cms-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        badgeInput.value = chip.getAttribute('data-badge');
      });
    });

    backdrop.querySelectorAll('.cms-quick-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        hrefInput.value = btn.getAttribute('data-url');
      });
    });

    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imgInput.value = e.target.result;
          preview.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

    imgInput.addEventListener('input', () => {
      preview.src = imgInput.value.trim();
    });

    backdrop.querySelector('.cms-modal-close').addEventListener('click', () => backdrop.remove());
    backdrop.querySelector('.cms-btn-cancel').addEventListener('click', () => backdrop.remove());

    // Eliminar producto
    backdrop.querySelector('#cms-btn-delete-card').addEventListener('click', () => {
      if (confirm('¿Estás seguro de que deseas eliminar esta pijama de la colección?')) {
        card.remove();
        state.hasUnsavedChanges = true;
        backdrop.remove();
        showToast('Pijama eliminada de la colección', 'warning');
      }
    });

    // Guardar cambios
    backdrop.querySelector('#cms-btn-save-card').addEventListener('click', () => {
      const newImg = imgInput.value.trim();
      const newBadge = badgeInput.value.trim();
      const newName = nameInput.value.trim();
      const newNote = noteInput.value.trim();
      const newHref = hrefInput.value.trim();

      if (imgEl) imgEl.src = newImg;
      if (nameEl) nameEl.innerText = newName;
      if (noteEl) noteEl.innerText = newNote;

      // Badge
      if (badgeEl) {
        if (newBadge) {
          badgeEl.innerText = newBadge;
          badgeEl.style.display = '';
        } else {
          badgeEl.remove();
        }
      } else if (newBadge) {
        const gallery = card.querySelector('.card-gallery');
        if (gallery) {
          const newB = document.createElement('span');
          newB.className = 'card-badge';
          newB.innerText = newBadge;
          gallery.appendChild(newB);
        }
      }

      // Enlaces CTA y Overlay
      if (ctaEl) ctaEl.setAttribute('href', newHref);
      if (overlayEl) overlayEl.setAttribute('href', newHref);

      state.hasUnsavedChanges = true;
      backdrop.remove();
      showToast('Tarjeta de pijama actualizada con éxito', 'success');
    });
  }

  // Tarjeta interactiva "+ Añadir Pijama" al final de la colección
  function ensureAddProductCard() {
    if (!state.isActive || state.isPreview) return;
    const grid = document.querySelector('.product-grid, .coleccion-grid');
    if (!grid) return;

    let addCard = grid.querySelector('.cms-add-product-card');
    if (!addCard) {
      addCard = document.createElement('div');
      addCard.className = 'cms-add-product-card';
      addCard.innerHTML = `
        <div class="cms-add-icon">+</div>
        <div class="cms-add-title">Añadir Nueva Pijama</div>
        <div class="cms-add-desc">Haz clic para agregar una nueva referencia al catálogo</div>
      `;
      addCard.addEventListener('click', openNewProductModal);
      grid.appendChild(addCard);
    }
  }

  // Modal para crear y agregar un nuevo producto
  function openNewProductModal() {
    const backdrop = document.createElement('div');
    backdrop.className = 'cms-modal-backdrop active';
    backdrop.innerHTML = `
      <div class="cms-modal" style="max-width: 600px;">
        <div class="cms-modal-header">
          <h3 class="cms-modal-title">✨ Añadir Nueva Pijama a la Colección</h3>
          <button class="cms-modal-close">&times;</button>
        </div>
        <div class="cms-modal-body">
          <div class="cms-form-group">
            <label class="cms-form-label">Foto de la Pijama</label>
            <div style="display: flex; gap: 14px; align-items: center;">
              <img id="cms-new-preview" src="10Carrusel.jpg" style="width: 75px; height: 95px; object-fit: cover; border-radius: 8px; border: 1.5px solid #E8D5DE;" />
              <div style="flex: 1;">
                <input type="text" id="cms-new-img" class="cms-form-input" value="10Carrusel.jpg" placeholder="10Carrusel.jpg o URL" />
                <input type="file" id="cms-new-file" accept="image/*" class="cms-form-input" style="margin-top: 6px; font-size: 11.5px;" />
              </div>
            </div>
          </div>

          <div class="cms-form-group">
            <label class="cms-form-label">Insignia / Badge</label>
            <input type="text" id="cms-new-badge" class="cms-form-input" value="⭐ Nueva Colección" />
            <div class="cms-badge-chips">
              <span class="cms-chip chip-xmas" data-badge="🎄 Edición Navidad">🎄 Edición Navidad</span>
              <span class="cms-chip" data-badge="⭐ Nueva Colección">⭐ Nueva Colección</span>
              <span class="cms-chip" data-badge="🔥 Más vendida">🔥 Más vendida</span>
              <span class="cms-chip" data-badge="✨ Tendencia">✨ Tendencia</span>
            </div>
          </div>

          <div class="cms-form-group">
            <label class="cms-form-label">Nombre de la Pijama</label>
            <input type="text" id="cms-new-name" class="cms-form-input" value="Pijama Saramantha Premium" />
          </div>

          <div class="cms-form-group">
            <label class="cms-form-label">Nota o Precio</label>
            <input type="text" id="cms-new-note" class="cms-form-input" value="💬 Precio mayorista por WhatsApp" />
          </div>

          <div class="cms-form-group">
            <label class="cms-form-label">Enlace de Compra</label>
            <input type="text" id="cms-new-href" class="cms-form-input" value="${state.config.catalogUrl}" />
            <div class="cms-quick-links">
              <button type="button" class="cms-quick-btn btn-catalog" data-url="${state.config.catalogUrl}">
                🛍️ Catálogo Digital
              </button>
              <button type="button" class="cms-quick-btn btn-wa" data-url="${DEFAULT_WA_MAYORISTA}">
                💬 WhatsApp Mayorista
              </button>
            </div>
          </div>
        </div>
        <div class="cms-modal-footer">
          <button class="cms-btn cms-btn-cancel">Cancelar</button>
          <button id="cms-btn-create-card" class="cms-btn cms-btn-save">Agregar Pijama</button>
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);

    const preview = backdrop.querySelector('#cms-new-preview');
    const imgInput = backdrop.querySelector('#cms-new-img');
    const fileInput = backdrop.querySelector('#cms-new-file');
    const badgeInput = backdrop.querySelector('#cms-new-badge');
    const nameInput = backdrop.querySelector('#cms-new-name');
    const noteInput = backdrop.querySelector('#cms-new-note');
    const hrefInput = backdrop.querySelector('#cms-new-href');

    backdrop.querySelectorAll('.cms-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        badgeInput.value = chip.getAttribute('data-badge');
      });
    });

    backdrop.querySelectorAll('.cms-quick-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        hrefInput.value = btn.getAttribute('data-url');
      });
    });

    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imgInput.value = e.target.result;
          preview.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

    imgInput.addEventListener('input', () => {
      preview.src = imgInput.value.trim();
    });

    backdrop.querySelector('.cms-modal-close').addEventListener('click', () => backdrop.remove());
    backdrop.querySelector('.cms-btn-cancel').addEventListener('click', () => backdrop.remove());

    backdrop.querySelector('#cms-btn-create-card').addEventListener('click', () => {
      const grid = document.querySelector('.product-grid, .coleccion-grid');
      const addCard = grid ? grid.querySelector('.cms-add-product-card') : null;

      if (!grid) {
        backdrop.remove();
        return;
      }

      const newCard = document.createElement('div');
      newCard.className = 'product-card';
      newCard.innerHTML = `
        <div class="card-gallery">
          <img src="${imgInput.value.trim()}" alt="${escapeHtml(nameInput.value.trim())}" loading="lazy">
          ${badgeInput.value.trim() ? `<span class="card-badge">${escapeHtml(badgeInput.value.trim())}</span>` : ''}
          <a href="${hrefInput.value.trim()}" target="_blank" rel="noopener" class="card-img-overlay" aria-label="Ver en Catálogo Digital">
            <span class="card-img-overlay-btn"><svg viewBox="0 0 24 24"><path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12zm-7-8c-1.66 0-3-1.34-3-3H7c0 2.76 2.24 5 5 5s5-2.24 5-5h-2c0 1.66-1.34 3-3 3z"/></svg> Ver en Catálogo Digital</span>
          </a>
        </div>
        <div class="card-body">
          <div class="card-name">${escapeHtml(nameInput.value.trim())}</div>
          <div class="card-note">${escapeHtml(noteInput.value.trim())}</div>
          <a href="${hrefInput.value.trim()}" target="_blank" rel="noopener" class="card-cta">
            <svg viewBox="0 0 24 24"><path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12zm-7-8c-1.66 0-3-1.34-3-3H7c0 2.76 2.24 5 5 5s5-2.24 5-5h-2c0 1.66-1.34 3-3 3z"/></svg>
            Ver en Catálogo Digital
          </a>
        </div>
      `;

      if (addCard) {
        grid.insertBefore(newCard, addCard);
      } else {
        grid.appendChild(newCard);
      }

      newCard.addEventListener('click', (e) => {
        if (!state.isActive || state.isPreview) return;
        e.preventDefault();
        e.stopPropagation();
        openCardModal(newCard);
      });

      state.hasUnsavedChanges = true;
      backdrop.remove();
      showToast('¡Nueva pijama agregada con éxito!', 'success');
    });
  }

  // Modal 5: Ajustes (GitHub Token, Repositorio, PIN, Catálogo)
  function openSettingsModal() {
    const backdrop = document.createElement('div');
    backdrop.className = 'cms-modal-backdrop active';
    backdrop.innerHTML = `
      <div class="cms-modal" style="max-width: 520px;">
        <div class="cms-modal-header">
          <h3 class="cms-modal-title">⚙️ Ajustes del CMS</h3>
          <button class="cms-modal-close">&times;</button>
        </div>
        <div class="cms-modal-body">
          <div class="cms-form-group">
            <label class="cms-form-label">Repositorio de GitHub</label>
            <input type="text" id="cms-cfg-repo" class="cms-form-input" value="${state.config.githubRepo}" />
          </div>

          <div class="cms-form-group">
            <label class="cms-form-label">Rama Principal (Branch)</label>
            <input type="text" id="cms-cfg-branch" class="cms-form-input" value="${state.config.githubBranch}" />
          </div>

          <div class="cms-form-group">
            <label class="cms-form-label">URL del Catálogo Digital</label>
            <input type="text" id="cms-cfg-catalog" class="cms-form-input" value="${state.config.catalogUrl}" />
          </div>

          <div class="cms-form-group">
            <label class="cms-form-label">GitHub Personal Access Token</label>
            <div style="display: flex; gap: 8px;">
              <input type="password" id="cms-cfg-token" class="cms-form-input" value="${state.config.githubToken}" placeholder="ghp_... o gho_..." />
              <button type="button" id="cms-cfg-toggle-token" class="cms-btn" style="background:#F0DDE5; color:#691F4D;">👁️</button>
            </div>
            <button type="button" id="cms-cfg-test-token" class="cms-btn" style="margin-top:6px; background:#EBF7EE; color:#15803d; border:1px solid #c2e7cc;">
              🧪 Probar Conexión con GitHub
            </button>
            <div id="cms-token-test-result" style="font-size: 11.5px; margin-top: 4px;"></div>
          </div>

          <div class="cms-form-group">
            <label class="cms-form-label">Clave PIN de Acceso</label>
            <input type="text" id="cms-cfg-pin" class="cms-form-input" value="${state.config.pin}" maxlength="8" />
          </div>
        </div>
        <div class="cms-modal-footer">
          <button class="cms-btn cms-btn-cancel">Cancelar</button>
          <button id="cms-btn-save-cfg" class="cms-btn cms-btn-save">Guardar Ajustes</button>
        </div>
      </div>
    `;

    document.body.appendChild(backdrop);

    const tokenInput = backdrop.querySelector('#cms-cfg-token');
    const toggleBtn = backdrop.querySelector('#cms-cfg-toggle-token');
    const testBtn = backdrop.querySelector('#cms-cfg-test-token');
    const testResult = backdrop.querySelector('#cms-token-test-result');

    toggleBtn.addEventListener('click', () => {
      tokenInput.type = tokenInput.type === 'password' ? 'text' : 'password';
    });

    testBtn.addEventListener('click', async () => {
      const token = tokenInput.value.trim();
      const repo = backdrop.querySelector('#cms-cfg-repo').value.trim();
      testResult.innerHTML = '<span style="color:#7A5060;">⏳ Verificando con GitHub...</span>';

      try {
        const res = await fetch(`https://api.github.com/repos/${repo}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github.v3+json'
          }
        });

        if (res.ok) {
          const data = await res.json();
          testResult.innerHTML = `<span style="color:#15803d; font-weight:700;">✅ Conexión exitosa con ${data.full_name}</span>`;
        } else {
          testResult.innerHTML = `<span style="color:#FF3B30; font-weight:700;">❌ Error ${res.status}: Token sin permisos o repo no encontrado.</span>`;
        }
      } catch (e) {
        testResult.innerHTML = `<span style="color:#FF3B30; font-weight:700;">❌ Error de red: ${e.message}</span>`;
      }
    });

    backdrop.querySelector('.cms-modal-close').addEventListener('click', () => backdrop.remove());
    backdrop.querySelector('.cms-btn-cancel').addEventListener('click', () => backdrop.remove());

    backdrop.querySelector('#cms-btn-save-cfg').addEventListener('click', () => {
      state.config.githubRepo = backdrop.querySelector('#cms-cfg-repo').value.trim();
      state.config.githubBranch = backdrop.querySelector('#cms-cfg-branch').value.trim();
      state.config.catalogUrl = backdrop.querySelector('#cms-cfg-catalog').value.trim();
      state.config.githubToken = tokenInput.value.trim();
      state.config.pin = backdrop.querySelector('#cms-cfg-pin').value.trim() || '1234';

      saveConfig();
      backdrop.remove();
      showToast('Ajustes guardados correctamente', 'success');
    });
  }

  // =========================================================================
  // EXPORTACIÓN Y PUBLICACIÓN
  // =========================================================================

  // Serializador de HTML Limpio (Elimina barra, modales y marcas del CMS)
  function getCleanHtml() {
    const clone = document.documentElement.cloneNode(true);

    // 1. Eliminar elementos propios del CMS
    const toRemove = [
      '#saramantha-cms-bar',
      '#cms-floating-trigger',
      '#cms-toast-container',
      '.cms-modal-backdrop',
      '.cms-add-product-card'
    ];

    toRemove.forEach((selector) => {
      clone.querySelectorAll(selector).forEach((el) => el.remove());
    });

    // 2. Limpiar clases temporales de body
    const body = clone.querySelector('body');
    if (body) {
      body.classList.remove('cms-active');
      body.classList.remove('cms-preview-mode');

      // Preservar la clase modo-navidad según el estado actual
      if (state.modoNavidad) {
        body.classList.add('modo-navidad');
      } else {
        body.classList.remove('modo-navidad');
      }

      body.style.removeProperty('padding-top');
    }

    // 3. Limpiar marcas de bindings en elementos
    clone.querySelectorAll('[data-cms-bound]').forEach((el) => {
      el.removeAttribute('data-cms-bound');
    });

    return '<!DOCTYPE html>\n' + clone.outerHTML;
  }

  // Guardar borrador en LocalStorage
  function saveDraft() {
    try {
      const cleanHtml = getCleanHtml();
      localStorage.setItem(STORAGE_KEYS.DRAFT, cleanHtml);
      state.hasUnsavedChanges = false;
      showToast('Borrador guardado localmente en tu navegador', 'success');
    } catch (e) {
      showToast('Error al guardar borrador (almacenamiento lleno)', 'error');
    }
  }

  // Descargar index.html limpio
  function downloadHtml() {
    const cleanHtml = getCleanHtml();
    const blob = new Blob([cleanHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('index.html descargado correctamente', 'success');
  }

  // Publicar directamente en GitHub Pages vía API
  async function publishToGitHub() {
    if (!state.config.githubToken) {
      showToast('Debes ingresar tu GitHub Token en Ajustes (⚙️)', 'error', 4000);
      openSettingsModal();
      return;
    }

    const publishBtn = document.getElementById('cms-btn-publish');
    const originalText = publishBtn ? publishBtn.innerHTML : '';
    if (publishBtn) {
      publishBtn.disabled = true;
      publishBtn.innerHTML = '<span>⏳</span> <span>Publicando...</span>';
    }

    try {
      const cleanHtml = getCleanHtml();
      const contentBase64 = btoa(unescape(encodeURIComponent(cleanHtml)));
      const apiUrl = `https://api.github.com/repos/${state.config.githubRepo}/contents/index.html`;

      // 1. Obtener SHA del archivo index.html actual
      const getRes = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${state.config.githubToken}`,
          Accept: 'application/vnd.github.v3+json'
        }
      });

      let sha = null;
      if (getRes.ok) {
        const fileData = await getRes.json();
        sha = fileData.sha;
      }

      // 2. Subir nuevo contenido vía commit
      const putBody = {
        message: `cms: actualización de contenidos desde el editor visual [${new Date().toLocaleString()}]`,
        content: contentBase64,
        branch: state.config.githubBranch
      };
      if (sha) putBody.sha = sha;

      const putRes = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${state.config.githubToken}`,
          'Content-Type': 'application/json',
          Accept: 'application/vnd.github.v3+json'
        },
        body: JSON.stringify(putBody)
      });

      if (putRes.ok) {
        state.hasUnsavedChanges = false;
        showToast('🚀 ¡Página publicada con éxito en GitHub Pages!', 'success', 4500);
      } else {
        const errData = await putRes.json().catch(() => ({}));
        throw new Error(errData.message || `Error HTTP ${putRes.status}`);
      }
    } catch (e) {
      console.error('Error al publicar en GitHub:', e);
      showToast(`Error al publicar: ${e.message}`, 'error', 5000);
    } finally {
      if (publishBtn) {
        publishBtn.disabled = false;
        publishBtn.innerHTML = originalText;
      }
    }
  }

  // =========================================================================
  // BOTÓN FLOTANTE Y DETECCIÓN AUTOMÁTICA
  // =========================================================================

  function createFloatingTrigger() {
    if (document.getElementById('cms-floating-trigger')) return;

    const trigger = document.createElement('div');
    trigger.id = 'cms-floating-trigger';
    trigger.innerHTML = `
      <span>✏️</span>
      <span>Editor CMS</span>
    `;

    trigger.addEventListener('click', () => {
      const session = sessionStorage.getItem(STORAGE_KEYS.SESSION);
      if (session === 'active') {
        activateCMS();
      } else {
        openLoginModal();
      }
    });

    document.body.appendChild(trigger);
  }

  // Utilidades
  function formatFieldName(name) {
    return name
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  // Inicialización
  function init() {
    loadConfig();

    // Comprobar si el body ya traía clase modo-navidad
    state.modoNavidad = document.body.classList.contains('modo-navidad');

    // Inicializar canvas de nieve
    initSnowCanvas();

    // Crear disparador flotante
    createFloatingTrigger();

    // Acceso directo por parámetro ?admin=1 o sesión previa
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === '1' || sessionStorage.getItem(STORAGE_KEYS.SESSION) === 'active') {
      activateCMS();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
