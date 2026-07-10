import Link from "next/link";
import {
  primaryCityLinks,
  primaryReferenceLinks,
  primaryServiceLinks,
} from "@/data/internal-links";

/** Skjult crawl-navigation — styrker intern linkstruktur uden visuelle ændringer */
export function HomeInternalLinks() {
  return (
    <nav aria-label="Relaterede sider" className="sr-only">
      <ul>
        {primaryServiceLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
        {primaryReferenceLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
        {primaryCityLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
        <li>
          <Link href="/portfolio">Portefølje</Link>
        </li>
        <li>
          <Link href="/om-mig">Om mig</Link>
        </li>
        <li>
          <Link href="/kontakt">Kontakt</Link>
        </li>
      </ul>
    </nav>
  );
}
