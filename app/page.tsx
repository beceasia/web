import { HomeContent } from "@/components/home-content";
import { PageShell } from "@/components/page-shell";

export default function HomePage() {
  return (
    <PageShell locale="id" currentPath="/">
      <HomeContent locale="id" />
    </PageShell>
  );
}
