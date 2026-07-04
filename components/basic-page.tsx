export function BasicPage({ title, description, items }: { title: string; description: string; items: string[] }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-teal">bece.asia</p>
      <h1 className="mt-3 text-4xl font-black tracking-tight text-navy sm:text-5xl">{title}</h1>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{description}</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="rounded-3xl border border-slate-200 bg-white p-5 text-sm font-medium leading-6 text-slate-700 shadow-sm">{item}</div>
        ))}
      </div>
    </section>
  );
}
