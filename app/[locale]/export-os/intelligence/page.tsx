import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExportIntelligenceClient } from "@/components/export-intelligence-client";
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
    title: isZh ? "出口情报工作台" : "Export Intelligence Workspace",
    description: isZh
      ? "用于比较市场、发现印尼供应商、查看买家信号并完成出口学习任务的工作台。"
      : "An export intelligence workspace for comparing markets, discovering Indonesian suppliers, reviewing buyer signals, and completing export learning missions.",
    alternates: {
      canonical: `/${locale}/export-os/intelligence`,
      languages: {
        id: "/export-os/intelligence",
        en: "/en/export-os/intelligence",
        zh: "/zh/export-os/intelligence",
      },
    },
    openGraph: {
      title: isZh ? "BECE 出口情报工作台" : "BECE Export Intelligence Workspace",
      description: isZh ? "市场、出口商、买家和学习情报。" : "Market, exporter, buyer, and learning intelligence.",
      url: `https://www.bece.asia/${locale}/export-os/intelligence`,
      siteName: "bece.asia",
      type: "website",
    },
  };
}

export default async function LocalizedExportIntelligencePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = resolveLocale((await params).locale);
  return (
    <PageShell locale={locale} currentPath={`/${locale}/export-os/intelligence`}>
      <ExportIntelligenceClient locale={locale} />
    </PageShell>
  );
}
