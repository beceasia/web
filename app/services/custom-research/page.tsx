import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { CustomResearchService } from "@/components/custom-research-service";

export const metadata: Metadata = {
  title: "Custom Market & Supply Research | bece.asia",
  description: "Layanan riset khusus pemasok, produksi, harga komoditas, pasar ekspor, dan simulasi biaya dengan sumber serta asumsi yang dapat ditelusuri.",
  alternates: {
    canonical: "/services/custom-research",
    languages: { id: "/services/custom-research", en: "/en/services/custom-research", zh: "/zh/services/custom-research" },
  },
};

export default function CustomResearchPage() {
  return <PageShell locale="id" currentPath="/services/custom-research"><CustomResearchService locale="id" /></PageShell>;
}
