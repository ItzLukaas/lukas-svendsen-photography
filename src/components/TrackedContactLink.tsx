"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/icons/Instagram";
import { trackEmailClick, trackPhoneClick } from "@/lib/analytics";

const icons = {
  mail: Mail,
  phone: Phone,
  location: MapPin,
  instagram: InstagramIcon,
} as const;

type TrackedContactLinkProps = {
  label: string;
  href: string;
  value: string;
  icon: keyof typeof icons;
};

export function TrackedContactLink({
  label,
  href,
  value,
  icon,
}: TrackedContactLinkProps) {
  const Icon = icons[icon];

  return (
    <a
      href={href}
      target={icon === "instagram" || icon === "location" ? "_blank" : undefined}
      rel={icon === "instagram" || icon === "location" ? "noopener noreferrer" : undefined}
      onClick={
        icon === "phone"
          ? trackPhoneClick
          : icon === "mail"
            ? trackEmailClick
            : undefined
      }
      className="group flex items-center gap-5 transition-colors"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-all duration-500 ease-premium group-hover:border-foreground/20 group-hover:bg-accent group-hover:text-foreground">
        {icon === "instagram" ? (
          <InstagramIcon size={18} />
        ) : (
          <Icon size={18} strokeWidth={1.5} />
        )}
      </div>
      <div>
        <p className="text-xs tracking-widest text-muted uppercase">{label}</p>
        <p className="mt-1 text-sm text-foreground/70 transition-colors duration-500 ease-premium group-hover:text-foreground">
          {value}
        </p>
      </div>
    </a>
  );
}
