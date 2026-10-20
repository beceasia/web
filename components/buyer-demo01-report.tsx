import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, ShieldAlert } from "lucide-react";
import type { Locale } from "@/data/apps";
import { CONTACT_EMAIL } from "@/data/contact";
import { localePath } from "@/lib/routes";

const companies = [
  {
    name: "Pemborong Maju A&A Sdn Bhd",
    location: "Batu Caves, Selangor",
    role: "Importir dan distributor rempah",
    fit: "Situs resmi menyebut impor dan distribusi rempah curah serta mencantumkan Black Pepper.",
    contact: "purchase@pemborongmaju.com.my",
    url: "https://pemborongmaju.com.my/index.php/product/",
    status: "P1",
    question: "Apakah sedang menilai pemasok lada hitam Indonesia? Apa grade, MOQ, dan dokumen yang dibutuhkan?",
  },
  {
    name: "Citra Spice Mart (M) Sdn Bhd",
    location: "Brickfields, Kuala Lumpur",
    role: "Importir, grosir, dan ritel rempah",
    fit: "Profil resmi menyebut kegiatan impor rempah serta portofolio lada hitam dan lada putih.",
    contact: "care@citras.com.my",
    url: "https://www.citras.com.my/about-us",
    status: "P1",
    question: "Apakah menerima pemasok baru untuk lada hitam utuh? Siapa bagian purchasing?",
  },
  {
    name: "Sheng Kimn Hong Sdn Bhd",
    location: "Butterworth, Pulau Pinang",
    role: "Perusahaan perdagangan rempah",
    fit: "Situs perusahaan menampilkan perdagangan rempah dan produk lada; aktivitas pembelian dari Indonesia belum terbukti.",
    contact: "office@skhpg.com",
    url: "https://skhspices.com/",
    status: "P1*",
    question: "Apakah perusahaan membeli lada hitam utuh asal Indonesia, dan dengan spesifikasi apa?",
  },
  {
    name: "Sri Jaya Impex Sdn Bhd",
    location: "Port Klang, Selangor",
    role: "Importir bahan baku pangan",
    fit: "Informasi website yang terindeks menunjukkan whole black pepper, termasuk grade bulk density 500/550 g/L.",
    contact: "cc@srijayaimpex.com.my",
    url: "https://www.srijayaimpex.com/",
    status: "P1*",
    question: "Apakah lada dari Indonesia diterima, dan apakah perlu sterilization, COA, atau standar lain?",
  },
  {
    name: "Gaban Spice Manufacturing (M) Sdn Bhd",
    location: "Bukit Mertajam, Pulau Pinang",
    role: "Pengolah rempah",
    fit: "Situs resmi menampilkan produk Black Pepper dan fasilitas pengolahan rempah; kebutuhan bahan baku belum terbukti.",
    contact: "enquiry@gabanspice.com.my",
    url: "https://gabanspice.com.my/product/",
    status: "P2",
    question: "Apakah membeli lada hitam utuh sebagai bahan baku dan bagaimana kualifikasi pemasoknya?",
  },
] as const;

const sourceWits = "https://wits.worldbank.org/trade/comtrade/en/country/MYS/year/2024/tradeflow/Imports/partner/ALL/product/090411";
const sourceKkm = "https://hq.moh.gov.my/fsq/prosedur-pengimportan-makanan";

const copy = {
  id: {
    back:"Kembali ke Buyer Discovery",
    status:"DEMO 01 · Bukan buyer terkonfirmasi",
    title:"Lada Hitam Indonesia ke Malaysia",
    desc:"Contoh shortlist perusahaan potensial berbasis sumber publik. Data ini bukan permintaan pembelian, RFQ, atau jaminan transaksi.",
    review:"Sumber diperiksa 21 Oktober 2026",
    market:"Konteks pasar",
    import:"Impor Malaysia 2024",
    indonesia:"Asal Indonesia 2024",
    share:"Porsi asal Indonesia",
    limitation:"HS 090411 adalah lada dari genus Piper yang tidak dihancurkan/digiling, termasuk lada hitam dan putih. Angka perdagangan antarnegara ini bukan volume pembelian perusahaan prospek.",
    companies:"Lima perusahaan prospek",
    priority:"Prioritas riset dan pendekatan",
    evidence:"Bukti relevansi",
    toCheck:"Hal yang perlu dikonfirmasi",
    site:"Lihat sumber perusahaan",
    caveat:"P1 menunjukkan relevansi produk dan bisnis. P1* membutuhkan pemeriksaan ulang tambahan. P2 menunjukkan perusahaan pengolah terkait. Kode ini bukan probabilitas pembelian atau tingkat verifikasi transaksi.",
    questions:"Sebelum menghubungi perusahaan",
    prep:"Siapkan spesifikasi nyata: bentuk/grade lada, moisture, bulk density, kemasan, kapasitas, MOQ, lead time, sertifikasi yang dimiliki, dan harga menurut Incoterms.",
    importRules:"Persyaratan pasar Malaysia",
    importText:"Kementerian Kesihatan Malaysia menjelaskan pemeriksaan impor pangan, sistem FoSIM, dan kemungkinan persyaratan dokumen khusus. Pemeriksaan produk, kode tarif nasional, serta karantina perlu dilakukan untuk transaksi aktual.",
    warning:"Belum ada email yang dikirim, kebutuhan pembelian yang dikonfirmasi, respons, kontrak, atau hubungan bisnis BECE dengan perusahaan di atas. Kontak publik belum diuji keterkirimannya.",
    action:"Ajukan riset sesuai produk saya",
    foot:"Contoh hasil layanan riset manual berbantuan AI, bukan pencarian buyer otomatis.",
  },
  en: {
    back:"Back to Buyer Discovery",status:"DEMO 01 · Not confirmed buyers",
    title:"Indonesian Black Pepper to Malaysia",
    desc:"A sample company shortlist based on public sources. These are not confirmed inquiries, RFQs, or guaranteed transactions.",
    review:"Sources reviewed 21 October 2026",market:"Market context",import:"Malaysia imports 2024",
    indonesia:"From Indonesia 2024",share:"Indonesia share",
    limitation:"HS 090411 covers uncrushed/unground pepper of the genus Piper, including both black and white pepper. Country trade figures are not company-level purchase records.",
    companies:"Five company prospects",priority:"Research priority",evidence:"Why this company may be relevant",
    toCheck:"What needs confirmation",site:"Company source",
    caveat:"P1 indicates category and business relevance; P1* also requires additional checks; P2 is a related processor. These are not purchase probabilities.",
    questions:"Before reaching out",prep:"Prepare actual product grade, moisture, bulk density, packaging, supply capacity, MOQ, lead time, held certifications, and an Incoterms quotation.",
    importRules:"Malaysia import requirements",importText:"Malaysia's Ministry of Health sets out imported-food checks, FoSIM and potential special documentation. Confirm applicable product, national tariff and quarantine rules before any transaction.",
    warning:"No emails have been sent, and there is no confirmed purchasing demand, response, contract or relationship with BECE. Public email channels have not been delivery-tested.",
    action:"Request my product research",foot:"Sample of manually assisted research, not a live automated buyer search.",
  },
  zh: {
    back:"返回 Buyer Discovery",status:"演示 01 · 非已确认买家",
    title:"印尼黑胡椒出口马来西亚",desc:"根据公开资料整理的潜在企业名单。并非已确认询盘、报价请求或保证成交。",
    review:"资料核查：2026 年 10 月 21 日",market:"市场背景",import:"2024 年马来西亚进口量",
    indonesia:"2024 年来自印尼",share:"印尼占比",
    limitation:"HS 090411 涵盖未研磨的胡椒，包括黑胡椒及白胡椒。国家贸易数据不代表某企业的采购量。",
    companies:"五家潜在企业",priority:"研究优先级",evidence:"相关依据",toCheck:"待确认信息",site:"企业公开来源",
    caveat:"P1 表示品类与业务相关；P1* 需要额外核查；P2 表示相关加工企业。这些均非采购概率。",
    questions:"联系企业前",prep:"准备真实产品等级、水分、容重、包装、供货能力、MOQ、交期、现有认证及 Incoterms 报价。",
    importRules:"马来西亚进口要求",importText:"马来西亚卫生部说明食品进口监管、FoSIM 及特定文件要求。实际交易前应确认产品要求、国内税号和检疫规定。",
    warning:"尚未发送邮件，未确认采购需求、回复、合同或 BECE 与企业的商业关系，公开邮箱也未经投递验证。",
    action:"申请定制买家研究",foot:"人工辅助研究示例，并非实时自动买家搜索。",
  }
} as const;

export function BuyerDemo01Report({locale}:{locale:Locale}) {
  const t=copy[locale];
  return <div className="bg-soft">
    <section className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <Link href={localePath(locale,"/buyer-discovery")} className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-teal"><ArrowLeft size={18}/>{t.back}</Link>
        <p className="mt-8 text-xs font-black uppercase tracking-[.2em] text-gold">{t.status}</p>
        <h1 className="mt-4 max-w-4xl text-3xl font-black sm:text-5xl">{t.title}</h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-slate-200">{t.desc}</p>
        <p className="mt-5 text-xs text-slate-300">{t.review}</p>
      </div>
    </section>
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-black text-navy">{t.market}</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[[t.import,"3.094,7 ton"],[t.indonesia,"817,3 ton"],[t.share,"26,4%"]].map(([label,value])=><div key={label} className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-xs text-slate-600">{label}</p><p className="mt-2 text-3xl font-black text-navy">{value}</p>
        </div>)}
      </div>
      <p className="mt-5 max-w-4xl text-sm leading-7 text-slate-600">{t.limitation}</p>
      <a href={sourceWits} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex gap-2 text-sm font-bold text-teal">World Bank WITS 2024 <ExternalLink size={16}/></a>
    </section>
    <section className="border-y border-slate-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-black text-navy">{t.companies}</h2>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-600">{t.caveat}</p>
        <div className="mt-7 grid gap-5">
          {companies.map((c,index)=><article key={c.name} className="rounded-3xl border border-slate-200 bg-soft p-5 sm:p-7">
            <div className="flex flex-wrap justify-between gap-2"><div><p className="text-xs font-bold text-teal">0{index+1} · {c.location}</p>
              <h3 className="mt-2 text-xl font-black text-navy">{c.name}</h3></div>
              <span className="h-fit rounded-full bg-teal/10 px-3 py-1 text-xs font-bold text-teal">{c.status}</span>
            </div>
            <p className="mt-2 text-sm font-semibold text-slate-500">{c.role}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div><p className="text-xs font-bold uppercase tracking-wide text-navy">{t.evidence}</p><p className="mt-2 text-sm leading-7 text-slate-700">{c.fit}</p></div>
              <div><p className="text-xs font-bold uppercase tracking-wide text-navy">{t.toCheck}</p><p className="mt-2 text-sm leading-7 text-slate-700">{c.question}</p></div>
            </div>
            <div className="mt-5 flex flex-wrap gap-4 border-t border-slate-200 pt-4">
              <span className="text-sm font-semibold text-slate-700">{c.contact}</span>
              <a href={c.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-teal">{t.site}<ExternalLink size={16}/></a>
            </div>
          </article>)}
        </div>
      </div>
    </section>
    <section className="mx-auto max-w-7xl space-y-6 px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="text-lg font-black text-navy">{t.questions}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-700">{t.prep}</p></div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="text-lg font-black text-navy">{t.importRules}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-700">{t.importText}</p>
        <a href={sourceKkm} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex gap-2 text-sm font-bold text-teal">Ministry of Health Malaysia <ExternalLink size={16}/></a></div>
      <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <ShieldAlert size={21} className="mt-1 shrink-0 text-amber-800"/><p className="text-sm leading-7 text-amber-950">{t.warning}</p>
      </div>
    </section>
    <section className="bg-navy py-12 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="max-w-3xl text-sm leading-7 text-slate-200">{t.foot}</p>
        <div className="mt-5 flex flex-wrap gap-4">
          <Link href={localePath(locale,"/buyer-discovery")+"#request"} className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-teal px-5 py-3 text-sm font-bold text-white">{t.action}<ArrowRight size={18}/></Link>
          <a href={"mailto:"+CONTACT_EMAIL} className="inline-flex min-h-12 items-center rounded-xl border border-white/30 px-5 text-sm font-bold text-white">{CONTACT_EMAIL}</a>
        </div>
      </div>
    </section>
  </div>;
}
