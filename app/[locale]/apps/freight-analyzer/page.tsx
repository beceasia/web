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
    ? { title: "货运报价分析器", description: "解析货运报价、选择正确的重量阶梯、比较货代范围并估算出口价格。" }
    : { title: "Freight Analyzer", description: "Parse freight quotations, select the correct weight break, compare forwarder scope, and estimate export pricing." };
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
