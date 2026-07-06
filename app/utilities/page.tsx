import { PageShell } from "@/components/page-shell";
import { UtilitiesClient } from "@/components/utilities-client";

export default function UtilitiesPage() {
  return (
    <PageShell locale="id" currentPath="/utilities">
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black tracking-tight text-navy">Utilities praktis</h1>
        <p className="mt-4 max-w-3xl text-slate-600">Helper kecil berbasis browser untuk pekerjaan cepat sehari-hari.</p>
        <div className="mt-8">
          <UtilitiesClient locale="id" />
        </div>
      </section>
    </PageShell>
  );
}
