"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, BookOpenText, Database, FileCheck2, Globe2, Search, X } from "lucide-react";
import type { Locale } from "@/data/apps";
import { tradeResources, type ResourceCategory } from "@/data/trade-resources";
import { localePath } from "@/lib/routes";

type Filter = "all" | ResourceCategory;
const texts: Record<Locale, {
  label: string; heading: string; lead: string; total: string;
  search: string; noResults: string; reset: string; visit: string; purpose: string;
  related: string; research: string; researchDescription: string; researchLink: string;
  note: string; checkDate: string; country: string; international: string;
  tabs: Record<Filter, string>;
}> = {
  id: {
    label: "Direktori rujukan perdagangan",
    heading: "20 sumber untuk riset ekspor-impor",
    lead: "Cari sumber resmi Indonesia dan platform data global berdasarkan pekerjaan yang ingin Anda selesaikan. Pilih sumber yang sesuai, lalu periksa sendiri data dan ketentuan terbarunya.",
    total: "sumber terkurasi", search: "Cari nama, lembaga, fungsi, atau kata kunci",
    noResults: "Tidak ditemukan sumber yang cocok.", reset: "Hapus pencarian",
    visit: "Buka situs sumber", purpose: "Gunakan ketika",
    related: "Lanjutkan riset bersama bece.asia",
    research: "Dari sumber data ke rencana ekspor",
    researchDescription: "Setelah mendapatkan HS, tren pasar dan ketentuan, gunakan alat BECE untuk menyusun langkah, simulasi biaya, serta kebutuhan riset lanjutan.",
    researchLink: "Buka Export OS",
    note: "Direktori ini adalah kumpulan tautan eksternal, bukan data yang diperbarui secara otomatis. Akses, cakupan, tarif, periode statistik, aturan dan persyaratan dapat berubah. Selalu pastikan kode HS, produk, negara tujuan, tanggal berlaku dan sumber primer sebelum mengambil keputusan. Penyebutan lembaga tidak menunjukkan afiliasi atau kerja sama.",
    checkDate: "Dikurasi 22 Oktober 2026",
    country: "Indonesia", international: "Internasional",
    tabs: { all: "Semua", legal: "Legalitas & ketentuan", statistics: "Statistik perdagangan", market: "Akses pasar", support: "Promosi & pembelajaran" }
  },
  en: {
    label: "Trade reference directory", heading: "20 resources for export-import research",
    lead: "Find Indonesian official sources and global trade platforms by task. Open a source and verify the most recent data and requirements yourself.",
    total: "curated resources", search: "Search by name, organisation, function or keyword",
    noResults: "No matching resources found.", reset: "Clear search",
    visit: "Visit source", purpose: "Use this for",
    related: "Continue your research with bece.asia",
    research: "Turn research into an export plan",
    researchDescription: "Once you have HS references, market trends and rules, use BECE tools to build an action plan, cost scenarios and further research.",
    researchLink: "Open Export OS",
    note: "This directory links to external sources; it is not an automatically updated data service. Access, coverage, tariffs, statistical periods and requirements may change. Verify HS code, product, destination, effective date and primary source before decisions. Listing a provider does not imply affiliation.",
    checkDate: "Curated 22 October 2026",
    country: "Indonesia", international: "International",
    tabs: { all: "All", legal: "Licensing & rules", statistics: "Trade statistics", market: "Market access", support: "Promotion & learning" }
  },
  zh: {
    label: "贸易参考资源目录", heading: "20 个进出口研究资源",
    lead: "按业务需求查找印尼官方信息来源和全球贸易数据平台。进入来源网站后，请自行核实最新信息与要求。",
    total: "个精选资源", search: "搜索名称、机构、用途或关键词",
    noResults: "未找到匹配的资源。", reset: "清除搜索",
    visit: "访问来源网站", purpose: "使用场景",
    related: "使用 bece.asia 继续研究",
    research: "将研究成果转化为出口计划",
    researchDescription: "取得 HS 编码参考、市场趋势和规则后，可使用 BECE 工具制定行动计划、成本方案及后续研究。",
    researchLink: "打开 Export OS",
    note: "此目录仅提供外部链接，并非自动更新的数据服务。访问方式、数据覆盖、关税、统计期间及规定可能改变。作出决定前，请核实 HS 编码、产品、目的国、适用日期及官方原始来源。收录机构不代表存在关联关系。",
    checkDate: "2026 年 10 月 22 日整理",
    country: "印度尼西亚", international: "国际",
    tabs: { all: "全部", legal: "许可与规定", statistics: "贸易统计", market: "市场准入", support: "推广与学习" }
  },
};

const tabs: Filter[] = ["all", "legal", "statistics", "market", "support"];
const categoryIcons: Record<ResourceCategory, typeof Search> = {
  legal: FileCheck2,
  statistics: Database,
  market: Globe2,
  support: BookOpenText,
};

export function TradeResourcesDirectory({ locale }: { locale: Locale }) {
  const t = texts[locale];
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Filter>("all");

  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    return tradeResources.filter((resource) => {
      if (active !== "all" && resource.category !== active) return false;
      if (!normalized) return true;
      const haystack = [
        resource.name, resource.agency, resource.id,
        resource.region, resource.description[locale], resource.action[locale],
        t.tabs[resource.category],
      ].join(" ").toLocaleLowerCase();
      return haystack.includes(normalized);
    });
  }, [active, locale, query, t]);

  return (
    <div className="bg-soft">
      <section className="bg-navy px-4 py-14 text-white sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal">{t.label}</p>
          <h1 className="mt-4 max-w-4xl text-3xl font-black leading-tight sm:text-5xl">{t.heading}</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-200">{t.lead}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold">
            <span className="rounded-full bg-white/10 px-4 py-2 text-white">{tradeResources.length} {t.total}</span>
            <span className="rounded-full border border-white/20 px-4 py-2 text-slate-200">{t.checkDate}</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <label htmlFor="trade-resource-search" className="block text-sm font-bold text-navy">{t.search}</label>
        <div className="relative mt-3 max-w-2xl">
          <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
          <input
            id="trade-resource-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t.search}
            className="min-h-14 w-full rounded-2xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-sm text-navy shadow-sm outline-offset-4 placeholder:text-slate-500"
          />
        </div>
        <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label={t.label}>
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(tab)}
              aria-pressed={active === tab}
              className={`min-h-11 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${active === tab ? "border-navy bg-navy text-white" : "border-slate-200 bg-white text-navy hover:border-teal"}`}
            >{t.tabs[tab]}</button>
          ))}
        </div>

        <p aria-live="polite" className="mt-6 text-sm text-slate-600">{results.length} / {tradeResources.length} {t.total}</p>

        {results.length > 0 ? (
          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {results.map((resource) => {
              const Icon = categoryIcons[resource.category];
              return (
                <article key={resource.id} className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-navy">
                      <Icon size={22} aria-hidden="true" />
                    </div>
                    <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                      {resource.region === "Indonesia" ? t.country : t.international}
                    </span>
                  </div>
                  <p className="mt-5 text-xs font-bold uppercase tracking-wide text-teal">{t.tabs[resource.category]}</p>
                  <h2 className="mt-2 text-xl font-bold leading-snug text-navy">{resource.name}</h2>
                  <p className="mt-1 text-xs font-medium text-slate-500">{resource.agency}</p>
                  <p className="mt-4 flex-1 text-sm leading-7 text-slate-700">{resource.description[locale]}</p>
                  <div className="mt-5 border-t border-slate-100 pt-4">
                    <p className="text-xs font-bold text-navy">{t.purpose}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{resource.action[locale]}</p>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex min-h-11 items-center gap-2 font-bold text-navy underline decoration-teal underline-offset-4 hover:text-teal"
                      aria-label={`${t.visit}: ${resource.name}`}
                    >
                      {t.visit} <ArrowUpRight size={18} aria-hidden="true" />
                    </a>
                    <p className="mt-1 break-all text-xs text-slate-500">{new URL(resource.url).hostname}</p>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
            <p className="text-slate-700">{t.noResults}</p>
            <button
              type="button" onClick={() => { setActive("all"); setQuery(""); }}
              className="mt-4 inline-flex min-h-11 items-center gap-2 font-bold text-navy underline underline-offset-4"
            ><X size={18} aria-hidden="true" />{t.reset}</button>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-navy p-6 text-white sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal">{t.related}</p>
          <h2 className="mt-3 text-2xl font-black">{t.research}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-200">{t.researchDescription}</p>
          <Link href={localePath(locale, "/export-os")} className="mt-5 inline-flex min-h-12 items-center rounded-xl bg-white px-5 text-sm font-bold text-navy hover:bg-slate-100">{t.researchLink} →</Link>
        </div>
        <p className="mt-6 text-sm leading-7 text-slate-600">{t.note}</p>
      </section>
    </div>
  );
}
