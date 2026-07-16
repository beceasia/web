import type { Metadata } from "next";
import { MarketIntelligenceHub } from "@/components/market-intelligence-hub";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Export Market Intelligence | bece.asia",
  description: "Pusat laporan negara tujuan ekspor bece.asia untuk riset peluang pasar, produk unggulan, regulasi, buyer channel, dan strategi masuk pasar.",
  alternates: {
    canonical: "/market-intelligence",
    languages: {
      id: "/market-intelligence",
      en: "/en/market-intelligence",
      zh: "/zh/market-intelligence",
    },
  },
  openGraph: {
    title: "Export Market Intelligence | bece.asia",
    description: "Kumpulan market brief negara tujuan ekspor untuk pelaku UMKM dan eksportir Indonesia.",
    url: "https://www.bece.asia/market-intelligence",
    siteName: "bece.asia",
    type: "website",
  },
};

export default function MarketIntelligencePage() {
  return (
    <PageShell locale="id" currentPath="/market-intelligence">
      <MarketIntelligenceHub locale="id" />
    </PageShell>
  );
}
