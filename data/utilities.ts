import type { Localized } from "./apps";

export const utilities = [
  {
    title: { en: "Document Number Helper", id: "Bantuan Nomor Dokumen", zh: "\u6587\u6863\u7f16\u53f7\u52a9\u624b" },
    description: { en: "Prepare consistent document numbering patterns.", id: "Susun pola penomoran dokumen secara konsisten.", zh: "\u51c6\u5907\u4e00\u81f4\u7684\u6587\u6863\u7f16\u53f7\u6a21\u5f0f\u3002" }
  },
  {
    title: { en: "Indonesian Date Converter", id: "Konverter Tanggal Indonesia", zh: "\u5370\u5c3c\u65e5\u671f\u8f6c\u6362\u5668" },
    description: { en: "Format dates for formal letters and reports.", id: "Format tanggal untuk surat dan laporan.", zh: "\u4e3a\u6b63\u5f0f\u4fe1\u51fd\u548c\u62a5\u544a\u683c\u5f0f\u5316\u65e5\u671f\u3002" }
  },
  {
    title: { en: "Procurement Checklist", id: "Checklist Pengadaan", zh: "\u91c7\u8d2d\u68c0\u67e5\u6e05\u5355" },
    description: { en: "Check common procurement document completeness.", id: "Cek kelengkapan umum dokumen pengadaan.", zh: "\u68c0\u67e5\u5e38\u89c1\u91c7\u8d2d\u6587\u6863\u7684\u5b8c\u6574\u6027\u3002" }
  },
  {
    title: { en: "Scale Converter", id: "Konverter Skala Nilai", zh: "\u5206\u503c\u8f6c\u6362\u5668" },
    description: { en: "Convert score scales for quick performance calculations.", id: "Konversi skala nilai untuk perhitungan cepat.", zh: "\u8f6c\u6362\u5206\u503c\u91cf\u8868\u4ee5\u5feb\u901f\u8ba1\u7b97\u7ee9\u6548\u3002" }
  },
  {
    title: { en: "App Launcher", id: "Launcher Aplikasi", zh: "\u5e94\u7528\u542f\u52a8\u5668" },
    description: { en: "Open frequently used tools from one place.", id: "Buka tools yang sering dipakai dari satu tempat.", zh: "\u4ece\u4e00\u5904\u6253\u5f00\u5e38\u7528\u5de5\u5177\u3002" }
  },
  {
    title: { en: "Local Notes", id: "Catatan Lokal", zh: "\u672c\u5730\u7b14\u8bb0" },
    description: { en: "Keep short notes in browser storage.", id: "Simpan catatan singkat di browser.", zh: "\u5728\u6d4f\u89c8\u5668\u5b58\u50a8\u4e2d\u4fdd\u7559\u7b80\u77ed\u7b14\u8bb0\u3002" }
  }
] satisfies Array<{ title: Localized<string>; description: Localized<string> }>;
