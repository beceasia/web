import type { Metadata } from "next";
import { BtkiIntelligenceDashboard } from "@/components/btki-intelligence-dashboard";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "AI Export Product Intelligence | bece.asia",
  description: "Temukan peluang ekspor, nilai pasar tujuan, bandingkan produk, dan buka referensi BTKI dalam satu workspace intelijen.",
};

export default function BtkiIntelligencePage() {
  return (
    <PageShell locale="id" currentPath="/apps/btki-smart-search">
      <BtkiIntelligenceDashboard locale="id" />
    </PageShell>
  );
}

