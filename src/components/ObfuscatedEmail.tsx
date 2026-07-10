import type { ReactNode } from "react";
import { siteConfig } from "@/data/photos";

type ObfuscatedEmailProps = {
  className?: string;
  showIcon?: boolean;
  icon?: ReactNode;
};

/** Renders email with split markup to reduce naive scraper harvesting. */
export function ObfuscatedEmail({ className, showIcon, icon }: ObfuscatedEmailProps) {
  const [user, domain] = siteConfig.email.split("@");

  return (
    <a href={`mailto:${user}@${domain}`} className={className}>
      {showIcon && icon}
      {user}
      <span aria-hidden="true">&#64;</span>
      {domain}
    </a>
  );
}
