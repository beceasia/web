import type { Metadata } from "next";
import { SingaporeMarketIntelligencePage } from "@/components/singapore-market-intelligence-page";
import { PageShell } from "@/components/page-shell";
import { singaporeMarket } from "@/data/singapore-market";

export const metadata: Metadata = {
  title: singaporeMarket.title.id,
  description: singaporeMarket.description.id,
  alternates: {
    canonical: "/market-intelligence/singapore",
    languages: {
      id: "/market-intelligence/singapore",
      en: "/en/market-intelligence/singapore",
      zh: "/zh/market-intelligence/singapore",
    },
  },
};

export default function SingaporeReportPage() {
  return <PageShell locale="id" currentPath="/market-intelligence/singapore"><SingaporeMarketIntelligencePage locale="id" /></PageShell>;
}
