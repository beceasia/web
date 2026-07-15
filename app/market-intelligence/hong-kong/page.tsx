import type { Metadata } from "next";
import { ExportMarketIntelligencePage } from "@/components/export-market-intelligence-page";
import { PageShell } from "@/components/page-shell";
import { hongKongMarket, marketText } from "@/data/market-intelligence";

export const metadata: Metadata = {
  title: marketText(hongKongMarket.title, "id"),
  description: marketText(hongKongMarket.metaDescription, "id"),
  keywords: ["ekspor ke Hong Kong", "peluang ekspor Indonesia ke Hong Kong", "cara ekspor ke Hong Kong", "produk Indonesia yang laku di Hong Kong", "buyer Hong Kong"],
  alternates: {
    canonical: "/market-intelligence/hong-kong",
    languages: {
      id: "/market-intelligence/hong-kong",
      en: "/en/market-intelligence/hong-kong",
      zh: "/zh/market-intelligence/hong-kong",
    },
  },
};

export default function HongKongMarketIntelligencePage() {
  return (
    <PageShell locale="id" currentPath="/market-intelligence/hong-kong">
      <ExportMarketIntelligencePage locale="id" />
    </PageShell>
  );
}
