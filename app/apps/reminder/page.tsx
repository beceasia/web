import { PageShell } from "@/components/page-shell";
import { ReminderClient } from "@/components/reminder-client";

export default function ReminderPage() {
  return (
    <PageShell locale="id" currentPath="/apps/reminder">
      <ReminderClient />
    </PageShell>
  );
}
