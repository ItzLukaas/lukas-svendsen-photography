# Lukas Svendsen — lukassvendsen.dk

Premium photography website for Lukas Svendsen.

## Stack

- Next.js App Router + TypeScript
- Tailwind CSS + shadcn/ui
- Motion
- Cloudinary (optional via env)
- Sanity CMS (Studio at `/studio`)
- Resend booking API
- Vercel-ready

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

- Site: http://localhost:3000
- Studio: http://localhost:3000/studio (needs Sanity project ID)

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Editorial homepage |
| `/arbejde` | Work index + category filters |
| `/arbejde/[slug]` | Project detail |
| `/om` | About |
| `/booking` | Booking form |
| `/studio` | Sanity Studio |

## Content

Seed projects and placeholder photos live in:

- `src/lib/data/projects.ts`
- `public/images/`

When Sanity + Cloudinary are connected, the site prefers CMS content and falls back to seed data.

## Environment

See `.env.example` for:

- `NEXT_PUBLIC_SITE_URL`
- Cloudinary cloud name
- Sanity project/dataset
- Resend + booking mail addresses

Without `RESEND_API_KEY`, booking submissions are validated and logged.

## Deploy

1. Push to GitHub
2. Import in Vercel
3. Set env vars
4. Point `lukassvendsen.dk` to the project
