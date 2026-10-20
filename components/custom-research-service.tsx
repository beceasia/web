import { ArrowRight, BarChart3, CheckCircle2, ClipboardList, Factory, FileBarChart2, FileCheck2, MessageCircle, SearchCheck, Truck } from "lucide-react";
import type { Locale } from "@/data/apps";
import { whatsappUrl } from "@/data/contact";

type ServiceCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  audience: string;
  sectionsTitle: string;
  sectionsIntro: string;
  services: { title: string; body: string }[];
  processTitle: string;
  process: { title: string; body: string }[];
  deliverablesTitle: string;
  deliverables: string[];
  standardsTitle: string;
  standardsBody: string;
  engagementTitle: string;
  engagementBody: string;
  exampleTitle: string;
  exampleBody: string;
  contactTitle: string;
  contactBody: string;
  contactButton: string;
  contactMessage: string;
};

const copies: Record<Locale, ServiceCopy> = {
  id: {
    eyebrow: "Layanan riset khusus bece.asia",
    title: "Custom Market & Supply Research",
    subtitle: "Riset pasar, pemasok, produksi, dan harga komoditas untuk mendukung keputusan bisnis.",
    audience: "Untuk eksportir, importir, pembeli komoditas, pelaku usaha, dan calon investor yang memerlukan data sesuai produk, wilayah, serta tujuan transaksi.",
    sectionsTitle: "Apa yang dapat kami teliti?",
    sectionsIntro: "Pilih fokus riset berdasarkan keputusan yang ingin Anda ambil. Cakupan pekerjaan disepakati sebelum riset dimulai.",
    services: [
      {
        title: "Pemetaan pemasok dan kapasitas",
        body: "Identifikasi calon pemasok, lokasi fasilitas, kapasitas terpasang, potensi produksi, dan informasi pasokan yang dapat ditelusuri.",
      },
      {
        title: "Harga historis dan pembanding pasar",
        body: "Analisis statistik ekspor-impor, indeks komoditas, penawaran publik, dan tren harga menurut periode serta satuan yang jelas.",
      },
      {
        title: "Analisis biaya dan harga penawaran",
        body: "Simulasikan biaya pengangkutan, komponen perdagangan, harga pembelian maksimal, dan margin berdasarkan asumsi yang dinyatakan.",
      },
    ],
    processTitle: "Alur layanan",
    process: [
      { title: "Tentukan kebutuhan", body: "Sampaikan komoditas, lokasi, rentang waktu, spesifikasi, target volume, dan keputusan yang ingin didukung." },
      { title: "Telusuri dan uji sumber", body: "Riset sumber resmi dan publik. Pisahkan fakta, estimasi, asumsi, serta kesenjangan data." },
      { title: "Terima analisis dan rekomendasi", body: "Dapatkan laporan sesuai kesepakatan, skenario yang dapat diperiksa, dan prioritas tindakan berikutnya." },
    ],
    deliverablesTitle: "Contoh hasil yang dapat diterima",
    deliverables: [
      "Laporan riset dengan sumber, tanggal pemeriksaan, metode, serta keterbatasan.",
      "Daftar calon pemasok dan estimasi produksi jika data dasar memadai.",
      "Tabel harga historis yang tersedia dan pembanding dari pasar relevan.",
      "Simulasi biaya, harga pembelian, dan skenario negosiasi.",
      "Rekomendasi prioritas pemasok serta daftar informasi yang perlu dikonfirmasi.",
    ],
    standardsTitle: "Data yang dapat dipertanggungjawabkan",
    standardsBody: "Harga transaksi aktual, indeks, penawaran, estimasi, dan simulasi selalu dibedakan. Data kosong tidak diganti dengan angka rekaan. Nama perusahaan hasil pencarian belum berarti pemasok tersebut aktif atau bersedia menjual.",
    engagementTitle: "Biaya dan waktu pengerjaan",
    engagementBody: "Ditentukan setelah kebutuhan, kedalaman riset, dan ketersediaan sumber dibahas. Ruang lingkup, keluaran, jadwal, serta biaya disepakati lebih dahulu. Layanan ini tidak menjanjikan akses ke data perusahaan yang tidak dipublikasikan.",
    exampleTitle: "Contoh kebutuhan: cangkang sawit untuk pasar Jepang",
    exampleBody: "Kajian dapat mencakup lokasi pabrik, proyeksi volume cangkang dari kapasitas pengolahan, harga FOB pembanding, biaya menuju stokpile, dan skenario harga pengadaan. Data pabrik yang belum terverifikasi tetap diberi label estimasi.",
    contactTitle: "Butuh kajian untuk bisnis Anda?",
    contactBody: "Ceritakan produk, wilayah pemasok, pasar tujuan, periode data, dan kebutuhan volume. Kami akan membahas ruang lingkup sebelum pekerjaan dimulai.",
    contactButton: "Ajukan kebutuhan riset",
    contactMessage: "Halo bece.asia, saya ingin membahas layanan Custom Market & Supply Research.\nProduk/komoditas:\nWilayah pemasok:\nPasar tujuan:\nPeriode data:\nTarget volume:\nTujuan riset:",
  },
  en: {
    eyebrow: "Tailored research by bece.asia",
    title: "Custom Market & Supply Research",
    subtitle: "Research on markets, suppliers, production, and commodity prices to support business decisions.",
    audience: "For exporters, importers, commodity buyers, businesses, and prospective investors who need information tailored to their product, region, and commercial objectives.",
    sectionsTitle: "What can we research?",
    sectionsIntro: "Choose research topics based on the decisions you need to make. The scope is agreed before work begins.",
    services: [
      { title: "Supplier and capacity mapping", body: "Identify prospective suppliers, facilities, installed capacity, production potential, and traceable supply information." },
      { title: "Historical prices and benchmarks", body: "Analyze trade statistics, commodity indices, public quotations, and price trends for defined periods and units." },
      { title: "Cost and offer analysis", body: "Model transport costs, trade costs, maximum procurement prices, and margins with explicit assumptions." },
    ],
    processTitle: "How it works",
    process: [
      { title: "Define the request", body: "Share the commodity, region, period, specifications, target volume, and intended business decision." },
      { title: "Research and verify sources", body: "Review official and public evidence. Separate facts, estimates, assumptions, and missing information." },
      { title: "Receive findings and next steps", body: "Get an agreed report, transparent scenarios, and practical follow-up priorities." },
    ],
    deliverablesTitle: "Examples of deliverables",
    deliverables: [
      "Research report documenting sources, verification dates, methods, and limitations.",
      "Prospective supplier list and production estimates when underlying data permit.",
      "Available historical prices and relevant market benchmarks.",
      "Cost, procurement price, and negotiation scenarios.",
      "Supplier outreach priorities and a checklist of information requiring confirmation.",
    ],
    standardsTitle: "Evidence you can assess",
    standardsBody: "Actual transactions, indices, quotations, estimates, and simulations are labeled separately. Missing figures are never fabricated. A company identified through research is not automatically a confirmed or willing supplier.",
    engagementTitle: "Fees and timeline",
    engagementBody: "Determined after discussing the required scope, research depth, and source availability. Deliverables, timelines, and fees are agreed in advance. This service does not promise access to unpublished company data.",
    exampleTitle: "Example: palm kernel shells for Japan",
    exampleBody: "Research may cover mill locations, shell volume projections from processing capacity, benchmark FOB prices, stockpile logistics, and procurement scenarios. Unverified mill-level figures remain clearly labeled as estimates.",
    contactTitle: "Need tailored business research?",
    contactBody: "Share the product, supply region, destination market, period, and volume. We will clarify the research scope before work begins.",
    contactButton: "Discuss a research request",
    contactMessage: "Hello bece.asia, I would like to discuss Custom Market & Supply Research.\nProduct/commodity:\nSupplier region:\nDestination market:\nData period:\nTarget volume:\nResearch objective:",
  },
  zh: {
    eyebrow: "bece.asia 定制研究服务",
    title: "Custom Market & Supply Research",
    subtitle: "提供市场、供应商、产量及商品价格研究，支持商业决策。",
    audience: "面向出口商、进口商、商品采购商、企业及潜在投资者，按产品、地区和商业目标定制研究。",
    sectionsTitle: "研究范围",
    sectionsIntro: "根据需要解决的商业问题选择研究方向，工作范围在开始前确认。",
    services: [
      { title: "供应商和产能调查", body: "整理潜在供应商、工厂位置、设计产能、产量潜力及可追溯的供货信息。" },
      { title: "历史价格与市场基准", body: "分析进出口统计、商品指数、公开报价以及明确时间和计量单位的价格趋势。" },
      { title: "成本与报价分析", body: "基于明确假设测算运输费、贸易费用、最高采购价格及利润空间。" },
    ],
    processTitle: "服务流程",
    process: [
      { title: "明确需求", body: "说明商品、地区、时间、规格、目标数量及拟支持的商业决策。" },
      { title: "检索并核查来源", body: "检查官方及公开资料，区分事实、估算、假设与数据缺口。" },
      { title: "获取报告与建议", body: "按约定提供研究报告、透明的情景测算和后续行动建议。" },
    ],
    deliverablesTitle: "交付内容示例",
    deliverables: [
      "注明来源、核查日期、方法和局限的研究报告。",
      "在数据充分时提供潜在供应商名单及产量估算。",
      "可获得的历史价格与相关市场基准。",
      "成本、采购价格及谈判情景测算。",
      "供应商联系优先级和仍需核实的信息清单。",
    ],
    standardsTitle: "可核查的数据依据",
    standardsBody: "实际交易、指数、报价、估算和模拟分别标注。不编造缺失数据。公开检索到的企业不等于已确认其供货意愿或能力。",
    engagementTitle: "费用与时间",
    engagementBody: "根据研究范围、深度及资料可得性协商确定，开始前明确交付内容、时间及费用。本服务不承诺获取未公开的企业数据。",
    exampleTitle: "案例方向：面向日本市场的棕榈仁壳",
    exampleBody: "研究可包括工厂位置、基于处理能力的产量预测、FOB 参考价格、堆场物流成本及采购情景。未经核实的工厂数据将明确标注为估算。",
    contactTitle: "需要专项商业研究？",
    contactBody: "请提供商品、供应地区、目标市场、数据期间及需求数量。我们将先讨论研究范围。",
    contactButton: "咨询定制研究",
    contactMessage: "您好 bece.asia，我想咨询 Custom Market & Supply Research。\n商品：\n供应地区：\n目标市场：\n数据期间：\n需求数量：\n研究目的：",
  },
};

const serviceIcons = [Factory, BarChart3, Truck];
const processIcons = [ClipboardList, SearchCheck, FileCheck2];

export function CustomResearchService({ locale }: { locale: Locale }) {
  const copy = copies[locale];
  const contactHref = whatsappUrl(copy.contactMessage);

  return (
    <>
      <section className="bg-navy py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-teal">{copy.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl">{copy.title}</h1>
          <p className="mt-5 max-w-3xl text-xl leading-8 text-white">{copy.subtitle}</p>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200">{copy.audience}</p>
          <a href={contactHref} target="_blank" rel="noreferrer" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-xl bg-teal px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-700">
            <MessageCircle size={19} aria-hidden="true" /> {copy.contactButton} <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-black text-navy sm:text-3xl">{copy.sectionsTitle}</h2>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600">{copy.sectionsIntro}</p>
        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {copy.services.map((item, index) => {
            const Icon = serviceIcons[index];
            return <article key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal/10 text-teal"><Icon size={24} aria-hidden="true" /></span>
              <h3 className="mt-5 text-lg font-black text-navy">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.body}</p>
            </article>;
          })}
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-navy sm:text-3xl">{copy.processTitle}</h2>
          <ol className="mt-7 grid gap-5 md:grid-cols-3">
            {copy.process.map((step, index) => {
              const Icon = processIcons[index];
              return <li key={step.title} className="rounded-2xl border border-slate-200 bg-soft p-6">
                <span className="flex items-center gap-3 text-teal"><Icon size={22} aria-hidden="true" /><span className="text-sm font-black">0{index + 1}</span></span>
                <h3 className="mt-4 text-lg font-black text-navy">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{step.body}</p>
              </li>;
            })}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-2xl font-black text-navy">{copy.deliverablesTitle}</h2>
          <ul className="mt-5 space-y-4">
            {copy.deliverables.map((item) => <li key={item} className="flex items-start gap-3 text-sm leading-7 text-slate-700">
              <CheckCircle2 size={19} className="mt-1 shrink-0 text-teal" aria-hidden="true" /><span>{item}</span>
            </li>)}
          </ul>
        </div>
        <div className="space-y-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <h2 className="flex items-center gap-2 text-lg font-black text-navy"><FileBarChart2 size={21} className="text-teal" aria-hidden="true" />{copy.standardsTitle}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{copy.standardsBody}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-black text-navy">{copy.engagementTitle}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{copy.engagementBody}</p>
          </div>
        </div>
      </section>

      <section className="bg-soft py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-black text-navy">{copy.exampleTitle}</h2>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600">{copy.exampleBody}</p>
          </div>
        </div>
      </section>

      <section className="bg-navy py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black sm:text-3xl">{copy.contactTitle}</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-200">{copy.contactBody}</p>
          <a href={contactHref} target="_blank" rel="noreferrer" className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-teal px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-700">
            <MessageCircle size={19} aria-hidden="true" />{copy.contactButton}<ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
      </section>
    </>
  );
}
