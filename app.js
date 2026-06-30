/* WYNWOOD — Shop loads real catalog from products.json */

let PRODUCTS = [];
const COLLECTIONS = ['ceo', 'billionaire', 'exclusive', 'kuwait'];
const CATEGORIES = ['hoodies', 'tees', 'shorts', 'accessories'];
const CAT_LABEL = { hoodies: 'Hoodie', tees: 'Tee', shorts: 'Short', accessories: 'Accessory' };

let cart = JSON.parse(localStorage.getItem('wn-cart') || '[]');
let filter = 'all';
let size = 'M';
let modalId = null;
let started = false;

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

/* ── LOADER ── */
(function init() {
  const loader = $('#loader');
  const minSpin = 2200;
  const t0 = Date.now();

  const finish = () => {
    const wait = Math.max(0, minSpin - (Date.now() - t0));
    setTimeout(() => {
      loader.classList.add('done');
      setTimeout(start, 650);
    }, wait);
  };

  if (document.readyState === 'complete') finish();
  else window.addEventListener('load', finish);
  setTimeout(finish, 3500);
})();

async function start() {
  if (started) return;
  started = true;

  try {
    const res = await fetch('products.json?v=2');
    const data = await res.json();
    PRODUCTS = data.products || [];
  } catch {
    PRODUCTS = [];
  }

  $('#loader').classList.add('hide');
  renderShop();
  bindAll();
  observeReveal();
  initParallax();
  window.scrollTo(0, 0);
}

function getVisibleProducts() {
  if (!PRODUCTS.length) return [];

  if (filter === 'all') return PRODUCTS;

  if (COLLECTIONS.includes(filter)) {
    return PRODUCTS.filter(p => p.col.toLowerCase().includes(filter));
  }

  if (CATEGORIES.includes(filter)) {
    return PRODUCTS.filter(p => p.cat === filter);
  }

  return PRODUCTS;
}

/* ── SHOP — re-render on every filter (no hide/show bugs) ── */
function renderShop() {
  const grid = $('#productGrid');
  const items = getVisibleProducts();

  if (!items.length) {
    grid.innerHTML = '<p class="shop-empty">Loading products…</p>';
    return;
  }

  grid.innerHTML = items.map(p => `
    <article class="product-card" data-id="${p.id}" data-cat="${p.cat}">
      <div class="product-type">${CAT_LABEL[p.cat] || p.cat}</div>
      <img src="${p.img}" alt="${p.name}" loading="lazy"/>
      <div class="info">
        <div class="col">${p.col}</div>
        <div class="name">${p.name}</div>
        <div class="price">KWD ${p.price.toFixed(3)}</div>
      </div>
    </article>`).join('');

  $$('#productGrid .product-card').forEach(el => {
    el.classList.add('reveal', 'visible');
  });
}

function setFilter(next) {
  filter = next;
  renderShop();
}

function goToSection(selector, collectionFilter) {
  if (collectionFilter) {
    $$('.filters .filter').forEach(x => x.classList.remove('active'));
    setFilter(collectionFilter);
  }
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ── BINDINGS ── */
function bindAll() {
  window.addEventListener('scroll', () => {
    $('#nav').classList.toggle('scrolled', scrollY > 60);
  }, { passive: true });

  $('#menuBtn').onclick = () => $('#mobileNav').classList.toggle('open');
  $$('.mobile-nav a').forEach(a => a.onclick = () => $('#mobileNav').classList.remove('open'));

  $$('.filters .filter').forEach(b => b.onclick = () => {
    $$('.filters .filter').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    setFilter(b.dataset.filter);
  });

  $$('.collection-btn').forEach(b => b.onclick = e => {
    e.stopPropagation();
    goToSection('#shop', b.dataset.filter);
  });

  $$('.lookbook-item[data-scroll]').forEach(item => {
    item.onclick = () => goToSection(item.dataset.scroll, item.dataset.filter || null);
  });

  document.addEventListener('click', e => {
    const card = e.target.closest('.product-card');
    if (card) openModal(+card.dataset.id);
  });

  $('#cartBtn').onclick = openCart;
  $('#cartClose').onclick = closeCart;
  $('#cartOverlay').onclick = closeCart;
  $('#cartShop')?.addEventListener('click', closeCart);
  $('#checkoutBtn').onclick = () => window.open('https://www.wynwoodkw.com/cart', '_blank');

  $('#modalClose').onclick = closeModal;
  $('#modalBg').onclick = closeModal;
  $('#modalAdd').onclick = () => { if (modalId) { addCart(modalId, size); closeModal(); } };
  $$('#sizes button').forEach(b => b.onclick = () => {
    $$('#sizes button').forEach(x => x.classList.remove('on'));
    b.classList.add('on');
    size = b.dataset.sz;
  });

  $('#newsForm').onsubmit = e => {
    e.preventDefault();
    e.target.reset();
    toast('You\'re on the list 🔥');
  };

  updateCart();
}

function openModal(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  modalId = id;
  $('#modalImg').src = p.img;
  $('#modalCol').textContent = p.col;
  $('#modalName').textContent = p.name;
  $('#modalPrice').textContent = 'KWD ' + p.price.toFixed(3);
  $('#modal').classList.add('open');
  $('#modalBg').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  $('#modal').classList.remove('open');
  $('#modalBg').classList.remove('open');
  document.body.style.overflow = '';
  modalId = null;
}

function addCart(id, sz = 'M') {
  const key = id + '-' + sz;
  const ex = cart.find(i => i.key === key);
  if (ex) ex.qty++; else cart.push({ id, sz, key, qty: 1 });
  localStorage.setItem('wn-cart', JSON.stringify(cart));
  updateCart();
  toast('Added to bag ✦');
}

function removeCart(key) {
  cart = cart.filter(i => i.key !== key);
  localStorage.setItem('wn-cart', JSON.stringify(cart));
  updateCart();
}

function changeQty(key, d) {
  const i = cart.find(x => x.key === key);
  if (!i) return;
  i.qty += d;
  if (i.qty <= 0) removeCart(key);
  else { localStorage.setItem('wn-cart', JSON.stringify(cart)); updateCart(); }
}

function updateCart() {
  const n = cart.reduce((s, i) => s + i.qty, 0);
  $('#cartCount').textContent = n;

  const list = $('#cartItems');
  const foot = $('#cartFooter');
  const empty = $('#cartEmpty');

  if (!n) {
    list.innerHTML = '';
    foot.classList.remove('show');
    empty.classList.remove('hide');
    return;
  }
  empty.classList.add('hide');
  foot.classList.add('show');
  list.innerHTML = cart.map(i => {
    const p = PRODUCTS.find(x => x.id === i.id);
    if (!p) return '';
    return `<div class="cart-item">
      <img src="${p.img}" alt=""/>
      <div>
        <h4>${p.name}</h4>
        <div class="price">KWD ${(p.price * i.qty).toFixed(3)}</div>
        <div class="sz">Size ${i.sz}</div>
        <div class="cart-qty">
          <button onclick="changeQty('${i.key}',-1)">−</button>
          <span>${i.qty}</span>
          <button onclick="changeQty('${i.key}',1)">+</button>
        </div>
        <button class="cart-rm" onclick="removeCart('${i.key}')">Remove</button>
      </div>
    </div>`;
  }).join('');

  const total = cart.reduce((s, i) => {
    const p = PRODUCTS.find(x => x.id === i.id);
    return s + (p ? p.price * i.qty : 0);
  }, 0);
  $('#cartTotal').textContent = 'KWD ' + total.toFixed(3);
}

function openCart() {
  $('#cartDrawer').classList.add('open');
  $('#cartOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  $('#cartDrawer').classList.remove('open');
  $('#cartOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function initParallax() {
  const hero = $('.hero-bg-img');
  if (!hero) return;
  window.addEventListener('scroll', () => {
    const y = Math.min(scrollY, innerHeight);
    hero.style.transform = `scale(1.08) translateY(${y * 0.25}px)`;
  }, { passive: true });
}

function observeReveal() {
  const els = $$('.chapter, .store-card, .lookbook-item, .section-head');
  els.forEach(el => el.classList.add('reveal'));
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
}

function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

window.changeQty = changeQty;
window.removeCart = removeCart;
