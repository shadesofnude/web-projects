# Mini Book Store Landing Page

A simple storefront landing page built with Vite and vanilla HTML, CSS, and JavaScript.

## Features

- Curated multi-product book catalog with category filters and sorting
- Sage and cream white color palette
- Persistent cart with quantity controls and item removal
- Persistent cart with automatic shipping and order total calculation
- Stripe-hosted test checkout with server-side price validation
- Order confirmation after the server verifies Stripe reports payment as paid
- Responsive layout for desktop and mobile

## Stripe test setup

1. Copy `.env.example` to `.env`.
2. In your Stripe Dashboard, reveal a test-mode secret key and set `STRIPE_SECRET_KEY` in `.env`. It must start with `sk_test_`.
3. Keep `.env` private. It is ignored by Git; never put the secret key in browser code or commit it.

The server creates Checkout Sessions using its own product IDs and prices, so browser-submitted prices are not trusted. Stripe Checkout collects the email, delivery address, and test card details. Shipping is $5 below $45 and free at or above $45.

For an external preview or tunnel, set `PUBLIC_BASE_URL` to the exact public HTTPS URL used to open the store so Stripe can return to the right page.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

Use Stripe's test card `4242 4242 4242 4242`, any future expiry date, and any three-digit CVC. No real payment is taken. The app's success route verifies payment with Stripe; the cancel route keeps the cart intact.
