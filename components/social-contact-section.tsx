import { ArrowUpRight, MessageCircle, Sparkles } from "lucide-react";
import type { Locale } from "@/data/apps";
import { INSTAGRAM_URL, WHATSAPP_DISPLAY, whatsappUrl } from "@/data/contact";

const instagramItems = [
  {
    title: { en: "Export and import notes", id: "Catatan ekspor dan impor", zh: "Export and import notes" },
    body: {
      en: "Practical reminders for trade documentation, classification, and public-reference checks.",
      id: "Pengingat praktis seputar dokumen perdagangan, klasifikasi, dan validasi referensi publik.",
      zh: "Practical reminders for trade documentation, classification, and public-reference checks.",
    },
  },
  {
    title: { en: "Digital product ideas", id: "Ide produk digital", zh: "Digital product ideas" },
    body: {
      en: "Short updates on lightweight tools, calculators, dashboards, and workflow prototypes.",
      id: "Update singkat tentang tools ringan, kalkulator, dashboard, dan prototipe workflow.",
      zh: "Short updates on lightweight tools, calculators, dashboards, and workflow prototypes.",
    },
  },
  {
    title: { en: "Custom app requests", id: "Kebutuhan custom app", zh: "Custom app requests" },
    body: {
      en: "Examples of how a public-safe app can be adapted for a specific business or community need.",
      id: "Contoh bagaimana app public-safe bisa disesuaikan untuk kebutuhan bisnis atau komunitas tertentu.",
      zh: "Examples of how a public-safe app can be adapted for a specific business or community need.",
    },
  },
];

export function SocialContactSection({ locale }: { locale: Locale }) {
  const copy = {
    eyebrow: locale === "en" ? "Connect with bece.asia" : locale === "zh" ? "Connect with bece.asia" : "Terhubung dengan bece.asia",
    title: locale === "en" ? "Consult export-import needs, digital products, and custom apps." : locale === "zh" ? "Consult export-import needs, digital products, and custom apps." : "Konsultasi ekspor-impor, produk digital, dan custom app.",
    description: locale === "en"
      ? `Reach WhatsApp Business at ${WHATSAPP_DISPLAY}, or follow bece.asia on Instagram for the latest short updates.`
      : locale === "zh"
        ? `Reach WhatsApp Business at ${WHATSAPP_DISPLAY}, or follow bece.asia on Instagram for the latest short updates.`
        : `Hubungi WhatsApp Business di ${WHATSAPP_DISPLAY}, atau ikuti Instagram bece.asia untuk update konten terbaru.`,
    whatsapp: locale === "en" ? "Consult on WhatsApp" : locale === "zh" ? "Consult on WhatsApp" : "Konsultasi WhatsApp",
    instagram: locale === "en" ? "Open Instagram" : locale === "zh" ? "Open Instagram" : "Buka Instagram",
    latest: locale === "en" ? "Latest from Instagram" : locale === "zh" ? "Latest from Instagram" : "Konten terbaru dari Instagram",
    message: locale === "en"
      ? "Hello bece.asia, I want to consult about export/import, digital products, or a custom app."
      : locale === "zh"
        ? "Hello bece.asia, I want to consult about export/import, digital products, or a custom app."
        : "Halo bece.asia, saya ingin konsultasi ekspor/impor, produk digital, atau custom app.",
  };

  return (
    <section className="bg-white py-16">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="self-center">
          <p className="text-xs font-black uppercase tracking-[0.24em] text-teal">{copy.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-navy sm:text-4xl">{copy.title}</h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">{copy.description}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={whatsappUrl(copy.message)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700">
              <MessageCircle size={18} />
              {copy.whatsapp}
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-navy transition hover:border-teal/40 hover:text-teal">
              <Sparkles size={18} />
              {copy.instagram}
            </a>
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-slate-500">
            <Sparkles size={17} className="text-teal" />
            {copy.latest}
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {instagramItems.map((item) => (
              <a key={item.title.en} href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="group rounded-2xl border border-slate-200 bg-soft p-5 transition hover:-translate-y-1 hover:border-teal/40 hover:bg-white hover:shadow-soft">
                <div className="flex items-start justify-between gap-4">
                  <Sparkles size={20} className="text-teal" />
                  <ArrowUpRight size={17} className="text-slate-400 transition group-hover:text-teal" />
                </div>
                <h3 className="mt-4 text-base font-black text-navy">{item.title[locale] ?? item.title.id}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.body[locale] ?? item.body.id}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
