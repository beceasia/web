import { ChevronDown } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Locale } from "@/data/apps";
import { localized } from "@/data/apps";
import { categories } from "@/data/categories";
import { exportOsCopy } from "@/data/export-os";
import { t } from "@/data/i18n-safe";
import { localePath } from "@/lib/routes";
import { LanguageSwitcher } from "./language-switcher";
import { Logo } from "./logo";

export function Navbar({ locale, currentPath }: { locale: Locale; currentPath: string }) {
  const dict = t(locale);
  const marketIntelligenceLabel = locale === "zh" ? "\u5e02\u573a\u60c5\u62a5" : "Market Intelligence";
  const resources = [
    { label: dict.nav.utilities, path: "/utilities" },
    { label: dict.nav.docs, path: "/docs" },
    { label: dict.nav.useCases, path: "/use-cases" },
    { label: dict.nav.roadmap, path: "/roadmap" }
  ];
  const about = [
    { label: dict.nav.about, path: "/about" },
    { label: dict.nav.feedback, path: "/feedback" },
    { label: locale === "zh" ? "\u9690\u79c1" : locale === "id" ? "Privasi" : "Privacy", path: "/privacy" },
    { label: locale === "zh" ? "\u6761\u6b3e" : locale === "id" ? "Ketentuan" : "Terms", path: "/terms" },
    { label: "Disclaimer", path: "/disclaimer" },
    { label: locale === "zh" ? "\u6570\u636e\u653f\u7b56" : locale === "id" ? "Kebijakan Data" : "Data Policy", path: "/data-policy" }
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Logo locale={locale} />
        <nav className="hidden items-center gap-1 lg:flex">
          <Link href={localePath(locale)} className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-navy">
            {dict.nav.home}
          </Link>
          <Dropdown label={exportOsCopy[locale].nav}>
            <MenuLinks
              locale={locale}
              items={[
                { label: locale === "zh" ? "平台概览" : locale === "en" ? "Platform overview" : "Ikhtisar platform", path: "/export-os" },
                { label: locale === "zh" ? "情报工作台" : locale === "en" ? "Intelligence workspace" : "Workspace intelligence", path: "/export-os/intelligence" },
              ]}
            />
          </Dropdown>
          <Dropdown label={dict.nav.apps}>
            <div className="w-[34rem] p-3">
              <Link href={localePath(locale, "/apps")} className="block rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-navy transition hover:bg-teal/10">
                {dict.apps.allCategories}
              </Link>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <Link key={category.key} href={localePath(locale, `/apps?category=${encodeURIComponent(category.key)}`)} className="rounded-2xl px-4 py-3 transition hover:bg-slate-50">
                    <span className="block text-sm font-bold text-navy">{localized(category.label, locale)}</span>
                    <span className="mt-1 line-clamp-2 block text-xs leading-5 text-slate-500">{localized(category.description, locale)}</span>
                  </Link>
                ))}
              </div>
            </div>
          </Dropdown>
          <Link href={localePath(locale, "/market-intelligence")} className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-navy">
            {marketIntelligenceLabel}
          </Link>
          <Dropdown label={locale === "zh" ? "\u8d44\u6e90" : locale === "en" ? "Resources" : "Referensi"}>
            <MenuLinks items={resources} locale={locale} />
          </Dropdown>
          <Dropdown label={locale === "zh" ? "\u4fe1\u606f" : locale === "en" ? "About" : "Info"}>
            <MenuLinks items={about} locale={locale} />
          </Dropdown>
        </nav>
        <LanguageSwitcher locale={locale} currentPath={currentPath} />
      </div>
    </header>
  );
}

function Dropdown({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="group relative">
      <button className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-navy">
        {label}
        <ChevronDown size={15} />
      </button>
      <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
        <div className="rounded-3xl border border-slate-200 bg-white shadow-soft">{children}</div>
      </div>
    </div>
  );
}

function MenuLinks({ items, locale }: { items: Array<{ label: string; path: string }>; locale: Locale }) {
  return (
    <div className="w-56 p-2">
      {items.map((item) => (
        <Link key={item.path} href={localePath(locale, item.path)} className="block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-navy">
          {item.label}
        </Link>
      ))}
    </div>
  );
}
