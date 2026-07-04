import { BasicPage } from "@/components/basic-page";
import { PageShell } from "@/components/page-shell";

export default function AboutPage() {
  return (
    <PageShell locale="en" currentPath="/about">
      <BasicPage
        title="About bece.asia"
        description="bece.asia is a portal for practical digital tools, lightweight apps, and productivity experiments."
        items={["English by default", "Bahasa Indonesia option", "Neutral branding", "Vercel deployment", "Editable app catalog", "Community-built status"]}
      />
    </PageShell>
  );
}
