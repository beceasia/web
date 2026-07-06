import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/data/apps";
import { t } from "@/data/i18n-safe";
import { localePath } from "@/lib/routes";

export function HeroSection({ locale }: { locale: Locale }) {
  const dict = t(locale);
  const hubDescription = locale === "en"
    ? "Sanitized tools, public launchers, and lightweight apps in one place."
    : locale === "zh"
      ? "\u7ecf\u8fc7\u6e05\u7406\u7684\u5de5\u5177\u3001\u516c\u5171\u542f\u52a8\u5668\u548c\u8f7b\u91cf\u5e94\u7528\u96c6\u4e2d\u5728\u4e00\u5904\u3002"
      : "Tools yang disanitasi, launcher publik, dan aplikasi ringan dalam satu tempat.";

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff,#f7fafc)]">
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
        <div className="relative z-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft">
          <Image src="/brand/bece-master.png" alt="bece.asia brand visual" width={1400} height={1400} priority className="aspect-[4/3] h-full w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/88 to-transparent p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-teal">bece.asia</p>
            <h2 className="mt-2 text-3xl font-black text-navy">Utility Hub</h2>
            <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">
              {hubDescription}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
