import { BarChart3, FileText, Globe2, GraduationCap, Layers3, Workflow } from "lucide-react";
import type { Locale } from "@/data/apps";
import { apps, getFeaturedApps } from "@/data/apps";
import { categories } from "@/data/categories";
import { t } from "@/data/i18n";
import { utilities } from "@/data/utilities";
import { AppGrid } from "./app-grid";
import { HeroSection } from "./hero-section";
import { SectionHeading } from "./section-heading";

const useCaseIcons = [Workflow, FileText, BarChart3, Globe2, GraduationCap, Layers3];

export function HomeContent({ locale }: { locale: Locale }) {
  const dict = t(locale);
  const useCases = locale === "en"
    ? ["Workflow automation", "Document generation", "Monitoring dashboards", "Trade facilitation", "Learning tools", "Research workbench"]
    : ["Otomasi alur kerja", "Generate dokumen", "Dashboard monitoring", "Fasilitasi perdagangan", "Media pembelajaran", "Workbench kajian"];

  return (
    <>
      <HeroSection locale={locale} />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading title={dict.sections.featured} description={locale === "en" ? "Start with the tools that are closest to daily work: documents, monitoring, export support, and internal planning." : "Mulai dari tools yang paling dekat dengan pekerjaan harian: dokumen, monitoring, asistensi ekspor, dan perencanaan internal."} />
        <div className="mt-8">
          <AppGrid apps={getFeaturedApps()} locale={locale} />
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={dict.sections.utilities} description={locale === "en" ? "Small tools designed for fast tasks without a heavy system." : "Tools kecil untuk pekerjaan cepat tanpa sistem yang berat."} />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {utilities.map((item) => (
              <div key={item.title.en} className="rounded-3xl border border-slate-200 bg-soft p-5 transition hover:-translate-y-1 hover:shadow-soft">
                <h3 className="text-lg font-bold text-navy">{item.title[locale]}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.description[locale]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading title={dict.sections.useCases} description={locale === "en" ? "The portal is structured around practical work areas, not organizational jargon." : "Portal ini disusun berdasarkan area kerja praktis, bukan jargon organisasi."} />
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((item, index) => {
            const Icon = useCaseIcons[index];
            return (
              <div key={item} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-teal/10 text-teal"><Icon size={22} /></div>
                <h3 className="mt-4 text-lg font-bold text-navy">{item}</h3>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-navy py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={dict.sections.categories} description={locale === "en" ? `${apps.length} tools across ${categories.length} work areas.` : `${apps.length} tools dalam ${categories.length} area kerja.`} />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <div key={category.key} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-bold text-white">{category.label[locale]}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{category.description[locale]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
