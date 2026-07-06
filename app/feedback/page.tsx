import { BasicPage } from "@/components/basic-page";
import { PageShell } from "@/components/page-shell";

export default function FeedbackPage() {
  return (
    <PageShell locale="id" currentPath="/feedback">
      <BasicPage
        title="Masukan"
        description="Kanal masukan akan disambungkan setelah rilis publik pertama."
        items={["Ide aplikasi", "Laporan bug", "Permintaan fitur", "Koreksi konten", "Saran workflow", "Permintaan integrasi"]}
      />
    </PageShell>
  );
}
