import { BusinessToolsClient } from "@/components/business-tools-client";
import { PageShell } from "@/components/page-shell";

export default function PriceQuoteBuilderPage() {
  return <PageShell locale="id" currentPath="/apps/price-quote-builder"><BusinessToolsClient kind="quote" /></PageShell>;
}
