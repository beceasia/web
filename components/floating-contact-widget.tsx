import { ArrowUpRight, MessageCircle, PhoneCall } from "lucide-react";
import { WHATSAPP_DISPLAY, whatsappUrl } from "@/data/contact";

const consultMessage = "Halo bece.asia, saya ingin konsultasi ekspor/impor, produk digital, atau custom app.";
const customAppMessage = "Halo bece.asia, saya ingin konsultasi kebutuhan custom app untuk bisnis/komunitas saya.";

export function FloatingContactWidget() {
  return (
    <aside className="fixed bottom-4 right-4 z-[90] w-[calc(100vw-2rem)] max-w-[21rem] sm:bottom-6 sm:right-6" aria-label="Widget konsultasi bece.asia">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/15">
        <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-emerald-600 text-white">
              <MessageCircle size={20} />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-black text-navy">Live chat bece.asia</p>
              <p className="truncate text-xs font-semibold text-slate-500">WhatsApp {WHATSAPP_DISPLAY}</p>
            </div>
          </div>
        </div>
        <div className="space-y-2 p-3">
          <a
            href={whatsappUrl(consultMessage)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between gap-3 rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-black text-white transition hover:bg-emerald-700"
          >
            <span className="inline-flex items-center gap-2">
              <PhoneCall size={17} />
              Konsultasi WhatsApp
            </span>
            <ArrowUpRight size={16} />
          </a>
          <a
            href={whatsappUrl(customAppMessage)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-navy transition hover:border-teal/40 hover:bg-teal/5 hover:text-teal"
          >
            <span>Custom app</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </aside>
  );
}
