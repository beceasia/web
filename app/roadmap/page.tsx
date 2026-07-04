import { BasicPage } from "@/components/basic-page";
import { PageShell } from "@/components/page-shell";

export default function RoadmapPage() {
  return (
    <PageShell locale="en" currentPath="/roadmap">
      <BasicPage
        title="Roadmap"
        description="The portal will grow from a curated catalog into a practical utility workbench."
        items={["Phase 1: catalog and bilingual pages", "Phase 2: interactive utilities", "Phase 3: app documentation", "Phase 4: feedback form", "Phase 5: analytics and status page", "Phase 6: reusable templates"]}
      />
    </PageShell>
  );
}
