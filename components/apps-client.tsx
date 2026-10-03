"use client";

import { Grid2X2, List, Search } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import type { AppItem, Locale } from "@/data/apps";
import { localized } from "@/data/apps";
import { categories } from "@/data/categories";
import { appMatchesSearch, resourceResults } from "@/lib/search";
import { localePath } from "@/lib/routes";
import { AppCard } from "./app-card";

export function AppsClient({
  apps,
  locale,
}: {
  apps: AppItem[];
  locale: Locale;
}) {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [category, setCategory] = useState(params.get("category") ?? "all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const copy = {
    id: {
      search: "Cari alat, produk, negara, atau panduan",
      all: "Semua kategori",
      count: "alat ditemukan",
      resources: "Produk, pasar, dan panduan terkait",
      empty: "Belum ada hasil. Coba kopi, kakao, HS, atau Hong Kong.",
      reset: "Hapus pencarian dan filter",
      grid: "Tampilan kartu",
      list: "Tampilan daftar",
      filter: "Filter kategori",
    },
    en: {
      search: "Search tools, products, countries, or guides",
      all: "All categories",
      count: "tools found",
      resources: "Related products, markets, and guides",
      empty: "No results yet. Try coffee, cocoa, HS, or Hong Kong.",
      reset: "Clear search and filters",
      grid: "Card view",
      list: "List view",
      filter: "Category filter",
    },
    zh: {
      search: "搜索工具、产品、国家或指南",
      all: "所有分类",
      count: "个工具",
      resources: "相关产品、市场与指南",
      empty: "未找到结果。请尝试咖啡、可可、HS 或香港。",
      reset: "清除搜索与筛选",
      grid: "卡片视图",
      list: "列表视图",
      filter: "分类筛选",
    },
  }[locale];
  const filtered = useMemo(
    () =>
      apps.filter(
        (app) =>
          (category === "all" || app.category === category) &&
          appMatchesSearch(app, query),
      ),
    [apps, query, category],
  );
  const resources = resourceResults(query, locale);
  const update = (q: string, cat: string) => {
    setQuery(q);
    setCategory(cat);
    const url = new URL(window.location.href);
    if (q) url.searchParams.set("q", q);
    else url.searchParams.delete("q");
    if (cat !== "all") url.searchParams.set("category", cat);
    else url.searchParams.delete("category");
    window.history.replaceState(null, "", url);
  };
  const availableCategories = [...new Set(apps.map((app) => app.category))];
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row">
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">{copy.search}</span>
          <Search size={18} className="absolute left-3 top-4 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => update(e.target.value, category)}
            placeholder={copy.search}
            className="min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm"
          />
        </label>
        <label>
          <span className="sr-only">{copy.filter}</span>
          <select
            value={category}
            onChange={(e) => update(query, e.target.value)}
            className="min-h-12 w-full max-w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm sm:max-w-60"
          >
            <option value="all">{copy.all}</option>
            {availableCategories.map((key) => (
              <option key={key} value={key}>
                {localized(
                  categories.find((item) => item.key === key)?.label ?? {
                    id: key,
                    en: key,
                  },
                  locale,
                )}
              </option>
            ))}
          </select>
        </label>
      </div>
      {resources.length > 0 && (
        <section className="rounded-2xl border border-teal/25 bg-teal/5 p-4">
          <h2 className="font-bold text-navy">{copy.resources}</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {resources.map((item) => (
              <Link
                key={item.path}
                href={localePath(
                  locale,
                  `${item.path}?q=${encodeURIComponent(query)}`,
                )}
                className="rounded-xl bg-white p-4 hover:ring-1 hover:ring-teal"
              >
                <h3 className="font-bold text-navy">{item.title} →</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
      <div className="flex items-center justify-between gap-3">
        <p role="status" className="text-sm text-slate-600">
          {filtered.length} {copy.count}
        </p>
        <div className="flex gap-2">
          <button
            aria-label={copy.grid}
            aria-pressed={view === "grid"}
            onClick={() => setView("grid")}
            className={`grid h-11 w-11 place-items-center rounded-xl border ${view === "grid" ? "bg-navy text-white" : "bg-white text-navy"}`}
          >
            <Grid2X2 size={18} />
          </button>
          <button
            aria-label={copy.list}
            aria-pressed={view === "list"}
            onClick={() => setView("list")}
            className={`grid h-11 w-11 place-items-center rounded-xl border ${view === "list" ? "bg-navy text-white" : "bg-white text-navy"}`}
          >
            <List size={18} />
          </button>
        </div>
      </div>
      {filtered.length ? (
        <div
          className={
            view === "grid"
              ? "grid gap-5 md:grid-cols-2 lg:grid-cols-3"
              : "grid gap-4"
          }
        >
          {filtered.map((app) => (
            <AppCard
              key={app.slug}
              app={app}
              locale={locale}
              compact={view === "list"}
              query={query}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center">
          <p className="text-slate-600">{copy.empty}</p>
          <button
            onClick={() => update("", "all")}
            className="mt-4 min-h-12 rounded-xl bg-navy px-4 text-sm font-bold text-white"
          >
            {copy.reset}
          </button>
        </div>
      )}
    </div>
  );
}
