# Hollow & Harvest

A local Next.js Halloween storefront. Keep the Vercel Shop UI and local demo behavior.

## Architecture

- `app/` owns routes, metadata, and server composition.
- `components/` owns the template presentation. `components/ui/` accepts primitive props only.
- `lib/product/catalog.json` owns the sample catalog and prices. Product photos live in `public/images/`.
- `lib/collections/server.ts` filters the complete local catalog. Hydrogen supplies filter state, URL parsing, and money formatting; it makes no commerce API calls.
- `lib/cart/client.tsx` owns browser-local cart state. Checkout is a preview. No payments, orders, customer accounts, agents, or analytics.
- No credentials or environment variables are required.

## Implementation

- Read the relevant guide in `node_modules/next/dist/docs/` before changing Next.js APIs.
- Keep Server Components as the default and state in client leaves.
- Keep request params inside Suspense boundaries. Preserve root `ensureStatic = "prefetch"`.
- Use the existing `Link` component for internal navigation and `next/image` with reserved geometry and `sizes="100vw"`.
- Use Tailwind utilities and existing design tokens. Keep global CSS to tokens, resets, and shared utilities.
- Keep copy inline. Named component exports, default route exports, kebab-case filenames, and domain types in `types.ts`.
- Alphabetize interface properties and config keys. Run `pnpm format` for imports and formatting.
- Add comments only for hidden constraints. No banners or descriptions of obvious code.
- Do not add tests, runners, dependencies, or scripts for tests unless explicitly requested.

## Verification

Run `pnpm lint`, `pnpm typecheck`, and `pnpm build`. Check affected routes and cart interactions in the browser. `pnpm dev` serves the app at http://localhost:3000.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
