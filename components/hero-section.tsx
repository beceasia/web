import { ArrowRight, CheckCircle2, Globe2, Wrench } from "lucide-react";
import Link from "next/link";
import type { Locale } from "@/data/apps";
import { localePath } from "@/lib/routes";
import { HomeSearch } from "./home-search";

export function HeroSection({ locale }: { locale: Locale }) {
  const copy = {
    id: {
      title: "Temukan peluang ekspor. Selesaikan pekerjaan bisnis Anda.",
      subtitle:
        "Riset pasar, telusuri referensi HS, hitung biaya, dan siapkan dokumen dalam satu tempat.",
      eyebrow: "Dari pertanyaan ke langkah berikutnya",
      paths: [
        "Saya ingin mulai ekspor",
        "Saya ingin mencari pasar dan buyer",
        "Saya ingin menggunakan alat kerja",
      ],
      result: "Seperti apa hasilnya?",
      example: "Contoh rencana ekspor",
      product: "Produk: kopi Indonesia",
      steps: [
        "Kenali kesiapan usaha",
        "Pilih pasar untuk diteliti",
        "Hitung biaya dan margin",
        "Unduh tiga tindakan prioritas",
      ],
      note: "Isi data Anda atau coba contoh. Estimasi biaya mengikuti asumsi Anda.",
    },
    en: {
      title: "Find export opportunities. Get your business work done.",
      subtitle:
        "Research markets, explore HS references, estimate costs, and prepare documents in one place.",
      eyebrow: "From questions to next steps",
      paths: [
        "I want to start exporting",
        "I want to find markets and buyers",
        "I want to use business tools",
      ],
      result: "What can you create?",
      example: "Example export plan",
      product: "Product: Indonesian coffee",
      steps: [
        "Assess business readiness",
        "Choose a market to research",
        "Estimate costs and margin",
        "Download three priority actions",
      ],
      note: "Use your own inputs or try an example. Cost estimates follow your assumptions.",
    },
    zh: {
      title: "发现出口机会，完成业务工作。",
      subtitle: "在一个平台研究市场、查询 HS 参考、估算成本并准备文件。",
      eyebrow: "从问题到下一步行动",
      paths: ["我想开始出口", "我想寻找市场与买家", "我想使用业务工具"],
      result: "您能获得什么结果？",
      example: "出口计划示例",
      product: "产品：印尼咖啡",
      steps: [
        "评估企业准备度",
        "选择待研究的市场",
        "估算成本与利润",
        "下载三项优先行动",
      ],
      note: "填写您的数据或尝试示例。成本估算基于您的假设。",
    },
  }[locale];
  const paths = ["/export-os", "/export-os/intelligence", "/apps"];
  const icons = [CheckCircle2, Globe2, Wrench];
  return (
    <section className="bg-[linear-gradient(180deg,#ffffff,#f7fafc)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.25fr_0.75fr] lg:px-8 lg:py-16">
        <div>
          <p className="text-sm font-bold text-teal">{copy.eyebrow}</p>
          <h1 className="mt-4 max-w-3xl text-3xl font-black tracking-tight text-navy sm:text-5xl lg:text-6xl">
            {copy.title}
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-slate-600">
            {copy.subtitle}
          </p>
          <HomeSearch locale={locale} />
          <div className="mt-4 grid gap-2">
            {copy.paths.map((title, index) => {
              const Icon = icons[index];
              return (
                <Link
                  key={title}
                  href={localePath(locale, paths[index])}
                  className="flex min-h-12 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-navy hover:border-teal"
                >
                  <Icon size={20} className="shrink-0 text-teal" />
                  {title}
                  <ArrowRight size={16} className="ml-auto shrink-0" />
                </Link>
              );
            })}
          </div>
        </div>
        <div className="self-center rounded-3xl bg-navy p-6 text-white shadow-soft">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-300">
            {copy.result}
          </p>
          <h2 className="mt-3 text-2xl font-bold">{copy.example}</h2>
          <p className="mt-2 text-sm text-slate-300">{copy.product}</p>
          <ol className="mt-6 space-y-4">
            {copy.steps.map((step, i) => (
              <li key={step} className="flex items-center gap-3 text-sm">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-emerald-300">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <p className="mt-6 border-t border-white/15 pt-4 text-xs leading-6 text-slate-300">
            {copy.note}
          </p>
          <Link
            href={localePath(locale, "/export-os")}
            className="mt-4 inline-flex min-h-12 items-center gap-2 rounded-xl bg-white px-4 font-bold text-navy"
          >
            {copy.paths[0]}
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
