"use client";

import Link from "next/link";

import { useLocaleOptional } from "@/components/i18n/locale-provider";
import { da } from "@/lib/i18n/dictionaries/da";
import { localizedHref } from "@/lib/i18n/paths";

export function NotFoundView() {
  const ctx = useLocaleOptional();
  const locale = ctx?.locale ?? "da";
  const dict = ctx?.dict ?? da;
  const copy = dict.notFound;

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-[1600px] flex-col justify-center px-5 md:px-8 lg:px-12">
      <p className="label-meta text-muted-ink">404</p>
      <h1 className="mt-3 font-display text-[clamp(2.25rem,5.5vw,3.75rem)] leading-[0.95] tracking-[-0.03em]">
        {copy.title}
      </h1>
      <p className="mt-4 max-w-md text-body">{copy.body}</p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <Link
          href={localizedHref("/arbejde", locale)}
          className="btn-solid"
        >
          {copy.viewWork}
        </Link>
        <Link
          href={localizedHref("/booking", locale)}
          className="btn-ghost"
        >
          {copy.bookMe}
        </Link>
        <Link href={localizedHref("/", locale)} className="btn-ghost">
          {copy.goHome}
        </Link>
      </div>
    </div>
  );
}
