const products = [
  {
    id: 1,
    title: 'The Silent Meadow',
    author: 'Elena Hart',
    category: 'fiction',
    price: 24,
    format: 'Hardcover',
    image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=900&q=80',
    description: 'A poetic coming-of-age story set between old forests, family secrets, and a second chance at belonging.',
    featured: true,
  },
  {
    id: 2,
    title: 'The Last Candlelight',
    author: 'Mira Sol',
    category: 'memoir',
    price: 28,
    format: 'Paperback',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=900&q=80',
    description: 'A luminous reflection on memory, home, and the small rituals that keep us grounded through change.',
    featured: true,
  },
  {
    id: 3,
    title: 'Moss & Moonlight',
    author: 'Tessa Vale',
    category: 'poetry',
    price: 19,
    format: 'Paperback',
    image: 'https://images.unsplash.com/photo-1528459105426-09dcb2d2e3a7?auto=format&fit=crop&w=900&q=80',
    description: 'A collection of intimate poems about healing, place, and the quiet courage of becoming yourself.',
    featured: false,
  },
  {
    id: 4,
    title: 'The Gentle Practice',
    author: 'Nora Fields',
    category: 'self-growth',
    price: 32,
    format: 'Hardcover',
    image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&w=900&q=80',
    description: 'A grounded guide to daily rituals, emotional clarity, and creating a calmer, intentional life.',
    featured: false,
  },
  {
    id: 5,
    title: 'The Orchard Letters',
    author: 'Leah Rowan',
    category: 'fiction',
    price: 22,
    format: 'Paperback',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80',
    description: 'An atmospheric tale of inheritance, wonder, and the stories hidden inside family archives.',
    featured: false,
  },
  {
    id: 6,
    title: 'Wild Bloom Notes',
    author: 'Ari Quinn',
    category: 'poetry',
    price: 17,
    format: 'Journal Edition',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=80',
    description: 'Short, luminous meditations on seasons, tenderness, and learning to bloom in your own time.',
    featured: false,
  },
  {
    id: 7,
    title: 'A Place to Begin',
    author: 'Cora Lane',
    category: 'self-growth',
    price: 26,
    format: 'Paperback',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=900&q=80',
    description: 'A compassionate invitation to rebuild routines, boundaries, and joy with gentleness and intention.',
    featured: false,
  },
  {
    id: 8,
    title: 'Morning Fields',
    author: 'Sofia Reed',
    category: 'memoir',
    price: 29,
    format: 'Hardcover',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80',
    description: 'A deeply personal memoir about roots, migration, and the art of making a life that feels like home.',
    featured: false,
  },
];

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const catalogGrid = document.getElementById('catalogGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const sortSelect = document.getElementById('sortSelect');
const cartDialog = document.getElementById('cartDialog');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartSummary = document.getElementById('cartSummary');
const checkoutButton = document.getElementById('checkoutButton');
const checkoutForm = document.getElementById('checkoutForm');
const stripeCheckoutButton = document.getElementById('stripeCheckoutButton');
const checkoutError = document.getElementById('checkoutError');
const cartView = document.getElementById('cartView');
const orderConfirmation = document.getElementById('orderConfirmation');
const journalDialog = document.getElementById('journalArticle');
const journalEntries = {
  'slow-morning': {
    meta: 'Reading rituals · 5 min read',
    title: 'A slower way to start the day',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85',
    alt: 'A notebook and pen ready for a quiet morning',
    paragraphs: [
      'Before the day gathers speed, give yourself a small pocket of quiet. Put the kettle on, find a comfortable chair, and leave your phone in another room for a little while.',
      'A morning reading ritual does not need a strict schedule or a long chapter. A poem, a few pages, or a sentence worth carrying with you is enough. The point is to begin with attention instead of urgency.',
      'Keep a book where you naturally pause: beside your cup, near the window, or on the table by the door. When the habit is easy to reach, it becomes easier to return to.'
    ]
  },
  'soft-landing': {
    meta: 'On the shelf · 4 min read',
    title: 'Books that feel like a soft landing',
    image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1200&q=85',
    alt: 'A stack of books in a sunlit reading nook',
    paragraphs: [
      'Some books meet us without asking for too much. They offer a familiar voice, a world with room to breathe, and the reassuring sense that we can take our time getting there.',
      'Look for stories with generous characters, thoughtful observations, and a rhythm that lets you settle in. A well-loved reread can be just as nourishing as a new discovery; knowing where the path leads can make the journey feel safe.',
      'There is no right book for a difficult day. Choose one that feels kind to you, read a little or a lot, and let putting it down be part of the ritual too.'
    ]
  },
  'thoughtful-shelf': {
    meta: 'Behind the pages · 6 min read',
    title: 'How we build a thoughtful bookshelf',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1200&q=85',
    alt: 'Books arranged together on a wooden shelf',
    paragraphs: [
      'A thoughtful bookshelf is less about having the right number of books and more about making space for the ones that stay with you. We look for writing with a distinct point of view, books that invite conversation, and stories that reward a second visit.',
      'We also pay attention to how a book feels in the hand and at home. Covers, paper, and binding are part of the experience, but they never stand in for what is inside. A beautiful object earns its place when the words matter too.',
      'Our shelves are meant to be lived with. Mix old favorites with unfamiliar voices, leave room for a borrowed recommendation, and let the collection change as you do.'
    ]
  }
};

const state = {
  category: 'all',
  sort: 'featured',
  cart: loadCart(),
};

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem('shades-of-nude-cart') || '[]');
    if (!Array.isArray(saved)) return [];

    return saved.filter((item) => {
      return products.some((product) => product.id === item.id) && Number.isInteger(item.quantity) && item.quantity > 0 && item.quantity <= 10;
    });
  } catch {
    return [];
  }
}

function saveCart() {
  localStorage.setItem('shades-of-nude-cart', JSON.stringify(state.cart));
}

function getVisibleProducts() {
  const filtered = products.filter((product) => state.category === 'all' || product.category === state.category);

  switch (state.sort) {
    case 'low-to-high':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'high-to-low':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'az':
      filtered.sort((a, b) => a.title.localeCompare(b.title));
      break;
    default:
      filtered.sort((a, b) => Number(b.featured) - Number(a.featured));
  }

  return filtered;
}

function renderProducts() {
  const visibleProducts = getVisibleProducts();

  if (!visibleProducts.length) {
    catalogGrid.innerHTML = '<p class="empty-state">No books match this filter yet.</p>';
    return;
  }

  catalogGrid.innerHTML = visibleProducts.map((product) => `
    <article class="product-item catalog-card">
      <div class="product-image"><img src="${product.image}" alt="${product.title} cover" loading="lazy" /></div>
      <div class="product-body">
        <div class="product-meta"><span>${product.category}</span><span>${product.format}</span></div>
        <h3>${product.title}</h3>
        <p class="author-name">${product.author}</p>
        <p>${product.description}</p>
        <div class="product-footer">
          <strong>${currency.format(product.price)}</strong>
          <button class="primary-btn small add-cart" data-product-id="${product.id}" type="button">Add to cart</button>
        </div>
      </div>
    </article>
  `).join('');
}

function getCartLines() {
  return state.cart.map((item) => ({
    ...products.find((product) => product.id === item.id),
    quantity: item.quantity,
  }));
}

function renderCart() {
  const lines = getCartLines();
  const itemCount = lines.reduce((count, item) => count + item.quantity, 0);
  const subtotal = lines.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= 45 ? 0 : 5;

  cartCount.textContent = String(itemCount);
  cartCount.setAttribute('aria-label', `${itemCount} items in cart`);
  checkoutButton.disabled = lines.length === 0;
  cartSummary.hidden = lines.length === 0;

  if (!lines.length) {
    cartItems.innerHTML = '<p class="cart-empty">Your cart is waiting for a good read.</p>';
  } else {
    cartItems.innerHTML = lines.map((item) => `
      <article class="cart-line">
        <img src="${item.image}" alt="" />
        <div class="cart-line-info">
          <h3>${item.title}</h3>
          <p>${currency.format(item.price)} each</p>
          <div class="quantity-control" aria-label="Quantity for ${item.title}">
            <button type="button" data-cart-action="decrease" data-product-id="${item.id}" aria-label="Decrease ${item.title} quantity">−</button>
            <span>${item.quantity}</span>
            <button type="button" data-cart-action="increase" data-product-id="${item.id}" aria-label="Increase ${item.title} quantity" ${item.quantity >= 10 ? 'disabled' : ''}>+</button>
            <button class="remove-item" type="button" data-cart-action="remove" data-product-id="${item.id}">Remove</button>
          </div>
        </div>
        <strong class="line-total">${currency.format(item.price * item.quantity)}</strong>
      </article>
    `).join('');
  }

  document.getElementById('cartSubtotal').textContent = currency.format(subtotal);
  document.getElementById('cartShipping').textContent = shipping === 0 ? 'Free' : currency.format(shipping);
  document.getElementById('cartTotal').textContent = currency.format(subtotal + shipping);
}

function addToCart(productId) {
  const product = products.find((item) => item.id === Number(productId));
  if (!product) return;

  const existing = state.cart.find((item) => item.id === product.id);
  if (existing) existing.quantity += 1;
  else state.cart.push({ id: product.id, quantity: 1 });

  saveCart();
  renderCart();
  cartDialog.showModal();
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    state.category = button.dataset.category;
    filterButtons.forEach((filter) => filter.classList.toggle('active', filter === button));
    renderProducts();
  });
});

sortSelect.addEventListener('change', (event) => {
  state.sort = event.target.value;
  renderProducts();
});

document.querySelectorAll('[data-journal-id]').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const entry = journalEntries[link.dataset.journalId];
    if (!entry) return;

    document.getElementById('journalArticleMeta').textContent = entry.meta;
    document.getElementById('journalArticleTitle').textContent = entry.title;
    const image = document.getElementById('journalArticleImage');
    image.src = entry.image;
    image.alt = entry.alt;

    const body = document.getElementById('journalArticleBody');
    body.replaceChildren(...entry.paragraphs.map((text) => {
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      return paragraph;
    }));

    journalDialog.showModal();
  });
});

document.getElementById('closeJournal').addEventListener('click', () => journalDialog.close());

journalDialog.addEventListener('click', (event) => {
  if (event.target === journalDialog) journalDialog.close();
});

document.addEventListener('click', (event) => {
  const addButton = event.target.closest('[data-product-id]');
  if (addButton && addButton.classList.contains('add-cart')) {
    addToCart(addButton.dataset.productId);
    return;
  }

  const heroBuyButton = event.target.closest('.hero-copy [data-product]');
  if (heroBuyButton) {
    const product = products.find((item) => item.title === heroBuyButton.dataset.product);
    if (product) addToCart(product.id);
  }

  const cartAction = event.target.closest('[data-cart-action]');
  if (!cartAction) return;

  const productId = Number(cartAction.dataset.productId);
  const item = state.cart.find((entry) => entry.id === productId);
  if (!item) return;

  if (cartAction.dataset.cartAction === 'increase' && item.quantity < 10) item.quantity += 1;
  if (cartAction.dataset.cartAction === 'decrease') item.quantity -= 1;
  if (cartAction.dataset.cartAction === 'remove' || item.quantity < 1) {
    state.cart = state.cart.filter((entry) => entry.id !== productId);
  }

  saveCart();
  renderCart();
});

document.getElementById('cartTrigger').addEventListener('click', () => {
  checkoutForm.hidden = true;
  cartView.hidden = false;
  orderConfirmation.hidden = true;
  renderCart();
  cartDialog.showModal();
});

document.getElementById('closeCart').addEventListener('click', () => cartDialog.close());

cartDialog.addEventListener('click', (event) => {
  if (event.target === cartDialog) cartDialog.close();
});

checkoutButton.addEventListener('click', () => {
  if (state.cart.length === 0) return;
  cartView.hidden = true;
  checkoutForm.hidden = false;
  checkoutError.hidden = true;
  stripeCheckoutButton.focus();
});

document.getElementById('backToCart').addEventListener('click', () => {
  checkoutForm.hidden = true;
  cartView.hidden = false;
});

stripeCheckoutButton.addEventListener('click', async () => {
  if (!state.cart.length) return;

  stripeCheckoutButton.disabled = true;
  stripeCheckoutButton.textContent = 'Connecting to Stripe...';
  checkoutError.hidden = true;

  try {
    const response = await fetch('/api/checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: state.cart }),
    });
    const result = await response.json();

    if (!response.ok || !result.url) {
      throw new Error(result.error || 'Unable to start checkout. Please try again.');
    }

    window.location.assign(result.url);
  } catch (error) {
    checkoutError.textContent = error.message;
    checkoutError.hidden = false;
    stripeCheckoutButton.disabled = false;
    stripeCheckoutButton.textContent = 'Continue to Stripe';
  }
});

document.getElementById('finishOrder').addEventListener('click', () => {
  cartDialog.close();
  cartView.hidden = false;
  orderConfirmation.hidden = true;
});

async function handleCheckoutReturn() {
  const url = new URL(window.location.href);
  const checkoutStatus = url.searchParams.get('checkout');

  if (!checkoutStatus) return;

  url.searchParams.delete('checkout');
  const sessionId = url.searchParams.get('session_id');
  url.searchParams.delete('session_id');
  window.history.replaceState({}, '', url);

  if (checkoutStatus === 'cancelled') {
    cartDialog.showModal();
    checkoutForm.hidden = false;
    cartView.hidden = true;
    orderConfirmation.hidden = true;
    checkoutError.textContent = 'Checkout was cancelled. Your cart is still saved.';
    checkoutError.hidden = false;
    return;
  }

  if (checkoutStatus !== 'success' || !sessionId) return;

  try {
    const response = await fetch(`/api/checkout-session/${encodeURIComponent(sessionId)}`);
    const result = await response.json();
    if (!response.ok || result.paymentStatus !== 'paid') {
      throw new Error(result.error || 'Payment has not been confirmed. Your cart is still saved.');
    }

    state.cart = [];
    saveCart();
    renderCart();
    document.getElementById('confirmationMessage').textContent =
      `Thank you, ${result.customerName}. Your test order ${result.orderReference} is confirmed.`;
    cartView.hidden = true;
    checkoutForm.hidden = true;
    orderConfirmation.hidden = false;
    cartDialog.showModal();
  } catch (error) {
    cartDialog.showModal();
    checkoutForm.hidden = false;
    cartView.hidden = true;
    orderConfirmation.hidden = true;
    checkoutError.textContent = error.message;
    checkoutError.hidden = false;
  }
}

renderProducts();
renderCart();
handleCheckoutReturn();
