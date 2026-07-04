import { BasicPage } from "@/components/basic-page";
import { PageShell } from "@/components/page-shell";

export default function IndonesianDocsPage() {
  return (
    <PageShell locale="id" currentPath="/id/docs">
      <BasicPage
        title="Dokumentasi"
        description="Panduan singkat untuk setiap aplikasi dan utility akan disusun di halaman ini."
        items={["Gambaran aplikasi", "Catatan setup", "Struktur data", "Panduan pengguna", "Batasan fitur", "Catatan rilis"]}
      />
    </PageShell>
  );
}
