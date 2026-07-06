import { BasicPage } from "@/components/basic-page";
import { PageShell } from "@/components/page-shell";

export default function DocsPage() {
  return (
    <PageShell locale="id" currentPath="/docs">
      <BasicPage
        title="Dokumentasi"
        description="Panduan singkat untuk setiap aplikasi dan utility akan disusun di sini."
        items={["Ringkasan aplikasi", "Catatan setup", "Struktur data", "Panduan pengguna", "Batasan", "Catatan rilis"]}
      />
    </PageShell>
  );
}
