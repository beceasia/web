import { HomeContent } from "@/components/home-content";
import { PageShell } from "@/components/page-shell";

export default function HomePage() {
  return (
    <PageShell locale="en" currentPath="/">
      <HomeContent locale="en" />
    </PageShell>
  );
}
