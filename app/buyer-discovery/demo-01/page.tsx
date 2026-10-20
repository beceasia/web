import type { Metadata } from "next";
import { BuyerDemo01Report } from "@/components/buyer-demo01-report";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "DEMO 01 | Buyer Discovery Lada Hitam Malaysia",
  description: "Contoh laporan riset BECE Buyer Discovery untuk lada hitam Indonesia ke Malaysia. Lima prospek perusahaan dengan bukti publik dan batasan verifikasi.",
  alternates: {
    canonical: "/buyer-discovery/demo-01",
    languages: { id: "/buyer-discovery/demo-01", en: "/en/buyer-discovery/demo-01", zh: "/zh/buyer-discovery/demo-01" },
  },
};

export default function BuyerDiscoveryDemo01Page() {
  return <PageShell locale="id" currentPath="/buyer-discovery/demo-01"><BuyerDemo01Report locale="id" /></PageShell>;
}
