import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ClipboardCheck,
  ExternalLink,
  FileSearch,
  Globe2,
  MailCheck,
  ShieldCheck,
} from "lucide-react";
import type { Locale } from "@/data/apps";
import { localePath } from "@/lib/routes";
import { BuyerDiscoveryForm } from "./buyer-discovery-form";

const contentByLocale = {
  id: {
    eyebrow: "BECE BUYER DISCOVERY · PILOT",
    title: "Temukan calon buyer ekspor untuk produk Anda.",
    summary:
      "Riset perusahaan luar negeri yang berpotensi membeli atau mendistribusikan produk Indonesia. Setiap prospek disertai alasan kecocokan, sumber publik, dan langkah pendekatan awal.",
    note:
      "Layanan riset berdasarkan permintaan. Belum menggunakan pencarian buyer otomatis atau database pembeli terverifikasi secara real-time.",
    request: "Ajukan kebutuhan riset",
    example: "Lihat contoh laporan",
    benefitTitle: "Dari nama perusahaan menjadi langkah penjualan",
    benefitDescription:
      "BECE membantu menyaring informasi, bukan menjanjikan buyer siap membeli.",
    benefits: [
      {
        title: "Prospek sesuai produk",
        body: "Perusahaan dipilih berdasarkan kategori, spesifikasi produk, negara, dan tipe bisnis yang relevan.",
      },
      {
        title: "Bukti yang dapat diperiksa",
        body: "Tautan sumber, tanggal pemeriksaan, serta informasi yang belum diketahui ditampilkan secara terbuka.",
      },
      {
        title: "Siap melakukan kontak",
        body: "Dapatkan saran pendekatan, contoh email penawaran, dan lembar tindak lanjut.",
      },
    ],
    stepsTitle: "Cara kerja layanan",
    steps: [
      {
        title: "Ceritakan produk Anda",
        body: "Isi produk, spesifikasi, kapasitas pasok, dan negara tujuan bila sudah ada.",
      },
      {
        title: "Tentukan ruang lingkup",
        body: "BECE membahas jenis buyer, kelengkapan data, jumlah prospek, waktu, dan biaya sebelum pekerjaan dimulai.",
      },
      {
        title: "Terima hasil riset",
        body: "Laporan berisi kandidat relevan, sumber publik, batasan verifikasi, dan rekomendasi pendekatan.",
      },
    ],
    demoTag: "DEMO · contoh hasil riset",
    demoTitle: "Contoh: pemasok rempah Indonesia → Malaysia",
    demoLead:
      "Ini contoh cara menyusun bukti tentang satu perusahaan nyata, bukan hasil pencarian otomatis atau daftar buyer siap membeli.",
    companyLabel: "Perusahaan prospek",
    company: "Pemborong Maju A&A Sdn Bhd",
    countryLabel: "Negara / tipe bisnis",
    country: "Malaysia · Importir dan distributor bahan pangan (menurut situs perusahaan)",
    evidenceLabel: "Bukti publik",
    evidence:
      "Situs resmi menyatakan perusahaan memasok serta mengimpor produk, termasuk rempah dan bahan pangan curah.",
    matchLabel: "Mengapa relevan?",
    match:
      "Kategori produk dan peran bisnisnya relevan untuk diteliti oleh pemasok rempah curah Indonesia.",
    unconfirmedLabel: "Yang belum terverifikasi",
    unconfirmed:
      "Tidak ada konfirmasi bahwa perusahaan sedang membutuhkan rempah Indonesia, menerima pemasok baru, atau akan membeli.",
    demoDate: "Sumber publik ditinjau: 20 Oktober 2026",
    openSource: "Periksa situs resmi perusahaan",
    exampleWarning:
      "Status: prospek teridentifikasi. Belum menjadi buyer terverifikasi atau pembeli yang menyatakan minat.",
    scopeTitle: "Apa yang bisa disertakan dalam laporan?",
    deliverables: [
      "Profil perusahaan dan kecocokan dengan produk Anda",
      "URL sumber serta tanggal pemeriksaan",
      "Kontak bisnis publik bila tersedia",
      "Status bukti dan hal yang perlu dikonfirmasi",
      "Contoh pesan penawaran dan daftar tindak lanjut",
    ],
    scopeFoot:
      "Jumlah prospek, kedalaman verifikasi, format hasil, jadwal, serta biaya disepakati setelah kebutuhan dinilai. Tidak ada harga atau jumlah buyer yang dijanjikan sebelum itu.",
    requestTitle: "Mulai dari satu produk",
    requestBody:
      "Sampaikan kebutuhan singkat. Informasi akan disiapkan sebagai pesan WhatsApp atau email yang Anda kirim sendiri. Tidak ada pemesanan atau pembayaran otomatis.",
    faqTitle: "Pertanyaan yang sering diajukan",
    faqs: [
      {
        q: "Apakah BECE menjamin saya memperoleh buyer?",
        a: "Tidak. Hasilnya merupakan daftar prospek untuk diteliti dan dihubungi. Minat, respons, dan transaksi bergantung pada perusahaan tujuan.",
      },
      {
        q: "Apakah semua prospek pasti importir?",
        a: "Tidak. Setiap perusahaan akan diberi kategori dan bukti yang mendukungnya. Distributor atau produsen tidak otomatis tercatat sebagai importir.",
      },
      {
        q: "Apakah riset dan biaya langsung diproses setelah mengisi formulir?",
        a: "Tidak. Formulir hanya menyiapkan permintaan melalui WhatsApp atau email. BECE akan membahas cakupan dan biaya terlebih dahulu.",
      },
      {
        q: "Apakah kontak pembeli dan aktivitas impor selalu tersedia?",
        a: "Tidak. Sebagian data tidak dipublikasikan atau memerlukan langganan resmi. Data yang tidak tersedia akan dinyatakan, bukan direka.",
      },
    ],
    relatedTitle: "Lanjutkan persiapan ekspor Anda",
    relatedBody: "Gunakan alat Export Intelligence atau layanan riset khusus lainnya sesuai kebutuhan.",
    relatedMarket: "Export Intelligence",
    relatedCustom: "Custom Market & Supply Research",
  },
  en: {
    eyebrow: "BECE BUYER DISCOVERY · PILOT",
    title: "Find potential overseas buyers for your product.",
    summary:
      "Targeted research on foreign companies that may buy or distribute Indonesian products. Each prospect includes a relevance rationale, public evidence, and suggested outreach steps.",
    note:
      "Research on request. This is not an automated buyer search or a real-time verified buyer database.",
    request: "Request buyer research",
    example: "View sample report",
    benefitTitle: "Turn company names into actionable outreach",
    benefitDescription:
      "BECE helps qualify prospects, without promising purchase-ready buyers.",
    benefits: [
      {
        title: "Product-specific prospects",
        body: "Companies are screened by category, product specifications, market, and business model.",
      },
      {
        title: "Traceable evidence",
        body: "Public source links, review dates, and unknowns are documented explicitly.",
      },
      {
        title: "Outreach preparation",
        body: "Receive suggested next steps, a draft introduction, and a follow-up worksheet.",
      },
    ],
    stepsTitle: "How it works",
    steps: [
      {
        title: "Describe your product",
        body: "Share your product, specifications, available supply, and destination market if known.",
      },
      {
        title: "Agree on scope",
        body: "BECE discusses target buyer types, available data, volume of research, delivery schedule, and fees before any work begins.",
      },
      {
        title: "Receive research",
        body: "Get prospective companies, public sources, verification limits, and outreach recommendations.",
      },
    ],
    demoTag: "DEMO · illustrative research extract",
    demoTitle: "Example: Indonesian bulk spices → Malaysia",
    demoLead:
      "This shows how evidence can be documented for one real company; it is not live buyer search or a list of active purchase inquiries.",
    companyLabel: "Prospect company",
    company: "Pemborong Maju A&A Sdn Bhd",
    countryLabel: "Country / business type",
    country: "Malaysia · Food importer and distributor (according to its own website)",
    evidenceLabel: "Public evidence",
    evidence:
      "The official website states the company supplies and imports goods, including spices and bulk food products.",
    matchLabel: "Why relevant?",
    match:
      "The product category and business role make it a potential research prospect for Indonesian bulk spice suppliers.",
    unconfirmedLabel: "Not established",
    unconfirmed:
      "There is no confirmation of a current need for Indonesian spices, openness to new suppliers, or willingness to purchase.",
    demoDate: "Public source reviewed: 20 October 2026",
    openSource: "Check the company's official website",
    exampleWarning:
      "Status: identified prospect, not a verified active buyer or confirmed purchasing interest.",
    scopeTitle: "Potential report deliverables",
    deliverables: [
      "Company profiles and product fit rationale",
      "Source URLs and review dates",
      "Public business contact channels, where available",
      "Evidence status and outstanding questions",
      "Outreach drafts and follow-up worksheet",
    ],
    scopeFoot:
      "Prospect count, depth of checking, deliverables, schedule, and fees are agreed after reviewing your request. No buyer quantity or price is promised upfront.",
    requestTitle: "Start with one product",
    requestBody:
      "Share a short brief. The form prepares a WhatsApp or email message for you to send. No automatic order or payment is made.",
    faqTitle: "Frequently asked questions",
    faqs: [
      {
        q: "Does BECE guarantee a buyer?",
        a: "No. Research provides potential companies to assess and contact. Replies, interest, and transactions depend on the recipient.",
      },
      {
        q: "Are all prospects confirmed importers?",
        a: "No. Each company is labeled according to its role and available supporting evidence.",
      },
      {
        q: "Does completing the form place an order?",
        a: "No. The form only prepares a WhatsApp or email inquiry. BECE discusses scope and fees before work begins.",
      },
      {
        q: "Are buyer contacts and import records always available?",
        a: "No. Some records are private or require licensed data access. Missing information is reported, not invented.",
      },
    ],
    relatedTitle: "Continue your export preparation",
    relatedBody: "Explore Export Intelligence or other tailored research services.",
    relatedMarket: "Export Intelligence",
    relatedCustom: "Custom Market & Supply Research",
  },
  zh: {
    eyebrow: "BECE BUYER DISCOVERY · 试点",
    title: "为您的产品寻找潜在海外买家。",
    summary:
      "根据印尼产品开展海外企业研究，提供潜在客户的匹配理由、公开来源与初步联系建议。",
    note: "按需提供人工辅助研究，尚非自动搜索或实时认证买家数据库。",
    request: "咨询买家研究",
    example: "查看示例报告",
    benefitTitle: "从企业名单到实际联系行动",
    benefitDescription: "BECE 帮助评估潜在客户，但不保证企业正在采购。",
    benefits: [
      { title: "与产品相关的企业", body: "根据品类、规格、国家与企业类型筛选。" },
      { title: "可追溯的公开证据", body: "注明来源链接、查看日期与尚待核实的信息。" },
      { title: "联系准备", body: "提供初次联系建议、邮件草稿与跟进记录表。" },
    ],
    stepsTitle: "服务流程",
    steps: [
      { title: "说明产品", body: "提供产品、规格、供货能力及目标市场（如已确定）。" },
      { title: "确认研究范围", body: "开始前讨论目标企业类型、资料条件、交付数量、时间及费用。" },
      { title: "获取研究结果", body: "接收潜在企业资料、公开来源、核查限制和联系建议。" },
    ],
    demoTag: "演示 · 研究报告样例",
    demoTitle: "示例：印尼散装香料 → 马来西亚",
    demoLead: "仅用于展示一家真实企业的证据整理方法，并非实时买家查询或采购需求。",
    companyLabel: "潜在企业",
    company: "Pemborong Maju A&A Sdn Bhd",
    countryLabel: "国家 / 企业类型",
    country: "马来西亚 · 食品进口及分销企业（根据其官网说明）",
    evidenceLabel: "公开资料",
    evidence: "官网表示该企业供应和进口商品，包括香料及散装食品。",
    matchLabel: "匹配原因",
    match: "产品品类与业务模式适合印尼散装香料供应商进一步研究。",
    unconfirmedLabel: "尚未确认",
    unconfirmed: "无法确认其目前需要印尼香料、接受新供应商或有采购意向。",
    demoDate: "公开资料查看日期：2026 年 10 月 20 日",
    openSource: "访问企业官方网站",
    exampleWarning: "状态：仅为已发现的潜在企业，非已确认采购的买家。",
    scopeTitle: "报告可能包含",
    deliverables: [
      "企业资料及产品匹配理由",
      "来源链接与核查日期",
      "可获得的公开商务联系方式",
      "证据状态及待确认事项",
      "联系邮件范本与跟进表",
    ],
    scopeFoot: "企业数量、核查深度、交付内容、时间及费用在评估需求后协商，不预先保证买家数量或报价。",
    requestTitle: "从一个产品开始",
    requestBody: "填写简要需求，系统生成由您自行发送的 WhatsApp 或邮件，不会自动下单或付款。",
    faqTitle: "常见问题",
    faqs: [
      { q: "BECE 保证找到愿意购买的买家吗？", a: "不保证。研究仅提供可供审核与联系的潜在企业。是否回复或交易由对方决定。" },
      { q: "所有企业都已确认是进口商吗？", a: "不一定。各企业会根据可获得的证据标明类别与核查状态。" },
      { q: "提交表单后是否立即下单？", a: "不会。表单仅生成 WhatsApp 或邮件咨询信息，工作范围及费用将另行讨论。" },
      { q: "总能查到联系人与进口记录吗？", a: "不能。部分记录不公开或需要合法授权，缺失的信息会如实说明。" },
    ],
    relatedTitle: "继续您的出口准备",
    relatedBody: "查看出口情报或其他定制研究服务。",
    relatedMarket: "Export Intelligence",
    relatedCustom: "Custom Market & Supply Research",
  },
} satisfies Record<Locale, {
  eyebrow: string;
  title: string;
  summary: string;
  note: string;
  request: string;
  example: string;
  benefitTitle: string;
  benefitDescription: string;
  benefits: { title: string; body: string }[];
  stepsTitle: string;
  steps: { title: string; body: string }[];
  demoTag: string;
  demoTitle: string;
  demoLead: string;
  companyLabel: string;
  company: string;
  countryLabel: string;
  country: string;
  evidenceLabel: string;
  evidence: string;
  matchLabel: string;
  match: string;
  unconfirmedLabel: string;
  unconfirmed: string;
  demoDate: string;
  openSource: string;
  exampleWarning: string;
  scopeTitle: string;
  deliverables: string[];
  scopeFoot: string;
  requestTitle: string;
  requestBody: string;
  faqTitle: string;
  faqs: { q: string; a: string }[];
  relatedTitle: string;
  relatedBody: string;
  relatedMarket: string;
  relatedCustom: string;
}>;

const benefitIcons = [FileSearch, ShieldCheck, MailCheck];

export function BuyerDiscoveryPage({ locale }: { locale: Locale }) {
  const text = contentByLocale[locale];
  return (
    <div className="bg-soft">
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,169,157,0.22),transparent_40%),radial-gradient(circle_at_10%_90%,rgba(244,180,0,0.13),transparent_35%)]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:px-8 lg:py-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal">{text.eyebrow}</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl">{text.title}</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200">{text.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#request" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-teal px-5 py-3 text-sm font-bold text-white hover:bg-emerald-700">
                {text.request}<ArrowRight size={18} aria-hidden="true" />
              </a>
              <a href="#demo" className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/30 px-5 py-3 text-sm font-bold text-white hover:bg-white/10">
                {text.example}<ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
            <p className="mt-6 max-w-2xl border-l-2 border-gold/70 pl-4 text-sm leading-6 text-slate-300">{text.note}</p>
          </div>
          <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-soft backdrop-blur-sm">
            <div className="flex items-center gap-3"><Globe2 size={24} className="text-teal" aria-hidden="true" /><span className="text-sm font-bold">{text.scopeTitle}</span></div>
            <ul className="mt-5 space-y-4">
              {text.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-100">
                  <CheckCircle2 size={18} className="mt-1 shrink-0 text-teal" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-white/15 pt-5 text-xs leading-6 text-slate-300">{text.scopeFoot}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-black text-navy sm:text-3xl">{text.benefitTitle}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{text.benefitDescription}</p>
        <div className="mt-7 grid gap-5 md:grid-cols-3">
          {text.benefits.map((benefit, index) => {
            const Icon = benefitIcons[index];
            return (
              <article key={benefit.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal/10 text-teal"><Icon size={23} aria-hidden="true" /></span>
                <h3 className="mt-5 text-lg font-bold text-navy">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{benefit.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black text-navy sm:text-3xl">{text.stepsTitle}</h2>
          <ol className="mt-7 grid gap-5 md:grid-cols-3">
            {text.steps.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-slate-200 bg-soft p-6">
                <span className="text-xl font-black text-teal">0{index + 1}</span>
                <h3 className="mt-3 text-lg font-bold text-navy">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="demo" className="scroll-mt-24 mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-6 py-5 sm:px-8">
            <span className="rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-navy">{text.demoTag}</span>
            <span className="text-xs font-semibold text-slate-500">{text.demoDate}</span>
          </div>
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-black text-navy">{text.demoTitle}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{text.demoLead}</p>
            <dl className="mt-7 grid gap-5 sm:grid-cols-2">
              {[
                [text.companyLabel, text.company],
                [text.countryLabel, text.country],
                [text.evidenceLabel, text.evidence],
                [text.matchLabel, text.match],
              ].map(([label, description]) => (
                <div key={label} className="rounded-2xl bg-soft p-5">
                  <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</dt>
                  <dd className="mt-2 text-sm leading-7 text-navy">{description}</dd>
                </div>
              ))}
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:col-span-2">
                <dt className="text-xs font-bold uppercase tracking-wider text-amber-950">{text.unconfirmedLabel}</dt>
                <dd className="mt-2 text-sm leading-7 text-amber-950">{text.unconfirmed}</dd>
              </div>
            </dl>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href="https://pemborongmaju.com.my/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-teal hover:text-navy"
              >
                {text.openSource}<ExternalLink size={17} aria-hidden="true" />
              </a>
              <p className="text-xs leading-6 text-slate-500">{text.exampleWarning}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="request" className="scroll-mt-24 border-y border-slate-200 bg-white py-14">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-xl bg-teal/10 px-3 py-2 text-xs font-bold uppercase tracking-wider text-teal"><ClipboardCheck size={17} aria-hidden="true" />{text.eyebrow}</span>
            <h2 className="mt-5 text-3xl font-black text-navy">{text.requestTitle}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">{text.requestBody}</p>
          </div>
          <BuyerDiscoveryForm locale={locale} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-black text-navy">{text.faqTitle}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {text.faqs.map((faq) => (
            <article key={faq.q} className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="text-base font-bold text-navy">{faq.q}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{faq.a}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-3xl bg-navy p-6 text-white sm:p-8">
          <h2 className="text-xl font-bold">{text.relatedTitle}</h2>
          <p className="mt-2 text-sm leading-7 text-slate-200">{text.relatedBody}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={localePath(locale, "/export-os/intelligence")} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-navy">
              {text.relatedMarket}<ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link href={localePath(locale, "/services/custom-research")} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/40 px-4 py-2 text-sm font-bold text-white">
              {text.relatedCustom}<ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
