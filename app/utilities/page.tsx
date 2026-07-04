import { PageShell } from "@/components/page-shell";
import { UtilitiesClient } from "@/components/utilities-client";

export default function UtilitiesPage() {
  return (
    <PageShell locale="en" currentPath="/utilities">
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black tracking-tight text-navy">Practical utilities</h1>
        <p className="mt-4 max-w-3xl text-slate-600">Small browser-based helpers for fast daily tasks.</p>
        <div className="mt-8">
          <UtilitiesClient locale="en" />
        </div>
      </section>
    </PageShell>
  );
}
