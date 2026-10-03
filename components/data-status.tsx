import type { Locale } from "@/data/apps";

export function DataStatus({
  locale,
  date,
}: {
  locale: Locale;
  date?: string;
}) {
  const copy = {
    id: {
      title: "Demo · belum ditinjau",
      body: "Angka, skor, pertumbuhan, harga, dan buyer merupakan contoh, bukan data pasar terverifikasi. Skor dibuat untuk demonstrasi antarmuka; metodologi statistik belum tersedia.",
      date: "Tanggal snapshot",
      period: "Periode data dan tanggal pemeriksaan sumber belum tersedia.",
    },
    en: {
      title: "Demo · not reviewed",
      body: "Figures, scores, growth, prices, and buyers are samples, not verified market data. Scores demonstrate the interface; a statistical methodology is not available.",
      date: "Snapshot date",
      period: "Data period and source review date are not available.",
    },
    zh: {
      title: "演示 · 未审核",
      body: "数字、评分、增长率、价格与买家均为示例，未经市场数据验证。评分用于界面演示；尚无统计方法。",
      date: "快照日期",
      period: "数据期间与来源审核日期尚未提供。",
    },
  }[locale];
  return (
    <aside className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs leading-6 text-amber-950">
      <p className="font-bold">
        {copy.title}
        {date ? ` · ${copy.date}: ${date}` : ""}
      </p>
      <p>{copy.body}</p>
      <p>{copy.period}</p>
    </aside>
  );
}
