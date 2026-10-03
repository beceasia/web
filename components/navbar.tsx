import Link from "next/link";
import { Menu } from "lucide-react";
import type { Locale } from "@/data/apps";
import { whatsappUrl } from "@/data/contact";
import { localePath } from "@/lib/routes";
import { LanguageSwitcher } from "./language-switcher";
import { Logo } from "./logo";

export function Navbar({
  locale,
  currentPath,
}: {
  locale: Locale;
  currentPath: string;
}) {
  const labels = {
    id: [
      "Ekspor",
      "Riset Pasar",
      "Alat Kerja",
      "Panduan",
      "Konsultasi",
      "Buka menu",
    ],
    en: [
      "Export",
      "Market Research",
      "Business Tools",
      "Guides",
      "Consultation",
      "Open menu",
    ],
    zh: ["出口", "市场研究", "业务工具", "指南", "咨询", "打开菜单"],
  }[locale];
  const paths = ["/export-os", "/market-intelligence", "/apps", "/docs"];
  const links = paths.map((path, i) => ({
    href: localePath(locale, path),
    label: labels[i],
  }));
  const consultation = whatsappUrl(
    locale === "id"
      ? "Halo BECE Asia, saya ingin konsultasi kebutuhan usaha saya."
      : locale === "zh"
        ? "您好 BECE Asia，我想咨询业务需求。"
        : "Hello BECE Asia, I would like to discuss my business needs.",
  );
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:px-6 lg:px-8">
        <Logo locale={locale} />
        <nav
          aria-label={labels[5]}
          className="hidden items-center gap-1 lg:flex"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl px-3 py-3 text-sm font-semibold text-navy hover:bg-slate-100"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={consultation}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-navy px-4 py-3 text-sm font-bold text-white"
          >
            {labels[4]}
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} currentPath={currentPath} />
          <details className="relative lg:hidden">
            <summary
              aria-label={labels[5]}
              className="grid h-11 w-11 cursor-pointer list-none place-items-center rounded-xl border border-slate-200"
            >
              <Menu size={22} />
            </summary>
            <nav className="absolute right-0 top-full mt-3 w-60 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block min-h-12 rounded-xl px-4 py-3 text-sm font-semibold text-navy hover:bg-slate-100"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={consultation}
                target="_blank"
                rel="noreferrer"
                className="block min-h-12 rounded-xl px-4 py-3 text-sm font-semibold text-emerald-700"
              >
                {labels[4]}
              </a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
