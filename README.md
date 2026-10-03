# bece.asia

Public digital tools for trade, documents, learning, research, and everyday workflows.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- lucide-react

## Language

- Bahasa Indonesia at `/` (legacy alias `/id`)
- English at `/en`
- Mandarin at `/zh`

The app catalog opens tools directly and searches products, HS references, markets, and related guides. Export OS at `/export-os` provides a four-step product, readiness, cost, and action-plan workflow. Saved plans and notes stay in the user's browser; they are not account-synced. Market intelligence examples are labelled as demo data.

Run workflow regression checks with `node scripts/test-export-plan.mjs` and `node scripts/test-search.mjs`.

## Local development

```bash
npm install
npm run dev
npm run build
```

## Data editing

Edit app catalog data in `data/apps.ts`. App entries must contain only public-safe descriptions, neutral sample data, and links owned by `bece.asia`.

Edit bilingual UI copy in `data/i18n.ts`.

## Privacy audit

```bash
npm run privacy:audit
npm run privacy:audit:strict
```

The strict audit fails when high-risk identity, contact, source-provenance, or secret patterns are detected.

## Disclaimer

bece.asia is an independent utility portal for productivity, learning, research, and workflow experiments. It is not an official institutional website and does not replace official systems, procedures, or regulations.
