import type { Metadata } from "next";
import { ExportIntelligenceClient } from "@/components/export-intelligence-client";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Export Intelligence Workspace",
  description: "Workspace intelijen ekspor untuk membandingkan pasar, menemukan supplier Indonesia, membaca buyer signal, dan menjalankan learning path.",
  alternates: {
    canonical: "/export-os/intelligence",
    languages: {
      id: "/export-os/intelligence",
      en: "/en/export-os/intelligence",
      zh: "/zh/export-os/intelligence",
    },
  },
  openGraph: {
    title: "BECE Export Intelligence Workspace",
    description: "Product-country intelligence, exporter directory, buyer signals, and export learning missions.",
    url: "https://www.bece.asia/export-os/intelligence",
    siteName: "bece.asia",
    type: "website",
  },
};

export default function ExportIntelligencePage() {
  return (
    <PageShell locale="id" currentPath="/export-os/intelligence">
      <ExportIntelligenceClient locale="id" />
    </PageShell>
  );
}
