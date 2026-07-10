import type { AppItem } from "@/data/apps";

export const businessToolsApps: AppItem[] = [
  {
    slug: "invoice-flow",
    name: { en: "InvoiceFlow", id: "InvoiceFlow" },
    tagline: { en: "Create simple invoices with automatic totals and print-ready previews.", id: "Buat invoice sederhana dengan total otomatis dan preview siap cetak." },
    description: { en: "A browser-based invoice utility with editable items, quantities, prices, discounts, and printable output.", id: "Utilitas invoice berbasis browser dengan item, jumlah, harga, diskon, dan hasil siap cetak." },
    category: "Business Tools", status: "beta", region: "Global", scope: "Finance Utility", url: "/apps/invoice-flow", featured: true,
    tags: ["invoice", "billing", "finance"],
    utilities: { en: ["Invoice editor", "Automatic totals", "Print preview"], id: ["Editor invoice", "Total otomatis", "Preview cetak"] },
    lastUpdated: "2026-07-11", officialStatus: "community-built"
  },
  {
    slug: "mini-pos",
    name: { en: "Mini POS", id: "Mini POS" },
    tagline: { en: "A lightweight point-of-sale tool for products, stock, and daily sales.", id: "Kasir ringan untuk produk, stok, dan penjualan harian." },
    description: { en: "Manage products, cart transactions, stock deductions, and local sales totals from the browser.", id: "Kelola produk, transaksi keranjang, pengurangan stok, dan omzet lokal langsung dari browser." },
    category: "Business Tools", status: "beta", region: "Global", scope: "Retail Utility", url: "/apps/mini-pos", featured: true,
    tags: ["POS", "sales", "stock", "MSME"],
    utilities: { en: ["Product list", "Cart checkout", "Stock tracking"], id: ["Daftar produk", "Checkout", "Pelacakan stok"] },
    lastUpdated: "2026-07-11", officialStatus: "community-built"
  },
  {
    slug: "booking-workspace",
    name: { en: "Booking Workspace", id: "Booking Workspace" },
    tagline: { en: "Record service schedules, customers, and booking status.", id: "Catat jadwal layanan, pelanggan, dan status booking." },
    description: { en: "A simple scheduling workspace for service businesses, consultations, events, and appointments.", id: "Workspace penjadwalan sederhana untuk bisnis jasa, konsultasi, acara, dan janji temu." },
    category: "Productivity", status: "beta", region: "Global", scope: "Scheduling", url: "/apps/booking-workspace", featured: true,
    tags: ["booking", "calendar", "service"],
    utilities: { en: ["Booking form", "Schedule list", "Status tracking"], id: ["Form booking", "Daftar jadwal", "Pelacakan status"] },
    lastUpdated: "2026-07-11", officialStatus: "community-built"
  },
  {
    slug: "task-workspace",
    name: { en: "Task Workspace", id: "Task Workspace" },
    tagline: { en: "Track tasks, owners, deadlines, priorities, and progress.", id: "Pantau tugas, PIC, deadline, prioritas, dan progres." },
    description: { en: "A lightweight task board for personal work, teams, communities, and small projects.", id: "Task board ringan untuk pekerjaan pribadi, tim, komunitas, dan proyek kecil." },
    category: "Productivity", status: "beta", region: "Global", scope: "Task Management", url: "/apps/task-workspace", featured: true,
    tags: ["tasks", "kanban", "deadline", "productivity"],
    utilities: { en: ["Task register", "Priority tracking", "Status workflow"], id: ["Register tugas", "Pelacakan prioritas", "Workflow status"] },
    lastUpdated: "2026-07-11", officialStatus: "community-built"
  },
  {
    slug: "business-profile-builder",
    name: { en: "Business Profile Builder", id: "Business Profile Builder" },
    tagline: { en: "Turn basic business information into a polished company profile.", id: "Ubah informasi dasar usaha menjadi profil bisnis yang rapi." },
    description: { en: "Generate a reusable business introduction from company name, field, audience, strengths, services, and contact details.", id: "Hasilkan pengantar usaha yang dapat digunakan kembali dari nama, bidang, audiens, keunggulan, layanan, dan kontak." },
    category: "Business Tools", status: "beta", region: "Global", scope: "Business Writing", url: "/apps/business-profile-builder", featured: true,
    tags: ["company profile", "business", "writing"],
    utilities: { en: ["Profile generator", "Value proposition", "Copy output"], id: ["Generator profil", "Proposisi nilai", "Salin hasil"] },
    lastUpdated: "2026-07-11", officialStatus: "community-built"
  },
  {
    slug: "price-quote-builder",
    name: { en: "Price Quote Builder", id: "Price Quote Builder" },
    tagline: { en: "Estimate service pricing and delivery time from simple parameters.", id: "Estimasi harga jasa dan waktu pengerjaan dari parameter sederhana." },
    description: { en: "A quick quotation simulator using base price, complexity, revisions, and rush delivery.", id: "Simulator penawaran cepat berdasarkan harga dasar, kompleksitas, revisi, dan pengerjaan prioritas." },
    category: "Business Tools", status: "beta", region: "Global", scope: "Pricing Utility", url: "/apps/price-quote-builder", featured: true,
    tags: ["pricing", "quotation", "services"],
    utilities: { en: ["Price simulation", "Duration estimate", "Quote preview"], id: ["Simulasi harga", "Estimasi durasi", "Preview penawaran"] },
    lastUpdated: "2026-07-11", officialStatus: "community-built"
  }
];
