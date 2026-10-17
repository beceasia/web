import type { Metadata } from "next";
import { MalaysiaMarketIntelligencePage } from "@/components/malaysia-market-intelligence-page";
import { PageShell } from "@/components/page-shell";
import { malaysiaMarket } from "@/data/malaysia-market";

export const metadata: Metadata = {
  title: malaysiaMarket.title.id,
  description: malaysiaMarket.description.id,
  alternates: {
    canonical: "/market-intelligence/malaysia",
    languages: {
      id: "/market-intelligence/malaysia",
      en: "/en/market-intelligence/malaysia",
      zh: "/zh/market-intelligence/malaysia",
    },
  },
};

export default function MalaysiaReportPage() {
  return <PageShell locale="id" currentPath="/market-intelligence/malaysia"><MalaysiaMarketIntelligencePage locale="id" /></PageShell>;
}
