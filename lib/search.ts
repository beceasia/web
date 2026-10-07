import { apps, type AppItem, type Locale } from "@/data/apps";
import { attendanceApps } from "@/data/attendance-apps";
import { businessToolsApps } from "@/data/business-tools-apps";
import { communityGamesApps } from "@/data/community-games-apps";
import { creativeBusinessApps } from "@/data/creative-business-apps";
import { matchesSearch } from "./search-match";
import { intelligenceProducts } from "@/data/btki-intelligence";

export const catalog = [
  ...apps,
  ...attendanceApps,
  ...businessToolsApps,
  ...creativeBusinessApps,
  ...communityGamesApps,
];
export function appMatchesSearch(app: AppItem, query: string) {
  return matchesSearch(
    [
      app.slug,
      ...Object.values(app.name),
      ...Object.values(app.description),
      ...Object.values(app.tagline),
      app.category,
      ...app.tags,
      ...(app.slug === "btki-smart-search"
        ? intelligenceProducts.flatMap((product) => [
            ...Object.values(product.name),
            product.hsCode,
            ...product.keywords,
          ])
        : []),
    ].join(" "),
    query,
  );
}
export function resourceResults(query: string, locale: Locale) {
  if (!query.trim()) return [];
  const label = (id: string, en: string, zh: string) =>
    locale === "id" ? id : locale === "zh" ? zh : en;
  const resources = [
    {
      path: "/export-os",
      title: label(
        "Mulai rencana ekspor",
        "Start an export plan",
        "开始出口计划",
      ),
      keywords:
        "ekspor export kesiapan readiness biaya cost kalkulator calculator produk product kopi coffee kakao cocoa rempah spices",
      description: label(
        "Isi produk, nilai kesiapan, dan hitung skenario biaya.",
        "Describe your product, assess readiness, and estimate costs.",
        "填写产品、评估准备度并估算成本。",
      ),
    },
    {
      path: "/export-os/intelligence",
      title: label(
        "Riset produk, pasar, dan buyer",
        "Product, market, and buyer research",
        "产品、市场与买家研究",
      ),
      keywords:
        "kakao cocoa kopi coffee rempah spices jepang japan malaysia buyer pembeli market pasar hong kong",
      description: label(
        "Telusuri contoh peluang dan persyaratan. Data demo perlu diverifikasi.",
        "Explore sample opportunities and requirements. Verify demo data.",
        "探索示例机会与要求。请验证演示数据。",
      ),
    },
    {
      path: "/market-intelligence/hong-kong",
      title: label(
        "Panduan pasar Hong Kong",
        "Hong Kong market guide",
        "香港市场指南",
      ),
      keywords:
        "hong kong hongkong negara country laporan report artikel article kopi coffee rempah spices",
      description: label(
        "Pasar, regulasi, dan langkah mencari buyer beserta referensi.",
        "Market, regulations, and buyer research with references.",
        "市场、法规与买家研究及参考资料。",
      ),
    },
    {
      path: "/docs",
      title: label("Panduan alat kerja", "Tool guides", "工具指南"),
      keywords:
        "panduan guide dokumen document invoice packing list hs fob cif moq",
      description: label(
        "Panduan penggunaan dan referensi alat.",
        "Usage guides and tool references.",
        "使用指南与工具参考。",
      ),
    },
  ];
  return resources.filter((item) =>
    matchesSearch(`${item.title} ${item.keywords}`, query),
  );
}
export function appAction(app: AppItem, locale: Locale) {
  const labels: Record<string, [string, string, string]> = {
    "btki-smart-search": [
      "Cari produk & HS",
      "Find products & HS",
      "查询产品与 HS",
    ],
    "kalkulator-sawit": ["Hitung biaya", "Calculate costs", "计算费用"],
    "freight-analyzer": ["Analisis quotation", "Analyze quotation", "分析报价"],
    "export-clinic-workbench": [
      "Mulai penilaian",
      "Assess readiness",
      "评估准备度",
    ],
    "ocr-translate-pdf": ["Proses dokumen", "Process documents", "处理文档"],
    "research-workbench": ["Mulai riset", "Start research", "开始研究"],
  };
  return (labels[app.slug] ?? ["Gunakan alat", "Use tool", "使用工具"])[
    locale === "id" ? 0 : locale === "en" ? 1 : 2
  ];
}
