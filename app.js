/* ═══════════════════════════════════════════
   WYNWOOD KW — App Logic
   ═══════════════════════════════════════════ */

const PRODUCTS = [
  { id: 1, name: 'Wynwood CEO Tee — Black', collection: 'CEO', category: 'tees', price: 16, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1776527995.jpeg', badge: 'New' },
  { id: 2, name: 'Wynwood CEO Tee — White', collection: 'CEO', category: 'tees', price: 16, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1776527995.jpeg' },
  { id: 3, name: 'Wynwood CEO Short — Black', collection: 'CEO', category: 'shorts', price: 15, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1776527995.jpeg' },
  { id: 4, name: 'Billionaire Energy Tee — Olive Green', collection: 'Billionaire Energy', category: 'tees', price: 16, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/17765277131.jpeg', badge: 'Hot' },
  { id: 5, name: 'Billionaire Energy Tee — White', collection: 'Billionaire Energy', category: 'tees', price: 16, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/17765277131.jpeg' },
  { id: 6, name: 'Billionaire Energy Tee — Navy', collection: 'Billionaire Energy', category: 'tees', price: 16, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/17765277131.jpeg' },
  { id: 7, name: 'Billionaire Energy Hoodie — Navy', collection: 'Billionaire Energy', category: 'hoodies', price: 22, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1776527713.jpeg', badge: 'Bestseller' },
  { id: 8, name: 'Wynwood Exclusive Hoodie — Black', collection: 'Exclusive', category: 'hoodies', price: 22, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1776527713.jpeg' },
  { id: 9, name: 'Wynwood Exclusive Hoodie — White', collection: 'Exclusive', category: 'hoodies', price: 22, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1776527713.jpeg' },
  { id: 10, name: 'Wynwood Exclusive Tee — Black', collection: 'Exclusive', category: 'tees', price: 16, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1776527713.jpeg' },
  { id: 11, name: 'Wynwood Exclusive Short — Black', collection: 'Exclusive', category: 'shorts', price: 15, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1742474498.jpeg' },
  { id: 12, name: 'Wynwood Kuwait Hoodie — Black', collection: 'Kuwait', category: 'hoodies', price: 22, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1738771077.jpeg', badge: 'Kuwait' },
  { id: 13, name: 'Wynwood Kuwait Hoodie — White', collection: 'Kuwait', category: 'hoodies', price: 22, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/17387710771.jpeg' },
  { id: 14, name: 'Wynwood Kuwait Hoodie Kids — Black', collection: 'Kuwait', category: 'hoodies', price: 22, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/17387710772.jpeg' },
  { id: 15, name: 'The Club Hoodie — Black', collection: 'The Club', category: 'hoodies', price: 18, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1776527713.jpeg' },
  { id: 16, name: 'The Club Hoodie — Stone', collection: 'The Club', category: 'hoodies', price: 20, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1776527713.jpeg' },
  { id: 17, name: 'The Club Hoodie — Cream', collection: 'The Club', category: 'hoodies', price: 18, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1776527713.jpeg' },
  { id: 18, name: 'Wynwood Graphics Hoodie — Black', collection: 'Graphics', category: 'hoodies', price: 22, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1776527713.jpeg' },
  { id: 19, name: 'Wynwood Portofino Hoodie — Navy', collection: 'Portofino', category: 'hoodies', price: 22, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1776527713.jpeg' },
  { id: 20, name: 'Ultralight Wynwood Jacket', collection: 'Exclusive', category: 'hoodies', price: 22, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1776527713.jpeg' },
  { id: 21, name: 'Wynwood Socks V2', collection: 'Accessories', category: 'accessories', price: 10, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1700689186.jpeg' },
  { id: 22, name: 'Wynwood Premium Tote Bag', collection: 'Accessories', category: 'accessories', price: 10, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1738770020.jpeg' },
  { id: 23, name: 'Wynwood Washed Blue Cap', collection: 'Accessories', category: 'accessories', price: 12, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1738770020.jpeg' },
  { id: 24, name: 'Wynwood Allover Body Spray', collection: 'Accessories', category: 'accessories', price: 14, image: 'https://wynwoodkw.com/uploads/products/cache/500_700/1738770020.jpeg' },
];

const I18N = {
  en: {
    'nav.collections': 'Collections',
    'nav.shop': 'Shop',
    'nav.lookbook': 'Lookbook',
    'nav.stores': 'Stores',
    'hero.eyebrow': 'Kuwait · Est. Streetwear',
    'hero.line1': 'FOUNDER',
    'hero.line2': 'OF YOUR',
    'hero.line3': 'OWN LIFE',
    'hero.sub': 'Premium streetwear built for those who make the rules. CEO energy. Billionaire attitude. Kuwait-made.',
    'hero.cta1': 'Shop New Drops',
    'hero.cta2': 'Explore Collections',
    'hero.stat1': 'Followers',
    'hero.stat2': 'Drops Shipped',
    'hero.stat3': 'Flagship Stores',
    'collections.tag': 'Collections',
    'collections.title': 'Curated Energy',
    'collections.desc': 'Every line tells a story. Pick your attitude.',
    'col.ceo': 'Founder & creator energy. Tees & shorts.',
    'col.billionaire': 'Not a trend — an attitude. Tees & hoodies.',
    'col.exclusive': 'Limited drops. Premium cuts. Stand apart.',
    'col.kuwait': 'Rep the homeland. Hoodies for all ages.',
    'col.shop': 'Shop Collection →',
    'featured.badge': 'Just Dropped',
    'featured.desc': 'The stack we\'re always here for. New billionaire energy pieces — online & in stores now.',
    'featured.cta': 'Get Yours',
    'shop.tag': 'Shop',
    'shop.title': 'All Products',
    'filter.all': 'All',
    'filter.hoodies': 'Hoodies',
    'filter.tees': 'Tees',
    'filter.shorts': 'Shorts',
    'filter.accessories': 'Accessories',
    'brand.tag': 'The Brand',
    'brand.title': 'Kuwait Streetwear,<br/>Global Attitude',
    'brand.p1': 'Wynwood is more than clothing — it\'s a mindset. Born in Kuwait, built for those who hustle, create, and lead. From the CEO collection to Billionaire Energy drops, every piece is designed to make a statement.',
    'brand.p2': '100% genuine products. International shipping. Pay with KNET & credit cards. Open 11 AM – 10 PM daily.',
    'brand.f1': 'International Shipping',
    'brand.f2': '100% Genuine Products',
    'brand.f3': 'KNET & Card Payments',
    'brand.f4': 'Men\'s & Women\'s',
    'lookbook.tag': '@wynwood.kw',
    'lookbook.title': 'The Vibe',
    'lookbook.desc': 'Weekend mode on. Hoodie mode all year. Follow the energy.',
    'lookbook.follow': 'Follow @wynwood.kw',
    'stores.tag': 'Visit Us',
    'stores.title': 'Flagship Stores',
    'stores.desc': 'Try it on. Feel the quality. Walk out stacked.',
    'stores.s1.title': 'Shuwaikh Industrial',
    'stores.s1.addr': 'Lilly Center, Shuwaikh Industrial, Kuwait',
    'stores.s2.title': 'The Avenues Mall',
    'stores.s2.addr': 'Phase 2, The Avenues, Kuwait',
    'stores.hours': 'Open 11 AM – 10 PM',
    'stores.directions': 'Get Directions',
    'news.title': 'Stay Ahead of Drops',
    'news.desc': 'Be first to know when new collections launch. No spam — just heat.',
    'news.placeholder': 'your@email.com',
    'news.cta': 'Subscribe',
    'footer.tagline': 'Kuwait streetwear with global attitude.',
    'footer.shop': 'Shop',
    'footer.help': 'Help',
    'footer.contact': 'Contact',
    'footer.track': 'Track Order',
    'footer.social': 'Social',
    'footer.rights': 'All rights reserved.',
    'cart.title': 'Your Bag',
    'cart.total': 'Total',
    'cart.checkout': 'Checkout',
    'cart.note': 'Secure checkout via wynwoodkw.com',
    'cart.empty': 'Your bag is empty',
    'cart.shop': 'Start Shopping',
    'toast.added': 'Added to bag',
    'toast.subscribed': 'You\'re on the list 🔥',
    'quick.add': 'Add to Bag',
  },
  ar: {
    'nav.collections': 'المجموعات',
    'nav.shop': 'تسوق',
    'nav.lookbook': 'الإطلالات',
    'nav.stores': 'المتاجر',
    'hero.eyebrow': 'الكويت · ستريت وير',
    'hero.line1': 'مؤسس',
    'hero.line2': 'حياتك',
    'hero.line3': 'الخاصة',
    'hero.sub': 'ستريت وير فاخر لمن يصنع القواعد. طاقة الرئيس التنفيذي. عقلية الملياردير. صنع في الكويت.',
    'hero.cta1': 'تسوق الإصدارات الجديدة',
    'hero.cta2': 'استكشف المجموعات',
    'hero.stat1': 'متابع',
    'hero.stat2': 'إصدار',
    'hero.stat3': 'متجر رئيسي',
    'collections.tag': 'المجموعات',
    'collections.title': 'طاقة مختارة',
    'collections.desc': 'كل مجموعة تحكي قصة. اختر عقليتك.',
    'col.ceo': 'طاقة المؤسس والمبدع. تيشيرتات وشورتات.',
    'col.billionaire': 'ليست موضة — عقلية. تيشيرتات وهوديز.',
    'col.exclusive': 'إصدارات محدودة. قصات فاخرة.',
    'col.kuwait': 'مثّل وطنك. هوديز لجميع الأعمار.',
    'col.shop': 'تسوق المجموعة ←',
    'featured.badge': 'وصل للتو',
    'featured.desc': 'المجموعة التي ننتظرها دائماً. قطع طاقة الملياردير الجديدة — أونلاين وفي المتاجر.',
    'featured.cta': 'احصل عليها',
    'shop.tag': 'تسوق',
    'shop.title': 'جميع المنتجات',
    'filter.all': 'الكل',
    'filter.hoodies': 'هوديز',
    'filter.tees': 'تيشيرتات',
    'filter.shorts': 'شورتات',
    'filter.accessories': 'إكسسوارات',
    'brand.tag': 'العلامة',
    'brand.title': 'ستريت وير كويتي،<br/>عقلية عالمية',
    'brand.p1': 'وينوود أكثر من ملابس — إنها عقلية. ولدت في الكويت، صُنعت لمن يجتهد ويبتكر ويقود. من مجموعة CEO إلى إصدارات Billionaire Energy، كل قطعة مصممة لتُحدث فرقاً.',
    'brand.p2': 'منتجات أصلية 100%. شحن دولي. الدفع بكي نت والبطاقات. مفتوح 11 صباحاً – 10 مساءً.',
    'brand.f1': 'شحن دولي',
    'brand.f2': 'منتجات أصلية 100%',
    'brand.f3': 'كي نت والبطاقات',
    'brand.f4': 'رجالي ونسائي',
    'lookbook.tag': '@wynwood.kw',
    'lookbook.title': 'الأجواء',
    'lookbook.desc': 'وضع عطلة نهاية الأسبوع. وضع الهودي طوال العام.',
    'lookbook.follow': 'تابع @wynwood.kw',
    'stores.tag': 'زورونا',
    'stores.title': 'متاجرنا الرئيسية',
    'stores.desc': 'جرّبها. اشعر بالجودة. اخرج بأناقة.',
    'stores.s1.title': 'الشويخ الصناعية',
    'stores.s1.addr': 'ليلي سنتر، الشويخ الصناعية، الكويت',
    'stores.s2.title': 'الأفنيوز مول',
    'stores.s2.addr': 'المرحلة 2، الأفنيوز، الكويت',
    'stores.hours': 'مفتوح 11 ص – 10 م',
    'stores.directions': 'الاتجاهات',
    'news.title': 'كن أول من يعرف',
    'news.desc': 'كن أول من يعرف عند إطلاق المجموعات الجديدة.',
    'news.placeholder': 'بريدك@الإلكتروني.com',
    'news.cta': 'اشترك',
    'footer.tagline': 'ستريت وير كويتي بعقلية عالمية.',
    'footer.shop': 'تسوق',
    'footer.help': 'مساعدة',
    'footer.contact': 'تواصل',
    'footer.track': 'تتبع الطلب',
    'footer.social': 'تواصل',
    'footer.rights': 'جميع الحقوق محفوظة.',
    'cart.title': 'حقيبتك',
    'cart.total': 'المجموع',
    'cart.checkout': 'الدفع',
    'cart.note': 'دفع آمن عبر wynwoodkw.com',
    'cart.empty': 'حقيبتك فارغة',
    'cart.shop': 'ابدأ التسوق',
    'toast.added': 'أُضيف إلى الحقيبة',
    'toast.subscribed': 'أنت على القائمة 🔥',
    'quick.add': 'أضف للحقيبة',
  }
};

let cart = JSON.parse(localStorage.getItem('wynwood-cart') || '[]');
let lang = localStorage.getItem('wynwood-lang') || 'en';
let activeFilter = 'all';

/* ── DOM refs ── */
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  renderProducts();
  applyLang();
  updateCartUI();
  initScrollReveal();
  initNav();
  initCart();
  initFilters();
  initCollectionLinks();
  initNewsletter();
  initHeaderScroll();
});

/* ── Preloader ── */
function initPreloader() {
  window.addEventListener('load', () => {
    setTimeout(() => $('#preloader').classList.add('done'), 600);
  });
}

/* ── Products ── */
function renderProducts() {
  const grid = $('#productGrid');
  const addLabel = I18N[lang]['quick.add'];
  grid.innerHTML = PRODUCTS.map(p => `
    <article class="product-card" data-category="${p.category}" data-collection="${p.collection.toLowerCase()}">
      <div class="product-img-wrap">
        <img src="${p.image}" alt="${p.name}" loading="lazy"/>
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ''}
        <button class="product-quick-add" data-id="${p.id}">${addLabel}</button>
      </div>
      <div class="product-info">
        <div class="product-collection">${p.collection}</div>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-price">KWD ${p.price.toFixed(3)}</div>
      </div>
    </article>
  `).join('');

  grid.querySelectorAll('.product-quick-add').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart(+btn.dataset.id);
    });
  });

  applyFilter(activeFilter);
}

/* ── Filters ── */
function initFilters() {
  $$('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('.filter-btn').forEach(b => b.classList.remove('active'));
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

function initCollectionLinks() {
  $$('.collection-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const filter = link.dataset.filter;
      if (filter) {
        $$('.filter-btn').forEach(b => {
          b.classList.toggle('active', b.dataset.filter === filter || (filter !== 'all' && b.dataset.filter === 'all'));
        });
        const targetBtn = $(`.filter-btn[data-filter="${filter}"]`);
        if (targetBtn) {
          $$('.filter-btn').forEach(b => b.classList.remove('active'));
          targetBtn.classList.add('active');
          applyFilter(filter);
        } else {
          applyFilter('all');
        }
        document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  $$('.collection-card').forEach(card => {
    card.addEventListener('click', () => {
      const link = card.querySelector('.collection-link');
      if (link) link.click();
    });
  });
}

/* ── Cart ── */
function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const existing = cart.find(i => i.id === id);
  if (existing) existing.qty++;
  else cart.push({ id, qty: 1 });
  saveCart();
  updateCartUI();
  showToast(I18N[lang]['toast.added']);
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  updateCartUI();
}

function updateQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else { saveCart(); updateCartUI(); }
}

function saveCart() {
  localStorage.setItem('wynwood-cart', JSON.stringify(cart));
}

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
  countEl.classList.toggle('visible', count > 0);

  const itemsEl = $('#cartItems');
  const footerEl = $('#cartFooter');
  const emptyEl = $('#cartEmpty');

  if (cart.length === 0) {
    itemsEl.innerHTML = '';
    footerEl.classList.remove('visible');
    emptyEl.classList.remove('hidden');
    return;
  }

  emptyEl.classList.add('hidden');
  footerEl.classList.add('visible');
  itemsEl.innerHTML = cart.map(item => {
    const p = PRODUCTS.find(pr => pr.id === item.id);
    if (!p) return '';
    return `
      <div class="cart-item">
        <img src="${p.image}" alt="${p.name}"/>
        <div class="cart-item-info">
          <div class="cart-item-name">${p.name}</div>
          <div class="cart-item-price">KWD ${(p.price * item.qty).toFixed(3)}</div>
          <div class="cart-item-qty">
            <button aria-label="Decrease" onclick="updateQty(${item.id}, -1)">−</button>
            <span>${item.qty}</span>
            <button aria-label="Increase" onclick="updateQty(${item.id}, 1)">+</button>
          </div>
          <button class="cart-item-remove" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      </div>
    `;
  }).join('');

  $('#cartTotal').textContent = `KWD ${getCartTotal().toFixed(3)}`;
}

function initCart() {
  $('#cartBtn').addEventListener('click', openCart);
  $('#cartClose').addEventListener('click', closeCart);
  $('#cartOverlay').addEventListener('click', closeCart);
  $('#cartShopLink').addEventListener('click', closeCart);
  $('#checkoutBtn').addEventListener('click', () => {
    window.open('https://www.wynwoodkw.com/cart', '_blank');
  });
}

function openCart() {
  $('#cartDrawer').classList.add('open');
  $('#cartOverlay').classList.add('open');
  $('#cartDrawer').setAttribute('aria-hidden', 'false');
  document.body.classList.add('cart-open');
}

function closeCart() {
  $('#cartDrawer').classList.remove('open');
  $('#cartOverlay').classList.remove('open');
  $('#cartDrawer').setAttribute('aria-hidden', 'true');
  document.body.classList.remove('cart-open');
}

/* ── Nav ── */
function initNav() {
  const toggle = $('#navToggle');
  const menu = $('#mobileMenu');

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.classList.toggle('active', open);
    toggle.setAttribute('aria-expanded', open);
    menu.setAttribute('aria-hidden', !open);
    document.body.classList.toggle('menu-open', open);
  });

  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });

  $('#langBtn').addEventListener('click', () => {
    lang = lang === 'en' ? 'ar' : 'en';
    localStorage.setItem('wynwood-lang', lang);
    applyLang();
    renderProducts();
    updateCartUI();
  });
}

function initHeaderScroll() {
  const header = $('#header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

/* ── i18n ── */
function applyLang() {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  $('#langBtn').textContent = lang === 'en' ? 'عربي' : 'EN';

  $$('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (I18N[lang][key]) {
      if (key.includes('title') && key.includes('brand')) {
        el.innerHTML = I18N[lang][key];
      } else {
        el.textContent = I18N[lang][key];
      }
    }
  });

  $$('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (I18N[lang][key]) el.placeholder = I18N[lang][key];
  });
}

/* ── Scroll reveal ── */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  $$('.reveal').forEach(el => observer.observe(el));
}

/* ── Newsletter ── */
function initNewsletter() {
  $('#newsletterForm').addEventListener('submit', (e) => {
    e.preventDefault();
    e.target.reset();
    showToast(I18N[lang]['toast.subscribed']);
  });
}

/* ── Toast ── */
function showToast(msg) {
  const toast = $('#toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

/* Expose cart functions for inline handlers */
window.updateQty = updateQty;
window.removeFromCart = removeFromCart;
