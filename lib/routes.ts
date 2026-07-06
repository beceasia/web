import type { Locale } from "@/data/apps";

export function localePath(locale: Locale, path = "") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") return `/en${normalizedPath === "/" ? "" : normalizedPath}`;
  if (locale === "zh") return `/zh${normalizedPath === "/" ? "" : normalizedPath}`;
  return normalizedPath;
}

export function switchLocalePath(locale: Locale, pathname: string) {
  const cleanPath = pathname.replace(/^\/(id|en|zh)(?=\/|$)/, "") || "/";
  if (locale === "en") return `/en${cleanPath === "/" ? "" : cleanPath}`;
  if (locale === "zh") return `/zh${cleanPath === "/" ? "" : cleanPath}`;
  return cleanPath;
}
