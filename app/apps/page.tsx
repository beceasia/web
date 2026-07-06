import { AppsPageContent } from "@/components/apps-page-content";
import { PageShell } from "@/components/page-shell";

export default function AppsPage() {
  return (
    <PageShell locale="id" currentPath="/apps">
      <AppsPageContent locale="id" />
    </PageShell>
  );
}
