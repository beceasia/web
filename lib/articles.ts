import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

export const articleCategories = [
  { slug: "ekspor-pasar-asia", label: "Ekspor & Pasar Asia" },
  { slug: "kebijakan-perdagangan", label: "Kebijakan Perdagangan" },
  { slug: "impor-logistik", label: "Impor & Logistik" },
  { slug: "umkm-bisnis", label: "UMKM & Bisnis" },
  { slug: "data-ekonomi", label: "Data & Ekonomi" },
  { slug: "ai-otomatisasi", label: "AI & Otomatisasi" },
] as const;
export type ArticleCategory = (typeof articleCategories)[number]["slug"];
export type Article = {
 slug:string; title:string; excerpt:string; category:ArticleCategory;
 publishedAt:string; eventDate:string; policyStatus:string; certainty:string;
 regions:string[]; originalTitle:string;
 sections:{heading:string;paragraphs:string[];bullets?:string[]}[];
 sources:{name:string;url:string;publishedAt?:string}[];
};
const directory=path.join(process.cwd(),"content","articles");
export function getArticles():Article[] {
 if(!existsSync(directory)) return [];
 return readdirSync(directory).filter(f=>f.endsWith(".json")).flatMap(file=>{
   try{
    const a=JSON.parse(readFileSync(path.join(directory,file),"utf8")) as Article;
    if(a.slug+".json"!==file||!Array.isArray(a.sections)||!Array.isArray(a.sources)||!articleCategories.some(c=>c.slug===a.category))return [];
    if(!/^[a-z0-9-]+$/.test(a.slug))return [];
    return [a];
   }catch{return [];}
 }).sort((a,b)=>b.publishedAt.localeCompare(a.publishedAt)||a.title.localeCompare(b.title));
}
export const getArticle=(slug:string)=>getArticles().find(a=>a.slug===slug);
export const getArticleCategory=(slug:string)=>articleCategories.find(c=>c.slug===slug);
export function formatArticleDate(date:string):string{
 const d=new Date(date+"T12:00:00+07:00");
 return Number.isNaN(d.getTime())?date:new Intl.DateTimeFormat("id-ID",{day:"numeric",month:"long",year:"numeric",timeZone:"Asia/Jakarta"}).format(d);
}
