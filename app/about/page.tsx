import { BasicPage } from "@/components/basic-page";
import { PageShell } from "@/components/page-shell";

export default function AboutPage() {
  return (
    <PageShell locale="id" currentPath="/about">
      <BasicPage
        title="Tentang bece.asia"
        description="bece.asia adalah portal untuk tools digital praktis, aplikasi ringan, dan eksperimen produktivitas."
        items={["Bahasa Indonesia sebagai default", "Pilihan bahasa Inggris dan China", "Branding netral", "Deployment Vercel", "Katalog aplikasi dapat diedit", "Status community-built"]}
      />
    </PageShell>
  );
}
