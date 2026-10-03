import { notFound } from "next/navigation";
import { HomeContent } from "@/components/home-content";
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
        ? "BECE Asia — 出口机会与业务工具"
        : "BECE Asia — Export Opportunities and Business Tools",
    description:
      locale === "zh"
        ? "研究市场、查询 HS 参考、估算出口成本并准备文件。按业务需求选择工具。"
        : "Research markets, find HS references, estimate export costs, and prepare documents. Choose tools for your business needs.",
    alternates: {
      canonical: `/${locale}`,
      languages: { id: "/", en: "/en", zh: "/zh", "x-default": "/" },
    },
  };
}

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = resolveLocale((await params).locale);
  return (
    <PageShell locale={locale} currentPath={`/${locale}`}>
      <HomeContent locale={locale} />
    </PageShell>
  );
}
