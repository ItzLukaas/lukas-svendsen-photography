import type { ReactNode } from "react";
import { siteConfig } from "@/data/photos";

type ObfuscatedEmailProps = {
  className?: string;
  showIcon?: boolean;
  icon?: ReactNode;
  /** Vis link-tekst i stedet for e-mailadressen */
  label?: string;
};

/** Renders email with split markup to reduce naive scraper harvesting. */
export function ObfuscatedEmail({ className, showIcon, icon, label }: ObfuscatedEmailProps) {
  const [user, domain] = siteConfig.email.split("@");

  return (
    <a
      href={`mailto:${user}@${domain}`}
      className={className}
      aria-label={label ? `Send e-mail til ${siteConfig.email}` : undefined}
    >
      {showIcon && icon}
      {label ?? (
        <>
          {user}
          <span aria-hidden="true">&#64;</span>
          {domain}
        </>
      )}
    </a>
  );
}
