import { HomeContent } from "@/components/home-content";
import { PageShell } from "@/components/page-shell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BECE Asia — Peluang Ekspor dan Alat Kerja Bisnis",
  description:
    "Riset pasar, cari referensi HS, hitung biaya ekspor, dan siapkan dokumen. Pilih alat sesuai kebutuhan bisnis Anda.",
  alternates: {
    canonical: "/",
    languages: { id: "/", en: "/en", zh: "/zh", "x-default": "/" },
  },
};

export default function HomePage() {
  return (
    <PageShell locale="id" currentPath="/">
      <HomeContent locale="id" />
    </PageShell>
  );
}
