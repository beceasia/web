import { Suspense } from "react";
import type { Locale } from "@/data/apps";
import { catalog } from "@/lib/search";
import { AppsClient } from "./apps-client";
import { SectionHeading } from "./section-heading";

export function AppsPageContent({ locale }: { locale: Locale }) {
  const copy = {
    id: {
      title: "Alat untuk pekerjaan Anda",
      description:
        "Langsung gunakan alat, atau cari berdasarkan produk, negara, dan kebutuhan. Kategori membantu mempersempit pilihan.",
    },
    en: {
      title: "Tools for your work",
      description:
        "Open a tool directly, or search by product, country, and task. Use categories to narrow your choices.",
    },
    zh: {
      title: "适合您工作的工具",
      description:
        "直接使用工具，或按产品、国家和任务搜索。使用分类缩小选择范围。",
    },
  }[locale];
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeading title={copy.title} description={copy.description} />
      <div className="mt-8">
        <Suspense fallback={<p aria-busy="true">{copy.title}…</p>}>
          <AppsClient apps={catalog} locale={locale} />
        </Suspense>
      </div>
    </section>
  );
}
