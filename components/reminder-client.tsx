"use client";

import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowDownToLine,
  BellRing,
  CheckCircle2,
  ClipboardList,
  Compass,
  Download,
  Eraser,
  Flame,
  Flower2,
  Gift,
  HeartHandshake,
  HelpCircle,
  Layers3,
  Leaf,
  Lightbulb,
  Plus,
  RefreshCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Sprout,
  Target,
  Upload,
  Wand2,
  XCircle,
} from "lucide-react";

type Domain = "Spiritual" | "Health" | "Family" | "Learning" | "Kindness" | "Order" | "Work";
type Frequency = "Daily" | "Weekdays" | "Weekly" | "Flexible";
type Energy = "Low" | "Medium" | "High";
type Mood = "Light" | "Calm" | "Neutral" | "Heavy";
type Tone = "safe" | "warning" | "danger" | "neutral" | "prime";

type Habit = {
  id: string;
  title: string;
  domain: Domain;
  identity: string;
  cue: string;
  time: string;
  action: string;
  tinyAction: string;
  reward: string;
  environment: string;
  friction: number;
  frequency: Frequency;
  createdAt: string;
};

type CheckIn = {
  id: string;
  habitId: string;
  date: string;
  done: boolean;
  mood: Mood;
  energy: Energy;
  note: string;
  createdAt: string;
};

type Reflection = {
  id: string;
  date: string;
  prompt: string;
  answer: string;
  createdAt: string;
};

type StoredData = {
  habits: Habit[];
  checkins: CheckIn[];
  reflections: Reflection[];
};

type EnrichedHabit = Habit & {
  todayDone: boolean;
  totalDone: number;
  streak: number;
  lastDone: string;
  score: number;
  nextNudge: string;
  ifThen: string;
  identitySignal: string;
};

const STORAGE_KEY = "beceasia:reminder-good-habits:v1";
const domains: Domain[] = ["Spiritual", "Health", "Family", "Learning", "Kindness", "Order", "Work"];
const frequencies: Frequency[] = ["Daily", "Weekdays", "Weekly", "Flexible"];
const moods: Mood[] = ["Light", "Calm", "Neutral", "Heavy"];
const energies: Energy[] = ["Low", "Medium", "High"];

const sampleHabits: Habit[] = [
  {
    id: "sample-kindness",
    title: "Satu kebaikan kecil",
    domain: "Kindness",
    identity: "Saya adalah orang yang mudah memberi manfaat kecil setiap hari.",
    cue: "Setelah membuka ponsel pertama kali",
    time: "Pagi",
    action: "Kirim satu pesan baik atau bantu satu orang dengan tindakan kecil.",
    tinyAction: "Tulis satu kalimat dukungan untuk seseorang.",
    reward: "Tarik napas dan catat bahwa hari ini sudah dimulai dengan manfaat.",
    environment: "Letakkan daftar 3 orang yang bisa disapa di catatan ponsel.",
    friction: 20,
    frequency: "Daily",
    createdAt: new Date().toISOString(),
  },
  {
    id: "sample-health",
    title: "Minum air sebelum kopi",
    domain: "Health",
    identity: "Saya merawat tubuh sebelum mengejar target.",
    cue: "Sebelum minum kopi atau teh",
    time: "Pagi",
    action: "Minum satu gelas air putih.",
    tinyAction: "Minum tiga teguk air.",
    reward: "Beri centang dan lanjutkan aktivitas tanpa rasa bersalah.",
    environment: "Siapkan botol air di meja sebelum tidur.",
    friction: 10,
    frequency: "Daily",
    createdAt: new Date().toISOString(),
  },
  {
    id: "sample-learning",
    title: "Baca satu halaman",
    domain: "Learning",
    identity: "Saya adalah pembelajar yang konsisten meskipun waktunya sempit.",
    cue: "Setelah makan malam",
    time: "Malam",
    action: "Baca minimal satu halaman buku atau catatan belajar.",
    tinyAction: "Baca satu paragraf saja.",
    reward: "Tulis satu ide yang bisa dipakai besok.",
    environment: "Taruh buku di tempat yang terlihat, bukan di rak tertutup.",
    friction: 35,
    frequency: "Daily",
    createdAt: new Date().toISOString(),
  },
];

function today() {
  return new Date().toISOString().split("T")[0];
}

function yesterday(date: string) {
  const value = new Date(`${date}T00:00:00`);
  value.setDate(value.getDate() - 1);
  return value.toISOString().split("T")[0];
}

function csvEscape(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

function textFromForm(form: FormData, key: string) {
  return String(form.get(key) || "").trim();
}

function numberFromForm(form: FormData, key: string) {
  return Math.min(100, Math.max(0, Number(form.get(key) || 0)));
}

function buildStreak(habitId: string, checkins: CheckIn[]) {
  const doneDates = new Set(checkins.filter((item) => item.habitId === habitId && item.done).map((item) => item.date));
  let cursor = today();
  let count = 0;
  while (doneDates.has(cursor)) {
    count += 1;
    cursor = yesterday(cursor);
  }
  return count;
}

function buildNextNudge(habit: Habit, todayDone: boolean) {
  if (todayDone) return "Jangan tambah beban. Pertahankan ritme kecil ini sampai terasa otomatis.";
  if (habit.friction >= 70) return `Turunkan ukuran aksi: cukup lakukan versi mini — ${habit.tinyAction}`;
  if (habit.environment.trim()) return `Atur lingkungan dulu: ${habit.environment}`;
  return `Mulai dari 2 menit: ${habit.tinyAction}`;
}

function enrichHabit(habit: Habit, checkins: CheckIn[]): EnrichedHabit {
  const own = checkins.filter((item) => item.habitId === habit.id && item.done);
  const todayDone = own.some((item) => item.date === today());
  const streak = buildStreak(habit.id, checkins);
  const totalDone = own.length;
  const lastDone = own[0]?.date ?? "-";
  const consistency = Math.min(100, totalDone * 8 + streak * 10);
  const score = Math.round(Math.max(0, Math.min(100, consistency - habit.friction * 0.35 + (todayDone ? 15 : 0))));
  return {
    ...habit,
    todayDone,
    totalDone,
    streak,
    lastDone,
    score,
    nextNudge: buildNextNudge(habit, todayDone),
    ifThen: `Jika ${habit.cue.toLowerCase()}, maka saya akan ${habit.tinyAction.toLowerCase()}.`,
    identitySignal: habit.identity || `Saya membangun identitas baik melalui ${habit.title.toLowerCase()}.`,
  };
}

function buildDailyBrief(habits: EnrichedHabit[]) {
  const undone = habits.filter((item) => !item.todayDone).sort((a, b) => a.friction - b.friction)[0];
  const done = habits.filter((item) => item.todayDone).length;
  if (!undone) return "Semua kebiasaan hari ini sudah selesai. Tutup hari dengan refleksi singkat, bukan menambah target baru.";
  return `Hari ini cukup mulai dari yang paling ringan: ${undone.tinyAction}. Progress: ${done}/${habits.length} kebiasaan selesai.`;
}

function toneClass(tone: Tone) {
  if (tone === "safe") return "bg-teal/10 text-teal ring-teal/20";
  if (tone === "danger") return "bg-rose-100 text-rose-700 ring-rose-200";
  if (tone === "warning") return "bg-amber-100 text-amber-700 ring-amber-200";
  if (tone === "prime") return "bg-violet-50 text-violet-700 ring-violet-200";
  return "bg-slate-100 text-slate-700 ring-slate-200";
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function ReminderClient() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [checkins, setCheckins] = useState<CheckIn[]>([]);
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as StoredData;
        setHabits(Array.isArray(parsed.habits) ? parsed.habits : []);
        setCheckins(Array.isArray(parsed.checkins) ? parsed.checkins : []);
        setReflections(Array.isArray(parsed.reflections) ? parsed.reflections : []);
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ habits, checkins, reflections }));
  }, [loaded, habits, checkins, reflections]);

  const enriched = useMemo(() => habits.map((habit) => enrichHabit(habit, checkins)), [habits, checkins]);
  const filtered = useMemo(() => {
    const keyword = query.toLowerCase();
    return enriched.filter((habit) => {
      const text = `${habit.title} ${habit.domain} ${habit.identity} ${habit.action} ${habit.tinyAction}`.toLowerCase();
      const matchText = !keyword || text.includes(keyword);
      const matchFilter = filter === "All" || habit.domain === filter || habit.frequency === filter || (filter === "Done Today" && habit.todayDone) || (filter === "Not Done" && !habit.todayDone);
      return matchText && matchFilter;
    });
  }, [enriched, query, filter]);

  const selected = enriched.find((item) => item.id === selectedId) ?? filtered[0] ?? enriched[0];

  const summary = useMemo(() => {
    const total = enriched.length;
    const doneToday = enriched.filter((item) => item.todayDone).length;
    const bestStreak = Math.max(0, ...enriched.map((item) => item.streak));
    const actions = checkins.filter((item) => item.done).length;
    const avgScore = total === 0 ? 0 : Math.round(enriched.reduce((sum, item) => sum + item.score, 0) / total);
    const highFriction = enriched.filter((item) => item.friction >= 70).length;
    const domainsCount = new Set(enriched.map((item) => item.domain)).size;
    return { total, doneToday, bestStreak, actions, avgScore, highFriction, domainsCount };
  }, [enriched, checkins]);

  function addHabit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const action = textFromForm(form, "action") || "Lakukan satu kebaikan kecil.";
    const habit: Habit = {
      id: crypto.randomUUID(),
      title: textFromForm(form, "title") || "Reminder kebaikan baru",
      domain: textFromForm(form, "domain") as Domain,
      identity: textFromForm(form, "identity") || "Saya adalah orang yang membangun kebaikan kecil secara konsisten.",
      cue: textFromForm(form, "cue") || "Setelah membuka hari",
      time: textFromForm(form, "time") || "Hari ini",
      action,
      tinyAction: textFromForm(form, "tinyAction") || action,
      reward: textFromForm(form, "reward") || "Beri centang dan ucapkan cukup untuk hari ini.",
      environment: textFromForm(form, "environment"),
      friction: numberFromForm(form, "friction"),
      frequency: textFromForm(form, "frequency") as Frequency,
      createdAt: new Date().toISOString(),
    };
    setHabits((previous) => [habit, ...previous]);
    setSelectedId(habit.id);
    event.currentTarget.reset();
  }

  function checkIn(habitId: string, done: boolean, mood: Mood = "Calm", energy: Energy = "Medium", note = "") {
    const currentDate = today();
    setCheckins((previous) => {
      const withoutToday = previous.filter((item) => !(item.habitId === habitId && item.date === currentDate));
      return [{ id: crypto.randomUUID(), habitId, date: currentDate, done, mood, energy, note, createdAt: new Date().toISOString() }, ...withoutToday];
    });
  }

  function addReflection(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const answer = textFromForm(form, "answer");
    if (!answer) return;
    setReflections((previous) => [{ id: crypto.randomUUID(), date: today(), prompt: textFromForm(form, "prompt") || "Apa kebaikan kecil hari ini?", answer, createdAt: new Date().toISOString() }, ...previous]);
    event.currentTarget.reset();
  }

  function removeHabit(id: string) {
    setHabits((previous) => previous.filter((item) => item.id !== id));
    setCheckins((previous) => previous.filter((item) => item.habitId !== id));
    if (selectedId === id) setSelectedId(null);
  }

  function loadSample() {
    setHabits(sampleHabits);
    setCheckins([]);
    setReflections([]);
    setSelectedId(sampleHabits[0]?.id ?? null);
  }

  function clearWorkspace() {
    setHabits([]);
    setCheckins([]);
    setReflections([]);
    setSelectedId(null);
    window.localStorage.removeItem(STORAGE_KEY);
  }

  function exportJson() {
    downloadBlob(new Blob([JSON.stringify({ habits, checkins, reflections }, null, 2)], { type: "application/json" }), "reminder-good-habits.json");
  }

  function exportCsv() {
    const header = ["Date", "Habit", "Domain", "Done", "Mood", "Energy", "Note"];
    const rows = checkins.map((item) => {
      const habit = habits.find((h) => h.id === item.habitId);
      return [item.date, habit?.title ?? item.habitId, habit?.domain ?? "-", item.done ? "Yes" : "No", item.mood, item.energy, item.note];
    });
    const csv = [header, ...rows].map((row) => row.map(csvEscape).join(",")).join("\n");
    downloadBlob(new Blob([csv], { type: "text/csv;charset=utf-8" }), "reminder-checkins.csv");
  }

  function importJson(file: File | undefined) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as StoredData;
        setHabits(Array.isArray(parsed.habits) ? parsed.habits : []);
        setCheckins(Array.isArray(parsed.checkins) ? parsed.checkins : []);
        setReflections(Array.isArray(parsed.reflections) ? parsed.reflections : []);
      } catch {
        alert("File JSON tidak dapat dibaca.");
      }
    };
    reader.readAsText(file);
  }

  async function copyPlan() {
    if (!selected) return;
    const text = [`Reminder: ${selected.title}`, `Identity: ${selected.identitySignal}`, `If-Then: ${selected.ifThen}`, `Tiny action: ${selected.tinyAction}`, `Reward: ${selected.reward}`, `Next nudge: ${selected.nextNudge}`].join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <section className="min-h-screen bg-[#eef3f8] px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <Header />

        <div className="grid gap-4 lg:grid-cols-7">
          <MetricCard icon={ClipboardList} label="Reminders" value={`${summary.total}`} tone="neutral" />
          <MetricCard icon={CheckCircle2} label="Today" value={`${summary.doneToday}/${summary.total}`} tone={summary.doneToday === summary.total && summary.total > 0 ? "safe" : "warning"} />
          <MetricCard icon={Flame} label="Best streak" value={`${summary.bestStreak}`} tone="prime" />
          <MetricCard icon={HeartHandshake} label="Good actions" value={`${summary.actions}`} tone="safe" />
          <MetricCard icon={Target} label="Avg score" value={`${summary.avgScore}`} tone={summary.avgScore >= 70 ? "safe" : summary.avgScore >= 45 ? "warning" : "danger"} />
          <MetricCard icon={XCircle} label="Friction" value={`${summary.highFriction}`} tone={summary.highFriction === 0 ? "safe" : "danger"} />
          <MetricCard icon={Compass} label="Domains" value={`${summary.domainsCount}`} tone="neutral" />
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <Panel title="Daily Goodness Command" icon={BellRing}>
            <DailyCommand selected={selected} brief={buildDailyBrief(enriched)} onDone={() => selected && checkIn(selected.id, true)} onTiny={() => selected && checkIn(selected.id, true, "Light", "Low", "Tiny version completed")} onCopy={copyPlan} copied={copied} />
          </Panel>
          <Panel title="Buat Reminder Baru" icon={Plus}>
            <HabitForm onSubmit={addHabit} />
          </Panel>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Panel title="Reminder Workspace" icon={Sprout}>
            <Toolbar query={query} setQuery={setQuery} filter={filter} setFilter={setFilter} loadSample={loadSample} exportJson={exportJson} exportCsv={exportCsv} importJson={importJson} clearWorkspace={clearWorkspace} />
            {filtered.length === 0 ? <EmptyState title="Belum ada reminder" description="Muat contoh atau buat reminder kebaikan kecil yang bisa dilakukan hari ini." /> : <HabitTable habits={filtered} selectedId={selected?.id ?? null} onSelect={setSelectedId} onDone={(id) => checkIn(id, true)} onSkip={(id) => checkIn(id, false, "Heavy", "Low", "Skipped intentionally")} onRemove={removeHabit} />}
          </Panel>

          <Panel title="Reflection Loop" icon={Flower2}>
            <ReflectionPanel onSubmit={addReflection} reflections={reflections} />
          </Panel>
        </div>
      </div>
    </section>
  );
}

function Header() {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.28em] text-teal">Good Habits OS</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-navy sm:text-5xl">Reminder</h1>
          <p className="mt-4 max-w-4xl text-base leading-7 text-slate-600">Aplikasi pengingat kebaikan harian berbasis micro-habit: mulai dari aksi 2 menit, susun pemicu, kurangi friksi, beri reward kecil, lalu bangun identitas baik secara konsisten.</p>
        </div>
        <span className="rounded-full border border-violet-200 bg-violet-50 px-4 py-1 text-xs font-bold text-violet-700">Kindness Reminder</span>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <InfoCard label="Prinsip" value="Cue · Tiny Action · Reward" />
        <InfoCard label="Fokus" value="Kebaikan kecil harian" />
        <InfoCard label="Storage" value="Local browser only" />
      </div>
      <div className="mt-8 rounded-3xl border border-teal/20 bg-teal/5 p-5 text-sm leading-6 text-slate-700">
        <div className="flex gap-3"><ShieldCheck className="mt-0.5 shrink-0 text-teal" size={19} /><p>Tool ini terinspirasi prinsip umum pembentukan kebiasaan kecil dan bukan produk resmi, ringkasan resmi, atau pengganti buku apa pun. Data tersimpan lokal di browser.</p></div>
      </div>
    </div>
  );
}

function DailyCommand({ selected, brief, onDone, onTiny, onCopy, copied }: { selected?: EnrichedHabit; brief: string; onDone: () => void; onTiny: () => void; onCopy: () => void; copied: boolean }) {
  if (!selected) return <EmptyState title="Belum ada fokus hari ini" description="Tambahkan reminder pertama untuk membangun loop kebaikan harian." />;
  return (
    <div className="space-y-5">
      <div className="rounded-3xl bg-gradient-to-br from-navy to-slate-900 p-6 text-white">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div><p className="text-xs font-black uppercase tracking-[0.22em] text-teal">Today focus</p><h2 className="mt-2 text-3xl font-black">{selected.title}</h2><p className="mt-2 text-sm leading-6 text-slate-300">{selected.domain} · streak {selected.streak} · score {selected.score}</p></div>
          <span className={`rounded-full px-3 py-1 text-xs font-black ring-1 ${selected.todayDone ? toneClass("safe") : toneClass("warning")}`}>{selected.todayDone ? "Done today" : "Need tiny start"}</span>
        </div>
        <p className="mt-5 rounded-2xl bg-white/10 p-4 text-sm leading-6 text-slate-100">{brief}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3"><InfoPill label="Identity" value={selected.identitySignal} /><InfoPill label="If-then plan" value={selected.ifThen} /><InfoPill label="Reward" value={selected.reward} /></div>
      <div className="rounded-3xl border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-700"><p className="font-black text-navy">Next nudge</p><p className="mt-2">{selected.nextNudge}</p><p className="mt-4 font-black text-navy">Environment design</p><p className="mt-2">{selected.environment || "Belum ada. Buat tindakan baik terlihat, mudah, dan dekat dengan rutinitas yang sudah ada."}</p></div>
      <div className="grid gap-3 sm:grid-cols-3"><button onClick={onTiny} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-teal px-5 py-3 text-sm font-black text-white"><Leaf size={18} /> Selesai versi mini</button><button onClick={onDone} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-navy px-5 py-3 text-sm font-black text-white"><CheckCircle2 size={18} /> Tandai selesai</button><button onClick={onCopy} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-black text-navy ring-1 ring-slate-200"><Wand2 size={18} /> {copied ? "Plan tersalin" : "Salin plan"}</button></div>
    </div>
  );
}

function HabitForm({ onSubmit }: { onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2"><TextInput name="title" label="Nama reminder" placeholder="Contoh: Satu kebaikan kecil" /><SelectText name="domain" label="Domain" options={domains} defaultValue="Kindness" /><SelectText name="frequency" label="Frekuensi" options={frequencies} defaultValue="Daily" /><TextInput name="time" label="Waktu" placeholder="Pagi / Siang / Malam" /></div>
      <TextArea name="identity" label="Identitas yang ingin dibangun" placeholder="Saya adalah orang yang ..." />
      <TextArea name="cue" label="Pemicu / habit stack" placeholder="Setelah saya ... maka saya akan ..." />
      <TextArea name="action" label="Aksi utama" placeholder="Aksi baik yang ingin dibangun" />
      <TextArea name="tinyAction" label="Versi 2 menit" placeholder="Versi paling kecil saat sedang lelah" />
      <TextArea name="reward" label="Reward kecil" placeholder="Cara memberi rasa selesai setelah aksi" />
      <TextArea name="environment" label="Desain lingkungan" placeholder="Apa yang perlu diletakkan, disiapkan, atau disingkirkan?" />
      <ScoreInput name="friction" label="Friction 0-100" defaultValue={25} />
      <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-navy px-5 py-3 text-sm font-black text-white transition hover:bg-navy-light"><Plus size={18} /> Tambah reminder</button>
    </form>
  );
}

function Toolbar({ query, setQuery, filter, setFilter, loadSample, exportJson, exportCsv, importJson, clearWorkspace }: { query: string; setQuery: (value: string) => void; filter: string; setFilter: (value: string) => void; loadSample: () => void; exportJson: () => void; exportCsv: () => void; importJson: (file: File | undefined) => void; clearWorkspace: () => void }) {
  return (
    <div className="mb-5 flex flex-wrap items-center gap-3">
      <div className="relative min-w-[240px] flex-1"><Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari reminder, identitas, aksi" className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm font-medium outline-none ring-teal/20 focus:ring-4" /></div>
      <select value={filter} onChange={(event) => setFilter(event.target.value)} className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-navy outline-none ring-teal/20 focus:ring-4"><option>All</option>{domains.map((item) => <option key={item}>{item}</option>)}{frequencies.map((item) => <option key={item}>{item}</option>)}<option>Done Today</option><option>Not Done</option></select>
      <button onClick={loadSample} className="inline-flex items-center gap-2 rounded-full bg-teal px-4 py-2.5 text-sm font-bold text-white"><Layers3 size={16} /> Contoh</button>
      <button onClick={exportJson} className="inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2.5 text-sm font-bold text-white"><Download size={16} /> JSON</button>
      <button onClick={exportCsv} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-navy ring-1 ring-slate-200"><ArrowDownToLine size={16} /> CSV</button>
      <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-navy ring-1 ring-slate-200"><Upload size={16} /> Import<input type="file" accept="application/json" className="hidden" onChange={(event) => importJson(event.target.files?.[0])} /></label>
      <button onClick={clearWorkspace} className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2.5 text-sm font-bold text-rose-700 ring-1 ring-rose-100"><Eraser size={16} /> Bersihkan</button>
    </div>
  );
}

function HabitTable({ habits, selectedId, onSelect, onDone, onSkip, onRemove }: { habits: EnrichedHabit[]; selectedId: string | null; onSelect: (id: string) => void; onDone: (id: string) => void; onSkip: (id: string) => void; onRemove: (id: string) => void }) {
  return <div className="overflow-hidden rounded-3xl border border-slate-200"><div className="overflow-x-auto"><table className="min-w-full divide-y divide-slate-200 text-sm"><thead className="bg-slate-50 text-left text-xs font-black uppercase tracking-[0.16em] text-slate-400"><tr><th className="px-4 py-3">Reminder</th><th className="px-4 py-3">Loop</th><th className="px-4 py-3">Score</th><th className="px-4 py-3">Today</th><th className="px-4 py-3">Action</th></tr></thead><tbody className="divide-y divide-slate-100 bg-white">{habits.map((habit) => <tr key={habit.id} className={selectedId === habit.id ? "bg-teal/5" : ""}><td className="px-4 py-4 align-top"><button onClick={() => onSelect(habit.id)} className="text-left"><p className="font-black text-navy">{habit.title}</p><p className="mt-1 max-w-md text-xs leading-5 text-slate-500">{habit.identitySignal}</p></button></td><td className="px-4 py-4 align-top text-xs text-slate-600">{habit.cue}<br />→ {habit.tinyAction}</td><td className="px-4 py-4 align-top"><span className={`rounded-full px-3 py-1 text-xs font-black ring-1 ${toneClass(habit.score >= 70 ? "safe" : habit.score >= 45 ? "warning" : "danger")}`}>{habit.score} · streak {habit.streak}</span></td><td className="px-4 py-4 align-top"><span className={`rounded-full px-3 py-1 text-xs font-bold ring-1 ${habit.todayDone ? toneClass("safe") : toneClass("warning")}`}>{habit.todayDone ? "Done" : "Open"}</span></td><td className="px-4 py-4 align-top"><div className="flex flex-wrap gap-2"><button onClick={() => onDone(habit.id)} className="rounded-full bg-teal px-3 py-1.5 text-xs font-bold text-white">Done</button><button onClick={() => onSkip(habit.id)} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700">Skip</button><button onClick={() => onRemove(habit.id)} className="rounded-full bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700">Hapus</button></div></td></tr>)}</tbody></table></div></div>;
}

function ReflectionPanel({ onSubmit, reflections }: { onSubmit: (event: FormEvent<HTMLFormElement>) => void; reflections: Reflection[] }) {
  return <div className="space-y-5"><form onSubmit={onSubmit} className="grid gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4"><SelectText name="prompt" label="Prompt refleksi" options={["Apa kebaikan kecil hari ini?", "Apa yang membuat kebiasaan hari ini terasa mudah?", "Apa friksi yang perlu dikurangi besok?", "Siapa yang merasakan manfaat dari aksi kecil hari ini?"]} defaultValue="Apa kebaikan kecil hari ini?" /><TextArea name="answer" label="Jawaban" placeholder="Tulis 1-3 kalimat saja." /><button type="submit" className="rounded-2xl bg-navy px-4 py-3 text-sm font-black text-white">Simpan refleksi</button></form><div className="space-y-3">{reflections.length === 0 ? <EmptyState title="Belum ada refleksi" description="Refleksi singkat membuat kebaikan kecil lebih terasa dan lebih mudah diulang." /> : reflections.slice(0, 8).map((item) => <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4"><p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">{item.date}</p><p className="mt-2 font-black text-navy">{item.prompt}</p><p className="mt-2 text-sm leading-6 text-slate-600">{item.answer}</p></div>)}</div></div>;
}

function Panel({ title, icon: Icon, children }: { title: string; icon: LucideIcon; children: ReactNode }) {
  return <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm"><div className="mb-5 flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-2xl bg-teal/10 text-teal"><Icon size={20} /></div><h2 className="text-xl font-black text-navy">{title}</h2></div>{children}</div>;
}

function MetricCard({ icon: Icon, label, value, tone }: { icon: LucideIcon; label: string; value: string; tone: Tone }) {
  const background = tone === "safe" ? "bg-teal/10 text-teal" : tone === "danger" ? "bg-rose-50 text-rose-700" : tone === "warning" ? "bg-amber-50 text-amber-700" : tone === "prime" ? "bg-violet-50 text-violet-700" : "bg-slate-100 text-navy";
  return <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><div className={`grid h-11 w-11 place-items-center rounded-2xl ${background}`}><Icon size={21} /></div><p className="mt-4 text-sm font-semibold text-slate-500">{label}</p><p className="mt-2 text-xl font-black text-navy">{value}</p></div>;
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">{label}</p><p className="mt-2 font-black text-navy">{value}</p></div>;
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return <div className="rounded-2xl bg-slate-50 p-4"><p className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">{label}</p><p className="mt-2 text-sm font-bold leading-6 text-navy">{value}</p></div>;
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center"><HelpCircle className="mx-auto text-slate-400" size={32} /><h3 className="mt-3 text-lg font-black text-navy">{title}</h3><p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600">{description}</p></div>;
}

function TextInput({ name, label, placeholder, type = "text" }: { name: string; label: string; placeholder?: string; type?: string }) {
  return <label className="space-y-2 text-sm font-semibold text-slate-700"><span>{label}</span><input name={name} type={type} placeholder={placeholder} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-teal/20 focus:ring-4" /></label>;
}

function TextArea({ name, label, placeholder }: { name: string; label: string; placeholder?: string }) {
  return <label className="space-y-2 text-sm font-semibold text-slate-700"><span>{label}</span><textarea name={name} rows={3} placeholder={placeholder} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-teal/20 focus:ring-4" /></label>;
}

function SelectText<T extends string>({ name, label, options, defaultValue }: { name: string; label: string; options: readonly T[]; defaultValue?: T }) {
  return <label className="space-y-2 text-sm font-semibold text-slate-700"><span>{label}</span><select name={name} defaultValue={defaultValue ?? options[0]} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-teal/20 focus:ring-4">{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>;
}

function ScoreInput({ name, label, defaultValue }: { name: string; label: string; defaultValue: number }) {
  return <label className="space-y-2 text-sm font-semibold text-slate-700"><span>{label}</span><input name={name} type="number" min="0" max="100" defaultValue={defaultValue} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-teal/20 focus:ring-4" /></label>;
}
