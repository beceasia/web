# Palm oil calculator: September and October 2026

Verified against official Ministry of Trade decisions on 1 October 2026.

| Period | Decision | CPO reference price (USD/MT) | CPO export duty (USD/MT) | CPO levy | Levy (USD/MT, unrounded) |
| --- | --- | ---: | ---: | ---: | ---: |
| 1-30 September 2026 | Kepmendag 1777/2026 | 1,007.51 | 148 | 12.5% of reference price | 125.93875 |
| 1-31 October 2026 | Kepmendag 1921/2026 | 1,042.15 | 178 | 12.5% of reference price | 130.26875 |

Official sources:

- [Kepmendag 1777/2026](https://jdih.kemendag.go.id/peraturan/download/29a4fe28-c6dd-4f0c-8ae7-1f969f5c4265/file_peraturan): third page, decision KESATU; fourth page, effective period.
- [Kepmendag 1921/2026](https://jdih.kemendag.go.id/peraturan/download/c817c251-0b70-45c4-abc5-08739afb4f3a/file_peraturan): third page, decision KESATU; fourth page, effective period. The scanned signature page has a year typo (2029); the document number, JDIH metadata and explicit effective period identify October 2026.
- [PMK 68/2025](https://jdih.kemenkeu.go.id/api/download/dfc692b6-6a37-4d83-aae1-49555a59c372/2025pmkeuangan068.pdf): Lampiran C, CPO row, columns 8 and 9 (pages 9-10). September is above USD980 through USD1,030; October is above USD1,030 through USD1,080.
- [PMK 9/2026](https://jdih.kemenkeu.go.id/api/download/4c581679-4fec-4854-8b55-3f62f725449d/2026pmkeuangan009.pdf): Lampiran A, group II, 12.5% levy (page 6).

The monthly values are CPO reference prices used to select the export duty bracket and calculate percentage levies. They are not separate product-specific export benchmark prices. The calculator retains full precision during calculation and rounds the displayed USD amounts to two decimal places.

October is the initial selection. The reference-price notice updates when the user selects a different month. All existing product/HS combinations have monthly reference rows for both new periods; existing tariff tables and historical rows are preserved. Products whose export duty is still marked unavailable in the existing dataset remain blocked from calculation and transaction saving.

Validation:

- `node scripts/test-palm-oil-calculator.mjs`: monthly product/HS coverage, CPO calculations for 1 and 100 MT, columns 8/9, fixed and percentage levies, IDR conversion, August regression, and invalid-input safeguards.
- `npm run build`: passed, including TypeScript and all 153 pages.
- Browser: verified September and October CPO results for 100 MT at a sample exchange rate of IDR17,000/USD. Totals: USD27,393.88 and USD30,826.88 respectively. Exchange rates must be selected according to the actual PEB date.
- Repository-wide lint has pre-existing failures in unrelated React components; the new calculation test passes targeted lint.
