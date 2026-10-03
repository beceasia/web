# BECE Asia usability improvements — 4 October 2026

Implemented the five priorities from the supplied usability review: compact WhatsApp contact, a task-oriented homepage, unified discovery, visible demo status, and a complete export planning workflow.

- Homepage: short benefit statement, search, three task entry points, four tools, example results, onboarding steps, and an explicitly illustrative coffee scenario.
- Catalog: applications shown immediately, category filters, card/list view, bilingual product synonyms, product and HS indexing, country guides, helpful empty states, and direct action labels. Product searches carry through to intelligence tools.
- Navigation: five task-oriented links, a keyboard-accessible mobile menu, language controls, visible keyboard focus, and reduced-motion support.
- Contact: a 48px closed button, user-opened panel, close control and Escape, localized labels, and a contextual WhatsApp message.
- Export planning: four steps, unknown readiness answers, disclosed scoring weights, validated nonnegative inputs, currency and assumption date, preserved inputs when going back, three actions, download/copy, and optional inclusion of results in a consultation message.
- Persistence: explicit browser-only plan save/resume, versioned schema validation, and local note export with accurate success/failure feedback.
- Data: demo and unreviewed status near quantitative intelligence results; snapshot dates distinguished from unavailable source review dates. No new claims of verified market figures.
- Hong Kong guide: section navigation, mobile product summaries, print/save-PDF, and a link to export planning.
- Search metadata: localized home and catalog titles, descriptions, canonicals, and language alternates.

## Validation

- Production build and TypeScript: passed (153 generated routes).
- ESLint on changed files: passed.
- Export calculation regression: passed, including readiness weights, invalid numbers, zero quantity, negative margin, overflow, and stored-plan schema.
- Search regression: passed, including kakao/cacao/cocoa, combined coffee/Japan queries, Mandarin, country guides, empty results, and unique app slugs.
- Existing palm oil calculator regression: passed.
- Browser: homepage search to cocoa intelligence, four-step export result, browser save/resume, and downloaded plan content tested.
- Responsive views: homepage at 360px, catalog at 390px, and export form at 430px inspected without horizontal page overflow. Mobile menu and contact open/close checked.

Whole-repository lint and the existing strict privacy audit still flag pre-existing files outside this change. The privacy rules also flag public source links and regulatory references. None of the changed application files introduced an audit finding. This is not a completed full-site privacy review or a measured Core Web Vitals result.

## Remaining roadmap

Account-synced projects, verified live trade data, automated country recommendations, a bilingual PDF product catalog, and production buyer CRM require additional data and persistence integrations. Saved plans in this release are local browser records, and market figures remain labelled demonstrations.
