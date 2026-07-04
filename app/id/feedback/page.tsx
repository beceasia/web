import { BasicPage } from "@/components/basic-page";
import { PageShell } from "@/components/page-shell";

export default function IndonesianFeedbackPage() {
  return (
    <PageShell locale="id" currentPath="/id/feedback">
      <BasicPage
        title="Masukan"
        description="Halaman ini disiapkan untuk menerima masukan pada rilis berikutnya."
        items={["Ide aplikasi", "Koreksi konten", "Saran fitur", "Saran alur kerja"]}
      />
    </PageShell>
  );
}
