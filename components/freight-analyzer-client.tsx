"use client";

import {
  ArrowRight,
  BadgeDollarSign,
  Calculator,
  CheckCircle2,
  ExternalLink,
  Info,
  MapPin,
  PackageSearch,
  Plane,
  RefreshCw,
  Search,
  Ship,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  estimateFreight,
  formatCurrency,
  type CargoType,
  type DestinationRegion,
  type EstimateBreakdown,
  type FreightLocale,
  type FreightMode,
  type ServiceScope,
} from "@/lib/freight-analyzer";

const fallbackKurs = 16500;

const modeOptions: Array<{ value: FreightMode; id: string; en: string; zh: string; icon: typeof Plane }> = [
  { value: "express", id: "Express", en: "Express", zh: "国际快递", icon: PackageSearch },
  { value: "air", id: "Air Cargo", en: "Air cargo", zh: "空运", icon: Plane },
  { value: "sea-lcl", id: "Laut LCL", en: "Ocean LCL", zh: "海运拼箱", icon: Ship },
  { value: "sea-fcl20", id: "FCL 20 ft", en: "FCL 20 ft", zh: "20尺整箱", icon: Ship },
  { value: "sea-fcl40", id: "FCL 40 ft", en: "FCL 40 ft", zh: "40尺整箱", icon: Ship },
];

const regionOptions: Array<{ value: DestinationRegion; id: string; en: string; zh: string }> = [
  { value: "asean", id: "ASEAN / Asia Tenggara", en: "ASEAN / Southeast Asia", zh: "东盟 / 东南亚" },
  { value: "east-asia", id: "China, Hong Kong, Korea, Taiwan", en: "China, Hong Kong, Korea, Taiwan", zh: "中国、香港、韩国、台湾" },
  { value: "japan", id: "Jepang", en: "Japan", zh: "日本" },
  { value: "middle-east", id: "Timur Tengah", en: "Middle East", zh: "中东" },
  { value: "europe", id: "Eropa", en: "Europe", zh: "欧洲" },
  { value: "north-america", id: "Amerika Utara", en: "North America", zh: "北美" },
  { value: "australia", id: "Australia & Selandia Baru", en: "Australia & New Zealand", zh: "澳大利亚和新西兰" },
];

const cargoOptions: Array<{ value: CargoType; id: string; en: string; zh: string }> = [
  { value: "general", id: "General cargo", en: "General cargo", zh: "普通货物" },
  { value: "food", id: "Makanan non-perishable", en: "Non-perishable food", zh: "常温食品" },
  { value: "perishable", id: "Perishable / cold chain", en: "Perishable / cold chain", zh: "易腐 / 冷链" },
  { value: "electronics", id: "Elektronik", en: "Electronics", zh: "电子产品" },
  { value: "dangerous", id: "Dangerous goods", en: "Dangerous goods", zh: "危险品" },
  { value: "textile", id: "Tekstil & kerajinan", en: "Textiles & handicrafts", zh: "纺织品和手工艺品" },
];

const scopeOptions: Array<{ value: ServiceScope; id: string; en: string; zh: string }> = [
  { value: "terminal-terminal", id: "Bandara/pelabuhan ke terminal", en: "Terminal to terminal", zh: "站到站" },
  { value: "door-terminal", id: "Pickup ke terminal tujuan", en: "Door to destination terminal", zh: "门到目的地站" },
  { value: "terminal-door", id: "Terminal asal ke alamat buyer", en: "Origin terminal to buyer", zh: "始发站到买方地址" },
  { value: "door-door", id: "Door to door", en: "Door to door", zh: "门到门" },
];

const providers = [
  {
    name: "Freightos",
    url: "https://www.freightos.com/freight-resources/freight-rate-free-calculator/",
    modes: "Air · Ocean · Trucking",
    id: "Pembanding freight internasional berdasarkan rute, berat, dan dimensi.",
    en: "International freight comparison using route, weight, and dimensions.",
    zh: "按路线、重量和尺寸比较国际货运价格。",
  },
  {
    name: "DHL Express",
    url: "https://www.dhl.com/id-en/home/get-a-quote.html",
    modes: "Express · Door to door",
    id: "Tarif tamu DHL dengan pilihan layanan dan estimasi pengiriman.",
    en: "DHL guest rates with service options and delivery estimates.",
    zh: "DHL访客价格、服务选项和送达时间估算。",
  },
  {
    name: "FedEx Indonesia",
    url: "https://www.fedex.com/en-id/online/rating.html",
    modes: "Express · Parcel · Freight",
    id: "Rate & transit time serta lembar tarif ekspor Indonesia.",
    en: "Rate and transit-time tool plus Indonesia export rate sheets.",
    zh: "运价与时效工具及印度尼西亚出口价目表。",
  },
  {
    name: "UPS Indonesia",
    url: "https://wwwapps.ups.com/ctc/request?loc=en_ID",
    modes: "Parcel · Pallet · Express",
    id: "Calculate Time and Cost berdasarkan asal, tujuan, berat, dan dimensi.",
    en: "Calculate Time and Cost using origin, destination, weight, and dimensions.",
    zh: "按起运地、目的地、重量和尺寸计算时间与费用。",
  },
];

function tr(locale: FreightLocale, id: string, en: string, zh: string) {
  return locale === "id" ? id : locale === "zh" ? zh : en;
}

function localizedOption(locale: FreightLocale, option: { id: string; en: string; zh: string }) {
  return option[locale];
}

function number(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="block text-sm font-bold text-slate-700"><span className="mb-2 block">{label}</span>{children}</label>;
}

function NumberInput({ value, onChange, suffix }: { value: number; onChange: (value: number) => void; suffix: string }) {
  return (
    <span className="flex h-11 overflow-hidden rounded-lg border border-slate-300 bg-white focus-within:border-teal">
      <input type="number" min="0" value={value} onChange={(event) => onChange(number(event.target.value))} className="min-w-0 flex-1 bg-transparent px-3 outline-none" />
      <span className="grid min-w-12 place-items-center border-l border-slate-200 bg-slate-50 px-2 text-xs font-black text-slate-500">{suffix}</span>
    </span>
  );
}

function Stat({ label, value, inverted = false }: { label: string; value: string; inverted?: boolean }) {
  return <div className="min-w-0 border-l-2 border-teal px-3"><p className={`text-xs font-bold uppercase ${inverted ? "text-slate-300" : "text-slate-500"}`}>{label}</p><p className={`mt-1 break-words text-lg font-black ${inverted ? "text-white" : "text-navy"}`}>{value}</p></div>;
}

export function FreightAnalyzerClient({ locale }: { locale: FreightLocale }) {
  const [origin, setOrigin] = useState("Jakarta, Indonesia");
  const [destination, setDestination] = useState("Seoul, South Korea");
  const [mode, setMode] = useState<FreightMode>("air");
  const [region, setRegion] = useState<DestinationRegion>("east-asia");
  const [cargoType, setCargoType] = useState<CargoType>("general");
  const [serviceScope, setServiceScope] = useState<ServiceScope>("terminal-terminal");
  const [weightKg, setWeightKg] = useState(500);
  const [pieces, setPieces] = useState(5);
  const [lengthCm, setLengthCm] = useState(100);
  const [widthCm, setWidthCm] = useState(80);
  const [heightCm, setHeightCm] = useState(60);
  const [cargoValueUsd, setCargoValueUsd] = useState(10000);
  const [exchangeRate, setExchangeRate] = useState(fallbackKurs);
  const [kursStatus, setKursStatus] = useState(tr(locale, "Mengambil kurs Kemenkeu...", "Loading Kemenkeu exchange rate...", "正在加载印尼财政部汇率..."));
  const [searched, setSearched] = useState(true);

  useEffect(() => {
    let active = true;
    async function loadKurs() {
      try {
        const response = await fetch("/api/kemenkeu-kurs", { cache: "no-store" });
        const data = await response.json() as { rate?: number; kmk?: string; period?: string };
        if (!response.ok || !data.rate) throw new Error("rate unavailable");
        if (active) {
          setExchangeRate(data.rate);
          setKursStatus(tr(locale, `Kurs pajak Kemenkeu ${data.kmk || ""} ${data.period || ""}`.trim(), `Kemenkeu tax rate ${data.kmk || ""} ${data.period || ""}`.trim(), `印尼财政部税务汇率 ${data.kmk || ""} ${data.period || ""}`.trim()));
        }
      } catch {
        if (active) setKursStatus(tr(locale, "Kurs otomatis tidak tersedia. Nilai dapat diubah manual.", "Automatic rate unavailable. You can edit it manually.", "自动汇率不可用，可手动修改。"));
      }
    }
    void loadKurs();
    return () => { active = false; };
  }, [locale]);

  const estimate = useMemo(() => estimateFreight({ mode, region, cargoType, serviceScope, weightKg, pieces, lengthCm, widthCm, heightCm, cargoValueUsd, exchangeRate }), [mode, region, cargoType, serviceScope, weightKg, pieces, lengthCm, widthCm, heightCm, cargoValueUsd, exchangeRate]);
  const selectedMode = modeOptions.find((item) => item.value === mode) ?? modeOptions[1];
  const selectedRegion = regionOptions.find((item) => item.value === region) ?? regionOptions[1];
  const basisLabel = estimate.billingBasis === "kg" ? `${estimate.chargeableWeight} kg` : estimate.billingBasis === "cbm" ? `${estimate.billingQuantity.toFixed(3)} CBM` : "1 container";

  function searchRates() {
    setSearched(true);
    document.getElementById("freight-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <article className="min-h-screen bg-slate-100 pb-16">
      <header className="border-b border-white/10 bg-navy text-white">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase text-teal">BECE Export Assistant</p>
              <h1 className="mt-2 text-3xl font-black sm:text-4xl">Freight Rate Finder</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">{tr(locale, "Cari kalkulator freight yang dapat dibuka, lalu perkirakan biaya air cargo, express, LCL, atau FCL secara mandiri.", "Find accessible freight calculators and independently estimate air cargo, express, LCL, or FCL costs.", "查找可直接使用的货运计算器，并独立估算空运、快递、拼箱或整箱费用。")}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat label={tr(locale, "Moda", "Mode", "方式")} value={localizedOption(locale, selectedMode)} inverted />
              <Stat label={tr(locale, "Tujuan", "Destination", "目的地")} value={localizedOption(locale, selectedRegion)} inverted />
              <Stat label={tr(locale, "Basis", "Billing basis", "计费基础")} value={basisLabel} inverted />
              <Stat label={tr(locale, "Transit", "Transit", "时效")} value={`${estimate.transitDays.min}-${estimate.transitDays.max} ${tr(locale, "hari", "days", "天")}`} inverted />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8">
        <section className="grid min-w-0 gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="min-w-0 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4"><div><h2 className="text-xl font-black text-navy">{tr(locale, "Detail pengiriman", "Shipment details", "货件详情")}</h2><p className="mt-1 text-sm text-slate-500">{tr(locale, "Isi data yang biasa diminta kalkulator freight.", "Enter the details normally required by freight calculators.", "填写货运计算器通常需要的信息。")}</p></div><MapPin className="text-teal" size={23} /></div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label={tr(locale, "Asal", "Origin", "起运地")}><input value={origin} onChange={(event) => setOrigin(event.target.value)} className="h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-teal" /></Field>
              <Field label={tr(locale, "Tujuan", "Destination", "目的地")}><input value={destination} onChange={(event) => setDestination(event.target.value)} className="h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-teal" /></Field>
              <Field label={tr(locale, "Wilayah tujuan", "Destination region", "目的地区域")}><select value={region} onChange={(event) => setRegion(event.target.value as DestinationRegion)} className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 outline-none focus:border-teal">{regionOptions.map((option) => <option key={option.value} value={option.value}>{localizedOption(locale, option)}</option>)}</select></Field>
              <Field label={tr(locale, "Jenis barang", "Cargo type", "货物类型")}><select value={cargoType} onChange={(event) => setCargoType(event.target.value as CargoType)} className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 outline-none focus:border-teal">{cargoOptions.map((option) => <option key={option.value} value={option.value}>{localizedOption(locale, option)}</option>)}</select></Field>
            </div>

            <fieldset className="mt-5"><legend className="text-sm font-bold text-slate-700">{tr(locale, "Moda pengiriman", "Shipping mode", "运输方式")}</legend><div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-5">{modeOptions.map((option) => { const Icon = option.icon; return <button type="button" key={option.value} onClick={() => setMode(option.value)} className={`min-h-16 rounded-lg border px-2 py-2 text-xs font-black ${mode === option.value ? "border-teal bg-teal text-white" : "border-slate-200 bg-white text-slate-600 hover:border-teal"}`}><Icon className="mx-auto mb-1" size={17} />{localizedOption(locale, option)}</button>; })}</div></fieldset>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <Field label={tr(locale, "Berat aktual", "Actual weight", "实际重量")}><NumberInput value={weightKg} onChange={setWeightKg} suffix="kg" /></Field>
              <Field label={tr(locale, "Jumlah koli", "Pieces", "件数")}><NumberInput value={pieces} onChange={setPieces} suffix="pcs" /></Field>
              <Field label={tr(locale, "Panjang", "Length", "长度")}><NumberInput value={lengthCm} onChange={setLengthCm} suffix="cm" /></Field>
              <Field label={tr(locale, "Lebar", "Width", "宽度")}><NumberInput value={widthCm} onChange={setWidthCm} suffix="cm" /></Field>
              <Field label={tr(locale, "Tinggi", "Height", "高度")}><NumberInput value={heightCm} onChange={setHeightCm} suffix="cm" /></Field>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label={tr(locale, "Cakupan layanan", "Service scope", "服务范围")}><select value={serviceScope} onChange={(event) => setServiceScope(event.target.value as ServiceScope)} className="h-11 w-full rounded-lg border border-slate-300 bg-white px-3 outline-none focus:border-teal">{scopeOptions.map((option) => <option key={option.value} value={option.value}>{localizedOption(locale, option)}</option>)}</select></Field>
              <Field label={tr(locale, "Nilai barang", "Cargo value", "货值")}><NumberInput value={cargoValueUsd} onChange={setCargoValueUsd} suffix="USD" /></Field>
            </div>

            <button type="button" onClick={searchRates} className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-teal px-5 text-sm font-black text-white"><Search size={18} />{tr(locale, "Cari & hitung biaya", "Find & estimate costs", "查找并估算费用")}</button>
          </div>

          <div id="freight-results" className="min-w-0 scroll-mt-24 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4"><div><h2 className="text-xl font-black text-navy">{tr(locale, "Estimasi biaya", "Cost estimate", "费用估算")}</h2><p className="mt-1 text-sm text-slate-500">{origin} <ArrowRight className="mx-1 inline" size={14} /> {destination}</p></div><span className="rounded-lg bg-amber-50 px-3 py-2 text-xs font-black text-amber-800">{tr(locale, "Estimasi indikatif", "Indicative estimate", "参考估算")}</span></div>

            {searched ? <>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <Scenario label={tr(locale, "Rentang rendah", "Low range", "低位区间")} result={estimate.low} locale={locale} />
                <Scenario label={tr(locale, "Estimasi pasar", "Market estimate", "市场估算")} result={estimate.market} locale={locale} primary />
                <Scenario label={tr(locale, "Rentang tinggi", "High range", "高位区间")} result={estimate.high} locale={locale} />
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-4">
                <Stat label={tr(locale, "Volume", "Volume", "体积")} value={`${estimate.volumeCbm.toFixed(3)} CBM`} />
                <Stat label={tr(locale, "Berat volumetrik", "Volumetric weight", "体积重量")} value={`${estimate.volumetricWeight.toFixed(1)} kg`} />
                <Stat label={tr(locale, "Berat ditagih", "Chargeable weight", "计费重量")} value={`${estimate.chargeableWeight} kg`} />
                <Stat label={tr(locale, "Benchmark", "Benchmark", "基准")} value={`$${estimate.rateBand.low}-${estimate.rateBand.high} ${estimate.rateBand.unit.replace("USD", "")}`} />
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full text-sm"><thead><tr className="border-b border-slate-200 text-left text-xs uppercase text-slate-500"><th className="px-3 py-3">{tr(locale, "Komponen", "Component", "费用项目")}</th><th className="px-3 py-3 text-right">USD</th><th className="px-3 py-3 text-right">IDR</th></tr></thead><tbody>{breakdownRows(estimate.market, locale).map(([name, value]) => <tr key={name} className="border-b border-slate-100"><td className="px-3 py-3 text-slate-600">{name}</td><td className="px-3 py-3 text-right font-semibold">{formatCurrency(value, "USD", locale)}</td><td className="px-3 py-3 text-right font-semibold">{formatCurrency(value * exchangeRate, "IDR", locale)}</td></tr>)}</tbody><tfoot><tr className="bg-slate-50"><th className="px-3 py-4 text-left text-navy">{tr(locale, "Total estimasi", "Estimated total", "估算总额")}</th><th className="px-3 py-4 text-right text-navy">{formatCurrency(estimate.market.totalUsd, "USD", locale)}</th><th className="px-3 py-4 text-right text-teal">{formatCurrency(estimate.market.totalIdr, "IDR", locale)}</th></tr></tfoot></table>
              </div>

              <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-2"><RefreshCw className="text-teal" size={17} /><strong className="text-sm text-navy">{tr(locale, "Konversi USD/IDR", "USD/IDR conversion", "美元/印尼盾换算")}</strong></div>
                <div className="mt-3 grid gap-3 sm:grid-cols-[180px_1fr]"><NumberInput value={exchangeRate} onChange={setExchangeRate} suffix="IDR" /><p className="text-xs leading-5 text-slate-500">{kursStatus}</p></div>
              </div>
            </> : null}
          </div>
        </section>

        <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-black uppercase text-teal">{tr(locale, "Harga aktual", "Actual prices", "实际价格")}</p><h2 className="mt-1 text-xl font-black text-navy">{tr(locale, "Buka kalkulator freight", "Open freight calculators", "打开货运计算器")}</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">{tr(locale, "Gunakan data pengiriman di atas pada salah satu kalkulator berikut. Harga final ditampilkan oleh penyedia pada situs mereka dan dapat berubah menurut tanggal keberangkatan, kapasitas, surcharge, serta layanan tambahan.", "Use the shipment details above in one of these calculators. Final prices are displayed by the provider and may vary by departure date, capacity, surcharges, and added services.", "请在以下计算器中使用上述货件信息。最终价格由服务商网站显示，并会因出发日期、舱位、附加费和增值服务而变化。")}</p></div><BadgeDollarSign className="hidden text-teal sm:block" size={30} /></div>
          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">{providers.map((provider) => <a key={provider.name} href={provider.url} target="_blank" rel="noreferrer" className="group flex min-h-48 flex-col rounded-lg border border-slate-200 bg-white p-4 transition hover:border-teal hover:shadow-md"><div className="flex items-center justify-between gap-3"><strong className="text-lg text-navy">{provider.name}</strong><ExternalLink className="text-slate-400 group-hover:text-teal" size={17} /></div><span className="mt-2 text-xs font-bold text-teal">{provider.modes}</span><p className="mt-4 flex-1 text-sm leading-6 text-slate-600">{provider[locale]}</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-navy">{tr(locale, "Buka harga", "Open rates", "查看价格")}<ArrowRight size={15} /></span></a>)}</div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center gap-2"><Calculator className="text-teal" size={20} /><h2 className="font-black text-navy">{tr(locale, "Cara estimasi dihitung", "How the estimate is calculated", "估算方法")}</h2></div><ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">{[
            tr(locale, "Air/express memakai nilai terbesar antara berat aktual dan volumetrik.", "Air/express uses the greater of actual and volumetric weight.", "空运/快递采用实际重量和体积重量中的较大值。"),
            tr(locale, "LCL memakai minimum 1 CBM; FCL memakai satu kontainer.", "LCL uses a 1 CBM minimum; FCL uses one container.", "拼箱最低按1 CBM计费；整箱按一个集装箱计费。"),
            tr(locale, "Total mencakup freight dasar, fuel/security, handling asal, dokumen, serta pickup/delivery sesuai scope.", "The total includes base freight, fuel/security, origin handling, documents, and pickup/delivery based on scope.", "总额包括基础运费、燃油/安检、始发地操作、单证及按服务范围计算的提送货费。"),
          ].map((item) => <li key={item} className="flex gap-2"><CheckCircle2 className="mt-1 shrink-0 text-teal" size={16} />{item}</li>)}</ul></div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-5"><div className="flex items-center gap-2"><Info className="text-amber-700" size={20} /><h2 className="font-black text-amber-950">{tr(locale, "Yang belum termasuk", "Not included", "未包含项目")}</h2></div><p className="mt-4 text-sm leading-6 text-amber-950">{tr(locale, "Bea masuk dan pajak negara tujuan, pemeriksaan khusus, storage/demurrage, izin komoditas, biaya karantina, serta surcharge musiman belum dihitung. Untuk dangerous goods dan cold chain, konfirmasi penerimaan barang kepada carrier sebelum melakukan booking.", "Destination duties and taxes, special inspections, storage/demurrage, commodity permits, quarantine fees, and seasonal surcharges are not included. For dangerous goods and cold chain, confirm cargo acceptance with the carrier before booking.", "不包括目的地关税和税费、特殊查验、仓储/滞箱费、商品许可、检疫费及季节性附加费。危险品和冷链货物请在订舱前向承运人确认是否接收。")}</p></div>
        </section>

        <p className="mt-6 text-center text-xs leading-5 text-slate-500">{tr(locale, "BECE menampilkan estimasi perencanaan, bukan tarif live atau penawaran yang mengikat. Gunakan kalkulator penyedia untuk harga aktual sebelum booking.", "BECE provides planning estimates, not live or binding rates. Use a provider calculator for current prices before booking.", "BECE提供的是规划估算，并非实时或具有约束力的价格。订舱前请使用服务商计算器查询实际价格。")}</p>
      </div>
    </article>
  );
}

function Scenario({ label, result, locale, primary = false }: { label: string; result: EstimateBreakdown; locale: FreightLocale; primary?: boolean }) {
  return <div className={`rounded-lg border p-4 ${primary ? "border-teal bg-teal/5" : "border-slate-200 bg-white"}`}><p className="text-xs font-black uppercase text-slate-500">{label}</p><p className={`mt-2 text-xl font-black ${primary ? "text-teal" : "text-navy"}`}>{formatCurrency(result.totalIdr, "IDR", locale)}</p><p className="mt-1 text-xs font-semibold text-slate-500">{formatCurrency(result.totalUsd, "USD", locale)}</p></div>;
}

function breakdownRows(result: EstimateBreakdown, locale: FreightLocale): Array<[string, number]> {
  const rows: Array<[string, number]> = [
    [tr(locale, "Freight dasar", "Base freight", "基础运费"), result.baseFreight],
    [tr(locale, "Fuel & security", "Fuel & security", "燃油和安检"), result.fuelAndSecurity],
    [tr(locale, "Handling asal", "Origin handling", "始发地操作"), result.originHandling],
    [tr(locale, "Dokumen ekspor", "Export documents", "出口单证"), result.exportDocuments],
    [tr(locale, "Pickup", "Pickup", "提货"), result.pickup],
    [tr(locale, "Layanan tujuan", "Destination service", "目的地服务"), result.destinationService],
    [tr(locale, "Penyesuaian komoditas", "Cargo adjustment", "货物附加费"), result.cargoAdjustment],
    [tr(locale, "Estimasi asuransi", "Insurance estimate", "保险估算"), result.insurance],
  ];
  return rows.filter(([, value]) => value > 0);
}
