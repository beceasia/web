import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExportMarketIntelligencePage } from "@/components/export-market-intelligence-page";
import { PageShell } from "@/components/page-shell";
import type { Locale } from "@/data/apps";
import { hongKongMarket, marketText } from "@/data/market-intelligence";

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
    title: marketText(hongKongMarket.title, locale),
    description: marketText(hongKongMarket.metaDescription, locale),
    keywords: locale === "zh"
      ? ["印尼出口香港", "香港买家", "香港市场机会", "印尼产品出口"]
      : ["export to Hong Kong", "Indonesia export opportunities Hong Kong", "how to export to Hong Kong", "Indonesian products Hong Kong", "Hong Kong buyers"],
    alternates: {
      canonical: `/${locale}/market-intelligence/hong-kong`,
      languages: {
        id: "/market-intelligence/hong-kong",
        en: "/en/market-intelligence/hong-kong",
        zh: "/zh/market-intelligence/hong-kong",
      },
    },
  };
}

export default async function LocalizedHongKongMarketIntelligencePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = resolveLocale((await params).locale);
  return (
    <PageShell locale={locale} currentPath={`/${locale}/market-intelligence/hong-kong`}>
      <ExportMarketIntelligencePage locale={locale} />
    </PageShell>
  );
}
