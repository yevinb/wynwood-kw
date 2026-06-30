/* ═══════════════════════════════════════════════════════
   WYNWOOD — Immersive Experience Engine
   ═══════════════════════════════════════════════════════ */

const PRODUCTS = [
  { id: 1, name: 'CEO Tee — Black', collection: 'CEO', category: 'tees', price: 16, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1776527995.jpeg' },
  { id: 2, name: 'CEO Tee — White', collection: 'CEO', category: 'tees', price: 16, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1776527995.jpeg' },
  { id: 3, name: 'CEO Short — Black', collection: 'CEO', category: 'shorts', price: 15, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1776527995.jpeg' },
  { id: 4, name: 'Billionaire Energy Tee — Olive', collection: 'Billionaire Energy', category: 'tees', price: 16, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/17765277131.jpeg' },
  { id: 5, name: 'Billionaire Energy Tee — White', collection: 'Billionaire Energy', category: 'tees', price: 16, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/17765277131.jpeg' },
  { id: 6, name: 'Billionaire Energy Hoodie — Navy', collection: 'Billionaire Energy', category: 'hoodies', price: 22, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1776527713.jpeg' },
  { id: 7, name: 'Exclusive Hoodie — Black', collection: 'Exclusive', category: 'hoodies', price: 22, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1776527713.jpeg' },
  { id: 8, name: 'Exclusive Hoodie — White', collection: 'Exclusive', category: 'hoodies', price: 22, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1776527713.jpeg' },
  { id: 9, name: 'Exclusive Tee — Black', collection: 'Exclusive', category: 'tees', price: 16, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1776527713.jpeg' },
  { id: 10, name: 'Exclusive Short — Grey', collection: 'Exclusive', category: 'shorts', price: 15, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1742474498.jpeg' },
  { id: 11, name: 'Kuwait Hoodie — Black', collection: 'Kuwait', category: 'hoodies', price: 22, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1738771077.jpeg' },
  { id: 12, name: 'Kuwait Hoodie — White', collection: 'Kuwait', category: 'hoodies', price: 22, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/17387710771.jpeg' },
  { id: 13, name: 'The Club Hoodie — Black', collection: 'The Club', category: 'hoodies', price: 18, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1776527713.jpeg' },
  { id: 14, name: 'Graphics Hoodie — Black', collection: 'Graphics', category: 'hoodies', price: 22, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1776527713.jpeg' },
  { id: 15, name: 'Socks V2', collection: 'Accessories', category: 'accessories', price: 10, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1700689186.jpeg' },
  { id: 16, name: 'Premium Tote Bag', collection: 'Accessories', category: 'accessories', price: 10, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1738770020.jpeg' },
];

let cart = JSON.parse(localStorage.getItem('wynwood-cart') || '[]');
let activeFilter = 'all';
let selectedSize = 'M';
let modalProduct = null;
let currentScene = 0;
let mouseX = 0, mouseY = 0;
let soundOn = false;
let audioCtx = null;

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

document.addEventListener('DOMContentLoaded', () => {
  initScenes();
  initParticles();
  initParallax();
  initSound();
  renderProducts();
  initFilters();
  initCart();
  initModal();
  initDiscoverButtons();
  updateCartUI();
});

/* ── Scene navigation ── */
function initScenes() {
  const scenes = $$('.scene');
  const dots = $('#sceneDots');
  const experience = $('#experience');

  scenes.forEach((scene, i) => {
    const btn = document.createElement('button');
    btn.dataset.index = i;
    btn.dataset.label = scene.dataset.label || '';
    btn.setAttribute('aria-label', scene.dataset.label);
    if (i === 0) btn.classList.add('active');
    btn.addEventListener('click', () => scrollToScene(i));
    dots.appendChild(btn);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const idx = [...scenes].indexOf(entry.target);
      if (idx === -1) return;
      currentScene = idx;
      scenes.forEach((s, i) => s.classList.toggle('active', i === idx));
      dots.querySelectorAll('button').forEach((b, i) => b.classList.toggle('active', i === idx));

      const isLight = entry.target.classList.contains('scene-light') ||
                      entry.target.classList.contains('scene-float');
      document.body.classList.toggle('light-scene', isLight);

      const isParticle = entry.target.classList.contains('scene-particles');
      $('#particles').classList.toggle('active', isParticle);
    });
  }, { root: experience, threshold: 0.55 });

  scenes.forEach(s => observer.observe(s));

  // Keyboard nav
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault();
      scrollToScene(Math.min(currentScene + 1, scenes.length - 1));
    }
    if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault();
      scrollToScene(Math.max(currentScene - 1, 0));
    }
  });
}

function scrollToScene(index) {
  const scenes = $$('.scene');
  scenes[index]?.scrollIntoView({ behavior: 'smooth' });
}

/* ── Particles (sparkle scene) ── */
function initParticles() {
  const canvas = $('#particles');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function createParticles() {
    particles = [];
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedY: Math.random() * 0.5 + 0.1,
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.6 + 0.2,
        twinkle: Math.random() * Math.PI * 2,
      });
    }
  }
  createParticles();

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.y -= p.speedY;
      p.x += p.speedX;
      p.twinkle += 0.02;
      if (p.y < 0) { p.y = canvas.height; p.x = Math.random() * canvas.width; }
      const alpha = p.opacity * (0.5 + 0.5 * Math.sin(p.twinkle));
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 220, 150, ${alpha})`;
      ctx.fill();
    });
    animId = requestAnimationFrame(draw);
  }
  draw();
}

/* ── Mouse parallax ── */
function initParallax() {
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

    $$('[data-parallax]').forEach(el => {
      const depth = 15;
      el.style.transform = `translate(${mouseX * depth}px, ${mouseY * depth}px)`;
    });

    $$('.float-card').forEach((card, i) => {
      const d = (i + 1) * 8;
      const rot = card.classList.contains('c1') ? -12 : card.classList.contains('c2') ? 8 : 6;
      card.style.transform = `rotate(${rot}deg) translate(${mouseX * d}px, ${mouseY * d}px)`;
    });
  });
}

/* ── Ambient sound ── */
function initSound() {
  const btn = $('#soundBtn');
  btn.addEventListener('click', () => {
    soundOn = !soundOn;
    btn.classList.toggle('on', soundOn);
    if (soundOn) startAmbient();
    else stopAmbient();
  });
}

function startAmbient() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  // Soft ambient drone
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const filter = audioCtx.createBiquadFilter();
  osc.type = 'sine';
  osc.frequency.value = 55;
  filter.type = 'lowpass';
  filter.frequency.value = 200;
  gain.gain.value = 0.04;
  osc.connect(filter).connect(gain).connect(audioCtx.destination);
  osc.start();
  window._ambientOsc = osc;
  window._ambientGain = gain;
}

function stopAmbient() {
  if (window._ambientGain) {
    window._ambientGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
    setTimeout(() => { window._ambientOsc?.stop(); }, 600);
  }
}

/* ── Discover buttons → scroll to shop ── */
function initDiscoverButtons() {
  $$('.scene-cta[data-scroll]').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      if (filter) {
        $$('.filter').forEach(f => f.classList.toggle('active', f.dataset.filter === filter));
        applyFilter(filter);
      }
      $('#shop').scrollIntoView({ behavior: 'smooth' });
    });
  });
}

/* ── Products ── */
function renderProducts() {
  $('#productGrid').innerHTML = PRODUCTS.map(p => `
    <article class="product-card" data-id="${p.id}" data-category="${p.category}" data-collection="${p.collection.toLowerCase()}">
      <img src="${p.image}" alt="${p.name}" loading="lazy"/>
      <div class="info">
        <div class="col">${p.collection}</div>
        <div class="name">${p.name}</div>
        <div class="price">KWD ${p.price.toFixed(3)}</div>
      </div>
    </article>
  `).join('');

  $$('.product-card').forEach(card => {
    card.addEventListener('click', () => openModal(+card.dataset.id));
  });
  applyFilter(activeFilter);
}

function initFilters() {
  $$('.filter').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.filter);
    });
  });
}

function applyFilter(filter) {
  activeFilter = filter;
  $$('.product-card').forEach(card => {
    const cat = card.dataset.category;
    const col = card.dataset.collection;
    const match = filter === 'all' || cat === filter ||
      (filter === 'ceo' && col.includes('ceo')) ||
      (filter === 'billionaire' && col.includes('billionaire')) ||
      (filter === 'exclusive' && col.includes('exclusive')) ||
      (filter === 'kuwait' && col.includes('kuwait'));
    card.classList.toggle('hidden', !match);
  });
}

/* ── Modal ── */
function initModal() {
  $('#modalClose').addEventListener('click', closeModal);
  $('#modalOverlay').addEventListener('click', closeModal);
  $('#modalAdd').addEventListener('click', () => {
    if (modalProduct) { addToCart(modalProduct.id, selectedSize); closeModal(); }
  });
  $$('#sizePicker button').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('#sizePicker button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedSize = btn.dataset.size;
    });
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

function openModal(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  modalProduct = p;
  $('#modalImg').src = p.image;
  $('#modalCol').textContent = p.collection;
  $('#modalName').textContent = p.name;
  $('#modalPrice').textContent = 'KWD ' + p.price.toFixed(3);
  $('#productModal').classList.add('open');
  $('#modalOverlay').classList.add('open');
}

function closeModal() {
  $('#productModal').classList.remove('open');
  $('#modalOverlay').classList.remove('open');
  modalProduct = null;
}

/* ── Cart ── */
function addToCart(id, size = 'M') {
  const key = id + '-' + size;
  const existing = cart.find(i => i.key === key);
  if (existing) existing.qty++;
  else cart.push({ id, size, key, qty: 1 });
  localStorage.setItem('wynwood-cart', JSON.stringify(cart));
  updateCartUI();
  showToast('Added to bag');
}

function removeFromCart(key) {
  cart = cart.filter(i => i.key !== key);
  localStorage.setItem('wynwood-cart', JSON.stringify(cart));
  updateCartUI();
}

function updateQty(key, delta) {
  const item = cart.find(i => i.key === key);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(key);
  else { localStorage.setItem('wynwood-cart', JSON.stringify(cart)); updateCartUI(); }
}

function updateCartUI() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const el = $('#cartCount');
  el.textContent = count;
  el.classList.toggle('show', count > 0);

  const body = $('#cartItems');
  const foot = $('#cartFooter');
  const empty = $('#cartEmpty');

  if (!cart.length) {
    body.innerHTML = '';
    foot.classList.remove('visible');
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');
  foot.classList.add('visible');
  body.innerHTML = cart.map(item => {
    const p = PRODUCTS.find(pr => pr.id === item.id);
    if (!p) return '';
    return `<div class="cart-item">
      <img src="${p.image}" alt=""/>
      <div>
        <h4>${p.name}</h4>
        <div class="price">KWD ${(p.price * item.qty).toFixed(3)}</div>
        <div class="size">Size ${item.size}</div>
        <div class="cart-qty">
          <button onclick="updateQty('${item.key}',-1)">−</button>
          <span>${item.qty}</span>
          <button onclick="updateQty('${item.key}',1)">+</button>
        </div>
        <button class="cart-remove" onclick="removeFromCart('${item.key}')">Remove</button>
      </div>
    </div>`;
  }).join('');

  const total = cart.reduce((s, i) => {
    const p = PRODUCTS.find(pr => pr.id === i.id);
    return s + (p ? p.price * i.qty : 0);
  }, 0);
  $('#cartTotal').textContent = 'KWD ' + total.toFixed(3);
}

function initCart() {
  $('#cartBtn').addEventListener('click', () => {
    $('#cartDrawer').classList.add('open');
    $('#cartOverlay').classList.add('open');
  });
  $('#cartClose').addEventListener('click', closeCart);
  $('#cartOverlay').addEventListener('click', closeCart);
  $('#checkoutBtn').addEventListener('click', () => window.open('https://www.wynwoodkw.com/cart', '_blank'));
}

function closeCart() {
  $('#cartDrawer').classList.remove('open');
  $('#cartOverlay').classList.remove('open');
}

function showToast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

window.updateQty = updateQty;
window.removeFromCart = removeFromCart;
