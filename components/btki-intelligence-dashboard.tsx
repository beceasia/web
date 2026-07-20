"use client";

import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  ExternalLink,
  FileSearch,
  Globe2,
  Lightbulb,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import type { Locale } from "@/data/apps";
import {
  dashboardCopy,
  intelligenceProducts,
  tradeInsights,
  type IntelligenceProduct,
  type LocalText,
  type TradePoint,
} from "@/data/btki-intelligence";
import { localePath } from "@/lib/routes";

type View = "overview" | "product" | "compare" | "country" | "btki";

const marketRows = [
  { code: "HK", name: { id: "Hong Kong", en: "Hong Kong", zh: "香港" }, growth: 18.4, access: 94 },
  { code: "SA", name: { id: "Arab Saudi", en: "Saudi Arabia", zh: "沙特阿拉伯" }, growth: 21.2, access: 82 },
  { code: "JP", name: { id: "Jepang", en: "Japan", zh: "日本" }, growth: 11.8, access: 90 },
  { code: "AU", name: { id: "Australia", en: "Australia", zh: "澳大利亚" }, growth: 9.6, access: 91 },
];

const semanticPrompts: Record<Locale, string[]> = {
  id: ["Produk makanan sehat untuk Hong Kong", "Peluang furnitur untuk hotel", "Komoditas dengan pertumbuhan di atas 15%"],
  en: ["Healthy food products for Hong Kong", "Furniture opportunities for hotels", "Commodities growing above 15%"],
  zh: ["适合香港的健康食品", "酒店家具机会", "增长超过15%的商品"],
};

export function BtkiIntelligenceDashboard({ locale }: { locale: Locale }) {
  const copy = dashboardCopy[locale];
  const [view, setView] = useState<View>("overview");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(intelligenceProducts[0].id);
  const [compareId, setCompareId] = useState(intelligenceProducts[1].id);
  const [sort, setSort] = useState<"score" | "growth">("score");
  const [marketFilter, setMarketFilter] = useState("all");

  const selected = intelligenceProducts.find((item) => item.id === selectedId) ?? intelligenceProducts[0];
  const compared = intelligenceProducts.find((item) => item.id === compareId) ?? intelligenceProducts[1];
  const suggestions = useMemo(() => findProducts(query), [query]);

  function openProduct(id: string) {
    setSelectedId(id);
    setView("product");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = suggestions[0] ?? intelligenceProducts[0];
    setSelectedId(result.id);
    setView("product");
  }

  return (
    <section className="min-h-screen bg-[#eef2f5] text-slate-950">
      <div className="border-b border-slate-700 bg-[#07172d] text-white">
        <div className="mx-auto max-w-[1440px] px-4 py-7 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
                <Sparkles size={14} /> {copy.eyebrow}
              </p>
              <h1 className="mt-2 text-3xl font-black sm:text-4xl">{copy.title}</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">{copy.subtitle}</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              {copy.lastUpdate}
            </div>
          </div>

          <form onSubmit={submitSearch} className="relative mt-7 max-w-5xl">
            <div className="flex min-h-14 items-center border border-slate-600 bg-white shadow-xl shadow-black/20 focus-within:border-cyan-400">
              <Search className="ml-4 shrink-0 text-slate-400" size={21} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={copy.placeholder}
                aria-label={copy.title}
                className="min-w-0 flex-1 bg-transparent px-3 py-4 text-sm text-slate-900 outline-none sm:text-base"
              />
              <button type="submit" className="m-1.5 hidden min-h-11 items-center gap-2 bg-cyan-600 px-5 text-sm font-bold text-white transition hover:bg-cyan-700 sm:inline-flex">
                {copy.search} <ArrowRight size={17} />
              </button>
            </div>
            {query ? (
              <div className="absolute left-0 right-0 top-full z-30 mt-1 border border-slate-200 bg-white p-2 text-slate-900 shadow-2xl">
                <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">{copy.semantic}</div>
                {suggestions.map((product) => (
                  <button key={product.id} type="button" onClick={() => openProduct(product.id)} className="flex w-full items-center justify-between gap-3 px-3 py-3 text-left transition hover:bg-slate-50">
                    <span>
                      <span className="block text-sm font-bold text-slate-900">{text(product.name, locale)}</span>
                      <span className="mt-1 block text-xs text-slate-500">HS {product.hsCode} · {text(product.category, locale)}</span>
                    </span>
                    <span className="text-sm font-black text-emerald-600">{product.score}/100</span>
                  </button>
                ))}
              </div>
            ) : null}
          </form>

          <div className="mt-3 flex flex-wrap gap-2">
            {semanticPrompts[locale].map((prompt) => (
              <button key={prompt} type="button" onClick={() => setQuery(prompt)} className="border border-slate-600 px-3 py-2 text-xs text-slate-300 transition hover:border-cyan-400 hover:text-white">
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="sticky top-[73px] z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] gap-1 overflow-x-auto px-4 py-2 sm:px-6 lg:px-8">
          <Tab active={view === "overview"} onClick={() => setView("overview")} icon={<TrendingUp size={16} />} label={copy.overview} />
          <Tab active={view === "product"} onClick={() => setView("product")} icon={<BarChart3 size={16} />} label={copy.product} />
          <Tab active={view === "compare"} onClick={() => setView("compare")} icon={<SlidersHorizontal size={16} />} label={copy.compare} />
          <Tab active={view === "country"} onClick={() => setView("country")} icon={<Globe2 size={16} />} label={copy.country} />
          <Tab active={view === "btki"} onClick={() => setView("btki")} icon={<FileSearch size={16} />} label={copy.btki} />
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8">
        {view === "overview" ? <Overview locale={locale} openProduct={openProduct} /> : null}
        {view === "product" ? (
          <ProductIntelligence
            locale={locale}
            product={selected}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            sort={sort}
            setSort={setSort}
            marketFilter={marketFilter}
            setMarketFilter={setMarketFilter}
          />
        ) : null}
        {view === "compare" ? (
          <Comparison locale={locale} left={selected} right={compared} setLeft={setSelectedId} setRight={setCompareId} />
        ) : null}
        {view === "country" ? <CountryIntelligence locale={locale} openProduct={openProduct} /> : null}
        {view === "btki" ? <BtkiBridge locale={locale} /> : null}

        <div className="mt-6 flex items-start gap-3 border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
          <ShieldCheck className="mt-0.5 shrink-0" size={17} />
          <p>{copy.demo}</p>
        </div>
      </div>
    </section>
  );
}

function Overview({ locale, openProduct }: { locale: Locale; openProduct: (id: string) => void }) {
  const copy = dashboardCopy[locale];
  return (
    <div className="space-y-6">
      <div className="grid gap-px border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label={copy.exportValue} value="$1.56B" delta="+12.4%" />
        <Metric label={copy.opportunity} value="83.0" delta="+4.8 pts" />
        <Metric label={copy.targetMarkets} value="16" delta="4 rising" />
        <Metric label={locale === "zh" ? "BTKI参考" : locale === "en" ? "BTKI references" : "Referensi BTKI"} value="14,518" delta="99 chapters" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Panel title={copy.trending} icon={<TrendingUp size={18} />}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="border-b border-slate-200 text-[11px] uppercase tracking-[0.12em] text-slate-400">
                <tr>
                  <th className="px-5 py-3 font-bold">#</th>
                  <th className="px-3 py-3 font-bold">{copy.product}</th>
                  <th className="px-3 py-3 font-bold">HS</th>
                  <th className="px-3 py-3 font-bold">{copy.growth}</th>
                  <th className="px-3 py-3 font-bold">{copy.opportunity}</th>
                  <th className="px-5 py-3"><span className="sr-only">{copy.openProduct}</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[...intelligenceProducts].sort((a, b) => b.score - a.score).map((product, index) => (
                  <tr key={product.id} className="bg-white transition hover:bg-cyan-50/50">
                    <td className="px-5 py-4 font-mono text-xs text-slate-400">0{index + 1}</td>
                    <td className="px-3 py-4">
                      <p className="font-bold text-slate-950">{text(product.name, locale)}</p>
                      <p className="mt-1 text-xs text-slate-500">{text(product.category, locale)}</p>
                    </td>
                    <td className="px-3 py-4 font-mono text-xs font-bold text-slate-600">{product.hsCode}</td>
                    <td className="px-3 py-4 font-bold text-emerald-600">+{product.growth}%</td>
                    <td className="px-3 py-4"><Score value={product.score} /></td>
                    <td className="px-5 py-4 text-right">
                      <button type="button" onClick={() => openProduct(product.id)} title={copy.openProduct} className="inline-flex h-9 w-9 items-center justify-center border border-slate-200 text-slate-600 transition hover:border-cyan-500 hover:text-cyan-700">
                        <ArrowRight size={17} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title={copy.rising} icon={<Globe2 size={18} />}>
          <div className="divide-y divide-slate-100 px-5">
            {marketRows.map((item, index) => (
              <div key={item.code} className="grid grid-cols-[2rem_1fr_auto] items-center gap-3 py-4">
                <span className="font-mono text-xs text-slate-400">0{index + 1}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-400">{item.code}</span>
                    <p className="font-bold text-slate-900">{text(item.name, locale)}</p>
                  </div>
                  <div className="mt-2 h-1.5 bg-slate-100"><div className="h-full bg-cyan-500" style={{ width: `${item.access}%` }} /></div>
                </div>
                <span className="font-bold text-emerald-600">+{item.growth}%</span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        <OpportunityMap locale={locale} />
        <Panel title={copy.insights} icon={<Lightbulb size={18} />}>
          <div className="divide-y divide-slate-100 px-5">
            {tradeInsights.map((insight) => (
              <div key={insight.date} className="py-4">
                <div className="flex items-center justify-between gap-3 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
                  <span>{text(insight.category, locale)}</span><span>{insight.date}</span>
                </div>
                <p className="mt-2 font-bold leading-6 text-slate-900">{text(insight.title, locale)}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

function ProductIntelligence({
  locale,
  product,
  selectedId,
  setSelectedId,
  sort,
  setSort,
  marketFilter,
  setMarketFilter,
}: {
  locale: Locale;
  product: IntelligenceProduct;
  selectedId: string;
  setSelectedId: (id: string) => void;
  sort: "score" | "growth";
  setSort: (value: "score" | "growth") => void;
  marketFilter: string;
  setMarketFilter: (value: string) => void;
}) {
  const copy = dashboardCopy[locale];
  const markets = [...product.markets]
    .filter((item) => marketFilter === "all" || item.code === marketFilter)
    .sort((a, b) => sort === "score" ? b.match - a.match : b.growth - a.growth);

  return (
    <div className="space-y-6">
      <div className="border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#07172d] px-2.5 py-1 font-mono text-xs font-bold text-white">HS {product.hsCode}</span>
              <span className="border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-600">{text(product.category, locale)}</span>
            </div>
            <h2 className="mt-4 text-2xl font-black text-slate-950 sm:text-3xl">{text(product.name, locale)}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{text(product.description, locale)}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {product.signals.map((signal) => <span key={text(signal, locale)} className="bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">{text(signal, locale)}</span>)}
            </div>
          </div>
          <label className="relative block min-w-64 text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
            {copy.product}
            <select value={selectedId} onChange={(event) => setSelectedId(event.target.value)} className="mt-2 w-full appearance-none border border-slate-300 bg-white px-3 py-3 pr-9 text-sm font-bold normal-case tracking-normal text-slate-900 outline-none focus:border-cyan-500">
              {intelligenceProducts.map((item) => <option key={item.id} value={item.id}>{text(item.name, locale)}</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute bottom-3 right-3 text-slate-400" size={17} />
          </label>
        </div>
      </div>

      <div className="grid gap-px border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
        <Metric label={copy.opportunity} value={`${product.score}/100`} delta="Strong" />
        <Metric label={copy.exportValue} value={`$${product.exportValue}M`} delta={`+${product.growth}%`} />
        <Metric label={locale === "zh" ? "出口量" : locale === "en" ? "Export volume" : "Volume ekspor"} value={`${product.volume}K t`} delta="2025" />
        <Metric label={copy.targetMarkets} value={`${product.markets.length}`} delta={text(product.markets[0].country, locale)} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.45fr_1fr]">
        <Panel title={copy.performance} icon={<BarChart3 size={18} />}>
          <TradeChart points={product.trend} locale={locale} />
        </Panel>
        <Panel title={copy.prices} icon={<CircleDollarSign size={18} />}>
          <PriceBenchmark locale={locale} product={product} />
        </Panel>
      </div>

      <Panel title={copy.marketRanking} icon={<Globe2 size={18} />} action={
        <div className="flex flex-wrap gap-2">
          <SelectFilter value={marketFilter} onChange={setMarketFilter} label={copy.allMarkets} options={product.markets.map((item) => ({ value: item.code, label: text(item.country, locale) }))} />
          <SelectFilter value={sort} onChange={(value) => setSort(value as "score" | "growth")} label={copy.sortScore} options={[{ value: "growth", label: copy.sortGrowth }]} />
        </div>
      }>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-[11px] uppercase tracking-[0.12em] text-slate-400">
              <tr><th className="px-5 py-3">#</th><th className="px-3 py-3">{copy.country}</th><th className="px-3 py-3">{copy.demand}</th><th className="px-3 py-3">{copy.growth}</th><th className="px-3 py-3">{copy.match}</th><th className="px-5 py-3">{copy.tariff}</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {markets.map((item, index) => (
                <tr key={item.code} className="bg-white hover:bg-slate-50">
                  <td className="px-5 py-4 font-mono text-xs text-slate-400">0{index + 1}</td>
                  <td className="px-3 py-4 font-bold"><span className="mr-2 text-xs text-slate-400">{item.code}</span>{text(item.country, locale)}</td>
                  <td className="px-3 py-4"><MiniBar value={item.demand} color="bg-cyan-500" /></td>
                  <td className="px-3 py-4 font-bold text-emerald-600">+{item.growth}%</td>
                  <td className="px-3 py-4"><Score value={item.match} /></td>
                  <td className="px-5 py-4 font-mono font-bold">{item.tariff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Panel title={copy.buyers} icon={<Users size={18} />}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-[11px] uppercase tracking-[0.12em] text-slate-400">
                <tr><th className="px-5 py-3">Buyer demo</th><th className="px-3 py-3">{copy.country}</th><th className="px-3 py-3">Type</th><th className="px-3 py-3">Activity</th><th className="px-5 py-3">{copy.match}</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {product.buyers.map((item) => (
                  <tr key={item.name}><td className="px-5 py-4 font-bold">{item.name}</td><td className="px-3 py-4">{text(item.country, locale)}</td><td className="px-3 py-4 text-slate-600">{text(item.type, locale)}</td><td className="px-3 py-4 text-slate-500">{text(item.activity, locale)}</td><td className="px-5 py-4"><Score value={item.match} /></td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="border-t border-slate-100 px-5 py-3 text-xs leading-5 text-slate-500">{copy.buyerDisclaimer}</p>
        </Panel>
        <div className="border border-cyan-800 bg-[#08283c] p-6 text-white">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-cyan-300"><Bot size={17} /> {copy.recommendation}</div>
          <p className="mt-5 text-sm leading-7 text-slate-100">{text(product.recommendation, locale)}</p>
          <div className="mt-6 flex items-center gap-2 text-xs text-cyan-200"><CheckCircle2 size={16} /> {locale === "zh" ? "基于市场匹配、增长和准入" : locale === "en" ? "Based on market fit, growth, and access" : "Berdasarkan kecocokan, pertumbuhan, dan akses pasar"}</div>
        </div>
      </div>
    </div>
  );
}

function Comparison({ locale, left, right, setLeft, setRight }: { locale: Locale; left: IntelligenceProduct; right: IntelligenceProduct; setLeft: (id: string) => void; setRight: (id: string) => void }) {
  const copy = dashboardCopy[locale];
  const dimensions = [
    { label: copy.opportunity, left: left.score, right: right.score },
    { label: copy.growth, left: Math.min(left.growth * 4, 100), right: Math.min(right.growth * 4, 100) },
    { label: copy.exportValue, left: Math.min(left.exportValue / 6, 100), right: Math.min(right.exportValue / 6, 100) },
    { label: copy.targetMarkets, left: left.markets[0].match, right: right.markets[0].match },
  ];
  return (
    <div className="space-y-6">
      <div className="border border-slate-200 bg-white p-6">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-700">{copy.compare}</p>
        <h2 className="mt-2 text-2xl font-black">{copy.compareTitle}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">{copy.compareHint}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <ProductSelect locale={locale} value={left.id} onChange={setLeft} />
          <ProductSelect locale={locale} value={right.id} onChange={setRight} />
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr_1fr]">
        <CompareSummary locale={locale} product={left} color="cyan" />
        <Panel title={locale === "zh" ? "维度比较" : locale === "en" ? "Dimension comparison" : "Perbandingan dimensi"} icon={<SlidersHorizontal size={18} />}>
          <div className="space-y-6 p-5">
            {dimensions.map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex justify-between text-xs font-bold text-slate-500"><span>{Math.round(item.left)}</span><span>{item.label}</span><span>{Math.round(item.right)}</span></div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="flex h-2 justify-end bg-slate-100"><div className="h-full bg-cyan-500" style={{ width: `${item.left}%` }} /></div>
                  <div className="h-2 bg-slate-100"><div className="h-full bg-amber-500" style={{ width: `${item.right}%` }} /></div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
        <CompareSummary locale={locale} product={right} color="amber" />
      </div>
      <OpportunityMap locale={locale} />
    </div>
  );
}

function CountryIntelligence({ locale, openProduct }: { locale: Locale; openProduct: (id: string) => void }) {
  const copy = dashboardCopy[locale];
  const countryStats = locale === "zh"
    ? [{ label: "进口市场规模", value: "$6,470亿" }, { label: "平均关税", value: "0%" }, { label: "市场动能", value: "+8.7%" }]
    : locale === "en"
      ? [{ label: "Import market", value: "$647B" }, { label: "Average tariff", value: "0%" }, { label: "Market momentum", value: "+8.7%" }]
      : [{ label: "Pasar impor", value: "$647B" }, { label: "Tarif rata-rata", value: "0%" }, { label: "Momentum pasar", value: "+8.7%" }];
  const hkProducts = [...intelligenceProducts].sort((a, b) => {
    const aHk = a.markets.find((item) => item.code === "HK")?.match ?? 0;
    const bHk = b.markets.find((item) => item.code === "HK")?.match ?? 0;
    return bHk - aHk;
  });

  return (
    <div className="space-y-6">
      <div className="grid gap-6 border border-slate-200 bg-white p-6 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-cyan-700"><Globe2 size={16} /> HKG · ASIA PACIFIC</div>
          <h2 className="mt-3 text-3xl font-black">{copy.countryTitle}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">{copy.countrySubtitle}</p>
          <Link href={localePath(locale, "/market-intelligence/hong-kong")} className="mt-6 inline-flex items-center gap-2 bg-[#07172d] px-4 py-3 text-sm font-bold text-white transition hover:bg-cyan-800">
            {locale === "zh" ? "打开完整市场报告" : locale === "en" ? "Open full market report" : "Buka laporan pasar lengkap"} <ExternalLink size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-px bg-slate-200">
          {countryStats.map((item) => <div key={item.label} className="bg-slate-50 p-4"><p className="text-xs leading-5 text-slate-500">{item.label}</p><p className="mt-3 text-xl font-black text-slate-950">{item.value}</p></div>)}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Panel title={locale === "zh" ? "面向香港的产品排名" : locale === "en" ? "Product ranking for Hong Kong" : "Peringkat produk untuk Hong Kong"} icon={<TrendingUp size={18} />}>
          <div className="divide-y divide-slate-100">
            {hkProducts.map((product, index) => {
              const match = product.markets.find((item) => item.code === "HK")?.match ?? 0;
              return (
                <button type="button" key={product.id} onClick={() => openProduct(product.id)} className="grid w-full grid-cols-[2rem_1fr_auto] items-center gap-3 px-5 py-4 text-left transition hover:bg-cyan-50/50">
                  <span className="font-mono text-xs text-slate-400">0{index + 1}</span>
                  <span><span className="block font-bold">{text(product.name, locale)}</span><span className="mt-1 block text-xs text-slate-500">HS {product.hsCode} · +{product.growth}%</span></span>
                  <Score value={match} />
                </button>
              );
            })}
          </div>
        </Panel>
        <Panel title={locale === "zh" ? "准入检查表" : locale === "en" ? "Market access checklist" : "Checklist akses pasar"} icon={<ShieldCheck size={18} />}>
          <div className="space-y-4 p-5 text-sm leading-6 text-slate-700">
            {[
              locale === "zh" ? "确认HS编码及产品特定要求" : locale === "en" ? "Confirm HS code and product-specific requirements" : "Konfirmasi HS code dan persyaratan spesifik produk",
              locale === "zh" ? "准备中英文标签与商业文件" : locale === "en" ? "Prepare bilingual labels and commercial documents" : "Siapkan label bilingual dan dokumen komersial",
              locale === "zh" ? "验证进口商、分销商及付款条件" : locale === "en" ? "Verify importer, distributor, and payment terms" : "Verifikasi importir, distributor, dan syarat pembayaran",
              locale === "zh" ? "先用样品或小批量测试需求" : locale === "en" ? "Test demand with samples or a small shipment" : "Uji permintaan dengan sampel atau pengiriman kecil",
            ].map((item) => <div key={item} className="flex gap-3"><CheckCircle2 className="mt-1 shrink-0 text-emerald-600" size={17} /><span>{item}</span></div>)}
          </div>
        </Panel>
      </div>
    </div>
  );
}

function BtkiBridge({ locale }: { locale: Locale }) {
  const copy = dashboardCopy[locale];
  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <div className="border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex h-12 w-12 items-center justify-center bg-[#07172d] text-cyan-300"><FileSearch size={24} /></div>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-cyan-700">E-BTKI 2022 v2.1</p>
        <h2 className="mt-2 text-2xl font-black">{copy.formalLookup}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">{copy.formalLookupText}</p>
        <a href="/apps/btki-smart-search.html" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 bg-[#07172d] px-5 py-3 text-sm font-bold text-white transition hover:bg-cyan-800">
          {copy.openLookup} <ExternalLink size={16} />
        </a>
      </div>
      <div className="border border-slate-800 bg-[#07172d] p-6 text-white">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-cyan-300">DATA COVERAGE</p>
        <div className="mt-5 grid grid-cols-2 gap-px bg-slate-700">
          <DarkMetric label={locale === "zh" ? "参考记录" : locale === "en" ? "Reference records" : "Rekaman referensi"} value="14,518" />
          <DarkMetric label={locale === "zh" ? "章节" : locale === "en" ? "Chapters" : "Bab"} value="99" />
          <DarkMetric label="BM · BK" value="✓" />
          <DarkMetric label="PPN · PPnBM" value="✓" />
        </div>
        <p className="mt-5 text-xs leading-5 text-slate-400">{locale === "zh" ? "使用前请始终通过最新官方来源验证归类和税率。" : locale === "en" ? "Always validate classifications and rates against the latest official sources before use." : "Selalu validasi klasifikasi dan tarif pada sumber resmi terbaru sebelum digunakan."}</p>
      </div>
    </div>
  );
}

function OpportunityMap({ locale }: { locale: Locale }) {
  const copy = dashboardCopy[locale];
  const markets = ["HK", "JP", "US", "SA"];
  return (
    <Panel title={copy.opportunityMap} icon={<BarChart3 size={18} />}>
      <div className="overflow-x-auto p-5">
        <div className="min-w-[520px]">
          <div className="grid grid-cols-[1.5fr_repeat(4,1fr)] gap-1 text-center text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400">
            <div />{markets.map((item) => <div key={item} className="py-2">{item}</div>)}
            {intelligenceProducts.map((product) => (
              <div className="contents" key={product.id}>
                <div className="flex items-center py-2 pr-3 text-left text-xs font-bold normal-case tracking-normal text-slate-700">{text(product.name, locale)}</div>
                {markets.map((code) => {
                  const value = product.markets.find((item) => item.code === code)?.match ?? 58;
                  return <div key={code} title={`${value}/100`} className="flex min-h-12 items-center justify-center text-xs font-black" style={{ backgroundColor: heatColor(value), color: value > 80 ? "white" : "#0f172a" }}>{value}</div>;
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}

function TradeChart({ points, locale }: { points: TradePoint[]; locale: Locale }) {
  const values = points.map((point) => point.value);
  const min = Math.min(...values) * 0.88;
  const max = Math.max(...values) * 1.06;
  const coordinates = points.map((point, index) => {
    const x = 44 + index * (500 / (points.length - 1));
    const y = 178 - ((point.value - min) / (max - min)) * 130;
    return { ...point, x, y };
  });
  const line = coordinates.map((point) => `${point.x},${point.y}`).join(" ");
  const area = `44,178 ${line} 544,178`;
  return (
    <div className="p-5">
      <div className="mb-4 flex items-center gap-4 text-xs text-slate-500"><span className="flex items-center gap-2"><span className="h-2 w-5 bg-cyan-500" /> USD million</span><span>{locale === "zh" ? "年度" : locale === "en" ? "Annual" : "Tahunan"}</span></div>
      <div className="aspect-[16/7] min-h-56 w-full">
        <svg role="img" aria-label="Trade value trend" viewBox="0 0 580 220" className="h-full w-full overflow-visible">
          {[48, 91, 134, 178].map((y) => <line key={y} x1="44" y1={y} x2="544" y2={y} stroke="#e2e8f0" strokeWidth="1" />)}
          <polygon points={area} fill="#06b6d4" opacity="0.12" />
          <polyline points={line} fill="none" stroke="#0891b2" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
          {coordinates.map((point) => (
            <g key={point.year}>
              <circle cx={point.x} cy={point.y} r="5" fill="#ffffff" stroke="#0891b2" strokeWidth="3" />
              <text x={point.x} y="204" textAnchor="middle" fontSize="11" fill="#64748b">{point.year}</text>
              <text x={point.x} y={point.y - 12} textAnchor="middle" fontSize="10" fontWeight="700" fill="#0f172a">${point.value}M</text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

function PriceBenchmark({ locale, product }: { locale: Locale; product: IntelligenceProduct }) {
  const copy = dashboardCopy[locale];
  const range = product.price.high - product.price.low;
  const avgPosition = ((product.price.average - product.price.low) / range) * 100;
  return (
    <div className="p-5">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">{product.price.unit}</p>
      <div className="mt-6 grid grid-cols-3 gap-px bg-slate-200">
        <PriceCell label={copy.low} value={product.price.low} />
        <PriceCell label={copy.average} value={product.price.average} emphasis />
        <PriceCell label={copy.high} value={product.price.high} />
      </div>
      <div className="mt-8">
        <div className="relative h-3 bg-gradient-to-r from-emerald-300 via-amber-300 to-rose-400">
          <span className="absolute top-1/2 h-6 w-1 -translate-x-1/2 -translate-y-1/2 bg-[#07172d]" style={{ left: `${avgPosition}%` }} />
        </div>
        <div className="mt-3 flex justify-between font-mono text-xs text-slate-500"><span>${product.price.low}</span><span>${product.price.high}</span></div>
      </div>
      <p className="mt-6 text-xs leading-5 text-slate-500">{locale === "zh" ? "演示基准会因质量、数量、交货条款和市场而变化。" : locale === "en" ? "Demo benchmark varies by quality, volume, Incoterm, and market." : "Benchmark demo bervariasi menurut mutu, volume, Incoterm, dan pasar."}</p>
    </div>
  );
}

function CompareSummary({ locale, product, color }: { locale: Locale; product: IntelligenceProduct; color: "cyan" | "amber" }) {
  const copy = dashboardCopy[locale];
  return (
    <div className="border border-slate-200 bg-white">
      <div className={`h-1 ${color === "cyan" ? "bg-cyan-500" : "bg-amber-500"}`} />
      <div className="p-5">
        <span className="font-mono text-xs font-bold text-slate-400">HS {product.hsCode}</span>
        <h3 className="mt-2 text-lg font-black">{text(product.name, locale)}</h3>
        <div className="mt-5 space-y-4 text-sm">
          <CompareRow label={copy.opportunity} value={`${product.score}/100`} />
          <CompareRow label={copy.growth} value={`+${product.growth}%`} />
          <CompareRow label={copy.exportValue} value={`$${product.exportValue}M`} />
          <CompareRow label={copy.targetMarkets} value={text(product.markets[0].country, locale)} />
          <CompareRow label={copy.average} value={`$${product.price.average} ${product.price.unit}`} />
        </div>
      </div>
    </div>
  );
}

function ProductSelect({ locale, value, onChange }: { locale: Locale; value: string; onChange: (id: string) => void }) {
  return (
    <label className="relative block">
      <select value={value} onChange={(event) => onChange(event.target.value)} className="w-full appearance-none border border-slate-300 bg-white px-4 py-3 pr-10 text-sm font-bold outline-none focus:border-cyan-500">
        {intelligenceProducts.map((item) => <option value={item.id} key={item.id}>{text(item.name, locale)} · HS {item.hsCode}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-3.5 text-slate-400" size={17} />
    </label>
  );
}

function SelectFilter({ value, onChange, label, options }: { value: string; onChange: (value: string) => void; label: string; options: Array<{ value: string; label: string }> }) {
  return (
    <label className="relative block">
      <select value={value} onChange={(event) => onChange(event.target.value)} className="appearance-none border border-slate-300 bg-white py-2 pl-3 pr-8 text-xs font-bold text-slate-600 outline-none focus:border-cyan-500">
        <option value={value === "score" || value === "growth" ? "score" : "all"}>{label}</option>
        {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2 top-2.5 text-slate-400" size={14} />
    </label>
  );
}

function Panel({ title, icon, children, action }: { title: string; icon: ReactNode; children: ReactNode; action?: ReactNode }) {
  return (
    <section className="overflow-hidden border border-slate-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
        <h2 className="flex items-center gap-2 text-sm font-black text-slate-950">{icon}<span>{title}</span></h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function Tab({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: ReactNode; label: string }) {
  return <button type="button" onClick={onClick} className={`inline-flex shrink-0 items-center gap-2 px-4 py-2.5 text-sm font-bold transition ${active ? "bg-[#07172d] text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"}`}>{icon}{label}</button>;
}

function Metric({ label, value, delta }: { label: string; value: string; delta: string }) {
  return <div className="bg-white p-5"><p className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">{label}</p><div className="mt-3 flex items-end justify-between gap-2"><p className="text-2xl font-black text-slate-950">{value}</p><span className="text-xs font-bold text-emerald-600">{delta}</span></div></div>;
}

function DarkMetric({ label, value }: { label: string; value: string }) {
  return <div className="bg-[#0c213b] p-4"><p className="text-xs text-slate-400">{label}</p><p className="mt-2 text-xl font-black text-white">{value}</p></div>;
}

function PriceCell({ label, value, emphasis = false }: { label: string; value: number; emphasis?: boolean }) {
  return <div className={emphasis ? "bg-[#07172d] p-4 text-white" : "bg-slate-50 p-4"}><p className={`text-xs ${emphasis ? "text-cyan-300" : "text-slate-500"}`}>{label}</p><p className="mt-2 text-lg font-black">${value}</p></div>;
}

function CompareRow({ label, value }: { label: string; value: string }) {
  return <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3"><span className="text-slate-500">{label}</span><span className="text-right font-bold text-slate-950">{value}</span></div>;
}

function Score({ value }: { value: number }) {
  const color = value >= 85 ? "bg-emerald-100 text-emerald-800" : value >= 75 ? "bg-cyan-100 text-cyan-800" : "bg-amber-100 text-amber-800";
  return <span className={`inline-flex min-w-14 justify-center px-2 py-1 text-xs font-black ${color}`}>{value}</span>;
}

function MiniBar({ value, color }: { value: number; color: string }) {
  return <div className="flex items-center gap-2"><div className="h-1.5 w-24 bg-slate-100"><div className={`h-full ${color}`} style={{ width: `${value}%` }} /></div><span className="text-xs font-bold">{value}</span></div>;
}

function text(value: LocalText, locale: Locale) {
  return value[locale] ?? value.id;
}

function findProducts(query: string) {
  const clean = query.trim().toLowerCase();
  if (!clean) return intelligenceProducts.slice(0, 4);
  const scored = intelligenceProducts.map((product) => {
    const haystack = [product.hsCode, ...product.keywords, ...Object.values(product.name), ...Object.values(product.category)].join(" ").toLowerCase();
    const terms = clean.split(/\s+/).filter((term) => term.length > 2);
    const hits = terms.reduce((total, term) => total + (haystack.includes(term) ? 1 : 0), 0);
    const contextual = clean.includes("hong kong") || clean.includes("香港") ? (product.markets.find((market) => market.code === "HK")?.match ?? 0) / 100 : 0;
    const growth = clean.includes("15%") || clean.includes("pertumbuhan") || clean.includes("growth") ? product.growth / 25 : 0;
    return { product, score: hits * 2 + contextual + growth };
  });
  return scored.sort((a, b) => b.score - a.score || b.product.score - a.product.score).map((item) => item.product).slice(0, 4);
}

function heatColor(value: number) {
  if (value >= 88) return "#047857";
  if (value >= 82) return "#0891b2";
  if (value >= 75) return "#67e8f9";
  return "#fef3c7";
}
