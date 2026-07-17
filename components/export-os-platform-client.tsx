"use client";

import { ArrowRight, BarChart3, Brain, BriefcaseBusiness, Calculator, CheckCircle2, CircleDollarSign, Database, FileCheck2, Globe2, GraduationCap, Layers3, LineChart, LockKeyhole, Network, Search, ShieldCheck, ShoppingBag, Sparkles, Users, Workflow } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Locale } from "@/data/apps";
import { databaseFoundation, exportOsCopy, exportOsFeatures, exportOsMetrics, getOpportunity, monetizationModel, opportunityRecommendations, phaseLabel } from "@/data/export-os";
import { whatsappUrl } from "@/data/contact";
import { localePath } from "@/lib/routes";

const readinessItems = [
  { key: "legal", label: "NIB and company legality", segment: "Legal", points: 18 },
  { key: "product", label: "Stable product quality and capacity", segment: "Product", points: 16 },
  { key: "packaging", label: "Export-ready packaging and label", segment: "Product", points: 14 },
  { key: "certification", label: "Relevant certification or test report", segment: "Compliance", points: 16 },
  { key: "hs", label: "Known HS code and product classification", segment: "Knowledge", points: 12 },
  { key: "payment", label: "Understands Incoterms and payment risk", segment: "Knowledge", points: 12 },
  { key: "buyer", label: "Has target country or buyer profile", segment: "Market", points: 12 },
];

const phaseMeta = {
  "phase-1": {
    title: "Export discovery and readiness",
    window: "0-3 months",
    icon: Search,
    goal: "Acquire users, diagnose companies, and turn traffic into structured exporter data.",
  },
  "phase-2": {
    title: "Export intelligence ecosystem",
    window: "3-9 months",
    icon: LineChart,
    goal: "Build the data layer, supplier trust layer, buyer intelligence, and learning journey.",
  },
  "phase-3": {
    title: "Marketplace and operating system",
    window: "9-18 months",
    icon: Workflow,
    goal: "Operate buyer matching, CRM, compliance automation, and verified exporter workflows.",
  },
};

const productOptions = opportunityRecommendations.map((item) => ({ value: item.product, label: item.label }));

export function ExportOsPlatformClient({ locale }: { locale: Locale }) {
  const copy = exportOsCopy[locale];
  const [readiness, setReadiness] = useState<Record<string, boolean>>({
    legal: true,
    product: true,
    packaging: false,
    certification: false,
    hs: true,
    payment: false,
    buyer: true,
  });
  const [product, setProduct] = useState(productOptions[0].value);
  const [quantity, setQuantity] = useState(500);
  const [unitCost, setUnitCost] = useState(80000);
  const [sellingPrice, setSellingPrice] = useState(125000);
  const [freight, setFreight] = useState(4500000);
  const [documents, setDocuments] = useState(2500000);
  const [advisorInput, setAdvisorInput] = useState("I have Indonesian coffee and want to export to Japan.");

  const score = useMemo(
    () => readinessItems.reduce((total, item) => total + (readiness[item.key] ? item.points : 0), 0),
    [readiness],
  );

  const opportunity = getOpportunity(product);
  const revenue = quantity * sellingPrice;
  const totalCost = quantity * unitCost + freight + documents;
  const margin = revenue - totalCost;
  const marginRate = revenue > 0 ? Math.round((margin / revenue) * 100) : 0;
  const fobUnit = Math.round((quantity * unitCost + documents) / Math.max(quantity, 1));
  const cifUnit = Math.round(totalCost / Math.max(quantity, 1));

  const missingItems = readinessItems.filter((item) => !readiness[item.key]);
  const plan = buildAdvisorPlan(advisorInput);

  return (
    <div className="bg-soft">
      <section className="border-b border-slate-200 bg-navy text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-teal">
              <Sparkles size={16} />
              {copy.eyebrow}
            </div>
            <h1 className="mt-7 max-w-5xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">{copy.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{copy.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#readiness" className="inline-flex items-center gap-2 rounded-full bg-teal px-5 py-3 text-sm font-bold text-white transition hover:bg-teal/90">
                {copy.primaryCta}
                <ArrowRight size={16} />
              </a>
              <a href="#architecture" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/15">
                {copy.secondaryCta}
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-soft">
            <div className="grid gap-3 sm:grid-cols-2">
              {exportOsMetrics.map((metric) => (
                <div key={metric.label} className="rounded-3xl border border-white/10 bg-white/10 p-5">
                  <p className="text-3xl font-black text-white">{metric.value}</p>
                  <p className="mt-2 text-sm font-bold text-teal">{metric.label}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-300">{metric.detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-3xl border border-white/10 bg-white/10 p-5">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">Product DNA</p>
              <div className="mt-4 grid gap-3 text-sm text-slate-200">
                {["Bloomberg-grade market intelligence", "Duolingo-style learning journey", "Shopify-like business enablement", "LinkedIn-like exporter-buyer network"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-teal" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-3">
          {(Object.keys(phaseMeta) as Array<keyof typeof phaseMeta>).map((phase) => {
            const meta = phaseMeta[phase];
            const Icon = meta.icon;
            return (
              <div key={phase} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-teal/10 text-teal">
                    <Icon size={24} />
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{meta.window}</span>
                </div>
                <p className="mt-5 text-sm font-bold uppercase tracking-[0.22em] text-teal">{phaseLabel(phase)}</p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-navy">{meta.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{meta.goal}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="readiness" className="border-y border-slate-200 bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro eyebrow={copy.tools} title={copy.workspace} description="Phase 1 starts with practical tools that diagnose a business, reveal possible markets, estimate costs, and generate an action plan." />
          <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-slate-200 bg-soft p-6">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-teal">{copy.readiness}</p>
                  <h3 className="mt-2 text-3xl font-black tracking-tight text-navy">{score}/100</h3>
                </div>
                <div className="grid h-16 w-16 place-items-center rounded-3xl bg-navy text-white">
                  <ShieldCheck size={30} />
                </div>
              </div>
              <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-gradient-to-r from-teal to-gold" style={{ width: `${score}%` }} />
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">{score >= 75 ? "Strong export potential. Focus on buyer validation and compliance depth." : score >= 55 ? "Promising, but the business needs focused improvements before serious buyer outreach." : "Early stage. Start with legality, product consistency, packaging, and export basics."}</p>
              <div className="mt-5 grid gap-3">
                {readinessItems.map((item) => (
                  <label key={item.key} className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-white p-3">
                    <input
                      type="checkbox"
                      checked={readiness[item.key]}
                      onChange={(event) => setReadiness((current) => ({ ...current, [item.key]: event.target.checked }))}
                      className="mt-1 h-4 w-4 accent-teal"
                    />
                    <span>
                      <span className="block text-sm font-bold text-navy">{item.label}</span>
                      <span className="text-xs font-semibold text-slate-500">{item.segment} +{item.points}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid gap-6">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-teal">Priority action plan</p>
                <div className="mt-4 grid gap-3">
                  {(missingItems.length ? missingItems : readinessItems.slice(0, 3)).slice(0, 4).map((item, index) => (
                    <div key={item.key} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-navy text-xs font-black text-white">{index + 1}</span>
                      <div>
                        <p className="text-sm font-bold text-navy">{missingItems.length ? item.label : `Maintain ${item.segment.toLowerCase()} readiness`}</p>
                        <p className="mt-1 text-xs leading-5 text-slate-500">Turn this into a mission in the learning path and attach evidence to the company workspace.</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-slate-200 bg-navy p-6 text-white shadow-sm">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-teal">{copy.advisor}</p>
                <textarea
                  value={advisorInput}
                  onChange={(event) => setAdvisorInput(event.target.value)}
                  className="mt-4 min-h-24 w-full rounded-2xl border border-white/10 bg-white/10 p-4 text-sm leading-6 text-white outline-none placeholder:text-slate-400"
                  placeholder="Example: I have coconut sugar and want to export to UAE."
                />
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                  {plan.map((item) => (
                    <div key={item.title} className="rounded-2xl bg-white/10 p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">{item.title}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-200">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-teal">{copy.opportunity}</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-navy">Product to market matching</h2>
              </div>
              <Globe2 className="h-10 w-10 text-teal" />
            </div>
            <select value={product} onChange={(event) => setProduct(event.target.value)} className="mt-5 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-navy outline-none">
              {productOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            <div className="mt-5 grid gap-4">
              {opportunity.countries.map((country) => (
                <div key={country.country} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-xl font-black text-navy">{country.country}</h3>
                    <span className="rounded-full bg-teal/10 px-3 py-1 text-xs font-black text-teal">Fit score {country.score}</span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{country.demand}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {country.requirements.map((requirement) => (
                      <span key={requirement} className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">{requirement}</span>
                    ))}
                  </div>
                  <p className="mt-4 text-sm font-bold text-navy">Buyer: <span className="font-semibold text-slate-600">{country.buyer}</span></p>
                  <p className="mt-2 text-sm font-bold text-navy">Strategy: <span className="font-semibold text-slate-600">{country.strategy}</span></p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-teal">{copy.calculator}</p>
                <h2 className="mt-2 text-3xl font-black tracking-tight text-navy">FOB/CIF margin simulator</h2>
              </div>
              <Calculator className="h-10 w-10 text-teal" />
            </div>
            <div className="mt-5 grid gap-3">
              <NumberField label="Quantity" value={quantity} setValue={setQuantity} suffix="kg" />
              <NumberField label="Production cost / kg" value={unitCost} setValue={setUnitCost} prefix="Rp" />
              <NumberField label="Target selling price / kg" value={sellingPrice} setValue={setSellingPrice} prefix="Rp" />
              <NumberField label="Freight estimate" value={freight} setValue={setFreight} prefix="Rp" />
              <NumberField label="Documents and certification" value={documents} setValue={setDocuments} prefix="Rp" />
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <ResultTile label="FOB unit" value={`Rp${formatNumber(fobUnit)}`} />
              <ResultTile label="CIF unit" value={`Rp${formatNumber(cifUnit)}`} />
              <ResultTile label="Estimated margin" value={`Rp${formatNumber(margin)}`} tone={margin >= 0 ? "good" : "bad"} />
              <ResultTile label="Margin rate" value={`${marginRate}%`} tone={marginRate >= 15 ? "good" : "bad"} />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionIntro eyebrow={copy.roadmap} title="Feature roadmap and technical brief" description="Each module is designed as part of one operating system: diagnosis, intelligence, network, transactions, and daily export operations." />
          <div className="mt-8 grid gap-5">
            {exportOsFeatures.map((feature) => (
              <FeatureBrief key={feature.name} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      <section id="architecture" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-navy p-6 text-white shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-teal">{copy.architecture}</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">Modern SaaS platform architecture</h2>
            <div className="mt-6 grid gap-4">
              {[
                ["Frontend", "Next.js App Router, Tailwind, server components, interactive client islands."],
                ["Data", "Postgres for core records, search index for buyers/exporters, object storage for documents."],
                ["AI", "LLM gateway with RAG over market intelligence, regulations, and company context."],
                ["Billing", "Subscription plans, report purchases, AI credits, lead credits, verification fees."],
                ["Trust", "Verification workflow, audit logs, source confidence, role-based access."],
              ].map(([title, body]) => (
                <div key={title} className="flex gap-3 rounded-2xl bg-white/10 p-4">
                  <Layers3 className="mt-1 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <p className="font-bold">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-300">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-teal">{copy.database}</p>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {databaseFoundation.map(([table, purpose]) => (
                  <div key={table} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="font-mono text-sm font-black text-navy">{table}</p>
                    <p className="mt-2 text-xs leading-5 text-slate-600">{purpose}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-teal">{copy.monetization}</p>
              <div className="mt-5 grid gap-3">
                {monetizationModel.map(([planName, body]) => (
                  <div key={planName} className="flex gap-3 rounded-2xl bg-slate-50 p-4">
                    <CircleDollarSign className="mt-1 h-5 w-5 shrink-0 text-teal" />
                    <div>
                      <p className="font-bold text-navy">{planName}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] bg-gradient-to-br from-navy to-navy-light p-7 text-white shadow-soft">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-teal">{copy.nextBuild}</p>
            <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_0.65fr] lg:items-end">
              <div>
                <h2 className="text-3xl font-black tracking-tight sm:text-4xl">Build the intelligence layer first, then activate the marketplace.</h2>
                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">The moat is company readiness data, product-country intelligence, buyer signals, and workflow history. Marketplace liquidity becomes easier once BECE owns this data layer.</p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Link href={localePath(locale, "/export-os/intelligence")} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-navy transition hover:bg-slate-100">
                  {locale === "id" ? "Buka Phase 2 Workspace" : locale === "zh" ? "打开第二阶段工作台" : "Open Phase 2 Workspace"}
                  <ArrowRight size={16} />
                </Link>
                <a href={whatsappUrl("Hello bece.asia, I want to discuss the BECE Export OS SaaS roadmap and implementation.")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/15">
                  Consult BECE
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="max-w-4xl">
      <p className="text-sm font-bold uppercase tracking-[0.24em] text-teal">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-navy sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>
    </div>
  );
}

function FeatureBrief({ feature }: { feature: (typeof exportOsFeatures)[number] }) {
  const icons = [BriefcaseBusiness, Database, BarChart3, Brain, LockKeyhole, ShoppingBag, Users, GraduationCap, Network, Workflow, FileCheck2, ShieldCheck];
  const Icon = icons[Math.abs(feature.name.length) % icons.length];

  return (
    <article className="rounded-[2rem] border border-slate-200 bg-soft p-5">
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-3xl bg-white p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-teal/10 text-teal">
              <Icon size={24} />
            </div>
            <span className="rounded-full bg-navy px-3 py-1 text-xs font-bold text-white">{phaseLabel(feature.phase)}</span>
          </div>
          <h3 className="mt-5 text-2xl font-black tracking-tight text-navy">{feature.name}</h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">{feature.tagline}</p>
          <div className="mt-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">User flow</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {feature.userFlow.map((step) => (
                <span key={step} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{step}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <BriefBox title="Database structure" body={feature.database.join(", ")} />
          <BriefBox title="UI/UX concept" body={feature.uiUx} />
          <BriefBox title="Technical architecture" body={feature.architecture} />
          <BriefBox title="API requirement" body={feature.api.join(" | ")} mono />
          <BriefBox title="Monetization" body={feature.monetization} />
          <BriefBox title="Scalability" body={feature.scalability} />
        </div>
      </div>
    </article>
  );
}

function BriefBox({ title, body, mono = false }: { title: string; body: string; mono?: boolean }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal">{title}</p>
      <p className={`mt-3 text-sm leading-6 text-slate-600 ${mono ? "font-mono text-xs" : ""}`}>{body}</p>
    </div>
  );
}

function NumberField({ label, value, setValue, prefix, suffix }: { label: string; value: number; setValue: (value: number) => void; prefix?: string; suffix?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{label}</span>
      <div className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
        {prefix ? <span className="text-sm font-bold text-slate-500">{prefix}</span> : null}
        <input
          type="number"
          min="0"
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
          className="w-full bg-transparent py-1 text-sm font-bold text-navy outline-none"
        />
        {suffix ? <span className="text-sm font-bold text-slate-500">{suffix}</span> : null}
      </div>
    </label>
  );
}

function ResultTile({ label, value, tone = "neutral" }: { label: string; value: string; tone?: "neutral" | "good" | "bad" }) {
  const toneClass = tone === "good" ? "text-teal" : tone === "bad" ? "text-red-600" : "text-navy";
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{label}</p>
      <p className={`mt-2 text-xl font-black ${toneClass}`}>{value}</p>
    </div>
  );
}

function buildAdvisorPlan(input: string) {
  const lower = input.toLowerCase();
  const product = lower.includes("coffee") ? "specialty coffee" : lower.includes("coconut") ? "coconut product" : lower.includes("spice") ? "spice product" : "export product";
  const market = lower.includes("japan") ? "Japan" : lower.includes("uae") || lower.includes("dubai") ? "UAE" : lower.includes("hong") ? "Hong Kong" : "target market";

  return [
    { title: "Diagnosis", body: `Your ${product} can be positioned for ${market}, but buyer proof and compliance evidence must be prepared.` },
    { title: "30 days", body: "Confirm HS code, product specification, shelf life, packaging, and basic export documents." },
    { title: "60-90 days", body: "Prepare sample shipment, shortlist buyers, track outreach in CRM, and validate landed cost." },
  ];
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 }).format(value);
}
