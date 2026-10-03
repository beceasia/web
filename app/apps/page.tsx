import { AppsPageContent } from "@/components/apps-page-content";
import { PageShell } from "@/components/page-shell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alat Kerja dan Pencarian Produk, Pasar, Panduan",
  description:
    "Temukan aplikasi BECE Asia, produk ekspor, pasar, dan panduan terkait. Gunakan filter kategori dan buka alat secara langsung.",
  alternates: {
    canonical: "/apps",
    languages: { id: "/apps", en: "/en/apps", zh: "/zh/apps" },
  },
};

export default function AppsPage() {
  return (
    <PageShell locale="id" currentPath="/apps">
      <AppsPageContent locale="id" />
    </PageShell>
  );
}
