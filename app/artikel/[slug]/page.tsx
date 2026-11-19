import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { formatArticleDate, getArticle, getArticleCategory, getArticles } from "@/lib/articles";
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return getArticles().map(a=>({slug:a.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {slug}=await params;const a=getArticle(slug);
 return a?{title:a.title,description:a.excerpt,alternates:{canonical:`/artikel/${slug}`},openGraph:{title:a.title,description:a.excerpt,type:"article",url:`https://www.bece.asia/artikel/${slug}`,publishedTime:a.publishedAt,section:getArticleCategory(a.category)?.label},twitter:{card:"summary",title:a.title,description:a.excerpt},robots:{index:true,follow:true}}:{title:"Artikel tidak ditemukan",robots:{index:false}};
}
export default async function DetailArtikelPage({params}:Props){
 const {slug}=await params;const a=getArticle(slug);if(!a)notFound();
 const articleUrl=`https://www.bece.asia/artikel/${slug}`;
 const structuredData=[
  {"@context":"https://schema.org","@type":"NewsArticle",
   headline:a.title,description:a.excerpt,inLanguage:"id-ID",
   datePublished:a.publishedAt,mainEntityOfPage:{"@type":"WebPage","@id":articleUrl},
   author:{"@type":"Organization",name:"BECE Asia",url:"https://www.bece.asia"},
   publisher:{"@type":"Organization",name:"BECE Asia",url:"https://www.bece.asia"},
   articleSection:getArticleCategory(a.category)?.label,
   about:a.regions,
   citation:a.sources.map(source=>source.url),
   isAccessibleForFree:true},
  {"@context":"https://schema.org","@type":"BreadcrumbList",
   itemListElement:[
    {"@type":"ListItem",position:1,name:"Beranda",item:"https://www.bece.asia/"},
    {"@type":"ListItem",position:2,name:"Artikel",item:"https://www.bece.asia/artikel"},
    {"@type":"ListItem",position:3,name:a.title,item:articleUrl}
   ]}
 ];
 return <PageShell locale="id" currentPath={`/artikel/${slug}`}>
 <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData).replace(/</g,"\\u003c")}} />
 <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
  <Link href="/artikel" className="text-sm font-bold text-teal hover:underline">← Semua artikel</Link>
  <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-slate-600">
    <Link href={`/artikel/kategori/${a.category}`} className="rounded-full bg-teal/10 px-3 py-1 font-bold text-emerald-800">{getArticleCategory(a.category)?.label}</Link>
    <span>{formatArticleDate(a.publishedAt)}</span>
  </div>
  <h1 className="mt-5 text-3xl font-black leading-tight text-navy sm:text-5xl">{a.title}</h1>
  <p className="mt-5 text-lg leading-8 text-slate-600">{a.excerpt}</p>
  <div className="mt-7 flex flex-wrap gap-2 text-xs text-slate-500">{a.regions.map(r=><span key={r} className="rounded-full border border-slate-200 bg-white px-3 py-1">{r}</span>)}</div>
  <div className="mt-8 grid gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-700 sm:grid-cols-3">
    <div><span className="block text-xs uppercase text-slate-500">Tanggal peristiwa</span><strong className="mt-1 block text-navy">{formatArticleDate(a.eventDate)}</strong></div>
    <div><span className="block text-xs uppercase text-slate-500">Status</span><strong className="mt-1 block text-navy">{a.policyStatus}</strong></div>
    <div><span className="block text-xs uppercase text-slate-500">Kepastian</span><strong className="mt-1 block text-navy">{a.certainty}</strong></div>
  </div>
  <div className="mt-12 space-y-10">{a.sections.map(s=><section key={s.heading}>
    <h2 className="text-2xl font-black text-navy">{s.heading}</h2>
    {s.paragraphs.map((p,i)=><p key={i} className="mt-4 text-base leading-8 text-slate-700">{p}</p>)}
    {s.bullets?.length?<ul className="mt-4 list-disc space-y-3 pl-6 text-base leading-8 text-slate-700">{s.bullets.map(b=><li key={b}>{b}</li>)}</ul>:null}
  </section>)}</div>
  <section className="mt-12 rounded-2xl border border-teal/20 bg-white p-6">
    <h2 className="text-xl font-black text-navy">Sumber dan verifikasi</h2>
    <p className="mt-3 text-sm text-slate-600">Judul sumber: {a.originalTitle}</p>
    <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-700">{a.sources.map(s=><li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer" className="font-bold text-teal underline underline-offset-2">{s.name}</a>{s.publishedAt?` · ${formatArticleDate(s.publishedAt)}`:""}</li>)}</ul>
    <p className="mt-5 text-xs leading-6 text-slate-500">Fakta berasal dari rujukan di atas. Analisis dan langkah praktis merupakan penjelasan BECE, bukan keputusan resmi pemerintah. Periksa ketentuan terbaru sebelum bertransaksi.</p>
  </section>
  <div className="mt-10 border-t border-slate-200 pt-6"><Link href="/artikel" className="font-bold text-navy hover:underline">← Kembali ke semua artikel</Link></div>
 </article></PageShell>;
}
