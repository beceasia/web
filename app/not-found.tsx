import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f7f9fc] px-6 text-center">
      <div className="max-w-xl rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-teal">bece.asia</p>
        <h1 className="mt-4 text-4xl font-black text-navy">Page not found</h1>
        <p className="mt-4 text-slate-600">The requested page is unavailable.</p>
        <Link href="/" className="mt-7 inline-flex rounded-2xl bg-navy px-5 py-3 text-sm font-black text-white">Return home</Link>
      </div>
    </main>
  );
}
