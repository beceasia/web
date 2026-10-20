import type { Metadata } from "next";
import { BuyerDiscoveryPage } from "@/components/buyer-discovery-page";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Buyer Discovery — Riset Calon Buyer Ekspor",
  description: "Riset calon buyer ekspor sesuai produk UMKM Indonesia, dengan alasan kecocokan, bukti publik, dan langkah pendekatan. Layanan pilot berbasis permintaan.",
  alternates: {
    canonical: "/buyer-discovery",
    languages: {
      id: "/buyer-discovery",
      en: "/en/buyer-discovery",
      zh: "/zh/buyer-discovery",
    },
  },
  openGraph: {
    title: "BECE Buyer Discovery",
    description: "Temukan calon buyer ekspor melalui riset yang transparan dan dapat ditindaklanjuti.",
    url: "https://www.bece.asia/buyer-discovery",
    siteName: "bece.asia",
    type: "website",
  },
};

export default function BuyerDiscoveryLanding() {
  return (
    <PageShell locale="id" currentPath="/buyer-discovery">
      <BuyerDiscoveryPage locale="id" />
    </PageShell>
  );
}
