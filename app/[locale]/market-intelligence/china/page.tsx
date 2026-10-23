import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChinaMarketIntelligencePage } from "@/components/china-market-intelligence-page";
import { PageShell } from "@/components/page-shell";
import type { Locale } from "@/data/apps";
import { chinaMarket } from "@/data/china-market";
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
    title: marketText(chinaMarket.title, locale),
    description: marketText(chinaMarket.description, locale),
    alternates: {
      canonical: localePath(locale, "/market-intelligence/china"),
      languages: {
        id: "/market-intelligence/china",
        en: "/en/market-intelligence/china",
        zh: "/zh/market-intelligence/china",
      },
    },
  };
}

export default async function LocalizedChinaReportPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = resolveLocale((await params).locale);
  return <PageShell locale={locale} currentPath={localePath(locale, "/market-intelligence/china")}><ChinaMarketIntelligencePage locale={locale} /></PageShell>;
}
