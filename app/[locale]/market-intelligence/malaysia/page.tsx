import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MalaysiaMarketIntelligencePage } from "@/components/malaysia-market-intelligence-page";
import { PageShell } from "@/components/page-shell";
import type { Locale } from "@/data/apps";
import { malaysiaMarket } from "@/data/malaysia-market";
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
    title: marketText(malaysiaMarket.title, locale),
    description: marketText(malaysiaMarket.description, locale),
    alternates: {
      canonical: localePath(locale, "/market-intelligence/malaysia"),
      languages: {
        id: "/market-intelligence/malaysia",
        en: "/en/market-intelligence/malaysia",
        zh: "/zh/market-intelligence/malaysia",
      },
    },
  };
}

export default async function LocalizedMalaysiaReportPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = resolveLocale((await params).locale);
  return <PageShell locale={locale} currentPath={localePath(locale, "/market-intelligence/malaysia")}><MalaysiaMarketIntelligencePage locale={locale} /></PageShell>;
}
