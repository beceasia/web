import type { Locale } from "@/data/apps";

export type LocalText = Record<Locale, string>;

export type MarketIntelligenceRecord = {
  id: string;
  product: string;
  productLabel: LocalText;
  country: string;
  countryCode: string;
  hsCode: string;
  demandScore: number;
  growth: number;
  risk: "low" | "medium" | "high";
  confidence: "high" | "medium";
  opportunity: LocalText;
  priceSignal: string;
  regulations: LocalText[];
  certifications: string[];
  buyerChannels: LocalText[];
  competitors: string[];
  sourceLabel: string;
  sourceUrl?: string;
  updatedAt: string;
};

export type ExporterProfile = {
  id: string;
  name: string;
  location: string;
  products: LocalText[];
  capacity: string;
  certifications: string[];
  markets: string[];
  readinessScore: number;
  verified: boolean;
  summary: LocalText;
};

export type BuyerSignal = {
  id: string;
  name: string;
  country: string;
  industry: LocalText;
  interests: LocalText[];
  demand: string;
  channel: LocalText;
  qualityScore: number;
  sourceConfidence: "high" | "medium";
  lastChecked: string;
  demo: boolean;
};

export type LearningMission = {
  id: string;
  title: LocalText;
  description: LocalText;
  evidence: LocalText;
  minutes: number;
};

export type LearningLevel = {
  id: string;
  level: number;
  title: LocalText;
  description: LocalText;
  missions: LearningMission[];
};

export const intelligenceCopy = {
  id: {
    nav: "Intelligence Workspace",
    eyebrow: "PHASE 2 · EXPORT INTELLIGENCE ECOSYSTEM",
    title: "Satu terminal untuk membaca pasar, supplier, dan buyer",
    subtitle: "Bandingkan peluang produk-negara, cek persyaratan, temukan profil eksportir, simpan buyer signal, dan lanjutkan misi kesiapan ekspor dalam satu workspace.",
    overview: "Ringkasan",
    market: "Market intelligence",
    exporters: "Direktori eksportir",
    buyers: "Buyer intelligence",
    learning: "Learning path",
    search: "Cari produk, negara, perusahaan, atau industri",
    allProducts: "Semua produk",
    allCountries: "Semua negara",
    demand: "Skor permintaan",
    growth: "Pertumbuhan",
    risk: "Risiko",
    confidence: "Keyakinan data",
    requirements: "Persyaratan pasar",
    certifications: "Sertifikasi",
    channels: "Jalur buyer",
    competitors: "Negara pesaing",
    source: "Sumber dan kesegaran",
    updated: "Diperbarui",
    openBrief: "Buka market brief",
    exporterSummary: "Profil supplier Indonesia yang siap ditemukan buyer.",
    capacity: "Kapasitas",
    markets: "Pasar aktif",
    verified: "BECE verified",
    assessment: "Readiness",
    inquire: "Kirim inquiry",
    buyerSummary: "Buyer signal untuk prospecting. Data demo ditandai dan harus diverifikasi sebelum outreach.",
    buyerInterest: "Minat produk",
    quality: "Lead quality",
    saveLead: "Simpan lead",
    saved: "Tersimpan",
    learningSummary: "Misi singkat yang mengubah readiness gap menjadi bukti kerja.",
    missionProgress: "Progres misi",
    evidence: "Bukti selesai",
    minutes: "menit",
    demoNotice: "Data buyer pada MVP Phase 2 adalah data demonstrasi, bukan rekomendasi atau kontak terverifikasi.",
    noResults: "Tidak ada data yang cocok dengan filter ini.",
    low: "Rendah",
    medium: "Sedang",
    high: "Tinggi",
  },
  en: {
    nav: "Intelligence Workspace",
    eyebrow: "PHASE 2 · EXPORT INTELLIGENCE ECOSYSTEM",
    title: "One terminal for markets, suppliers, and buyers",
    subtitle: "Compare product-country opportunities, review requirements, discover exporters, save buyer signals, and continue export-readiness missions in one workspace.",
    overview: "Overview",
    market: "Market intelligence",
    exporters: "Exporter directory",
    buyers: "Buyer intelligence",
    learning: "Learning path",
    search: "Search products, countries, companies, or industries",
    allProducts: "All products",
    allCountries: "All countries",
    demand: "Demand score",
    growth: "Growth",
    risk: "Risk",
    confidence: "Data confidence",
    requirements: "Market requirements",
    certifications: "Certifications",
    channels: "Buyer channels",
    competitors: "Competing origins",
    source: "Source and freshness",
    updated: "Updated",
    openBrief: "Open market brief",
    exporterSummary: "Indonesian supplier profiles built for buyer discovery.",
    capacity: "Capacity",
    markets: "Active markets",
    verified: "BECE verified",
    assessment: "Readiness",
    inquire: "Send inquiry",
    buyerSummary: "Buyer signals for prospecting. Demo records are labeled and must be verified before outreach.",
    buyerInterest: "Product interest",
    quality: "Lead quality",
    saveLead: "Save lead",
    saved: "Saved",
    learningSummary: "Short missions that turn readiness gaps into working evidence.",
    missionProgress: "Mission progress",
    evidence: "Completion evidence",
    minutes: "minutes",
    demoNotice: "Buyer records in the Phase 2 MVP are demonstration data, not verified contacts or recommendations.",
    noResults: "No records match these filters.",
    low: "Low",
    medium: "Medium",
    high: "High",
  },
  zh: {
    nav: "情报工作台",
    eyebrow: "第二阶段 · 出口情报生态系统",
    title: "一个工作台掌握市场、供应商与买家",
    subtitle: "在一个工作台中比较产品与国家机会、查看准入要求、发现出口商、保存买家信号并完成出口准备任务。",
    overview: "概览",
    market: "市场情报",
    exporters: "出口商目录",
    buyers: "买家情报",
    learning: "学习路径",
    search: "搜索产品、国家、企业或行业",
    allProducts: "全部产品",
    allCountries: "全部国家",
    demand: "需求评分",
    growth: "增长",
    risk: "风险",
    confidence: "数据可信度",
    requirements: "市场要求",
    certifications: "认证",
    channels: "买家渠道",
    competitors: "竞争来源国",
    source: "来源与时效",
    updated: "更新于",
    openBrief: "打开市场简报",
    exporterSummary: "面向国际买家发现的印尼供应商档案。",
    capacity: "产能",
    markets: "活跃市场",
    verified: "BECE 已验证",
    assessment: "准备度",
    inquire: "发送询盘",
    buyerSummary: "用于潜客开发的买家信号。演示数据已标注，联系前必须核验。",
    buyerInterest: "产品兴趣",
    quality: "线索质量",
    saveLead: "保存线索",
    saved: "已保存",
    learningSummary: "将准备度差距转化为实际成果的短任务。",
    missionProgress: "任务进度",
    evidence: "完成凭证",
    minutes: "分钟",
    demoNotice: "第二阶段 MVP 中的买家记录为演示数据，并非已验证联系人或推荐。",
    noResults: "没有符合当前筛选条件的数据。",
    low: "低",
    medium: "中",
    high: "高",
  },
} satisfies Record<Locale, Record<string, string>>;

const text = (id: string, en: string, zh: string): LocalText => ({ id, en, zh });

export const marketIntelligenceRecords: MarketIntelligenceRecord[] = [
  {
    id: "coffee-japan",
    product: "coffee",
    productLabel: text("Kopi spesialti", "Specialty coffee", "精品咖啡"),
    country: "Japan",
    countryCode: "JP",
    hsCode: "0901",
    demandScore: 92,
    growth: 8.4,
    risk: "medium",
    confidence: "high",
    opportunity: text("Pasar premium dengan permintaan kuat untuk single origin, traceability, dan profil rasa yang konsisten.", "A premium market with strong demand for single-origin, traceability, and consistent flavor profiles.", "高端市场对单一产地、可追溯性和稳定风味有较强需求。"),
    priceSignal: "USD 7.8–13.5/kg",
    regulations: [text("Label pangan wajib dalam bahasa Jepang.", "Food labels are required in Japanese.", "食品标签须使用日语。"), text("Siapkan bukti keamanan pangan dan ketertelusuran lot.", "Prepare food-safety and lot-traceability evidence.", "准备食品安全与批次追溯证明。")],
    certifications: ["HACCP", "Phytosanitary", "Certificate of Origin"],
    buyerChannels: [text("Specialty roaster", "Specialty roaster", "精品烘焙商"), text("Distributor makanan premium", "Premium food distributor", "高端食品经销商")],
    competitors: ["Brazil", "Colombia", "Ethiopia"],
    sourceLabel: "BECE market synthesis · official-source review required",
    updatedAt: "2026-07-17",
  },
  {
    id: "coffee-hong-kong",
    product: "coffee",
    productLabel: text("Kopi spesialti", "Specialty coffee", "精品咖啡"),
    country: "Hong Kong",
    countryCode: "HK",
    hsCode: "0901",
    demandScore: 86,
    growth: 7.1,
    risk: "low",
    confidence: "high",
    opportunity: text("Hub perdagangan dengan segmen kafe premium, hospitality, dan peluang re-export Asia.", "A trading hub with premium cafes, hospitality demand, and Asian re-export opportunities.", "贸易枢纽，拥有高端咖啡馆、酒店需求及亚洲转口机会。"),
    priceSignal: "USD 7.2–12.0/kg",
    regulations: [text("Patuhi persyaratan keamanan pangan dan label importir lokal.", "Follow food-safety rules and local importer labeling requirements.", "遵守食品安全及本地进口商标签要求。")],
    certifications: ["Certificate of Origin", "Food safety evidence"],
    buyerChannels: [text("Importir gourmet", "Gourmet importer", "精品食品进口商"), text("Hotel dan restoran", "Hotel and restaurant", "酒店与餐饮")],
    competitors: ["Brazil", "Vietnam", "Colombia"],
    sourceLabel: "BECE Hong Kong market intelligence",
    sourceUrl: "/market-intelligence/hong-kong",
    updatedAt: "2026-07-15",
  },
  {
    id: "spices-uae",
    product: "spices",
    productLabel: text("Rempah Indonesia", "Indonesian spices", "印尼香料"),
    country: "United Arab Emirates",
    countryCode: "AE",
    hsCode: "0904–0910",
    demandScore: 88,
    growth: 9.2,
    risk: "medium",
    confidence: "medium",
    opportunity: text("Permintaan kuat dari food service, retail etnik, dan distributor yang melayani kawasan Teluk.", "Strong demand from food service, ethnic retail, and distributors serving Gulf markets.", "餐饮、民族零售及服务海湾市场的经销商需求强劲。"),
    priceSignal: "USD 3.9–9.8/kg",
    regulations: [text("Label Arab-Inggris dan data shelf life perlu konsisten.", "Arabic-English labels and shelf-life data should be consistent.", "阿拉伯语和英语标签及保质期信息须保持一致。")],
    certifications: ["Halal", "HACCP", "Certificate of Origin"],
    buyerChannels: [text("Distributor food service", "Food-service distributor", "餐饮经销商"), text("Retail etnik", "Ethnic retail", "民族零售")],
    competitors: ["India", "Vietnam", "China"],
    sourceLabel: "BECE market synthesis · validate tariff before shipment",
    updatedAt: "2026-07-12",
  },
  {
    id: "coconut-sugar-korea",
    product: "coconut-sugar",
    productLabel: text("Gula kelapa", "Coconut sugar", "椰子糖"),
    country: "South Korea",
    countryCode: "KR",
    hsCode: "1702",
    demandScore: 82,
    growth: 10.6,
    risk: "medium",
    confidence: "medium",
    opportunity: text("Cocok untuk segmen clean-label, healthy food, bakery, dan kanal e-commerce premium.", "A fit for clean-label, healthy-food, bakery, and premium e-commerce segments.", "适合清洁标签、健康食品、烘焙及高端电商细分市场。"),
    priceSignal: "USD 3.4–6.5/kg",
    regulations: [text("Dokumen komposisi, nutrisi, dan shelf life harus siap.", "Composition, nutrition, and shelf-life documentation must be ready.", "须准备成分、营养及保质期文件。")],
    certifications: ["Organic", "HACCP", "Halal"],
    buyerChannels: [text("Brand healthy food", "Healthy-food brand", "健康食品品牌"), text("Importir bahan bakery", "Bakery ingredient importer", "烘焙原料进口商")],
    competitors: ["Philippines", "Thailand"],
    sourceLabel: "BECE market synthesis · official-source review required",
    updatedAt: "2026-07-10",
  },
  {
    id: "furniture-australia",
    product: "furniture",
    productLabel: text("Furnitur kayu", "Wood furniture", "木制家具"),
    country: "Australia",
    countryCode: "AU",
    hsCode: "9403",
    demandScore: 84,
    growth: 5.9,
    risk: "medium",
    confidence: "high",
    opportunity: text("Peluang untuk desain natural, hospitality, dan furnitur indoor-outdoor dengan bukti legalitas kayu.", "Opportunity for natural design, hospitality, and indoor-outdoor furniture with timber-legality evidence.", "天然设计、酒店及室内外家具具有机会，但须提供木材合法性证明。"),
    priceSignal: "USD 120–780/unit",
    regulations: [text("Perhatikan biosecurity, fumigasi, dan legalitas kayu.", "Check biosecurity, fumigation, and timber-legality requirements.", "关注生物安全、熏蒸及木材合法性要求。")],
    certifications: ["SVLK", "FSC", "Fumigation"],
    buyerChannels: [text("Importir furnitur", "Furniture importer", "家具进口商"), text("Hospitality procurement", "Hospitality procurement", "酒店采购")],
    competitors: ["Vietnam", "China", "Malaysia"],
    sourceLabel: "BECE market synthesis · biosecurity check required",
    updatedAt: "2026-07-08",
  },
  {
    id: "cocoa-germany",
    product: "cocoa",
    productLabel: text("Kakao dan turunannya", "Cocoa and derivatives", "可可及其制品"),
    country: "Germany",
    countryCode: "DE",
    hsCode: "1801–1805",
    demandScore: 80,
    growth: 4.8,
    risk: "high",
    confidence: "medium",
    opportunity: text("Pasar industri besar, tetapi tuntutan traceability, sustainability, dan kepatuhan UE sangat tinggi.", "A large industrial market with demanding EU traceability, sustainability, and compliance expectations.", "大型工业市场，但欧盟对可追溯性、可持续性与合规要求很高。"),
    priceSignal: "USD 4.2–9.1/kg",
    regulations: [text("Siapkan due diligence rantai pasok dan data geolokasi kebun.", "Prepare supply-chain due diligence and farm geolocation data.", "准备供应链尽职调查及农场地理定位数据。")],
    certifications: ["EUDR evidence", "Organic", "Fairtrade"],
    buyerChannels: [text("Processor cokelat", "Chocolate processor", "巧克力加工商"), text("Importir bahan baku", "Ingredient importer", "原料进口商")],
    competitors: ["Côte d’Ivoire", "Ghana", "Ecuador"],
    sourceLabel: "BECE market synthesis · current EU rules must be checked",
    updatedAt: "2026-07-05",
  },
];

export const exporterProfiles: ExporterProfile[] = [
  { id: "exp-001", name: "Nusantara Coffee Cooperative", location: "Aceh, Indonesia", products: [text("Arabika Gayo", "Gayo arabica", "加约阿拉比卡咖啡")], capacity: "12 ton/month", certifications: ["Organic", "HACCP"], markets: ["Japan", "Singapore"], readinessScore: 88, verified: true, summary: text("Koperasi kopi spesialti dengan traceability lot dan kapasitas ekspor rutin.", "Specialty coffee cooperative with lot traceability and recurring export capacity.", "具备批次追溯和稳定出口能力的精品咖啡合作社。") },
  { id: "exp-002", name: "Java Natural Ingredients", location: "Central Java, Indonesia", products: [text("Gula kelapa", "Coconut sugar", "椰子糖"), text("Gula aren", "Palm sugar", "棕榈糖")], capacity: "20 ton/month", certifications: ["Organic", "Halal"], markets: ["South Korea", "Netherlands"], readinessScore: 83, verified: true, summary: text("Produsen pemanis alami untuk retail dan bahan baku industri.", "Natural sweetener producer serving retail and industrial ingredients.", "服务零售与工业原料市场的天然甜味剂生产商。") },
  { id: "exp-003", name: "Maluku Spice Collective", location: "Maluku, Indonesia", products: [text("Pala", "Nutmeg", "肉豆蔻"), text("Cengkeh", "Cloves", "丁香")], capacity: "8 ton/month", certifications: ["Phytosanitary", "Halal"], markets: ["UAE", "Malaysia"], readinessScore: 76, verified: false, summary: text("Agregator rempah dengan fokus mutu pascapanen dan asal produk.", "Spice aggregator focused on post-harvest quality and product origin.", "专注采后质量与产品原产地的香料集货商。") },
  { id: "exp-004", name: "Jepara Living Works", location: "Jepara, Indonesia", products: [text("Furnitur kayu", "Wood furniture", "木制家具")], capacity: "4 containers/month", certifications: ["SVLK", "FSC"], markets: ["Australia", "United States"], readinessScore: 91, verified: true, summary: text("Produsen furnitur custom untuk hospitality dan private label.", "Custom furniture manufacturer for hospitality and private-label buyers.", "面向酒店及自有品牌买家的定制家具制造商。") },
  { id: "exp-005", name: "Sulawesi Cocoa Partners", location: "South Sulawesi, Indonesia", products: [text("Biji kakao fermentasi", "Fermented cocoa beans", "发酵可可豆")], capacity: "30 ton/month", certifications: ["Organic", "Farm traceability"], markets: ["Germany", "Belgium"], readinessScore: 79, verified: false, summary: text("Jaringan petani kakao dengan fermentasi terkontrol dan traceability kebun.", "Cocoa farmer network with controlled fermentation and farm traceability.", "具备受控发酵与农场追溯能力的可可农户网络。") },
];

export const buyerSignals: BuyerSignal[] = [
  { id: "buy-001", name: "Demo · Specialty Roaster Network", country: "Japan", industry: text("Kopi premium", "Premium coffee", "高端咖啡"), interests: [text("Arabika single origin", "Single-origin arabica", "单一产地阿拉比卡")], demand: "1–3 ton/quarter", channel: text("Importir dan roaster", "Importer and roaster", "进口商与烘焙商"), qualityScore: 86, sourceConfidence: "medium", lastChecked: "2026-07-16", demo: true },
  { id: "buy-002", name: "Demo · Gulf Food Service Distributor", country: "United Arab Emirates", industry: text("Food service", "Food service", "餐饮供应"), interests: [text("Rempah", "Spices", "香料"), text("Kopi", "Coffee", "咖啡")], demand: "5–10 ton/month", channel: text("Distributor regional", "Regional distributor", "区域经销商"), qualityScore: 82, sourceConfidence: "medium", lastChecked: "2026-07-14", demo: true },
  { id: "buy-003", name: "Demo · Healthy Food Commerce", country: "South Korea", industry: text("Healthy food", "Healthy food", "健康食品"), interests: [text("Gula kelapa", "Coconut sugar", "椰子糖")], demand: "2–4 ton/month", channel: text("E-commerce dan retail", "E-commerce and retail", "电商与零售"), qualityScore: 78, sourceConfidence: "medium", lastChecked: "2026-07-12", demo: true },
  { id: "buy-004", name: "Demo · Hospitality Sourcing Group", country: "Australia", industry: text("Hospitality", "Hospitality", "酒店业"), interests: [text("Furnitur kayu", "Wood furniture", "木制家具")], demand: "1–2 containers/quarter", channel: text("Procurement group", "Procurement group", "采购集团"), qualityScore: 84, sourceConfidence: "medium", lastChecked: "2026-07-11", demo: true },
  { id: "buy-005", name: "Demo · European Cocoa Processor", country: "Germany", industry: text("Pengolahan cokelat", "Chocolate processing", "巧克力加工"), interests: [text("Kakao fermentasi", "Fermented cocoa", "发酵可可")], demand: "20–40 ton/quarter", channel: text("Industrial processor", "Industrial processor", "工业加工商"), qualityScore: 75, sourceConfidence: "medium", lastChecked: "2026-07-09", demo: true },
];

export const learningLevels: LearningLevel[] = [
  {
    id: "level-1",
    level: 1,
    title: text("Fondasi eksportir", "Exporter foundation", "出口商基础"),
    description: text("Pastikan identitas usaha, produk, dan kapasitas dapat dibuktikan.", "Prove the business identity, product, and capacity.", "证明企业身份、产品与产能。"),
    missions: [
      { id: "m1-nib", title: text("Validasi legalitas usaha", "Validate business legality", "验证企业合法资质"), description: text("Catat NIB, NPWP, dan data perusahaan yang akan tampil pada dokumen ekspor.", "Record the business registration and company data used in export documents.", "记录出口文件所需的企业注册及公司信息。"), evidence: text("Nomor legalitas dan company profile", "Registration number and company profile", "注册号码与公司简介"), minutes: 20 },
      { id: "m1-product", title: text("Buat lembar spesifikasi produk", "Create a product specification sheet", "制作产品规格表"), description: text("Tuliskan bahan, ukuran, kapasitas, MOQ, shelf life, dan kondisi penyimpanan.", "Document materials, size, capacity, MOQ, shelf life, and storage.", "记录材料、尺寸、产能、最低订单量、保质期及储存条件。"), evidence: text("Product specification sheet", "Product specification sheet", "产品规格表"), minutes: 35 },
    ],
  },
  {
    id: "level-2",
    level: 2,
    title: text("Market ready", "Market ready", "市场准备"),
    description: text("Hubungkan produk dengan HS code, negara, buyer, dan persyaratan.", "Connect the product to an HS code, market, buyer, and requirements.", "将产品与 HS 编码、市场、买家及准入要求连接。"),
    missions: [
      { id: "m2-hs", title: text("Konfirmasi HS code", "Confirm the HS code", "确认 HS 编码"), description: text("Gunakan BTKI dan catat alasan klasifikasi produk.", "Use BTKI and record the classification rationale.", "使用 BTKI 并记录产品归类依据。"), evidence: text("HS code dan catatan klasifikasi", "HS code and classification note", "HS 编码与归类说明"), minutes: 30 },
      { id: "m2-country", title: text("Pilih satu negara prioritas", "Choose one priority market", "选择一个优先市场"), description: text("Bandingkan demand, persyaratan, risiko, dan jalur buyer.", "Compare demand, requirements, risk, and buyer channels.", "比较需求、要求、风险及买家渠道。"), evidence: text("Market brief satu halaman", "One-page market brief", "一页市场简报"), minutes: 40 },
    ],
  },
  {
    id: "level-3",
    level: 3,
    title: text("Buyer ready", "Buyer ready", "买家准备"),
    description: text("Siapkan materi komersial dan proses follow-up buyer.", "Prepare commercial materials and a buyer follow-up process.", "准备商业资料及买家跟进流程。"),
    missions: [
      { id: "m3-offer", title: text("Buat export offer", "Build an export offer", "制作出口报价方案"), description: text("Susun harga, MOQ, Incoterm, lead time, dan sample policy.", "Define pricing, MOQ, Incoterm, lead time, and sample policy.", "明确价格、最低订单量、贸易术语、交期及样品政策。"), evidence: text("Quotation atau offer sheet", "Quotation or offer sheet", "报价单或产品提案"), minutes: 45 },
      { id: "m3-list", title: text("Bangun shortlist buyer", "Build a buyer shortlist", "建立买家候选清单"), description: text("Pilih lima buyer dengan kecocokan produk dan kanal yang jelas.", "Select five buyers with clear product and channel fit.", "选择五个产品及渠道匹配明确的买家。"), evidence: text("Buyer shortlist dan alasan fit", "Buyer shortlist with fit rationale", "买家清单及匹配理由"), minutes: 35 },
    ],
  },
  {
    id: "level-4",
    level: 4,
    title: text("Shipment ready", "Shipment ready", "出运准备"),
    description: text("Simulasikan biaya, dokumen, pembayaran, dan pengiriman pertama.", "Simulate cost, documents, payment, and the first shipment.", "模拟成本、文件、付款及首次出运。"),
    missions: [
      { id: "m4-cost", title: text("Validasi landed cost", "Validate landed cost", "核算到岸成本"), description: text("Hitung FOB, freight, insurance, duty, dan margin skenario.", "Calculate FOB, freight, insurance, duty, and scenario margin.", "计算 FOB、运费、保险、关税及情景利润。"), evidence: text("Skenario kalkulasi biaya", "Cost calculation scenario", "成本测算方案"), minutes: 40 },
      { id: "m4-checklist", title: text("Susun shipment checklist", "Create a shipment checklist", "制作出运清单"), description: text("Daftar dokumen, pihak terkait, deadline, dan risiko transaksi.", "List documents, responsible parties, deadlines, and transaction risks.", "列出文件、责任方、期限及交易风险。"), evidence: text("Shipment checklist", "Shipment checklist", "出运清单"), minutes: 30 },
    ],
  },
];

export function localize(value: LocalText, locale: Locale) {
  return value[locale];
}

export function filterMarketRecords(search = "", product = "", country = "") {
  const query = search.trim().toLowerCase();
  return marketIntelligenceRecords.filter((record) => {
    const matchesSearch = !query || [record.product, record.productLabel.id, record.productLabel.en, record.country, record.hsCode].some((value) => value.toLowerCase().includes(query));
    return matchesSearch && (!product || record.product === product) && (!country || record.country === country);
  });
}
