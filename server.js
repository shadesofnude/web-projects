import 'dotenv/config';
import express from 'express';
import Stripe from 'stripe';
import { createServer as createViteServer } from 'vite';

const app = express();
const port = Number(process.env.PORT || 3000);
const baseUrl = (process.env.PUBLIC_BASE_URL || `http://localhost:${port}`).replace(/\/$/, '');

const products = {
  1: { name: 'The Silent Meadow', price: 2400 },
  2: { name: 'The Last Candlelight', price: 2800 },
  3: { name: 'Moss & Moonlight', price: 1900 },
  4: { name: 'The Gentle Practice', price: 3200 },
  5: { name: 'The Orchard Letters', price: 2200 },
  6: { name: 'Wild Bloom Notes', price: 1700 },
  7: { name: 'A Place to Begin', price: 2600 },
  8: { name: 'Morning Fields', price: 2900 },
};

app.set('trust proxy', 1);
app.use(express.json({ limit: '10kb' }));

function getStripeClient(response) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey || !secretKey.startsWith('sk_test_')) {
    response.status(503).json({ error: 'Stripe test checkout is not configured. Add an sk_test_ key to .env.' });
    return null;
  }

  return new Stripe(secretKey);
}

app.post('/api/checkout-session', async (request, response) => {
  const stripe = getStripeClient(response);
  if (!stripe) return;

  const items = request.body?.items;
  if (!Array.isArray(items) || items.length === 0 || items.length > Object.keys(products).length) {
    response.status(400).json({ error: 'Your cart is empty or invalid.' });
    return;
  }

  const seen = new Set();
  const lineItems = [];
  let subtotal = 0;

  for (const item of items) {
    const productId = item?.id;
    const product = Number.isInteger(productId) && Object.hasOwn(products, productId) ? products[productId] : null;
    const quantity = item?.quantity;
    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 10 || seen.has(productId)) {
      response.status(400).json({ error: 'Your cart contains an invalid item or quantity.' });
      return;
    }

    seen.add(productId);
    subtotal += product.price * quantity;
    lineItems.push({
      quantity,
      price_data: {
        currency: 'usd',
        unit_amount: product.price,
        product_data: { name: product.name },
      },
    });
  }

  const shippingAmount = subtotal >= 4500 ? 0 : 500;

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'KE'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: shippingAmount, currency: 'usd' },
            display_name: shippingAmount === 0 ? 'Free shipping' : 'Standard shipping',
          },
        },
      ],
      success_url: `${baseUrl}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/?checkout=cancelled`,
      metadata: { store: 'shades-of-nude' },
    });

    response.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout session creation failed:', error.message);
    response.status(502).json({ error: 'Stripe could not start checkout. Please try again.' });
  }
});

app.get('/api/checkout-session/:sessionId', async (request, response) => {
  const stripe = getStripeClient(response);
  if (!stripe) return;

  if (!/^cs_test_[A-Za-z0-9]+$/.test(request.params.sessionId)) {
    response.status(400).json({ error: 'Invalid checkout session.' });
    return;
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(request.params.sessionId);
    response.json({
      paymentStatus: session.payment_status,
      customerName: session.customer_details?.name || 'reader',
      orderReference: session.id.slice(-8).toUpperCase(),
    });
  } catch (error) {
    console.error('Stripe checkout verification failed:', error.message);
    response.status(502).json({ error: 'Could not verify this checkout. Please contact the store.' });
  }
});

app.get('/api/health', (_request, response) => response.json({ ok: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
  app.get('*', (_request, response) => response.sendFile('index.html', { root: 'dist' }));
} else {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
}

app.listen(port, '0.0.0.0', () => {
  console.log(`Shades of Nüde is running at http://localhost:${port}`);
});