import type { Metadata } from "next";
import { TradeResourcesDirectory } from "@/components/trade-resources-directory";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "20 Trade Data & Export-Import Resources",
  description: "Find official Indonesian and international sources for HS, customs, trade statistics, tariffs, and market research.",
  alternates: {
    canonical: "/en/trade-resources",
    languages: { id: "/trade-resources", en: "/en/trade-resources", zh: "/zh/trade-resources", "x-default": "/trade-resources" },
  },
  openGraph: { title: "20 Trade Data & Export-Import Resources", description: "Find official Indonesian and international sources for HS, customs, trade statistics, tariffs, and market research.", url: `https://www.bece.asia/en/trade-resources`, type: "website" },
};

export default function TradeResourcesPage() {
  return (
    <PageShell locale="en" currentPath="/en/trade-resources">
      <TradeResourcesDirectory locale="en" />
    </PageShell>
  );
}
