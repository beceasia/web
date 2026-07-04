export type Locale = "en" | "id";
export type AppStatus = "active" | "beta" | "maintenance" | "experimental" | "archived";

export type AppItem = {
  slug: string;
  name: Record<Locale, string>;
  tagline: Record<Locale, string>;
  description: Record<Locale, string>;
  category: string;
  status: AppStatus;
  region: string;
  scope: string;
  url: string;
  repo?: string;
  featured: boolean;
  tags: string[];
  utilities: Record<Locale, string[]>;
  lastUpdated: string;
  officialStatus: "community-built";
};

export const apps: AppItem[] = [
  {
    slug: "procurement-workflow",
    name: { en: "Procurement Workflow", id: "Aplikasi Pengadaan" },
    tagline: { en: "Document numbering, procurement filing, and automated document generation.", id: "Penomoran, arsip dokumen, dan generate dokumen pengadaan otomatis." },
    description: { en: "A lightweight workflow tool for procurement administration, document control, filing, and template-based document generation.", id: "Aplikasi ringan untuk administrasi pengadaan, kontrol dokumen, pengarsipan, dan pembuatan dokumen berbasis template." },
    category: "Procurement",
    status: "beta",
    region: "Indonesia",
    scope: "Public Sector",
    url: "#",
    repo: "https://github.com/webbcpapin/pengadaan",
    featured: true,
    tags: ["procurement", "documents", "numbering", "workflow"],
    utilities: { en: ["Auto numbering", "Document generation", "Drive filing", "Sheet backend"], id: ["Penomoran otomatis", "Generate dokumen", "Arsip Drive", "Backend Sheet"] },
    lastUpdated: "2026-07-04",
    officialStatus: "community-built"
  },
  {
    slug: "travel-duty-planner",
    name: { en: "Travel Duty Planner", id: "Perjadin" },
    tagline: { en: "Plan duty travel, monitor budget use, and keep office coverage visible.", id: "Rencanakan perjalanan dinas, pantau anggaran, dan jaga ketersediaan pegawai kantor." },
    description: { en: "A planning workspace for duty travel scenarios, budget visibility, staffing coverage, and activity recap.", id: "Workspace perencanaan perjalanan dinas, visibilitas anggaran, ketersediaan pegawai, dan rekap kegiatan." },
    category: "Administration",
    status: "beta",
    region: "Indonesia",
    scope: "Office Productivity",
    url: "https://webbcpapin.github.io/perjadin/",
    repo: "https://github.com/webbcpapin/perjadin",
    featured: true,
    tags: ["travel", "budget", "planning"],
    utilities: { en: ["Budget check", "Scenario planning", "Staffing view"], id: ["Cek anggaran", "Skenario kegiatan", "Pantauan pegawai"] },
    lastUpdated: "2026-07-04",
    officialStatus: "community-built"
  },
  {
    slug: "export-clinic-workbench",
    name: { en: "Export Clinic Workbench", id: "JEBOLIN BANG 2.0" },
    tagline: { en: "A workbench for MSME export assistance and stakeholder coordination.", id: "Workbench untuk asistensi ekspor UMKM dan koordinasi lintas pihak." },
    description: { en: "Collect MSME profiles, track assistance, map readiness, and coordinate export support activities in one lightweight workspace.", id: "Kelola profil UMKM, pantau asistensi, petakan kesiapan, dan koordinasikan dukungan ekspor dalam satu workspace ringan." },
    category: "Export Assistance",
    status: "experimental",
    region: "Indonesia",
    scope: "Trade Facilitation",
    url: "#",
    repo: "https://github.com/webbcpapin/frontdesk",
    featured: true,
    tags: ["MSME", "export", "trade", "coordination"],
    utilities: { en: ["Readiness scoring", "Assistance records", "Export pipeline"], id: ["Skor kesiapan", "Riwayat asistensi", "Pipeline ekspor"] },
    lastUpdated: "2026-07-04",
    officialStatus: "community-built"
  },
  {
    slug: "youthpreneur-monitoring",
    name: { en: "Youthpreneur Monitoring", id: "Monitoring Babel Youthpreneur" },
    tagline: { en: "Monitor teams, mentors, field evidence, and program progress.", id: "Pantau tim, mentor, bukti lapangan, dan progres program." },
    description: { en: "A monitoring dashboard for entrepreneurship learning programs with team progress, evidence collection, and performance recap.", id: "Dashboard monitoring program pembelajaran kewirausahaan dengan progres tim, pengumpulan bukti, dan rekap kinerja." },
    category: "Monitoring",
    status: "beta",
    region: "Indonesia",
    scope: "Learning Program",
    url: "https://webbcpapin.github.io/babel-youthpreneur/monitoring/",
    repo: "https://github.com/webbcpapin/babel-youthpreneur",
    featured: true,
    tags: ["monitoring", "students", "MSME", "dashboard"],
    utilities: { en: ["Team dashboard", "Evidence log", "Scoreboard"], id: ["Dashboard tim", "Log bukti", "Scoreboard"] },
    lastUpdated: "2026-07-04",
    officialStatus: "community-built"
  },
  {
    slug: "english-day",
    name: { en: "English Day", id: "English Day" },
    tagline: { en: "A learning game for workplace English practice.", id: "Game pembelajaran untuk latihan bahasa Inggris di tempat kerja." },
    description: { en: "A gamified English learning app for adult learners, quizzes, progress tracking, and practice sessions.", id: "Aplikasi belajar bahasa Inggris berbasis game untuk peserta dewasa, kuis, progres, dan sesi latihan." },
    category: "Learning",
    status: "active",
    region: "Indonesia",
    scope: "Training",
    url: "https://webbcpapin.github.io/englishday/",
    repo: "https://github.com/webbcpapin/englishday",
    featured: false,
    tags: ["learning", "english", "game"],
    utilities: { en: ["Quizzes", "Levels", "Progress"], id: ["Kuis", "Level", "Progres"] },
    lastUpdated: "2026-07-04",
    officialStatus: "community-built"
  },
  {
    slug: "tin-research-workbench",
    name: { en: "Tin Research Workbench", id: "Kajian Timah Workbench" },
    tagline: { en: "Research workspace for commodity supervision analysis.", id: "Workspace kajian untuk analisis pengawasan komoditas." },
    description: { en: "A research workbench for organizing cases, news, mirror trade signals, interview notes, and analytical matrices.", id: "Workbench kajian untuk mengelola kasus, berita, sinyal mirror trade, catatan wawancara, dan matriks analisis." },
    category: "Research",
    status: "experimental",
    region: "Indonesia",
    scope: "Research",
    url: "#",
    repo: "https://github.com/webbcpapin/kajian-timah",
    featured: false,
    tags: ["research", "commodity", "analysis"],
    utilities: { en: ["Case data", "News log", "Analysis matrix"], id: ["Data kasus", "Log berita", "Matriks analisis"] },
    lastUpdated: "2026-07-04",
    officialStatus: "community-built"
  },
  {
    slug: "ngingetken",
    name: { en: "Ngingetken", id: "Ngingetken" },
    tagline: { en: "A lightweight reporting and reminder workspace.", id: "Workspace ringan untuk laporan dan pengingat." },
    description: { en: "A simple tool for collecting reports, suggestions, innovation ideas, and follow-up items.", id: "Alat sederhana untuk mengumpulkan laporan, saran, ide inovasi, dan tindak lanjut." },
    category: "Productivity",
    status: "beta",
    region: "Indonesia",
    scope: "Office Productivity",
    url: "https://webbcpapin.github.io/ngingetken/laporan.html",
    repo: "https://github.com/webbcpapin/ngingetken",
    featured: false,
    tags: ["reporting", "ideas", "follow-up"],
    utilities: { en: ["Report form", "Idea list", "Follow-up log"], id: ["Form laporan", "Daftar ide", "Log tindak lanjut"] },
    lastUpdated: "2026-07-04",
    officialStatus: "community-built"
  },
  {
    slug: "reward-tracker",
    name: { en: "Reward Tracker", id: "Hadiah Anak" },
    tagline: { en: "Track rewards, history, and daily behavior records.", id: "Catat hadiah, riwayat, dan perilaku harian." },
    description: { en: "A small family utility for reward tracking, daily records, and progress history.", id: "Utilitas keluarga untuk pelacakan hadiah, catatan harian, dan riwayat progres." },
    category: "Productivity",
    status: "active",
    region: "Indonesia",
    scope: "Personal Utility",
    url: "https://agung3956.github.io/hadiah-anak/public/index.html",
    repo: "https://github.com/agung3956/hadiah-anak",
    featured: false,
    tags: ["reward", "tracker", "family"],
    utilities: { en: ["Daily tracking", "History", "Rewards"], id: ["Catatan harian", "Riwayat", "Hadiah"] },
    lastUpdated: "2026-07-04",
    officialStatus: "community-built"
  },
  {
    slug: "frontdesk",
    name: { en: "FrontDesk", id: "FrontDesk" },
    tagline: { en: "A front office utility for service intake and tracking.", id: "Utilitas front office untuk penerimaan dan pelacakan layanan." },
    description: { en: "A service intake and tracking interface for simple public service workflows.", id: "Antarmuka penerimaan dan pelacakan layanan untuk alur kerja layanan sederhana." },
    category: "Public Service",
    status: "beta",
    region: "Indonesia",
    scope: "Service Desk",
    url: "https://webbcpapin.github.io/FrontDesk/",
    repo: "https://github.com/webbcpapin/FrontDesk",
    featured: false,
    tags: ["frontdesk", "service", "ticket"],
    utilities: { en: ["Service intake", "Queue view", "Tracking"], id: ["Penerimaan layanan", "Pantauan antrean", "Pelacakan"] },
    lastUpdated: "2026-07-04",
    officialStatus: "community-built"
  },
  {
    slug: "chm-documentation-viewer",
    name: { en: "CHM Documentation Viewer", id: "CHM Documentation Viewer" },
    tagline: { en: "Convert legacy CHM documentation into modern searchable HTML.", id: "Ubah dokumentasi CHM lama menjadi HTML modern yang mudah dicari." },
    description: { en: "A documentation conversion concept for extracting, restructuring, and presenting legacy help files in a modern web interface.", id: "Konsep konversi dokumentasi untuk mengekstrak, menyusun ulang, dan menyajikan file bantuan lama dalam antarmuka web modern." },
    category: "Document Workflow",
    status: "experimental",
    region: "Global",
    scope: "Documentation",
    url: "#",
    featured: false,
    tags: ["documentation", "CHM", "HTML"],
    utilities: { en: ["Content extraction", "Search", "Sidebar navigation"], id: ["Ekstraksi konten", "Pencarian", "Navigasi sidebar"] },
    lastUpdated: "2026-07-04",
    officialStatus: "community-built"
  },
  {
    slug: "ocr-translate-pdf",
    name: { en: "OCR Translate PDF", id: "OCR Translate PDF" },
    tagline: { en: "Turn scanned PDFs into searchable and translated documents.", id: "Ubah PDF scan menjadi dokumen searchable dan terjemahan." },
    description: { en: "A document utility concept for OCR, text extraction, translation, and quality control of technical PDFs.", id: "Konsep utilitas dokumen untuk OCR, ekstraksi teks, terjemahan, dan kontrol kualitas PDF teknis." },
    category: "Document Workflow",
    status: "experimental",
    region: "Global",
    scope: "Documentation",
    url: "#",
    featured: false,
    tags: ["OCR", "PDF", "translation"],
    utilities: { en: ["OCR", "Translation", "Searchable PDF"], id: ["OCR", "Terjemahan", "PDF searchable"] },
    lastUpdated: "2026-07-04",
    officialStatus: "community-built"
  },
  {
    slug: "risk-management-tool",
    name: { en: "Risk Management Tool", id: "Manajemen Risiko Tool" },
    tagline: { en: "Map risks, controls, indicators, and mitigation plans.", id: "Petakan risiko, pengendalian, indikator, dan rencana mitigasi." },
    description: { en: "A structured workspace for risk registers, control mapping, residual risk targets, and key risk indicators.", id: "Workspace terstruktur untuk register risiko, pemetaan pengendalian, target risiko residual, dan indikator risiko utama." },
    category: "Administration",
    status: "experimental",
    region: "Indonesia",
    scope: "Governance",
    url: "#",
    featured: false,
    tags: ["risk", "controls", "mitigation"],
    utilities: { en: ["Risk register", "Control map", "KRI"], id: ["Register risiko", "Peta pengendalian", "IRU"] },
    lastUpdated: "2026-07-04",
    officialStatus: "community-built"
  }
];

export function getAppBySlug(slug: string) {
  return apps.find((app) => app.slug === slug);
}

export function getFeaturedApps() {
  return apps.filter((app) => app.featured);
}
