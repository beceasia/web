import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import type { Locale } from "@/data/apps";
import { t } from "@/data/i18n";
import { localePath } from "@/lib/routes";

export function HeroSection({ locale }: { locale: Locale }) {
  const dict = t(locale);

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(0,169,157,0.14),transparent_34%),linear-gradient(180deg,#ffffff,#f7fafc)]">
      <div className="absolute right-[-10%] top-20 h-72 w-72 rounded-full bg-teal/10 blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-white px-4 py-2 text-sm font-semibold text-teal shadow-sm">
            <Sparkles size={16} />
            {dict.hero.eyebrow}
          </div>
          <h1 className="mt-7 max-w-4xl text-4xl font-black tracking-tight text-navy sm:text-5xl lg:text-6xl">{dict.hero.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{dict.hero.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={localePath(locale, "/apps")} className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-navy-light">
              {dict.hero.primary}
              <ArrowRight size={18} />
            </Link>
            <Link href={localePath(locale, "/utilities")} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-navy shadow-sm transition hover:-translate-y-0.5 hover:border-teal">
              {dict.hero.secondary}
            </Link>
          </div>
        </div>
        <div className="relative z-10 rounded-[2rem] border border-white bg-white/70 p-4 shadow-soft backdrop-blur">
          <div className="rounded-[1.5rem] bg-navy p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-teal">bece.asia</p>
                <h2 className="mt-2 text-3xl font-black">Utility Hub</h2>
              </div>
              <span className="rounded-full bg-teal px-3 py-1 text-xs font-bold text-navy">EN / ID</span>
            </div>
            <div className="mt-8 grid gap-3">
              {["Apps catalog", "Document workflow", "Monitoring dashboard", "Learning tools"].map((item) => (
                <div key={item} className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3 text-sm">
                  <span>{item}</span>
                  <span className="h-2 w-2 rounded-full bg-teal" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
