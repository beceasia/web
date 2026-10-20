import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BuyerDiscoveryPage } from "@/components/buyer-discovery-page";
import { PageShell } from "@/components/page-shell";
import type { Locale } from "@/data/apps";

const supportedLocales: Locale[] = ["en", "zh"];

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!supportedLocales.includes(locale as Locale)) notFound();
  const english = locale === "en";
  return {
    title: english ? "Buyer Discovery — Export Buyer Research" : "Buyer Discovery — 出口潜在买家研究",
    description: english
      ? "Product-specific research on potential export buyers with public evidence, relevance reasons, and actionable outreach preparation."
      : "针对印尼出口产品的潜在海外买家研究，附有公开来源、匹配理由和联系建议。",
    alternates: {
      canonical: "/" + locale + "/buyer-discovery",
      languages: {
        id: "/buyer-discovery",
        en: "/en/buyer-discovery",
        zh: "/zh/buyer-discovery",
      },
    },
  };
}

export default async function LocalizedBuyerDiscovery({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!supportedLocales.includes(locale as Locale)) notFound();
  return (
    <PageShell locale={locale as Locale} currentPath={"/" + locale + "/buyer-discovery"}>
      <BuyerDiscoveryPage locale={locale as Locale} />
    </PageShell>
  );
}
