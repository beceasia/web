import { PageShell } from "@/components/page-shell";
import { RiskManagementClient } from "@/components/risk-management-client";

export default function RiskManagementToolPage() {
  return (
    <PageShell locale="id" currentPath="/apps/risk-management-tool">
      <RiskManagementClient />
    </PageShell>
  );
}
