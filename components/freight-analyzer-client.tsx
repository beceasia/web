"use client";

import {
  AlertTriangle,
  ArrowRight,
  Calculator,
  Check,
  Clipboard,
  Copy,
  FileText,
  Gauge,
  PackageCheck,
  Plus,
  RotateCcw,
  Save,
  Scale,
  Ship,
  Trash2,
  Upload,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  calculateFreight,
  clarificationQuestions,
  formatMoney,
  inferServiceScope,
  parseFreightQuote,
  requiredDocuments,
  scopeCoverage,
  scopeKeys,
  type ChargeStatus,
  type FreightLocale,
  type FreightQuote,
  type PackageDimensions,
  type ScopeKey,
} from "@/lib/freight-analyzer";

type View = "analyze" | "compare" | "pricing";

type SavedQuote = {
  quote: FreightQuote;
  actualWeight: number;
  dimensions: PackageDimensions;
  additionalCharges: number;
  units: number;
};

const STORAGE_KEY = "bece-freight-quotes-v1";

const sampleQuote = `Forwarder Nusantara - Air Freight
Route: Jakarta (CGK) -> Incheon (ICN)
Mode: Air Freight
Commodity: Frozen seafood
Carrier: Direct airline
+45 kg: Rp43.600/kg
+100 kg: Rp36.800/kg
+300 kg: Rp30.400/kg
+500 kg: Rp29.500/kg
+1000 kg: Rp28.800/kg
PPN: 1,1%
Incoming fee: Rp4.700/kg
Term of services: DDU / Port Services
Included: AWB, origin handling, X-Ray, PEB/NPE
Not included: pickup, destination handling, customs Korea, trucking at destination
Transit time: 3 days
Validity: 31 October 2026`;

const scopeLabels: Record<ScopeKey, [string, string, string]> = {
  awb: ["AWB", "AWB", "AWB"],
  handling: ["Handling asal", "Origin handling", "始发地操作"],
  exportCustoms: ["PEB/NPE & ekspor", "Export customs", "出口清关"],
  xray: ["X-Ray", "X-Ray", "安检"],
  pickup: ["Pickup", "Pickup", "提货"],
  destinationHandling: ["Handling tujuan", "Destination handling", "目的地操作"],
  destinationCustoms: ["Customs tujuan", "Destination customs", "目的地清关"],
  delivery: ["Delivery buyer", "Buyer delivery", "买方送货"],
};

const statusLabels: Record<ChargeStatus, [string, string, string]> = {
  included: ["Termasuk", "Included", "已包含"],
  excluded: ["Tidak", "Excluded", "不包含"],
  unclear: ["Belum jelas", "Unclear", "不明确"],
};

function tr(locale: FreightLocale, id: string, en: string, zh: string) {
  return locale === "id" ? id : locale === "zh" ? zh : en;
}

function localeIndex(locale: FreightLocale) {
  return locale === "id" ? 0 : locale === "en" ? 1 : 2;
}

function safeNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function NumberField({ label, value, onChange, suffix }: { label: string; value: number; onChange: (value: number) => void; suffix?: string }) {
  return (
    <label className="block text-sm font-semibold text-slate-700">
      <span className="mb-2 block">{label}</span>
      <span className="flex h-11 items-center overflow-hidden rounded-lg border border-slate-300 bg-white focus-within:border-teal">
        <input
          type="number"
          min="0"
          value={value}
          onChange={(event) => onChange(safeNumber(event.target.value))}
          className="min-w-0 flex-1 bg-transparent px-3 outline-none"
        />
        {suffix ? <span className="border-l border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-500">{suffix}</span> : null}
      </span>
    </label>
  );
}

function Metric({ label, value, accent = false, inverted = false }: { label: string; value: string; accent?: boolean; inverted?: boolean }) {
  return (
    <div className={`min-w-0 border-l-2 px-3 ${accent ? "border-teal" : "border-slate-200"}`}>
      <p className={`text-xs font-semibold uppercase ${inverted ? "text-slate-300" : "text-slate-500"}`}>{label}</p>
      <p className={`mt-1 break-words text-lg font-black ${accent ? "text-teal" : inverted ? "text-white" : "text-navy"}`}>{value}</p>
    </div>
  );
}

export function FreightAnalyzerClient({ locale }: { locale: FreightLocale }) {
  const [view, setView] = useState<View>("analyze");
  const [rawText, setRawText] = useState(sampleQuote);
  const [label, setLabel] = useState("Forwarder Nusantara");
  const [quote, setQuote] = useState(() => parseFreightQuote(sampleQuote, "Forwarder Nusantara"));
  const [actualWeight, setActualWeight] = useState(500);
  const [dimensions, setDimensions] = useState<PackageDimensions>({ pieces: 0, lengthCm: 0, widthCm: 0, heightCm: 0 });
  const [additionalCharges, setAdditionalCharges] = useState(0);
  const [units, setUnits] = useState(5000);
  const [savedQuotes, setSavedQuotes] = useState<SavedQuote[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [productCost, setProductCost] = useState(18000);
  const [exportCostPerUnit, setExportCostPerUnit] = useState(700);
  const [insurance, setInsurance] = useState(0);
  const [destinationCosts, setDestinationCosts] = useState(0);
  const [targetMargin, setTargetMargin] = useState(15);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let initialQuotes: SavedQuote[] = [];
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) initialQuotes = JSON.parse(stored) as SavedQuote[];
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
    const timer = window.setTimeout(() => {
      setSavedQuotes(initialQuotes);
      setLoaded(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loaded) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedQuotes));
  }, [loaded, savedQuotes]);

  useEffect(() => () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
  }, [imagePreview]);

  const calculation = useMemo(
    () => calculateFreight(quote, actualWeight, dimensions, quote.incomingRate > 0, additionalCharges, units),
    [quote, actualWeight, dimensions, additionalCharges, units],
  );
  const calculationCurrency = calculation.selectedBreak?.currency ?? "IDR";
  const coverage = useMemo(() => scopeCoverage(quote.scope), [quote.scope]);
  const questions = useMemo(() => clarificationQuestions(quote, locale), [quote, locale]);
  const documents = useMemo(() => requiredDocuments(quote.commodity), [quote.commodity]);

  const pricing = useMemo(() => {
    const exw = productCost * units;
    const fca = exw + exportCostPerUnit * units;
    const freightInIdr = calculationCurrency === "IDR" ? calculation.total : 0;
    const cpt = fca + freightInIdr + insurance;
    const landed = cpt + destinationCosts;
    const targetQuote = targetMargin < 100 ? landed / (1 - targetMargin / 100) : landed;
    return { exw, fca, cpt, landed, targetQuote, perUnit: units > 0 ? landed / units : 0 };
  }, [productCost, units, exportCostPerUnit, calculation.total, calculationCurrency, insurance, destinationCosts, targetMargin]);

  function analyze() {
    if (!rawText.trim()) {
      setMessage(tr(locale, "Tempel quotation terlebih dahulu.", "Paste a quotation first.", "请先粘贴报价。"));
      return;
    }
    setQuote(parseFreightQuote(rawText, label.trim() || "Quotation"));
    setMessage(tr(locale, "Quotation berhasil dianalisis. Periksa bagian yang belum jelas.", "Quotation analyzed. Review the unclear fields.", "报价已分析，请检查不明确字段。"));
  }

  async function pasteFromClipboard() {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setRawText(text);
      setMessage(tr(locale, "Teks ditempel. Klik Analisis quotation.", "Text pasted. Select Analyze quotation.", "文本已粘贴，请点击分析报价。"));
    } catch {
      setMessage(tr(locale, "Browser tidak mengizinkan akses clipboard. Tempel manual pada kolom.", "Clipboard access was blocked. Paste into the field manually.", "浏览器阻止了剪贴板访问，请手动粘贴。"));
    }
  }

  async function attachImage(file?: File) {
    if (!file) return;
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(URL.createObjectURL(file));
    const browser = window as unknown as { TextDetector?: new () => { detect(source: ImageBitmap): Promise<Array<{ rawValue?: string }>> } };
    if (!browser.TextDetector) {
      setMessage(tr(locale, "Screenshot terlampir. OCR browser tidak tersedia; salin teksnya ke kolom untuk dianalisis.", "Screenshot attached. Browser OCR is unavailable; paste its text into the field.", "截图已附加。浏览器OCR不可用，请将文字粘贴到输入框。"));
      return;
    }
    try {
      const bitmap = await createImageBitmap(file);
      const result = await new browser.TextDetector().detect(bitmap);
      bitmap.close();
      const detected = result.map((item) => item.rawValue ?? "").filter(Boolean).join("\n");
      if (detected) setRawText(detected);
      setMessage(tr(locale, "Teks screenshot berhasil dibaca. Periksa lalu analisis.", "Screenshot text detected. Review it, then analyze.", "已识别截图文字，请检查后分析。"));
    } catch {
      setMessage(tr(locale, "Screenshot terlampir, tetapi OCR gagal. Tempel atau koreksi teks secara manual.", "Screenshot attached, but OCR failed. Paste or correct the text manually.", "截图已附加，但OCR失败，请手动粘贴或更正文字。"));
    }
  }

  function updateScope(key: ScopeKey, status: ChargeStatus) {
    setQuote((current) => ({ ...current, scope: { ...current.scope, [key]: status } }));
  }

  function saveForComparison() {
    const item: SavedQuote = { quote: { ...quote, label: label.trim() || quote.label }, actualWeight, dimensions, additionalCharges, units };
    setSavedQuotes((current) => [...current.filter((entry) => entry.quote.id !== item.quote.id), item]);
    setMessage(tr(locale, "Quotation disimpan untuk perbandingan.", "Quotation saved for comparison.", "报价已保存用于比较。"));
  }

  async function copyText(text: string) {
    await navigator.clipboard.writeText(text);
    setMessage(tr(locale, "Teks disalin.", "Text copied.", "文本已复制。"));
  }

  const currency = calculationCurrency;
  const selectedThreshold = calculation.selectedBreak?.threshold;
  const serviceScope = inferServiceScope(quote.scope);
  const serviceLabel = serviceScope.replace("Airport", quote.mode === "Sea" ? "Port" : "Airport");

  return (
    <article className="min-h-screen bg-slate-100 pb-16">
      <header className="border-b border-white/10 bg-navy text-white">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase text-teal">BECE Export Assistant</p>
              <h1 className="mt-2 text-3xl font-black sm:text-4xl">Freight Analyzer</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                {tr(locale, "Ubah quotation logistik yang berantakan menjadi kalkulasi, matriks scope, dan estimasi harga ekspor yang dapat dibandingkan.", "Turn messy logistics quotations into calculations, scope matrices, and comparable export pricing estimates.", "将杂乱的物流报价转换为可比较的计算、服务范围矩阵和出口定价估算。")}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Metric label={tr(locale, "Rute", "Route", "路线")} value={`${quote.originCode} → ${quote.destinationCode}`} inverted />
              <Metric label={tr(locale, "Moda", "Mode", "运输方式")} value={quote.mode} inverted />
              <Metric label={tr(locale, "Scope", "Scope", "范围")} value={serviceLabel} inverted />
              <Metric label={tr(locale, "Kelengkapan", "Coverage", "完整度")} value={`${coverage.score}%`} accent inverted />
            </div>
          </div>
        </div>
      </header>

      <div className="sticky top-[73px] z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto grid max-w-7xl grid-cols-3 gap-1 px-3 py-2 sm:flex sm:px-8">
          {([
            ["analyze", tr(locale, "Analisis quotation", "Analyze quotation", "分析报价")],
            ["compare", tr(locale, `Bandingkan (${savedQuotes.length})`, `Compare (${savedQuotes.length})`, `比较 (${savedQuotes.length})`)],
            ["pricing", tr(locale, "Harga ekspor", "Export pricing", "出口定价")],
          ] as Array<[View, string]>).map(([key, title]) => (
            <button key={key} onClick={() => setView(key)} className={`min-w-0 rounded-lg px-2 py-2.5 text-xs font-bold sm:whitespace-nowrap sm:px-4 sm:text-sm ${view === key ? "bg-navy text-white" : "text-slate-600 hover:bg-slate-100"}`}>{title}</button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8">
        {message ? <div role="status" className="mb-5 flex items-start justify-between gap-4 rounded-lg border border-teal/30 bg-teal/5 px-4 py-3 text-sm text-slate-700"><span>{message}</span><button onClick={() => setMessage("")} aria-label="Dismiss" className="font-black text-slate-500">×</button></div> : null}

        {view === "analyze" ? (
          <div className="space-y-6">
            <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div><h2 className="text-lg font-black text-navy">{tr(locale, "1. Masukkan quotation", "1. Add a quotation", "1. 输入报价")}</h2><p className="mt-1 text-sm text-slate-500">{tr(locale, "Tempel teks WhatsApp/email atau unggah screenshot.", "Paste WhatsApp/email text or attach a screenshot.", "粘贴WhatsApp/邮件文字或上传截图。")}</p></div>
                  <FileText className="text-teal" size={22} />
                </div>
                <label className="mt-5 block text-sm font-semibold text-slate-700">
                  <span className="mb-2 block">{tr(locale, "Nama forwarder", "Forwarder name", "货代名称")}</span>
                  <input value={label} onChange={(event) => setLabel(event.target.value)} className="h-11 w-full rounded-lg border border-slate-300 px-3 outline-none focus:border-teal" />
                </label>
                <label className="mt-4 block text-sm font-semibold text-slate-700">
                  <span className="mb-2 block">{tr(locale, "Isi quotation", "Quotation text", "报价内容")}</span>
                  <textarea value={rawText} onChange={(event) => setRawText(event.target.value)} rows={15} className="w-full resize-y rounded-lg border border-slate-300 p-3 font-mono text-xs leading-6 outline-none focus:border-teal" />
                </label>
                {imagePreview ? <div className="mt-4 overflow-hidden rounded-lg border border-slate-200"><Image unoptimized width={960} height={540} src={imagePreview} alt={tr(locale, "Screenshot quotation", "Quotation screenshot", "报价截图")} className="max-h-52 w-full object-contain" /></div> : null}
                <input ref={fileInput} type="file" accept="image/*" className="hidden" onChange={(event) => void attachImage(event.target.files?.[0])} />
                <div className="mt-4 flex flex-wrap gap-2">
                  <button onClick={() => void pasteFromClipboard()} className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 text-sm font-bold text-navy"><Clipboard size={16} />{tr(locale, "Tempel", "Paste", "粘贴")}</button>
                  <button onClick={() => fileInput.current?.click()} className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 text-sm font-bold text-navy"><Upload size={16} />{tr(locale, "Screenshot", "Screenshot", "截图")}</button>
                  <button onClick={() => { setRawText(sampleQuote); setLabel("Forwarder Nusantara"); setMessage(""); }} className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 text-sm font-bold text-navy"><RotateCcw size={16} />{tr(locale, "Contoh", "Sample", "示例")}</button>
                  <button onClick={analyze} className="inline-flex h-10 items-center gap-2 rounded-lg bg-teal px-4 text-sm font-black text-white"><Gauge size={16} />{tr(locale, "Analisis quotation", "Analyze quotation", "分析报价")}</button>
                </div>
                <p className="mt-3 text-xs leading-5 text-slate-500">{tr(locale, "Data diproses di browser dan quotation tersimpan lokal pada perangkat ini. Hasil OCR harus tetap diperiksa.", "Data is processed in your browser and saved locally on this device. Always review OCR output.", "数据在浏览器中处理并保存在本设备。请始终检查OCR结果。")}</p>
              </div>

              <div className="space-y-6">
                <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div><h2 className="text-lg font-black text-navy">{tr(locale, "2. Hasil pembacaan", "2. Parsed quotation", "2. 报价解析")}</h2><p className="mt-1 text-sm text-slate-500">{quote.label}</p></div>
                    <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-black text-navy">{quote.incoterm} · {serviceLabel}</span>
                  </div>
                  <dl className="mt-5 grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                      [tr(locale, "Asal", "Origin", "起运地"), `${quote.origin} (${quote.originCode})`],
                      [tr(locale, "Tujuan", "Destination", "目的地"), `${quote.destination} (${quote.destinationCode})`],
                      [tr(locale, "Komoditas", "Commodity", "货物"), quote.commodity],
                      [tr(locale, "Transit", "Transit", "时效"), quote.transitTime],
                      [tr(locale, "Carrier", "Carrier", "承运人"), quote.carrier],
                      [tr(locale, "Berlaku", "Validity", "有效期"), quote.validity],
                      ["PPN / VAT", `${quote.vatPercent}%`],
                      [tr(locale, "Incoming", "Incoming", "入库费"), formatMoney(quote.incomingRate, "IDR", locale) + "/kg"],
                    ].map(([term, value]) => <div key={term}><dt className="text-xs font-bold uppercase text-slate-400">{term}</dt><dd className="mt-1 break-words text-sm font-bold text-slate-800">{value}</dd></div>)}
                  </dl>
                  {quote.notes.length ? <div className="mt-5 flex flex-wrap gap-2">{quote.notes.map((note) => <span key={note} className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-2.5 py-1.5 text-xs font-bold text-amber-800"><AlertTriangle size={13} />{note.replaceAll("-", " ")}</span>)}</div> : null}
                </section>

                <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-2"><Scale className="text-teal" size={20} /><h2 className="text-lg font-black text-navy">{tr(locale, "3. Berat & rate break", "3. Weight & rate break", "3. 重量与阶梯价")}</h2></div>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    <NumberField label={tr(locale, "Berat aktual", "Actual weight", "实际重量")} value={actualWeight} onChange={setActualWeight} suffix="kg" />
                    <NumberField label={tr(locale, "Jumlah koli", "Pieces", "件数")} value={dimensions.pieces} onChange={(value) => setDimensions((current) => ({ ...current, pieces: value }))} />
                    <NumberField label={tr(locale, "Panjang", "Length", "长度")} value={dimensions.lengthCm} onChange={(value) => setDimensions((current) => ({ ...current, lengthCm: value }))} suffix="cm" />
                    <NumberField label={tr(locale, "Lebar", "Width", "宽度")} value={dimensions.widthCm} onChange={(value) => setDimensions((current) => ({ ...current, widthCm: value }))} suffix="cm" />
                    <NumberField label={tr(locale, "Tinggi", "Height", "高度")} value={dimensions.heightCm} onChange={(value) => setDimensions((current) => ({ ...current, heightCm: value }))} suffix="cm" />
                  </div>
                  <div className="mt-5 overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead><tr className="border-b border-slate-200 text-left text-xs uppercase text-slate-500"><th className="px-3 py-3">Break</th><th className="px-3 py-3">Rate / kg</th><th className="px-3 py-3">{tr(locale, "Status", "Status", "状态")}</th></tr></thead>
                      <tbody>{quote.rateBreaks.map((rate) => <tr key={`${rate.threshold}-${rate.rate}`} className={`border-b border-slate-100 ${selectedThreshold === rate.threshold ? "bg-teal/5" : ""}`}><td className="px-3 py-3 font-black text-navy">+{rate.threshold} kg</td><td className="px-3 py-3">{formatMoney(rate.rate, rate.currency, locale)}</td><td className="px-3 py-3">{selectedThreshold === rate.threshold ? <span className="inline-flex items-center gap-1 font-bold text-teal"><Check size={15} />{tr(locale, "Dipakai", "Selected", "已选择")}</span> : "-"}</td></tr>)}</tbody>
                    </table>
                    {!quote.rateBreaks.length ? <p className="py-6 text-center text-sm text-slate-500">{tr(locale, "Rate break belum terbaca. Periksa format quotation.", "No rate break detected. Review the quotation format.", "未识别到阶梯价，请检查报价格式。")}</p> : null}
                  </div>
                </section>
              </div>
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-lg font-black text-navy">{tr(locale, "4. Kalkulasi biaya", "4. Cost calculation", "4. 费用计算")}</h2><p className="mt-1 text-sm text-slate-500">{tr(locale, "Berdasarkan chargeable weight dan break yang berlaku.", "Based on chargeable weight and the applicable break.", "基于计费重量和适用阶梯价。")}</p></div><Calculator className="text-teal" /></div>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <Metric label={tr(locale, "Berat volumetrik", "Volumetric", "体积重量")} value={`${calculation.volumetricWeight.toFixed(1)} kg`} />
                  <Metric label={tr(locale, "Berat ditagih", "Billed weight", "计费重量")} value={`${calculation.billedWeight} kg`} />
                  <Metric label={tr(locale, "Break terpilih", "Selected break", "适用阶梯")} value={selectedThreshold ? `+${selectedThreshold}` : "-"} accent />
                </div>
                <div className="mt-6 divide-y divide-slate-100 border-y border-slate-200 text-sm">
                  {[
                    [tr(locale, "Freight", "Freight", "运费"), calculation.freight],
                    ["PPN / VAT", calculation.freightVat],
                    [tr(locale, "Incoming", "Incoming", "入库费"), calculation.incoming],
                    [tr(locale, "PPN incoming", "Incoming VAT", "入库费增值税"), calculation.incomingVat],
                    [tr(locale, "Biaya tambahan", "Additional charges", "其他费用"), calculation.additionalCharges],
                  ].map(([name, value]) => <div key={String(name)} className="flex items-center justify-between gap-4 py-3"><span className="text-slate-600">{name}</span><strong>{formatMoney(Number(value), currency, locale)}</strong></div>)}
                  <div className="flex items-center justify-between gap-4 py-4 text-lg"><span className="font-black text-navy">Grand total</span><strong className="text-teal">{formatMoney(calculation.total, currency, locale)}</strong></div>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <NumberField label={tr(locale, "Biaya lain", "Other charges", "其他费用")} value={additionalCharges} onChange={setAdditionalCharges} suffix={currency} />
                  <NumberField label={tr(locale, "Jumlah produk", "Product units", "产品数量")} value={units} onChange={setUnits} suffix="unit" />
                  <Metric label={tr(locale, "Biaya efektif/kg", "Effective cost/kg", "每公斤有效成本")} value={formatMoney(calculation.effectivePerKg, currency, locale)} accent />
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2"><PackageCheck className="text-teal" size={20} /><h2 className="text-lg font-black text-navy">{tr(locale, "5. Cakupan layanan", "5. Service scope", "5. 服务范围")}</h2></div>
                <p className="mt-2 text-sm leading-6 text-slate-500">{tr(locale, "Koreksi hasil pembacaan agar perbandingan antar-forwarder setara.", "Correct the detected scope so forwarders are compared fairly.", "请校正识别结果，以便公平比较不同货代。")}</p>
                <div className="mt-5 divide-y divide-slate-100 border-y border-slate-200">
                  {scopeKeys.map((key) => (
                    <div key={key} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
                      <span className="text-sm font-semibold text-slate-700">{scopeLabels[key][localeIndex(locale)]}</span>
                      <div className="flex gap-1" role="group" aria-label={scopeLabels[key][localeIndex(locale)]}>
                        {(["included", "excluded", "unclear"] as ChargeStatus[]).map((status) => <button key={status} onClick={() => updateScope(key, status)} className={`rounded-lg px-2.5 py-1.5 text-xs font-bold ${quote.scope[key] === status ? status === "included" ? "bg-emerald-600 text-white" : status === "excluded" ? "bg-rose-600 text-white" : "bg-amber-500 text-white" : "bg-slate-100 text-slate-500"}`}>{statusLabels[status][localeIndex(locale)]}</button>)}
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={saveForComparison} className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-navy px-4 text-sm font-black text-white"><Save size={17} />{tr(locale, "Simpan untuk dibandingkan", "Save for comparison", "保存用于比较")}</button>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
                <div className="flex items-center justify-between gap-4"><h2 className="font-black text-amber-950">{tr(locale, "Pertanyaan klarifikasi", "Clarification questions", "澄清问题")}</h2><button onClick={() => void copyText(questions.map((question, index) => `${index + 1}. ${question}`).join("\n"))} className="rounded-lg p-2 text-amber-900" title={tr(locale, "Salin", "Copy", "复制")}><Copy size={17} /></button></div>
                <ol className="mt-4 space-y-3 text-sm leading-6 text-amber-950">{questions.map((question, index) => <li key={question} className="flex gap-3"><span className="font-black">{index + 1}.</span><span>{question}</span></li>)}</ol>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2"><FileText className="text-teal" size={19} /><h2 className="font-black text-navy">{tr(locale, "Checklist dokumen", "Document checklist", "单证清单")}</h2></div>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">{documents.map((document) => <li key={document} className="flex items-center gap-2 text-sm text-slate-700"><span className="grid size-5 place-items-center rounded border border-teal text-teal"><Check size={13} /></span>{document}</li>)}</ul>
                <p className="mt-5 text-xs leading-5 text-slate-500">{tr(locale, "Checklist bersifat indikatif. Persyaratan aktual bergantung pada HS code, komoditas, carrier, dan negara tujuan.", "This checklist is indicative. Actual requirements depend on HS code, commodity, carrier, and destination.", "此清单仅供参考，实际要求取决于HS编码、货物、承运人和目的地。")}</p>
              </div>
            </section>
          </div>
        ) : null}

        {view === "compare" ? (
          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-4"><div><h2 className="text-xl font-black text-navy">{tr(locale, "Perbandingan forwarder", "Forwarder comparison", "货代比较")}</h2><p className="mt-1 text-sm text-slate-500">{tr(locale, `Semua quotation dinormalisasi ke berat ${actualWeight} kg.`, `All quotations are normalized to ${actualWeight} kg.`, `所有报价均按 ${actualWeight} 公斤标准化。`)}</p></div><button onClick={() => setView("analyze")} className="inline-flex items-center gap-2 rounded-lg bg-teal px-4 py-2.5 text-sm font-black text-white"><Plus size={16} />{tr(locale, "Tambah quotation", "Add quotation", "添加报价")}</button></div>
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-[1050px] w-full text-sm">
                <thead><tr className="border-b border-slate-200 text-left text-xs uppercase text-slate-500"><th className="p-3">Forwarder</th><th className="p-3">Rate/kg</th><th className="p-3">{tr(locale, "Total", "Total", "总计")}</th><th className="p-3">{tr(locale, "Efektif/kg", "Effective/kg", "有效/公斤")}</th><th className="p-3">Scope</th><th className="p-3">{tr(locale, "Cakupan", "Coverage", "完整度")}</th><th className="p-3">{tr(locale, "Belum termasuk", "Not included", "不包含")}</th><th className="p-3"><span className="sr-only">Actions</span></th></tr></thead>
                <tbody>{savedQuotes.map((item) => {
                  const result = calculateFreight(item.quote, actualWeight, item.dimensions, item.quote.incomingRate > 0, item.additionalCharges, item.units);
                  const itemCoverage = scopeCoverage(item.quote.scope);
                  const missing = scopeKeys.filter((key) => item.quote.scope[key] !== "included").map((key) => scopeLabels[key][localeIndex(locale)]);
                  const itemCurrency = result.selectedBreak?.currency ?? "IDR";
                  return <tr key={item.quote.id} className="border-b border-slate-100 align-top"><td className="p-3"><strong className="block text-navy">{item.quote.label}</strong><span className="text-xs text-slate-500">{item.quote.originCode} → {item.quote.destinationCode}</span></td><td className="p-3 font-semibold">{result.selectedBreak ? formatMoney(result.selectedBreak.rate, itemCurrency, locale) : "-"}</td><td className="p-3 font-black text-navy">{formatMoney(result.total, itemCurrency, locale)}</td><td className="p-3 font-black text-teal">{formatMoney(result.effectivePerKg, itemCurrency, locale)}</td><td className="p-3">{inferServiceScope(item.quote.scope)}</td><td className="p-3"><span className="rounded-lg bg-slate-100 px-2 py-1 font-bold">{itemCoverage.score}%</span></td><td className="max-w-xs p-3 text-xs leading-5 text-slate-500">{missing.join(", ") || "-"}</td><td className="p-3"><button onClick={() => setSavedQuotes((current) => current.filter((entry) => entry.quote.id !== item.quote.id))} className="rounded-lg p-2 text-rose-600" title={tr(locale, "Hapus", "Delete", "删除")}><Trash2 size={17} /></button></td></tr>;
                })}</tbody>
              </table>
              {!savedQuotes.length ? <div className="py-16 text-center"><Ship className="mx-auto text-slate-300" size={40} /><p className="mt-4 font-bold text-slate-600">{tr(locale, "Belum ada quotation tersimpan.", "No saved quotations yet.", "尚无已保存报价。")}</p><p className="mt-1 text-sm text-slate-500">{tr(locale, "Analisis quotation pertama lalu simpan untuk dibandingkan.", "Analyze and save your first quotation for comparison.", "请先分析并保存一份报价。")}</p></div> : null}
            </div>
            <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950"><strong>{tr(locale, "Cara membaca:", "How to read this:", "阅读说明：")}</strong> {tr(locale, "rate/kg terendah belum tentu menghasilkan total terbaik. Gunakan biaya efektif dan cakupan layanan untuk keputusan yang setara.", "the lowest rate/kg does not necessarily yield the best total. Use effective cost and scope coverage for a like-for-like decision.", "最低每公斤运价不一定带来最低总成本，请结合有效成本和服务范围进行同口径比较。")}</div>
          </section>
        ) : null}

        {view === "pricing" ? (
          <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2"><Calculator className="text-teal" size={21} /><h2 className="text-xl font-black text-navy">{tr(locale, "Input harga produk", "Product pricing inputs", "产品定价输入")}</h2></div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <NumberField label={tr(locale, "Biaya produk/unit", "Product cost/unit", "产品成本/件")} value={productCost} onChange={setProductCost} suffix="IDR" />
                <NumberField label={tr(locale, "Jumlah produk", "Product units", "产品数量")} value={units} onChange={setUnits} suffix="unit" />
                <NumberField label={tr(locale, "Biaya ekspor/unit", "Export preparation/unit", "出口准备费/件")} value={exportCostPerUnit} onChange={setExportCostPerUnit} suffix="IDR" />
                <NumberField label={tr(locale, "Asuransi", "Insurance", "保险")} value={insurance} onChange={setInsurance} suffix="IDR" />
                <NumberField label={tr(locale, "Biaya tujuan & duty", "Destination costs & duty", "目的地费用及关税")} value={destinationCosts} onChange={setDestinationCosts} suffix="IDR" />
                <NumberField label={tr(locale, "Target margin", "Target margin", "目标利润率")} value={targetMargin} onChange={setTargetMargin} suffix="%" />
              </div>
              <div className="mt-6 rounded-lg bg-slate-50 p-4 text-sm leading-6 text-slate-600"><strong className="text-navy">{tr(locale, "Basis freight:", "Freight basis:", "运费基础：")}</strong> {quote.label}, {quote.originCode} → {quote.destinationCode}, {calculation.billedWeight} kg. {tr(locale, "Isi biaya tujuan bila quotation belum mencakup destination handling, customs, atau delivery.", "Enter destination costs when the quotation excludes destination handling, customs, or delivery.", "若报价不含目的地操作、清关或送货，请填写目的地费用。")}</div>
              {calculationCurrency !== "IDR" ? <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950"><strong>{tr(locale, "Perlu konversi kurs:", "Currency conversion required:", "需要货币换算：")}</strong> {tr(locale, "freight USD belum dimasukkan ke struktur harga IDR. Konversikan total freight ke IDR dan masukkan sebagai biaya ekspor tambahan.", "USD freight is not included in the IDR price structure. Convert the freight total to IDR and enter it as an additional export cost.", "美元运费尚未计入印尼盾价格结构。请先换算为印尼盾，再作为额外出口成本输入。")}</div> : null}
            </section>
            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-black text-navy">{tr(locale, "Struktur harga ekspor", "Export price structure", "出口价格结构")}</h2>
              <div className="mt-6 divide-y divide-slate-100 border-y border-slate-200">
                {[
                  ["EXW", tr(locale, "Produk di lokasi penjual", "Goods at seller premises", "卖方场所交货"), pricing.exw],
                  [quote.mode === "Sea" ? "FOB" : "FCA", tr(locale, "Produk + persiapan ekspor", "Goods + export preparation", "货物 + 出口准备"), pricing.fca],
                  [quote.mode === "Sea" ? "CFR/CIF" : "CPT/CIP", tr(locale, "Termasuk freight & asuransi", "Includes freight & insurance", "含运费及保险"), pricing.cpt],
                  [tr(locale, "Landed estimate", "Landed estimate", "到岸成本估算"), tr(locale, "Termasuk biaya tujuan yang diinput", "Includes entered destination costs", "含已输入的目的地费用"), pricing.landed],
                ].map(([term, detail, value]) => <div key={String(term)} className="grid grid-cols-[0.65fr_1fr_auto] items-center gap-4 py-4"><strong className="text-navy">{term}</strong><span className="text-xs text-slate-500">{detail}</span><strong>{formatMoney(Number(value), "IDR", locale)}</strong></div>)}
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2"><Metric label={tr(locale, "Landed/unit", "Landed/unit", "到岸成本/件")} value={formatMoney(pricing.perUnit, "IDR", locale)} /><Metric label={tr(locale, "Target quotation", "Target quotation", "目标报价")} value={formatMoney(pricing.targetQuote, "IDR", locale)} accent /></div>
              <button onClick={() => void copyText(`${tr(locale, "Estimasi harga ekspor", "Export price estimate", "出口价格估算")}\nEXW: ${formatMoney(pricing.exw, "IDR", locale)}\n${quote.mode === "Sea" ? "FOB" : "FCA"}: ${formatMoney(pricing.fca, "IDR", locale)}\n${quote.mode === "Sea" ? "CFR/CIF" : "CPT/CIP"}: ${formatMoney(pricing.cpt, "IDR", locale)}\nLanded estimate: ${formatMoney(pricing.landed, "IDR", locale)}\n${tr(locale, "Target quotation", "Target quotation", "目标报价")}: ${formatMoney(pricing.targetQuote, "IDR", locale)}`)} className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-navy px-4 text-sm font-black text-white"><Copy size={17} />{tr(locale, "Salin ringkasan harga", "Copy pricing summary", "复制价格摘要")}</button>
            </section>
          </div>
        ) : null}

        <section className="mt-6 flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
          <div><h2 className="font-black text-navy">{tr(locale, "Butuh pembanding eksternal?", "Need an external benchmark?", "需要外部基准？")}</h2><p className="mt-1 text-sm text-slate-500">{tr(locale, "Buka kalkulator pasar, lalu masukkan hasilnya sebagai quotation baru agar scope tetap dapat dibandingkan.", "Open a market calculator, then add its result as a new quotation so scope remains comparable.", "打开市场计算器，然后将结果作为新报价录入，以保持服务范围可比较。")}</p></div>
          <div className="flex gap-2"><a href="https://www.freightos.com/freight-resources/freight-rate-calculator/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-bold text-navy">Freightos <ArrowRight size={15} /></a><a href="https://www.flexport.com/tools/freight-rate-calculator/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-bold text-navy">Flexport <ArrowRight size={15} /></a></div>
        </section>

        <p className="mt-5 text-center text-xs leading-5 text-slate-500">{tr(locale, "Hasil merupakan estimasi pendukung keputusan, bukan quotation resmi atau nasihat kepabeanan. Konfirmasi seluruh biaya kepada forwarder dan pihak terkait.", "Results are decision-support estimates, not official quotations or customs advice. Confirm all charges with the forwarder and relevant parties.", "结果仅为决策参考，不构成正式报价或海关建议。请向货代及相关方确认所有费用。")}</p>
      </div>
    </article>
  );
}
