# BTKI Smart Search UX Audit

## Current condition

- The public route uses a generic catalogue detail page with the original BTKI tool embedded in an iframe.
- The legacy tool contains 14,518 BTKI 2022 reference rows and 99 chapter filters.
- Search, code comparison, classification notes, and reference fields are useful, but the first screen immediately exposes a very large result set.
- The experience ends at classification lookup. It does not answer the next export questions: which product has momentum, which market should be prioritised, what price range is plausible, or what action should the exporter take.

## Main problems

- Two nested navigation systems create an inconsistent experience and consume valuable screen space.
- The 99 chapter controls dominate the page before the user has expressed an intent.
- Showing hundreds of records before a query increases cognitive load and makes the tool feel like a database viewer.
- There is no decision hierarchy, market context, comparison workflow, buyer signal, or explicit next action.
- The existing mobile layout inherits the density of the desktop reference table instead of progressively disclosing information.

## Recommended direction

- Make export discovery the first task and keep full BTKI lookup as a dedicated expert utility.
- Use a compact SaaS workspace: semantic search, KPI strip, ranked products, rising markets, and current trade insights.
- Build one reusable Product Intelligence view for product overview, trade performance, market ranking, buyer signals, price benchmark, and an AI-style recommendation.
- Clearly label prototype intelligence and demo buyer names. Preserve the requirement to validate classifications and rates against official sources.
- Keep the frontend data model API-ready so mock arrays can later be replaced by verified trade, tariff, and buyer data services.

## New information architecture

1. **Discovery**: semantic search, trending products, rising markets, trade insights, and product-market opportunity heatmap.
2. **Product Intelligence**: product and HS overview, opportunity score, trade trend, price benchmark, market ranking, buyer demo signals, and recommended action.
3. **Compare**: side-by-side product selection and normalised opportunity dimensions.
4. **Country Intelligence**: Hong Kong market snapshot, product ranking, access checklist, and link to the full market report.
5. **BTKI Lookup**: direct access to all 14,518 reference rows for detailed classification work.

