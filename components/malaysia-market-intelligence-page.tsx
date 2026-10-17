import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Globe2, Ship } from "lucide-react";
import type { Locale } from "@/data/apps";
import { malaysiaMarket as market } from "@/data/malaysia-market";
import { marketText } from "@/data/market-intelligence";
import { localePath } from "@/lib/routes";
import { PrintReportButton } from "./print-report-button";

const card = "rounded-3xl border border-slate-200 bg-white p-6 shadow-sm";
const body = "text-sm leading-7 text-slate-600";

function ReportSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-2xl font-black tracking-tight text-navy sm:text-3xl">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function SourceLinks({ ids }: { ids: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
      {ids.map((id) => {
        const source = market.sources.find((item) => item.id === id);
        return source ? (
          <a key={id} href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-bold text-teal underline underline-offset-4">
            {source.label}<ArrowUpRight aria-hidden="true" className="h-3 w-3 shrink-0" />
          </a>
        ) : null;
      })}
    </div>
  );
}

export function MalaysiaMarketIntelligencePage({ locale }: { locale: Locale }) {
  const l = (id: string, en: string, zh: string) => marketText({ id, en, zh }, locale);
  const sections = [
    ["overview", l("Ringkasan", "Overview", "概览")],
    ["products", l("Produk potensial", "Product fit", "潜力产品")],
    ["regions", l("Wilayah & kanal", "Regions & channels", "地区与渠道")],
    ["requirements", l("Persyaratan", "Requirements", "准入要求")],
    ["partners", l("Calon mitra", "Potential partners", "潜在伙伴")],
    ["logistics", l("Logistik & risiko", "Logistics & risks", "物流与风险")],
    ["roadmap", l("Langkah masuk", "Entry roadmap", "进入步骤")],
    ["faq", "FAQ"],
    ["sources", l("Sumber", "Sources", "来源")],
  ];

  return (
    <div className="bg-soft">
      <section className="border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(0,169,157,0.16),transparent_40%),linear-gradient(135deg,#ffffff_0%,#eef7f5_60%,#f7fafc_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <Link href={localePath(locale, "/market-intelligence")} className="inline-flex items-center gap-2 text-sm font-bold text-teal">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />Market Intelligence
          </Link>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-teal">Export Market Intelligence · {l("Asia Tenggara", "Southeast Asia", "东南亚")}</p>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-navy sm:text-5xl">{marketText(market.title, locale)}</h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{marketText(market.description, locale)}</p>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600">
                <span className="rounded-full bg-white px-3 py-2">{l("Diperbarui", "Updated", "更新")}: <time dateTime={market.updatedAt}>{market.updatedAt}</time></span>
                <PrintReportButton locale={locale} />
              </div>
            </div>
            <div className="rounded-[2rem] bg-navy p-7 text-white shadow-soft">
              <div className="flex items-center justify-between gap-4"><Globe2 aria-hidden="true" className="h-9 w-9 text-gold" /><span className="text-sm font-semibold text-white/70">Indonesia → Malaysia</span></div>
              <p className="mt-7 text-3xl font-black">{l("Satu produk. Satu wilayah.", "One product. One region.", "一个产品，一个地区。")}</p>
              <p className="mt-4 text-sm leading-7 text-white/80">{marketText(market.summary, locale)}</p>
              <a href="#roadmap" className="mt-6 inline-flex items-center gap-2 rounded-full bg-teal px-5 py-3 text-sm font-bold text-white">{l("Siapkan langkah masuk", "Plan market entry", "规划市场进入")}<ArrowRight aria-hidden="true" className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <nav aria-label={l("Isi laporan Malaysia", "Malaysia report contents", "马来西亚报告目录")} className="mb-10 flex flex-wrap gap-2 print:hidden">
          {sections.map(([id, label]) => <a key={id} href={`#${id}`} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:border-teal hover:text-teal">{label}</a>)}
        </nav>
        <div className="space-y-14">
          <ReportSection id="overview" title={l("Malaysia sebagai tujuan ekspor", "Malaysia as an export destination", "马来西亚作为出口目的地")}>
            <p className="max-w-4xl text-base leading-8 text-slate-600">{marketText(market.intro, locale)}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {market.metrics.map((metric) => <div key={metric.label.en} className={card}><p className="text-2xl font-black text-navy">{metric.value}</p><p className="mt-2 text-sm leading-6 text-slate-600">{marketText(metric.label, locale)}</p><SourceLinks ids={[metric.source]} /></div>)}
            </div>
            <p className="mt-5 text-xs leading-6 text-slate-500">{marketText(market.dataNote, locale)}</p>
          </ReportSection>

          <ReportSection id="products" title={l("Produk Indonesia yang dapat ditelusuri", "Indonesian products to research", "可研究的印尼产品")}>
            <div className="grid gap-5 md:grid-cols-2">
              {market.products.map((product) => (
                <article key={product.hs} className={card}>
                  <span className="rounded-full bg-teal/10 px-3 py-1 text-xs font-bold text-teal">{l("Titik awal HS", "HS starting point", "HS初步参考")} {product.hs}</span>
                  <h3 className="mt-4 text-xl font-black text-navy">{marketText(product.name, locale)}</h3>
                  <p className={`mt-3 ${body}`}>{marketText(product.evidence, locale)}</p>
                  <SourceLinks ids={[product.source]} />
                  <p className="mt-5 text-xs font-bold uppercase tracking-wider text-teal">{l("Target kanal", "Target channel", "目标渠道")}</p>
                  <p className={`mt-1 ${body}`}>{marketText(product.buyer, locale)}</p>
                  <p className={`mt-3 border-t border-slate-100 pt-3 ${body}`}>{marketText(product.action, locale)}</p>
                </article>
              ))}
            </div>
          </ReportSection>

          <ReportSection id="regions" title={l("Pilih wilayah dan saluran masuk", "Choose a region and entry channel", "选择地区与进入渠道")}>
            <div className="grid gap-5 md:grid-cols-3">{market.regions.map((region) => <article key={region.title.en} className={card}><h3 className="text-lg font-black text-navy">{marketText(region.title, locale)}</h3><p className={`mt-3 ${body}`}>{marketText(region.body, locale)}</p></article>)}</div>
            <SourceLinks ids={["restrictions"]} />
          </ReportSection>

          <ReportSection id="requirements" title={l("Periksa persyaratan sebelum menawarkan", "Check requirements before quoting", "报价前核查准入要求")}>
            <div className="grid gap-5 md:grid-cols-2">{market.requirements.map((item) => <article key={item.title.en} className={card}><CheckCircle2 aria-hidden="true" className="h-6 w-6 text-teal" /><h3 className="mt-4 text-lg font-black text-navy">{marketText(item.title, locale)}</h3><p className={`mt-3 ${body}`}>{marketText(item.body, locale)}</p><SourceLinks ids={item.sources} /></article>)}</div>
          </ReportSection>

          <ReportSection id="partners" title={l("Temukan dan periksa calon mitra", "Find and verify potential partners", "寻找并核查潜在伙伴")}>
            <p className={`max-w-4xl ${body}`}>{marketText(market.partnerNote, locale)}</p>
            <SourceLinks ids={["ssm"]} />
            <div className="mt-6 grid gap-5 md:grid-cols-3">{market.partners.map((partner) => <article key={partner.name} className={card}><h3 className="text-lg font-black text-navy">{partner.name}</h3><p className={`mt-3 ${body}`}>{marketText(partner.channel, locale)}</p><a href={partner.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-teal underline underline-offset-4">{l("Profil perusahaan", "Company profile", "公司资料")}<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a></article>)}</div>
          </ReportSection>

          <ReportSection id="logistics" title={l("Hitung logistik dan kelola risiko", "Cost logistics and manage risks", "核算物流与管理风险")}>
            <div className="rounded-3xl bg-navy p-6 text-white sm:p-8"><Ship aria-hidden="true" className="h-8 w-8 text-gold" /><p className="mt-4 max-w-5xl text-sm leading-8 text-white/85">{marketText(market.logistics, locale)}</p></div>
            <div className="mt-5 grid gap-5 md:grid-cols-3">{market.risks.map((risk) => <article key={risk.title.en} className={card}><h3 className="text-lg font-black text-navy">{marketText(risk.title, locale)}</h3><p className={`mt-3 ${body}`}>{marketText(risk.body, locale)}</p></article>)}</div>
          </ReportSection>

          <ReportSection id="roadmap" title={l("Langkah awal masuk pasar Malaysia", "First steps into Malaysia", "进入马来西亚市场的初步步骤")}>
            <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{market.roadmap.map((step, index) => <li key={step.title.en} className={card}><span className="grid h-10 w-10 place-items-center rounded-2xl bg-teal/10 text-sm font-black text-teal">{index + 1}</span><h3 className="mt-4 text-lg font-black text-navy">{marketText(step.title, locale)}</h3><p className={`mt-3 ${body}`}>{marketText(step.body, locale)}</p></li>)}</ol>
            <Link href={localePath(locale, "/export-os")} className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-bold text-white hover:bg-navy-light">{l("Siapkan profil produk di Export OS", "Prepare your product profile in Export OS", "在Export OS准备产品资料")}<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
          </ReportSection>

          <ReportSection id="faq" title={l("Pertanyaan tentang ekspor ke Malaysia", "Malaysia export FAQ", "出口马来西亚常见问题")}>
            <div className="space-y-3">{market.faq.map((item) => <details key={item.q.en} className={card}><summary className="cursor-pointer font-bold text-navy">{marketText(item.q, locale)}</summary><p className={`mt-3 ${body}`}>{marketText(item.a, locale)}</p></details>)}</div>
          </ReportSection>

          <ReportSection id="sources" title={l("Sumber dan cakupan laporan", "Sources and report scope", "来源与报告范围")}>
            <div className={card}><p className={body}>{marketText(market.scope, locale)}</p><ul className="mt-5 grid gap-3 md:grid-cols-2">{market.sources.map((source) => <li key={source.id}><a href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-start gap-2 text-sm font-semibold text-teal underline underline-offset-4">{source.label}<ArrowUpRight aria-hidden="true" className="mt-1 h-3 w-3 shrink-0" /></a></li>)}</ul></div>
          </ReportSection>
        </div>
      </div>
    </div>
  );
}
