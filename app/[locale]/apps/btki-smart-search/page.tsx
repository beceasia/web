import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BtkiIntelligenceDashboard } from "@/components/btki-intelligence-dashboard";
import { PageShell } from "@/components/page-shell";
import type { Locale } from "@/data/apps";

const supportedLocales: Locale[] = ["en", "zh"];

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (locale === "zh") {
    return { title: "AI出口产品情报 | bece.asia", description: "发现出口机会、评估目标市场、比较产品并查询BTKI参考。" };
  }
  return { title: "AI Export Product Intelligence | bece.asia", description: "Discover export opportunities, assess target markets, compare products, and open BTKI references in one intelligence workspace." };
}

export default async function LocalizedBtkiIntelligencePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!supportedLocales.includes(rawLocale as Locale)) notFound();
  const locale = rawLocale as Locale;
  return (
    <PageShell locale={locale} currentPath={`/${locale}/apps/btki-smart-search`}>
      <BtkiIntelligenceDashboard locale={locale} />
    </PageShell>
  );
}

