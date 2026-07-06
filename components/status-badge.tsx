import type { AppStatus, Locale } from "@/data/apps";
import { t } from "@/data/i18n-safe";

const statusClass: Record<AppStatus, string> = {
  active: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  beta: "bg-sky-50 text-sky-700 ring-sky-200",
  maintenance: "bg-amber-50 text-amber-700 ring-amber-200",
  experimental: "bg-violet-50 text-violet-700 ring-violet-200",
  archived: "bg-slate-100 text-slate-600 ring-slate-200"
};

export function StatusBadge({ status, locale }: { status: AppStatus; locale: Locale }) {
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${statusClass[status]}`}>{t(locale).status[status]}</span>;
}
