import type { Locale } from "@/data/apps";
import { apps } from "@/data/apps";
import { attendanceApps } from "@/data/attendance-apps";
import { businessToolsApps } from "@/data/business-tools-apps";
import { communityGamesApps } from "@/data/community-games-apps";
import { creativeBusinessApps } from "@/data/creative-business-apps";
import { t } from "@/data/i18n-safe";
import { AppsClient } from "./apps-client";
import { SectionHeading } from "./section-heading";

export function AppsPageContent({ locale }: { locale: Locale }) {
  const dict = t(locale);
  const description = locale === "en"
    ? "Browse practical apps, prototypes, and utilities that have been cleaned for public use: trade tools, document workflows, dashboards, learning, and productivity."
    : locale === "zh"
      ? "浏览已清理供公共使用的实用应用、原型和工具：贸易工具、文档流程、仪表板、学习和生产力。"
      : "Telusuri aplikasi, prototipe, dan utilities yang sudah dibersihkan untuk penggunaan publik: alat perdagangan, tata naskah, dashboard, pembelajaran, dan produktivitas.";

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="bece.asia"
        title={dict.sections.allApps}
        description={description}
      />
      <div className="mt-8">
        <AppsClient apps={[...apps, ...attendanceApps, ...businessToolsApps, ...creativeBusinessApps, ...communityGamesApps]} locale={locale} />
      </div>
    </section>
  );
}
