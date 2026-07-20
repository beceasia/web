import type { Locale } from "@/data/apps";

export type LocalText = Record<Locale, string>;

export type TradePoint = {
  year: string;
  value: number;
  volume: number;
};

export type MarketSignal = {
  country: LocalText;
  code: string;
  demand: number;
  growth: number;
  match: number;
  tariff: string;
};

export type BuyerSignal = {
  name: string;
  country: LocalText;
  activity: LocalText;
  match: number;
  type: LocalText;
};

export type IntelligenceProduct = {
  id: string;
  name: LocalText;
  hsCode: string;
  category: LocalText;
  description: LocalText;
  score: number;
  growth: number;
  exportValue: number;
  volume: number;
  price: { low: number; average: number; high: number; unit: string };
  trend: TradePoint[];
  markets: MarketSignal[];
  buyers: BuyerSignal[];
  recommendation: LocalText;
  signals: LocalText[];
  keywords: string[];
};

const market = (
  id: string,
  en: string,
  zh: string,
  code: string,
  demand: number,
  growth: number,
  match: number,
  tariff: string,
): MarketSignal => ({ country: { id, en, zh }, code, demand, growth, match, tariff });

const buyer = (
  name: string,
  country: LocalText,
  activity: LocalText,
  match: number,
  type: LocalText,
): BuyerSignal => ({ name, country, activity, match, type });

export const intelligenceProducts: IntelligenceProduct[] = [
  {
    id: "arabica-coffee",
    name: { id: "Kopi Arabika Indonesia", en: "Indonesian Arabica Coffee", zh: "印度尼西亚阿拉比卡咖啡" },
    hsCode: "0901.11",
    category: { id: "Kopi, belum disangrai", en: "Coffee, not roasted", zh: "未烘焙咖啡" },
    description: {
      id: "Biji kopi Arabika spesialti dari Indonesia dengan diferensiasi asal, proses, dan profil rasa.",
      en: "Indonesian specialty Arabica beans differentiated by origin, process, and flavour profile.",
      zh: "以产地、加工方式和风味特征形成差异化的印度尼西亚精品阿拉比卡咖啡豆。",
    },
    score: 87,
    growth: 14.8,
    exportValue: 438,
    volume: 94,
    price: { low: 4.2, average: 6.1, high: 9.4, unit: "USD/kg" },
    trend: [
      { year: "2021", value: 276, volume: 71 },
      { year: "2022", value: 318, volume: 78 },
      { year: "2023", value: 347, volume: 82 },
      { year: "2024", value: 382, volume: 86 },
      { year: "2025", value: 438, volume: 94 },
    ],
    markets: [
      market("Amerika Serikat", "United States", "美国", "US", 92, 12.6, 91, "0%"),
      market("Jepang", "Japan", "日本", "JP", 84, 9.2, 88, "0%"),
      market("Hong Kong", "Hong Kong", "香港", "HK", 78, 18.4, 90, "0%"),
      market("Korea Selatan", "South Korea", "韩国", "KR", 75, 15.1, 86, "2%"),
      market("Australia", "Australia", "澳大利亚", "AU", 71, 8.7, 82, "0%"),
    ],
    buyers: [
      buyer("Harbour Roasters Demo", { id: "Hong Kong", en: "Hong Kong", zh: "香港" }, { id: "Aktif 8 hari lalu", en: "Active 8 days ago", zh: "8天前活跃" }, 93, { id: "Roaster", en: "Roaster", zh: "烘焙商" }),
      buyer("Pacific Bean Lab Demo", { id: "Jepang", en: "Japan", zh: "日本" }, { id: "Aktif 14 hari lalu", en: "Active 14 days ago", zh: "14天前活跃" }, 89, { id: "Distributor", en: "Distributor", zh: "经销商" }),
      buyer("Northstar Coffee Demo", { id: "Amerika Serikat", en: "United States", zh: "美国" }, { id: "Aktif 21 hari lalu", en: "Active 21 days ago", zh: "21天前活跃" }, 85, { id: "Importir", en: "Importer", zh: "进口商" }),
    ],
    recommendation: {
      id: "Prioritaskan Hong Kong untuk lot mikro dengan profil rasa yang jelas. Siapkan cupping sheet bilingual, konsistensi pasokan 250-500 kg, dan penawaran sampel sebelum mendekati roaster independen.",
      en: "Prioritise Hong Kong for micro lots with a clear flavour profile. Prepare bilingual cupping sheets, consistent 250-500 kg supply, and a sample offer before approaching independent roasters.",
      zh: "优先以风味清晰的微批次进入香港市场。联系独立烘焙商前，准备双语杯测表、稳定的250-500公斤供应及样品方案。",
    },
    signals: [
      { id: "Permintaan premium meningkat", en: "Premium demand rising", zh: "高端需求上升" },
      { id: "Tarif rendah di pasar prioritas", en: "Low tariffs in priority markets", zh: "重点市场关税较低" },
      { id: "Asal produk menjadi pembeda", en: "Origin is a differentiator", zh: "产地是差异化因素" },
    ],
    keywords: ["kopi", "coffee", "arabica", "minuman", "beverage", "咖啡", "健康饮品"],
  },
  {
    id: "cocoa-beans",
    name: { id: "Biji Kakao Fermentasi", en: "Fermented Cocoa Beans", zh: "发酵可可豆" },
    hsCode: "1801.00",
    category: { id: "Kakao utuh atau pecah", en: "Cocoa beans, whole or broken", zh: "整粒或破碎可可豆" },
    description: {
      id: "Kakao fermentasi untuk produsen cokelat bean-to-bar dan industri bahan pangan premium.",
      en: "Fermented cocoa for bean-to-bar makers and premium food ingredient manufacturers.",
      zh: "面向精品巧克力制造商和高端食品原料企业的发酵可可豆。",
    },
    score: 82,
    growth: 19.3,
    exportValue: 311,
    volume: 68,
    price: { low: 3.8, average: 5.4, high: 7.6, unit: "USD/kg" },
    trend: [
      { year: "2021", value: 182, volume: 57 },
      { year: "2022", value: 203, volume: 59 },
      { year: "2023", value: 224, volume: 61 },
      { year: "2024", value: 261, volume: 64 },
      { year: "2025", value: 311, volume: 68 },
    ],
    markets: [
      market("Belanda", "Netherlands", "荷兰", "NL", 90, 17.2, 88, "0%"),
      market("Jepang", "Japan", "日本", "JP", 82, 11.8, 84, "0%"),
      market("Malaysia", "Malaysia", "马来西亚", "MY", 79, 13.1, 85, "0%"),
      market("Singapura", "Singapore", "新加坡", "SG", 76, 15.6, 83, "0%"),
      market("Hong Kong", "Hong Kong", "香港", "HK", 65, 12.3, 78, "0%"),
    ],
    buyers: [
      buyer("Lowlands Cacao Demo", { id: "Belanda", en: "Netherlands", zh: "荷兰" }, { id: "Aktif 5 hari lalu", en: "Active 5 days ago", zh: "5天前活跃" }, 91, { id: "Produsen", en: "Manufacturer", zh: "制造商" }),
      buyer("Cacao Atelier Demo", { id: "Jepang", en: "Japan", zh: "日本" }, { id: "Aktif 12 hari lalu", en: "Active 12 days ago", zh: "12天前活跃" }, 86, { id: "Bean-to-bar", en: "Bean-to-bar", zh: "精品巧克力商" }),
      buyer("Meridian Foods Demo", { id: "Singapura", en: "Singapore", zh: "新加坡" }, { id: "Aktif 18 hari lalu", en: "Active 18 days ago", zh: "18天前活跃" }, 82, { id: "Distributor", en: "Distributor", zh: "经销商" }),
    ],
    recommendation: {
      id: "Tonjolkan tingkat fermentasi, kadar air, dan keterlacakan kebun. Pasar Belanda memberi skala terbesar, sedangkan Jepang cocok untuk lot premium dengan dokumentasi mutu yang rinci.",
      en: "Lead with fermentation level, moisture, and farm traceability. The Netherlands offers scale, while Japan fits premium lots with detailed quality documentation.",
      zh: "重点展示发酵程度、含水率和农场可追溯性。荷兰提供规模机会，日本更适合具备详细品质文件的高端批次。",
    },
    signals: [
      { id: "Harga global menguat", en: "Global prices strengthening", zh: "全球价格走强" },
      { id: "Keterlacakan makin penting", en: "Traceability increasingly important", zh: "可追溯性日益重要" },
      { id: "Peluang bean-to-bar", en: "Bean-to-bar opportunity", zh: "精品巧克力机会" },
    ],
    keywords: ["kakao", "cocoa", "cacao", "chocolate", "food", "可可", "巧克力"],
  },
  {
    id: "coconut-charcoal",
    name: { id: "Briket Arang Kelapa", en: "Coconut Charcoal Briquettes", zh: "椰壳炭块" },
    hsCode: "4402.90",
    category: { id: "Arang kayu lainnya", en: "Other wood charcoal", zh: "其他木炭" },
    description: {
      id: "Briket arang berbahan tempurung kelapa untuk shisha, barbeque, dan kebutuhan hospitality.",
      en: "Coconut-shell charcoal briquettes for shisha, barbecue, and hospitality use.",
      zh: "用于水烟、烧烤和酒店餐饮场景的椰壳炭块。",
    },
    score: 84,
    growth: 16.1,
    exportValue: 286,
    volume: 121,
    price: { low: 1.2, average: 1.65, high: 2.3, unit: "USD/kg" },
    trend: [
      { year: "2021", value: 171, volume: 84 },
      { year: "2022", value: 196, volume: 91 },
      { year: "2023", value: 221, volume: 101 },
      { year: "2024", value: 246, volume: 111 },
      { year: "2025", value: 286, volume: 121 },
    ],
    markets: [
      market("Arab Saudi", "Saudi Arabia", "沙特阿拉伯", "SA", 94, 21.2, 92, "5%"),
      market("Uni Emirat Arab", "United Arab Emirates", "阿联酋", "AE", 90, 18.8, 91, "5%"),
      market("Turki", "Turkiye", "土耳其", "TR", 82, 14.3, 84, "2%"),
      market("Jerman", "Germany", "德国", "DE", 74, 8.9, 80, "0%"),
      market("Hong Kong", "Hong Kong", "香港", "HK", 63, 11.4, 76, "0%"),
    ],
    buyers: [
      buyer("Desert Ember Demo", { id: "Arab Saudi", en: "Saudi Arabia", zh: "沙特阿拉伯" }, { id: "Aktif 6 hari lalu", en: "Active 6 days ago", zh: "6天前活跃" }, 94, { id: "Distributor", en: "Distributor", zh: "经销商" }),
      buyer("Gulf Hospitality Demo", { id: "Uni Emirat Arab", en: "United Arab Emirates", zh: "阿联酋" }, { id: "Aktif 9 hari lalu", en: "Active 9 days ago", zh: "9天前活跃" }, 90, { id: "Hospitality", en: "Hospitality", zh: "酒店餐饮" }),
      buyer("Anatolia Coal Demo", { id: "Turki", en: "Turkiye", zh: "土耳其" }, { id: "Aktif 19 hari lalu", en: "Active 19 days ago", zh: "19天前活跃" }, 84, { id: "Importir", en: "Importer", zh: "进口商" }),
    ],
    recommendation: {
      id: "Fokus pada durasi bakar, kadar abu, dan sertifikasi laboratorium. Buat penawaran dalam kemasan retail dan bulk untuk menguji dua segmen pembeli di Saudi Arabia dan UEA.",
      en: "Lead with burn duration, ash content, and laboratory certification. Offer both retail and bulk packaging to test buyer segments in Saudi Arabia and the UAE.",
      zh: "突出燃烧时长、灰分和实验室认证。提供零售装与散装两种方案，以测试沙特和阿联酋的买家群体。",
    },
    signals: [
      { id: "Permintaan GCC tinggi", en: "Strong GCC demand", zh: "海湾市场需求强劲" },
      { id: "Spesifikasi mutu krusial", en: "Quality specification is critical", zh: "品质规格至关重要" },
      { id: "Kemasan memberi diferensiasi", en: "Packaging creates differentiation", zh: "包装形成差异化" },
    ],
    keywords: ["arang", "charcoal", "coconut", "briket", "briquette", "shisha", "椰壳炭"],
  },
  {
    id: "wood-furniture",
    name: { id: "Furnitur Kayu Indonesia", en: "Indonesian Wood Furniture", zh: "印度尼西亚木制家具" },
    hsCode: "9403.60",
    category: { id: "Furnitur kayu lainnya", en: "Other wooden furniture", zh: "其他木制家具" },
    description: {
      id: "Furnitur kayu untuk hunian dan hospitality dengan kekuatan desain, material, dan keterampilan pengrajin.",
      en: "Wood furniture for residential and hospitality buyers, differentiated by design, material, and craftsmanship.",
      zh: "面向住宅和酒店买家的木制家具，以设计、材料和工艺形成差异化。",
    },
    score: 79,
    growth: 8.6,
    exportValue: 524,
    volume: 156,
    price: { low: 180, average: 340, high: 720, unit: "USD/unit" },
    trend: [
      { year: "2021", value: 401, volume: 128 },
      { year: "2022", value: 439, volume: 136 },
      { year: "2023", value: 462, volume: 142 },
      { year: "2024", value: 482, volume: 148 },
      { year: "2025", value: 524, volume: 156 },
    ],
    markets: [
      market("Amerika Serikat", "United States", "美国", "US", 88, 7.8, 84, "0%"),
      market("Australia", "Australia", "澳大利亚", "AU", 80, 9.6, 83, "0%"),
      market("Jerman", "Germany", "德国", "DE", 75, 6.1, 78, "0%"),
      market("Hong Kong", "Hong Kong", "香港", "HK", 72, 13.2, 82, "0%"),
      market("Singapura", "Singapore", "新加坡", "SG", 70, 10.4, 80, "0%"),
    ],
    buyers: [
      buyer("Pacific Living Demo", { id: "Australia", en: "Australia", zh: "澳大利亚" }, { id: "Aktif 7 hari lalu", en: "Active 7 days ago", zh: "7天前活跃" }, 87, { id: "Retailer", en: "Retailer", zh: "零售商" }),
      buyer("Harbour Interiors Demo", { id: "Hong Kong", en: "Hong Kong", zh: "香港" }, { id: "Aktif 11 hari lalu", en: "Active 11 days ago", zh: "11天前活跃" }, 84, { id: "Desainer interior", en: "Interior designer", zh: "室内设计商" }),
      buyer("Nordhaus Demo", { id: "Jerman", en: "Germany", zh: "德国" }, { id: "Aktif 24 hari lalu", en: "Active 24 days ago", zh: "24天前活跃" }, 77, { id: "Distributor", en: "Distributor", zh: "经销商" }),
    ],
    recommendation: {
      id: "Gunakan katalog spesifikasi dengan dimensi, material, MOQ, dan lead time. Hong Kong menawarkan akses proyek hospitality bernilai tinggi, tetapi memerlukan konsistensi kualitas dan dokumentasi legalitas kayu.",
      en: "Use a specification-led catalogue covering dimensions, material, MOQ, and lead time. Hong Kong provides access to high-value hospitality projects but demands quality consistency and timber legality documents.",
      zh: "使用包含尺寸、材料、最小起订量和交期的规格型目录。香港可带来高价值酒店项目，但要求稳定品质及木材合法性文件。",
    },
    signals: [
      { id: "Nilai transaksi tinggi", en: "High transaction value", zh: "交易价值高" },
      { id: "Proyek hospitality tumbuh", en: "Hospitality projects growing", zh: "酒店项目增长" },
      { id: "Legalitas kayu wajib", en: "Timber legality required", zh: "木材合法性必备" },
    ],
    keywords: ["furnitur", "furniture", "kayu", "wood", "mebel", "hotel", "家具", "木制"],
  },
];

export const tradeInsights = [
  {
    date: "18 JUL 2026",
    title: { id: "Hong Kong memperluas peluang produk premium Asia", en: "Hong Kong expands opportunities for premium Asian products", zh: "香港扩大亚洲高端产品机会" },
    category: { id: "Sinyal pasar", en: "Market signal", zh: "市场信号" },
  },
  {
    date: "15 JUL 2026",
    title: { id: "Buyer beralih ke pemasok dengan keterlacakan lebih baik", en: "Buyers shift toward suppliers with stronger traceability", zh: "买家转向可追溯性更强的供应商" },
    category: { id: "Buyer intelligence", en: "Buyer intelligence", zh: "买家情报" },
  },
  {
    date: "12 JUL 2026",
    title: { id: "Kemasan kecil membuka kanal retail lintas batas", en: "Smaller packs open cross-border retail channels", zh: "小包装打开跨境零售渠道" },
    category: { id: "Strategi masuk", en: "Entry strategy", zh: "进入策略" },
  },
];

export const dashboardCopy = {
  id: {
    eyebrow: "BECE EXPORT INTELLIGENCE",
    title: "Temukan peluang ekspor",
    subtitle: "Cari produk, kebutuhan pasar, atau kode HS untuk mengubah referensi tarif menjadi keputusan ekspor yang dapat ditindaklanjuti.",
    placeholder: "Contoh: produk makanan sehat untuk pasar Hong Kong",
    search: "Analisis peluang",
    semantic: "Pencarian berbasis konteks",
    overview: "Discovery",
    product: "Produk",
    compare: "Bandingkan",
    country: "Negara",
    btki: "Cari BTKI lengkap",
    trending: "Produk dengan momentum",
    rising: "Pasar yang sedang naik",
    insights: "Trade insights terbaru",
    openProduct: "Buka intelijen produk",
    exportValue: "Nilai ekspor indikatif",
    growth: "Pertumbuhan tahunan",
    opportunity: "Skor peluang",
    targetMarkets: "Pasar prioritas",
    lastUpdate: "Snapshot demo · Jul 2026",
    productOverview: "Ringkasan produk",
    performance: "Kinerja perdagangan",
    marketRanking: "Peringkat pasar",
    buyers: "Buyer intelligence",
    prices: "Benchmark harga",
    recommendation: "Rekomendasi AI",
    demand: "Permintaan",
    match: "Kecocokan",
    tariff: "Tarif",
    buyerDisclaimer: "Nama pembeli adalah data demo. Verifikasi identitas, kebutuhan, dan kredibilitas sebelum menghubungi.",
    low: "Bawah",
    average: "Rata-rata",
    high: "Atas",
    compareTitle: "Bandingkan peluang produk",
    compareHint: "Nilai dua produk pada dimensi yang sama sebelum memilih pasar dan prioritas eksekusi.",
    countryTitle: "Country Intelligence: Hong Kong",
    countrySubtitle: "Gerbang regional dengan impor terbuka, konsumen berdaya beli tinggi, dan kebutuhan dokumentasi produk yang disiplin.",
    filters: "Filter & urutkan",
    sortScore: "Skor tertinggi",
    sortGrowth: "Pertumbuhan tertinggi",
    allMarkets: "Semua pasar",
    opportunityMap: "Peta peluang produk-pasar",
    formalLookup: "Perlu klasifikasi resmi?",
    formalLookupText: "Buka mesin pencarian 14.518 referensi BTKI untuk memeriksa uraian, BM, BK, PPN, dan catatan klasifikasi.",
    openLookup: "Buka pencarian BTKI",
    demo: "Data intelijen bersifat prototipe untuk pengembangan frontend dan bukan data perdagangan real-time.",
  },
  en: {
    eyebrow: "BECE EXPORT INTELLIGENCE",
    title: "Find export opportunities",
    subtitle: "Search products, market needs, or HS codes to turn tariff references into actionable export decisions.",
    placeholder: "Example: healthy food products for the Hong Kong market",
    search: "Analyse opportunity",
    semantic: "Context-aware search",
    overview: "Discovery",
    product: "Product",
    compare: "Compare",
    country: "Country",
    btki: "Full BTKI lookup",
    trending: "Products with momentum",
    rising: "Rising markets",
    insights: "Latest trade insights",
    openProduct: "Open product intelligence",
    exportValue: "Indicative export value",
    growth: "Annual growth",
    opportunity: "Opportunity score",
    targetMarkets: "Priority markets",
    lastUpdate: "Demo snapshot · Jul 2026",
    productOverview: "Product overview",
    performance: "Trade performance",
    marketRanking: "Market ranking",
    buyers: "Buyer intelligence",
    prices: "Price benchmark",
    recommendation: "AI recommendation",
    demand: "Demand",
    match: "Match",
    tariff: "Tariff",
    buyerDisclaimer: "Buyer names are demo data. Verify identity, requirements, and credibility before outreach.",
    low: "Low",
    average: "Average",
    high: "High",
    compareTitle: "Compare product opportunities",
    compareHint: "Assess two products on the same dimensions before selecting a market and execution priority.",
    countryTitle: "Country Intelligence: Hong Kong",
    countrySubtitle: "A regional gateway with open imports, affluent consumers, and disciplined product documentation requirements.",
    filters: "Filter & sort",
    sortScore: "Highest score",
    sortGrowth: "Highest growth",
    allMarkets: "All markets",
    opportunityMap: "Product-market opportunity map",
    formalLookup: "Need formal classification?",
    formalLookupText: "Open 14,518 BTKI references to inspect descriptions, import duty, export duty, VAT, and classification notes.",
    openLookup: "Open BTKI lookup",
    demo: "Intelligence data is a frontend prototype and not real-time trade data.",
  },
  zh: {
    eyebrow: "BECE 出口情报",
    title: "发现出口机会",
    subtitle: "搜索产品、市场需求或HS编码，将关税参考转化为可执行的出口决策。",
    placeholder: "例如：适合香港市场的健康食品",
    search: "分析机会",
    semantic: "情境化搜索",
    overview: "机会发现",
    product: "产品",
    compare: "比较",
    country: "国家",
    btki: "完整BTKI查询",
    trending: "动能产品",
    rising: "上升市场",
    insights: "最新贸易洞察",
    openProduct: "打开产品情报",
    exportValue: "指示性出口额",
    growth: "年度增长",
    opportunity: "机会评分",
    targetMarkets: "优先市场",
    lastUpdate: "演示快照 · 2026年7月",
    productOverview: "产品概览",
    performance: "贸易表现",
    marketRanking: "市场排名",
    buyers: "买家情报",
    prices: "价格基准",
    recommendation: "AI建议",
    demand: "需求",
    match: "匹配度",
    tariff: "关税",
    buyerDisclaimer: "买家名称为演示数据。联系前请核实身份、需求和信誉。",
    low: "低位",
    average: "平均",
    high: "高位",
    compareTitle: "比较产品机会",
    compareHint: "在选择市场和执行优先级前，以相同维度评估两种产品。",
    countryTitle: "国家情报：香港",
    countrySubtitle: "区域贸易门户，进口开放、消费能力强，并重视规范的产品文件。",
    filters: "筛选与排序",
    sortScore: "评分最高",
    sortGrowth: "增长最高",
    allMarkets: "全部市场",
    opportunityMap: "产品-市场机会图",
    formalLookup: "需要正式归类参考？",
    formalLookupText: "打开14,518条BTKI参考，检查商品描述、进口税、出口税、增值税和归类说明。",
    openLookup: "打开BTKI查询",
    demo: "情报数据为前端原型，并非实时贸易数据。",
  },
};

