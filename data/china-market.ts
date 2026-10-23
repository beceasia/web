import type { Localized } from "@/data/apps";

const t = (id: string, en: string, zh: string): Localized<string> => ({ id, en, zh });

export const chinaMarket = {
  slug: "china",
  country: t("China", "China", "中国"),
  updatedAt: "2026-10-23",
  title: t("Riset Pasar China untuk Eksportir Indonesia", "China Market Research for Indonesian Exporters", "印尼出口商中国市场研究"),
  description: t("Kenali peluang produk, persyaratan masuk, calon mitra, logistik, dan komponen biaya sebelum menawarkan barang ke China.", "Explore product opportunities, entry requirements, potential partners, logistics and costs before offering Indonesian goods in China.", "在向中国报价前，了解产品机会、准入要求、潜在伙伴、物流及成本。"),
  summary: t("Mulai dari satu produk, satu segmen, dan satu mitra impor yang jelas. Besarnya pasar belum membuktikan bahwa produk Anda akan diterima.", "Start with one product, one segment and an identified import partner. Market size alone does not establish demand for your product.", "从一个产品、一个细分市场及明确的进口伙伴开始。市场规模并不能证明您的产品会被接受。"),
  intro: t("Laporan tingkat negara untuk UMKM, calon eksportir, dan pendamping usaha. Cakupan China daratan. Hong Kong dan Makau memiliki ketentuan impor tersendiri. Produk, HS final, asal pengiriman, kapasitas, serta transaksi pengguna belum ditentukan.", "A country-level brief for MSMEs, new exporters and business advisers, covering mainland China. Hong Kong and Macao have separate import arrangements. The user's product, final HS, origin, capacity and transaction have not been specified.", "面向中小企业、出口新手及辅导人员的国家级简报，范围为中国内地。香港及澳门另有进口安排。尚未确定具体产品、最终HS、发货地、产能及交易。"),
  metrics: [
    { value: t("1.404,89 juta", "1,404.89 million", "14.0489亿"), label: t("Populasi akhir 2025, China daratan menurut definisi NBS", "End-2025 mainland population under the NBS definition", "按国家统计局口径的2025年末内地人口"), source: "population" },
    { value: t("CNY 43.377", "CNY 43,377", "人民币43,377元"), label: t("Pendapatan disposabel rata-rata per orang, 2025 per tahun", "Average annual disposable income per person, 2025", "2025年全国居民人均年可支配收入"), source: "income" },
    { value: t("USD 2,06 miliar", "USD 2.06 billion", "20.6亿美元"), label: t("Impor kopi dan olahannya, 2025 penuh, cakupan asosiasi", "Coffee and preparations imports, full-year 2025, association scope", "2025年咖啡及制品进口额，商会统计口径"), source: "coffee2025" },
    { value: t("−5,9%", "−5.9%", "−5.9%"), label: t("Nilai impor kopi dan olahannya Jan–Agu 2026, dibanding periode sama 2025", "Coffee and preparations import value, Jan–Aug 2026 versus Jan–Aug 2025", "2026年1–8月咖啡及制品进口额同比变化"), source: "coffee2026" },
  ],
  trade: [
    { year: "2023", exports: 65036.7, imports: 63386.6 },
    { year: "2024", exports: 62739.6, imports: 73853.1 },
    { year: "2025", exports: 66964.3, imports: 87537.3 },
  ],
  tradeNote: t("BPS, pelapor Indonesia, tahun penuh, juta USD. Ekspor FOB, impor CIF, termasuk migas dan nonmigas. Seri ekspor 2021–2025 berstatus revisi. Total dan saldo dihitung dari dua kolom. Jangan menyamakannya dengan data impor versi China karena dasar nilai, waktu pencatatan, asal/pengiriman, dan perdagangan pihak ketiga dapat berbeda.", "BPS, Indonesia reporting, full years, USD million, including oil and non-oil trade. Exports are FOB and imports CIF. Export data for 2021–2025 are revised. Total and balance are calculated from the two columns. Chinese import figures may differ due to valuation, timing, origin/consignment and third-country trade.", "印尼统计局、印尼报告口径、全年、百万美元，包含油气和非油气。出口为FOB，进口为CIF；2021–2025年出口数据为修订值。总额与差额由两列计算。中国进口数据可能因计价、时间、原产/发运地及第三方贸易而不同。"),
  products: [
    { name: t("Kopi mentah dan sangrai", "Green and roasted coffee", "生咖啡豆与烘焙咖啡"), hs: "0901.11 / 0901.21",
      evidence: t("Impor kopi dan olahannya 2025: USD 2,06 miliar, 271.700 ton. Nilai naik 57,0% dan volume naik 16,2%. Jan–Agu 2026: USD 1,30 miliar, turun 5,9%, volume turun 8,3%. Agregat ini tidak identik dengan HS 0901.", "2025 coffee and preparations imports: USD 2.06bn and 271,700 tonnes, up 57.0% in value and 16.2% in volume. Jan–Aug 2026: USD 1.30bn, value down 5.9%, volume down 8.3%. This aggregate is not identical to HS 0901.", "2025年咖啡及制品进口20.6亿美元、27.17万吨，金额增长57.0%、数量增长16.2%。2026年1–8月进口13亿美元，金额下降5.9%、数量下降8.3%。该汇总口径不等同于HS 0901。"),
      action: t("Uji ke roaster atau importir dengan spesifikasi lot, proses, cupping, kadar air, dan cacat. Bandingkan Brasil, Ethiopia, Vietnam, Kolombia serta kopi Yunnan. Mentah dan sangrai dapat mengikuti jalur registrasi berbeda.", "Approach roasters/importers with lot, process, cupping, moisture and defect specifications. Compare Brazil, Ethiopia, Vietnam, Colombia and Yunnan coffee. Green and roasted coffee may follow different registration routes.", "向烘焙商或进口商提供批次、工艺、杯测、水分及瑕疵规格。比较巴西、埃塞俄比亚、越南、哥伦比亚和云南咖啡。生豆与烘焙咖啡可能适用不同注册路径。"), sources: ["coffee2025", "coffee2026", "registration"] },
    { name: t("Lada dan rempah", "Pepper and spices", "胡椒及香料"), hs: "0904.11 / 0904.12",
      evidence: t("Kemendag mencatat impor kelompok HS 0904 tahun 2024 sebesar USD 554 juta. Kelompok ini juga memuat Capsicum/Pimenta. Angkanya tidak mewakili lada putih atau hitam saja.", "Kemendag reports USD 554m of 2024 imports under HS 0904. This heading also includes Capsicum/Pimenta and is not a market-size measure for white or black pepper alone.", "印尼贸易部列示2024年HS 0904进口额5.54亿美元。该税目也含辣椒属/多香果属产品，不能视为白胡椒或黑胡椒单独的市场规模。"),
      action: t("Telusuri pengolah bumbu dan distributor bahan pangan. Tetapkan genus, utuh/bubuk, kemurnian, residu dan mikrobiologi. Produk ritel berbahan Hainan juga menjadi pembanding. Pangsa pesaing khusus Piper belum ditetapkan.", "Target seasoning processors and ingredient distributors. Specify genus, whole/ground form, purity, residues and microbiology. Hainan-origin retail products are also benchmarks. Piper-specific supplier shares remain unverified.", "研究调味品加工商及原料经销商，明确属种、整粒/粉状、纯度、残留及微生物指标。海南原料零售产品也是参照。尚未核实胡椒属产品的供应国份额。"), sources: ["spices", "pepperprices"] },
    { name: t("Produk kelapa olahan", "Processed coconut products", "椰子加工产品"), hs: "2009.89 / 1513.19",
      evidence: t("Ada jejak perdagangan produk kelapa dan harga referensi air kelapa di ritel. Produk bermerek asal Thailand muncul pada pembanding. Ini belum membuktikan buyer membutuhkan pemasok baru.", "Trade signals and coconut-water retail references exist. Thai-origin brands appear in the benchmarks. This does not establish new supplier demand.", "存在椰子产品贸易线索及椰子水零售参考，比较中可见泰国产品牌，但这并不证明买方正在寻找新供应商。"),
      action: t("Pilih satu bentuk: air kelapa, santan, atau minyak. Periksa kandungan, gula tambahan, proses, Brix bila relevan, umur simpan, dan bobot pengiriman. HS di atas hanya kandidat untuk jus tertentu dan minyak nonmentah, bukan semua produk kelapa.", "Select one form: water, milk or oil. Check ingredients, added sugar, process, Brix where relevant, shelf life and shipping weight. The HS references only suggest certain juices and non-crude oils, not all coconut products.", "先选择椰子水、椰浆或椰子油中的一种，核实成分、添加糖、工艺、适用时的糖度、保质期和运输重量。所列HS仅为部分果汁及非初榨油的候选，不覆盖全部椰制品。"), sources: ["trade-signal", "coconutprices"] },
    { name: t("Rumput laut kering", "Dried seaweed", "干海藻"), hs: "1212.21 / 1212.29",
      evidence: t("Laporan Kemendag Mei 2026 menyebut BLG mencari tambahan pemasok rumput laut Indonesia. Kebutuhan tersebut perlu dikonfirmasi ulang, bukan dianggap aktif hari ini.", "A May 2026 Kemendag report says BLG sought additional Indonesian seaweed suppliers. Reconfirm that dated need rather than treating it as current.", "印尼贸易部2026年5月报告提及BLG希望增加印尼海藻供应商。应重新确认该日期的需求，不可视为当前有效采购。"),
      action: t("Sasar pengolah hidrokoloid. Tetapkan spesies, penggunaan, kadar air, kotoran dan rendemen. Bedakan rumput laut konsumsi, nonpangan dan ekstrak. Volume industri dapat memerlukan agregator.", "Target hydrocolloid processors. Specify species, intended use, moisture, impurities and yield. Distinguish edible seaweed, non-food uses and extracts. Industrial quantities may require an aggregator.", "面向亲水胶体加工商，明确种类、用途、水分、杂质及出胶率。区分食用、非食用海藻及提取物。工业规模可能需要集货商。"), sources: ["trade-signal", "blg"] },
    { name: t("Kakao bubuk dan bahan bakery", "Cocoa powder and bakery ingredients", "可可粉及烘焙原料"), hs: "1805.00",
      evidence: t("Portofolio SINODIS mencakup kakao dan cokelat. Ini bukti keberadaan kanal, belum bukti permintaan pemasok baru.", "SINODIS lists cocoa and chocolate in its portfolio, establishing a channel but not new supplier demand.", "SINODIS产品组合包含可可和巧克力，说明渠道存在，但不证明正在招募新供应商。"),
      action: t("Uji distributor bahan pastry atau pengolah. Tetapkan kadar lemak, natural/alkalized, pH, warna dan gula. Kandidat HS 1805.00 hanya untuk bubuk kakao tanpa tambahan gula.", "Test pastry distributors/processors. Specify fat content, natural/alkalised treatment, pH, colour and sugar. HS 1805.00 is only a candidate for cocoa powder without added sugar.", "测试西点原料经销商或加工商，明确脂肪含量、天然/碱化、pH、颜色及糖。HS 1805.00仅为无添加糖可可粉的候选。"), sources: ["sinodis"] },
    { name: t("Camilan kering", "Dry snacks", "干制零食"), hs: "—",
      evidence: t("Hipotesis uji, belum ada bukti pembelian khusus untuk camilan pengguna.", "A test hypothesis; no product-specific purchase evidence has been established.", "属于待测试假设，尚无针对用户具体零食的采购证据。"),
      action: t("Mulai satu rasa dan ukuran melalui distributor khusus. Komposisi, proses serta kandungan ikan/cumi/udang menentukan persyaratan. Jangan menentukan HS dari nama kerupuk atau getas.", "Test one flavour and pack size through specialist distributors. Composition, process and fish/squid/shrimp content affect requirements. Do not classify solely from a snack's trade name.", "通过专业经销商先测一种口味和规格。配方、工艺及鱼/鱿鱼/虾含量影响要求，不可仅凭商品名确定HS。"), sources: ["foodlaw"] },
    { name: t("Kriya serat alami", "Natural-fibre crafts", "天然纤维工艺品"), hs: "4602",
      evidence: t("Hipotesis segmen butik dan dekorasi. Permintaan serta harga produk setara belum diverifikasi.", "A boutique/home-decor hypothesis. Demand and like-for-like pricing remain unverified.", "属于精品店及家居装饰细分市场假设，尚未核实需求及同等产品价格。"),
      action: t("Uji bahan, finishing, kekuatan, hama dan volume kemasan. Kontak pangan atau penggunaan anak memerlukan pemeriksaan tersendiri. CCC hanya untuk barang dalam katalog, bukan seluruh kriya.", "Check materials, finish, strength, pests and packing volume. Food-contact or children's uses need separate checks. CCC applies to catalogued goods, not every craft item.", "检查材料、表面处理、强度、虫害及包装体积。食品接触或儿童用途须另行核查。CCC适用于目录内产品，并非所有工艺品。"), sources: ["ccc"] },
    { name: t("Arang tempurung dan briket", "Coconut-shell charcoal and briquettes", "椰壳炭及炭块"), hs: "4402",
      evidence: t("Ada sinyal business matching arang kelapa, belum kebutuhan aktif buyer tertentu.", "Coconut-charcoal business-matching signals exist, without a confirmed current buyer requirement.", "存在椰壳炭商贸对接线索，但尚无特定买方当前需求确认。"),
      action: t("Gunakan carrier yang menerima DG. Pemberitahuan Hapag-Lloyd menyatakan charcoal wajib dideklarasikan UN 1361, Class 4.2 sejak 2026. Konfirmasi booking, uji, packing dan biaya khusus sebelum menawarkan.", "Use a carrier accepting dangerous goods. Hapag-Lloyd states that charcoal must be declared as UN 1361, Class 4.2 from 2026. Confirm booking, testing, packing and special charges before quoting.", "使用接受危险品的承运人。赫伯罗特通知称自2026年起木炭须按UN 1361、4.2类申报。报价前确认订舱、检测、包装及特别费用。"), sources: ["trade-signal", "charcoal"] },
  ],
  regions: [
    { title: t("Shanghai dan Delta Yangtze", "Shanghai and the Yangtze Delta", "上海及长三角"), body: t("Titik uji kopi, kakao dan bahan industri berdasarkan jejak Volcafe, SINODIS, dan BLG. Minta lokasi gudang serta cakupan distribusi aktual.", "Test coffee, cocoa and industrial ingredients using the public footprint of Volcafe, SINODIS and BLG. Ask for actual warehouse locations and distribution coverage.", "根据Volcafe、SINODIS及BLG的公开业务足迹测试咖啡、可可及工业原料，询问实际仓库及配送范围。") },
    { title: t("Guangzhou–Shenzhen", "Guangzhou–Shenzhen", "广州—深圳"), body: t("Hipotesis kanal distributor pangan dan horeca. SINODIS memiliki kantor setempat. Uji rasa, ukuran kemasan, MOQ dan biaya gudang sebelum memperluas pasar.", "A food-distribution/foodservice hypothesis, with local SINODIS offices. Test taste, pack size, MOQ and warehouse costs before expanding.", "可测试食品经销及餐饮渠道，SINODIS在当地设有办公室。扩展前测试口味、包装、最低订量及仓储成本。") },
    { title: t("Kunming–Pu’er", "Kunming–Pu’er", "昆明—普洱"), body: t("Titik penelusuran perdagangan kopi melalui jejak Sucafina. Produk Indonesia perlu menjelaskan keunggulan lot terhadap kopi lokal dan impor lain. Ini usulan uji wilayah, bukan peringkat permintaan kota.", "A coffee-trade lead based on Sucafina's footprint. Indonesian lots need a clear distinction from local and imported alternatives. These are test locations, not city-demand rankings.", "根据Sucafina业务足迹研究咖啡贸易，印尼批次需说明相对本地及其他进口咖啡的优势。此为地区测试建议，并非城市需求排名。") },
  ],
  requirements: [
    { title: t("Akses produk lebih dulu", "Confirm product access first", "先核查产品准入"), body: t("Periksa asal, produk, protokol, penggunaan dan fasilitas yang diizinkan. Registrasi perusahaan tidak otomatis memberi izin untuk semua barang. Minta importir mengonfirmasi dokumen sebelum sampel maupun shipment.", "Check origin, product, protocols, use and approved establishments. Registration is not blanket product approval. Have the importer confirm documents before samples or commercial shipments.", "核实原产地、产品、议定书、用途及获准企业。企业注册不等于所有产品均获准，寄样及商业发运前由进口商确认单证。"), sources: ["registration", "agriculture"] },
    { title: t("Registrasi pangan dan pertanian", "Food and agricultural registration", "食品与农产品注册"), body: t("Decree 280 dan Announcement 27/2026 berlaku sejak 1 Juni 2026. Kopi mentah dan biji kakao yang dikeluarkan dari kategori pangan lama mengikuti pemeriksaan Announcement 219/2025. Jangan menyimpulkan bebas registrasi. CIFER resmi melayani jalur pangan, sedangkan daftar karantina pertanian perlu diperiksa terpisah.", "Decree 280 and Announcement 27/2026 apply from 1 June 2026. Green coffee and cocoa beans removed from the former food category require checks under Announcement 219/2025; they are not simply registration-exempt. Check CIFER food registration and agricultural quarantine lists separately.", "第280号令及2026年第27号公告自2026年6月1日起施行。移出旧食品类别的未烘焙咖啡豆与可可豆须按2025年第219号公告核查，不能视为免注册。食品CIFER及农产品检疫名单应分别查询。"), sources: ["registration", "agriculture", "cifer"] },
    { title: t("Label Mandarin dan standar", "Chinese labels and standards", "中文标签与标准"), body: t("Pangan impor kemasan memerlukan label Mandarin sesuai Food Safety Law. Periksa bahan tambahan, residu, cemaran, mikroba dan nutrisi menurut produk. GB 7718-2025 mulai wajib 16 Maret 2027. Bedakan aturan saat ini dengan masa transisi sebelum mencetak kemasan.", "Imported prepackaged food requires Chinese labelling under the Food Safety Law. Check product-specific additives, residues, contaminants, microbiology and nutrition. GB 7718-2025 becomes mandatory on 16 March 2027. Check current and transitional rules before printing.", "进口预包装食品依《食品安全法》须有中文标签。按产品核查添加剂、残留、污染物、微生物及营养要求。GB 7718-2025自2027年3月16日起强制实施，印包材前区分现行与过渡规定。"), sources: ["foodlaw", "label", "labeldate"] },
    { title: t("HS, tarif dan asal barang", "HS, duties and origin", "HS、关税及原产地"), body: t("HS pada produk di halaman ini hanya titik awal, bukan kode nasional China/CIQ final. Tarif MFN, ACFTA/RCEP, VAT dan pajak konsumsi belum ditetapkan per SKU. Preferensi memerlukan aturan asal serta bukti yang cocok dengan skema. Minta hasil query bertanggal dari importir atau broker.", "Product HS references here are starting points, not final Chinese national/CIQ codes. MFN, ACFTA/RCEP, VAT and consumption tax are not determined per SKU. Preferences require compliant origin and matching proof. Obtain a dated importer/broker tariff check.", "本页HS仅为初步参考，并非中国最终税号/CIQ。尚未按SKU确定最惠国、ACFTA/RCEP、增值税及消费税。优惠需符合原产规则并提交相应凭证，请取得进口商或代理的日期明确查询结果。"), sources: ["tariff", "rcep", "origin"] },
    { title: t("VAT dan dasar impor", "VAT and the import tax base", "增值税及进口计税基础"), body: t("VAT Law berlaku 1 Januari 2026. Tarif umum impor barang 13%, kategori tertentu 9%. Rincian sepuluh digit dapat memengaruhi tarif. Dasar VAT impor = nilai pabean + bea masuk + pajak konsumsi. Jangan menganggap seluruh pangan dikenai tarif yang sama.", "The VAT Law applies from 1 January 2026. General goods imports attract 13%, with specified categories at 9%; ten-digit details can matter. Import VAT base = customs value + duty + consumption tax. Do not assume one rate for all food.", "增值税法自2026年1月1日起施行。一般进口货物税率13%，规定类别9%，十位商品编码可能影响税率。进口增值税基础为关税计税价格加关税和消费税，食品并非一律同税率。"), sources: ["vat", "vatdetail"] },
    { title: t("Hukum, syarat buyer, rekomendasi", "Law, buyer conditions and advice", "法规、买方要求及建议"), body: t("Izin, standar dan label wajib perlu dibedakan dari permintaan buyer seperti audit atau sertifikasi tambahan. Tidak ada dasar dalam riset ini untuk menyatakan semua impor China wajib halal. Periksa produk, wilayah, klaim dan kebutuhan segmen. Katalog bilingual membantu komunikasi tetapi tidak menggantikan izin.", "Distinguish mandatory permits, standards and labels from buyer audits or extra certificates. This research establishes no blanket halal requirement for all Chinese imports. Check product, region, claims and segment. Bilingual catalogues aid communication but do not replace approvals.", "应区分法定许可、标准和标签与买方额外审核或认证。本研究未证明中国所有进口均须清真认证，应核查产品、地区、宣称及细分市场。双语目录有助沟通但不能替代许可。"), sources: ["foodlaw", "ccc"] },
  ],
  partners: [
    { name: "Volcafe / ED&F Man (Shanghai) Co., Ltd.", location: "Shanghai", contact: "+86 21 5218 0330", url: "https://www.volcafe.com/network/china-destination", body: t("Importir dan distributor green coffee. Kegiatan dan kontak publik ditemukan, kebutuhan pembelian baru belum dikonfirmasi. Tanyakan spesifikasi, MOQ dan apakah pengadaan melalui tim origin Indonesia.", "Green-coffee importer/distributor. Public operations and contact found; new purchasing needs unconfirmed. Ask about specifications, MOQ and Indonesian origin-team procurement.", "生咖啡豆进口及经销商，公开业务和联系方式已找到，尚未确认新采购需求。询问规格、最低订量及是否由印尼产地团队采购。") },
    { name: "Sucafina (Yunnan) Co. Ltd.", location: "Kunming / Pu’er / Shanghai", contact: "+86 871 6538 8830", url: "https://group.sucafina.com/network/sucafina-yunnan-co-ltd1", body: t("Pedagang green coffee, termasuk impor melalui jaringan grup. Belum ada kebutuhan lot tertentu. Konfirmasi apakah pengadaan ditangani tim China atau tim origin.", "Green-coffee merchant importing through its group network. No specific lot requirement established. Confirm whether procurement belongs to the China or origin team.", "生咖啡豆贸易商，通过集团网络进口。尚未确认具体批次需求，须核实由中国还是产地团队采购。") },
    { name: "SINODIS", location: "Shanghai", contact: "marketing.category@sinodis.com.cn · +86 21 6072 8700", url: "https://www.sinodis.com/market/contact.html", body: t("Distributor bahan bakery/pastry, kakao dan cokelat. Portofolio serta kontak kategori ditemukan, onboarding pemasok belum dikonfirmasi. Ajukan satu SKU dengan spesifikasi dan posisi harga jelas.", "Bakery/pastry, cocoa and chocolate distributor. Portfolio/category contacts found; supplier onboarding unconfirmed. Propose one clearly specified and positioned SKU.", "烘焙、西点、可可和巧克力经销商，已找到产品组合及品类联系渠道，尚未确认供应商准入。建议提供一个规格及价格定位明确的SKU。") },
    { name: "Shanghai Brilliant Gum / BLG", location: "Shanghai", contact: "sales@sh-blg.com · +86 21 3329 2000", url: "https://en.sh-blg.com/Contact.html", body: t("Pengolah hidrokoloid. Kemendag melaporkan minat tambahan pemasok rumput laut pada Mei 2026. Konfirmasi ulang kebutuhan, spesies, volume dan unit penerima di Indonesia atau China.", "Hydrocolloid processor. Kemendag reported interest in additional seaweed suppliers in May 2026. Reconfirm demand, species, volume and the receiving entity in Indonesia or China.", "亲水胶体加工商。印尼贸易部2026年5月曾报告其希望增加海藻供应商。须重新确认需求、种类、数量及由印尼还是中国主体收货。") },
    { name: "Café del Volcán", location: "Xuhui, Shanghai", contact: "contact@cafevolcan.com", url: "https://cafevolcan.com/", body: t("Roaster dan kafe specialty, calon mitra uji sampel. Belum terbukti sebagai importir langsung dan belum ada kebutuhan pembelian baru. Tanyakan minat cupping serta importir yang digunakan.", "Specialty roaster/café, a possible sample-testing partner. Direct-import status and new purchase needs are unconfirmed. Ask about cupping interest and its importer.", "精品咖啡烘焙商及咖啡馆，可作为寄样测试线索。尚未证实直接进口资格或新采购需求，询问杯测意向及所用进口商。") },
  ],
  partnerNote: t("Calon mitra untuk ditelusuri, bukan buyer terverifikasi transaksi. Belum dihubungi. Periksa nama hukum Mandarin, Unified Social Credit Code, izin, peran impor, alamat dan rekening melalui sumber independen. Cocokkan pihak dalam kontrak dan konfirmasi perubahan rekening melalui kanal resmi terpisah.", "Research leads, not transaction-verified buyers. None has been contacted. Independently check Chinese legal name, Unified Social Credit Code, licences, importing role, address and bank account. Match the contracting entity and verify bank changes through a separate official channel.", "这些为待研究线索，并非交易核实买家，均未联系。独立核查中文法定名称、统一社会信用代码、许可、进口角色、地址及账户。合同主体应一致，账户变更须通过另一个官方渠道确认。"),
  logistics: t("Minta opsi laut melalui gateway seperti Tanjung Priok/Tanjung Perak atau konsolidasi asal yang sesuai. Dari Bangka Belitung, rute langsung belum terverifikasi. Pilih tujuan menurut gudang dan kemampuan clearance importir, bukan hanya harga port-to-port. Udara dapat diuji untuk sampel atau barang bernilai tinggi setelah carrier menerima produk serta dokumennya. Tidak ada tarif angkutan aktual atau waktu tempuh yang dijanjikan di halaman ini.", "Request ocean options via gateways such as Tanjung Priok/Tanjung Perak or suitable origin consolidation. Direct Bangka Belitung routes are unverified. Choose destinations by importer warehousing and clearance, not port-to-port rates alone. Air may suit samples/high-value goods once product/document acceptance is confirmed. No actual freight rate or transit time is promised here.", "可询价经Tanjung Priok/Tanjung Perak等枢纽或适合的始发集货路线。尚未核实邦加勿里洞直达航线。目的地应按进口商仓库与清关能力选择，不应仅看港到港价。样品或高价值货物可在确认承运及单证后评估空运。本页不承诺实际运价或时效。"),
  quotation: t("Isi produk/komposisi, HS sementara, status pangan/karantina/DG, registrasi fasilitas dan importir, karton, berat bersih/kotor, dimensi, total m³, suhu, alamat dan tanggal siap. Minta origin charges, freight, asuransi, destination charges, clearance, pajak serta delivery terpisah. Cantumkan Incoterms 2020 dan titik serah, minimum charge, free time, masa berlaku dan pengecualian biaya. Tandai biaya yang sudah termasuk agar tidak dihitung dua kali.", "Provide product/composition, provisional HS, food/quarantine/DG status, registrations, cartons, net/gross weight, dimensions, total m³, temperature, addresses and ready date. Separate origin charges, freight, insurance, destination charges, clearance, taxes and delivery. Specify Incoterms 2020 and the named point, minimum charges, free time, validity and exclusions. Identify included items to avoid double counting.", "提供产品/配方、暂定HS、食品/检疫/危险品状态、注册、箱数、净/毛重、尺寸、总立方米、温度、地址及备货日。分列起运费、运费、保险、目的地费、清关、税及配送。注明Incoterms 2020及指定地点、最低收费、免费期、有效期及除外项，避免重复计费。"),
  prices: [
    { name: t("Frontstreet PWN Golden Mandheling", "Frontstreet PWN Golden Mandheling", "Frontstreet PWN黄金曼特宁"), pack: "227 g", price: 98, unit: "43.17 / 100 g", source: "coffeeprice" },
    { name: t("McCormick / 味好美 · lada putih", "McCormick / 味好美 · white pepper", "味好美 · 白胡椒"), pack: "30 g", price: 15.9, unit: "53.00 / 100 g", source: "pepperprices" },
    { name: t("Chuanzhen / 川珍 · lada putih", "Chuanzhen / 川珍 · white pepper", "川珍 · 白胡椒"), pack: "150 g", price: 29.9, unit: "19.93 / 100 g", source: "pepperprices" },
    { name: t("McCormick / 味好美 · lada hitam", "McCormick / 味好美 · black pepper", "味好美 · 黑胡椒"), pack: "30 g", price: 14.9, unit: "49.67 / 100 g", source: "blackpepperprices" },
    { name: t("if · air kelapa", "if · coconut water", "if · 椰子水"), pack: "1 L × 4", price: 49.89, unit: "12.47 / L", source: "coconutprices" },
    { name: t("LIGHT UPPER / 轻上 · air kelapa", "LIGHT UPPER / 轻上 · coconut water", "轻上 · 椰子水"), pack: "245 ml × 10", price: 39.88, unit: "16.28 / L", source: "coconutprices" },
    { name: t("SANLIN / 三麟 · air kelapa NFC", "SANLIN / 三麟 · NFC coconut water", "三麟 · NFC椰子水"), pack: "330 ml × 12", price: 59.9, unit: "15.13 / L", source: "coconutprices" },
  ],
  priceNote: t("Diamati 23 Oktober 2026, CNY. Harga referensi penjual/platform, bukan harga checkout, konfirmasi stok, atau penerimaan eksportir. Frontstreet mengarahkan transaksi ke Taobao; harga lainnya dari panduan JD, dengan halaman SKU belum menampilkan detail saat diperiksa. Normalisasi = harga ÷ berat × 100, atau harga ÷ total liter. Tidak dikonversi ke rupiah.", "Observed 23 October 2026, CNY. Seller/platform reference prices, not checkout, stock confirmations or exporter receipts. Frontstreet directs purchases to Taobao; other prices are from JD guides, whose SKU details were unavailable when checked. Normalisation = price ÷ grams × 100, or price ÷ litres. No rupiah conversion.", "观察日期2026年10月23日，人民币。均为卖方/平台参考价，并非结算价格、库存确认或出口商收入。Frontstreet引导至淘宝购买，其余来自京东指南，核查时SKU页未显示详情。标准化为价格÷克数×100或价格÷总升数，不换算印尼盾。"),
  costNote: t("Simulasi hipotetis 1.000 kemasan × 250 g, non-DG, semua CNY. Harga FCA titik konsolidasi Indonesia sudah mencakup biaya penjual sampai titik serah dan clearance ekspor. Tarif 0%/8% dan VAT 13% hanya asumsi, bukan penetapan untuk produk tertentu. Tanpa pajak konsumsi.", "Hypothetical 1,000 × 250 g packs, non-DG, all in CNY. FCA Indonesian consolidation-point price includes seller costs to handover and export clearance. Duties of 0%/8% and VAT of 13% are assumptions, not product-specific determinations. No consumption tax assumed.", "假设1000件×250克、非危险品、币种人民币。印尼集货点FCA价格含卖方至交货点的成本及出口清关。0%/8%关税及13%增值税仅为假设，并非具体产品税率，假设无消费税。"),
  costRows: [
    { label: t("Harga FCA", "FCA price", "FCA价格"), a: 20000, b: 20000 },
    { label: t("Angkutan setelah FCA sampai titik masuk, sebelum bongkar", "Post-FCA transport to entry point before unloading", "FCA后至输入地卸货前运输"), a: 3000, b: 3000 },
    { label: t("Asuransi", "Insurance", "保险"), a: 100, b: 100 },
    { label: t("Nilai pabean ilustrasi", "Illustrative customs value", "假设关税计税价格"), a: 23100, b: 23100 },
    { label: t("Bea masuk contoh 0% / 8%", "Assumed duty 0% / 8%", "假设关税0% / 8%"), a: 0, b: 1848 },
    { label: t("VAT contoh 13% × (nilai pabean + bea)", "Assumed VAT 13% × (value + duty)", "假设增值税13% ×（计税价格+关税）"), a: 3003, b: 3243.24 },
    { label: t("Handling, broker, delivery setelah masuk", "Post-entry handling, brokerage, delivery", "进口后操作、代理及配送"), a: 2500, b: 2500 },
    { label: t("Total kas sampai gudang", "Total cash to warehouse", "至仓库现金总需求"), a: 28603, b: 30691.24 },
    { label: t("Kas per kemasan, pembulatan", "Cash per pack, rounded", "每件现金，已四舍五入"), a: 28.6, b: 30.69 },
  ],
  costLimit: t("Jika VAT impor boleh dikreditkan penuh oleh importir yang memenuhi syarat, biaya contoh setelah kredit menjadi CNY 25.600 atau 27.448. Kas impor tetap dibutuhkan. Belum termasuk pengujian, registrasi, desain label, bank/kurs, penyimpanan tambahan, retur, pembiayaan, margin distributor, promosi dan pajak tahap berikutnya. Ganti asumsi dengan quotation nyata. Total kas importir bukan penerimaan eksportir.", "If an eligible importer can fully credit import VAT, illustrative cost after credit is CNY 25,600 or 27,448. Import cash is still required. Testing, registration, label design, bank/FX, extra storage, returns, financing, distributor margin, promotion and later-stage taxes are excluded. Replace assumptions with quotes. Importer cash is not exporter revenue.", "如符合条件的进口商可全额抵扣进口增值税，示例抵扣后成本为人民币25,600或27,448，进口时仍须备足现金。不含检测、注册、标签设计、银行/汇率、额外仓储、退货、融资、经销利润、推广及后续税。应以实际报价替换假设，进口商现金需求不等于出口商收入。"),
  roadmap: [
    { days: "1–30", title: t("Pilih dan periksa", "Select and check", "选择与核查"), body: t("Pilih satu produk dan segmen. Lengkapi spesifikasi, status akses/registrasi, draft label dan lima calon mitra. Target hasil: tiga quotation setara serta daftar ketidakpastian yang jelas.", "Choose one product/segment. Complete specifications, access/registration checks, draft label and five partner leads. Target output: three comparable quotes and a clear uncertainty log.", "选择一个产品及细分市场，完成规格、准入/注册核查、标签草稿及五个伙伴线索。目标为三份可比报价及明确的待核实事项表。") },
    { days: "31–60", title: t("Uji penawaran dan sampel", "Test offers and samples", "测试报价与样品"), body: t("Verifikasi identitas mitra, siapkan penawaran satu halaman, lalu kirim sampel hanya melalui jalur yang sah. Target kerja: dua tanggapan substantif atau catatan hambatan. Ini target, bukan capaian.", "Verify partner identity, prepare a one-page offer, then send compliant samples. Working target: two substantive responses or a documented barrier assessment. These are targets, not achievements.", "核实伙伴身份，准备一页报价，再按合规路径寄样。工作目标为两份实质回复或障碍记录，此为目标而非已取得成果。") },
    { days: "61–90", title: t("Putuskan lanjut atau tunda", "Decide whether to proceed", "决定推进或暂缓"), body: t("Perbarui biaya, mutu dan syarat pembayaran. Siapkan PO/kontrak serta shipment uji bila semua syarat selesai. Indikator: keputusan tertulis beserta bukti, bukan kewajiban mengirim sebelum hari ke-90.", "Update costs, quality and payment terms. Prepare a PO/contract and pilot shipment only after all conditions are met. Completion means a documented decision, not a forced shipment by day 90.", "更新成本、质量及付款条件，全部条件满足后才准备订单/合同及试运。完成指标为有证据的书面决定，而非必须90天内发运。") },
  ],
  faq: [
    { q: t("Apakah semua produk bisa masuk China?", "Can every product enter China?", "所有产品都能进入中国吗？"), a: t("Periksa per produk. Bahan, proses, asal, penggunaan dan fasilitas menentukan persyaratannya.", "Check each product. Materials, process, origin, use and establishments determine requirements.", "须逐产品核查，材料、工艺、原产地、用途及企业决定相关要求。") },
    { q: t("Apakah tarif ASEAN selalu nol?", "Are ASEAN duties always zero?", "东盟产品关税总是零吗？"), a: t("Tidak dapat diasumsikan. Periksa kode, skema dan tahun. Ketentuan asal serta bukti asal harus sesuai sebelum memakai preferensi.", "Do not assume so. Check code, scheme and year. Origin criteria and proof must comply before claiming a preference.", "不可直接假设，应核查税号、协定及年份，申领优惠前须符合原产规则并有合规凭证。") },
    { q: t("Apakah kopi mentah dan sangrai memakai prosedur sama?", "Do green and roasted coffee use the same route?", "生豆与烘焙咖啡程序相同吗？"), a: t("Jalurnya dapat berbeda. Periksa registrasi pertanian 219/2025 dan registrasi pangan sesuai kategori, beserta dokumen shipment.", "Routes can differ. Check agricultural registration under 219/2025 and category-specific food registration, plus shipment documents.", "可能不同，应核查219/2025农产品注册及按类别适用的食品注册和发运单证。") },
    { q: t("Apakah daftar mitra menjamin pembelian?", "Do these partner leads guarantee purchases?", "这些伙伴线索保证采购吗？"), a: t("Belum. Periksa entitas, izin, peran impor, kebutuhan, pembayaran dan kontrak. Minat bertanggal harus dikonfirmasi ulang.", "No. Verify entity, licences, import role, need, payment and contract. Dated interest needs reconfirmation.", "不保证。须核实主体、许可、进口角色、需求、付款及合同，历史意向须重新确认。") },
    { q: t("Bisakah langsung menjual lewat marketplace?", "Can I sell directly through a marketplace?", "能直接通过电商销售吗？"), a: t("Periksa skema impor, kelayakan produk, operator toko, pemasaran dan biaya. Skema lintas batas tidak otomatis sama dengan impor umum.", "Check import model, product eligibility, store operation, marketing and costs. Cross-border models are not automatically equivalent to general imports.", "须核查进口模式、产品资格、店铺运营、推广及成本，跨境模式并不自动等同于一般贸易进口。") },
    { q: t("Data apa yang perlu disiapkan?", "What information should I prepare?", "应准备哪些资料？"), a: t("Komposisi, proses, spesifikasi, foto kemasan, asal pengiriman, kapasitas stabil, MOQ dan target penggunaan.", "Composition, process, specifications, pack photos, shipping origin, dependable capacity, MOQ and intended use.", "配方、工艺、规格、包装照片、发货地、稳定产能、最低订量及目标用途。") },
  ],
};

export const chinaSources = [
  {
    "id": "exports",
    "label": "BPS. Ekspor menurut negara tujuan, FOB",
    "url": "https://www.bps.go.id/assets/statistics-table/1/MTAxMCMx/nilai-ekspor-menurut-negara-tujuan-utama--nilai-fob-juta-us----2000-2023.html"
  },
  {
    "id": "imports",
    "label": "BPS. Impor menurut negara asal, CIF",
    "url": "https://www.bps.go.id/id/statistics-table/1/MTAzNiMx/nilai-impor-menurut-negara-asal-utama-nilai-cif-juta-us-2000-2021.html"
  },
  {
    "id": "population",
    "label": "NBS. Statistik nasional 2025",
    "url": "https://www.stats.gov.cn/english/PressRelease/202602/t20260228_1962661.html"
  },
  {
    "id": "economy",
    "label": "Pemerintah China. Kinerja ekonomi 2025",
    "url": "https://english.www.gov.cn/archive/statistics/202601/19/content_WS696daa26c6d00ca5f9a08a3e.html"
  },
  {
    "id": "income",
    "label": "NBS. Pendapatan dan konsumsi rumah tangga 2025",
    "url": "https://www.stats.gov.cn/english/PressRelease/202601/t20260120_1962356.html"
  },
  {
    "id": "trade-signal",
    "label": "Kemendag. Perdagangan pertanian dan pangan Indonesia–China",
    "url": "https://www.kemendag.go.id/berita/siaran-pers/tiongkok-konsisten-bidik-produk-pertanian-dan-makanan-olahan-indonesia"
  },
  {
    "id": "coffee2025",
    "label": "CCCFNA. Kopi dan olahannya, tahun penuh 2025",
    "url": "https://www.cccfna.org.cn/maoyitongji/hangyetongji/ff8080819a99c60d019d03a644d1406c.html"
  },
  {
    "id": "coffee2026",
    "label": "CCCFNA. Kopi dan olahannya, Januari–Agustus 2026",
    "url": "https://www.cccfna.org.cn/maoyitongji/hangyetongji/ff808081a133756f01a15d10ba020685.html"
  },
  {
    "id": "coffee2024",
    "label": "Kemendag LAMANSITU. Kopi ke China",
    "url": "https://lamansitu.kemendag.go.id/content/persyaratan-mutu-kopi-tiongkok"
  },
  {
    "id": "spices",
    "label": "Kemendag LAMANSITU. Rempah ke China",
    "url": "https://lamansitu.kemendag.go.id/content/perstaratan-mutu-rempah-rempah-tiongkok"
  },
  {
    "id": "decree280",
    "label": "Kedutaan China di Indonesia. Decree 280",
    "url": "https://id.china-embassy.gov.cn/eng/sgdt/202608/t20260811_12002258.htm"
  },
  {
    "id": "registration",
    "label": "GACC melalui MOFCOM. Penjelasan Announcement 27/2026",
    "url": "https://policy.mofcom.gov.cn/claw/policyInfo.shtml?id=8871"
  },
  {
    "id": "agriculture",
    "label": "GACC melalui Single Window Gansu. Announcement 219/2025",
    "url": "https://gs.singlewindow.cn/pen-portal/notice/newsdetails.jspa?penArticleDto.id=2910"
  },
  {
    "id": "sfa280",
    "label": "Singapore Food Agency. Ringkasan Decree 280",
    "url": "https://www.sfa.gov.sg/news-publications/circulars-and-notices/circulars/trade-circular-on-update-on-china-s-revised-registration-requirements-for-overseas-food-manufacturers---gacc-decree-no--280"
  },
  {
    "id": "foodlaw",
    "label": "SAMR. Food Safety Law",
    "url": "https://www.samr.gov.cn/zw/zfxxgk/fdzdgknr/fgs/art/2023/art_6bff4ef87291497fa72949e1fc88efb5.html"
  },
  {
    "id": "label",
    "label": "NHC. Tanya jawab GB 7718-2025",
    "url": "https://www.nhc.gov.cn/sps/c100087/202509/bc824a504ec34c27883da73f14c20d44.shtml"
  },
  {
    "id": "labeldate",
    "label": "Otoritas pasar Panjin. Jadwal GB 7718-2025",
    "url": "https://scjgj.panjin.gov.cn/2026_08/14_15/content-572108.html"
  },
  {
    "id": "tariff",
    "label": "Kementerian Keuangan China. Tarif 2026",
    "url": "https://gss.mof.gov.cn/gzdt/zhengcefabu/202512/t20251231_3981044.htm"
  },
  {
    "id": "vat",
    "label": "Kementerian Keuangan China. VAT Law",
    "url": "https://m.mof.gov.cn/zcfb/202412/t20241225_3950494.htm"
  },
  {
    "id": "vatdetail",
    "label": "GACC melalui MOFCOM. Penjelasan VAT impor 2026",
    "url": "https://policy.mofcom.gov.cn/claw/policyInfo.shtml?id=8731"
  },
  {
    "id": "rcep",
    "label": "MOFCOM. Portal RCEP",
    "url": "https://fta.mofcom.gov.cn/channel/rcep.shtml"
  },
  {
    "id": "origin",
    "label": "Bank Indonesia. FAQ FTA",
    "url": "https://www.bi.go.id/id/FTA-Corner/FAQ-dan-Konsultasi/Default.aspx"
  },
  {
    "id": "ska",
    "label": "Kemendag. e-SKA",
    "url": "https://e-ska.kemendag.go.id/home.php/home/form"
  },
  {
    "id": "export",
    "label": "DJBC. Pemberitahuan pabean ekspor",
    "url": "https://pangkalpinang.beacukai.go.id/mandatory/pemberitahuan-pabean-ekspor.html"
  },
  {
    "id": "exportfaq",
    "label": "DJBC. FAQ tata laksana ekspor",
    "url": "https://beacukai.go.id/faq-tatalaksana-ekspor"
  },
  {
    "id": "ccc",
    "label": "SAMR. CCC",
    "url": "https://english.samr.gov.cn/CooperationandExchanges/Organizations/art/2026/art_c2f7533f9c0046a1ae3e65a95259218a.html"
  },
  {
    "id": "companycheck",
    "label": "SAMR. Sistem informasi perusahaan",
    "url": "https://www.samr.gov.cn/xw/zj/art/2023/art_adabb5781e8a4573bdad66fbd03be3fd.html"
  },
  {
    "id": "itpc",
    "label": "ITPC Shanghai. Profil dan kontak",
    "url": "https://representative.kemendag.go.id/itpc-shanghai/tentang-kami"
  },
  {
    "id": "volcafe",
    "label": "Volcafe. China destination",
    "url": "https://www.volcafe.com/network/china-destination"
  },
  {
    "id": "sucafina",
    "label": "Sucafina. Yunnan",
    "url": "https://group.sucafina.com/network/sucafina-yunnan-co-ltd1"
  },
  {
    "id": "sinodis",
    "label": "SINODIS. Produk dan profil",
    "url": "https://www.sinodis.com/"
  },
  {
    "id": "sinodiscontact",
    "label": "SINODIS. Kontak",
    "url": "https://www.sinodis.com/market/contact.html"
  },
  {
    "id": "blg",
    "label": "BLG. Kontak",
    "url": "https://en.sh-blg.com/Contact.html"
  },
  {
    "id": "volcan",
    "label": "Café del Volcán. Profil dan kontak",
    "url": "https://cafevolcan.com/"
  },
  {
    "id": "coffeeprice",
    "label": "Frontstreet Coffee. Golden Mandheling",
    "url": "https://www.frontstreetcoffee.com.cn/g11.html"
  },
  {
    "id": "pepperprices",
    "label": "JD. Panduan produk lada",
    "url": "https://dir.jd.com/guide/jd-geo-guide-hu-jiao-fen-v1"
  },
  {
    "id": "blackpepperprices",
    "label": "JD. Panduan lada hitam",
    "url": "https://dir.jd.com/guide/jd-geo-guide-hei-hu-jiao-fen-v1"
  },
  {
    "id": "coconutprices",
    "label": "JD. Panduan air kelapa",
    "url": "https://dir.jd.com/guide/jd-geo-guide-100-chun-ye-zi-shui-guo-zhi-yin-liao-v1"
  },
  {
    "id": "charcoal",
    "label": "Hapag-Lloyd. Charcoal sebagai Dangerous Goods",
    "url": "https://www.hapag-lloyd.com/en/services-information/news/2025/12/new-imdg-regulation--mandatory-dangerous-goods-declaration-for-c.html"
  },
  {
    "id": "quarantine",
    "label": "Barantin. Ekspor kopi robusta ke China",
    "url": "https://karantinaindonesia.go.id/uji-terap/berita/go-ekspor-aroma-kopi-robusta-bebas-optk-semerbak-hingga-tiongkok"
  },
  {
    "id": "cifer",
    "label": "GACC — CIFER",
    "url": "https://cifer.singlewindow.cn"
  }
];
