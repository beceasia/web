import { BusinessToolsClient } from "@/components/business-tools-client";
import { PageShell } from "@/components/page-shell";

export default function BusinessProfileBuilderPage() {
  return <PageShell locale="id" currentPath="/apps/business-profile-builder"><BusinessToolsClient kind="profile" /></PageShell>;
}
