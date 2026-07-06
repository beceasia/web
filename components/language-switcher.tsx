import Link from "next/link";
import type { Locale } from "@/data/apps";
import { switchLocalePath } from "@/lib/routes";

export function LanguageSwitcher({ locale, currentPath }: { locale: Locale; currentPath: string }) {
  const languages: Array<{ locale: Locale; label: string }> = [
    { locale: "id", label: "ID" },
    { locale: "en", label: "EN" },
    { locale: "zh", label: "\u4e2d\u6587" }
  ];

  return (
    <div className="flex items-center rounded-full border border-slate-200 bg-white p-1 text-xs font-semibold text-slate-600 shadow-sm">
      {languages.map((item) => (
        <Link key={item.locale} className={`rounded-full px-3 py-1 ${locale === item.locale ? "bg-navy text-white" : "hover:text-navy"}`} href={switchLocalePath(item.locale, currentPath)}>
          {item.label}
        </Link>
      ))}
    </div>
  );
}
