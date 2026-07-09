import Link from "next/link";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { JsonLd } from "./JsonLd";

export type BreadcrumbItem = {
  name: string;
  path: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(items)} />
      <nav aria-label="Brødkrummesti" className="mb-10">
        <ol className="flex flex-wrap items-center gap-2 text-xs tracking-wide text-white/35">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={item.path} className="flex items-center gap-2">
                {index > 0 && (
                  <span aria-hidden="true" className="text-white/20">
                    /
                  </span>
                )}
                {isLast ? (
                  <span aria-current="page" className="text-white/55">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    className="transition-colors duration-500 ease-premium hover:text-white/70"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
