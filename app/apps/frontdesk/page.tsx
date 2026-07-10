export default function FrontDeskPage() {
  return (
    <main className="h-screen w-screen overflow-hidden bg-slate-950">
      <iframe
        title="FrontDesk"
        src="/apps/frontdesk/standalone"
        className="h-full w-full border-0"
        referrerPolicy="no-referrer"
      />
    </main>
  );
}
