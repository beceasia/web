import type { Locale } from "@/data/apps";
import { apps } from "@/data/apps";
import { t } from "@/data/i18n-safe";
import { AppsClient } from "./apps-client";
import { SectionHeading } from "./section-heading";

export function AppsPageContent({ locale }: { locale: Locale }) {
  const dict = t(locale);
  const description = locale === "en"
    ? "Browse practical apps, prototypes, and utilities that have been cleaned for public use: trade tools, document workflows, dashboards, learning, and productivity."
    : locale === "zh"
      ? "\u6d4f\u89c8\u5df2\u6e05\u7406\u4f9b\u516c\u5171\u4f7f\u7528\u7684\u5b9e\u7528\u5e94\u7528\u3001\u539f\u578b\u548c\u5de5\u5177\uff1a\u8d38\u6613\u5de5\u5177\u3001\u6587\u6863\u6d41\u7a0b\u3001\u4eea\u8868\u677f\u3001\u5b66\u4e60\u548c\u751f\u4ea7\u529b\u3002"
      : "Telusuri aplikasi, prototipe, dan utilities yang sudah dibersihkan untuk penggunaan publik: alat perdagangan, tata naskah, dashboard, pembelajaran, dan produktivitas.";
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="bece.asia"
        title={dict.sections.allApps}
        description={description}
      />
      <div className="mt-8">
        <AppsClient apps={apps} locale={locale} />
      </div>
    </section>
  );
}
