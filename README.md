# Hollow & Harvest

A local Next.js Halloween storefront using the Vercel Shop template components, styles, and fonts. No Shopify account, credentials, database, or payment service required.

From the repository root:

```sh
pnpm install
pnpm dev
```

Open http://localhost:3000. The catalog includes eight sample products. Search, category filters, sorting, product pages, quantity controls, cart persistence, and a checkout preview work locally. No orders or payments are submitted.

The navigation, cards, quick-shop layout, product detail section, media gallery, search dialog, collection filters, sorting, and cart layouts come from the repository’s `components/`. Local catalog and cart adapters live in `lib/`. There are no Shopify API, account, agent, or analytics integrations. Hydrogen supplies the template’s filter state and money-formatting helpers only.

Use `SPOOKY10` for a sample discount. Checkout is a local preview.

Build with `pnpm build`, then serve with `pnpm start`. Run `pnpm lint` and `pnpm typecheck` for static checks.

Catalog and sample prices: `lib/product/catalog.json`. Images: `public/images/`. Cart data lives under `hollow-harvest-cart-v1` in browser local storage.

## Juggling demo

The home-page products juggle automatically at Lively speed, every 1.8 seconds. Every shuffle changes the actual product DOM order. There are no configuration controls.

Cards retain their product links and quick-shop state while moving. The Web Animations API animates the live elements, avoiding View Transition snapshots that interfere with hit testing. Reduced-motion preferences disable movement animations. Juggling does not pause on hover or focus.

Standalone Python recording scripts live in [stagehand-demo](stagehand-demo/README.md). Record Playwright and Stagehand separately to compare a positional selector with product intent. The storefront itself has no automation dependency.

## Photo sources

Photos downloaded through the browser from Unsplash. They illustrate the demo products.

- Midnight Jack-o-Lantern: https://unsplash.com/photos/Nu3qsoEHyL4
- Pumpkin Party String Lights: https://unsplash.com/photos/fo1mhroLydg
- Porch Skeleton Duo: https://unsplash.com/photos/A59lWOrZVnw
- Harvest Pumpkin Trio: https://unsplash.com/photos/Hprvl-Fd8F0
- Haunted House Porch Kit: https://unsplash.com/photos/-FR8KNy5r1o
- Little Lantern Pumpkin: https://unsplash.com/photos/ASNSoeead70
- Boo Crew Porch Decorations: https://unsplash.com/photos/r4e_XAyecUM
- Autumn Table Decor Set: https://unsplash.com/photos/wo3Rw66TfNg
