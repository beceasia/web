import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FreightAnalyzerClient } from "@/components/freight-analyzer-client";
import { PageShell } from "@/components/page-shell";
import type { Locale } from "@/data/apps";

const supportedLocales: Locale[] = ["en", "zh"];

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return locale === "zh"
    ? { title: "货运价格查找器", description: "查找货运计算器，并按路线、重量和体积估算快递、空运、拼箱或整箱费用。" }
    : { title: "Freight Rate Finder", description: "Find freight calculators and estimate express, air cargo, LCL, or FCL costs by route, weight, and volume." };
}

export default async function LocalizedFreightAnalyzerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!supportedLocales.includes(rawLocale as Locale)) notFound();
  const locale = rawLocale as Locale;
  return (
    <PageShell locale={locale} currentPath={`/${locale}/apps/freight-analyzer`}>
      <FreightAnalyzerClient locale={locale} />
    </PageShell>
  );
}
