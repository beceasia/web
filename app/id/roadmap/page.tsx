import { BasicPage } from "@/components/basic-page";
import { PageShell } from "@/components/page-shell";

export default function IndonesianRoadmapPage() {
  return (
    <PageShell locale="id" currentPath="/id/roadmap">
      <BasicPage
        title="Roadmap"
        description="Portal ini akan berkembang dari katalog kurasi menjadi workbench utilitas praktis."
        items={["Fase 1: katalog dan halaman bilingual", "Fase 2: utilities interaktif", "Fase 3: dokumentasi aplikasi", "Fase 4: form masukan", "Fase 5: analytics dan status page", "Fase 6: template siap pakai"]}
      />
    </PageShell>
  );
}
