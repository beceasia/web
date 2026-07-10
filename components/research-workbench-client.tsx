"use client";

import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowDownToLine,
  BarChart3,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  ClipboardList,
  Download,
  Eraser,
  FileSpreadsheet,
  FileText,
  HelpCircle,
  Layers3,
  Lightbulb,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Trash2,
  Upload,
} from "lucide-react";

type ResearchType = "Desk Research" | "Qualitative" | "Quantitative" | "Mixed Methods" | "Policy Review" | "Market Research" | "Legal Review" | "Impact Study";
type Stage = "Idea" | "Scoping" | "Data Collection" | "Analysis" | "Drafting" | "Review" | "Publication";
type Status = "Draft" | "Active" | "Need Review" | "At Risk" | "Completed";
type Priority = "Low" | "Normal" | "High" | "Critical";
type SourceType = "Journal" | "Book" | "Report" | "Dataset" | "Interview" | "Regulation" | "News" | "Website" | "Observation";
type EvidenceStrength = "Weak" | "Moderate" | "Strong";
type Tone = "safe" | "warning" | "danger" | "neutral" | "prime";

type Project = {
  id: string;
  title: string;
  domain: string;
  type: ResearchType;
  stage: Stage;
  status: Status;
  priority: Priority;
  owner: string;
  question: string;
  objective: string;
  method: string;
  scope: string;
  dataPlan: string;
  ethics: string;
  dueDate: string;
  createdAt: string;
};

type Source = {
  id: string;
  projectId: string;
  title: string;
  type: SourceType;
  author: string;
  year: string;
  url: string;
  summary: string;
  keyFinding: string;
  credibility: number;
  relevance: number;
  biasRisk: number;
  tags: string;
  createdAt: string;
};

type Evidence = {
  id: string;
  projectId: string;
  claim: string;
  evidence: string;
  sourceLabel: string;
  strength: EvidenceStrength;
  implication: string;
  contradiction: string;
  theme: string;
  createdAt: string;
};

type Insight = {
  id: string;
  projectId: string;
  title: string;
  finding: string;
  recommendation: string;
  confidence: number;
  nextAction: string;
  createdAt: string;
};

type StoredData = {
  projects: Project[];
  sources: Source[];
  evidence: Evidence[];
  insights: Insight[];
};

type EnrichedProject = Project & {
  sourceCount: number;
  evidenceCount: number;
  insightCount: number;
  avgCredibility: number;
  avgRelevance: number;
  evidenceScore: number;
  readinessScore: number;
  gaps: string[];
  quickWin: string;
  overdue: boolean;
};

const STORAGE_KEY = "beceasia:research-workbench:v2";
const researchTypes: ResearchType[] = ["Desk Research", "Qualitative", "Quantitative", "Mixed Methods", "Policy Review", "Market Research", "Legal Review", "Impact Study"];
const stages: Stage[] = ["Idea", "Scoping", "Data Collection", "Analysis", "Drafting", "Review", "Publication"];
const statuses: Status[] = ["Draft", "Active", "Need Review", "At Risk", "Completed"];
const priorities: Priority[] = ["Low", "Normal", "High", "Critical"];
const sourceTypes: SourceType[] = ["Journal", "Book", "Report", "Dataset", "Interview", "Regulation", "News", "Website", "Observation"];
const strengths: EvidenceStrength[] = ["Weak", "Moderate", "Strong"];

const sampleProject: Project = {
  id: "sample-project-1",
  title: "Kajian Efektivitas Program Pendampingan Digital",
  domain: "Learning, public innovation, and program evaluation",
  type: "Mixed Methods",
  stage: "Analysis",
  status: "Active",
  priority: "High",
  owner: "Research Lead",
  question: "Faktor apa yang paling memengaruhi keberhasilan program pendampingan digital?",
  objective: "Mengidentifikasi faktor pendorong, hambatan, dan rekomendasi perbaikan program.",
  method: "Desk review, wawancara berlabel anonim, analisis evidence program, dan sintesis tematik.",
  scope: "Program pembelajaran digital berbasis cohort dalam periode simulasi.",
  dataPlan: "Kumpulkan sumber sekunder, catatan wawancara, log evidence, dan ringkasan capaian per tahap.",
  ethics: "Gunakan label anonim, hindari data pribadi, dan pisahkan dokumen sensitif dari workspace publik.",
  dueDate: "",
  createdAt: new Date().toISOString(),
};

const sampleSources: Source[] = [
  {
    id: "sample-source-1",
    projectId: "sample-project-1",
    title: "Program Evaluation Methods: Practical Guide",
    type: "Report",
    author: "Public Reference",
    year: "2025",
    url: "https://example.com/program-evaluation",
    summary: "Panduan umum untuk menilai output, outcome, dan bukti implementasi program.",
    keyFinding: "Program dengan indikator dan evidence berkala lebih mudah dievaluasi.",
    credibility: 82,
    relevance: 88,
    biasRisk: 20,
    tags: "evaluation, program, evidence",
    createdAt: new Date().toISOString(),
  },
  {
    id: "sample-source-2",
    projectId: "sample-project-1",
    title: "Interview Note - Mentor A",
    type: "Interview",
    author: "Informant Label A",
    year: "2026",
    url: "",
    summary: "Mentor menilai peserta lebih cepat berkembang saat tugas mingguan dibuat kecil dan terukur.",
    keyFinding: "Weekly deliverables memperbaiki ritme pembelajaran dan kualitas bukti.",
    credibility: 70,
    relevance: 92,
    biasRisk: 35,
    tags: "interview, mentor, learning",
    createdAt: new Date().toISOString(),
  },
];

const sampleEvidence: Evidence[] = [
  {
    id: "sample-evidence-1",
    projectId: "sample-project-1",
    claim: "Evidence mingguan meningkatkan keterlacakan progres.",
    evidence: "Log program menunjukkan peningkatan kepatuhan submit setelah format evidence disederhanakan.",
    sourceLabel: "Program log and mentor note",
    strength: "Strong",
    implication: "Dashboard monitoring perlu menampilkan evidence completion sebagai indikator utama.",
    contradiction: "Sebagian peserta tetap lambat saat jadwal mentoring tidak konsisten.",
    theme: "Evidence quality",
    createdAt: new Date().toISOString(),
  },
];

const sampleInsights: Insight[] = [
  {
    id: "sample-insight-1",
    projectId: "sample-project-1",
    title: "Evidence quality as leading indicator",
    finding: "Kualitas dan konsistensi bukti lebih cepat menunjukkan risiko program dibanding penilaian akhir.",
    recommendation: "Gunakan weekly evidence checklist dan review singkat per tim setiap minggu.",
    confidence: 78,
    nextAction: "Tambahkan wawancara peserta dan bandingkan dengan log tugas.",
    createdAt: new Date().toISOString(),
  },
];

function clamp(value: number, min = 0, max = 100) {
  return Math.min(max, Math.max(min, Number(value) || 0));
}

function safeAverage(values: number[]) {
  if (values.length === 0) return 0;
  return Math.round(values.reduce((sum, item) => sum + item, 0) / values.length);
}

function textFromForm(form: FormData, key: string) {
  return String(form.get(key) || "").trim();
}

function numberFromForm(form: FormData, key: string) {
  return clamp(Number(form.get(key) || 0));
}

function todayIso() {
  return new Date().toISOString().split("T")[0];
}

function csvEscape(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

function strengthScore(value: EvidenceStrength) {
  if (value === "Strong") return 100;
  if (value === "Moderate") return 65;
  return 35;
}

function readinessLabel(score: number) {
  if (score >= 85) return { label: "Publication Ready", badge: "bg-violet-50 text-violet-700 ring-violet-200", tone: "prime" as Tone };
  if (score >= 70) return { label: "Strong Draft", badge: "bg-teal/10 text-teal ring-teal/20", tone: "safe" as Tone };
  if (score >= 55) return { label: "Needs Triangulation", badge: "bg-amber-100 text-amber-700 ring-amber-200", tone: "warning" as Tone };
  if (score >= 40) return { label: "Research Gap", badge: "bg-orange-100 text-orange-700 ring-orange-200", tone: "warning" as Tone };
  return { label: "Concept Stage", badge: "bg-rose-100 text-rose-700 ring-rose-200", tone: "danger" as Tone };
}

function buildGaps(project: Project, sources: Source[], evidence: Evidence[], insights: Insight[]) {
  const gaps: string[] = [];
  if (!project.question.trim()) gaps.push("Research question");
  if (!project.method.trim()) gaps.push("Methodology");
  if (!project.scope.trim()) gaps.push("Scope boundary");
  if (sources.length < 3) gaps.push("Source diversity");
  if (evidence.length < 3) gaps.push("Evidence matrix");
  if (insights.length < 1) gaps.push("Insight synthesis");
  if (safeAverage(sources.map((item) => item.credibility)) < 65) gaps.push("Source credibility");
  if (!sources.some((item) => item.type === "Interview" || item.type === "Dataset" || item.type === "Observation")) gaps.push("Primary or field signal");
  return gaps;
}

function buildQuickWin(gaps: string[]) {
  if (gaps.includes("Research question")) return "Rumuskan satu pertanyaan utama dan dua sub-pertanyaan yang bisa dijawab dengan data tersedia.";
  if (gaps.includes("Source diversity")) return "Tambahkan minimal satu sumber akademik, satu data/dokumen, dan satu sumber lapangan atau wawancara.";
  if (gaps.includes("Evidence matrix")) return "Ubah catatan sumber menjadi claim, evidence, contradiction, dan implication.";
  if (gaps.includes("Primary or field signal")) return "Tambahkan wawancara anonim, observasi, atau dataset sebagai pembanding desk research.";
  if (gaps.includes("Insight synthesis")) return "Tulis satu temuan awal, rekomendasi, confidence score, dan next action.";
  return "Lanjutkan analisis dan siapkan outline laporan berbasis temuan utama.";
}

function enrich(project: Project, allSources: Source[], allEvidence: Evidence[], allInsights: Insight[]): EnrichedProject {
  const sources = allSources.filter((item) => item.projectId === project.id);
  const evidence = allEvidence.filter((item) => item.projectId === project.id);
  const insights = allInsights.filter((item) => item.projectId === project.id);
  const avgCredibility = safeAverage(sources.map((item) => item.credibility));
  const avgRelevance = safeAverage(sources.map((item) => item.relevance));
  const evidenceScore = safeAverage(evidence.map((item) => strengthScore(item.strength)));
  const structureScore = [project.question, project.objective, project.method, project.scope, project.dataPlan].filter(Boolean).length * 12;
  const readinessScore = Math.round(clamp(
    avgCredibility * 0.22 +
    avgRelevance * 0.18 +
    evidenceScore * 0.22 +
    Math.min(100, sources.length * 18) * 0.12 +
    Math.min(100, evidence.length * 16) * 0.12 +
    Math.min(100, insights.length * 28) * 0.08 +
    structureScore * 0.06,
  ));
  const gaps = buildGaps(project, sources, evidence, insights);
  return {
    ...project,
    sourceCount: sources.length,
    evidenceCount: evidence.length,
    insightCount: insights.length,
    avgCredibility,
    avgRelevance,
    evidenceScore,
    readinessScore,
    gaps,
    quickWin: buildQuickWin(gaps),
    overdue: Boolean(project.dueDate && project.dueDate < todayIso() && project.status !== "Completed"),
  };
}

function buildBrief(project: EnrichedProject, sources: Source[], evidence: Evidence[], insights: Insight[]) {
  const ps = sources.filter((item) => item.projectId === project.id);
  const pe = evidence.filter((item) => item.projectId === project.id);
  const pi = insights.filter((item) => item.projectId === project.id);
  return [
    `Research: ${project.title}`,
    `Domain: ${project.domain}`,
    `Type: ${project.type}`,
    `Stage: ${project.stage}`,
    `Question: ${project.question || "Not set"}`,
    `Readiness: ${project.readinessScore} - ${readinessLabel(project.readinessScore).label}`,
    `Sources: ${ps.length}, Evidence: ${pe.length}, Insights: ${pi.length}`,
    `Gaps: ${project.gaps.join(", ") || "No major gap"}`,
    `Quick win: ${project.quickWin}`,
    `Latest insight: ${pi[0]?.finding || "No insight yet"}`,
  ].join("\n");
}

function buildMarkdown(project: EnrichedProject, sources: Source[], evidence: Evidence[], insights: Insight[]) {
  const ps = sources.filter((item) => item.projectId === project.id);
  const pe = evidence.filter((item) => item.projectId === project.id);
  const pi = insights.filter((item) => item.projectId === project.id);
  return `# ${project.title}\n\n## Research Brief\n\n- Domain: ${project.domain}\n- Type: ${project.type}\n- Stage: ${project.stage}\n- Readiness: ${project.readinessScore} (${readinessLabel(project.readinessScore).label})\n\n## Research Question\n\n${project.question || "Not set"}\n\n## Objective\n\n${project.objective || "Not set"}\n\n## Methodology\n\n${project.method || "Not set"}\n\n## Scope\n\n${project.scope || "Not set"}\n\n## Evidence Matrix\n\n${pe.map((item, index) => `${index + 1}. **${item.claim}**\n   - Evidence: ${item.evidence}\n   - Strength: ${item.strength}\n   - Implication: ${item.implication}\n   - Contradiction: ${item.contradiction || "-"}`).join("\n\n") || "No evidence yet."}\n\n## Sources\n\n${ps.map((item, index) => `${index + 1}. ${item.title} (${item.type}, ${item.year || "n.d."}) - ${item.keyFinding || item.summary}`).join("\n") || "No sources yet."}\n\n## Insights\n\n${pi.map((item, index) => `${index + 1}. **${item.title}**\n   - Finding: ${item.finding}\n   - Recommendation: ${item.recommendation}\n   - Confidence: ${item.confidence}`).join("\n\n") || "No insights yet."}\n`;
}

export function ResearchWorkbenchClient() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [evidence, setEvidence] = useState<Evidence[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
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
        setProjects(Array.isArray(parsed.projects) ? parsed.projects : []);
        setSources(Array.isArray(parsed.sources) ? parsed.sources : []);
        setEvidence(Array.isArray(parsed.evidence) ? parsed.evidence : []);
        setInsights(Array.isArray(parsed.insights) ? parsed.insights : []);
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ projects, sources, evidence, insights }));
  }, [loaded, projects, sources, evidence, insights]);

  const enriched = useMemo(() => projects.map((project) => enrich(project, sources, evidence, insights)), [projects, sources, evidence, insights]);
  const selected = enriched.find((item) => item.id === selectedId) ?? enriched[0];
  const selectedSources = selected ? sources.filter((item) => item.projectId === selected.id) : [];
  const selectedEvidence = selected ? evidence.filter((item) => item.projectId === selected.id) : [];
  const selectedInsights = selected ? insights.filter((item) => item.projectId === selected.id) : [];

  const filtered = useMemo(() => {
    const keyword = query.toLowerCase();
    return enriched.filter((item) => {
      const text = `${item.title} ${item.domain} ${item.question} ${item.owner}`.toLowerCase();
      const matchText = !keyword || text.includes(keyword);
      const matchFilter = filter === "All" || item.type === filter || item.stage === filter || item.status === filter || item.priority === filter || readinessLabel(item.readinessScore).label === filter;
      return matchText && matchFilter;
    });
  }, [enriched, query, filter]);

  const summary = useMemo(() => {
    const total = enriched.length;
    const avg = safeAverage(enriched.map((item) => item.readinessScore));
    const active = enriched.filter((item) => item.status === "Active" || item.status === "Need Review").length;
    const atRisk = enriched.filter((item) => item.status === "At Risk" || item.overdue || item.readinessScore < 55).length;
    const topGap = total === 0 ? "-" : [
      ["Question", enriched.filter((item) => item.gaps.includes("Research question")).length],
      ["Sources", enriched.filter((item) => item.gaps.includes("Source diversity")).length],
      ["Evidence", enriched.filter((item) => item.gaps.includes("Evidence matrix")).length],
      ["Insights", enriched.filter((item) => item.gaps.includes("Insight synthesis")).length],
    ].sort((a, b) => Number(b[1]) - Number(a[1]))[0][0] as string;
    return { total, avg, active, atRisk, sourceTotal: sources.length, evidenceTotal: evidence.length, topGap };
  }, [enriched, sources.length, evidence.length]);

  function addProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const project: Project = {
      id: crypto.randomUUID(),
      title: textFromForm(form, "title") || "Untitled Research",
      domain: textFromForm(form, "domain") || "General research",
      type: textFromForm(form, "type") as ResearchType,
      stage: textFromForm(form, "stage") as Stage,
      status: textFromForm(form, "status") as Status,
      priority: textFromForm(form, "priority") as Priority,
      owner: textFromForm(form, "owner") || "Researcher",
      question: textFromForm(form, "question"),
      objective: textFromForm(form, "objective"),
      method: textFromForm(form, "method"),
      scope: textFromForm(form, "scope"),
      dataPlan: textFromForm(form, "dataPlan"),
      ethics: textFromForm(form, "ethics"),
      dueDate: textFromForm(form, "dueDate"),
      createdAt: new Date().toISOString(),
    };
    setProjects((previous) => [project, ...previous]);
    setSelectedId(project.id);
    event.currentTarget.reset();
  }

  function addSource(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected) return;
    const form = new FormData(event.currentTarget);
    const item: Source = {
      id: crypto.randomUUID(),
      projectId: selected.id,
      title: textFromForm(form, "title") || "Untitled source",
      type: textFromForm(form, "type") as SourceType,
      author: textFromForm(form, "author"),
      year: textFromForm(form, "year"),
      url: textFromForm(form, "url"),
      summary: textFromForm(form, "summary"),
      keyFinding: textFromForm(form, "keyFinding"),
      credibility: numberFromForm(form, "credibility"),
      relevance: numberFromForm(form, "relevance"),
      biasRisk: numberFromForm(form, "biasRisk"),
      tags: textFromForm(form, "tags"),
      createdAt: new Date().toISOString(),
    };
    setSources((previous) => [item, ...previous]);
    event.currentTarget.reset();
  }

  function addEvidence(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected) return;
    const form = new FormData(event.currentTarget);
    const item: Evidence = {
      id: crypto.randomUUID(),
      projectId: selected.id,
      claim: textFromForm(form, "claim") || "Claim belum diisi",
      evidence: textFromForm(form, "evidence"),
      sourceLabel: textFromForm(form, "sourceLabel"),
      strength: textFromForm(form, "strength") as EvidenceStrength,
      implication: textFromForm(form, "implication"),
      contradiction: textFromForm(form, "contradiction"),
      theme: textFromForm(form, "theme"),
      createdAt: new Date().toISOString(),
    };
    setEvidence((previous) => [item, ...previous]);
    event.currentTarget.reset();
  }

  function addInsight(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected) return;
    const form = new FormData(event.currentTarget);
    const item: Insight = {
      id: crypto.randomUUID(),
      projectId: selected.id,
      title: textFromForm(form, "title") || "Insight baru",
      finding: textFromForm(form, "finding"),
      recommendation: textFromForm(form, "recommendation"),
      confidence: numberFromForm(form, "confidence"),
      nextAction: textFromForm(form, "nextAction"),
      createdAt: new Date().toISOString(),
    };
    setInsights((previous) => [item, ...previous]);
    event.currentTarget.reset();
  }

  function updateProject(id: string, patch: Partial<Project>) {
    setProjects((previous) => previous.map((item) => item.id === id ? { ...item, ...patch } : item));
  }

  function removeProject(id: string) {
    setProjects((previous) => previous.filter((item) => item.id !== id));
    setSources((previous) => previous.filter((item) => item.projectId !== id));
    setEvidence((previous) => previous.filter((item) => item.projectId !== id));
    setInsights((previous) => previous.filter((item) => item.projectId !== id));
    if (selectedId === id) setSelectedId(null);
  }

  function loadSample() {
    setProjects([sampleProject]);
    setSources(sampleSources);
    setEvidence(sampleEvidence);
    setInsights(sampleInsights);
    setSelectedId(sampleProject.id);
  }

  function clearWorkspace() {
    setProjects([]);
    setSources([]);
    setEvidence([]);
    setInsights([]);
    setSelectedId(null);
    window.localStorage.removeItem(STORAGE_KEY);
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify({ projects, sources, evidence, insights }, null, 2)], { type: "application/json" });
    downloadBlob(blob, "research-workbench-data.json");
  }

  function exportCsv() {
    const header = ["Title", "Domain", "Type", "Stage", "Status", "Readiness", "Sources", "Evidence", "Insights", "Gaps", "Quick Win"];
    const rows = enriched.map((item) => [item.title, item.domain, item.type, item.stage, item.status, String(item.readinessScore), String(item.sourceCount), String(item.evidenceCount), String(item.insightCount), item.gaps.join(" | "), item.quickWin]);
    const csv = [header, ...rows].map((row) => row.map(csvEscape).join(",")).join("\n");
    downloadBlob(new Blob([csv], { type: "text/csv;charset=utf-8" }), "research-workbench-recap.csv");
  }

  function exportMarkdown() {
    if (!selected) return;
    downloadBlob(new Blob([buildMarkdown(selected, sources, evidence, insights)], { type: "text/markdown;charset=utf-8" }), "research-brief.md");
  }

  function downloadBlob(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }

  function importJson(file: File | undefined) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as StoredData;
        setProjects(Array.isArray(parsed.projects) ? parsed.projects : []);
        setSources(Array.isArray(parsed.sources) ? parsed.sources : []);
        setEvidence(Array.isArray(parsed.evidence) ? parsed.evidence : []);
        setInsights(Array.isArray(parsed.insights) ? parsed.insights : []);
      } catch {
        alert("File JSON tidak dapat dibaca.");
      }
    };
    reader.readAsText(file);
  }

  async function copyBrief() {
    if (!selected) return;
    await navigator.clipboard.writeText(buildBrief(selected, sources, evidence, insights));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <section className="min-h-screen bg-[#eef3f8] px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <Header />

        <div className="grid gap-4 lg:grid-cols-7">
          <MetricCard icon={ClipboardList} label="Projects" value={`${summary.total}`} tone="neutral" />
          <MetricCard icon={BarChart3} label="Avg readiness" value={`${summary.avg}`} tone={summary.avg >= 70 ? "safe" : summary.avg >= 55 ? "warning" : "danger"} />
          <MetricCard icon={BookOpen} label="Sources" value={`${summary.sourceTotal}`} tone="prime" />
          <MetricCard icon={FileText} label="Evidence" value={`${summary.evidenceTotal}`} tone="safe" />
          <MetricCard icon={Target} label="Active" value={`${summary.active}`} tone="neutral" />
          <MetricCard icon={CheckCircle2} label="At risk" value={`${summary.atRisk}`} tone={summary.atRisk === 0 ? "safe" : "danger"} />
          <MetricCard icon={Lightbulb} label="Top gap" value={summary.topGap} tone="neutral" />
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <Panel title="Research Command Center" icon={BrainCircuit}>
            {selected ? <CommandCenter project={selected} onUpdate={updateProject} onCopy={copyBrief} copied={copied} /> : <EmptyState title="Belum ada proyek riset" description="Tambahkan proyek atau muat contoh untuk melihat command center, gap, dan quick win." />}
          </Panel>
          <Panel title="Tambah proyek riset" icon={Plus}>
            <ProjectForm onSubmit={addProject} />
          </Panel>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.75fr_1.25fr]">
          <Panel title="Research Tools" icon={Layers3}>
            {selected ? <ResearchTools sources={selectedSources} evidence={selectedEvidence} insights={selectedInsights} addSource={addSource} addEvidence={addEvidence} addInsight={addInsight} setSources={setSources} setEvidence={setEvidence} setInsights={setInsights} /> : <EmptyState title="Pilih proyek" description="Pilih proyek riset untuk menambahkan sumber, evidence, dan insight." />}
          </Panel>

          <Panel title="Research Projects" icon={FileSpreadsheet}>
            <Toolbar query={query} setQuery={setQuery} filter={filter} setFilter={setFilter} loadSample={loadSample} exportJson={exportJson} exportCsv={exportCsv} exportMarkdown={exportMarkdown} importJson={importJson} clearWorkspace={clearWorkspace} />
            {filtered.length === 0 ? <EmptyState title="Belum ada proyek" description="Tambahkan proyek riset baru atau klik Contoh untuk mencoba workflow kajian umum." /> : <ProjectTable projects={filtered} selectedId={selected?.id ?? null} onSelect={setSelectedId} onRemove={removeProject} />}
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
          <p className="text-sm font-black uppercase tracking-[0.28em] text-teal">Research Operations</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-navy sm:text-5xl">Research Workbench</h1>
          <p className="mt-4 max-w-4xl text-base leading-7 text-slate-600">Workspace umum untuk kajian dan penelitian: susun pertanyaan riset, kelola sumber, bangun evidence matrix, catat insight, cek gap, dan ekspor draft ringkasan penelitian.</p>
        </div>
        <span className="rounded-full border border-violet-200 bg-violet-50 px-4 py-1 text-xs font-bold text-violet-700">General Research</span>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <InfoCard label="Fokus" value="Kajian & Penelitian" />
        <InfoCard label="Metode" value="Desk · Field · Mixed" />
        <InfoCard label="Output" value="Brief · Matrix · Markdown" />
      </div>
      <div className="mt-8 rounded-3xl border border-teal/20 bg-teal/5 p-5 text-sm leading-6 text-slate-700">
        <div className="flex gap-3"><ShieldCheck className="mt-0.5 shrink-0 text-teal" size={19} /><p>Tool ini bersifat umum dan public-safe. Data tersimpan lokal di browser. Gunakan label anonim untuk narasumber dan hindari memasukkan data rahasia, data pribadi, atau dokumen internal yang belum layak publik.</p></div>
      </div>
    </div>
  );
}

function CommandCenter({ project, onUpdate, onCopy, copied }: { project: EnrichedProject; onUpdate: (id: string, patch: Partial<Project>) => void; onCopy: () => void; copied: boolean }) {
  const level = readinessLabel(project.readinessScore);
  return (
    <div className="space-y-5">
      <div className="rounded-3xl bg-gradient-to-br from-navy to-slate-900 p-6 text-white">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div><p className="text-xs font-black uppercase tracking-[0.22em] text-teal">Selected research</p><h2 className="mt-2 text-3xl font-black">{project.title}</h2><p className="mt-2 text-sm leading-6 text-slate-300">{project.domain} · {project.type}</p></div>
          <div className="text-right"><p className="text-5xl font-black text-teal">{project.readinessScore}</p><p className="text-xs font-black uppercase tracking-[0.18em] text-slate-300">{level.label}</p></div>
        </div>
        <p className="mt-5 rounded-2xl bg-white/10 p-4 text-sm leading-6 text-slate-100">{project.question || "Research question belum diisi."}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3"><InfoPill label="Quick win" value={project.quickWin} /><InfoPill label="Gap utama" value={project.gaps[0] ?? "Tidak ada gap besar"} /><InfoPill label="Evidence score" value={`${project.evidenceScore}`} /></div>
      <div className="rounded-3xl border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-700"><p className="font-black text-navy">Methodology</p><p className="mt-2">{project.method || "Belum ada metodologi."}</p><p className="mt-4 font-black text-navy">Data plan</p><p className="mt-2">{project.dataPlan || "Belum ada rencana data."}</p></div>
      <div className="grid gap-3 sm:grid-cols-2"><InlineSelect label="Stage" value={project.stage} options={stages} onChange={(value) => onUpdate(project.id, { stage: value })} /><InlineSelect label="Status" value={project.status} options={statuses} onChange={(value) => onUpdate(project.id, { status: value })} /></div>
      <button onClick={onCopy} className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-navy px-5 py-3 text-sm font-black text-white transition hover:bg-navy-light"><Sparkles size={18} /> {copied ? "Brief tersalin" : "Salin research brief"}</button>
    </div>
  );
}

function ProjectForm({ onSubmit }: { onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <TextInput name="title" label="Judul kajian" placeholder="Judul umum penelitian" />
        <TextInput name="domain" label="Domain/topik" placeholder="Ekonomi, kebijakan, hukum, pasar, layanan" />
        <SelectText name="type" label="Jenis riset" options={researchTypes} defaultValue="Desk Research" />
        <SelectText name="stage" label="Stage" options={stages} defaultValue="Idea" />
        <SelectText name="status" label="Status" options={statuses} defaultValue="Draft" />
        <SelectText name="priority" label="Prioritas" options={priorities} defaultValue="Normal" />
        <TextInput name="owner" label="Owner/peneliti" placeholder="Gunakan label aman" />
        <TextInput name="dueDate" label="Target review" type="date" />
      </div>
      <TextArea name="question" label="Research question" placeholder="Pertanyaan utama yang ingin dijawab" />
      <TextArea name="objective" label="Tujuan" placeholder="Tujuan kajian atau penelitian" />
      <TextArea name="method" label="Metodologi" placeholder="Desk review, wawancara, survei, dataset, observasi, analisis hukum, dll." />
      <TextArea name="scope" label="Ruang lingkup" placeholder="Batasan topik, waktu, tempat, populasi, atau data" />
      <TextArea name="dataPlan" label="Rencana data" placeholder="Data apa yang dibutuhkan dan bagaimana memvalidasinya" />
      <TextArea name="ethics" label="Catatan etika dan privasi" placeholder="Anonimisasi, consent, data sensitif, konflik kepentingan" />
      <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-navy px-5 py-3 text-sm font-black text-white transition hover:bg-navy-light"><Plus size={18} /> Tambah proyek</button>
    </form>
  );
}

function ResearchTools({ sources, evidence, insights, addSource, addEvidence, addInsight, setSources, setEvidence, setInsights }: { sources: Source[]; evidence: Evidence[]; insights: Insight[]; addSource: (event: FormEvent<HTMLFormElement>) => void; addEvidence: (event: FormEvent<HTMLFormElement>) => void; addInsight: (event: FormEvent<HTMLFormElement>) => void; setSources: React.Dispatch<React.SetStateAction<Source[]>>; setEvidence: React.Dispatch<React.SetStateAction<Evidence[]>>; setInsights: React.Dispatch<React.SetStateAction<Insight[]>> }) {
  const [tab, setTab] = useState<"sources" | "evidence" | "insights">("sources");
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-2 rounded-2xl bg-slate-100 p-1"><TabButton active={tab === "sources"} onClick={() => setTab("sources")}>Sources</TabButton><TabButton active={tab === "evidence"} onClick={() => setTab("evidence")}>Evidence</TabButton><TabButton active={tab === "insights"} onClick={() => setTab("insights")}>Insights</TabButton></div>
      {tab === "sources" ? <SourceTool items={sources} onSubmit={addSource} onRemove={(id) => setSources((prev) => prev.filter((item) => item.id !== id))} /> : null}
      {tab === "evidence" ? <EvidenceTool items={evidence} onSubmit={addEvidence} onRemove={(id) => setEvidence((prev) => prev.filter((item) => item.id !== id))} /> : null}
      {tab === "insights" ? <InsightTool items={insights} onSubmit={addInsight} onRemove={(id) => setInsights((prev) => prev.filter((item) => item.id !== id))} /> : null}
    </div>
  );
}

function SourceTool({ items, onSubmit, onRemove }: { items: Source[]; onSubmit: (event: FormEvent<HTMLFormElement>) => void; onRemove: (id: string) => void }) {
  return <ToolShell onSubmit={onSubmit} button="Tambah sumber"><TextInput name="title" label="Judul sumber" /><SelectText name="type" label="Tipe" options={sourceTypes} defaultValue="Report" /><TextInput name="author" label="Penulis/sumber" /><TextInput name="year" label="Tahun" /><TextInput name="url" label="URL" /><TextArea name="summary" label="Ringkasan" /><TextArea name="keyFinding" label="Key finding" /><div className="grid gap-3 md:grid-cols-3"><ScoreInput name="credibility" label="Credibility" defaultValue={70} /><ScoreInput name="relevance" label="Relevance" defaultValue={70} /><ScoreInput name="biasRisk" label="Bias risk" defaultValue={25} /></div><TextInput name="tags" label="Tags" /> <ItemList items={items.map((item) => ({ id: item.id, title: item.title, subtitle: `${item.type} · ${item.author || "Unknown"} · relevance ${item.relevance}`, detail: item.keyFinding || item.summary }))} onRemove={onRemove} /></ToolShell>;
}

function EvidenceTool({ items, onSubmit, onRemove }: { items: Evidence[]; onSubmit: (event: FormEvent<HTMLFormElement>) => void; onRemove: (id: string) => void }) {
  return <ToolShell onSubmit={onSubmit} button="Tambah evidence"><TextArea name="claim" label="Claim/proposisi" /><TextArea name="evidence" label="Evidence" /><TextInput name="sourceLabel" label="Sumber bukti" /><SelectText name="strength" label="Strength" options={strengths} defaultValue="Moderate" /><TextInput name="theme" label="Tema/kode" /><TextArea name="implication" label="Implication" /><TextArea name="contradiction" label="Contradiction" /><ItemList items={items.map((item) => ({ id: item.id, title: item.claim, subtitle: `${item.strength} · ${item.theme || "No theme"}`, detail: item.implication || item.evidence }))} onRemove={onRemove} /></ToolShell>;
}

function InsightTool({ items, onSubmit, onRemove }: { items: Insight[]; onSubmit: (event: FormEvent<HTMLFormElement>) => void; onRemove: (id: string) => void }) {
  return <ToolShell onSubmit={onSubmit} button="Tambah insight"><TextInput name="title" label="Judul insight" /><TextArea name="finding" label="Finding" /><TextArea name="recommendation" label="Recommendation" /><ScoreInput name="confidence" label="Confidence" defaultValue={60} /><TextArea name="nextAction" label="Next action" /><ItemList items={items.map((item) => ({ id: item.id, title: item.title, subtitle: `Confidence ${item.confidence}`, detail: item.recommendation || item.finding }))} onRemove={onRemove} /></ToolShell>;
}

function ToolShell({ children, onSubmit, button }: { children: ReactNode; onSubmit: (event: FormEvent<HTMLFormElement>) => void; button: string }) {
  return <div className="space-y-4"><form onSubmit={onSubmit} className="grid gap-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">{children}<button type="submit" className="rounded-2xl bg-navy px-4 py-3 text-sm font-black text-white">{button}</button></form></div>;
}

function Toolbar({ query, setQuery, filter, setFilter, loadSample, exportJson, exportCsv, exportMarkdown, importJson, clearWorkspace }: { query: string; setQuery: (value: string) => void; filter: string; setFilter: (value: string) => void; loadSample: () => void; exportJson: () => void; exportCsv: () => void; exportMarkdown: () => void; importJson: (file: File | undefined) => void; clearWorkspace: () => void }) {
  return (
    <div className="mb-5 flex flex-wrap items-center gap-3">
      <div className="relative min-w-[240px] flex-1"><Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari judul, domain, pertanyaan, owner" className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm font-medium outline-none ring-teal/20 focus:ring-4" /></div>
      <select value={filter} onChange={(event) => setFilter(event.target.value)} className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-navy outline-none ring-teal/20 focus:ring-4"><option>All</option>{researchTypes.map((item) => <option key={item}>{item}</option>)}{stages.map((item) => <option key={item}>{item}</option>)}{statuses.map((item) => <option key={item}>{item}</option>)}{priorities.map((item) => <option key={item}>{item}</option>)}<option>Publication Ready</option><option>Strong Draft</option><option>Needs Triangulation</option><option>Research Gap</option></select>
      <button onClick={loadSample} className="inline-flex items-center gap-2 rounded-full bg-teal px-4 py-2.5 text-sm font-bold text-white"><Layers3 size={16} /> Contoh</button>
      <button onClick={exportJson} className="inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2.5 text-sm font-bold text-white"><Download size={16} /> JSON</button>
      <button onClick={exportCsv} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-navy ring-1 ring-slate-200"><ArrowDownToLine size={16} /> CSV</button>
      <button onClick={exportMarkdown} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-navy ring-1 ring-slate-200"><Download size={16} /> Markdown</button>
      <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-navy ring-1 ring-slate-200"><Upload size={16} /> Import<input type="file" accept="application/json" className="hidden" onChange={(event) => importJson(event.target.files?.[0])} /></label>
      <button onClick={clearWorkspace} className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2.5 text-sm font-bold text-rose-700 ring-1 ring-rose-100"><Eraser size={16} /> Bersihkan</button>
    </div>
  );
}

function ProjectTable({ projects, selectedId, onSelect, onRemove }: { projects: EnrichedProject[]; selectedId: string | null; onSelect: (id: string) => void; onRemove: (id: string) => void }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200"><div className="overflow-x-auto"><table className="min-w-full divide-y divide-slate-200 text-sm"><thead className="bg-slate-50 text-left text-xs font-black uppercase tracking-[0.16em] text-slate-400"><tr><th className="px-4 py-3">Research</th><th className="px-4 py-3">Readiness</th><th className="px-4 py-3">Assets</th><th className="px-4 py-3">Gap</th><th className="px-4 py-3">Status</th><th className="px-4 py-3"></th></tr></thead><tbody className="divide-y divide-slate-100 bg-white">{projects.map((project) => { const level = readinessLabel(project.readinessScore); return <tr key={project.id} className={selectedId === project.id ? "bg-teal/5" : ""}><td className="px-4 py-4 align-top"><button onClick={() => onSelect(project.id)} className="text-left"><p className="font-black text-navy">{project.title}</p><p className="mt-1 max-w-md text-xs leading-5 text-slate-500">{project.domain} · {project.type}</p></button></td><td className="px-4 py-4 align-top"><span className={`rounded-full px-3 py-1 text-xs font-black ring-1 ${level.badge}`}>{project.readinessScore} · {level.label}</span></td><td className="px-4 py-4 align-top text-xs text-slate-600">{project.sourceCount} sources<br />{project.evidenceCount} evidence · {project.insightCount} insights</td><td className="px-4 py-4 align-top text-xs text-slate-600">{project.gaps.join(" | ") || "-"}</td><td className="px-4 py-4 align-top"><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">{project.stage}</span></td><td className="px-4 py-4 align-top text-right"><button onClick={() => onRemove(project.id)} className="rounded-full p-2 text-rose-600 hover:bg-rose-50" aria-label="Hapus proyek"><Trash2 size={16} /></button></td></tr>; })}</tbody></table></div></div>
  );
}

function ItemList({ items, onRemove }: { items: { id: string; title: string; subtitle: string; detail: string }[]; onRemove: (id: string) => void }) {
  if (items.length === 0) return <EmptyState title="Belum ada item" description="Tambahkan item baru untuk membangun database riset." />;
  return <div className="space-y-3">{items.map((item) => <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4"><div className="flex items-start justify-between gap-3"><div><p className="font-black text-navy">{item.title}</p><p className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-400">{item.subtitle}</p><p className="mt-2 text-sm leading-6 text-slate-600">{item.detail || "Tidak ada detail."}</p></div><button onClick={() => onRemove(item.id)} className="rounded-full p-2 text-rose-600 hover:bg-rose-50"><Trash2 size={15} /></button></div></div>)}</div>;
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return <button onClick={onClick} className={`rounded-xl px-3 py-2 text-xs font-black ${active ? "bg-white text-navy shadow-sm" : "text-slate-500"}`}>{children}</button>;
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

function InlineSelect<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: readonly T[]; onChange: (value: T) => void }) {
  return <label className="block text-xs font-black uppercase tracking-[0.14em] text-slate-400">{label}<select value={value} onChange={(event) => onChange(event.target.value as T)} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold normal-case tracking-normal text-navy outline-none ring-teal/20 focus:ring-4">{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}

function ScoreInput({ name, label, defaultValue }: { name: string; label: string; defaultValue: number }) {
  return <label className="space-y-2 text-sm font-semibold text-slate-700"><span>{label}</span><input name={name} type="number" min="0" max="100" defaultValue={defaultValue} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-teal/20 focus:ring-4" /></label>;
}
