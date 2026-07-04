import { BasicPage } from "@/components/basic-page";
import { PageShell } from "@/components/page-shell";

export default function DocsPage() {
  return (
    <PageShell locale="en" currentPath="/docs">
      <BasicPage
        title="Docs"
        description="Short guides for each app and utility will be organized here."
        items={["App overview", "Setup notes", "Data structure", "User guide", "Known limits", "Release notes"]}
      />
    </PageShell>
  );
}
