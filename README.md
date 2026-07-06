# bece.asia

Public digital tools for trade, documents, learning, and everyday workflows.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- lucide-react
- Vercel-ready deployment

## Language

- English default at `/`
- Bahasa Indonesia at `/id`

## Local development

```bash
npm install
npm run dev
npm run build
```

## Data editing

Edit app catalog data in `data/apps.ts`. App entries should be sanitized and contain only public-safe descriptions, sample data, and public links before they are listed.

Edit bilingual UI copy in `data/i18n.ts`.

## Deployment

Vercel should build from the latest commit on `main`.

## Disclaimer

bece.asia is an independent utility portal for productivity, learning, and workflow experiments. It is not an official government website and does not replace official systems, procedures, or regulations.
