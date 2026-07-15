import { BarChart3, FileText, Globe2, GraduationCap, Layers3, Workflow } from "lucide-react";
import type { Locale } from "@/data/apps";
import { apps, getFeaturedApps, localized } from "@/data/apps";
import { categories } from "@/data/categories";
import { t } from "@/data/i18n-safe";
import { utilities } from "@/data/utilities";
import { AppGrid } from "./app-grid";
import { HeroSection } from "./hero-section";
import { SectionHeading } from "./section-heading";
import { SocialContactSection } from "./social-contact-section";

const useCaseIcons = [Workflow, FileText, BarChart3, Globe2, GraduationCap, Layers3];

export function HomeContent({ locale }: { locale: Locale }) {
  const dict = t(locale);
  const useCases = locale === "en"
    ? ["Workflow automation", "Document generation", "Monitoring dashboards", "Trade facilitation", "Learning tools", "Research workbench"]
    : locale === "zh"
      ? ["\u6d41\u7a0b\u81ea\u52a8\u5316", "\u6587\u6863\u751f\u6210", "\u76d1\u63a7\u4eea\u8868\u677f", "\u8d38\u6613\u4fbf\u5229\u5316", "\u5b66\u4e60\u5de5\u5177", "\u7814\u7a76\u5de5\u4f5c\u53f0"]
      : ["Otomasi alur kerja", "Generate dokumen", "Dashboard monitoring", "Fasilitasi perdagangan", "Media pembelajaran", "Workbench kajian"];
  const descriptions = {
    featured: locale === "en"
      ? "Start with the tools that are closest to daily work: documents, monitoring, export support, and internal planning."
      : locale === "zh"
        ? "\u4ece\u6700\u63a5\u8fd1\u65e5\u5e38\u5de5\u4f5c\u7684\u5de5\u5177\u5f00\u59cb\uff1a\u6587\u6863\u3001\u76d1\u63a7\u3001\u51fa\u53e3\u652f\u6301\u548c\u5185\u90e8\u89c4\u5212\u3002"
        : "Mulai dari tools yang paling dekat dengan pekerjaan harian: dokumen, monitoring, asistensi ekspor, dan perencanaan internal.",
    utilities: locale === "en"
      ? "Small tools designed for fast tasks without a heavy system."
      : locale === "zh"
        ? "\u9762\u5411\u5feb\u901f\u4efb\u52a1\u7684\u5c0f\u5de5\u5177\uff0c\u65e0\u9700\u590d\u6742\u7cfb\u7edf\u3002"
        : "Tools kecil untuk pekerjaan cepat tanpa sistem yang berat.",
    useCases: locale === "en"
      ? "The portal is structured around practical work areas, not organizational jargon."
      : locale === "zh"
        ? "\u8be5\u95e8\u6237\u56f4\u7ed5\u5b9e\u7528\u5de5\u4f5c\u9886\u57df\u7ec4\u7ec7\uff0c\u800c\u4e0d\u662f\u7ec4\u7ec7\u672f\u8bed\u3002"
        : "Portal ini disusun berdasarkan area kerja praktis, bukan jargon organisasi.",
    categories: locale === "en"
      ? `${apps.length} tools across ${categories.length} work areas.`
      : locale === "zh"
        ? `${apps.length} \u4e2a\u5de5\u5177\uff0c\u8986\u76d6 ${categories.length} \u4e2a\u5de5\u4f5c\u9886\u57df\u3002`
        : `${apps.length} tools dalam ${categories.length} area kerja.`
  };

  return (
    <>
      <HeroSection locale={locale} />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading title={dict.sections.featured} description={descriptions.featured} />
        <div className="mt-8">
          <AppGrid apps={getFeaturedApps()} locale={locale} />
        </div>
      </section>

      <SocialContactSection locale={locale} />

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={dict.sections.utilities} description={descriptions.utilities} />
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {utilities.map((item) => (
              <div key={item.title.en} className="rounded-3xl border border-slate-200 bg-soft p-5 transition hover:-translate-y-1 hover:shadow-soft">
                <h3 className="text-lg font-bold text-navy">{localized(item.title, locale)}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{localized(item.description, locale)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading title={dict.sections.useCases} description={descriptions.useCases} />
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
          <SectionHeading title={dict.sections.categories} description={descriptions.categories} />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <div key={category.key} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-bold text-white">{localized(category.label, locale)}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{localized(category.description, locale)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
