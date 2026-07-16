import { ArrowRight, BarChart3, Globe2, MapPinned, Search, Ship, Sparkles } from "lucide-react";
import Link from "next/link";
import type { Locale } from "@/data/apps";
import { marketCountries, marketText } from "@/data/market-intelligence";
import { localePath } from "@/lib/routes";

const copy = {
  id: {
    eyebrow: "Export Market Intelligence",
    title: "Pusat intelijen pasar ekspor bece.asia",
    description: "Kumpulan laporan negara tujuan ekspor untuk membantu UMKM, eksportir pemula, dan pelaku bisnis membaca peluang pasar, buyer channel, regulasi, dan strategi masuk.",
    badgeOne: "Country playbook",
    badgeTwo: "Buyer-ready insight",
    searchPlaceholder: "Negara potensial berikutnya akan ditambahkan di sini",
    featured: "Laporan negara",
    updated: "Diperbarui",
    opportunity: "Peluang",
    products: "Produk unggulan",
    openReport: "Buka laporan",
    nextTitle: "Negara berikutnya",
    nextBody: "Area ini disiapkan untuk update negara potensial ekspor lainnya. Setiap negara akan memiliki halaman sendiri dengan data produk, regulasi, buyer channel, risiko, dan strategi masuk pasar.",
    pipeline: ["Singapura", "Malaysia", "Tiongkok", "Jepang", "Uni Emirat Arab"],
    methodTitle: "Format laporan",
    methodDescription: "Setiap laporan dibuat sebagai market brief praktis, bukan artikel biasa, agar mudah dipakai untuk riset produk dan persiapan pitching ke buyer.",
    methods: [
      ["Market scan", "Ringkasan posisi pasar, karakter konsumsi, dan alasan negara tersebut menarik."],
      ["Product fit", "Produk Indonesia yang paling relevan, target buyer, hambatan masuk, dan positioning."],
      ["Entry roadmap", "Checklist regulasi, kanal buyer, risiko, dan langkah masuk pasar."]
    ],
  },
  en: {
    eyebrow: "Export Market Intelligence",
    title: "bece.asia export market intelligence hub",
    description: "A country-by-country export intelligence library for MSMEs, new exporters, and businesses to understand market opportunity, buyer channels, regulations, and entry strategy.",
    badgeOne: "Country playbook",
    badgeTwo: "Buyer-ready insight",
    searchPlaceholder: "Upcoming export markets will be added here",
    featured: "Country reports",
    updated: "Updated",
    opportunity: "Opportunity",
    products: "Featured products",
    openReport: "Open report",
    nextTitle: "Upcoming countries",
    nextBody: "This area is prepared for other potential export markets. Each country will have a dedicated page covering product data, regulation, buyer channels, risks, and market entry strategy.",
    pipeline: ["Singapore", "Malaysia", "China", "Japan", "United Arab Emirates"],
    methodTitle: "Report format",
    methodDescription: "Each report is designed as a practical market brief, not a plain article, so it can support product research and buyer pitching preparation.",
    methods: [
      ["Market scan", "Market position, consumer behavior, and why the country matters."],
      ["Product fit", "Relevant Indonesian products, target buyers, entry barriers, and positioning."],
      ["Entry roadmap", "Regulatory checklist, buyer channels, risks, and market entry steps."]
    ],
  },
  zh: {
    eyebrow: "Export Market Intelligence",
    title: "bece.asia \u51fa\u53e3\u5e02\u573a\u60c5\u62a5\u4e2d\u5fc3",
    description: "\u6309\u56fd\u5bb6\u6574\u7406\u7684\u51fa\u53e3\u5e02\u573a\u60c5\u62a5\u5e93\uff0c\u5e2e\u52a9\u4e2d\u5c0f\u4f01\u4e1a\u3001\u51fa\u53e3\u65b0\u624b\u548c\u5546\u4e1a\u56e2\u961f\u7406\u89e3\u5e02\u573a\u673a\u4f1a\u3001\u4e70\u5bb6\u6e20\u9053\u3001\u6cd5\u89c4\u548c\u8fdb\u5165\u7b56\u7565\u3002",
    badgeOne: "\u56fd\u5bb6\u5e02\u573a\u6307\u5357",
    badgeTwo: "\u4e70\u5bb6\u5bfc\u5411\u6d1e\u5bdf",
    searchPlaceholder: "\u540e\u7eed\u51fa\u53e3\u5e02\u573a\u5c06\u5728\u6b64\u66f4\u65b0",
    featured: "\u56fd\u5bb6\u62a5\u544a",
    updated: "\u66f4\u65b0",
    opportunity: "\u673a\u4f1a",
    products: "\u91cd\u70b9\u4ea7\u54c1",
    openReport: "\u67e5\u770b\u62a5\u544a",
    nextTitle: "\u540e\u7eed\u56fd\u5bb6",
    nextBody: "\u8be5\u533a\u57df\u5df2\u4e3a\u5176\u4ed6\u6f5c\u529b\u51fa\u53e3\u5e02\u573a\u9884\u7559\u3002\u6bcf\u4e2a\u56fd\u5bb6\u5c06\u62e5\u6709\u72ec\u7acb\u9875\u9762\uff0c\u6db5\u76d6\u4ea7\u54c1\u3001\u6cd5\u89c4\u3001\u4e70\u5bb6\u6e20\u9053\u3001\u98ce\u9669\u548c\u5e02\u573a\u8fdb\u5165\u7b56\u7565\u3002",
    pipeline: ["\u65b0\u52a0\u5761", "\u9a6c\u6765\u897f\u4e9a", "\u4e2d\u56fd", "\u65e5\u672c", "\u963f\u8054\u914b"],
    methodTitle: "\u62a5\u544a\u683c\u5f0f",
    methodDescription: "\u6bcf\u4efd\u62a5\u544a\u90fd\u8bbe\u8ba1\u6210\u5b9e\u7528\u578b\u5e02\u573a\u7b80\u62a5\uff0c\u4fbf\u4e8e\u4ea7\u54c1\u7814\u7a76\u548c\u4e70\u5bb6\u6c9f\u901a\u51c6\u5907\u3002",
    methods: [
      ["Market scan", "\u5e02\u573a\u5b9a\u4f4d\u3001\u6d88\u8d39\u7279\u5f81\u548c\u56fd\u5bb6\u673a\u4f1a\u3002"],
      ["Product fit", "\u9002\u5408\u7684\u5370\u5c3c\u4ea7\u54c1\u3001\u76ee\u6807\u4e70\u5bb6\u3001\u8fdb\u5165\u95e8\u69db\u548c\u5b9a\u4f4d\u3002"],
      ["Entry roadmap", "\u6cd5\u89c4\u6e05\u5355\u3001\u4e70\u5bb6\u6e20\u9053\u3001\u98ce\u9669\u548c\u8fdb\u5165\u6b65\u9aa4\u3002"]
    ],
  },
} satisfies Record<Locale, {
  eyebrow: string;
  title: string;
  description: string;
  badgeOne: string;
  badgeTwo: string;
  searchPlaceholder: string;
  featured: string;
  updated: string;
  opportunity: string;
  products: string;
  openReport: string;
  nextTitle: string;
  nextBody: string;
  pipeline: string[];
  methodTitle: string;
  methodDescription: string;
  methods: string[][];
}>;

export function MarketIntelligenceHub({ locale }: { locale: Locale }) {
  const text = copy[locale];

  return (
    <div className="bg-soft">
      <section className="relative overflow-hidden border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(0,169,157,0.16),transparent_34%),linear-gradient(135deg,#ffffff_0%,#eef7f5_55%,#f7fafc_100%)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-20">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-teal/20 bg-teal/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-teal">{text.badgeOne}</span>
              <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-navy">{text.badgeTwo}</span>
            </div>
            <p className="mt-8 text-sm font-bold uppercase tracking-[0.28em] text-teal">{text.eyebrow}</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-navy sm:text-5xl lg:text-6xl">{text.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">{text.description}</p>
          </div>

          <div className="rounded-[2rem] border border-white bg-white/80 p-5 shadow-soft backdrop-blur">
            <div className="rounded-[1.5rem] bg-navy p-5 text-white">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal">Market radar</p>
                  <p className="mt-2 text-2xl font-black">Indonesia export map</p>
                </div>
                <Globe2 className="h-10 w-10 text-gold" />
              </div>
              <div className="mt-8 grid gap-3">
                {["Indonesia supplier", "Exporter", "Foreign importer", "Distributor", "Retail / consumer"].map((step, index) => (
                  <div key={step} className="flex items-center gap-3 rounded-2xl bg-white/10 p-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-teal text-sm font-black">{index + 1}</span>
                    <span className="text-sm font-semibold">{step}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-500">
              <Search className="h-5 w-5 text-teal" />
              {text.searchPlaceholder}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-teal">{text.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-navy sm:text-4xl">{text.featured}</h2>
          </div>
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600">
            <Sparkles className="h-4 w-4 text-gold" />
            {marketCountries.length} {locale === "id" ? "negara aktif" : locale === "zh" ? "\u4e2a\u5df2\u53d1\u5e03\u5e02\u573a" : "active market"}
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_0.62fr]">
          <div className="grid gap-5">
            {marketCountries.map((country) => (
              <article key={country.slug} className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-teal/40 hover:shadow-soft">
                <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
                  <div className="relative min-h-64 overflow-hidden bg-navy p-6 text-white">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_15%,rgba(244,180,0,0.24),transparent_28%),radial-gradient(circle_at_80%_75%,rgba(0,169,157,0.28),transparent_34%)]" />
                    <div className="relative flex h-full flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-teal">{marketText(country.region, locale)}</span>
                        <Ship className="h-8 w-8 text-gold" />
                      </div>
                      <div>
                        <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/65">{marketText(country.status, locale)}</p>
                        <h3 className="mt-3 text-4xl font-black tracking-tight">{marketText(country.country, locale)}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 sm:p-7">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-teal/10 px-3 py-1 text-xs font-bold text-teal">{text.opportunity}: {marketText(country.opportunity, locale)}</span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{text.updated}: {country.updatedAt}</span>
                    </div>
                    <p className="mt-5 text-base leading-7 text-slate-600">{marketText(country.summary, locale)}</p>
                    <div className="mt-5">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">{text.products}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {marketText(country.products, locale).map((product) => (
                          <span key={product} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{product}</span>
                        ))}
                      </div>
                    </div>
                    <Link href={localePath(locale, country.href)} className="mt-7 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-navy-light">
                      {text.openReport}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-teal/10 text-teal">
              <MapPinned className="h-6 w-6" />
            </div>
            <h2 className="mt-5 text-2xl font-black tracking-tight text-navy">{text.nextTitle}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{text.nextBody}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {text.pipeline.map((country) => (
                <span key={country} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600">{country}</span>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-teal">{text.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-navy">{text.methodTitle}</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">{text.methodDescription}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {text.methods.map(([title, body], index) => (
              <div key={title} className="rounded-3xl border border-slate-200 bg-soft p-5">
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-navy text-sm font-black text-white">{index + 1}</span>
                  <BarChart3 className="h-5 w-5 text-teal" />
                </div>
                <h3 className="mt-5 text-lg font-black text-navy">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
