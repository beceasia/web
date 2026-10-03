import { notFound } from "next/navigation";
import { AppsPageContent } from "@/components/apps-page-content";
import { PageShell } from "@/components/page-shell";
import type { Locale } from "@/data/apps";
import type { Metadata } from "next";

const supportedLocales: Locale[] = ["en", "zh"];

function resolveLocale(locale: string): Locale {
  if (supportedLocales.includes(locale as Locale)) return locale as Locale;
  notFound();
}

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  return {
    title:
      locale === "zh"
        ? "业务工具、产品与市场搜索"
        : "Business Tools, Product and Market Search",
    description:
      locale === "zh"
        ? "搜索 BECE Asia 应用、出口产品、市场与指南。按分类筛选并直接使用工具。"
        : "Search BECE Asia apps, export products, markets, and guides. Filter categories and open tools directly.",
    alternates: {
      canonical: `/${locale}/apps`,
      languages: { id: "/apps", en: "/en/apps", zh: "/zh/apps" },
    },
  };
}

export default async function LocalizedAppsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);
  return (
    <PageShell locale={locale} currentPath={`/${locale}/apps`}>
      <AppsPageContent locale={locale} />
    </PageShell>
  );
}
