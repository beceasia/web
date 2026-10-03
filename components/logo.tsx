import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/data/apps";
import { localePath } from "@/lib/routes";

export function Logo({ locale }: { locale: Locale }) {
  return (
    <Link
      href={localePath(locale)}
      className="flex items-center gap-3"
      aria-label="bece.asia home"
    >
      <span className="relative hidden h-10 w-10 overflow-hidden rounded-2xl bg-navy shadow-soft sm:block">
        <Image
          src="/brand/bece-icon.png"
          alt=""
          fill
          sizes="40px"
          className="object-cover"
        />
      </span>
      <span className="text-lg font-bold tracking-tight text-navy sm:text-xl">
        bece<span className="text-teal">.</span>asia
      </span>
    </Link>
  );
}
