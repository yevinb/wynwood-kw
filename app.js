/* WYNWOOD — Simple, reliable, works everywhere */

const PRODUCTS = [
  { id:1, name:'CEO Tee — Black', col:'CEO', cat:'tees', price:16, img:'https://wynwoodkw.com/uploads/products/cache/500_700/1776527995.jpeg' },
  { id:2, name:'CEO Tee — White', col:'CEO', cat:'tees', price:16, img:'https://wynwoodkw.com/uploads/products/cache/500_700/1776527995.jpeg' },
  { id:3, name:'CEO Short — Black', col:'CEO', cat:'shorts', price:15, img:'https://wynwoodkw.com/uploads/products/cache/500_700/1776527995.jpeg' },
  { id:4, name:'Billionaire Energy Tee — Olive', col:'Billionaire Energy', cat:'tees', price:16, img:'https://wynwoodkw.com/uploads/products/cache/500_700/17765277131.jpeg' },
  { id:5, name:'Billionaire Energy Tee — White', col:'Billionaire Energy', cat:'tees', price:16, img:'https://wynwoodkw.com/uploads/products/cache/500_700/17765277131.jpeg' },
  { id:6, name:'Billionaire Energy Hoodie — Navy', col:'Billionaire Energy', cat:'hoodies', price:22, img:'https://wynwoodkw.com/uploads/products/cache/500_700/1776527713.jpeg' },
  { id:7, name:'Exclusive Hoodie — Black', col:'Exclusive', cat:'hoodies', price:22, img:'https://wynwoodkw.com/uploads/products/cache/500_700/1776527713.jpeg' },
  { id:8, name:'Exclusive Hoodie — White', col:'Exclusive', cat:'hoodies', price:22, img:'https://wynwoodkw.com/uploads/products/cache/500_700/1776527713.jpeg' },
  { id:9, name:'Exclusive Tee — Black', col:'Exclusive', cat:'tees', price:16, img:'https://wynwoodkw.com/uploads/products/cache/500_700/1776527713.jpeg' },
  { id:10, name:'Exclusive Short — Grey', col:'Exclusive', cat:'shorts', price:15, img:'https://wynwoodkw.com/uploads/products/cache/500_700/1742474498.jpeg' },
  { id:11, name:'Kuwait Hoodie — Black', col:'Kuwait', cat:'hoodies', price:22, img:'https://wynwoodkw.com/uploads/products/cache/500_700/1738771077.jpeg' },
  { id:12, name:'Kuwait Hoodie — White', col:'Kuwait', cat:'hoodies', price:22, img:'https://wynwoodkw.com/uploads/products/cache/500_700/17387710771.jpeg' },
  { id:13, name:'The Club Hoodie — Black', col:'The Club', cat:'hoodies', price:18, img:'https://wynwoodkw.com/uploads/products/cache/500_700/1776527713.jpeg' },
  { id:14, name:'Graphics Hoodie — Black', col:'Graphics', cat:'hoodies', price:22, img:'https://wynwoodkw.com/uploads/products/cache/500_700/1776527713.jpeg' },
  { id:15, name:'Socks V2', col:'Accessories', cat:'accessories', price:10, img:'https://wynwoodkw.com/uploads/products/cache/500_700/1700689186.jpeg' },
  { id:16, name:'Premium Tote Bag', col:'Accessories', cat:'accessories', price:10, img:'https://wynwoodkw.com/uploads/products/cache/500_700/1738770020.jpeg' },
];

const COLLECTIONS = ['ceo', 'billionaire', 'exclusive', 'kuwait'];
const CATEGORIES = ['hoodies', 'tees', 'shorts', 'accessories'];

function productCategory(p) {
  const n = p.name.toLowerCase();
  if (n.includes('hoodie')) return 'hoodies';
  if (n.includes('tee')) return 'tees';
  if (n.includes('short')) return 'shorts';
  return 'accessories';
}

let cart = JSON.parse(localStorage.getItem('wn-cart') || '[]');
let filter = 'all';
let size = 'M';
let modalId = null;
let started = false;

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

/* ── LOADER — 360 flip then straight to site ── */
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

function start() {
  if (started) return;
  started = true;
  $('#loader').classList.add('hide');
  renderShop();
  bindAll();
  observeReveal();
  initParallax();
  window.scrollTo(0, 0);
}

/* ── SHOP ── */
function renderShop() {
  $('#productGrid').innerHTML = PRODUCTS.map(p => {
    const cat = productCategory(p);
    return `
    <article class="product-card" data-id="${p.id}" data-cat="${cat}" data-col="${p.col.toLowerCase()}">
      <img src="${p.img}" alt="${p.name}" loading="lazy"/>
      <div class="info">
        <div class="col">${p.col}</div>
        <div class="name">${p.name}</div>
        <div class="price">KWD ${p.price.toFixed(3)}</div>
      </div>
    </article>`;
  }).join('');
  applyFilter();
}

function applyFilter() {
  $$('.product-card').forEach(c => {
    const cat = c.dataset.cat;
    const col = c.dataset.col;
    let show = false;

    if (filter === 'all') {
      show = true;
    } else if (COLLECTIONS.includes(filter)) {
      show = col.includes(filter);
    } else if (CATEGORIES.includes(filter)) {
      show = cat === filter;
    }

    c.classList.toggle('hidden', !show);
  });
}

/* ── BINDINGS ── */
function bindAll() {
  // Nav scroll
  window.addEventListener('scroll', () => {
    $('#nav').classList.toggle('scrolled', scrollY > 60);
  }, { passive: true });

  // Mobile menu
  $('#menuBtn').onclick = () => $('#mobileNav').classList.toggle('open');
  $$('.mobile-nav a').forEach(a => a.onclick = () => $('#mobileNav').classList.remove('open'));

  // Filters — shop category buttons only
  $$('.filters .filter').forEach(b => b.onclick = () => {
    $$('.filters .filter').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    filter = b.dataset.filter;
    applyFilter();
  });

  // Collection buttons
  $$('.collection-btn').forEach(b => b.onclick = e => {
    e.stopPropagation();
    filter = b.dataset.filter;
    $$('.filters .filter').forEach(x => x.classList.remove('active'));
    applyFilter();
    $('#shop').scrollIntoView({ behavior: 'smooth' });
  });

  $$('.collection-card').forEach(c => c.onclick = () => {
    const b = c.querySelector('.collection-btn');
    if (b) b.click();
  });

  // Products
  document.addEventListener('click', e => {
    const card = e.target.closest('.product-card');
    if (card) openModal(+card.dataset.id);
  });

  // Cart
  $('#cartBtn').onclick = openCart;
  $('#cartClose').onclick = closeCart;
  $('#cartOverlay').onclick = closeCart;
  $('#cartShop')?.addEventListener('click', closeCart);
  $('#checkoutBtn').onclick = () => window.open('https://www.wynwoodkw.com/cart', '_blank');

  // Modal
  $('#modalClose').onclick = closeModal;
  $('#modalBg').onclick = closeModal;
  $('#modalAdd').onclick = () => { if (modalId) { addCart(modalId, size); closeModal(); } };
  $$('#sizes button').forEach(b => b.onclick = () => {
    $$('#sizes button').forEach(x => x.classList.remove('on'));
    b.classList.add('on');
    size = b.dataset.sz;
  });

  // Newsletter
  $('#newsForm').onsubmit = e => {
    e.preventDefault();
    e.target.reset();
    toast('You\'re on the list 🔥');
  };

  updateCart();
}

/* ── MODAL ── */
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

/* ── CART ── */
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

/* ── REVEAL ON SCROLL ── */
function initParallax() {
  const hero = $('.hero-bg-img');
  if (!hero) return;
  window.addEventListener('scroll', () => {
    const y = Math.min(scrollY, innerHeight);
    hero.style.transform = `scale(1.08) translateY(${y * 0.25}px)`;
  }, { passive: true });
}

function observeReveal() {
  const els = $$('.collection-card, .product-card, .store-card, .lookbook-item, .section-head, .chapter');
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
