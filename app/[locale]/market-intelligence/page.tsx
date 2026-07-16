import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarketIntelligenceHub } from "@/components/market-intelligence-hub";
import { PageShell } from "@/components/page-shell";
import type { Locale } from "@/data/apps";

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
  const isZh = locale === "zh";
  return {
    title: isZh ? "Export Market Intelligence | bece.asia" : "Export Market Intelligence | bece.asia",
    description: isZh
      ? "\u6309\u56fd\u5bb6\u6574\u7406\u7684\u51fa\u53e3\u5e02\u573a\u60c5\u62a5\u5e93\uff0c\u6db5\u76d6\u5e02\u573a\u673a\u4f1a\u3001\u4ea7\u54c1\u3001\u6cd5\u89c4\u3001\u4e70\u5bb6\u6e20\u9053\u548c\u8fdb\u5165\u7b56\u7565\u3002"
      : "A country-by-country export intelligence hub covering market opportunities, products, regulations, buyer channels, and entry strategy.",
    alternates: {
      canonical: `/${locale}/market-intelligence`,
      languages: {
        id: "/market-intelligence",
        en: "/en/market-intelligence",
        zh: "/zh/market-intelligence",
      },
    },
    openGraph: {
      title: "Export Market Intelligence | bece.asia",
      description: isZh
        ? "\u9762\u5411\u5370\u5c3c\u51fa\u53e3\u5546\u7684\u56fd\u5bb6\u5e02\u573a\u60c5\u62a5\u3002"
        : "Country market intelligence for Indonesian exporters.",
      url: `https://www.bece.asia/${locale}/market-intelligence`,
      siteName: "bece.asia",
      type: "website",
    },
  };
}

export default async function LocalizedMarketIntelligencePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = resolveLocale((await params).locale);
  return (
    <PageShell locale={locale} currentPath={`/${locale}/market-intelligence`}>
      <MarketIntelligenceHub locale={locale} />
    </PageShell>
  );
}
