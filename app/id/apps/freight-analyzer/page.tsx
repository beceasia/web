import type { Metadata } from "next";
import { FreightAnalyzerClient } from "@/components/freight-analyzer-client";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Freight Rate Finder",
  description: "Cari kalkulator freight dan perkirakan biaya express, air cargo, LCL, atau FCL berdasarkan rute, berat, dan volume.",
};

export default function IndonesianFreightAnalyzerPage() {
  return (
    <PageShell locale="id" currentPath="/id/apps/freight-analyzer">
      <FreightAnalyzerClient locale="id" />
    </PageShell>
  );
}
