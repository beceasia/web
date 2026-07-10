import { PageShell } from "@/components/page-shell";

export default function AttendanceWorkspacePage() {
  return (
    <PageShell locale="id" currentPath="/apps/attendance-workspace">
      <section className="min-h-screen bg-[#eef3f8] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-teal">Community App</p>
            <h1 className="mt-1 text-2xl font-black text-navy">Attendance Workspace</h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">Adaptasi aplikasi presensi umum dengan identitas organisasi dan nama personal yang disanitasi.</p>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <iframe
              title="Attendance Workspace"
              src="/api/presensi-source"
              className="h-[calc(100vh-150px)] min-h-[760px] w-full border-0"
              sandbox="allow-scripts allow-forms allow-modals allow-popups allow-downloads allow-same-origin"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
