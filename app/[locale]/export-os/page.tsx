import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExportOsPlatformClient } from "@/components/export-os-platform-client";
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
    title: isZh ? "BECE Export Operating System" : "BECE Export Operating System",
    description: isZh
      ? "\u9762\u5411\u5370\u5c3c\u4f01\u4e1a\u7684\u73b0\u4ee3 SaaS \u51fa\u53e3\u5de5\u4f5c\u53f0\uff0c\u7528\u4e8e\u5e02\u573a\u53d1\u73b0\u3001\u51c6\u5907\u5ea6\u8bc4\u4f30\u3001\u6cd5\u89c4\u7406\u89e3\u3001\u4e70\u5bb6\u8fde\u63a5\u548c\u51fa\u53e3\u7ba1\u7406\u3002"
      : "A modern SaaS workspace for Indonesian businesses to discover export opportunities, assess readiness, understand regulations, connect with buyers, and manage export activity.",
    alternates: {
      canonical: `/${locale}/export-os`,
      languages: {
        id: "/export-os",
        en: "/en/export-os",
        zh: "/zh/export-os",
      },
    },
    openGraph: {
      title: "BECE Export Operating System",
      description: isZh ? "\u9762\u5411\u5370\u5c3c\u4f01\u4e1a\u7684\u51fa\u53e3\u5de5\u4f5c\u53f0\u3002" : "The export workspace for Indonesian businesses.",
      url: `https://www.bece.asia/${locale}/export-os`,
      siteName: "bece.asia",
      type: "website",
    },
  };
}

export default async function LocalizedExportOsPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = resolveLocale((await params).locale);
  return (
    <PageShell locale={locale} currentPath={`/${locale}/export-os`}>
      <ExportOsPlatformClient locale={locale} />
    </PageShell>
  );
}
