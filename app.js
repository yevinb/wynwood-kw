/* ═══════════════════════════════════════════════════════════
   WYNWOOD — Premium Experience Engine
   Lenis · GSAP · Three.js
   ═══════════════════════════════════════════════════════════ */

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
let lenis = null;
let audioCtx = null;
let mouse = { x: 0, y: 0, tx: 0, ty: 0 };

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

/* ── Boot ── */
function boot() {
  try { initLenis(); } catch (e) { console.warn('Lenis:', e); }
  try { initGSAP(); } catch (e) { console.warn('GSAP:', e); }
  try { initThree(); } catch (e) { console.warn('Three:', e); }
  try { initParticles(); } catch (e) { console.warn('Particles:', e); }
  initScenes();
  initCursor();
  initParallax();
  initSound();
  renderProducts();
  initFilters();
  initCart();
  initModal();
  initCTAs();
  updateCartUI();
}

window.addEventListener('load', () => {
  const force = setTimeout(finishPreloader, 2800);
  runPreloader(() => { clearTimeout(force); finishPreloader(); });
});

function finishPreloader() {
  const el = $('#preloader');
  if (!el || el.classList.contains('done')) return;
  el.classList.add('done');
  boot();
}

/* ── Preloader ── */
function runPreloader(done) {
  const fill = $('#preloaderFill');
  const count = $('#preloaderCount');
  let p = 0;
  const images = $$('img');
  let loaded = 0;
  const total = Math.max(images.length, 1);

  const tick = () => {
    p += Math.random() * 12 + 3;
    if (p > 100) p = 100;
    fill.style.width = p + '%';
    count.textContent = Math.floor(p);
    if (p < 100) requestAnimationFrame(tick);
    else {
      setTimeout(() => {
        $('#preloader').classList.add('done');
        setTimeout(done, 800);
      }, 300);
    }
  };

  images.forEach(img => {
    if (img.complete) loaded++;
    else img.addEventListener('load', () => { loaded++; });
  });

  tick();
}

/* ── Lenis smooth scroll ── */
function initLenis() {
  if (typeof Lenis === 'undefined') return;
  lenis = new Lenis({
    duration: 1.4,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  if (typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
  }
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

/* ── GSAP ScrollTrigger animations ── */
function initGSAP() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  $$('.scene').forEach((scene) => {
    const product = scene.querySelector('.product-hero');
    if (product) {
      gsap.fromTo(product,
        { y: 80, scale: 0.88, opacity: 0 },
        {
          y: 0, scale: 1, opacity: 1,
          duration: 1.6, ease: 'power3.out',
          scrollTrigger: {
            trigger: scene,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    }

    const frames = scene.querySelectorAll('.lux-frame');
    if (frames.length) {
      gsap.fromTo(frames,
        { scale: 0.85, opacity: 0 },
        {
          scale: 1, opacity: 1,
          duration: 1.2, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: scene, start: 'top 65%', toggleActions: 'play none none reverse' }
        }
      );
    }

    const caption = scene.querySelector('.scene-caption');
    if (caption) {
      gsap.fromTo(caption,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 1.1, ease: 'power2.out', delay: 0.2,
          scrollTrigger: { trigger: scene, start: 'top 60%', toggleActions: 'play none none reverse' }
        }
      );
    }
  });
}

/* ── Three.js ambient background ── */
function initThree() {
  if (typeof THREE === 'undefined') return;
  const canvas = $('#webgl');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 5;

  const count = 800;
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    sizes[i] = Math.random() * 2 + 0.5;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const mat = new THREE.PointsMaterial({
    color: 0xc9a050,
    size: 0.02,
    transparent: true,
    opacity: 0.35,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const points = new THREE.Points(geo, mat);
  scene.add(points);

  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    t += 0.001;
    points.rotation.y = t * 0.3;
    points.rotation.x = Math.sin(t * 0.5) * 0.1;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

/* ── 2D particles for drip scene ── */
function initParticles() {
  const canvas = $('#particles');
  const ctx = canvas.getContext('2d');
  let pts = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < 200; i++) {
    pts.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.5 + 0.5,
      vy: Math.random() * 0.8 + 0.2,
      vx: (Math.random() - 0.5) * 0.4,
      a: Math.random(),
      tw: Math.random() * Math.PI * 2,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (canvas.classList.contains('on')) {
      pts.forEach(p => {
        p.y -= p.vy;
        p.x += p.vx;
        p.tw += 0.03;
        if (p.y < 0) { p.y = canvas.height; p.x = Math.random() * canvas.width; }
        const alpha = p.a * (0.4 + 0.6 * Math.sin(p.tw));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 210, 140, ${alpha})`;
        ctx.fill();
      });
    }
    requestAnimationFrame(draw);
  }
  draw();
}

/* ── Scene observer ── */
function initScenes() {
  const scenes = $$('.scene');
  const dots = $('#sceneDots');

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
      if (idx < 0) return;

      currentScene = idx;
      scenes.forEach((s, i) => s.classList.toggle('active', i === idx));
      dots.querySelectorAll('button').forEach((b, i) => b.classList.toggle('active', i === idx));

      const theme = entry.target.dataset.theme;
      document.body.classList.toggle('light-theme', theme === 'light');

      const particles = entry.target.dataset.particles === 'true';
      $('#particles').classList.toggle('on', particles);

      const num = String(idx + 1).padStart(2, '0');
      const total = String(scenes.length).padStart(2, '0');
      $('#sceneCounter').textContent = `${num} — ${total}`;
      $('#scrollProgress').style.height = ((idx / (scenes.length - 1)) * 100) + '%';
    });
  }, { threshold: 0.45 });

  scenes.forEach(s => observer.observe(s));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); scrollToScene(Math.min(currentScene + 1, scenes.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); scrollToScene(Math.max(currentScene - 1, 0)); }
  });
}

function scrollToScene(index) {
  const scenes = $$('.scene');
  const target = scenes[index];
  if (!target) return;
  if (lenis) lenis.scrollTo(target, { duration: 1.4, offset: 0 });
  else target.scrollIntoView({ behavior: 'smooth' });
}

/* ── Cursor ── */
function initCursor() {
  if (!window.matchMedia('(hover: hover)').matches) return;
  const cursor = $('#cursor');
  let cx = 0, cy = 0;

  document.addEventListener('mousemove', (e) => {
    mouse.tx = e.clientX;
    mouse.ty = e.clientY;
  });

  const loop = () => {
    cx += (mouse.tx - cx) * 0.15;
    cy += (mouse.ty - cy) * 0.15;
    cursor.style.left = cx + 'px';
    cursor.style.top = cy + 'px';
    requestAnimationFrame(loop);
  };
  loop();

  cursor.classList.add('on');

  const hoverables = 'a, button, .product-card, .cta, .filter, .scene-dots button';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverables)) cursor.classList.add('hover');
    if (e.target.closest('.product-card')) cursor.querySelector('span').textContent = 'view';
    else cursor.querySelector('span').textContent = '';
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverables)) cursor.classList.remove('hover');
  });
}

/* ── Parallax ── */
function initParallax() {
  document.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;

    $$('[data-depth]').forEach(el => {
      const d = +el.dataset.depth || 15;
      el.style.transform = `translate(${mouse.x * d}px, ${mouse.y * d}px)`;
    });

    $$('.polaroid').forEach((el, i) => {
      const d = (i + 1) * 10;
      const rot = el.classList.contains('p1') ? -14 : el.classList.contains('p2') ? 10 : 5;
      el.style.transform = `rotate(${rot}deg) translate(${mouse.x * d}px, ${mouse.y * d}px)`;
    });
  });
}

/* ── Sound ── */
function initSound() {
  $('#soundBtn').addEventListener('click', () => {
    const btn = $('#soundBtn');
    const on = btn.classList.toggle('on');
    if (on) startAmbient();
    else stopAmbient();
  });
}

function startAmbient() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const osc1 = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const filter = audioCtx.createBiquadFilter();

  osc1.type = 'sine'; osc1.frequency.value = 55;
  osc2.type = 'sine'; osc2.frequency.value = 82.5;
  filter.type = 'lowpass'; filter.frequency.value = 180;
  gain.gain.value = 0.03;

  osc1.connect(filter);
  osc2.connect(filter);
  filter.connect(gain);
  gain.connect(audioCtx.destination);
  osc1.start(); osc2.start();

  window._amb = { osc1, osc2, gain };
}

function stopAmbient() {
  if (window._amb?.gain) {
    window._amb.gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
    setTimeout(() => { window._amb.osc1?.stop(); window._amb.osc2?.stop(); }, 700);
  }
}

/* ── CTAs ── */
function initCTAs() {
  $$('.cta[data-scroll], button[data-scroll]').forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      if (filter) {
        $$('.filter').forEach(f => f.classList.toggle('active', f.dataset.filter === filter));
        applyFilter(filter);
      }
      scrollToScene([...$$('.scene')].findIndex(s => s.id === 'shop'));
    });
  });
}

/* ── Shop ── */
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

  $$('.product-card').forEach(c => c.addEventListener('click', () => openModal(+c.dataset.id)));
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
      ['ceo','billionaire','exclusive','kuwait'].includes(filter) && col.includes(filter);
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
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); closeCart(); } });
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
  document.body.classList.add('modal-open');
  lenis?.stop();
}

function closeModal() {
  $('#productModal').classList.remove('open');
  $('#modalOverlay').classList.remove('open');
  document.body.classList.remove('modal-open');
  modalProduct = null;
  lenis?.start();
}

/* ── Cart ── */
function addToCart(id, size = 'M') {
  const key = id + '-' + size;
  const ex = cart.find(i => i.key === key);
  if (ex) ex.qty++; else cart.push({ id, size, key, qty: 1 });
  localStorage.setItem('wynwood-cart', JSON.stringify(cart));
  updateCartUI();
  showToast('Added to bag ✦');
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
          <button onclick="updateQty('${item.key}',-1)">−</button><span>${item.qty}</span>
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
  $('#cartBtn').addEventListener('click', openCart);
  $('#cartClose').addEventListener('click', closeCart);
  $('#cartOverlay').addEventListener('click', closeCart);
  $('#checkoutBtn').addEventListener('click', () => window.open('https://www.wynwoodkw.com/cart', '_blank'));
}

function openCart() {
  $('#cartDrawer').classList.add('open');
  $('#cartOverlay').classList.add('open');
  document.body.classList.add('cart-open');
  lenis?.stop();
}

function closeCart() {
  $('#cartDrawer').classList.remove('open');
  $('#cartOverlay').classList.remove('open');
  document.body.classList.remove('cart-open');
  lenis?.start();
}

function showToast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

window.updateQty = updateQty;
window.removeFromCart = removeFromCart;
