import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SingaporeMarketIntelligencePage } from "@/components/singapore-market-intelligence-page";
import { PageShell } from "@/components/page-shell";
import type { Locale } from "@/data/apps";
import { singaporeMarket } from "@/data/singapore-market";
import { marketText } from "@/data/market-intelligence";
import { localePath } from "@/lib/routes";

const supportedLocales: Locale[] = ["en", "zh"];

function resolveLocale(locale: string): Locale {
  if (supportedLocales.includes(locale as Locale)) return locale as Locale;
  notFound();
}

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  return {
    title: marketText(singaporeMarket.title, locale),
    description: marketText(singaporeMarket.description, locale),
    alternates: {
      canonical: localePath(locale, "/market-intelligence/singapore"),
      languages: {
        id: "/market-intelligence/singapore",
        en: "/en/market-intelligence/singapore",
        zh: "/zh/market-intelligence/singapore",
      },
    },
  };
}

export default async function LocalizedSingaporeReportPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = resolveLocale((await params).locale);
  return <PageShell locale={locale} currentPath={localePath(locale, "/market-intelligence/singapore")}><SingaporeMarketIntelligencePage locale={locale} /></PageShell>;
}
