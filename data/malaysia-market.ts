import type { Localized } from "@/data/apps";

const t = (id: string, en: string, zh: string): Localized<string> => ({ id, en, zh });

export const malaysiaMarket = {
  slug: "malaysia",
  country: t("Malaysia", "Malaysia", "马来西亚"),
  updatedAt: "2026-10-17",
  title: t("Riset Pasar Malaysia: Panduan Ekspor UMKM", "Malaysia Market Research: An Export Guide for Indonesian MSMEs", "马来西亚市场研究：印尼中小企业出口指南"),
  description: t(
    "Pelajari peluang ekspor ke Malaysia, produk potensial, persyaratan masuk, calon mitra, logistik, dan langkah persiapan untuk UMKM Indonesia.",
    "Explore Malaysian market opportunities, product fit, entry requirements, potential partners, logistics, and preparation for Indonesian MSMEs.",
    "了解马来西亚市场机会、潜力产品、准入要求、潜在合作伙伴、物流与印尼中小企业出口准备。",
  ),
  summary: t(
    "Pasar regional untuk kopi hijau, lada, sambal, bumbu, dan camilan. Mulai dari satu produk, satu segmen, dan satu wilayah melalui importir yang sesuai.",
    "A regional market for green coffee, pepper, sauces, seasonings, and snacks. Start with one product, one segment, and one region through a suitable importer.",
    "面向生咖啡豆、胡椒、辣椒酱、调味料和零食的区域市场。通过合适进口商，从一个产品、一个细分市场和一个地区开始。",
  ),
  intro: t(
    "Malaysia layak diteliti oleh usaha yang mampu menjaga mutu, menghitung harga sampai tujuan, dan memasok secara berulang. Kedekatan geografis membantu penjajakan, sementara kecocokan produk tetap perlu diuji bersama importir atau distributor setempat.",
    "Malaysia merits research by businesses with consistent quality, a clear landed-cost model, and repeat supply capacity. Geographic proximity supports exploration; product fit still needs testing with a local importer or distributor.",
    "具备稳定质量、到岸成本核算及持续供货能力的企业可研究马来西亚市场。地理邻近有助于开拓，但仍需与当地进口商或经销商验证产品匹配度。",
  ),
  scope: t(
    "Disarikan dari riset Malaysia bertanggal 17 Oktober 2026. Tahun data berbeda dicantumkan per indikator. Kelayakan produk, tarif, izin, harga logistik, dan minat pembelian belum dipastikan per SKU.",
    "Adapted from the Malaysia research dated 17 October 2026. Each indicator states its data year. Product viability, tariffs, permits, freight quotes, and buying interest remain unconfirmed for individual SKUs.",
    "根据2026年10月17日的马来西亚研究整理，各指标单列数据年份。尚未逐一确认具体产品的可行性、关税、许可、运费报价及采购意向。",
  ),
  metrics: [
    { value: "USD 549.00m", label: t("Impor kopi hijau Malaysia · 2025", "Malaysia green coffee imports · 2025", "马来西亚生咖啡豆进口 · 2025"), source: "coffee" },
    { value: "USD 128.93m", label: t("Kopi hijau dari Indonesia · 2025", "Green coffee from Indonesia · 2025", "来自印尼的生咖啡豆 · 2025"), source: "coffee" },
    { value: "USD 17.37m", label: t("Impor lada utuh Malaysia · 2024", "Malaysia whole pepper imports · 2024", "马来西亚整粒胡椒进口 · 2024"), source: "pepper" },
    { value: "USD 5.85m", label: t("Lada utuh dari Indonesia · 2024", "Whole pepper from Indonesia · 2024", "来自印尼的整粒胡椒 · 2024"), source: "pepper" },
  ],
  dataNote: t(
    "Reporter: Malaysia; arus: impor; mitra: dunia atau Indonesia; HS 090111 / 090411. Nilai WITS/UN Comtrade dalam ribu USD dikonversi ke juta USD dan dibulatkan. Data 2024 dan 2025 bukan seri pertumbuhan yang sebanding. HS statistik historis hanya titik awal klasifikasi.",
    "Reporter: Malaysia; flow: imports; partner: world or Indonesia; HS 090111 / 090411. WITS/UN Comtrade values in thousand USD are converted to million USD and rounded. The 2024 and 2025 figures are not a comparable growth series. Historical statistical HS codes are classification starting points.",
    "报告方：马来西亚；流向：进口；伙伴：全球或印尼；HS 090111 / 090411。WITS/UN Comtrade以千美元计，已换算为百万美元并四舍五入。2024与2025数据不可直接用于计算增长率。历史统计HS代码仅供分类初步参考。",
  ),
  products: [
    {
      name: t("Kopi hijau", "Green coffee", "生咖啡豆"), hs: "090111", source: "coffee",
      evidence: t("Bukti impor 2025; Vietnam dan Brasil juga pemasok besar.", "Import evidence for 2025; Vietnam and Brazil are also major suppliers.", "有2025年进口数据；越南和巴西也是主要供应方。"),
      buyer: t("Importir bahan baku dan roaster", "Raw-material importers and roasters", "原料进口商与烘焙商"),
      action: t("Tawarkan asal, proses, kadar air, cacat, profil sensori, dan lot yang konsisten. Periksa karantina serta MOQ.", "Specify origin, process, moisture, defects, sensory profile, and consistent lots. Check quarantine and minimum order size.", "明确产地、工艺、水分、瑕疵、风味及批次稳定性；核查检疫和最低订购量。"),
    },
    {
      name: t("Kopi sangrai / giling", "Roasted / ground coffee", "烘焙咖啡 / 咖啡粉"), hs: "090121", source: "gba",
      evidence: t("Tahap validasi segmen. Besarnya impor kopi hijau tidak mengukur pasar kopi sangrai.", "Segment validation needed. Green coffee import values do not measure the roasted coffee market.", "需验证细分市场。生咖啡豆进口额不能代表烘焙咖啡市场。"),
      buyer: t("Kafe, toko khusus, importir lokal", "Cafes, specialty stores, local importers", "咖啡馆、专卖店、当地进口商"),
      action: t("Uji satu profil rasa, ukuran kemasan, kesegaran, masa simpan, dan pesanan ulang. Kopi campuran/instan dapat berbeda HS.", "Test a flavour profile, pack size, freshness, shelf life, and repeat orders. Blended or instant coffee may have different HS codes.", "测试一种风味、包装规格、新鲜度、保质期及复购；混合或速溶咖啡可能适用不同HS代码。"),
    },
    {
      name: t("Lada utuh kering", "Dried whole pepper", "干燥整粒胡椒"), hs: "090411", source: "pepper",
      evidence: t("Bukti impor 2024 dari Indonesia; bersaing dengan pemasok impor dan rantai pasok domestik.", "2024 import evidence from Indonesia; competition includes imported and domestic supply.", "有2024年来自印尼的进口数据；需面对进口及本地供应链竞争。"),
      buyer: t("Importir rempah, pengemas ulang, pemasok horeca", "Spice importers, repackers, hospitality suppliers", "香料进口商、分装商、酒店餐饮供应商"),
      action: t("Pastikan grade, kebersihan, kadar air, ketertelusuran, pengujian relevan, dan fitosanitari sesuai ketentuan.", "Confirm grade, cleanliness, moisture, traceability, relevant tests, and applicable phytosanitary requirements.", "确认等级、洁净度、水分、溯源、相关检测及适用植物检疫要求。"),
    },
    {
      name: t("Sambal dan bumbu siap pakai", "Sauces and ready-to-use seasonings", "辣椒酱与即用调味料"), hs: "210390", source: "sauces",
      evidence: t("Ekspor Indonesia ke Malaysia pada kelompok ini sekitar USD15,81 juta pada 2025; bukan ukuran pasar sambal saja.", "Indonesian exports to Malaysia in this group were about USD15.81m in 2025; this is broader than sambal alone.", "2025年印尼该类别对马来西亚出口约1,581万美元；该类别不限于辣椒酱。"),
      buyer: t("Distributor pangan, toko Asia, restoran", "Food distributors, Asian stores, restaurants", "食品经销商、亚洲食品店、餐厅"),
      action: t("Uji rasa, stabilitas, alergen, bahan hewani, label, klaim halal, dan margin kemasan ritel atau horeca.", "Test taste, stability, allergens, animal ingredients, labels, halal claims, and retail or hospitality margins.", "测试口味、稳定性、过敏原、动物成分、标签、清真声明及零售或餐饮渠道利润。"),
    },
    {
      name: t("Camilan kering", "Dry snacks", "干制零食"), hs: "190590", source: "snacks",
      evidence: t("Kelompok 190590: impor Malaysia USD115,90 juta pada 2024, termasuk USD18,92 juta dari Indonesia. Tidak mencakup seluruh camilan.", "HS 190590: Malaysia imported USD115.90m in 2024, including USD18.92m from Indonesia. This does not cover all snacks.", "HS 190590：2024年马来西亚进口1.159亿美元，其中来自印尼1,892万美元；不涵盖所有零食。"),
      buyer: t("Grosir, toko komunitas, ritel khusus", "Wholesalers, community stores, specialty retailers", "批发商、社群商店、专门零售商"),
      action: t("Periksa bahan/proses untuk HS, ketahanan kemasan, ketengikan, alergen, biaya volume, dan sisa masa simpan saat tiba.", "Check ingredients and processing for HS, packaging strength, rancidity, allergens, volume costs, and remaining shelf life on arrival.", "按原料和工艺核定HS，并核查包装强度、酸败、过敏原、体积成本及抵达后的剩余保质期。"),
    },
  ],
  regions: [
    { title: t("Kuala Lumpur & Selangor", "Kuala Lumpur & Selangor", "吉隆坡与雪兰莪"), body: t("Titik penjajakan distributor, toko khusus, kafe, dan restoran. Pilih segmen serta cakupan distribusi bersama mitra.", "Explore distributors, specialty stores, cafes, and restaurants. Agree on a segment and distribution coverage with a partner.", "可考察经销商、专卖店、咖啡馆与餐厅；与合作伙伴确定细分市场和配送范围。") },
    { title: t("Johor & Pulau Pinang", "Johor & Penang", "柔佛与槟城"), body: t("Telusuri mitra regional dan kebutuhan konsumen setempat. Bandingkan alamat gudang dan biaya pengantaran lokal.", "Research regional partners and local consumer needs. Compare warehouse locations and local delivery costs.", "研究区域合作伙伴与当地消费者需求，比较仓库位置及本地配送成本。") },
    { title: t("Sabah & Sarawak", "Sabah & Sarawak", "沙巴与砂拉越"), body: t("Hitung jalur logistik dan periksa izin secara terpisah. Otoritas beberapa komoditas berbeda dari Semenanjung Malaysia.", "Cost logistics routes and check permits separately. Authorities for some commodities differ from Peninsular Malaysia.", "单独核算物流线路并核查许可；部分商品的主管机构与马来半岛不同。") },
  ],
  requirements: [
    { title: t("HS, tarif, dan pajak", "HS, tariffs, and taxes", "HS、关税与税费"), body: t("Siapkan komposisi, proses, bentuk, dan fungsi produk untuk pencarian JKDM HS Explorer. Periksa bea masuk, SST, eksais bila relevan, serta izin menurut kode nasional Malaysia dan wilayah tujuan. Tarif per SKU belum ditetapkan di laporan ini.", "Prepare composition, process, form, and use for JKDM HS Explorer. Check import duty, sales tax, relevant excise, and permits against the Malaysian national code and destination region. This report does not establish SKU-level rates.", "准备成分、工艺、形态与用途，通过JKDM HS Explorer查询。按马来西亚本国代码及目的地区核查关税、销售税、相关消费税和许可。本报告未确定具体产品税率。"), sources: ["hs", "sst"] },
    { title: t("ATIGA dan bukti asal", "ATIGA and proof of origin", "ATIGA与原产地证明"), body: t("Preferensi berlaku jika ketentuan asal dan dokumennya terpenuhi. Periksa aturan produk serta bukti asal seperti e-Form D bersama importir. Pengiriman dari Indonesia saja tidak menjamin preferensi, dan preferensi bea masuk tidak otomatis membebaskan SST.", "Preferences depend on qualifying origin and documentation. Check product-specific rules and proof such as e-Form D with the importer. Shipment from Indonesia alone does not establish eligibility; preferential duty does not automatically exempt sales tax.", "优惠取决于原产资格及证明文件。与进口商核查产品特定规则及e-Form D等证明。仅从印尼发货不代表符合资格，优惠关税也不自动免除销售税。"), sources: ["origin", "atiga"] },
    { title: t("Pangan dan label", "Food and labelling", "食品与标签"), body: t("Importir/ejen perlu mengikuti prosedur KKM melalui FoSIM. Tinjau bahan, alergen, label, masa simpan, dokumen tambahan, dan kemungkinan pemeriksaan. Selesaikan rancangan label bersama importir sebelum produksi komersial.", "Importers or agents should follow KKM procedures through FoSIM. Review ingredients, allergens, labels, shelf life, extra documentation, and possible inspections. Agree on the final label with the importer before commercial production.", "进口商或代理应按KKM程序通过FoSIM办理。审查成分、过敏原、标签、保质期、附加文件及可能的检查；商业生产前与进口商确认标签。"), sources: ["food", "label"] },
    { title: t("Halal, karantina, dan wilayah", "Halal, quarantine, and destination", "清真、检疫与目的地"), body: t("Periksa klaim halal dan pengakuan lembaga sertifikasi melalui JAKIM. Daging memiliki persyaratan tambahan. Izin/karantina mengikuti bahan, tingkat olahan, dan wilayah; jangan menganggap semua pangan memiliki kewajiban yang sama.", "Check halal claims and recognition of certification bodies with JAKIM. Meat has additional requirements. Permits and quarantine depend on ingredients, processing, and region; food categories do not share identical obligations.", "通过JAKIM核查清真声明与认证机构认可情况。肉类有额外要求。许可和检疫取决于原料、加工程度及地区，不同食品要求并不相同。"), sources: ["halal", "maqis", "restrictions"] },
  ],
  partners: [
    { name: "Pok Brothers", url: "https://www.pokbrothers.com/pages/about-us", channel: t("Importir/distributor pangan dan kanal horeca", "Food import/distribution and hospitality channels", "食品进口、分销与酒店餐饮渠道") },
    { name: "GBA Corporation", url: "https://www.gbaglobal.com/", channel: t("Distribusi FMCG dan produk konsumen", "FMCG and consumer product distribution", "快消品与消费品分销") },
    { name: "Classic Fine Foods Malaysia", url: "https://www.classicfinefoods.com.my/", channel: t("Pangan premium dan horeca", "Premium food and hospitality", "高端食品与酒店餐饮") },
  ],
  partnerNote: t("Nama perusahaan merupakan titik awal penelusuran dari informasi bisnis publik, bukan buyer terkonfirmasi atau bukti kebutuhan pembelian aktif. Periksa identitas melalui SSM, petugas pembelian, cakupan wilayah, kecocokan produk, dan syarat pembayaran sebelum transaksi.", "Company names are research starting points based on public business information, not confirmed buyers or evidence of active demand. Check identity through SSM, purchasing contacts, regional coverage, product fit, and payment terms before transacting.", "公司名称仅为基于公开信息的研究起点，并非已确认买家或活跃采购需求证明。交易前通过SSM核查身份，并确认采购联系人、区域范围、产品匹配及付款条件。"),
  logistics: t("Minta quotation dengan kota asal, alamat tujuan, jumlah karton, berat, dimensi, suhu penyimpanan, dan tanggal siap. Bandingkan udara untuk sampel serta LCL/FCL untuk barang kering menurut volume. Hitung biaya origin, freight, asuransi, biaya tujuan, bea/pajak, pemeriksaan, dan pengantaran lokal. Cantumkan titik serah serta Incoterms yang disepakati; belum ada tarif freight atau waktu transit terkonfirmasi.", "Request quotes with origin city, destination address, cartons, weight, dimensions, storage temperature, and readiness date. Compare air for samples and LCL/FCL for dry goods by volume. Include origin charges, freight, insurance, destination charges, duties/taxes, inspections, and delivery. State the agreed delivery point and Incoterms; no freight rate or transit time is confirmed here.", "询价应列明起运城市、目的地址、箱数、重量、尺寸、储存温度及备货日期。样品可比较空运，干货按体积比较拼箱与整箱。计入起运、运费、保险、目的地、税费、检查及配送成本。明确交货点与约定的Incoterms；此处未确认运价或运输时效。"),
  risks: [
    { title: t("Persaingan & margin", "Competition & margin", "竞争与利润"), body: t("Bandingkan spesifikasi setara dan hitung mundur dari harga ritel setelah margin distributor/ritel. Listing ritel bukan bukti produk baru akan diterima.", "Compare equivalent specifications and work back from retail prices after distributor/retailer margins. A retail listing does not prove demand for a new product.", "比较同等规格，并扣除分销及零售利润后倒算价格。零售上架不能证明新产品有需求。") },
    { title: t("Mutu & masa simpan", "Quality & shelf life", "质量与保质期"), body: t("Tetapkan standar batch, ketertelusuran, kemasan, dan sisa masa simpan saat tiba; sediakan ruang waktu untuk pemeriksaan.", "Set batch standards, traceability, packaging, and remaining shelf life on arrival; allow time for inspections.", "明确批次标准、溯源、包装及抵达剩余保质期，并预留检查时间。") },
    { title: t("Pembayaran & mitra", "Payment & partners", "付款与合作伙伴"), body: t("Periksa badan hukum dan rekening penerima, sepakati kriteria penerimaan sampel serta pembayaran, lalu mulai dengan pesanan uji yang terukur.", "Verify the legal entity and beneficiary account, agree sample acceptance and payment terms, then start with a measured trial order.", "核查法人及收款账户，约定样品验收与付款条件，再以可控试单开始。") },
  ],
  roadmap: [
    { title: t("Pilih produk dan wilayah", "Choose a product and region", "选择产品与地区"), body: t("Lengkapi spesifikasi, komposisi, kapasitas, MOQ, waktu produksi, dan dokumen usaha.", "Complete specifications, composition, capacity, MOQ, lead time, and business documents.", "备齐规格、成分、产能、最低订购量、交期与企业文件。") },
    { title: t("Periksa akses pasar", "Check market access", "核查市场准入"), body: t("Cocokkan HS, tarif, bukti asal, izin, label, dan klaim bersama importir sebelum menentukan harga final.", "Confirm HS, tariffs, origin evidence, permits, labels, and claims with the importer before final pricing.", "最终定价前与进口商确认HS、税率、原产证明、许可、标签及声明。") },
    { title: t("Telusuri mitra dan biaya", "Research partners and costs", "研究伙伴与成本"), body: t("Periksa mitra, siapkan katalog singkat, minta quotation logistik, dan hitung harga sampai gudang.", "Check partners, prepare a concise catalogue, request freight quotes, and calculate warehouse-delivered cost.", "核查合作伙伴，准备简明目录，获取物流报价并计算送达仓库成本。") },
    { title: t("Uji sampel dan evaluasi", "Test samples and evaluate", "样品测试与评估"), body: t("Sepakati tujuan uji, kirim sampel secara patuh, catat umpan balik, lalu putuskan pesanan uji atau perbaikan.", "Agree test objectives, ship compliant samples, record feedback, then decide on a trial order or improvements.", "约定测试目标，合规寄样，记录反馈，再决定试单或改进。") },
  ],
  faq: [
    { q: t("Apakah semua produk Indonesia bebas bea?", "Are all Indonesian products duty-free?", "所有印尼产品都免关税吗？"), a: t("Tidak. Periksa HS Malaysia, tarif yang berlaku, aturan asal produk, dan bukti asal yang sesuai. SST diperiksa terpisah.", "No. Check the Malaysian HS code, applicable rate, product origin rules, and appropriate proof of origin. Check sales tax separately.", "不是。需核查马来西亚HS代码、适用税率、产品原产规则及相应证明；销售税另行核查。") },
    { q: t("Apakah semua pangan wajib bersertifikat halal?", "Does every food require halal certification?", "所有食品都必须取得清真认证吗？"), a: t("Persyaratan bergantung pada produk dan penggunaan klaim. Periksa JAKIM, pengakuan lembaga sertifikasi, serta persyaratan tambahan untuk daging dan kanal penjualan.", "Requirements depend on the product and claims used. Check JAKIM, recognition of certification bodies, and additional meat and sales-channel requirements.", "要求取决于产品及所用声明。需核查JAKIM、认证机构认可情况，以及肉类和销售渠道的附加要求。") },
    { q: t("Apakah Sabah/Sarawak sama dengan Semenanjung?", "Are Sabah and Sarawak the same as the Peninsula?", "沙巴及砂拉越与马来半岛相同吗？"), a: t("Periksa secara terpisah. Jalur logistik dan otoritas izin beberapa komoditas berbeda; alamat serta negara bagian tujuan harus jelas sejak awal.", "Check separately. Logistics and permit authorities differ for some commodities; establish the destination address and state from the start.", "应分别核查。部分商品的物流及许可主管机构不同；一开始就需明确目的地址及州属。") },
    { q: t("Apakah daftar mitra berarti mereka sedang membeli?", "Does the partner list mean they are buying?", "列出的合作伙伴正在采购吗？"), a: t("Belum. Profil publik hanya membantu penelusuran awal. Kebutuhan, kontak pembelian, legalitas, dan kecocokan produk harus dikonfirmasi.", "Not confirmed. Public profiles only support initial research. Demand, buying contacts, legal identity, and product fit need confirmation.", "尚未确认。公开资料仅供初步研究，需确认需求、采购联系人、法律身份及产品匹配度。") },
  ],
  sources: [
    { id: "coffee", label: "WITS / UN Comtrade · Malaysia imports HS 090111 · 2025", url: "https://wits.worldbank.org/trade/comtrade/en/country/MYS/year/2025/tradeflow/Imports/partner/ALL/product/090111" },
    { id: "pepper", label: "WITS / UN Comtrade · Malaysia imports HS 090411 · 2024", url: "https://wits.worldbank.org/trade/comtrade/en/country/MYS/year/2024/tradeflow/Imports/partner/ALL/product/090411" },
    { id: "sauces", label: "WITS / UN Comtrade · Indonesia exports HS 210390 · 2025", url: "https://wits.worldbank.org/trade/comtrade/en/country/IDN/year/2025/tradeflow/Exports/partner/ALL/product/210390" },
    { id: "snacks", label: "WITS / UN Comtrade · Malaysia imports HS 190590 · 2024", url: "https://wits.worldbank.org/trade/comtrade/en/country/MYS/year/2024/tradeflow/Imports/partner/ALL/product/190590" },
    { id: "hs", label: "JKDM · HS Explorer", url: "https://ezhs.customs.gov.my/" },
    { id: "sst", label: "MySST · SST Orders", url: "https://mysst.customs.gov.my/sst-orders/" },
    { id: "origin", label: "JKDM · FAQ Rules of Origin", url: "https://www.customs.gov.my/en/business/facilitation/rules-of-origin-roo/faq-rules-of-origin" },
    { id: "atiga", label: "ASEAN · ATIGA", url: "https://asean.org/asean-trade-in-goods-agreement-atiga/" },
    { id: "food", label: "KKM · Prosedur Pengimportan Makanan", url: "https://hq.moh.gov.my/fsq/prosedur-pengimportan-makanan" },
    { id: "label", label: "KKM · Garis Panduan Pelabelan Makanan", url: "https://hq.moh.gov.my/fsq/garis-panduan-pelabelan-makanan" },
    { id: "halal", label: "JAKIM · Halal Malaysia", url: "https://www.halal.gov.my/?data=bW9kdWxlcy9jb2xsYXBzaWJsZV9jb250ZW50Ozs7Ow%3D%3D&utama=CB_LIST" },
    { id: "maqis", label: "MAQIS · Soalan Lazim", url: "https://www.maqis.gov.my/index.php/soalan-lazim/" },
    { id: "restrictions", label: "JKDM · Prohibition of Imports", url: "https://ezhs.customs.gov.my/public-prob-import" },
    { id: "gba", label: "GBA Corporation · Official website", url: "https://www.gbaglobal.com/" },
    { id: "ssm", label: "SSM · Company Information", url: "https://ssm.com.my/Pages/Product/Company-Information.aspx" },
  ],
};
