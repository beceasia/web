import type { AppItem } from "@/data/apps";

export const attendanceApps: AppItem[] = [
  {
    slug: "attendance-workspace",
    name: { en: "Attendance Workspace", id: "Attendance Workspace" },
    tagline: { en: "A public-safe attendance utility adapted from a standalone community app.", id: "Utilitas presensi public-safe yang diadaptasi dari aplikasi komunitas mandiri." },
    description: { en: "A browser-based attendance workspace with organizational identities and personal names sanitized before display.", id: "Workspace presensi berbasis browser dengan identitas organisasi dan nama personal yang disanitasi sebelum ditampilkan." },
    category: "Productivity",
    status: "beta",
    region: "Global",
    scope: "Attendance Management",
    url: "/apps/attendance-workspace",
    featured: true,
    tags: ["attendance", "presence", "productivity", "community app"],
    utilities: { en: ["Attendance form", "Presence recap", "Sanitized sample data"], id: ["Form presensi", "Rekap kehadiran", "Data contoh tersanitasi"] },
    lastUpdated: "2026-07-11",
    officialStatus: "community-built"
  }
];
