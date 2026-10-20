import { notFound } from "next/navigation";
import { BuyerDemo01Report } from "@/components/buyer-demo01-report";
import { PageShell } from "@/components/page-shell";
import type { Locale } from "@/data/apps";
const languages: Locale[] = ["en", "zh"];
export function generateStaticParams() { return languages.map(locale => ({ locale })); }
export default async function Report({ params }: { params: Promise<{locale:string}> }) {
  const { locale } = await params;
  if (!languages.includes(locale as Locale)) notFound();
  return <PageShell locale={locale as Locale} currentPath={"/"+locale+"/buyer-discovery/demo-01"}><BuyerDemo01Report locale={locale as Locale}/></PageShell>;
}
