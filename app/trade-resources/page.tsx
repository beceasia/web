import type { Metadata } from "next";
import { TradeResourcesDirectory } from "@/components/trade-resources-directory";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Direktori 20 Sumber Riset Ekspor-Impor",
  description: "Cari 20 sumber resmi dan referensi internasional untuk HS, kepabeanan, perdagangan, tarif, calon pasar ekspor, dan pembelajaran.",
  alternates: {
    canonical: "/trade-resources",
    languages: { id: "/trade-resources", en: "/en/trade-resources", zh: "/zh/trade-resources", "x-default": "/trade-resources" },
  },
  openGraph: { title: "Direktori 20 Sumber Riset Ekspor-Impor", description: "Cari 20 sumber resmi dan referensi internasional untuk HS, kepabeanan, perdagangan, tarif, calon pasar ekspor, dan pembelajaran.", url: `https://www.bece.asia/trade-resources`, type: "website" },
};

export default function TradeResourcesPage() {
  return (
    <PageShell locale="id" currentPath="/trade-resources">
      <TradeResourcesDirectory locale="id" />
    </PageShell>
  );
}
