import { AppsPageContent } from "@/components/apps-page-content";
import { PageShell } from "@/components/page-shell";

export default function IndonesianAppsPage() {
  return (
    <PageShell locale="id" currentPath="/id/apps">
      <AppsPageContent locale="id" />
    </PageShell>
  );
}
