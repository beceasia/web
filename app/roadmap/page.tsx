import { BasicPage } from "@/components/basic-page";
import { PageShell } from "@/components/page-shell";

export default function RoadmapPage() {
  return (
    <PageShell locale="id" currentPath="/roadmap">
      <BasicPage
        title="Roadmap"
        description="Portal ini akan berkembang dari katalog terkurasi menjadi workbench utilitas praktis."
        items={["Fase 1: katalog dan halaman multibahasa", "Fase 2: utilities interaktif", "Fase 3: dokumentasi aplikasi", "Fase 4: formulir masukan", "Fase 5: analytics dan status page", "Fase 6: template reusable"]}
      />
    </PageShell>
  );
}
