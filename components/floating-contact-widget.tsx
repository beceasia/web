"use client";

import { MessageCircle, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { whatsappUrl } from "@/data/contact";

export function FloatingContactWidget() {
  const pathname = usePathname();
  const locale = pathname.startsWith("/en")
    ? "en"
    : pathname.startsWith("/zh")
      ? "zh"
      : "id";
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const copy = {
    id: {
      title: "Konsultasi BECE Asia",
      close: "Tutup konsultasi",
      chat: "Mulai WhatsApp",
      app: "Minta aplikasi",
      note: "Pesan akan menyertakan halaman yang sedang Anda buka.",
      message: "Halo BECE Asia, saya ingin konsultasi tentang halaman",
      custom: "Halo BECE Asia, saya ingin membuat aplikasi untuk usaha saya.",
    },
    en: {
      title: "Consult BECE Asia",
      close: "Close consultation",
      chat: "Start WhatsApp",
      app: "Request an app",
      note: "Your message will include the page you are viewing.",
      message: "Hello BECE Asia, I need help with this page",
      custom: "Hello BECE Asia, I would like an app for my business.",
    },
    zh: {
      title: "咨询 BECE Asia",
      close: "关闭咨询",
      chat: "开始 WhatsApp",
      app: "申请应用",
      note: "消息将包含您正在查看的页面。",
      message: "您好 BECE Asia，我需要此页面的帮助",
      custom: "您好 BECE Asia，我想为企业制作应用。",
    },
  }[locale];
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <aside
      className="fixed bottom-4 right-4 z-[90] flex flex-col items-end gap-3 pb-[env(safe-area-inset-bottom)]"
      aria-label={copy.title}
    >
      {open && (
        <div
          id="contact-panel"
          className="w-[calc(100vw-2rem)] max-w-80 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl"
        >
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-bold text-navy">{copy.title}</h2>
            <button
              autoFocus
              onClick={() => {
                setOpen(false);
                button.current?.focus();
              }}
              aria-label={copy.close}
              className="grid h-11 w-11 place-items-center rounded-xl hover:bg-slate-100"
            >
              <X size={20} />
            </button>
          </div>
          <p className="mb-3 text-xs leading-5 text-slate-600">{copy.note}</p>
          <a
            href={whatsappUrl(
              `${copy.message}: https://www.bece.asia${pathname}`,
            )}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-12 items-center justify-center rounded-xl bg-emerald-700 px-4 font-bold text-white"
          >
            {copy.chat}
          </a>
          <a
            href={whatsappUrl(copy.custom)}
            target="_blank"
            rel="noreferrer"
            className="mt-2 flex min-h-12 items-center justify-center rounded-xl border border-slate-200 text-sm font-bold text-navy"
          >
            {copy.app}
          </a>
        </div>
      )}
      <button
        ref={button}
        onClick={() => setOpen(!open)}
        aria-label={open ? copy.close : copy.title}
        aria-expanded={open}
        aria-controls="contact-panel"
        className="grid h-12 w-12 place-items-center rounded-full bg-emerald-700 text-white shadow-lg transition hover:bg-emerald-800"
      >
        {open ? <X size={22} /> : <MessageCircle size={24} />}
      </button>
    </aside>
  );
}
