import type { Locale } from "@/data/apps";

export type ResourceCategory = "legal" | "statistics" | "market" | "support";

export type TradeResource = {
  id: string;
  name: string;
  url: string;
  category: ResourceCategory;
  agency: string;
  region: "Indonesia" | "Internasional";
  description: Record<Locale, string>;
  action: Record<Locale, string>;
};

export const tradeResources: TradeResource[] = [
  {
    id: "oss", name: "OSS Indonesia", url: "https://oss.go.id/id",
    category: "legal", agency: "Pemerintah Indonesia", region: "Indonesia",
    description: { id: "Identitas dan perizinan berusaha, termasuk NIB dan kewajiban sesuai tingkat risiko.", en: "Business registration, NIB and risk-based licensing.", zh: "企业注册、NIB 商业识别号及风险分类许可。" },
    action: { id: "Saat menyiapkan legalitas usaha", en: "When preparing business registration", zh: "准备企业注册时" },
  },
  {
    id: "insw", name: "INSW / Indonesia National Trade Repository",
    url: "https://www.insw.go.id/intr", category: "legal", agency: "LNSW", region: "Indonesia",
    description: { id: "Menelusuri klasifikasi HS, informasi peraturan, ketentuan dan referensi perdagangan.", en: "Explore HS classifications, regulations and trade requirements.", zh: "查询 HS 编码、贸易规定及相关要求。" },
    action: { id: "Saat memeriksa HS dan ketentuan", en: "When checking HS and requirements", zh: "核查 HS 编码及规定时" },
  },
  {
    id: "beacukai", name: "Direktorat Jenderal Bea dan Cukai",
    url: "https://www.beacukai.go.id/", category: "legal", agency: "DJBC", region: "Indonesia",
    description: { id: "Panduan tata laksana ekspor-impor, pelayanan kepabeanan, dan informasi fasilitas.", en: "Export-import customs procedures, services and facilities.", zh: "进出口海关流程、服务与便利政策。" },
    action: { id: "Saat menyiapkan proses kepabeanan", en: "When preparing customs procedures", zh: "准备报关流程时" },
  },
  {
    id: "exim", name: "EXIM Kementerian Perdagangan",
    url: "https://exim.kemendag.go.id/", category: "legal", agency: "Kementerian Perdagangan", region: "Indonesia",
    description: { id: "Pintu masuk informasi mekanisme ekspor-impor, persyaratan, dan layanan terkait.", en: "Gateway to Indonesian export-import mechanisms and related services.", zh: "印尼进出口流程和相关服务信息入口。" },
    action: { id: "Saat memahami alur ekspor-impor", en: "When learning trade procedures", zh: "了解进出口流程时" },
  },
  {
    id: "eska", name: "e-SKA / Certificate of Origin",
    url: "https://e-ska.kemendag.go.id/", category: "legal", agency: "Kementerian Perdagangan", region: "Indonesia",
    description: { id: "Informasi dan layanan pengajuan Surat Keterangan Asal apabila diperlukan untuk transaksi.", en: "Certificate of Origin information and applications when applicable.", zh: "适用时办理原产地证书的信息及申请服务。" },
    action: { id: "Saat memeriksa dokumen asal barang", en: "When preparing origin documents", zh: "准备原产地证明时" },
  },
  {
    id: "karantina", name: "Badan Karantina Indonesia",
    url: "https://karantinaindonesia.go.id/", category: "legal", agency: "Badan Karantina Indonesia", region: "Indonesia",
    description: { id: "Persyaratan dan layanan karantina untuk komoditas hewan, ikan, tumbuhan, serta produk terkait.", en: "Quarantine information for animals, fish, plants and related goods.", zh: "动植物、水产品及相关商品检疫信息。" },
    action: { id: "Saat produk memerlukan pemeriksaan karantina", en: "When a product needs quarantine checks", zh: "商品需要检疫时" },
  },
  {
    id: "bps", name: "BPS Data Ekspor Impor",
    url: "https://www.bps.go.id/id/exim", category: "statistics", agency: "Badan Pusat Statistik", region: "Indonesia",
    description: { id: "Data perdagangan Indonesia menurut produk, negara, periode, pelabuhan, nilai, dan berat.", en: "Indonesian trade statistics by product, partner, period, port, value and weight.", zh: "按商品、伙伴国、时期、港口、金额和重量查询印尼贸易统计。" },
    action: { id: "Saat mengukur arus ekspor Indonesia", en: "When analysing Indonesia's trade flows", zh: "分析印尼贸易流量时" },
  },
  {
    id: "trademap", name: "ITC Trade Map",
    url: "https://www.trademap.org/", category: "statistics", agency: "International Trade Centre", region: "Internasional",
    description: { id: "Membandingkan tren impor-ekspor, mitra dagang, dan posisi kompetitif suatu produk.", en: "Compare export-import trends, trade partners and product competitiveness.", zh: "比较贸易趋势、伙伴国及商品竞争状况。" },
    action: { id: "Saat memilih pasar berdasarkan perdagangan", en: "When screening target markets", zh: "筛选目标市场时" },
  },
  {
    id: "uncomtrade", name: "UN Comtrade",
    url: "https://comtradeplus.un.org/", category: "statistics", agency: "United Nations Statistics Division", region: "Internasional",
    description: { id: "Statistik perdagangan global menurut negara pelapor, mitra, produk dan periode.", en: "Global trade statistics by reporter, partner, product and period.", zh: "按报告国、伙伴国、商品及时期查询全球贸易数据。" },
    action: { id: "Saat memvalidasi tren perdagangan global", en: "When cross-checking global trade trends", zh: "交叉核查全球贸易趋势时" },
  },
  {
    id: "wto-stats", name: "WTO Stats",
    url: "https://stats.wto.org/", category: "statistics", agency: "World Trade Organization", region: "Internasional",
    description: { id: "Indikator perdagangan barang dan jasa serta seri statistik terkait WTO.", en: "Indicators and time series for trade in goods and services.", zh: "世界贸易组织货物与服务贸易统计指标。" },
    action: { id: "Saat mempelajari indikator lintas negara", en: "When comparing country indicators", zh: "比较各国贸易指标时" },
  },
  {
    id: "aseanstats", name: "ASEANstats Data Portal",
    url: "https://data.aseanstats.org/trade-quarterly", category: "statistics", agency: "ASEAN Secretariat", region: "Internasional",
    description: { id: "Data perdagangan barang untuk meneliti perkembangan pasar di ASEAN.", en: "Merchandise trade data to study ASEAN markets.", zh: "用于研究东盟市场的货物贸易统计。" },
    action: { id: "Saat membandingkan pasar ASEAN", en: "When comparing ASEAN markets", zh: "比较东盟市场时" },
  },
  {
    id: "wits", name: "World Integrated Trade Solution",
    url: "https://wits.worldbank.org/", category: "statistics", agency: "World Bank / partners", region: "Internasional",
    description: { id: "Data perdagangan, tarif, dan hambatan non-tarif dengan profil negara dan analisis khusus.", en: "Trade, tariff and non-tariff measure data with country profiles.", zh: "贸易、关税及非关税措施数据和国家概况。" },
    action: { id: "Saat membandingkan perdagangan dan tarif", en: "When comparing trade and tariffs", zh: "比较贸易和关税时" },
  },
  {
    id: "exportpotential", name: "ITC Export Potential Map",
    url: "https://exportpotential.intracen.org/en/", category: "market", agency: "International Trade Centre", region: "Internasional",
    description: { id: "Estimasi potensi ekspor menurut produk dan pasar. Hasil adalah model, bukan permintaan buyer terkonfirmasi.", en: "Model-based export potential estimates, not confirmed buyer demand.", zh: "基于模型的出口潜力估计，并非已确认的买家需求。" },
    action: { id: "Saat menyaring peluang pasar", en: "When exploring export opportunities", zh: "寻找潜在出口市场时" },
  },
  {
    id: "macmap", name: "ITC Market Access Map",
    url: "https://www.macmap.org/", category: "market", agency: "International Trade Centre", region: "Internasional",
    description: { id: "Referensi tarif bea masuk, preferensi, tindakan perdagangan, dan persyaratan akses pasar.", en: "Reference for tariffs, preferences, trade measures and access conditions.", zh: "查询关税、优惠待遇、贸易措施及市场准入要求。" },
    action: { id: "Saat memeriksa tarif negara tujuan", en: "When checking destination-market tariffs", zh: "核查目的国关税时" },
  },
  {
    id: "wto-tariffs", name: "WTO Tariff & Trade Data",
    url: "https://www.wto.org/english/tratop_e/tariffs_e/tariff_data_e.htm", category: "market", agency: "World Trade Organization", region: "Internasional",
    description: { id: "Sumber data tarif terikat dan tarif yang diterapkan menurut data pelaporan anggota WTO.", en: "Bound and applied tariff data reported through WTO sources.", zh: "世界贸易组织成员报告的约束税率和适用税率数据。" },
    action: { id: "Saat membandingkan struktur tarif", en: "When comparing tariff schedules", zh: "比较关税税则时" },
  },
  {
    id: "eu-access", name: "EU Access2Markets",
    url: "https://trade.ec.europa.eu/access-to-markets/en/home", category: "market", agency: "European Commission", region: "Internasional",
    description: { id: "Persyaratan, dokumen, aturan asal barang, dan kondisi akses ke pasar Uni Eropa.", en: "Requirements, documents, origin rules and conditions for EU trade.", zh: "进入欧盟市场的要求、文件及原产地规则。" },
    action: { id: "Saat meneliti ekspor ke Uni Eropa", en: "When researching the EU market", zh: "研究欧盟市场时" },
  },
  {
    id: "inaexport", name: "INAexport",
    url: "https://inaexport.id/", category: "support", agency: "Ditjen PEN, Kementerian Perdagangan", region: "Indonesia",
    description: { id: "Promosi produk Indonesia, profil eksportir, informasi pasar dan jalur menghubungi calon mitra.", en: "Indonesian exporter promotion, product listings and potential-buyer contacts.", zh: "印尼出口商展示、产品推广及潜在买家联系。" },
    action: { id: "Saat menyiapkan promosi B2B", en: "When preparing B2B promotion", zh: "准备 B2B 推广时" },
  },
  {
    id: "ditjenpen", name: "Ditjen Pengembangan Ekspor Nasional",
    url: "https://ditjenpen.kemendag.go.id/faq", category: "support", agency: "Kementerian Perdagangan", region: "Indonesia",
    description: { id: "Panduan awal ekspor, layanan fasilitasi, dan pertanyaan umum bagi eksportir.", en: "Export guidance, support services and common questions.", zh: "出口指导、扶持服务及常见问题。" },
    action: { id: "Saat memulai atau mencari bantuan ekspor", en: "When starting exports or seeking support", zh: "出口起步或寻求支持时" },
  },
  {
    id: "ppejp", name: "PPEJP Pelatihan Ekspor",
    url: "https://ppejp.kemendag.go.id/site/pelatihan-ekspor", category: "support", agency: "Kementerian Perdagangan", region: "Indonesia",
    description: { id: "Referensi pelatihan mengenai prosedur, riset pasar, dokumen, negosiasi, dan harga ekspor.", en: "Export training in procedures, research, documents, negotiation and pricing.", zh: "出口流程、市场研究、单证、谈判及定价培训。" },
    action: { id: "Saat meningkatkan keterampilan ekspor", en: "When building export skills", zh: "提升出口技能时" },
  },
  {
    id: "gth", name: "Global Trade Helpdesk",
    url: "https://globaltradehelpdesk.org/", category: "support", agency: "International Trade Centre / partners", region: "Internasional",
    description: { id: "Pintu masuk terpadu untuk mengeksplorasi informasi akses pasar dan perdagangan global.", en: "One entry point to explore global market-access and trade information.", zh: "综合查询全球市场准入和贸易信息的入口。" },
    action: { id: "Saat mengumpulkan referensi awal", en: "When gathering initial market references", zh: "收集初步市场资料时" },
  },
];
