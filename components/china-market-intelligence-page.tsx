import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Globe2, Ship } from "lucide-react";
import type { Locale, Localized } from "@/data/apps";
import { chinaMarket as market, chinaSources } from "@/data/china-market";
import { marketText } from "@/data/market-intelligence";
import { localePath } from "@/lib/routes";
import { PrintReportButton } from "./print-report-button";

const card = "rounded-3xl border border-slate-200 bg-white p-6 shadow-sm";
const body = "text-sm leading-7 text-slate-600";
const sourcesById = new Map(chinaSources.map((source) => [source.id, source]));

function ReportSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <section id={id} className="scroll-mt-24"><h2 className="text-2xl font-black tracking-tight text-navy sm:text-3xl">{title}</h2><div className="mt-6">{children}</div></section>;
}

function SourceLinks({ ids }: { ids: string[] }) {
  return <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">{ids.map((id) => {
    const source = sourcesById.get(id);
    return source ? <a key={id} href={source.url} target="_blank" rel="noreferrer" className="inline-flex max-w-full items-start gap-1 text-xs font-bold text-teal underline underline-offset-4"><span className="min-w-0 break-words">{source.label}</span><ArrowUpRight aria-hidden="true" className="mt-0.5 h-3 w-3 shrink-0" /></a> : null;
  })}</div>;
}

export function ChinaMarketIntelligencePage({ locale }: { locale: Locale }) {
  const l = (id: string, en: string, zh: string) => marketText({ id, en, zh }, locale);
  const text = (value: Localized<string>) => marketText(value, locale);
  const number = (value: number, decimals = 1) => value.toLocaleString(locale === "id" ? "id-ID" : locale === "zh" ? "zh-CN" : "en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  const sections = [
    ["overview", l("Ringkasan", "Overview", "概览")], ["trade", l("Perdagangan", "Trade", "贸易")],
    ["products", l("Produk", "Products", "产品")], ["regions", l("Wilayah & kanal", "Regions & channels", "地区与渠道")],
    ["requirements", l("Persyaratan", "Requirements", "准入要求")], ["partners", l("Calon mitra", "Partner leads", "伙伴线索")],
    ["logistics", l("Logistik", "Logistics", "物流")], ["prices", l("Harga & biaya", "Prices & costs", "价格与成本")],
    ["roadmap", l("30–60–90 hari", "30–60–90 days", "30–60–90天")], ["faq", "FAQ"], ["sources", l("Sumber", "Sources", "来源")],
  ];

  return <div className="bg-soft">
    <section className="border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(0,169,157,0.16),transparent_40%),linear-gradient(135deg,#ffffff_0%,#eef7f5_60%,#f7fafc_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <Link href={localePath(locale, "/market-intelligence")} className="inline-flex items-center gap-2 text-sm font-bold text-teal"><ArrowLeft aria-hidden="true" className="h-4 w-4" />Market Intelligence</Link>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
          <div className="min-w-0"><p className="text-xs font-bold uppercase tracking-[0.24em] text-teal">Export Market Intelligence · {l("Asia Timur", "East Asia", "东亚")}</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight text-navy sm:text-5xl">{text(market.title)}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{text(market.description)}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600"><span className="rounded-full bg-white px-3 py-2">{l("Diperiksa", "Checked", "核查日期")}: <time dateTime={market.updatedAt}>{market.updatedAt}</time></span><PrintReportButton locale={locale} /></div>
          </div>
          <div className="rounded-[2rem] bg-navy p-7 text-white shadow-soft"><div className="flex items-center justify-between gap-4"><Globe2 aria-hidden="true" className="h-9 w-9 text-gold" /><span className="text-sm font-semibold text-white/70">Indonesia → China</span></div>
            <p className="mt-7 text-3xl font-black">{l("Satu produk. Satu segmen.", "One product. One segment.", "一个产品，一个细分市场。")}</p><p className="mt-4 text-sm leading-7 text-white/80">{text(market.summary)}</p>
            <a href="#roadmap" className="mt-6 inline-flex items-center gap-2 rounded-full bg-teal px-5 py-3 text-sm font-bold text-white">{l("Siapkan langkah masuk", "Plan market entry", "规划进入步骤")}<ArrowRight aria-hidden="true" className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </section>
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav aria-label={l("Isi riset China", "China report contents", "中国报告目录")} className="mb-10 flex flex-wrap gap-2 print:hidden">{sections.map(([id, label]) => <a key={id} href={`#${id}`} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:border-teal hover:text-teal">{label}</a>)}</nav>
      <div className="space-y-14">
        <ReportSection id="overview" title={l("China sebagai tujuan ekspor", "China as an export destination", "中国作为出口目的地")}>
          <p className="max-w-4xl text-base leading-8 text-slate-600">{text(market.intro)}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{market.metrics.map((metric) => <div key={metric.source} className={`${card} min-w-0`}><p className="text-2xl font-black text-navy">{text(metric.value)}</p><p className={`mt-2 ${body}`}>{text(metric.label)}</p><SourceLinks ids={[metric.source]} /></div>)}</div>
          <p className={`mt-5 ${body}`}>{l("Data tahunan memakai 2025 bila tersedia. Rincian rempah memakai 2024 dan pembaruan kopi memakai periode sama 2026/2025. Besarnya impor industri tidak sama dengan belanja konsumen. Prioritas di halaman ini adalah usulan uji, bukan skor atau jaminan penjualan.", "Annual data use 2025 where available. Spice detail uses 2024 and the coffee update compares matching 2026/2025 periods. Industrial imports are not consumer spending. Priorities here are test proposals, not scores or sales guarantees.", "年度数据尽量采用2025年，香料详情用2024年，咖啡更新按2026/2025年同期比较。工业进口不等于消费者支出，本页优先项为测试建议而非评分或销售保证。")}</p>
        </ReportSection>
        <ReportSection id="trade" title={l("Perdagangan Indonesia–China", "Indonesia–China trade", "印尼—中国贸易")}>
          <p className={body}>{text(market.tradeNote)}</p>
          <div className="mt-5 overflow-x-auto rounded-3xl border border-slate-200 bg-white"><table className="w-full min-w-[640px] text-left text-sm"><caption className="sr-only">{l("Perdagangan tahunan, juta USD", "Annual trade, USD million", "年度贸易，百万美元")}</caption><thead className="bg-navy text-white"><tr>{[l("Tahun", "Year", "年份"), l("Ekspor Indonesia", "Indonesia exports", "印尼出口"), l("Impor Indonesia", "Indonesia imports", "印尼进口"), l("Total", "Total", "总额"), l("Saldo Indonesia", "Indonesia balance", "印尼差额")].map((h) => <th key={h} scope="col" className="px-5 py-4">{h}</th>)}</tr></thead><tbody>{market.trade.map((row) => <tr key={row.year} className="border-t border-slate-100"><th scope="row" className="px-5 py-4 text-navy">{row.year}</th>{[row.exports, row.imports, row.exports + row.imports, row.exports - row.imports].map((value, i) => <td key={i} className="px-5 py-4 tabular-nums text-slate-600">{number(value)}</td>)}</tr>)}</tbody></table></div>
          <SourceLinks ids={["exports", "imports"]} />
        </ReportSection>
        <ReportSection id="products" title={l("Delapan kelompok untuk ditelusuri", "Eight product groups to investigate", "八类待研究产品")}>
          <div className="grid gap-5 md:grid-cols-2">{market.products.map((p) => <article key={p.name.en} className={`${card} min-w-0`}><span className="rounded-full bg-teal/10 px-3 py-1 text-xs font-bold text-teal">{l("Titik awal HS", "HS starting point", "HS初步参考")} {p.hs}</span><h3 className="mt-4 text-xl font-black text-navy">{text(p.name)}</h3><p className={`mt-3 ${body}`}>{text(p.evidence)}</p><p className={`mt-4 border-t border-slate-100 pt-4 ${body}`}>{text(p.action)}</p><SourceLinks ids={p.sources} /></article>)}</div>
        </ReportSection>
        <ReportSection id="regions" title={l("Pilih wilayah dan kanal", "Select a region and channel", "选择地区及渠道")}><div className="grid gap-5 md:grid-cols-3">{market.regions.map((r) => <article key={r.title.en} className={card}><h3 className="text-lg font-black text-navy">{text(r.title)}</h3><p className={`mt-3 ${body}`}>{text(r.body)}</p></article>)}</div><SourceLinks ids={["volcafe", "sucafina", "sinodiscontact", "blg"]} /></ReportSection>
        <ReportSection id="requirements" title={l("Periksa persyaratan sebelum menawarkan", "Check requirements before quoting", "报价前核查要求")}><div className="grid gap-5 md:grid-cols-2">{market.requirements.map((r) => <article key={r.title.en} className={card}><CheckCircle2 aria-hidden="true" className="h-6 w-6 text-teal" /><h3 className="mt-4 text-lg font-black text-navy">{text(r.title)}</h3><p className={`mt-3 ${body}`}>{text(r.body)}</p><SourceLinks ids={r.sources} /></article>)}</div></ReportSection>
        <ReportSection id="partners" title={l("Lima calon mitra untuk ditelusuri", "Five potential partner leads", "五个待核查伙伴线索")}>
          <p className={body}>{text(market.partnerNote)}</p><SourceLinks ids={["companycheck", "itpc"]} />
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{market.partners.map((p) => <article key={p.name} className={`${card} min-w-0`}><h3 className="text-lg font-black text-navy">{p.name}</h3><p className="mt-2 text-xs font-bold text-teal">{p.location}</p><p className={`mt-3 ${body}`}>{text(p.body)}</p><p className="mt-4 break-words text-xs leading-6 text-slate-600">{p.contact}</p><a href={p.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-teal underline">{l("Sumber perusahaan", "Company source", "公司来源")}<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a></article>)}</div>
        </ReportSection>
        <ReportSection id="logistics" title={l("Logistik dan permintaan quotation", "Logistics and quotation requests", "物流及询价")}>
          <div className="rounded-3xl bg-navy p-6 text-white sm:p-8"><Ship aria-hidden="true" className="h-8 w-8 text-gold" /><p className="mt-4 text-sm leading-8 text-white/85">{text(market.logistics)}</p></div>
          <div className={`mt-5 ${card}`}><h3 className="text-xl font-black text-navy">{l("Data yang dikirim ke forwarder", "Information for your forwarder", "给货代的资料")}</h3><p className={`mt-3 ${body}`}>{text(market.quotation)}</p></div>
        </ReportSection>
        <ReportSection id="prices" title={l("Pembanding harga dan simulasi biaya", "Price references and cost simulation", "价格参考及成本模拟")}>
          <p className={body}>{text(market.priceNote)}</p>
          <div className="mt-5 overflow-x-auto rounded-3xl border border-slate-200 bg-white"><table className="w-full min-w-[600px] text-left text-sm"><caption className="sr-only">{l("Harga referensi CNY, 23 Oktober 2026", "CNY reference prices, 23 October 2026", "人民币参考价，2026年10月23日")}</caption><thead className="bg-navy text-white"><tr>{[l("Produk", "Product", "产品"), l("Kemasan", "Pack", "规格"), "CNY", l("CNY per satuan", "CNY per unit", "单位人民币"), l("Sumber", "Source", "来源")].map((h) => <th key={h} scope="col" className="px-5 py-4">{h}</th>)}</tr></thead><tbody>{market.prices.map((p) => <tr key={p.name.en} className="border-t border-slate-100"><th scope="row" className="px-5 py-4 font-bold text-navy">{text(p.name)}</th><td className="px-5 py-4">{p.pack}</td><td className="px-5 py-4 tabular-nums">{number(p.price, 2)}</td><td className="px-5 py-4">{p.unit}</td><td className="px-5 py-4"><SourceLinks ids={[p.source]} /></td></tr>)}</tbody></table></div>
          <h3 className="mt-8 text-xl font-black text-navy">{l("Contoh arus kas sampai gudang", "Illustrative cash flow to warehouse", "至仓库现金流示例")}</h3><p className={`mt-3 ${body}`}>{text(market.costNote)}</p>
          <div className="mt-5 overflow-x-auto rounded-3xl border border-slate-200 bg-white"><table className="w-full min-w-[540px] text-left text-sm"><caption className="sr-only">{l("Simulasi hipotetis, CNY", "Hypothetical simulation, CNY", "假设模拟，人民币")}</caption><thead className="bg-navy text-white"><tr>{[l("Komponen", "Component", "项目"), l("A: bea 0%", "A: 0% duty", "A：关税0%"), l("B: bea 8%", "B: 8% duty", "B：关税8%")].map((h) => <th key={h} scope="col" className="px-5 py-4">{h}</th>)}</tr></thead><tbody>{market.costRows.map((r) => <tr key={r.label.en} className="border-t border-slate-100"><th scope="row" className="px-5 py-4 font-semibold text-navy">{text(r.label)}</th><td className="px-5 py-4 tabular-nums">{number(r.a, 2)}</td><td className="px-5 py-4 tabular-nums">{number(r.b, 2)}</td></tr>)}</tbody></table></div>
          <p className={`mt-4 ${body}`}>{text(market.costLimit)}</p><SourceLinks ids={["vat", "vatdetail"]} />
        </ReportSection>
        <ReportSection id="roadmap" title={l("Rencana 30–60–90 hari", "30–60–90 day plan", "30–60–90天计划")}><div className="grid gap-5 md:grid-cols-3">{market.roadmap.map((r) => <article key={r.days} className={card}><p className="text-xs font-bold uppercase tracking-wider text-teal">{l("Hari", "Days", "天")} {r.days}</p><h3 className="mt-3 text-xl font-black text-navy">{text(r.title)}</h3><p className={`mt-3 ${body}`}>{text(r.body)}</p></article>)}</div></ReportSection>
        <ReportSection id="faq" title={l("Pertanyaan yang sering diajukan", "Frequently asked questions", "常见问题")}><div className="space-y-3">{market.faq.map((f) => <details key={f.q.en} className="rounded-2xl border border-slate-200 bg-white px-6 py-4"><summary className="cursor-pointer font-bold text-navy">{text(f.q)}</summary><p className={`mt-3 ${body}`}>{text(f.a)}</p></details>)}</div></ReportSection>
        <ReportSection id="sources" title={l("Sumber dan tanggal pemeriksaan", "Sources and verification date", "来源及核查日期")}>
          <p className={body}>{l("Diperiksa 23 Oktober 2026. Tahun publikasi berbeda dari tahun data. Halaman BPS terbaca melalui indeks resmi, tetapi pembukaan langsung dibatasi saat riset. Data agregat, harga referensi, dan informasi perusahaan memiliki batas pemeriksaan yang dijelaskan di tiap bagian. Tarif final, akses per SKU, permintaan buyer dan freight aktual memerlukan konfirmasi transaksi.", "Checked 23 October 2026. Publication year differs from data year. BPS figures were available through the official index, while direct page access was restricted during research. Limits of aggregate data, reference prices and company information are explained in each section. Final tariffs, SKU access, buyer demand and actual freight require transaction-level confirmation.", "核查日期2026年10月23日。发布日期不等于数据年度。研究时BPS数字可通过官方索引读取，但网页直接访问受限。各节说明汇总数据、参考价及企业资料的核查范围。最终税率、SKU准入、买方需求及实际运费须按具体交易确认。")}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">{chinaSources.map((s) => <a key={s.id} href={s.url} target="_blank" rel="noreferrer" className="flex min-w-0 items-start justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm font-semibold text-teal hover:border-teal"><span className="min-w-0 break-words">{s.label}</span><ArrowUpRight aria-hidden="true" className="mt-1 h-4 w-4 shrink-0" /></a>)}</div>
        </ReportSection>
        <section className="rounded-3xl bg-navy p-7 text-white sm:p-10"><h2 className="text-2xl font-black">{l("Mulai dari produk Anda", "Start with your product", "从您的产品开始")}</h2><p className="mt-4 max-w-3xl text-sm leading-8 text-white/80">{l("Siapkan spesifikasi, kapasitas stabil, MOQ dan lokasi asal. Gunakan Custom Market & Supply Research untuk menelusuri pertanyaan pasar dan pasokan sesuai kebutuhan bisnis Anda.", "Prepare specifications, dependable capacity, MOQ and origin. Use Custom Market & Supply Research to investigate market and supply questions for your business.", "准备规格、稳定产能、最低订量及原产地。通过Custom Market & Supply Research研究符合您业务需要的市场与供应问题。")}</p><Link href={localePath(locale, "/services/custom-research")} className="mt-6 inline-flex items-center gap-2 rounded-full bg-teal px-6 py-3 text-sm font-bold text-white">{l("Lihat layanan riset khusus", "Explore custom research", "查看定制研究服务")}<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link></section>
      </div>
    </div>
  </div>;
}
