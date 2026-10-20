"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import type { Locale } from "@/data/apps";
import { CONTACT_EMAIL, whatsappUrl } from "@/data/contact";

const labels = {
  id: {
    company: "Nama usaha / pemohon", product: "Produk yang ingin ditawarkan", specs: "Spesifikasi produk",
    capacity: "Kapasitas pasok (opsional)", country: "Negara tujuan (opsional)", contact: "Kontak untuk balasan (opsional)",
    specsHint: "Bahan, bentuk, grade, kemasan, dan informasi lain yang sudah diketahui",
    consent: "Saya memahami isian ini hanya menyiapkan pesan yang akan saya kirim sendiri. Ini belum menjadi pesanan layanan atau pembayaran.",
    privacy: "Informasi dalam formulir ini tidak dikirim ke server BECE. Hindari data rahasia atau pribadi yang tidak diperlukan.",
    whatsapp: "Buka draf WhatsApp", email: "Buka draf email",
    note: "Tinjau dan kirim pesan melalui WhatsApp atau aplikasi email Anda. Membuka draf tidak berarti BECE telah menerima permintaan.",
    intro: "Halo BECE.asia, saya ingin membahas layanan Buyer Discovery.",
    subject: "Permintaan Riset Buyer Discovery", unknown: "Belum ditentukan",
  },
  en: {
    company: "Business / requester", product: "Product for export", specs: "Product specifications",
    capacity: "Available supply (optional)", country: "Target country (optional)", contact: "Reply contact (optional)",
    specsHint: "Ingredients, form, grade, packaging, and other known specifications",
    consent: "I understand this only prepares a message I will send myself. It does not place an order or make payment.",
    privacy: "This form does not transmit data to BECE's server. Avoid unnecessary confidential or personal information.",
    whatsapp: "Open WhatsApp draft", email: "Open email draft",
    note: "Review and send the draft yourself in WhatsApp or your email app. Opening a draft does not confirm BECE has received it.",
    intro: "Hello BECE.asia, I would like to discuss Buyer Discovery research.",
    subject: "Buyer Discovery Research Inquiry", unknown: "To be discussed",
  },
  zh: {
    company: "企业名称 / 联系人", product: "出口产品", specs: "产品规格",
    capacity: "供货能力（选填）", country: "目标国家（选填）", contact: "回复联系方式（选填）",
    specsHint: "原料、形态、等级、包装和其他已知产品信息",
    consent: "我理解表单只生成由我自行发送的消息，不代表已经下单或付款。",
    privacy: "此表单不会向 BECE 服务器发送信息，请勿提供不必要的保密或个人数据。",
    whatsapp: "打开 WhatsApp 草稿", email: "打开邮件草稿",
    note: "请在 WhatsApp 或邮件中自行检查并发送。打开草稿不代表 BECE 已收到。",
    intro: "您好 BECE.asia，我想咨询 Buyer Discovery 研究服务。",
    subject: "Buyer Discovery 研究咨询", unknown: "待讨论",
  },
};

const fieldClass =
  "mt-2 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base font-normal text-slate-900 placeholder:text-slate-400 focus:border-teal";

export function BuyerDiscoveryForm({ locale }: { locale: Locale }) {
  const text = labels[locale];
  const [company, setCompany] = useState("");
  const [product, setProduct] = useState("");
  const [specs, setSpecs] = useState("");
  const [capacity, setCapacity] = useState("");
  const [country, setCountry] = useState("");
  const [contact, setContact] = useState("");
  const [consent, setConsent] = useState(false);
  const ready = Boolean(company.trim() && product.trim() && specs.trim() && consent);
  const message = [
    text.intro, "",
    text.company + ": " + company.trim(),
    text.product + ": " + product.trim(),
    text.specs + ": " + specs.trim(),
    text.capacity + ": " + (capacity.trim() || text.unknown),
    text.country + ": " + (country.trim() || text.unknown),
    text.contact + ": " + (contact.trim() || text.unknown),
    "",
    "https://www.bece.asia/buyer-discovery",
  ].join("\n");
  const emailHref =
    "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent(text.subject) +
    "&body=" + encodeURIComponent(message);

  function openWhatsApp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!ready) return;
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={openWhatsApp} className="rounded-3xl border border-slate-200 bg-soft p-5 shadow-sm sm:p-7">
      <div className="grid gap-5">
        <label className="block text-sm font-semibold text-navy">
          {text.company} <span className="text-rose-600" aria-hidden="true">*</span>
          <input required maxLength={100} autoComplete="organization" value={company}
            onChange={(event) => setCompany(event.target.value)} placeholder="Nama usaha / Business name" className={fieldClass}/>
        </label>
        <label className="block text-sm font-semibold text-navy">
          {text.product} <span className="text-rose-600" aria-hidden="true">*</span>
          <input required maxLength={140} value={product} onChange={(event) => setProduct(event.target.value)}
            placeholder="Contoh: lada hitam / Black pepper" className={fieldClass}/>
        </label>
        <label className="block text-sm font-semibold text-navy">
          {text.specs} <span className="text-rose-600" aria-hidden="true">*</span>
          <textarea required maxLength={700} rows={3} value={specs} onChange={(event) => setSpecs(event.target.value)}
            placeholder={text.specsHint} className={fieldClass}/>
        </label>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-navy">
            {text.capacity}
            <input maxLength={100} value={capacity} onChange={(event) => setCapacity(event.target.value)}
              placeholder="Contoh: 500 kg/bulan" className={fieldClass}/>
          </label>
          <label className="block text-sm font-semibold text-navy">
            {text.country}
            <input maxLength={100} value={country} onChange={(event) => setCountry(event.target.value)}
              placeholder="Contoh: Malaysia" className={fieldClass}/>
          </label>
        </div>
        <label className="block text-sm font-semibold text-navy">
          {text.contact}
          <input maxLength={140} value={contact} onChange={(event) => setContact(event.target.value)}
            placeholder="Email atau WhatsApp bisnis" className={fieldClass}/>
        </label>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-slate-700">
            <input type="checkbox" required checked={consent} onChange={(event) => setConsent(event.target.checked)}
              className="mt-1 h-5 w-5 shrink-0 accent-teal"/>
            <span>{text.consent}</span>
          </label>
          <p className="mt-3 text-xs leading-6 text-slate-500">{text.privacy}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <button type="submit" disabled={!ready}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-teal px-4 py-3 text-sm font-bold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600">
            <MessageCircle size={18} aria-hidden="true"/>{text.whatsapp}<ArrowUpRight size={16} aria-hidden="true"/>
          </button>
          <a href={ready ? emailHref : undefined} aria-disabled={!ready}
            onClick={(event) => { if (!ready) event.preventDefault(); }}
            className={"inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold " +
              (ready ? "border-slate-300 bg-white text-navy hover:bg-slate-50" :
                "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400")}>
            <Mail size={18} aria-hidden="true"/>{text.email}
          </a>
        </div>
        <p className="text-xs leading-6 text-slate-500">{text.note}</p>
      </div>
    </form>
  );
}
