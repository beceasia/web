import type { Locale, Localized } from "@/data/apps";

export type MarketProduct = {
  product: Localized<string>;
  potential: Localized<string>;
  reason: Localized<string>;
  buyer: Localized<string>;
  barrier: Localized<string>;
};

export type MarketRisk = {
  risk: Localized<string>;
  solution: Localized<string>;
};

export type MarketCountry = {
  slug: string;
  country: Localized<string>;
  region: Localized<string>;
  status: Localized<string>;
  opportunity: Localized<string>;
  summary: Localized<string>;
  products: Localized<string[]>;
  updatedAt: string;
  href: string;
};

export const hongKongMarket = {
  slug: "hong-kong",
  country: { en: "Hong Kong", id: "Hong Kong", zh: "香港" },
  title: {
    id: "Strategi Ekspor Indonesia ke Hong Kong: Peluang Pasar, Produk Potensial, Regulasi, dan Strategi Menembus Buyer",
    en: "Indonesia Export Strategy to Hong Kong: Market Opportunities, Potential Products, Regulations, and Buyer Entry Strategy",
    zh: "印尼出口香港策略：市场机会、潜力产品、法规与买家开发",
  },
  metaDescription: {
    id: "Panduan lengkap ekspor Indonesia ke Hong Kong meliputi peluang pasar, produk potensial, regulasi impor, tarif perdagangan, strategi mencari buyer, dan cara memasuki pasar Hong Kong.",
    en: "A practical guide to exporting Indonesian products to Hong Kong, covering market opportunities, potential products, import regulations, tariffs, buyer search strategy, and market entry steps.",
    zh: "面向印尼企业出口香港的实用指南，涵盖市场机会、潜力产品、进口法规、关税、买家开发策略及市场进入步骤。",
  },
  hero: {
    eyebrow: { id: "Market intelligence ekspor", en: "Export market intelligence", zh: "出口市场情报" },
    title: {
      id: "Ekspor Indonesia ke Hong Kong: Membuka Peluang di Salah Satu Hub Perdagangan Asia",
      en: "Exporting from Indonesia to Hong Kong: Unlocking Opportunities in one of Asia's Trade Hubs",
      zh: "印尼出口香港：打开亚洲贸易枢纽的市场机会",
    },
    subtitle: {
      id: "Hong Kong merupakan pusat perdagangan internasional dengan sistem perdagangan bebas, daya beli tinggi, serta akses strategis menuju pasar Asia Timur.",
      en: "Hong Kong is an international trading center with a free-trade system, strong purchasing power, and strategic access to East Asian markets.",
      zh: "香港是国际贸易中心，拥有自由贸易体系、高购买力，并可作为进入东亚市场的战略门户。",
    },
  },
  highlights: [
    { label: { id: "Populasi", en: "Population", zh: "人口" }, value: { id: "+/- 7,5 juta", en: "Approx. 7.5 million", zh: "约750万" } },
    { label: { id: "GDP per kapita", en: "GDP per capita", zh: "人均GDP" }, value: { id: "+/- USD 56.962", en: "Approx. USD 56,962", zh: "约56,962美元" } },
    { label: { id: "Posisi", en: "Position", zh: "定位" }, value: { id: "Global financial hub dan international trading gateway", en: "Global financial hub and international trading gateway", zh: "全球金融中心与国际贸易门户" } },
    { label: { id: "Komunitas Indonesia", en: "Indonesian community", zh: "印尼社群" }, value: { id: "+/- 186.710 WNI di Hong Kong", en: "Approx. 186,710 Indonesians in Hong Kong", zh: "约186,710名在港印尼公民" } },
  ],
  overview: {
    title: {
      id: "Overview Hong Kong sebagai Negara Tujuan Ekspor",
      en: "Hong Kong as an Export Destination",
      zh: "香港作为出口目的地概览",
    },
    body: {
      id: "Hong Kong merupakan Wilayah Administratif Khusus Republik Rakyat Tiongkok yang menerapkan prinsip One Country, Two Systems. Dengan luas sekitar 1.114 km2 dan populasi sekitar 7,5 juta jiwa, Hong Kong memiliki posisi strategis sebagai pusat perdagangan, keuangan, logistik, dan pintu masuk menuju pasar Tiongkok.",
      en: "Hong Kong is a Special Administrative Region of the People's Republic of China under the One Country, Two Systems principle. With an area of around 1,114 km2 and a population of about 7.5 million, Hong Kong is positioned as a trade, finance, logistics, and Greater China gateway.",
      zh: "香港是中华人民共和国特别行政区，实行“一国两制”。香港面积约1,114平方公里，人口约750万，是贸易、金融、物流中心，也是进入大中华市场的重要门户。",
    },
  },
  advantages: [
    {
      title: { id: "Free Trade Economy", en: "Free Trade Economy", zh: "自由贸易经济" },
      body: { id: "Hong Kong menerapkan sistem perdagangan bebas dengan sebagian besar produk tidak dikenakan tarif impor.", en: "Hong Kong operates a free-trade system where most products are not subject to import tariffs.", zh: "香港实行自由贸易制度，大多数产品无需缴纳进口关税。" },
    },
    {
      title: { id: "Strategic Location", en: "Strategic Location", zh: "战略位置" },
      body: { id: "Menjadi penghubung antara pasar internasional dan Greater China.", en: "It connects international markets with Greater China.", zh: "连接国际市场与大中华地区。" },
    },
    {
      title: { id: "High Purchasing Power", en: "High Purchasing Power", zh: "高购买力" },
      body: { id: "Pendapatan per kapita tinggi membuka peluang bagi produk premium Indonesia.", en: "High income per capita creates room for premium Indonesian products.", zh: "较高的人均收入为印尼优质产品创造机会。" },
    },
    {
      title: { id: "Tourism Market", en: "Tourism Market", zh: "旅游消费市场" },
      body: { id: "Arus wisatawan menciptakan peluang tambahan untuk makanan, lifestyle, dan hospitality.", en: "Visitor flows create additional demand for food, lifestyle, and hospitality products.", zh: "旅游客流为食品、生活方式和酒店餐饮相关产品带来额外需求。" },
    },
  ],
  opportunityCards: [
    {
      title: { id: "Food & Beverage", en: "Food & Beverage", zh: "食品与饮料" },
      level: { id: "Tinggi", en: "High", zh: "高" },
      products: {
        id: ["Kopi Indonesia", "Rempah", "Makanan olahan", "Produk halal", "Snack premium"],
        en: ["Indonesian coffee", "Spices", "Processed food", "Halal products", "Premium snacks"],
        zh: ["印尼咖啡", "香料", "加工食品", "清真产品", "高端零食"],
      },
      buyers: {
        id: ["Distributor makanan", "Hotel", "Restaurant", "Supermarket"],
        en: ["Food distributors", "Hotels", "Restaurants", "Supermarkets"],
        zh: ["食品经销商", "酒店", "餐厅", "超市"],
      },
    },
    {
      title: { id: "Lifestyle Product", en: "Lifestyle Product", zh: "生活方式产品" },
      level: { id: "Menengah-Tinggi", en: "Medium-High", zh: "中高" },
      products: {
        id: ["Kerajinan kayu", "Furniture kecil", "Produk dekorasi", "Handmade product"],
        en: ["Wood crafts", "Small furniture", "Decorative products", "Handmade products"],
        zh: ["木制工艺品", "小型家具", "装饰品", "手工产品"],
      },
      buyers: {
        id: ["Boutique store", "Interior company", "Hotel"],
        en: ["Boutique stores", "Interior companies", "Hotels"],
        zh: ["精品店", "室内设计公司", "酒店"],
      },
    },
    {
      title: { id: "Beauty & Wellness", en: "Beauty & Wellness", zh: "美容与健康" },
      level: { id: "Menengah", en: "Medium", zh: "中" },
      products: {
        id: ["Natural skincare", "Produk herbal", "Essential oil"],
        en: ["Natural skincare", "Herbal products", "Essential oils"],
        zh: ["天然护肤品", "草本产品", "精油"],
      },
      buyers: {
        id: ["Retail kecantikan", "Wellness store", "Online retailer"],
        en: ["Beauty retailers", "Wellness stores", "Online retailers"],
        zh: ["美容零售商", "健康产品店", "线上零售商"],
      },
    },
    {
      title: { id: "Agricultural Product", en: "Agricultural Product", zh: "农产品" },
      level: { id: "Menengah", en: "Medium", zh: "中" },
      products: {
        id: ["Kopi", "Kakao", "Buah tropis", "Rempah"],
        en: ["Coffee", "Cocoa", "Tropical fruit", "Spices"],
        zh: ["咖啡", "可可", "热带水果", "香料"],
      },
      buyers: {
        id: ["Food manufacturer", "Importer", "Distributor"],
        en: ["Food manufacturers", "Importers", "Distributors"],
        zh: ["食品制造商", "进口商", "经销商"],
      },
    },
  ],
  products: [
    {
      product: { id: "Kopi Specialty Indonesia", en: "Indonesian Specialty Coffee", zh: "印尼精品咖啡" },
      potential: { id: "Tinggi", en: "High", zh: "高" },
      reason: { id: "Hong Kong memiliki budaya konsumsi kopi premium dan pasar cafe berkembang.", en: "Hong Kong has a premium coffee culture and a growing cafe market.", zh: "香港具备精品咖啡消费文化，咖啡馆市场持续发展。" },
      buyer: { id: "Coffee roaster, cafe, distributor", en: "Coffee roasters, cafes, distributors", zh: "咖啡烘焙商、咖啡馆、经销商" },
      barrier: { id: "Standar kualitas dan konsistensi supply", en: "Quality standards and supply consistency", zh: "质量标准与供应稳定性" },
    },
    {
      product: { id: "Makanan Halal Indonesia", en: "Indonesian Halal Food", zh: "印尼清真食品" },
      potential: { id: "Tinggi", en: "High", zh: "高" },
      reason: { id: "Komunitas muslim dan kebutuhan produk internasional meningkat.", en: "Muslim community demand and international food demand are rising.", zh: "穆斯林社群需求及国际食品需求正在增长。" },
      buyer: { id: "Restaurant, supermarket, online retailer", en: "Restaurants, supermarkets, online retailers", zh: "餐厅、超市、线上零售商" },
      barrier: { id: "Label halal dan standar keamanan pangan", en: "Halal labeling and food safety standards", zh: "清真标签与食品安全标准" },
    },
    {
      product: { id: "Kerajinan Kayu Indonesia", en: "Indonesian Wood Crafts", zh: "印尼木制工艺品" },
      potential: { id: "Sedang-Tinggi", en: "Medium-High", zh: "中高" },
      reason: { id: "Produk handmade memiliki nilai artistik.", en: "Handmade products carry artistic value.", zh: "手工产品具有艺术价值。" },
      buyer: { id: "Interior designer, hotel, retail", en: "Interior designers, hotels, retail stores", zh: "室内设计师、酒店、零售店" },
      barrier: { id: "Persaingan produk China", en: "Competition from Chinese products", zh: "来自中国产品的竞争" },
    },
    {
      product: { id: "Produk Rempah Indonesia", en: "Indonesian Spice Products", zh: "印尼香料产品" },
      potential: { id: "Tinggi", en: "High", zh: "高" },
      reason: { id: "Indonesia memiliki keunggulan sumber bahan baku.", en: "Indonesia has strong raw material advantages.", zh: "印尼在原料来源方面具有优势。" },
      buyer: { id: "Food manufacturer", en: "Food manufacturers", zh: "食品制造商" },
      barrier: { id: "Food safety requirement", en: "Food safety requirements", zh: "食品安全要求" },
    },
  ],
  risks: [
    { risk: { id: "Persaingan China", en: "Competition from China", zh: "来自中国的竞争" }, solution: { id: "Bangun diferensiasi produk Indonesia", en: "Build clear Indonesian product differentiation", zh: "建立印尼产品差异化" } },
    { risk: { id: "Kualitas tidak konsisten", en: "Inconsistent quality", zh: "质量不稳定" }, solution: { id: "Gunakan quality control", en: "Apply quality control and batch standards", zh: "采用质量控制和批次标准" } },
    { risk: { id: "Pembayaran", en: "Payment risk", zh: "付款风险" }, solution: { id: "Gunakan LC atau pembayaran bertahap", en: "Use LC or staged payment terms", zh: "使用信用证或分阶段付款" } },
    { risk: { id: "Logistik", en: "Logistics", zh: "物流" }, solution: { id: "Gunakan forwarder berpengalaman", en: "Work with experienced freight forwarders", zh: "选择有经验的货运代理" } },
  ],
  sources: [
    { label: "KJRI Hong Kong", url: "https://www.kemlu.go.id/hongkong" },
    { label: "Hong Kong Customs and Excise Department", url: "https://www.customs.gov.hk/" },
    { label: "Centre for Food Safety / FEHD", url: "https://www.cfs.gov.hk/" },
    { label: "BPS", url: "https://www.bps.go.id/" },
    { label: "UN Comtrade", url: "https://comtradeplus.un.org/" },
    { label: "ITC Trade Map", url: "https://www.trademap.org/" },
  ],
};

export const marketCountries: MarketCountry[] = [
  {
    slug: hongKongMarket.slug,
    country: hongKongMarket.country,
    region: {
      id: "Asia Timur",
      en: "East Asia",
      zh: "\u4e1c\u4e9a",
    },
    status: {
      id: "Laporan tersedia",
      en: "Report available",
      zh: "\u62a5\u544a\u5df2\u53d1\u5e03",
    },
    opportunity: {
      id: "Tinggi",
      en: "High",
      zh: "\u9ad8",
    },
    summary: {
      id: "Free port economy, hub logistik Asia, dan pasar impor yang menarik untuk kopi, rempah, produk halal, kelapa, serta produk natural beauty Indonesia.",
      en: "A free port economy, Asian logistics hub, and import-driven market for Indonesian coffee, spices, halal products, coconut derivatives, and natural beauty products.",
      zh: "\u9999\u6e2f\u662f\u81ea\u7531\u6e2f\u7ecf\u6d4e\u4f53\u548c\u4e9a\u6d32\u7269\u6d41\u67a2\u7ebd\uff0c\u9002\u5408\u5370\u5c3c\u5496\u5561\u3001\u9999\u6599\u3001\u6e05\u771f\u98df\u54c1\u3001\u690d\u7269\u57fa\u7f8e\u5bb9\u4ea7\u54c1\u548c\u6930\u5b50\u884d\u751f\u54c1\u3002",
    },
    products: {
      id: ["Kopi", "Rempah", "Halal food", "Kelapa", "Natural beauty"],
      en: ["Coffee", "Spices", "Halal food", "Coconut", "Natural beauty"],
      zh: ["\u5496\u5561", "\u9999\u6599", "\u6e05\u771f\u98df\u54c1", "\u6930\u5b50", "\u5929\u7136\u7f8e\u5bb9"],
    },
    updatedAt: "2026-07-15",
    href: "/market-intelligence/hong-kong",
  },
];

export function marketText<T>(value: Localized<T>, locale: Locale): T {
  return value[locale] ?? value.id ?? value.en;
}
