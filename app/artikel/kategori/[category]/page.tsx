import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { articleCategories, formatArticleDate, getArticles, type ArticleCategory } from "@/lib/articles";

const descriptions: Record<ArticleCategory, string> = {
  "ekspor-pasar-asia": "Berita peluang ekspor dan tren pasar Asia. Pelajari negara tujuan, kebutuhan pembeli, dan langkah awal eksportir Indonesia.",
  "kebijakan-perdagangan": "Perubahan kebijakan perdagangan, tarif, perjanjian dagang, dan aturan yang perlu diperiksa eksportir maupun importir Indonesia.",
  "impor-logistik": "Berita impor, biaya pengiriman, pelabuhan, dan rantai pasok Asia dengan penjelasan praktis bagi pelaku usaha.",
  "umkm-bisnis": "Informasi UMKM, pengembangan produk, pasar, dan program pendampingan ekspor berdasarkan sumber yang dapat diperiksa.",
  "data-ekonomi": "Data perdagangan, nilai tukar, inflasi, dan kondisi ekonomi Asia yang relevan untuk keputusan bisnis.",
  "ai-otomatisasi": "Perkembangan AI dan otomatisasi bisnis di Asia, termasuk penggunaan yang praktis untuk UMKM dan perdagangan.",
};

type Props = { params: Promise<{ category: string }> };
export function generateStaticParams() {
  return articleCategories.map((category) => ({ category: category.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const found = articleCategories.find((item) => item.slug === category);
  if (!found) return { title: "Kategori tidak ditemukan", robots: { index: false } };
  const hasArticles = getArticles().some((article) => article.category === found.slug);
  return {
    title: found.label + " | Artikel BECE",
    description: descriptions[found.slug],
    alternates: { canonical: `/artikel/kategori/${found.slug}` },
    openGraph: {
      title: found.label + " | Artikel BECE",
      description: descriptions[found.slug],
      url: `https://www.bece.asia/artikel/kategori/${found.slug}`,
      type: "website",
    },
    robots: { index: hasArticles, follow: true },
  };
}

export default async function ArticleCategoryPage({ params }: Props) {
  const { category } = await params;
  const found = articleCategories.find((item) => item.slug === category);
  if (!found) notFound();
  const entries = getArticles().filter((article) => article.category === found.slug);
  return (
    <PageShell locale="id" currentPath={`/artikel/kategori/${found.slug}`}>
      <section className="bg-navy px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Link href="/artikel" className="text-sm font-bold text-teal hover:underline">← Semua artikel</Link>
          <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-teal">BECE UPDATE · KATEGORI</p>
          <h1 className="mt-3 text-3xl font-black sm:text-5xl">{found.label}</h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-200">{descriptions[found.slug]}</p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <nav aria-label="Pilih kategori" className="flex flex-wrap gap-2">
          <Link href="/artikel" className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-navy">Semua</Link>
          {articleCategories.map((item) => (
            <Link key={item.slug} href={`/artikel/kategori/${item.slug}`}
              className={`rounded-full border px-4 py-2 text-sm font-semibold ${item.slug === found.slug ? "border-navy bg-navy text-white" : "border-slate-200 bg-white text-navy hover:border-teal"}`}>
              {item.label}
            </Link>
          ))}
        </nav>
        <h2 className="mt-10 text-2xl font-black text-navy">Artikel terbaru</h2>
        {entries.length ? (
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {entries.map((article) => (
              <Link key={article.slug} href={`/artikel/${article.slug}`} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:border-teal">
                <p className="text-xs font-bold uppercase tracking-wider text-teal">{formatArticleDate(article.publishedAt)}</p>
                <h3 className="mt-3 text-xl font-black leading-snug text-navy">{article.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{article.excerpt}</p>
                <span className="mt-5 block text-sm font-bold text-navy">Baca selengkapnya →</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">Belum ada artikel terverifikasi dalam kategori ini.</p>
        )}
      </section>
    </PageShell>
  );
}
