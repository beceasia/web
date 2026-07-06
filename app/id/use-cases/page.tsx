import { BasicPage } from "@/components/basic-page";
import { PageShell } from "@/components/page-shell";

export default function IndonesianUseCasesPage() {
  return (
    <PageShell locale="id" currentPath="/id/use-cases">
      <BasicPage
        title="Skenario Penggunaan"
        description="Skenario praktis penggunaan tools bece.asia untuk kebutuhan umum."
        items={["Tata naskah", "Monitoring program", "Dukungan ekspor", "Workspace kajian", "Media pembelajaran", "Utilities publik"]}
      />
    </PageShell>
  );
}
