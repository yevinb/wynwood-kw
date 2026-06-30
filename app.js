/* ═══════════════════════════════════════════════════
   WYNWOOD — Ultra Premium App
   ═══════════════════════════════════════════════════ */

const PRODUCTS = [
  { id: 1, name: 'Wynwood CEO Tee — Black', collection: 'CEO', category: 'tees', price: 16, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1776527995.jpeg', badge: 'New' },
  { id: 2, name: 'Wynwood CEO Tee — White', collection: 'CEO', category: 'tees', price: 16, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1776527995.jpeg' },
  { id: 3, name: 'Wynwood CEO Short — Black', collection: 'CEO', category: 'shorts', price: 15, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1776527995.jpeg' },
  { id: 4, name: 'Billionaire Energy Tee — Olive', collection: 'Billionaire Energy', category: 'tees', price: 16, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/17765277131.jpeg', badge: 'Hot' },
  { id: 5, name: 'Billionaire Energy Tee — White', collection: 'Billionaire Energy', category: 'tees', price: 16, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/17765277131.jpeg' },
  { id: 6, name: 'Billionaire Energy Tee — Navy', collection: 'Billionaire Energy', category: 'tees', price: 16, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/17765277131.jpeg' },
  { id: 7, name: 'Billionaire Energy Hoodie — Navy', collection: 'Billionaire Energy', category: 'hoodies', price: 22, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1776527713.jpeg', badge: 'Bestseller' },
  { id: 8, name: 'Wynwood Exclusive Hoodie — Black', collection: 'Exclusive', category: 'hoodies', price: 22, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1776527713.jpeg' },
  { id: 9, name: 'Wynwood Exclusive Hoodie — White', collection: 'Exclusive', category: 'hoodies', price: 22, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1776527713.jpeg' },
  { id: 10, name: 'Wynwood Exclusive Tee — Black', collection: 'Exclusive', category: 'tees', price: 16, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1776527713.jpeg' },
  { id: 11, name: 'Wynwood Exclusive Short — Grey', collection: 'Exclusive', category: 'shorts', price: 15, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1742474498.jpeg' },
  { id: 12, name: 'Wynwood Kuwait Hoodie — Black', collection: 'Kuwait', category: 'hoodies', price: 22, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1738771077.jpeg', badge: 'Kuwait' },
  { id: 13, name: 'Wynwood Kuwait Hoodie — White', collection: 'Kuwait', category: 'hoodies', price: 22, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/17387710771.jpeg' },
  { id: 14, name: 'Kuwait Hoodie Kids — Black', collection: 'Kuwait', category: 'hoodies', price: 22, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/17387710772.jpeg' },
  { id: 15, name: 'The Club Hoodie — Black', collection: 'The Club', category: 'hoodies', price: 18, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1776527713.jpeg' },
  { id: 16, name: 'The Club Hoodie — Stone', collection: 'The Club', category: 'hoodies', price: 20, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1776527713.jpeg' },
  { id: 17, name: 'The Club Hoodie — Cream', collection: 'The Club', category: 'hoodies', price: 18, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1776527713.jpeg' },
  { id: 18, name: 'Graphics Hoodie — Black', collection: 'Graphics', category: 'hoodies', price: 22, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1776527713.jpeg' },
  { id: 19, name: 'Portofino Hoodie — Navy', collection: 'Portofino', category: 'hoodies', price: 22, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1776527713.jpeg' },
  { id: 20, name: 'Ultralight Jacket', collection: 'Exclusive', category: 'hoodies', price: 22, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1776527713.jpeg' },
  { id: 21, name: 'Wynwood Socks V2', collection: 'Accessories', category: 'accessories', price: 10, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1700689186.jpeg' },
  { id: 22, name: 'Premium Tote Bag', collection: 'Accessories', category: 'accessories', price: 10, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1738770020.jpeg' },
  { id: 23, name: 'Washed Blue Cap', collection: 'Accessories', category: 'accessories', price: 12, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1738770020.jpeg' },
  { id: 24, name: 'Allover Body Spray', collection: 'Accessories', category: 'accessories', price: 14, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1738770020.jpeg' },
];

const I18N = {
  en: {
    'nav.collections': 'Collections', 'nav.shop': 'Shop', 'nav.editorial': 'Editorial', 'nav.stores': 'Stores',
    'hero.l1': 'Founder', 'hero.l2': 'Of Your', 'hero.l3': 'Own Life',
    'hero.sub': 'Premium Kuwait streetwear for those who write their own rules. CEO mindset. Billionaire energy. No permission needed.',
    'hero.cta1': 'Shop Drops', 'hero.cta2': 'View Collections',
    'hero.m1': 'Community', 'hero.m2': 'Releases', 'hero.m3': 'Stores',
    'col.title': 'Collections', 'col.desc': 'Four attitudes. One standard — excellence.',
    'col.ceo': 'Founder energy. Built different.', 'col.billionaire': 'An attitude, not a trend.',
    'col.exclusive': 'Limited. Premium. Yours.', 'col.kuwait': 'Rep the homeland.', 'col.shop': 'Explore →',
    'drop.tag': 'Just Dropped', 'drop.eyebrow': 'Latest Release',
    'drop.desc': 'The stack we\'re always here for. Billionaire energy pieces — online and in both flagship stores now.',
    'drop.l1': 'Premium heavyweight cotton', 'drop.l2': 'Limited production run', 'drop.l3': 'KWD 16 – 22',
    'drop.cta': 'Shop the Drop',
    'shop.title': 'Shop All', 'f.all': 'All', 'f.hoodies': 'Hoodies', 'f.tees': 'Tees', 'f.shorts': 'Shorts', 'f.acc': 'Accessories',
    'ed.title': 'The Vibe', 'ed.desc': 'Hoodie mode all year. I make the rules. May this energy always find you. Follow @wynwood.kw for drops, fits, and the lifestyle.',
    'ed.c1': 'Billionaire Energy 🤑', 'ed.c2': 'Weekend Mode On 😎', 'ed.c3': 'CEO Mindset ✌️', 'ed.cta': 'Follow on Instagram',
    'brand.quote': '"Wynwood isn\'t just what you wear — it\'s who you\'re becoming."',
    'brand.f1': 'International Shipping', 'brand.f1d': 'Delivered to your door, worldwide.',
    'brand.f2': '100% Authentic', 'brand.f2d': 'Genuine Wynwood, made in Kuwait.',
    'brand.f3': 'KNET & Cards', 'brand.f3d': 'Pay your way. Checkout secure.',
    'brand.f4': 'Men\'s & Women\'s', 'brand.f4d': 'Full range for every fit.',
    'stores.title': 'Visit Us', 'stores.s1': 'Shuwaikh Industrial', 'stores.s1a': 'Lilly Center, Shuwaikh Industrial, Kuwait',
    'stores.s2': 'The Avenues Mall', 'stores.s2a': 'Phase 2, The Avenues, Kuwait',
    'stores.hours': '11 AM – 10 PM', 'stores.dir': 'Directions →',
    'news.title': 'Never Miss a Drop', 'news.desc': 'First access to new collections. Zero spam.',
    'news.ph': 'Enter your email', 'news.btn': 'Join',
    'footer.shop': 'Shop', 'footer.help': 'Help', 'footer.social': 'Social', 'footer.track': 'Track Order',
    'cart.title': 'Your Bag', 'cart.total': 'Total', 'cart.checkout': 'Checkout',
    'cart.empty': 'Your bag is empty', 'cart.shop': 'Start Shopping',
    'modal.desc': 'Premium Kuwait streetwear. Ships worldwide.', 'modal.size': 'Size', 'modal.add': 'Add to Bag',
    'toast.added': 'Added to bag ✦', 'toast.sub': 'You\'re on the list 🔥',
    'quick.view': 'Quick View',
  },
  ar: {
    'nav.collections': 'المجموعات', 'nav.shop': 'تسوق', 'nav.editorial': 'الإطلالات', 'nav.stores': 'المتاجر',
    'hero.l1': 'مؤسس', 'hero.l2': 'حياتك', 'hero.l3': 'الخاصة',
    'hero.sub': 'ستريت وير كويتي فاخر لمن يكتب قواعده. عقلية الرئيس التنفيذي. طاقة الملياردير.',
    'hero.cta1': 'تسوق الإصدارات', 'hero.cta2': 'المجموعات',
    'hero.m1': 'المجتمع', 'hero.m2': 'الإصدارات', 'hero.m3': 'المتاجر',
    'col.title': 'المجموعات', 'col.desc': 'أربع عقليات. معيار واحد — التميز.',
    'col.ceo': 'طاقة المؤسس.', 'col.billionaire': 'عقلية لا موضة.',
    'col.exclusive': 'محدود. فاخر. لك.', 'col.kuwait': 'مثّل وطنك.', 'col.shop': 'استكشف ←',
    'drop.tag': 'وصل للتو', 'drop.eyebrow': 'أحدث إصدار',
    'drop.desc': 'المجموعة التي ننتظرها. قطع طاقة الملياردير — أونلاين وفي المتاجر.',
    'drop.l1': 'قطن فاخر ثقيل', 'drop.l2': 'إنتاج محدود', 'drop.l3': '16 – 22 د.ك',
    'drop.cta': 'تسوق الإصدار',
    'shop.title': 'تسوق الكل', 'f.all': 'الكل', 'f.hoodies': 'هوديز', 'f.tees': 'تيشيرتات', 'f.shorts': 'شورتات', 'f.acc': 'إكسسوارات',
    'ed.title': 'الأجواء', 'ed.desc': 'وضع الهودي طوال العام. أنا أصنع القواعد. تابع @wynwood.kw.',
    'ed.c1': 'طاقة الملياردير 🤑', 'ed.c2': 'وضع العطلة 😎', 'ed.c3': 'عقلية الرئيس ✌️', 'ed.cta': 'تابع على إنستغرام',
    'brand.quote': '"وينوود ليس فقط ما ترتديه — بل من تصبح."',
    'brand.f1': 'شحن دولي', 'brand.f1d': 'توصيل لبابك حول العالم.',
    'brand.f2': 'أصلي 100%', 'brand.f2d': 'وينوود أصلي، صنع في الكويت.',
    'brand.f3': 'كي نت وبطاقات', 'brand.f3d': 'ادفع بطريقتك.',
    'brand.f4': 'رجالي ونسائي', 'brand.f4d': 'تشكيلة كاملة.',
    'stores.title': 'زورونا', 'stores.s1': 'الشويخ الصناعية', 'stores.s1a': 'ليلي سنتر، الشويخ الصناعية',
    'stores.s2': 'الأفنيوز مول', 'stores.s2a': 'المرحلة 2، الأفنيوز',
    'stores.hours': '11 ص – 10 م', 'stores.dir': 'الاتجاهات ←',
    'news.title': 'لا تفوّت الإصدارات', 'news.desc': 'كن أول من يعرف.',
    'news.ph': 'بريدك الإلكتروني', 'news.btn': 'اشترك',
    'footer.shop': 'تسوق', 'footer.help': 'مساعدة', 'footer.social': 'تواصل', 'footer.track': 'تتبع الطلب',
    'cart.title': 'حقيبتك', 'cart.total': 'المجموع', 'cart.checkout': 'الدفع',
    'cart.empty': 'حقيبتك فارغة', 'cart.shop': 'ابدأ التسوق',
    'modal.desc': 'ستريت وير كويتي فاخر. شحن عالمي.', 'modal.size': 'المقاس', 'modal.add': 'أضف للحقيبة',
    'toast.added': 'أُضيف للحقيبة ✦', 'toast.sub': 'أنت على القائمة 🔥',
    'quick.view': 'عرض سريع',
  }
};

let cart = JSON.parse(localStorage.getItem('wynwood-cart') || '[]');
let lang = localStorage.getItem('wynwood-lang') || 'en';
let activeFilter = 'all';
let selectedSize = 'M';
let modalProduct = null;

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initCursor();
  initHeader();
  initMenu();
  initLang();
  renderProducts();
  initFilters();
  initCollections();
  initCart();
  initModal();
  initReveal();
  initCounters();
  initParallax();
  initEditorial();
  initDragScroll();
  initMagnetic();
  initNewsletter();
  updateCartUI();
});

/* ── Preloader ── */
function initPreloader() {
  const bar = $('#preloaderBar');
  const pct = $('#preloaderPct');
  let progress = 0;
  const tick = setInterval(() => {
    progress += Math.random() * 18 + 4;
    if (progress >= 100) {
      progress = 100;
      clearInterval(tick);
      setTimeout(() => $('#preloader').classList.add('done'), 400);
    }
    bar.style.width = progress + '%';
    pct.textContent = Math.floor(progress) + '%';
  }, 80);
}

/* ── Custom Cursor ── */
function initCursor() {
  if (!window.matchMedia('(hover: hover)').matches) return;
  const cursor = $('#cursor');
  const dot = $('#cursorDot');
  let mx = 0, my = 0, cx = 0, cy = 0;

  document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; dot.style.left = mx + 'px'; dot.style.top = my + 'px'; });

  const animate = () => {
    cx += (mx - cx) * 0.15;
    cy += (my - cy) * 0.15;
    cursor.style.left = cx + 'px';
    cursor.style.top = cy + 'px';
    requestAnimationFrame(animate);
  };
  animate();

  const hoverables = 'a, button, .product-card, .collection-slide, .filter, .menu-link';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverables)) {
      cursor.classList.add('hover');
      cursor.querySelector('span').textContent = e.target.closest('.product-card') ? 'View' : '';
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverables)) cursor.classList.remove('hover');
  });
}

/* ── Header scroll ── */
function initHeader() {
  const header = $('#header');
  window.addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 60), { passive: true });
}

/* ── Fullscreen menu ── */
function initMenu() {
  const btn = $('#menuBtn');
  const menu = $('#fullscreenMenu');
  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.classList.toggle('active', open);
    btn.setAttribute('aria-expanded', open);
    menu.setAttribute('aria-hidden', !open);
    document.body.classList.toggle('menu-open', open);
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menu.classList.remove('open');
    btn.classList.remove('active');
    document.body.classList.remove('menu-open');
  }));
}

/* ── Language ── */
function initLang() {
  $('#langBtn').addEventListener('click', () => {
    lang = lang === 'en' ? 'ar' : 'en';
    localStorage.setItem('wynwood-lang', lang);
    applyLang();
    renderProducts();
  });
  applyLang();
}

function applyLang() {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  $('#langBtn').textContent = lang === 'en' ? 'عربي' : 'EN';
  $$('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (I18N[lang][key]) {
      if (key === 'brand.quote') el.textContent = I18N[lang][key];
      else el.innerHTML = I18N[lang][key];
    }
  });
  $$('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (I18N[lang][key]) el.placeholder = I18N[lang][key];
  });
}

/* ── Products ── */
function renderProducts() {
  const viewLabel = I18N[lang]['quick.view'];
  $('#productGrid').innerHTML = PRODUCTS.map(p => `
    <article class="product-card" data-id="${p.id}" data-category="${p.category}" data-collection="${p.collection.toLowerCase()}">
      <div class="product-img">
        <img src="${p.image}" alt="${p.name}" loading="lazy"/>
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        <div class="product-hover"><span>${viewLabel}</span></div>
      </div>
      <div class="product-body">
        <div class="product-col">${p.collection}</div>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-price">KWD ${p.price.toFixed(3)}</div>
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

function initCollections() {
  $$('.collection-cta').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const filter = btn.dataset.filter;
      $$('.filter').forEach(b => b.classList.remove('active'));
      const target = $(`.filter[data-filter="${filter}"]`) || $('.filter[data-filter="all"]');
      if (target) { target.classList.add('active'); applyFilter(filter); }
      else applyFilter('all');
      $('#shop').scrollIntoView({ behavior: 'smooth' });
    });
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
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
}

function openModal(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  modalProduct = p;
  $('#modalImg').src = p.image;
  $('#modalImg').alt = p.name;
  $('#modalCollection').textContent = p.collection;
  $('#modalName').textContent = p.name;
  $('#modalPrice').textContent = 'KWD ' + p.price.toFixed(3);
  $('#productModal').classList.add('open');
  $('#modalOverlay').classList.add('open');
  document.body.classList.add('modal-open');
}

function closeModal() {
  $('#productModal').classList.remove('open');
  $('#modalOverlay').classList.remove('open');
  document.body.classList.remove('modal-open');
  modalProduct = null;
}

/* ── Cart ── */
function addToCart(id, size = 'M') {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const key = id + '-' + size;
  const existing = cart.find(i => i.key === key);
  if (existing) existing.qty++;
  else cart.push({ id, size, key, qty: 1 });
  saveCart();
  updateCartUI();
  showToast(I18N[lang]['toast.added']);
}

function removeFromCart(key) {
  cart = cart.filter(i => i.key !== key);
  saveCart();
  updateCartUI();
}

function updateQty(key, delta) {
  const item = cart.find(i => i.key === key);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(key);
  else { saveCart(); updateCartUI(); }
}

function saveCart() { localStorage.setItem('wynwood-cart', JSON.stringify(cart)); }

function getCartTotal() {
  return cart.reduce((sum, item) => {
    const p = PRODUCTS.find(pr => pr.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
}

function updateCartUI() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const countEl = $('#cartCount');
  countEl.textContent = count;
  countEl.classList.toggle('show', count > 0);

  const itemsEl = $('#cartItems');
  const footer = $('#cartFooter');
  const empty = $('#cartEmpty');

  if (!cart.length) {
    itemsEl.innerHTML = '';
    footer.classList.remove('visible');
    empty.classList.remove('hidden');
    return;
  }
  empty.classList.add('hidden');
  footer.classList.add('visible');
  itemsEl.innerHTML = cart.map(item => {
    const p = PRODUCTS.find(pr => pr.id === item.id);
    if (!p) return '';
    return `
      <div class="cart-item">
        <img src="${p.image}" alt="${p.name}"/>
        <div>
          <h4>${p.name}</h4>
          <div class="price">KWD ${(p.price * item.qty).toFixed(3)}</div>
          <div class="size">Size: ${item.size}</div>
          <div class="cart-qty">
            <button onclick="updateQty('${item.key}',-1)">−</button>
            <span>${item.qty}</span>
            <button onclick="updateQty('${item.key}',1)">+</button>
          </div>
          <button class="cart-remove" onclick="removeFromCart('${item.key}')">Remove</button>
        </div>
      </div>`;
  }).join('');
  $('#cartTotal').textContent = 'KWD ' + getCartTotal().toFixed(3);
}

function initCart() {
  $('#cartBtn').addEventListener('click', openCart);
  $('#cartClose').addEventListener('click', closeCart);
  $('#cartOverlay').addEventListener('click', closeCart);
  $('#cartShopLink')?.addEventListener('click', closeCart);
  $('#checkoutBtn').addEventListener('click', () => window.open('https://www.wynwoodkw.com/cart', '_blank'));
}

function openCart() {
  $('#cartDrawer').classList.add('open');
  $('#cartOverlay').classList.add('open');
  document.body.classList.add('cart-open');
}
function closeCart() {
  $('#cartDrawer').classList.remove('open');
  $('#cartOverlay').classList.remove('open');
  document.body.classList.remove('cart-open');
}

/* ── Scroll reveal ── */
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 60);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  $$('.reveal').forEach(el => obs.observe(el));
}

/* ── Counters ── */
function initCounters() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.count;
      const duration = 2000;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = target >= 1000 ? Math.floor(target * eased).toLocaleString() + '+' : Math.floor(target * eased);
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target >= 1000 ? target.toLocaleString() + '+' : target;
      };
      requestAnimationFrame(step);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  $$('[data-count]').forEach(el => obs.observe(el));
}

/* ── Parallax ── */
function initParallax() {
  const hero = $('#heroParallax');
  if (!hero) return;
  window.addEventListener('scroll', () => {
    const y = scrollY * 0.12;
    hero.style.transform = `translateY(${y}px)`;
  }, { passive: true });
}

/* ── Editorial panel rotation ── */
function initEditorial() {
  const panels = $$('.editorial-panel');
  if (!panels.length) return;
  let current = 0;
  panels[0].classList.add('active');
  setInterval(() => {
    panels[current].classList.remove('active');
    current = (current + 1) % panels.length;
    panels[current].classList.add('active');
  }, 4000);
}

/* ── Drag scroll collections ── */
function initDragScroll() {
  const track = $('#collectionTrack');
  if (!track) return;
  let isDown = false, startX, scrollLeft;
  track.addEventListener('mousedown', (e) => { isDown = true; startX = e.pageX - track.offsetLeft; scrollLeft = track.scrollLeft; });
  track.addEventListener('mouseleave', () => isDown = false);
  track.addEventListener('mouseup', () => isDown = false);
  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    track.scrollLeft = scrollLeft - (e.pageX - track.offsetLeft - startX) * 1.5;
  });
}

/* ── Magnetic buttons ── */
function initMagnetic() {
  if (!window.matchMedia('(hover: hover)').matches) return;
  $$('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
}

/* ── Newsletter ── */
function initNewsletter() {
  $('#newsletterForm').addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.reset();
    showToast(I18N[lang]['toast.sub']);
  });
}

function showToast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

window.updateQty = updateQty;
window.removeFromCart = removeFromCart;
