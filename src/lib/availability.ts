import { siteConfig } from "@/lib/site";

export type AvailabilityStatus = {
  available: boolean;
  /** Primary CTA label */
  label: string;
  /** Supporting hint for screen readers / tooltip */
  detail: string;
  href: string;
  /** Short action label next to status */
  action: string;
};

export type AvailabilityCopy = {
  availableLabel: string;
  availableDetail: string;
  availableAction: string;
  closedLabel: string;
  closedDetail: string;
  closedAction: string;
};

function getCopenhagenParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: siteConfig.timezone,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  const weekday = get("weekday");
  const hour = Number(get("hour"));
  const minute = Number(get("minute"));

  const dayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  return {
    day: dayMap[weekday] ?? 0,
    minutes: hour * 60 + minute,
  };
}

/** True when current Copenhagen time is inside stated opening hours. */
export function isWithinOpeningHours(date = new Date()): boolean {
  const { day, minutes } = getCopenhagenParts(date);

  for (const rule of siteConfig.openingHours) {
    if (!(rule.days as readonly number[]).includes(day)) continue;
    const open = rule.open * 60;
    const close = rule.close * 60;
    return minutes >= open && minutes < close;
  }

  return false;
}

export function getAvailabilityStatus(
  copy: AvailabilityCopy,
  date = new Date()
): AvailabilityStatus {
  const available = isWithinOpeningHours(date);

  if (available) {
    return {
      available: true,
      label: copy.availableLabel,
      detail: copy.availableDetail,
      href: `tel:${siteConfig.phone}`,
      action: copy.availableAction,
    };
  }

  return {
    available: false,
    label: copy.closedLabel,
    detail: copy.closedDetail,
    href: `mailto:${siteConfig.email}`,
    action: copy.closedAction,
  };
}
