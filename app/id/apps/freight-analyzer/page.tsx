import type { Metadata } from "next";
import { FreightAnalyzerClient } from "@/components/freight-analyzer-client";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Freight Analyzer",
  description: "Analisis quotation freight, pilih weight break, bandingkan scope forwarder, dan susun estimasi harga ekspor.",
};

export default function IndonesianFreightAnalyzerPage() {
  return (
    <PageShell locale="id" currentPath="/id/apps/freight-analyzer">
      <FreightAnalyzerClient locale="id" />
    </PageShell>
  );
}
