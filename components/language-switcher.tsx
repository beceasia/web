import Link from "next/link";
import type { Locale } from "@/data/apps";

export function LanguageSwitcher({ locale, currentPath }: { locale: Locale; currentPath: string }) {
  const enPath = currentPath.replace(/^\/id/, "") || "/";
  const idPath = currentPath.startsWith("/id") ? currentPath : currentPath === "/" ? "/id" : `/id${currentPath}`;

  return (
    <div className="flex items-center rounded-full border border-slate-200 bg-white p-1 text-xs font-semibold text-slate-600 shadow-sm">
      <Link className={`rounded-full px-3 py-1 ${locale === "en" ? "bg-navy text-white" : "hover:text-navy"}`} href={enPath}>
        EN
      </Link>
      <Link className={`rounded-full px-3 py-1 ${locale === "id" ? "bg-navy text-white" : "hover:text-navy"}`} href={idPath}>
        ID
      </Link>
    </div>
  );
}
