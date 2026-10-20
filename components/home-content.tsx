import Link from "next/link";
import type { Locale } from "@/data/apps";
import { apps } from "@/data/apps";
import { localePath } from "@/lib/routes";
import { AppGrid } from "./app-grid";
import { HeroSection } from "./hero-section";
import { SectionHeading } from "./section-heading";
import { SocialContactSection } from "./social-contact-section";

export function HomeContent({ locale }: { locale: Locale }) {
  const copy = {
    id: {
      customService: "Riset khusus sesuai kebutuhan bisnis",
      customTitle: "Custom Market & Supply Research",
      customBody: "Butuh data pemasok, kapasitas produksi, harga komoditas, atau dasar penawaran? Riset disusun menurut produk, wilayah, dan keputusan bisnis, lengkap dengan sumber serta pemisahan data aktual dan estimasi.",
      customAction: "Pelajari layanan riset",
      tools: "Empat alat untuk mulai bekerja",
      description:
        "Cari referensi HS, hitung biaya ekspor, siapkan dokumen, dan susun riset.",
      results: "Dari hasil ke tindakan",
      report: "Laporan pasar Hong Kong",
      reportBody:
        "Pelajari pasar, persyaratan, dan cara mencari buyer. Gunakan referensi untuk pemeriksaan lanjutan.",
      plan: "Skenario biaya dan rencana ekspor",
      planBody:
        "Isi produk, nilai kesiapan, dan simulasikan biaya. Unduh hasil beserta asumsi dan tiga tindakan prioritas.",
      guide: "Baru mulai? Ikuti tiga langkah",
      steps: [
        "Isi produk dan pasar yang ingin Anda teliti.",
        "Nilai kesiapan dan hitung skenario biaya.",
        "Gunakan hasilnya untuk riset lanjutan atau konsultasi.",
      ],
      caseTitle: "Contoh penggunaan: menyiapkan kopi untuk ekspor",
      caseBody:
        "Masukkan contoh 500 unit kopi, biaya produksi Rp80.000 per unit, harga jual Rp125.000, serta ongkir dan dokumen Rp7.000.000. Hasil estimasi: biaya Rp47.000.000 dan margin Rp15.500.000. Lanjutkan dengan verifikasi kemasan, sertifikasi, dan pembayaran.",
      caseNote:
        "Contoh simulasi, bukan studi kasus transaksi nyata. Sumber: asumsi input kalkulator.",
      open: "Buka",
    },
    en: {
      customService: "Tailored research for business decisions",
      customTitle: "Custom Market & Supply Research",
      customBody: "Need supplier maps, production estimates, commodity price history, or procurement analysis? Get research scoped to your product and region with transparent sources and assumptions.",
      customAction: "Explore research service",
      tools: "Four tools to get started",
      description:
        "Explore HS references, estimate export costs, prepare documents, and organize research.",
      results: "Turn results into actions",
      report: "Hong Kong market report",
      reportBody:
        "Explore the market, requirements, and buyer research. Follow references for further verification.",
      plan: "Export cost scenario and action plan",
      planBody:
        "Describe your product, assess readiness, and estimate costs. Download assumptions and three priority actions.",
      guide: "New here? Follow three steps",
      steps: [
        "Describe your product and a market to research.",
        "Assess readiness and estimate a cost scenario.",
        "Use the result for further research or consultation.",
      ],
      caseTitle: "Example: preparing coffee for export",
      caseBody:
        "Try 500 units of coffee, IDR80,000 production cost per unit, IDR125,000 selling price, and IDR7,000,000 shipping and documents. Estimated total cost: IDR47,000,000; margin: IDR15,500,000. Next, verify packaging, certification, and payment terms.",
      caseNote:
        "Illustrative calculation, not a real transaction case study. Source: calculator input assumptions.",
      open: "Open",
    },
    zh: {
      customService: "按业务需求定制研究",
      customTitle: "Custom Market & Supply Research",
      customBody: "需要供应商信息、产量估算、商品历史价格或采购成本分析？根据商品和地区开展研究，并注明来源与假设。",
      customAction: "了解研究服务",
      tools: "四个工具助您开始",
      description: "查询 HS 参考、估算出口成本、准备文件并组织研究。",
      results: "将结果转化为行动",
      report: "香港市场报告",
      reportBody: "了解市场、要求与买家研究。通过参考资料进行进一步验证。",
      plan: "出口成本情景与行动计划",
      planBody: "描述产品、评估准备度并估算成本。下载假设与三项优先行动。",
      guide: "首次使用？遵循三个步骤",
      steps: [
        "描述产品并选择研究市场。",
        "评估准备度并估算成本情景。",
        "使用结果继续研究或咨询。",
      ],
      caseTitle: "使用示例：准备咖啡出口",
      caseBody:
        "尝试 500 件咖啡、每件生产成本 80,000 印尼盾、售价 125,000 印尼盾，以及 7,000,000 印尼盾的运输和文件费用。估算总成本为 47,000,000 印尼盾，利润为 15,500,000 印尼盾。接着验证包装、认证和付款条件。",
      caseNote: "示例计算，并非真实交易案例。来源：计算器输入假设。",
      open: "打开",
    },
  }[locale];
  const featured = [
    "btki-smart-search",
    "kalkulator-sawit",
    "ocr-translate-pdf",
    "research-workbench",
  ].flatMap((slug) => apps.find((app) => app.slug === slug) ?? []);
  const buyerCopy = locale === "id" ? {
    eyebrow: "Layanan riset ekspor · Pilot",
    title: "Temukan calon buyer untuk produk Anda",
    description: "Riset perusahaan luar negeri sesuai produk Anda, dilengkapi bukti publik, alasan kecocokan, dan panduan menghubungi prospek. Tidak menjamin transaksi.",
    action: "Lihat Buyer Discovery"
  } : locale === "zh" ? {
    eyebrow: "出口研究服务 · 试点",
    title: "寻找适合您产品的潜在海外买家",
    description: "按产品研究海外企业，提供公开来源、匹配理由与联系建议。不保证成交。",
    action: "了解 Buyer Discovery"
  } : {
    eyebrow: "Export research service · Pilot",
    title: "Find potential overseas buyers for your product",
    description: "Product-specific company research with public sources, fit reasons, and suggested outreach. No purchase guarantee.",
    action: "Explore Buyer Discovery"
  };
  return (
    <>
      <HeroSection locale={locale} />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading title={copy.tools} description={copy.description} />
        <div className="mt-6">
          <AppGrid apps={featured} locale={locale} />
        </div>
      </section>
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title={copy.results} />
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {[
              {
                title: copy.report,
                body: copy.reportBody,
                path: "/market-intelligence/hong-kong",
              },
              { title: copy.plan, body: copy.planBody, path: "/export-os" },
            ].map((item) => (
              <Link
                key={item.path}
                href={localePath(locale, item.path)}
                className="rounded-3xl border border-slate-200 bg-soft p-6 hover:border-teal"
              >
                <h3 className="text-xl font-bold text-navy">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {item.body}
                </p>
                <span className="mt-4 block font-bold text-navy">
                  {copy.open} →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading title={copy.guide} />
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {copy.steps.map((step, i) => (
            <li
              key={step}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <span className="text-2xl font-black text-teal">0{i + 1}</span>
              <p className="mt-3 leading-7 text-navy">{step}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 rounded-3xl bg-navy p-6 text-white">
          <h2 className="text-xl font-bold">{copy.caseTitle}</h2>
          <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-200">
            {copy.caseBody}
          </p>
          <p className="mt-3 text-xs text-slate-300">{copy.caseNote}</p>
          <Link
            href={localePath(locale, "/export-os")}
            className="mt-5 inline-flex min-h-12 items-center rounded-xl bg-white px-4 font-bold text-navy"
          >
            {copy.plan} →
          </Link>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-4 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-6 rounded-3xl border border-teal/20 bg-white p-6 shadow-sm sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal">{buyerCopy.eyebrow}</p>
            <h2 className="mt-3 text-2xl font-black text-navy sm:text-3xl">{buyerCopy.title}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{buyerCopy.description}</p>
          </div>
          <Link href={localePath(locale, "/buyer-discovery")} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-navy px-5 py-3 text-sm font-bold text-white hover:bg-navy-light">
            {buyerCopy.action} →
          </Link>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-navy p-6 text-white sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal">{copy.customService}</p>
          <h2 className="mt-3 text-2xl font-black sm:text-3xl">{copy.customTitle}</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200">{copy.customBody}</p>
          <Link href={localePath(locale, "/services/custom-research")} className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-teal px-5 py-3 text-sm font-bold text-white hover:bg-emerald-700">{copy.customAction} →</Link>
        </div>
      </section>
      <SocialContactSection locale={locale} />
    </>
  );
}
