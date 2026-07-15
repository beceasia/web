import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, BarChart3, CheckCircle2, Globe2, Landmark, Route, Search, ShieldCheck, Store, UsersRound } from "lucide-react";
import Link from "next/link";
import type { Locale, Localized } from "@/data/apps";
import { hongKongMarket, marketText } from "@/data/market-intelligence";
import { localePath } from "@/lib/routes";

const labels = {
  id: {
    breadcrumb: "Market Intelligence",
    source: "Sumber",
    opportunity: "Peluang",
    products: "Produk",
    buyers: "Buyer",
    section2: "Potensi Pasar Ekspor Hong Kong",
    section3: "Produk Indonesia yang Berpotensi Diekspor",
    section4: "Statistik Perdagangan Indonesia - Hong Kong",
    section5: "Regulasi Ekspor ke Hong Kong",
    section6: "Tarif dan Hambatan Perdagangan",
    section7: "Strategi Memasuki Pasar Hong Kong",
    section8: "Profil Buyer Hong Kong",
    section9: "Cara Mencari Buyer",
    section10: "Risiko dan Mitigasi",
    conclusion: "Kesimpulan",
    table: ["Produk", "Potensi", "Alasan", "Buyer Target", "Hambatan"],
    dashboardNote: "Data perdagangan dapat berubah setiap tahun. Gunakan sumber resmi BPS, UN Comtrade, dan ITC Trade Map untuk pembaruan terbaru.",
    regulationTabs: ["Wajib Dipenuhi", "Direkomendasikan"],
    documents: "Dokumen Indonesia",
    hkRules: "Regulasi Hong Kong",
    tariffs: "Tarif Impor",
    barriers: "Non Tariff Barrier",
    related: "Related export country links",
    faq: "FAQ ekspor ke Hong Kong",
    readMore: "Buka sumber",
  },
  en: {
    breadcrumb: "Market Intelligence",
    source: "Source",
    opportunity: "Opportunity",
    products: "Products",
    buyers: "Buyers",
    section2: "Hong Kong Export Market Potential",
    section3: "Indonesian Products with Export Potential",
    section4: "Indonesia - Hong Kong Trade Statistics",
    section5: "Export Regulations to Hong Kong",
    section6: "Tariffs and Trade Barriers",
    section7: "Hong Kong Market Entry Strategy",
    section8: "Hong Kong Buyer Profiles",
    section9: "How to Find Buyers",
    section10: "Risks and Mitigation",
    conclusion: "Conclusion",
    table: ["Product", "Potential", "Reason", "Buyer Target", "Barrier"],
    dashboardNote: "Trade data changes every year. Use official sources such as BPS, UN Comtrade, and ITC Trade Map for the latest updates.",
    regulationTabs: ["Mandatory", "Recommended"],
    documents: "Indonesia Documents",
    hkRules: "Hong Kong Regulations",
    tariffs: "Import Tariffs",
    barriers: "Non-Tariff Barriers",
    related: "Related export country links",
    faq: "Hong Kong export FAQ",
    readMore: "Open source",
  },
  zh: {
    breadcrumb: "市场情报",
    source: "来源",
    opportunity: "机会",
    products: "产品",
    buyers: "买家",
    section2: "香港出口市场潜力",
    section3: "具有出口潜力的印尼产品",
    section4: "印尼-香港贸易统计",
    section5: "出口香港法规",
    section6: "关税与贸易壁垒",
    section7: "进入香港市场策略",
    section8: "香港买家类型",
    section9: "如何寻找买家",
    section10: "风险与缓解措施",
    conclusion: "结论",
    table: ["产品", "潜力", "原因", "目标买家", "障碍"],
    dashboardNote: "贸易数据每年可能变化。请使用 BPS、UN Comtrade 和 ITC Trade Map 等官方来源更新最新数据。",
    regulationTabs: ["必须满足", "建议准备"],
    documents: "印尼出口文件",
    hkRules: "香港法规",
    tariffs: "进口关税",
    barriers: "非关税壁垒",
    related: "相关出口目的地链接",
    faq: "出口香港常见问题",
    readMore: "打开来源",
  },
};

const statCards = [
  { value: { id: "Perlu pembaruan resmi", en: "Official update needed", zh: "需官方数据更新" }, label: { id: "Total Trade", en: "Total Trade", zh: "贸易总额" } },
  { value: { id: "Perlu pembaruan resmi", en: "Official update needed", zh: "需官方数据更新" }, label: { id: "Indonesia Export", en: "Indonesia Export", zh: "印尼出口" } },
  { value: { id: "Electrical, machinery, food, mineral, agriculture", en: "Electrical, machinery, food, mineral, agriculture", zh: "电子、机械、食品、矿产、农产品" }, label: { id: "Main Export Products", en: "Main Export Products", zh: "主要出口产品" } },
];

const mandatoryDocs = ["NIB", "Invoice", "Packing List", "Bill of Lading / Airway Bill", "PEB", "Certificate of Origin if required"];
const recommendedDocs = ["Halal Certification", "HACCP", "ISO 22000", "Product testing", "English packaging", "International barcode"];
const buyerProfiles = [
  { title: { id: "Importer", en: "Importer", zh: "进口商" }, body: { id: "Membeli produk dalam jumlah besar.", en: "Buys products in larger volumes.", zh: "以较大数量采购产品。" } },
  { title: { id: "Distributor", en: "Distributor", zh: "经销商" }, body: { id: "Mendistribusikan ke retail.", en: "Distributes products to retail channels.", zh: "向零售渠道分销产品。" } },
  { title: { id: "Retail Store", en: "Retail Store", zh: "零售店" }, body: { id: "Menjual langsung ke konsumen.", en: "Sells directly to end consumers.", zh: "直接面向消费者销售。" } },
  { title: { id: "Restaurant & Hotel", en: "Restaurant & Hotel", zh: "餐厅与酒店" }, body: { id: "Potensial untuk food product.", en: "Relevant for food and hospitality products.", zh: "适合食品及酒店餐饮产品。" } },
];

const timeline = [
  { title: { id: "Market Research", en: "Market Research", zh: "市场研究" }, actions: { id: ["Identifikasi buyer", "Analisis kompetitor", "Pelajari harga pasar"], en: ["Identify buyers", "Analyze competitors", "Study market pricing"], zh: ["识别买家", "分析竞争对手", "研究市场价格"] } },
  { title: { id: "Product Validation", en: "Product Validation", zh: "产品验证" }, actions: { id: ["Kirim sample", "Uji standar produk", "Sesuaikan packaging"], en: ["Send samples", "Test product standards", "Adjust packaging"], zh: ["寄送样品", "测试产品标准", "调整包装"] } },
  { title: { id: "Find Partner", en: "Find Partner", zh: "寻找合作伙伴" }, actions: { id: ["Distributor", "Importer", "Retail partner"], en: ["Distributor", "Importer", "Retail partner"], zh: ["经销商", "进口商", "零售伙伴"] } },
  { title: { id: "Market Expansion", en: "Market Expansion", zh: "市场扩展" }, actions: { id: ["Exhibition", "Marketplace", "Partnership"], en: ["Exhibitions", "Marketplaces", "Partnerships"], zh: ["展会", "电商平台", "合作伙伴"] } },
];

const buyerPlatforms = ["Hong Kong Trade Development Council (HKTDC)", "Alibaba", "Global Sources", "Hong Kong trade fairs"];
const buyerEvents = ["Hong Kong Food Expo", "Asia Fruit Logistica", "Mega Show Hong Kong"];

const faq = [
  {
    q: { id: "Apakah Hong Kong mengenakan bea masuk untuk semua barang?", en: "Does Hong Kong charge import duty on all goods?", zh: "香港是否对所有商品征收进口税？" },
    a: { id: "Tidak. Hong Kong dikenal sebagai free port. Bea/cukai terutama berlaku untuk komoditas tertentu seperti minuman beralkohol, tembakau, minyak hidrokarbon, dan methyl alcohol.", en: "No. Hong Kong is known as a free port. Duties mainly apply to selected dutiable commodities such as liquor, tobacco, hydrocarbon oil, and methyl alcohol.", zh: "不是。香港是自由港，关税主要适用于酒类、烟草、烃油及甲醇等特定应课税品。" },
  },
  {
    q: { id: "Produk apa yang paling cocok untuk UMKM?", en: "Which products are most suitable for MSMEs?", zh: "哪些产品最适合中小企业？" },
    a: { id: "Kopi specialty, makanan halal, rempah, snack premium, dan produk lifestyle handmade dapat menjadi pintu masuk awal jika kualitas, kemasan, dan supply konsisten.", en: "Specialty coffee, halal food, spices, premium snacks, and handmade lifestyle products can be practical entry categories if quality, packaging, and supply are consistent.", zh: "精品咖啡、清真食品、香料、高端零食和手工生活方式产品较适合作为切入点，但需要保证质量、包装和供应稳定。" },
  },
  {
    q: { id: "Di mana mencari buyer Hong Kong?", en: "Where can exporters find Hong Kong buyers?", zh: "出口商在哪里寻找香港买家？" },
    a: { id: "Mulai dari HKTDC, Global Sources, Alibaba, trade fair, distributor makanan, retailer, hotel, dan restaurant group.", en: "Start with HKTDC, Global Sources, Alibaba, trade fairs, food distributors, retailers, hotels, and restaurant groups.", zh: "可从 HKTDC、Global Sources、Alibaba、贸易展会、食品经销商、零售商、酒店和餐饮集团开始。" },
  },
];

export function ExportMarketIntelligencePage({ locale }: { locale: Locale }) {
  const copy = labels[locale];

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: marketText(hongKongMarket.title, locale),
            description: marketText(hongKongMarket.metaDescription, locale),
            author: { "@type": "Organization", name: "bece.asia" },
            publisher: { "@type": "Organization", name: "bece.asia" },
            about: "Export market intelligence Hong Kong",
          }),
        }}
      />
      <article className="bg-slate-50">
        <Hero locale={locale} />
        <main className="mx-auto max-w-7xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
          <Breadcrumb locale={locale} label={copy.breadcrumb} />
          <Overview locale={locale} />
          <Opportunity locale={locale} copy={copy} />
          <ProductTable locale={locale} copy={copy} />
          <TradeDashboard locale={locale} copy={copy} />
          <Regulations copy={copy} />
          <Tariffs locale={locale} copy={copy} />
          <Timeline locale={locale} copy={copy} />
          <BuyerProfiles locale={locale} copy={copy} />
          <BuyerSearch copy={copy} />
          <RiskMatrix locale={locale} copy={copy} />
          <Conclusion locale={locale} copy={copy} />
          <Faq locale={locale} copy={copy} />
          <RelatedLinks locale={locale} copy={copy} />
          <Sources copy={copy} />
        </main>
      </article>
    </>
  );
}

function Hero({ locale }: { locale: Locale }) {
  return (
    <section className="bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-gold">{marketText(hongKongMarket.hero.eyebrow, locale)}</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl">{marketText(hongKongMarket.hero.title, locale)}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">{marketText(hongKongMarket.hero.subtitle, locale)}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {hongKongMarket.highlights.map((item) => (
            <div key={marketText(item.label, "en")} className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-gold">{marketText(item.label, locale)}</p>
              <p className="mt-3 text-xl font-black leading-7">{marketText(item.value, locale)}</p>
            </div>
          ))}
          <div className="rounded-3xl border border-gold/30 bg-gold/10 p-5 sm:col-span-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Source</p>
            <p className="mt-2 text-sm text-slate-100">KJRI Hong Kong, Hong Kong Government, public trade databases.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Breadcrumb({ locale, label }: { locale: Locale; label: string }) {
  return (
    <nav className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-500" aria-label="Breadcrumb">
      <Link href={localePath(locale)} className="hover:text-navy">bece.asia</Link>
      <span>/</span>
      <span>{label}</span>
      <span>/</span>
      <span className="text-navy">{marketText(hongKongMarket.country, locale)}</span>
    </nav>
  );
}

function Overview({ locale }: { locale: Locale }) {
  return (
    <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-teal">Overview</p>
        <h2 className="mt-3 text-3xl font-black text-navy">{marketText(hongKongMarket.overview.title, locale)}</h2>
        <p className="mt-4 leading-7 text-slate-600">{marketText(hongKongMarket.overview.body, locale)}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {hongKongMarket.advantages.map((item) => (
          <InfoCard key={marketText(item.title, "en")} title={marketText(item.title, locale)} body={marketText(item.body, locale)} />
        ))}
      </div>
    </section>
  );
}

function Opportunity({ locale, copy }: { locale: Locale; copy: typeof labels.id }) {
  return (
    <section>
      <SectionTitle title={copy.section2} />
      <div className="mt-6 grid gap-5 lg:grid-cols-4">
        {hongKongMarket.opportunityCards.map((card) => (
          <div key={marketText(card.title, "en")} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <Store className="text-teal" size={24} />
              <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-black text-navy">{marketText(card.level, locale)}</span>
            </div>
            <h3 className="mt-4 text-xl font-black text-navy">{marketText(card.title, locale)}</h3>
            <MiniList title={copy.products} items={card.products[locale] ?? card.products.id} />
            <MiniList title={copy.buyers} items={card.buyers[locale] ?? card.buyers.id} />
          </div>
        ))}
      </div>
    </section>
  );
}

function ProductTable({ locale, copy }: { locale: Locale; copy: typeof labels.id }) {
  return (
    <section>
      <SectionTitle title={copy.section3} />
      <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-[920px] divide-y divide-slate-200 text-sm">
            <thead className="bg-navy text-left text-xs uppercase tracking-[0.18em] text-white">
              <tr>{copy.table.map((head) => <th key={head} className="px-5 py-4">{head}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {hongKongMarket.products.map((row) => (
                <tr key={marketText(row.product, "en")} className="align-top">
                  <td className="px-5 py-4 font-black text-navy">{marketText(row.product, locale)}</td>
                  <td className="px-5 py-4"><span className="rounded-full bg-teal/10 px-3 py-1 text-xs font-black text-teal">{marketText(row.potential, locale)}</span></td>
                  <td className="px-5 py-4 text-slate-600">{marketText(row.reason, locale)}</td>
                  <td className="px-5 py-4 text-slate-600">{marketText(row.buyer, locale)}</td>
                  <td className="px-5 py-4 text-slate-600">{marketText(row.barrier, locale)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function TradeDashboard({ locale, copy }: { locale: Locale; copy: typeof labels.id }) {
  return (
    <section>
      <SectionTitle title={copy.section4} />
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {statCards.map((item) => (
          <div key={marketText(item.label, "en")} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <BarChart3 className="text-teal" size={26} />
            <p className="mt-4 text-sm font-black uppercase tracking-[0.18em] text-slate-500">{marketText(item.label, locale)}</p>
            <p className="mt-3 text-2xl font-black text-navy">{marketText(item.value, locale)}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-3xl border border-gold/30 bg-gold/10 p-5 text-sm leading-7 text-slate-700">{copy.dashboardNote}</div>
    </section>
  );
}

function Regulations({ copy }: { copy: typeof labels.id }) {
  return (
    <section>
      <SectionTitle title={copy.section5} />
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-teal">{copy.regulationTabs[0]}</p>
          <h3 className="mt-4 text-xl font-black text-navy">{copy.documents}</h3>
          <CheckList items={mandatoryDocs} />
          <h3 className="mt-6 text-xl font-black text-navy">{copy.hkRules}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">Food products: Public Health and Municipal Services Ordinance Cap.132; Food Safety Ordinance Cap.612. Food importers must keep transaction records. Authority: Food and Environmental Hygiene Department (FEHD).</p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-teal">{copy.regulationTabs[1]}</p>
          <CheckList items={recommendedDocs} />
        </div>
      </div>
    </section>
  );
}

function Tariffs({ locale, copy }: { locale: Locale; copy: typeof labels.id }) {
  const tariffBody: Localized<string> = {
    id: "Hong Kong menerapkan kebijakan perdagangan bebas. Sebagian besar barang tidak dikenakan bea masuk.",
    en: "Hong Kong applies a free-trade policy. Most goods are not subject to import duty.",
    zh: "香港实行自由贸易政策，大多数商品无需缴纳进口税。",
  };
  const exceptions = ["Petroleum", "Alcohol", "Tobacco", "Methyl alcohol"];
  const barriers = ["Product standard", "Packaging requirement", "Food safety", "Competition from China"];
  return (
    <section>
      <SectionTitle title={copy.section6} />
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <InfoPanel icon={Landmark} title={copy.tariffs} body={marketText(tariffBody, locale)} items={exceptions} />
        <InfoPanel icon={ShieldCheck} title={copy.barriers} body="" items={barriers} />
      </div>
    </section>
  );
}

function Timeline({ locale, copy }: { locale: Locale; copy: typeof labels.id }) {
  return (
    <section>
      <SectionTitle title={copy.section7} />
      <div className="mt-6 grid gap-5 lg:grid-cols-4">
        {timeline.map((step, index) => (
          <div key={marketText(step.title, "en")} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-navy text-sm font-black text-white">{index + 1}</span>
              <Route className="text-teal" size={21} />
            </div>
            <h3 className="mt-4 text-lg font-black text-navy">{marketText(step.title, locale)}</h3>
            <CheckList items={step.actions[locale] ?? step.actions.id} compact />
          </div>
        ))}
      </div>
    </section>
  );
}

function BuyerProfiles({ locale, copy }: { locale: Locale; copy: typeof labels.id }) {
  return (
    <section>
      <SectionTitle title={copy.section8} />
      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {buyerProfiles.map((item) => <InfoCard key={marketText(item.title, "en")} title={marketText(item.title, locale)} body={marketText(item.body, locale)} icon />)}
      </div>
    </section>
  );
}

function BuyerSearch({ copy }: { copy: typeof labels.id }) {
  return (
    <section>
      <SectionTitle title={copy.section9} />
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <InfoPanel icon={Search} title="Platform" body="" items={buyerPlatforms} />
        <InfoPanel icon={Globe2} title="Event" body="" items={buyerEvents} />
      </div>
    </section>
  );
}

function RiskMatrix({ locale, copy }: { locale: Locale; copy: typeof labels.id }) {
  return (
    <section>
      <SectionTitle title={copy.section10} />
      <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="grid divide-y divide-slate-100">
          {hongKongMarket.risks.map((item) => (
            <div key={marketText(item.risk, "en")} className="grid gap-4 p-5 md:grid-cols-[0.7fr_1.3fr]">
              <p className="font-black text-navy">{marketText(item.risk, locale)}</p>
              <p className="text-slate-600">{marketText(item.solution, locale)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Conclusion({ locale, copy }: { locale: Locale; copy: typeof labels.id }) {
  const priority = locale === "zh"
    ? ["印尼精品咖啡", "清真食品", "香料和食品原料", "手工生活方式产品"]
    : locale === "en"
      ? ["Indonesian specialty coffee", "Halal food products", "Spices and food ingredients", "Handmade lifestyle products"]
      : ["Kopi specialty Indonesia", "Produk makanan halal", "Rempah dan bahan makanan", "Produk lifestyle handmade"];
  return (
    <section className="rounded-[2rem] bg-navy p-6 text-white shadow-sm lg:p-8">
      <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">{copy.conclusion}</p>
      <div className="mt-5 grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-300">Market Opportunity</p>
          <p className="mt-3 text-5xl font-black text-gold">HIGH</p>
        </div>
        <div className="space-y-5">
          <p className="text-lg leading-8 text-slate-100">
            {locale === "zh"
              ? "香港是高购买力、开放贸易制度和国际产品需求并存的优质市场。"
              : locale === "en"
                ? "Hong Kong is a premium market with high purchasing power, an open trade system, and demand for international products."
                : "Hong Kong merupakan pasar premium dengan daya beli tinggi, sistem perdagangan terbuka, dan kebutuhan produk internasional."}
          </p>
          <MiniList title={locale === "zh" ? "优先产品" : locale === "en" ? "Priority Products" : "Produk Prioritas"} items={priority} light />
        </div>
      </div>
    </section>
  );
}

function Faq({ locale, copy }: { locale: Locale; copy: typeof labels.id }) {
  return (
    <section>
      <SectionTitle title={copy.faq} />
      <div className="mt-6 divide-y divide-slate-200 overflow-hidden rounded-3xl border border-slate-200 bg-white">
        {faq.map((item) => (
          <details key={marketText(item.q, "en")} className="group p-5 open:bg-slate-50">
            <summary className="cursor-pointer list-none text-base font-black text-navy">{marketText(item.q, locale)}</summary>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{marketText(item.a, locale)}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function RelatedLinks({ locale, copy }: { locale: Locale; copy: typeof labels.id }) {
  return (
    <section>
      <SectionTitle title={copy.related} />
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {["Singapore", "Malaysia", "China"].map((country) => (
          <div key={country} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="font-black text-navy">{country}</p>
            <p className="mt-2 text-sm text-slate-500">{locale === "zh" ? "即将推出" : locale === "en" ? "Coming soon" : "Segera hadir"}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Sources({ copy }: { copy: typeof labels.id }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-black text-navy">{copy.source}</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {hongKongMarket.sources.map((source) => (
          <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-center justify-between gap-3 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-teal/40 hover:text-teal">
            {source.label}
            <ArrowUpRight size={16} />
          </a>
        ))}
      </div>
    </section>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <h2 className="text-3xl font-black tracking-tight text-navy">{title}</h2>;
}

function InfoCard({ title, body, icon = false }: { title: string; body: string; icon?: boolean }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      {icon ? <UsersRound className="text-teal" size={24} /> : null}
      <h3 className="mt-1 text-lg font-black text-navy">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{body}</p>
    </div>
  );
}

function InfoPanel({ icon: Icon, title, body, items }: { icon: LucideIcon; title: string; body: string; items: string[] }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <Icon className="text-teal" size={26} />
      <h3 className="mt-4 text-xl font-black text-navy">{title}</h3>
      {body ? <p className="mt-3 text-sm leading-7 text-slate-600">{body}</p> : null}
      <CheckList items={items} compact />
    </div>
  );
}

function CheckList({ items, compact = false }: { items: string[]; compact?: boolean }) {
  return (
    <ul className={`${compact ? "mt-4" : "mt-5"} space-y-2`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2 text-sm leading-6 text-slate-600">
          <CheckCircle2 className="mt-0.5 shrink-0 text-teal" size={17} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function MiniList({ title, items, light = false }: { title: string; items: string[]; light?: boolean }) {
  return (
    <div className="mt-5">
      <p className={`text-xs font-black uppercase tracking-[0.18em] ${light ? "text-gold" : "text-slate-400"}`}>{title}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className={`rounded-full px-3 py-1 text-xs font-bold ${light ? "bg-white/10 text-white" : "bg-slate-100 text-slate-600"}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}
