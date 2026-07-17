"use client";

import {
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  Building2,
  Check,
  ChevronRight,
  CircleAlert,
  ExternalLink,
  Filter,
  Globe2,
  GraduationCap,
  Heart,
  LineChart,
  Search,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import type { Locale } from "@/data/apps";
import { whatsappUrl } from "@/data/contact";
import {
  buyerSignals,
  exporterProfiles,
  filterMarketRecords,
  intelligenceCopy,
  learningLevels,
  localize,
  marketIntelligenceRecords,
  type MarketIntelligenceRecord,
} from "@/data/export-intelligence";
import { localePath } from "@/lib/routes";

type WorkspaceTab = "market" | "exporters" | "buyers" | "learning";

export function ExportIntelligenceClient({ locale }: { locale: Locale }) {
  const copy = intelligenceCopy[locale];
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("market");
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState("");
  const [country, setCountry] = useState("");
  const [selectedMarketId, setSelectedMarketId] = useState(marketIntelligenceRecords[0].id);
  const [savedBuyerIds, setSavedBuyerIds] = useState<string[]>([]);
  const [completedMissionIds, setCompletedMissionIds] = useState<string[]>([]);

  useEffect(() => {
    setSavedBuyerIds(readStoredIds("bece-phase2-saved-buyers"));
    setCompletedMissionIds(readStoredIds("bece-phase2-learning-progress"));
  }, []);

  const markets = filterMarketRecords(search, product, country);
  const selectedMarket = markets.find((item) => item.id === selectedMarketId) ?? markets[0];
  const products = Array.from(new Map(marketIntelligenceRecords.map((item) => [item.product, localize(item.productLabel, locale)])).entries());
  const countries = Array.from(new Set(marketIntelligenceRecords.map((item) => item.country))).sort();
  const exporterResults = filterExporters(search, locale);
  const buyerResults = filterBuyers(search, country, locale);
  const allMissions = learningLevels.flatMap((level) => level.missions);
  const learningProgress = Math.round((completedMissionIds.length / allMissions.length) * 100);

  const setSavedBuyers = (ids: string[]) => {
    setSavedBuyerIds(ids);
    window.localStorage.setItem("bece-phase2-saved-buyers", JSON.stringify(ids));
  };

  const setCompletedMissions = (ids: string[]) => {
    setCompletedMissionIds(ids);
    window.localStorage.setItem("bece-phase2-learning-progress", JSON.stringify(ids));
  };

  const tabs: Array<{ id: WorkspaceTab; label: string; icon: typeof LineChart }> = [
    { id: "market", label: copy.market, icon: LineChart },
    { id: "exporters", label: copy.exporters, icon: Building2 },
    { id: "buyers", label: copy.buyers, icon: Users },
    { id: "learning", label: copy.learning, icon: GraduationCap },
  ];

  return (
    <main className="min-h-screen bg-slate-100">
      <section className="border-b border-slate-800 bg-[#06152e] text-white">
        <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div className="max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal">{copy.eyebrow}</p>
              <h1 className="mt-3 text-3xl font-black tracking-normal sm:text-4xl">{copy.title}</h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">{copy.subtitle}</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href={localePath(locale, "/export-os")} className="inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/10">
                {copy.overview}
                <ArrowRight size={16} />
              </Link>
              <a href={whatsappUrl("Hello bece.asia, I need help using the Export Intelligence Workspace.")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md bg-teal px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#008f86]">
                {locale === "id" ? "Konsultasi" : locale === "zh" ? "咨询" : "Consult"}
              </a>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 lg:grid-cols-4">
            <Metric icon={Globe2} label={copy.market} value={`${marketIntelligenceRecords.length}`} detail={`${countries.length} markets`} />
            <Metric icon={Building2} label={copy.exporters} value={`${exporterProfiles.length}`} detail={`${exporterProfiles.filter((item) => item.verified).length} verified`} />
            <Metric icon={Target} label={copy.buyers} value={`${buyerSignals.length}`} detail={`${savedBuyerIds.length} saved`} />
            <Metric icon={BookOpenCheck} label={copy.learning} value={`${learningProgress}%`} detail={`${completedMissionIds.length}/${allMissions.length} missions`} />
          </div>
        </div>
      </section>

      <div className="sticky top-[73px] z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2 sm:px-6 lg:px-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} className={`inline-flex shrink-0 items-center gap-2 rounded-md px-4 py-2.5 text-sm font-bold transition ${active ? "bg-navy text-white" : "text-slate-600 hover:bg-slate-100 hover:text-navy"}`}>
                <Icon size={17} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {activeTab === "market" ? (
          <MarketWorkspace
            locale={locale}
            copy={copy}
            markets={markets}
            selectedMarket={selectedMarket}
            search={search}
            product={product}
            country={country}
            products={products}
            countries={countries}
            onSearch={setSearch}
            onProduct={setProduct}
            onCountry={setCountry}
            onSelect={setSelectedMarketId}
          />
        ) : null}

        {activeTab === "exporters" ? (
          <section>
            <WorkspaceHeading icon={Building2} title={copy.exporters} description={copy.exporterSummary} />
            <SearchBar value={search} onChange={setSearch} placeholder={copy.search} />
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              {exporterResults.map((exporter) => (
                <article key={exporter.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 gap-3">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-slate-100 text-navy"><Building2 size={21} /></div>
                      <div className="min-w-0">
                        <h2 className="truncate text-lg font-black text-navy">{exporter.name}</h2>
                        <p className="mt-1 text-xs font-semibold text-slate-500">{exporter.location}</p>
                      </div>
                    </div>
                    {exporter.verified ? <StatusBadge icon={ShieldCheck} label={copy.verified} tone="teal" /> : <StatusBadge icon={CircleAlert} label="Review" tone="amber" />}
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{localize(exporter.summary, locale)}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {exporter.products.map((item) => <Tag key={localize(item, locale)}>{localize(item, locale)}</Tag>)}
                    {exporter.certifications.map((item) => <Tag key={item} tone="teal">{item}</Tag>)}
                  </div>
                  <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-slate-100 pt-4">
                    <DataPoint label={copy.capacity} value={exporter.capacity} />
                    <DataPoint label={copy.markets} value={exporter.markets.join(", ")} />
                    <DataPoint label={copy.assessment} value={`${exporter.readinessScore}/100`} />
                  </dl>
                  <a href={whatsappUrl(`Hello bece.asia, I want to send an inquiry regarding exporter profile ${exporter.name}.`)} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 rounded-md bg-navy px-4 py-2.5 text-sm font-bold text-white hover:bg-navy-light">
                    {copy.inquire}<ExternalLink size={15} />
                  </a>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {activeTab === "buyers" ? (
          <section>
            <WorkspaceHeading icon={Target} title={copy.buyers} description={copy.buyerSummary} />
            <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold leading-6 text-amber-900">
              <span className="inline-flex items-center gap-2"><CircleAlert size={17} />{copy.demoNotice}</span>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-[1fr_220px]">
              <SearchBar value={search} onChange={setSearch} placeholder={copy.search} compact />
              <select value={country} onChange={(event) => setCountry(event.target.value)} className="h-12 rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-navy outline-none focus:border-teal">
                <option value="">{copy.allCountries}</option>
                {Array.from(new Set(buyerSignals.map((item) => item.country))).sort().map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
            <div className="mt-5 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              <div className="hidden grid-cols-[1.3fr_0.75fr_1fr_0.55fr_130px] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] text-slate-500 lg:grid">
                <span>Buyer signal</span><span>{copy.buyerInterest}</span><span>{copy.capacity}</span><span>{copy.quality}</span><span />
              </div>
              {buyerResults.map((buyer) => {
                const saved = savedBuyerIds.includes(buyer.id);
                return (
                  <article key={buyer.id} className="grid gap-4 border-b border-slate-100 px-5 py-4 last:border-0 lg:grid-cols-[1.3fr_0.75fr_1fr_0.55fr_130px] lg:items-center">
                    <div>
                      <div className="flex items-center gap-2"><h2 className="font-black text-navy">{buyer.name}</h2><span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-black uppercase text-amber-800">Demo</span></div>
                      <p className="mt-1 text-xs font-semibold text-slate-500">{buyer.country} · {localize(buyer.industry, locale)} · {localize(buyer.channel, locale)}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5">{buyer.interests.map((item) => <Tag key={localize(item, locale)}>{localize(item, locale)}</Tag>)}</div>
                    <p className="text-sm font-bold text-slate-700">{buyer.demand}</p>
                    <Score value={buyer.qualityScore} />
                    <button type="button" onClick={() => setSavedBuyers(saved ? savedBuyerIds.filter((id) => id !== buyer.id) : [...savedBuyerIds, buyer.id])} className={`inline-flex h-10 items-center justify-center gap-2 rounded-md border px-3 text-xs font-bold transition ${saved ? "border-teal bg-teal/10 text-teal" : "border-slate-200 text-slate-600 hover:border-teal hover:text-teal"}`}>
                      {saved ? <Check size={15} /> : <Heart size={15} />}{saved ? copy.saved : copy.saveLead}
                    </button>
                  </article>
                );
              })}
            </div>
          </section>
        ) : null}

        {activeTab === "learning" ? (
          <section>
            <WorkspaceHeading icon={GraduationCap} title={copy.learning} description={copy.learningSummary} />
            <div className="mt-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{copy.missionProgress}</p><p className="mt-1 text-3xl font-black text-navy">{learningProgress}%</p></div>
                <p className="text-sm font-bold text-slate-500">{completedMissionIds.length}/{allMissions.length}</p>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded bg-slate-100"><div className="h-full bg-teal transition-all" style={{ width: `${learningProgress}%` }} /></div>
            </div>
            <div className="mt-5 grid gap-4 lg:grid-cols-2">
              {learningLevels.map((level) => {
                const completed = level.missions.filter((mission) => completedMissionIds.includes(mission.id)).length;
                return (
                  <article key={level.id} className="rounded-lg border border-slate-200 bg-white shadow-sm">
                    <div className="flex items-start gap-4 border-b border-slate-100 p-5">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-navy font-black text-white">{level.level}</div>
                      <div><h2 className="text-lg font-black text-navy">{localize(level.title, locale)}</h2><p className="mt-1 text-sm leading-6 text-slate-600">{localize(level.description, locale)}</p><p className="mt-2 text-xs font-bold text-teal">{completed}/{level.missions.length} complete</p></div>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {level.missions.map((mission) => {
                        const done = completedMissionIds.includes(mission.id);
                        return (
                          <label key={mission.id} className="flex cursor-pointer items-start gap-3 p-5 transition hover:bg-slate-50">
                            <input type="checkbox" checked={done} onChange={() => setCompletedMissions(done ? completedMissionIds.filter((id) => id !== mission.id) : [...completedMissionIds, mission.id])} className="mt-1 h-4 w-4 accent-teal" />
                            <span className="min-w-0 flex-1">
                              <span className={`block text-sm font-black ${done ? "text-slate-400 line-through" : "text-navy"}`}>{localize(mission.title, locale)}</span>
                              <span className="mt-1 block text-xs leading-5 text-slate-500">{localize(mission.description, locale)}</span>
                              <span className="mt-2 flex flex-wrap items-center gap-2 text-[11px] font-bold text-slate-500"><span>{mission.minutes} {copy.minutes}</span><span>·</span><span>{copy.evidence}: {localize(mission.evidence, locale)}</span></span>
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ) : null}
      </section>
    </main>
  );
}

function MarketWorkspace({ locale, copy, markets, selectedMarket, search, product, country, products, countries, onSearch, onProduct, onCountry, onSelect }: {
  locale: Locale;
  copy: Record<string, string>;
  markets: MarketIntelligenceRecord[];
  selectedMarket?: MarketIntelligenceRecord;
  search: string;
  product: string;
  country: string;
  products: Array<[string, string]>;
  countries: string[];
  onSearch: (value: string) => void;
  onProduct: (value: string) => void;
  onCountry: (value: string) => void;
  onSelect: (value: string) => void;
}) {
  return (
    <section>
      <WorkspaceHeading icon={LineChart} title={copy.market} description={locale === "id" ? "Data terstruktur produk-negara untuk keputusan awal pasar, kepatuhan, dan jalur buyer." : locale === "zh" ? "面向市场选择、合规及买家渠道决策的结构化产品与国家数据。" : "Structured product-country data for early market, compliance, and buyer-channel decisions."} />
      <div className="mt-5 grid gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm md:grid-cols-[1fr_210px_210px]">
        <SearchBar value={search} onChange={onSearch} placeholder={copy.search} compact />
        <select value={product} onChange={(event) => onProduct(event.target.value)} className="h-12 rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-navy outline-none focus:border-teal">
          <option value="">{copy.allProducts}</option>{products.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
        <select value={country} onChange={(event) => onCountry(event.target.value)} className="h-12 rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-navy outline-none focus:border-teal">
          <option value="">{copy.allCountries}</option>{countries.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </div>
      {selectedMarket ? (
        <div className="mt-5 grid gap-5 xl:grid-cols-[380px_1fr]">
          <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-500"><span>{markets.length} records</span><Filter size={15} /></div>
            <div className="max-h-[660px] overflow-y-auto">
              {markets.map((market) => <MarketRow key={market.id} market={market} locale={locale} active={selectedMarket.id === market.id} onClick={() => onSelect(market.id)} copy={copy} />)}
            </div>
          </div>
          <MarketDetail market={selectedMarket} locale={locale} copy={copy} />
        </div>
      ) : <EmptyState label={copy.noResults} />}
    </section>
  );
}

function MarketRow({ market, locale, active, onClick, copy }: { market: MarketIntelligenceRecord; locale: Locale; active: boolean; onClick: () => void; copy: Record<string, string> }) {
  return (
    <button type="button" onClick={onClick} className={`w-full border-b border-slate-100 p-4 text-left transition last:border-0 ${active ? "bg-teal/10" : "hover:bg-slate-50"}`}>
      <div className="flex items-start justify-between gap-3"><div><p className="text-sm font-black text-navy">{localize(market.productLabel, locale)}</p><p className="mt-1 text-xs font-semibold text-slate-500">{market.country} · HS {market.hsCode}</p></div><ChevronRight size={18} className={active ? "text-teal" : "text-slate-300"} /></div>
      <div className="mt-3 grid grid-cols-3 gap-2"><MiniMetric label={copy.demand} value={`${market.demandScore}`} /><MiniMetric label={copy.growth} value={`+${market.growth}%`} /><MiniMetric label={copy.risk} value={copy[market.risk]} /></div>
    </button>
  );
}

function MarketDetail({ market, locale, copy }: { market: MarketIntelligenceRecord; locale: Locale; copy: Record<string, string> }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-teal"><span className="rounded bg-navy px-2 py-1 text-white">{market.countryCode}</span><span>HS {market.hsCode}</span></div><h2 className="mt-3 text-2xl font-black text-navy sm:text-3xl">{localize(market.productLabel, locale)} · {market.country}</h2></div>
          <Score value={market.demandScore} large />
        </div>
        <p className="mt-4 max-w-4xl text-sm leading-6 text-slate-600">{localize(market.opportunity, locale)}</p>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4"><DataTile label={copy.demand} value={`${market.demandScore}/100`} /><DataTile label={copy.growth} value={`+${market.growth}%`} /><DataTile label={copy.risk} value={copy[market.risk]} /><DataTile label="Price signal" value={market.priceSignal} /></div>
      </div>
      <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-2">
        <DetailBlock title={copy.requirements} icon={ShieldCheck}>{market.regulations.map((item) => <ListItem key={localize(item, locale)}>{localize(item, locale)}</ListItem>)}</DetailBlock>
        <DetailBlock title={copy.certifications} icon={Check}>{market.certifications.map((item) => <ListItem key={item}>{item}</ListItem>)}</DetailBlock>
        <DetailBlock title={copy.channels} icon={Users}>{market.buyerChannels.map((item) => <ListItem key={localize(item, locale)}>{localize(item, locale)}</ListItem>)}</DetailBlock>
        <DetailBlock title={copy.competitors} icon={BarChart3}>{market.competitors.map((item) => <ListItem key={item}>{item}</ListItem>)}</DetailBlock>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:px-6">
        <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{copy.source}</p><p className="mt-1 text-xs font-semibold text-slate-600">{market.sourceLabel} · {copy.updated} {market.updatedAt}</p></div>
        {market.sourceUrl ? <Link href={localePath(locale, market.sourceUrl)} className="inline-flex items-center gap-2 rounded-md bg-navy px-4 py-2.5 text-sm font-bold text-white hover:bg-navy-light">{copy.openBrief}<ArrowRight size={15} /></Link> : <span className="inline-flex items-center gap-2 text-xs font-bold text-slate-500"><CircleAlert size={15} />{copy.confidence}: {copy[market.confidence]}</span>}
      </div>
    </article>
  );
}

function Metric({ icon: Icon, label, value, detail }: { icon: typeof Globe2; label: string; value: string; detail: string }) { return <div className="bg-white/5 p-4"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-400"><Icon size={15} className="text-teal" />{label}</div><div className="mt-3 flex items-end justify-between gap-3"><span className="text-2xl font-black text-white">{value}</span><span className="text-xs font-semibold text-slate-400">{detail}</span></div></div>; }
function WorkspaceHeading({ icon: Icon, title, description }: { icon: typeof Building2; title: string; description: string }) { return <div className="flex items-start gap-3"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-navy text-white"><Icon size={21} /></div><div><h2 className="text-2xl font-black text-navy">{title}</h2><p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">{description}</p></div></div>; }
function SearchBar({ value, onChange, placeholder, compact = false }: { value: string; onChange: (value: string) => void; placeholder: string; compact?: boolean }) { return <label className={`flex h-12 items-center gap-3 rounded-md border border-slate-200 bg-white px-3 focus-within:border-teal ${compact ? "" : "mt-5 max-w-2xl"}`}><Search size={18} className="shrink-0 text-slate-400" /><input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="min-w-0 flex-1 bg-transparent text-sm text-navy outline-none placeholder:text-slate-400" /></label>; }
function StatusBadge({ icon: Icon, label, tone }: { icon: typeof ShieldCheck; label: string; tone: "teal" | "amber" }) { return <span className={`inline-flex shrink-0 items-center gap-1.5 rounded px-2 py-1 text-[10px] font-black uppercase ${tone === "teal" ? "bg-teal/10 text-teal" : "bg-amber-100 text-amber-800"}`}><Icon size={12} />{label}</span>; }
function Tag({ children, tone = "slate" }: { children: ReactNode; tone?: "slate" | "teal" }) { return <span className={`rounded px-2 py-1 text-[11px] font-bold ${tone === "teal" ? "bg-teal/10 text-teal" : "bg-slate-100 text-slate-600"}`}>{children}</span>; }
function DataPoint({ label, value }: { label: string; value: string }) { return <div className="min-w-0"><dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">{label}</dt><dd className="mt-1 break-words text-xs font-black text-navy">{value}</dd></div>; }
function MiniMetric({ label, value }: { label: string; value: string }) { return <div><p className="truncate text-[9px] font-bold uppercase text-slate-400">{label}</p><p className="mt-0.5 text-xs font-black text-navy">{value}</p></div>; }
function DataTile({ label, value }: { label: string; value: string }) { return <div className="rounded-md border border-slate-200 bg-slate-50 p-3"><p className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500">{label}</p><p className="mt-1 break-words text-sm font-black text-navy">{value}</p></div>; }
function Score({ value, large = false }: { value: number; large?: boolean }) { const tone = value >= 85 ? "bg-emerald-100 text-emerald-800" : value >= 75 ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-700"; return <span className={`inline-grid place-items-center rounded-md font-black ${tone} ${large ? "h-14 w-14 text-lg" : "h-9 min-w-9 px-2 text-xs"}`}>{value}</span>; }
function DetailBlock({ title, icon: Icon, children }: { title: string; icon: typeof Check; children: ReactNode }) { return <section><h3 className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-navy"><Icon size={16} className="text-teal" />{title}</h3><ul className="mt-3 space-y-2">{children}</ul></section>; }
function ListItem({ children }: { children: ReactNode }) { return <li className="flex gap-2 text-sm leading-6 text-slate-600"><Check size={15} className="mt-1 shrink-0 text-teal" /><span>{children}</span></li>; }
function EmptyState({ label }: { label: string }) { return <div className="mt-5 grid min-h-60 place-items-center rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center"><div><Search className="mx-auto text-slate-300" /><p className="mt-3 text-sm font-bold text-slate-500">{label}</p></div></div>; }

function filterExporters(search: string, locale: Locale) {
  const query = search.trim().toLowerCase();
  if (!query) return exporterProfiles;
  return exporterProfiles.filter((item) => [item.name, item.location, ...item.products.map((product) => localize(product, locale)), ...item.markets].some((value) => value.toLowerCase().includes(query)));
}

function filterBuyers(search: string, country: string, locale: Locale) {
  const query = search.trim().toLowerCase();
  return buyerSignals.filter((item) => (!country || item.country === country) && (!query || [item.name, item.country, localize(item.industry, locale), ...item.interests.map((interest) => localize(interest, locale))].some((value) => value.toLowerCase().includes(query))));
}

function readStoredIds(key: string): string[] {
  try {
    const value = JSON.parse(window.localStorage.getItem(key) ?? "[]");
    return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}
