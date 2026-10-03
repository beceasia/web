"use client";
import type { Locale } from "@/data/apps";

export function PrintReportButton({ locale }: { locale: Locale }) {
  return (
    <button
      onClick={() => window.print()}
      className="min-h-12 rounded-xl bg-navy px-4 text-sm font-bold text-white print:hidden"
    >
      {
        {
          id: "Cetak / simpan PDF",
          en: "Print / save PDF",
          zh: "打印 / 保存 PDF",
        }[locale]
      }
    </button>
  );
}
