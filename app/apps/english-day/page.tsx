import { EnglishDayClient } from "@/components/english-day-client";
import { PageShell } from "@/components/page-shell";

export default function EnglishDayPage() {
  return (
    <PageShell locale="id" currentPath="/apps/english-day">
      <EnglishDayClient />
    </PageShell>
  );
}
