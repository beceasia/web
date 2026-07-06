import type { Locale } from "@/data/apps";
import { apps } from "@/data/apps";
import { t } from "@/data/i18n";
import { AppsClient } from "./apps-client";
import { SectionHeading } from "./section-heading";

export function AppsPageContent({ locale }: { locale: Locale }) {
  const dict = t(locale);
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="bece.asia"
        title={dict.sections.allApps}
        description={locale === "en" ? "Browse practical apps, prototypes, and utilities that have been cleaned for public use: trade tools, document workflows, dashboards, learning, and productivity." : "Telusuri aplikasi, prototipe, dan utilities yang sudah dibersihkan untuk penggunaan publik: alat perdagangan, tata naskah, dashboard, pembelajaran, dan produktivitas."}
      />
      <div className="mt-8">
        <AppsClient apps={apps} locale={locale} />
      </div>
    </section>
  );
}
