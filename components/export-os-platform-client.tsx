"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Download, Save } from "lucide-react";
import type { Locale } from "@/data/apps";
import { whatsappUrl } from "@/data/contact";
import {
  blankPlan,
  calculatePlan,
  examplePlan,
  isExportPlan,
  readinessScore,
  readinessWeights,
  type ExportPlan,
  type ReadinessAnswer,
} from "@/lib/export-plan";
import { localePath } from "@/lib/routes";

const storageKey = "bece-export-plan-v1";
const copyByLocale = {
  id: {
    title: "Mulai ekspor dengan rencana yang jelas.",
    intro:
      "Isi produk, nilai kesiapan, pilih pasar, lalu hitung biaya. Hasilnya menjadi tiga tindakan yang bisa Anda lanjutkan.",
    steps: [
      "Produk & pasar",
      "Kesiapan usaha",
      "Skenario biaya",
      "Rencana tindakan",
    ],
    product: "Nama dan spesifikasi produk",
    productHint: "Contoh: kopi arabika, kemasan 250 gram, kapasitas 500 unit.",
    country: "Pasar untuk diteliti",
    countryHint:
      "Pilihan Anda adalah tujuan riset, bukan rekomendasi pasar otomatis.",
    example: "Isi contoh",
    resume: "Lanjutkan rencana tersimpan",
    save: "Simpan di browser",
    saved: "Rencana tersimpan di browser ini.",
    unavailable:
      "Penyimpanan tidak tersedia. Unduh hasil agar pekerjaan tetap tersimpan.",
    missing: "Belum ada rencana tersimpan yang bisa dibuka.",
    next: "Berikutnya",
    back: "Sebelumnya",
    restart: "Mulai ulang",
    local:
      "Data disimpan hanya setelah Anda menekan Simpan, di browser dan perangkat ini. Tidak tersinkron ke akun.",
    yes: "Sudah",
    no: "Belum",
    unknown: "Belum tahu",
    questions: [
      "NIB dan legalitas usaha tersedia",
      "Kualitas dan kapasitas produksi stabil",
      "Kemasan dan label siap ekspor",
      "Sertifikasi atau hasil uji yang relevan tersedia",
      "Referensi HS produk sudah diketahui",
      "Paham syarat penyerahan dan risiko pembayaran",
      "Profil pasar atau calon buyer sudah diteliti",
    ],
    score: "Skor kesiapan mandiri",
    scoreNote:
      "Jawaban Sudah mendapat bobot yang ditampilkan; Belum dan Belum tahu bernilai nol. Ini penilaian mandiri, bukan sertifikasi.",
    verify: "Verifikasi persyaratan produk dan pasar",
    research: "Buka riset pasar",
    hs: "Cari referensi HS",
    amount: "Jumlah unit",
    unitCost: "Biaya produksi per unit",
    unitPrice: "Harga jual per unit",
    freight: "Total biaya pengiriman",
    documents: "Total biaya dokumen & biaya lain",
    currency: "Mata uang",
    date: "Tanggal asumsi",
    assumptions:
      "Estimasi berdasarkan input Anda. Seluruh nominal harus dalam mata uang yang sama. Pajak, asuransi, dan biaya tambahan hanya dihitung jika Anda memasukkannya pada biaya lain. Ini bukan kutipan ongkir atau penawaran buyer.",
    total: "Total biaya",
    revenue: "Pendapatan",
    margin: "Margin estimasi",
    perUnit: "Biaya per unit",
    invalid:
      "Lengkapi angka yang valid. Jumlah harus lebih dari nol; biaya dan harga tidak boleh negatif.",
    result: "Estimasi · berdasarkan asumsi pengguna",
    priorities: "Tiga tindakan prioritas",
    maintain: "Periksa ulang bukti kesiapan dan konfirmasi kebutuhan buyer",
    download: "Unduh rencana",
    copied: "Hasil disalin.",
    copy: "Salin hasil",
    copyFail: "Penyalinan tidak tersedia. Gunakan Unduh rencana.",
    consult: "Konsultasikan rencana",
    include: "Sertakan ringkasan produk, skor, dan biaya ke pesan WhatsApp",
    consultMessage: "Halo BECE Asia, saya ingin konsultasi rencana ekspor.",
    output: "Rencana ekspor BECE Asia",
    sources:
      "Sumber: input pengguna dan bobot penilaian mandiri BECE Asia. Tidak ada data pasar real-time atau pemeriksaan resmi dalam hasil ini.",
    loss: "Skenario ini menghasilkan margin negatif. Tinjau harga dan biaya sebelum menyiapkan penawaran.",
  },
  en: {
    title: "Start exporting with a clear plan.",
    intro:
      "Describe your product, assess readiness, choose a market, and estimate costs. Turn the result into three next actions.",
    steps: [
      "Product & market",
      "Business readiness",
      "Cost scenario",
      "Action plan",
    ],
    product: "Product name and specifications",
    productHint: "Example: arabica coffee, 250g packs, capacity of 500 units.",
    country: "Market to research",
    countryHint:
      "Your choice is a research destination, not an automatic market recommendation.",
    example: "Fill example",
    resume: "Resume saved plan",
    save: "Save in browser",
    saved: "Plan saved in this browser.",
    unavailable: "Storage unavailable. Download your result to keep your work.",
    missing: "No valid saved plan is available.",
    next: "Next",
    back: "Previous",
    restart: "Start over",
    local:
      "Data is saved only when you press Save, on this browser and device. It does not sync to an account.",
    yes: "Ready",
    no: "Not yet",
    unknown: "Not sure",
    questions: [
      "Business registration and legal documents available",
      "Stable product quality and production capacity",
      "Export-ready packaging and labels",
      "Relevant certifications or test reports available",
      "Product HS reference identified",
      "Delivery terms and payment risks understood",
      "Target market or potential buyer profile researched",
    ],
    score: "Self-assessed readiness score",
    scoreNote:
      "Ready answers receive the displayed weight; Not yet and Not sure receive zero. This is self-assessment, not certification.",
    verify: "Verify product and market requirements",
    research: "Open market research",
    hs: "Find HS references",
    amount: "Number of units",
    unitCost: "Production cost per unit",
    unitPrice: "Selling price per unit",
    freight: "Total shipping cost",
    documents: "Total document & other costs",
    currency: "Currency",
    date: "Assumption date",
    assumptions:
      "Estimate based on your inputs. All amounts must use the same currency. Taxes, insurance, and extras are included only if you add them to other costs. This is not a freight quote or buyer offer.",
    total: "Total cost",
    revenue: "Revenue",
    margin: "Estimated margin",
    perUnit: "Cost per unit",
    invalid:
      "Complete valid numbers. Quantity must exceed zero; costs and prices cannot be negative.",
    result: "Estimate · user assumptions",
    priorities: "Three priority actions",
    maintain: "Review readiness evidence and confirm buyer requirements",
    download: "Download plan",
    copied: "Result copied.",
    copy: "Copy result",
    copyFail: "Copy unavailable. Download the plan instead.",
    consult: "Discuss this plan",
    include: "Include product, score, and cost summary in WhatsApp message",
    consultMessage: "Hello BECE Asia, I would like to discuss an export plan.",
    output: "BECE Asia export plan",
    sources:
      "Source: user inputs and BECE Asia self-assessment weights. This result uses no real-time market data or official review.",
    loss: "This scenario has a negative margin. Review prices and costs before preparing an offer.",
  },
  zh: {
    title: "以明确计划开始出口。",
    intro:
      "描述产品、评估准备度、选择市场并估算成本。将结果转化为三项后续行动。",
    steps: ["产品与市场", "企业准备度", "成本情景", "行动计划"],
    product: "产品名称与规格",
    productHint: "例如：阿拉比卡咖啡，250 克包装，产能 500 件。",
    country: "待研究市场",
    countryHint: "此选择是研究目的地，并非自动市场推荐。",
    example: "填写示例",
    resume: "继续已保存计划",
    save: "保存到浏览器",
    saved: "计划已保存到此浏览器。",
    unavailable: "存储不可用。请下载结果保存工作。",
    missing: "没有可用的有效已保存计划。",
    next: "下一步",
    back: "上一步",
    restart: "重新开始",
    local: "仅在点击保存后，数据才会保存在此浏览器和设备。不会同步到账号。",
    yes: "已准备",
    no: "尚未",
    unknown: "不确定",
    questions: [
      "已具备企业注册及法律文件",
      "产品质量与产能稳定",
      "出口包装与标签已准备",
      "具备相关认证或检测报告",
      "已确定产品 HS 参考",
      "了解交付条款与付款风险",
      "已研究目标市场或潜在买家",
    ],
    score: "自评准备度分数",
    scoreNote: "已准备获得所示权重；尚未与不确定为零。这是自评，并非认证。",
    verify: "验证产品与市场要求",
    research: "打开市场研究",
    hs: "查询 HS 参考",
    amount: "件数",
    unitCost: "每件生产成本",
    unitPrice: "每件售价",
    freight: "运输总成本",
    documents: "文件与其他总成本",
    currency: "币种",
    date: "假设日期",
    assumptions:
      "基于您的输入估算。所有金额必须使用同一币种。税费、保险及其他费用仅在您将其计入其他成本时计算。这不是运费报价或买家报价。",
    total: "总成本",
    revenue: "收入",
    margin: "估算利润",
    perUnit: "每件成本",
    invalid: "请填写有效数字。数量须大于零；成本与价格不可为负。",
    result: "估算 · 用户假设",
    priorities: "三项优先行动",
    maintain: "复查准备度证据并确认买家要求",
    download: "下载计划",
    copied: "已复制结果。",
    copy: "复制结果",
    copyFail: "复制不可用，请下载计划。",
    consult: "咨询此计划",
    include: "将产品、分数和成本摘要加入 WhatsApp 消息",
    consultMessage: "您好 BECE Asia，我想咨询出口计划。",
    output: "BECE Asia 出口计划",
    sources:
      "来源：用户输入与 BECE Asia 自评权重。结果不包含实时市场数据或官方审核。",
    loss: "此情景利润为负。请在报价前复查价格与成本。",
  },
};

export function ExportOsPlatformClient({ locale }: { locale: Locale }) {
  const copy = copyByLocale[locale];
  const [plan, setPlan] = useState<ExportPlan>(blankPlan);
  const [step, setStep] = useState(0);
  const [message, setMessage] = useState("");
  const [include, setInclude] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const score = readinessScore(plan.answers);
  const result = calculatePlan(plan);
  const pending = plan.answers
    .map((answer, i) => (answer !== "yes" ? i : -1))
    .filter((i) => i >= 0);
  const actions = [
    ...pending.map((i) => copy.questions[i]),
    copy.maintain,
    copy.verify,
    copy.research,
  ].slice(0, 3);
  const money = (amount: number) =>
    new Intl.NumberFormat(
      locale === "id" ? "id-ID" : locale === "zh" ? "zh-CN" : "en-US",
      { style: "currency", currency: plan.currency, maximumFractionDigits: 2 },
    ).format(amount);
  const update = (key: keyof ExportPlan, value: string) =>
    setPlan((previous) => ({ ...previous, [key]: value }));
  const go = (next: number) => {
    setStep(next);
    setMessage("");
    requestAnimationFrame(() => {
      heading.current?.focus();
      heading.current?.scrollIntoView({ block: "start" });
    });
  };
  const save = () => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(plan));
      setMessage(copy.saved);
    } catch {
      setMessage(copy.unavailable);
    }
  };
  const resume = () => {
    try {
      const saved: unknown = JSON.parse(
        localStorage.getItem(storageKey) ?? "null",
      );
      if (isExportPlan(saved)) {
        setPlan(saved);
        go(0);
      } else setMessage(copy.missing);
    } catch {
      setMessage(copy.unavailable);
    }
  };
  const next = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step === 2 && !result) {
      setMessage(copy.invalid);
      return;
    }
    go(step + 1);
  };
  const output = [
    copy.output,
    copy.result,
    `${copy.product}: ${plan.product}`,
    `${copy.country}: ${plan.country}`,
    `${copy.date}: ${plan.assumptionDate}`,
    `${copy.score}: ${score}/100`,
    copy.scoreNote,
    ...copy.questions.map(
      (question, i) =>
        `${question}: ${plan.answers[i] === "yes" ? copy.yes : plan.answers[i] === "no" ? copy.no : copy.unknown} (${readinessWeights[i]})`,
    ),
    ...(
      ["quantity", "unitCost", "unitPrice", "freight", "documents"] as const
    ).map(
      (key, i) =>
        `${[copy.amount, copy.unitCost, copy.unitPrice, copy.freight, copy.documents][i]}: ${plan[key]} ${key === "quantity" ? "" : plan.currency}`,
    ),
    ...(result
      ? [
          `${copy.total}: ${money(result.totalCost)}`,
          `${copy.revenue}: ${money(result.revenue)}`,
          `${copy.margin}: ${money(result.margin)}`,
          `${copy.perUnit}: ${money(result.perUnit)}`,
        ]
      : []),
    copy.assumptions,
    copy.sources,
    copy.priorities,
    ...actions.map((action, i) => `${i + 1}. ${action}`),
  ].join("\n");
  const download = () => {
    const url = URL.createObjectURL(
      new Blob([output], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "bece-export-plan.txt";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <div className="bg-soft">
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <p className="text-sm font-bold text-emerald-300">BECE Export OS</p>
          <h1 className="mt-3 text-3xl font-black sm:text-5xl">{copy.title}</h1>
          <p className="mt-4 max-w-3xl leading-7 text-slate-300">
            {copy.intro}
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-8 pb-24 sm:px-6">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              setPlan(examplePlan);
              go(0);
            }}
            className="min-h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-navy"
          >
            {copy.example}
          </button>
          <button
            type="button"
            onClick={resume}
            className="min-h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-navy"
          >
            {copy.resume}
          </button>
          <button
            type="button"
            onClick={save}
            className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-navy"
          >
            <Save size={16} />
            {copy.save}
          </button>
        </div>
        <p className="mt-3 text-xs leading-6 text-slate-500">{copy.local}</p>
        <ol
          aria-label={
            locale === "id"
              ? "Kemajuan rencana"
              : locale === "zh"
                ? "计划进度"
                : "Plan progress"
          }
          className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4"
        >
          {copy.steps.map((label, i) => (
            <li
              key={label}
              aria-current={step === i ? "step" : undefined}
              className={`rounded-xl p-3 text-sm font-bold ${step === i ? "bg-navy text-white" : "bg-slate-200 text-slate-600"}`}
            >
              {i + 1}. {label}
            </li>
          ))}
        </ol>
        <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-5 sm:p-8">
          <h2
            ref={heading}
            tabIndex={-1}
            className="scroll-mt-24 text-2xl font-bold text-navy"
          >
            {step + 1} / 4 · {copy.steps[step]}
          </h2>
          <p
            role="status"
            className="mt-3 text-sm font-semibold text-emerald-800"
          >
            {message}
          </p>
          <form onSubmit={next}>
            {step === 0 && (
              <div className="mt-6 grid gap-5">
                <label className="font-semibold text-navy">
                  {copy.product}
                  <textarea
                    required
                    maxLength={500}
                    value={plan.product}
                    onChange={(e) => update("product", e.target.value)}
                    placeholder={copy.productHint}
                    className="mt-2 min-h-28 w-full rounded-xl border border-slate-300 p-3 text-sm"
                  />
                </label>
                <label className="font-semibold text-navy">
                  {copy.country}
                  <input
                    required
                    maxLength={120}
                    value={plan.country}
                    onChange={(e) => update("country", e.target.value)}
                    className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-3 text-sm"
                  />
                  <span className="mt-2 block text-xs font-normal leading-6 text-slate-500">
                    {copy.countryHint}
                  </span>
                </label>
                <Link
                  href={localePath(locale, "/market-intelligence")}
                  className="font-bold text-teal"
                >
                  {copy.research} →
                </Link>
              </div>
            )}
            {step === 1 && (
              <div className="mt-6 space-y-4">
                <p className="text-2xl font-black text-navy">
                  {copy.score}: {score}/100
                </p>
                <p className="text-xs leading-6 text-slate-600">
                  {copy.scoreNote}
                </p>
                {copy.questions.map((question, i) => (
                  <label
                    key={question}
                    className="block rounded-xl bg-slate-50 p-4 text-sm font-semibold text-navy"
                  >
                    {question}{" "}
                    <span className="text-xs text-slate-500">
                      (+{readinessWeights[i]})
                    </span>
                    <select
                      value={plan.answers[i]}
                      onChange={(e) =>
                        setPlan((previous) => ({
                          ...previous,
                          answers: previous.answers.map((answer, j) =>
                            i === j
                              ? (e.target.value as ReadinessAnswer)
                              : answer,
                          ),
                        }))
                      }
                      className="mt-3 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-3"
                    >
                      <option value="unknown">{copy.unknown}</option>
                      <option value="yes">{copy.yes}</option>
                      <option value="no">{copy.no}</option>
                    </select>
                  </label>
                ))}
                <Link
                  href={localePath(locale, "/apps/btki-smart-search")}
                  className="inline-block py-3 font-bold text-teal"
                >
                  {copy.hs} →
                </Link>
              </div>
            )}
            {step === 2 && (
              <div className="mt-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-sm font-semibold text-navy">
                    {copy.currency}
                    <select
                      value={plan.currency}
                      onChange={(e) => update("currency", e.target.value)}
                      className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-3"
                    >
                      <option>IDR</option>
                      <option>USD</option>
                    </select>
                  </label>
                  <label className="text-sm font-semibold text-navy">
                    {copy.date}
                    <input
                      required
                      type="date"
                      value={plan.assumptionDate}
                      onChange={(e) => update("assumptionDate", e.target.value)}
                      className="mt-2 min-h-12 w-full min-w-0 rounded-xl border border-slate-300 px-3"
                    />
                  </label>
                  {(
                    [
                      "quantity",
                      "unitCost",
                      "unitPrice",
                      "freight",
                      "documents",
                    ] as const
                  ).map((key, i) => (
                    <label
                      key={key}
                      className="text-sm font-semibold text-navy"
                    >
                      {
                        [
                          copy.amount,
                          copy.unitCost,
                          copy.unitPrice,
                          copy.freight,
                          copy.documents,
                        ][i]
                      }
                      {key === "quantity" ? "" : ` (${plan.currency})`}
                      <input
                        required
                        type="number"
                        inputMode="decimal"
                        min={key === "quantity" ? "0.000001" : "0"}
                        step="any"
                        value={plan[key]}
                        onChange={(e) => update(key, e.target.value)}
                        className="mt-2 min-h-12 w-full rounded-xl border border-slate-300 px-3"
                      />
                    </label>
                  ))}
                </div>
                <p className="mt-5 rounded-xl bg-amber-50 p-4 text-xs leading-6 text-amber-950">
                  {copy.assumptions}
                </p>
              </div>
            )}
            {step === 3 && result && (
              <div className="mt-6">
                <p className="text-sm font-bold text-amber-800">
                  {copy.result} · {plan.assumptionDate}
                </p>
                <p className="mt-2 break-words text-lg font-bold text-navy">
                  {plan.product} · {plan.country}
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    { label: copy.score, value: `${score}/100` },
                    { label: copy.total, value: money(result.totalCost) },
                    { label: copy.revenue, value: money(result.revenue) },
                    { label: copy.margin, value: money(result.margin) },
                    { label: copy.perUnit, value: money(result.perUnit) },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl bg-slate-50 p-4"
                    >
                      <p className="text-xs text-slate-600">{item.label}</p>
                      <p className="mt-1 break-words text-xl font-black text-navy">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
                {result.margin < 0 && (
                  <p className="mt-4 text-sm font-bold text-amber-800">
                    {copy.loss}
                  </p>
                )}
                <p className="mt-4 text-xs leading-6 text-slate-600">
                  {copy.assumptions}
                </p>
                <p className="mt-2 text-xs leading-6 text-slate-600">
                  {copy.sources}
                </p>
                <h3 className="mt-6 text-lg font-bold text-navy">
                  {copy.priorities}
                </h3>
                <ol className="mt-3 space-y-3">
                  {actions.map((action, i) => (
                    <li
                      key={action}
                      className="rounded-xl border border-slate-200 p-4 text-sm font-semibold text-navy"
                    >
                      {i + 1}. {action}
                    </li>
                  ))}
                </ol>
                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={download}
                    className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-navy px-4 font-bold text-white"
                  >
                    <Download size={18} />
                    {copy.download}
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(output);
                        setMessage(copy.copied);
                      } catch {
                        setMessage(copy.copyFail);
                      }
                    }}
                    className="min-h-12 rounded-xl border border-slate-200 px-4 font-bold text-navy"
                  >
                    {copy.copy}
                  </button>
                  <Link
                    href={localePath(locale, "/export-os/intelligence")}
                    className="inline-flex min-h-12 items-center rounded-xl border border-slate-200 px-4 font-bold text-navy"
                  >
                    {copy.research}
                  </Link>
                </div>
                <label className="mt-6 flex min-h-12 items-center gap-3 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={include}
                    onChange={(e) => setInclude(e.target.checked)}
                    className="h-5 w-5 shrink-0"
                  />
                  {copy.include}
                </label>
                <a
                  href={whatsappUrl(
                    include
                      ? `${copy.consultMessage}\n${output}`
                      : copy.consultMessage,
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex min-h-12 items-center rounded-xl bg-emerald-700 px-4 font-bold text-white"
                >
                  {copy.consult}
                </a>
              </div>
            )}
            <div className="mt-8 flex flex-wrap gap-3 border-t border-slate-200 pt-5">
              {step > 0 && (
                <button
                  type="button"
                  onClick={() => go(step - 1)}
                  className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-slate-200 px-4 font-bold text-navy"
                >
                  <ArrowLeft size={16} />
                  {copy.back}
                </button>
              )}
              {step < 3 ? (
                <button
                  type="submit"
                  className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-navy px-5 font-bold text-white"
                >
                  {copy.next}
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setPlan(blankPlan);
                    go(0);
                  }}
                  className="min-h-12 rounded-xl border border-slate-200 px-4 font-bold text-navy"
                >
                  {copy.restart}
                </button>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
