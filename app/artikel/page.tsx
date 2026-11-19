import Link from "next/link";
import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { articleCategories, formatArticleDate, getArticleCategory, getArticles } from "@/lib/articles";
export const metadata:Metadata={title:"Artikel Perdagangan Asia",description:"Berita ekspor impor Asia, peluang UMKM, logistik, regulasi, ekonomi dan AI. Penjelasan singkat, sederhana, dan bersumber.",alternates:{canonical:"/artikel"}};
export default async function ArtikelPage({searchParams}:{searchParams:Promise<{kategori?:string}>}){
 const {kategori}=await searchParams;
 const selected=articleCategories.find(c=>c.slug===kategori);
 const all=getArticles();
 const entries=selected?all.filter(a=>a.category===selected.slug):all;
 return <PageShell locale="id" currentPath="/artikel">
   <section className="bg-navy px-4 py-16 text-white sm:px-6 lg:px-8"><div className="mx-auto max-w-6xl">
    <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal">BECE UPDATE · ASIA TRADE</p>
    <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">Berita perdagangan Asia, tanpa bahasa yang rumit.</h1>
    <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200">Perkembangan ekspor, impor, regulasi dan peluang pasar. Fakta, dampak bisnis, serta langkah yang bisa Anda lakukan.</p>
   </div></section>
   <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
     <h2 className="text-xl font-black text-navy">Pilih kategori</h2>
     <nav aria-label="Kategori artikel" className="mt-4 flex flex-wrap gap-2">
       <Link href="/artikel" className={`rounded-full border px-4 py-2 text-sm font-semibold ${!selected?"border-navy bg-navy text-white":"border-slate-200 bg-white text-navy"}`}>Semua</Link>
       {articleCategories.map(c=><Link key={c.slug} href={`/artikel?kategori=${c.slug}`} className={`rounded-full border px-4 py-2 text-sm font-semibold ${selected?.slug===c.slug?"border-navy bg-navy text-white":"border-slate-200 bg-white text-navy hover:border-teal"}`}>{c.label}</Link>)}
     </nav>
     <div className="mt-10 flex items-center justify-between gap-3"><h2 className="text-2xl font-black text-navy">{selected?selected.label:"Artikel terbaru"}</h2><span className="text-sm text-slate-500">{entries.length} artikel</span></div>
     {entries.length?<div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{entries.map(a=>
       <Link key={a.slug} href={`/artikel/${a.slug}`} className="group flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:border-teal">
         <span className="text-xs font-bold uppercase tracking-wider text-teal">{getArticleCategory(a.category)?.label}</span>
         <h3 className="mt-4 text-xl font-black leading-snug text-navy">{a.title}</h3>
         <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{a.excerpt}</p>
         <div className="mt-6 flex items-center justify-between gap-2 border-t border-slate-100 pt-4 text-xs text-slate-500"><span>{formatArticleDate(a.publishedAt)}</span><span className="font-bold text-navy">Baca artikel →</span></div>
       </Link>)}</div>:<p className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">Belum ada artikel dalam kategori ini. Hanya berita terverifikasi yang kami terbitkan.</p>}
     <p className="mt-10 text-sm leading-7 text-slate-500">BECE adalah portal independen. Periksa sumber resmi sebelum melakukan transaksi atau mengambil keputusan kepabeanan.</p>
   </section>
 </PageShell>;
}
