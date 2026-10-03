import { Search } from "lucide-react";
import type { Locale } from "@/data/apps";
import { localePath } from "@/lib/routes";

export function HomeSearch({ locale }: { locale: Locale }) {
  const label =
    locale === "id"
      ? "Cari alat, produk, atau negara"
      : locale === "zh"
        ? "搜索工具、产品或国家"
        : "Search tools, products, or countries";
  return (
    <form
      action={localePath(locale, "/apps")}
      className="mt-6 flex gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm"
    >
      <label className="flex min-w-0 flex-1 items-center gap-2 px-2">
        <Search size={20} className="shrink-0 text-slate-400" />
        <span className="sr-only">{label}</span>
        <input
          name="q"
          type="search"
          placeholder={label}
          className="min-h-11 min-w-0 w-full bg-transparent text-sm outline-none"
        />
      </label>
      <button className="min-h-11 rounded-xl bg-navy px-4 text-sm font-bold text-white">
        {locale === "id" ? "Cari" : locale === "zh" ? "搜索" : "Search"}
      </button>
    </form>
  );
}
