import type { Locale } from "@/data/apps";

export function localePath(locale: Locale, path = "") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return locale === "id" ? `/id${normalizedPath === "/" ? "" : normalizedPath}` : normalizedPath;
}

export function switchLocalePath(locale: Locale, pathname: string) {
  if (locale === "id") {
    return pathname === "/" ? "/id" : `/id${pathname}`;
  }

  if (pathname === "/id") return "/";
  return pathname.replace(/^\/id/, "") || "/";
}
