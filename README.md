# Lukas Svendsen — lukassvendsen.dk

Premium photography website for Lukas Svendsen (Grindsted).

## Stack

- Next.js 16 (App Router) + TypeScript + React 19
- Tailwind CSS 4 + shadcn/ui primitives
- Motion
- Resend (contact + booking)
- Optional: Sanity Studio (`/studio`), Cloudinary
- Deploy target: Vercel

## Requirements

- Node.js 20+

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

- Site: http://localhost:3000
- Studio: http://localhost:3000/studio (requires Sanity env vars)

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript (`tsc --noEmit`) |
| `npm run seo:check` | Crawl sanity checks (needs a running server) |
| `npm run images:process` | Process inbox photos into `public/images` |
| `npm run hero:process` | Process hero video assets |

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage |
| `/arbejde` | Portfolio index |
| `/arbejde/[slug]` | Project |
| `/om` | About |
| `/kontakt` | Contact form |
| `/booking` | Multi-step booking |
| `/privatliv` | Privacy (noindex) |
| `/studio` | Sanity Studio |

## Content

Primary seed content:

- `src/lib/data/projects.ts`
- `src/lib/data/clients.ts`
- `public/images/`
- `public/logos/`

With Sanity configured, the site prefers CMS content and falls back to seed data.

## Environment

See `.env.example`.

**Required for production forms**

- `RESEND_API_KEY`
- `BOOKING_TO_EMAIL`
- `BOOKING_FROM_EMAIL`
- `NEXT_PUBLIC_SITE_URL`

Without `RESEND_API_KEY`, forms return **503 in production** and accept submissions in development only.

## Deploy (GitHub → Vercel)

1. Push to GitHub (ensure `.env*` stays untracked)
2. Import the repo in Vercel
3. Set environment variables from `.env.example`
4. Framework preset: Next.js (default build/start)
5. Point `lukassvendsen.dk` / `www` to the project
