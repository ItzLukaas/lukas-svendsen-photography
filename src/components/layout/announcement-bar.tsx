"use client";

import { Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";

import { useLocale } from "@/components/i18n/locale-provider";
import {
  BrandFacebook,
  BrandInstagram,
  BrandLinkedin,
} from "@/components/layout/social-icons";
import {
  getAvailabilityStatus,
  type AvailabilityStatus,
} from "@/lib/availability";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Thin stone bar — contact + live availability.
 * Soft neutral only. Green is reserved for the live status dot.
 */
export function AnnouncementBar() {
  const { dict } = useLocale();
  const a = dict.availability;

  const placeholderStatus: AvailabilityStatus = {
    available: false,
    label: a.placeholderLabel,
    detail: a.placeholderDetail,
    href: `mailto:${siteConfig.email}`,
    action: a.placeholderAction,
  };

  const [status, setStatus] = useState(placeholderStatus);

  useEffect(() => {
    const tick = () =>
      setStatus(
        getAvailabilityStatus({
          availableLabel: a.availableLabel,
          availableDetail: a.availableDetail,
          availableAction: a.availableAction,
          closedLabel: a.closedLabel,
          closedDetail: a.closedDetail,
          closedAction: a.closedAction,
        })
      );
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, [a]);

  return (
    <div
      className="border-b border-foreground/8 bg-stone text-ink"
      role="region"
      aria-label={a.regionLabel}
    >
      <div className="mx-auto flex h-[var(--announcement-h)] max-w-[1600px] items-center justify-between gap-4 px-5 text-[0.6875rem] font-medium tracking-[0.02em] md:px-8 md:text-[0.71875rem] lg:px-12">
        <a
          href={status.href}
          className="inline-flex min-h-9 items-center gap-2 transition-opacity duration-300 hover:opacity-70"
          title={status.detail}
        >
          <span
            className={cn(
              "relative size-1.5 shrink-0 rounded-full",
              status.available
                ? "bg-available status-dot-live"
                : "bg-muted-ink/45"
            )}
            aria-hidden
          />
          <span className="text-ink">{status.label}</span>
          <span className="hidden text-muted-ink sm:inline" aria-hidden>
            ·
          </span>
          <span className="hidden text-muted-ink sm:inline">{status.action}</span>
        </a>

        <div className="flex items-center gap-1 sm:gap-0.5 md:gap-1">
          <a
            href={`tel:${siteConfig.phone}`}
            className="inline-flex min-h-9 items-center gap-1.5 px-1.5 text-muted-ink transition-colors duration-300 hover:text-ink sm:px-2"
            aria-label={a.callAria.replace("{phone}", siteConfig.phoneDisplay)}
          >
            <Phone className="size-3.5 shrink-0" strokeWidth={1.4} aria-hidden />
            <span className="hidden lg:inline">{siteConfig.phoneDisplay}</span>
          </a>

          <span
            className="mx-0.5 hidden h-3 w-px bg-foreground/12 sm:block"
            aria-hidden
          />

          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex min-h-9 items-center gap-1.5 px-1.5 text-muted-ink transition-colors duration-300 hover:text-ink sm:px-2"
            aria-label={dict.shared.sendEmail}
          >
            <Mail className="size-3.5 shrink-0" strokeWidth={1.4} aria-hidden />
            <span className="hidden xl:inline">{dict.shared.sendEmail}</span>
          </a>

          <span
            className="mx-0.5 hidden h-3 w-px bg-foreground/12 md:block"
            aria-hidden
          />

          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="inline-flex size-9 items-center justify-center text-muted-ink transition-colors duration-300 hover:text-ink focus-visible:text-ink"
          >
            <BrandInstagram className="size-3.5" />
          </a>
          <a
            href={siteConfig.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="inline-flex size-9 items-center justify-center text-muted-ink transition-colors duration-300 hover:text-ink focus-visible:text-ink"
          >
            <BrandFacebook className="size-3.5" />
          </a>
          <a
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex size-9 items-center justify-center text-muted-ink transition-colors duration-300 hover:text-ink focus-visible:text-ink"
          >
            <BrandLinkedin className="size-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
