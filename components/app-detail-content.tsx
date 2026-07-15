import { ArrowLeft, ArrowUpRight, Info as InfoIcon, MessageCircle, PanelTopOpen } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/data/apps";
import { getAppBySlug, localized } from "@/data/apps";
import { WHATSAPP_DISPLAY, whatsappUrl } from "@/data/contact";
import { t } from "@/data/i18n-safe";
import { localePath } from "@/lib/routes";
import { StatusBadge } from "./status-badge";

export function AppDetailContent({ slug, locale }: { slug: string; locale: Locale }) {
  const app = getAppBySlug(slug);
  if (!app) notFound();

  const dict = t(locale);
  const appName = localized(app.name, locale);
  const copy = {
    publicNotice: locale === "en"
      ? "Public-use notice: this tool is independently maintained by bece.asia, is not an official government service, and must not be used as a substitute for official systems, regulations, or source documents. Do not enter confidential, personal, or operational data."
      : locale === "zh"
        ? "\u516c\u5171\u4f7f\u7528\u63d0\u793a\uff1a\u6b64\u5de5\u5177\u7531 bece.asia \u72ec\u7acb\u7ef4\u62a4\uff0c\u4e0d\u662f\u653f\u5e9c\u5b98\u65b9\u670d\u52a1\uff0c\u4e5f\u4e0d\u80fd\u66ff\u4ee3\u5b98\u65b9\u7cfb\u7edf\u3001\u6cd5\u89c4\u6216\u6e90\u6587\u6863\u3002\u8bf7\u4e0d\u8981\u8f93\u5165\u673a\u5bc6\u3001\u4e2a\u4eba\u6216\u64cd\u4f5c\u6570\u636e\u3002"
        : "Pemberitahuan penggunaan publik: alat ini dikelola independen oleh bece.asia, bukan layanan resmi pemerintah, dan tidak menggantikan sistem, peraturan, atau dokumen sumber resmi. Jangan memasukkan data rahasia, pribadi, atau operasional.",
    embeddedApp: locale === "en" ? "Embedded app" : locale === "zh" ? "\u5d4c\u5165\u5e94\u7528" : "Aplikasi tertempel",
    openFullPage: locale === "en" ? "Open full page" : locale === "zh" ? "\u6253\u5f00\u5b8c\u6574\u9875\u9762" : "Buka layar penuh",
    consult: locale === "en" ? "Consult on WhatsApp" : locale === "zh" ? "WhatsApp \u54a8\u8be2" : "Konsultasi via WhatsApp",
    consultNote: locale === "en"
      ? `Export-import consultation, digital products, and custom app requests: ${WHATSAPP_DISPLAY}.`
      : locale === "zh"
        ? `Export-import consultation, digital products, and custom app requests: ${WHATSAPP_DISPLAY}.`
        : `Konsultasi ekspor-impor, produk digital, dan kebutuhan custom app: ${WHATSAPP_DISPLAY}.`,
    whatsappMessage: locale === "en"
      ? `Hello bece.asia, I want to consult about export/import, digital products, or a custom app based on ${appName}.`
      : locale === "zh"
        ? `Hello bece.asia, I want to consult about export/import, digital products, or a custom app based on ${appName}.`
        : `Halo bece.asia, saya ingin konsultasi ekspor/impor, produk digital, atau custom app berdasarkan ${appName}.`,
    internalTitle: locale === "en" ? "Internal version in preparation" : locale === "zh" ? "\u5185\u90e8\u7248\u672c\u6b63\u5728\u51c6\u5907" : "Versi internal sedang disiapkan",
    internalDescription: locale === "en"
      ? "This app is listed as a sanitized public concept. The runnable version will appear here after its old source is copied, cleaned, and checked for public-safe data."
      : locale === "zh"
        ? "\u6b64\u5e94\u7528\u4f5c\u4e3a\u7ecf\u8fc7\u6e05\u7406\u7684\u516c\u5171\u6982\u5ff5\u5217\u51fa\u3002\u65e7\u6e90\u7801\u590d\u5236\u3001\u6e05\u7406\u5e76\u68c0\u67e5\u516c\u5171\u6570\u636e\u5b89\u5168\u540e\uff0c\u53ef\u8fd0\u884c\u7248\u672c\u5c06\u663e\u793a\u5728\u8fd9\u91cc\u3002"
        : "Aplikasi ini tercatat sebagai konsep publik yang disanitasi. Versi yang dapat dijalankan akan muncul di sini setelah sumber lama disalin, dibersihkan, dan dicek agar aman untuk publik."
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
      <Link href={localePath(locale, "/apps")} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-navy">
        <ArrowLeft size={16} />
        {dict.sections.allApps}
      </Link>

      <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">{app.category}</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-navy sm:text-5xl">{localized(app.name, locale)}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{localized(app.description, locale)}</p>
          </div>
          <StatusBadge status={app.status} locale={locale} />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Info label={dict.apps.region} value={app.region} />
          <Info label={dict.apps.scope} value={app.scope} />
          <Info label={dict.apps.updated} value={app.lastUpdated} />
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-navy">{dict.apps.utilities}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {localized(app.utilities, locale).map((item) => (
              <div key={item} className="rounded-2xl bg-slate-50 p-4 text-sm font-medium text-slate-700">{item}</div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {app.embedUrl ? (
            <a href={app.embedUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-navy-light">
              {dict.apps.open}
              <ArrowUpRight size={17} />
            </a>
          ) : null}
          <a href={whatsappUrl(copy.whatsappMessage)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-700">
            <MessageCircle size={17} />
            {copy.consult}
          </a>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm leading-6 text-emerald-900">
        <div className="flex gap-3">
          <MessageCircle className="mt-0.5 shrink-0 text-emerald-600" size={18} />
          <p>{copy.consultNote}</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-teal/20 bg-teal/5 p-5 text-sm leading-6 text-slate-700">
        <div className="flex gap-3">
          <InfoIcon className="mt-0.5 shrink-0 text-teal" size={18} />
          <p>
            {copy.publicNotice}
          </p>
        </div>
      </div>

      {app.embedUrl ? (
        <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-soft">
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-slate-50 px-5 py-4">
            <div className="flex items-center gap-2 text-sm font-bold text-navy">
              <PanelTopOpen size={18} />
              {copy.embeddedApp}
            </div>
            <a href={app.embedUrl} target="_blank" rel="noreferrer" className="text-sm font-semibold text-teal hover:text-navy">
              {copy.openFullPage}
            </a>
          </div>
          <iframe title={localized(app.name, locale)} src={app.embedUrl} className="h-[760px] w-full border-0" loading="lazy" />
        </div>
      ) : (
        <div className="mt-8 rounded-[1.5rem] border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
          <h2 className="text-2xl font-black text-navy">{copy.internalTitle}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            {copy.internalDescription}
          </p>
        </div>
      )}
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-2 font-bold text-navy">{value}</p>
    </div>
  );
}
