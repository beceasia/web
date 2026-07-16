import type { Metadata } from "next";
import { ExportOsPlatformClient } from "@/components/export-os-platform-client";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "BECE Export Operating System",
  description: "A modern SaaS workspace for Indonesian businesses to discover export opportunities, assess readiness, understand regulations, connect with buyers, and manage export activity.",
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
