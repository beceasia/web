import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { CustomResearchService } from "@/components/custom-research-service";
import type { Locale } from "@/data/apps";

const supportedLocales: Locale[] = ["en", "zh"];
export function generateStaticParams() { return supportedLocales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!supportedLocales.includes(locale as Locale)) notFound();
  return {
    title: locale === "zh" ? "定制市场与供应研究 | bece.asia" : "Custom Market & Supply Research | bece.asia",
    description: locale === "zh"
      ? "针对商品、市场、供应商、产量和历史价格的定制研究，明确数据来源与假设。"
      : "Tailored market, supplier, production, and historical commodity price research with transparent sources and assumptions.",
    alternates: {
      canonical: `/${locale}/services/custom-research`,
      languages: { id: "/services/custom-research", en: "/en/services/custom-research", zh: "/zh/services/custom-research" },
    },
  };
}

export default async function LocalizedCustomResearchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!supportedLocales.includes(locale as Locale)) notFound();
  return <PageShell locale={locale as Locale} currentPath={`/${locale}/services/custom-research`}><CustomResearchService locale={locale as Locale} /></PageShell>;
}
