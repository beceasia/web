import type { Metadata } from "next";
import { ExportOsPlatformClient } from "@/components/export-os-platform-client";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Rencana Ekspor: Kesiapan dan Simulasi Biaya",
  description:
    "Isi produk, nilai kesiapan usaha, simulasikan biaya, dan unduh tiga tindakan prioritas ekspor beserta asumsi Anda.",
  alternates: {
    canonical: "/export-os",
    languages: {
      id: "/export-os",
      en: "/en/export-os",
      zh: "/zh/export-os",
    },
  },
  openGraph: {
    title: "BECE Export Operating System",
    description: "The export workspace for Indonesian businesses.",
    url: "https://www.bece.asia/export-os",
    siteName: "bece.asia",
    type: "website",
  },
};

export default function ExportOsPage() {
  return (
    <PageShell locale="id" currentPath="/export-os">
      <ExportOsPlatformClient locale="id" />
    </PageShell>
  );
}
