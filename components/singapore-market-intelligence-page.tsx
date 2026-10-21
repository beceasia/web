import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Globe2, Ship } from "lucide-react";
import type { Locale } from "@/data/apps";
import { singaporeMarket as market } from "@/data/singapore-market";
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

export function SingaporeMarketIntelligencePage({ locale }: { locale: Locale }) {
  const l = (id: string, en: string, zh: string) => marketText({ id, en, zh }, locale);
  const sections = [
    ["overview", l("Ringkasan", "Overview", "概览")],
    ["trade", l("Perdagangan", "Trade", "贸易")],
    ["products", l("Produk potensial", "Product fit", "潜力产品")],
    ["regions", l("Wilayah & kanal", "Regions & channels", "地区与渠道")],
    ["requirements", l("Persyaratan", "Requirements", "准入要求")],
    ["partners", l("Calon mitra", "Potential partners", "潜在伙伴")],
    ["logistics", l("Logistik & risiko", "Logistics & risks", "物流与风险")],
    ["prices", l("Harga & biaya", "Prices & costs", "价格与成本")],
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
              <div className="flex items-center justify-between gap-4"><Globe2 aria-hidden="true" className="h-9 w-9 text-gold" /><span className="text-sm font-semibold text-white/70">Indonesia → Singapore</span></div>
              <p className="mt-7 text-3xl font-black">{l("Satu produk. Satu kanal.", "One product. One channel.", "一个产品，一个渠道。")}</p>
              <p className="mt-4 text-sm leading-7 text-white/80">{marketText(market.summary, locale)}</p>
              <a href="#roadmap" className="mt-6 inline-flex items-center gap-2 rounded-full bg-teal px-5 py-3 text-sm font-bold text-white">{l("Siapkan langkah masuk", "Plan market entry", "规划市场进入")}<ArrowRight aria-hidden="true" className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <nav aria-label={l("Isi laporan Singapura", "Singapore report contents", "新加坡报告目录")} className="mb-10 flex flex-wrap gap-2 print:hidden">
          {sections.map(([id, label]) => <a key={id} href={`#${id}`} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 transition hover:border-teal hover:text-teal">{label}</a>)}
        </nav>
        <div className="space-y-14">
          <ReportSection id="overview" title={l("Singapura sebagai tujuan ekspor", "Singapore as an export destination", "新加坡作为出口目的地")}>
            <p className="max-w-4xl text-base leading-8 text-slate-600">{marketText(market.intro, locale)}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {market.metrics.map((metric) => <div key={metric.label.en} className={card}><p className="text-2xl font-black text-navy">{metric.value}</p><p className="mt-2 text-sm leading-6 text-slate-600">{marketText(metric.label, locale)}</p><SourceLinks ids={[metric.source]} /></div>)}
            </div>
            <p className="mt-5 text-xs leading-6 text-slate-500">{marketText(market.dataNote, locale)}</p>
          </ReportSection>

          <ReportSection id="trade" title={l("Perdagangan nonmigas Indonesia–Singapura", "Indonesia–Singapore non-oil-and-gas trade", "印尼—新加坡非油气贸易")}>
            <p className={body}>{l("Data Kemendag dari sudut Indonesia, USD juta, tahun penuh. Angka 2025 berstatus revisi. Ini bukan total perdagangan termasuk migas. Ekspor meningkat sekitar 31,28% pada 2025 setelah turun sekitar 9,99% pada 2024.", "Kemendag data from Indonesia’s perspective, USD million, full years. 2025 figures are revised. These are not total trade figures including oil and gas. Exports rose about 31.28% in 2025 after declining about 9.99% in 2024.", "印尼贸易部数据，印尼视角，单位百万美元，全年；2025年为修订值，不含油气。出口2024年下降约9.99%，2025年增长约31.28%。")}</p>
            <div className="mt-5 overflow-x-auto rounded-3xl border border-slate-200 bg-white">
              <table className="w-full min-w-[520px] text-left text-sm"><caption className="sr-only">{l("Perdagangan nonmigas, USD juta", "Non-oil-and-gas trade, USD million", "非油气贸易，百万美元")}</caption>
                <thead className="bg-navy text-white"><tr>{[l("Tahun", "Year", "年份"), l("Ekspor Indonesia", "Indonesia exports", "印尼出口"), l("Impor Indonesia", "Indonesia imports", "印尼进口"), l("Saldo Indonesia", "Indonesia balance", "印尼差额")].map((heading) => <th key={heading} scope="col" className="px-5 py-4">{heading}</th>)}</tr></thead>
                <tbody>{[["2023", 8348.5, 7979.2, 369.3], ["2024", 7514.6, 9747, -2232.4], ["2025r", 9865.1, 9343.1, 522]].map(([year, ...values]) => <tr key={year} className="border-t border-slate-100"><th scope="row" className="px-5 py-4 font-bold text-navy">{year}</th>{values.map((value, index) => <td key={index} className="px-5 py-4 tabular-nums text-slate-600">{Number(value).toLocaleString(locale === "id" ? "id-ID" : "en-SG", { minimumFractionDigits: 1 })}</td>)}</tr>)}</tbody>
              </table>
            </div>
            <SourceLinks ids={["exports", "imports"]} />
            <p className={`mt-4 ${body}`}>{l("Jangan menyamakan seri ini dengan impor Singapura dari Indonesia. Perbedaan FOB/CIF, waktu pencatatan, negara asal/pengiriman dan re-ekspor dapat menghasilkan selisih. Data produk di bawah memakai perspektif impor Singapura dari WITS/UN Comtrade.", "Do not equate this series with Singapore’s imports from Indonesia. FOB/CIF valuation, recording time, origin/consignment and re-export can create differences. Product data below use Singapore’s import perspective from WITS/UN Comtrade.", "该序列不可等同于新加坡自印尼进口。FOB/CIF计价、记录时间、原产/发运国及转口可能造成差异。以下产品数据采用WITS/UN Comtrade的新加坡进口视角。")}</p>
          </ReportSection>

          <ReportSection id="products" title={l("Produk Indonesia yang dapat ditelusuri", "Indonesian products to research", "可研究的印尼产品")}>
            <div className="grid gap-5 md:grid-cols-2">
              {market.products.map((product) => (
                <article key={product.hs} className={card}>
                  <span className="rounded-full bg-teal/10 px-3 py-1 text-xs font-bold text-teal">{l("Titik awal HS", "HS starting point", "HS初步参考")} {product.hs}</span>
                  <h3 className="mt-4 text-xl font-black text-navy">{marketText(product.name, locale)}</h3>
                  <p className={`mt-3 ${body}`}>{marketText(product.evidence, locale)}</p>
                  <SourceLinks ids={market.sources.some((source) => source.id === `${product.source}-partners`) ? [product.source, `${product.source}-partners`] : [product.source]} />
                  <p className="mt-5 text-xs font-bold uppercase tracking-wider text-teal">{l("Target kanal", "Target channel", "目标渠道")}</p>
                  <p className={`mt-1 ${body}`}>{marketText(product.buyer, locale)}</p>
                  <p className={`mt-3 border-t border-slate-100 pt-3 ${body}`}>{marketText(product.action, locale)}</p>
                </article>
              ))}
            </div>
          </ReportSection>

          <ReportSection id="regions" title={l("Pilih wilayah dan saluran masuk", "Choose a region and entry channel", "选择地区与进入渠道")}>
            <div className="grid gap-5 md:grid-cols-3">{market.regions.map((region) => <article key={region.title.en} className={card}><h3 className="text-lg font-black text-navy">{marketText(region.title, locale)}</h3><p className={`mt-3 ${body}`}>{marketText(region.body, locale)}</p></article>)}</div>
            <SourceLinks ids={["foodstats"]} />
          </ReportSection>

          <ReportSection id="requirements" title={l("Periksa persyaratan sebelum menawarkan", "Check requirements before quoting", "报价前核查准入要求")}>
            <div className="grid gap-5 md:grid-cols-2">{market.requirements.map((item) => <article key={item.title.en} className={card}><CheckCircle2 aria-hidden="true" className="h-6 w-6 text-teal" /><h3 className="mt-4 text-lg font-black text-navy">{marketText(item.title, locale)}</h3><p className={`mt-3 ${body}`}>{marketText(item.body, locale)}</p><SourceLinks ids={item.sources} /></article>)}</div>
          </ReportSection>

          <ReportSection id="partners" title={l("Temukan dan periksa calon mitra", "Find and verify potential partners", "寻找并核查潜在伙伴")}>
            <p className={`max-w-4xl ${body}`}>{marketText(market.partnerNote, locale)}</p>
            <SourceLinks ids={["acra", "trustbar", "sfma"]} />
            <div className="mt-6 grid gap-5 md:grid-cols-3">{market.partners.map((partner) => <article key={partner.name} className={card}><h3 className="text-lg font-black text-navy">{partner.name}</h3><p className={`mt-3 ${body}`}>{marketText(partner.channel, locale)}</p><a href={partner.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-teal underline underline-offset-4">{l("Profil perusahaan", "Company profile", "公司资料")}<ArrowUpRight aria-hidden="true" className="h-4 w-4" /></a></article>)}</div>
          </ReportSection>

          <ReportSection id="logistics" title={l("Hitung logistik dan kelola risiko", "Cost logistics and manage risks", "核算物流与管理风险")}>
            <div className="rounded-3xl bg-navy p-6 text-white sm:p-8"><Ship aria-hidden="true" className="h-8 w-8 text-gold" /><p className="mt-4 max-w-5xl text-sm leading-8 text-white/85">{marketText(market.logistics, locale)}</p></div>
            <div className="mt-5 grid gap-5 md:grid-cols-3">{market.risks.map((risk) => <article key={risk.title.en} className={card}><h3 className="text-lg font-black text-navy">{marketText(risk.title, locale)}</h3><p className={`mt-3 ${body}`}>{marketText(risk.body, locale)}</p></article>)}</div>
          </ReportSection>

          <ReportSection id="prices" title={l("Pembanding harga dan simulasi biaya", "Price benchmarks and cost simulation", "价格比较与成本模拟")}>
            <p className={body}>{l("Harga eceran FairPrice dalam SGD, diamati 21 Oktober 2026. Harga, stok dan promosi dapat berubah; harga ini bukan penerimaan eksportir atau konfirmasi ketersediaan checkout. Tidak ada konversi rupiah.", "FairPrice retail prices in SGD, observed 21 October 2026. Prices, stock and promotions may change; these are not exporter receipts or checkout availability confirmations. No rupiah conversion is used.", "FairPrice新元零售价，观察日期2026年10月21日。价格、库存及促销可能变化，并非出口商收入或结算库存确认；未换算印尼盾。")}</p>
            <div className="mt-5 grid gap-4 md:grid-cols-3">{[
              { name: "Singlong Sambal Belacan", pack: "230 g", price: "3.26", url: "https://www.fairprice.com.sg/product/singlong-sambal-belacan-chili-230g-11229046" },
              { name: "Prima Taste Sambal Belachan", pack: "80 g", price: "2.25", url: "https://www.fairprice.com.sg/product/prima-taste-sambal-belachan-paste-80g-13069397" },
              { name: "Soup Restaurant Samsui Sambal", pack: "150 g", price: "6.93", url: "https://www.fairprice.com.sg/product/soup-restaurant-samsui-sambal-sauce-150g-13015665" },
            ].map((item) => <article key={item.name} className={card}><h3 className="font-bold text-navy">{item.name}</h3><p className={`mt-2 ${body}`}>{item.pack} · SGD {item.price} · FairPrice</p><a href={item.url} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm font-bold text-teal underline">{l("Lihat produk", "View product", "查看产品")}</a></article>)}</div>
            <div className={`mt-6 ${card}`}>
              <h3 className="text-xl font-black text-navy">{l("Simulasi hipotetis, bukan tarif aktual", "Hypothetical simulation, not an actual quote", "假设模拟，并非实际报价")}</h3>
              <p className={`mt-3 ${body}`}>{l("Asumsi 1.000 unit × 200 g (200 kg), mata uang SGD, harga barang FCA tempat asal 3.000. Angkutan utama 350, asuransi 20 dan biaya insidental kena GST 30 menghasilkan dasar impor 3.400. Duty diasumsikan nol untuk pangan biasa yang sesuai klasifikasi. GST 9% = 306. Tambahan handling 250 dan pengantaran lokal 150: kebutuhan kas 4.106 atau sekitar 4,11/unit.", "Assume 1,000 × 200 g units (200 kg), all in SGD, goods priced FCA origin at 3,000. Main freight 350, insurance 20 and taxable incidentals 30 give an import base of 3,400. Duty is assumed zero for correctly classified ordinary food. GST at 9% is 306. Add handling 250 and local delivery 150: cash required 4,106, or about 4.11 per unit.", "假设1000件×200克（200公斤），币种新元，FCA原产地货价3000。主运费350、保险20、应计税附带费用30，进口计税基础3400。假设正确分类的普通食品关税为零。9% GST为306，加操作250及本地配送150，现金需求4106，约每件4.11。")}</p>
              <p className={`mt-3 ${body}`}>{l("Jika GST impor sepenuhnya dapat diklaim importir yang memenuhi syarat, biaya setelah pengkreditan menjadi 3.800 atau 3,80/unit. Jika freight naik 25%, kebutuhan kas menjadi 4.201,38. Simulasi belum memasukkan pajak jasa lokal yang ditagihkan, pengujian, sertifikasi, penyimpanan tambahan, bank/kurs, margin distributor/ritel, promosi dan retur. Semua biaya perlu diganti quotation nyata; nilai pabean akhir harus dikonfirmasi importir.", "If import GST is fully claimable by an eligible importer, cost after the credit is 3,800, or 3.80 per unit. A 25% freight increase raises cash required to 4,201.38. The model excludes billed local service taxes, testing, certification, additional storage, bank/FX, distributor/retailer margins, promotion and returns. Replace every assumption with actual quotes; confirm final customs valuation with the importer.", "若合格进口商可全额抵扣进口GST，抵扣后成本为3800，即每件3.80。运费上涨25%则现金需求为4201.38。未计入本地服务税、检测、认证、额外仓储、银行/汇兑、分销零售利润、促销及退货。须以实际报价替换假设，并与进口商确认最终海关计价。")}</p>
              <SourceLinks ids={["gst", "inputgst", "incoterms"]} />
            </div>
            <div className={`mt-5 ${card}`}><h3 className="font-black text-navy">{l("Informasi untuk meminta quotation", "Information for a freight quote", "物流询价资料")}</h3><p className={`mt-3 ${body}`}>{l("Kirim alamat pickup dan tujuan, pelabuhan/bandara alternatif, HS kandidat, deskripsi/komposisi, jumlah karton/palet, berat bersih/kotor, ukuran/CBM, kebutuhan suhu, nilai barang, tanggal siap dan Incoterm. Minta rincian origin–freight–destination, minimum charge, biaya dokumen/permit, asuransi, free time, storage, pajak, waktu transit, masa berlaku serta pengecualian. Bandingkan rute dan cakupan yang sama.", "Provide pickup/delivery addresses, alternative ports/airports, candidate HS, description/ingredients, cartons/pallets, net/gross weight, dimensions/CBM, temperature needs, cargo value, ready date and Incoterm. Request origin–freight–destination breakdowns, minimum charges, documents/permits, insurance, free time, storage, taxes, transit time, validity and exclusions. Compare identical routes and scope.", "提供提送货地址、备选港口/机场、候选HS、描述/配料、箱/托盘数、净毛重、尺寸/立方米、温控、货值、备货日及贸易术语。要求分列起运、主运、目的地费用及最低收费、文件许可、保险、免堆期、仓储、税费、时效、有效期和除外项，按同路线同范围比较。")}</p></div>
          </ReportSection>

          <ReportSection id="roadmap" title={l("Langkah awal masuk pasar Singapura", "First steps into Singapore", "进入新加坡市场的初步步骤")}>
            <ol className="grid gap-5 md:grid-cols-3">{market.roadmap.map((step, index) => <li key={step.title.en} className={card}><span className="grid h-10 w-10 place-items-center rounded-2xl bg-teal/10 text-sm font-black text-teal">{index + 1}</span><h3 className="mt-4 text-lg font-black text-navy">{marketText(step.title, locale)}</h3><p className={`mt-3 ${body}`}>{marketText(step.body, locale)}</p></li>)}</ol>
            <Link href={localePath(locale, "/export-os")} className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-bold text-white hover:bg-navy-light">{l("Siapkan profil produk di Export OS", "Prepare your product profile in Export OS", "在Export OS准备产品资料")}<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
          </ReportSection>

          <ReportSection id="faq" title={l("Pertanyaan tentang ekspor ke Singapura", "Singapore export FAQ", "出口新加坡常见问题")}>
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
