import type { Metadata } from "next";
import { ChinaMarketIntelligencePage } from "@/components/china-market-intelligence-page";
import { PageShell } from "@/components/page-shell";
import { chinaMarket } from "@/data/china-market";

export const metadata: Metadata = {
  title: chinaMarket.title.id,
  description: chinaMarket.description.id,
  alternates: {
    canonical: "/market-intelligence/china",
    languages: {
      id: "/market-intelligence/china",
      en: "/en/market-intelligence/china",
      zh: "/zh/market-intelligence/china",
    },
  },
};

export default function ChinaReportPage() {
  return <PageShell locale="id" currentPath="/market-intelligence/china"><ChinaMarketIntelligencePage locale="id" /></PageShell>;
}
