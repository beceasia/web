import type { AppItem, Locale } from "@/data/apps";
import { AppCard } from "./app-card";

export function AppGrid({ apps, locale }: { apps: AppItem[]; locale: Locale }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {apps.map((app) => (
        <AppCard key={app.slug} app={app} locale={locale} />
      ))}
    </div>
  );
}
