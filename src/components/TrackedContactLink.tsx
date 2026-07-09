"use client";

import { Mail, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/icons/Instagram";
import { trackEmailClick, trackPhoneClick } from "@/lib/analytics";

const icons = {
  mail: Mail,
  phone: Phone,
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
      target={icon === "instagram" ? "_blank" : undefined}
      rel={icon === "instagram" ? "noopener noreferrer" : undefined}
      onClick={
        icon === "phone"
          ? trackPhoneClick
          : icon === "mail"
            ? trackEmailClick
            : undefined
      }
      className="group flex items-center gap-5 transition-colors"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all duration-500 ease-premium group-hover:border-white/25 group-hover:bg-white/5 group-hover:text-white">
        {icon === "instagram" ? (
          <InstagramIcon size={18} />
        ) : (
          <Icon size={18} strokeWidth={1.5} />
        )}
      </div>
      <div>
        <p className="text-xs tracking-widest text-white/40 uppercase">{label}</p>
        <p className="mt-1 text-sm text-white/70 transition-colors duration-500 ease-premium group-hover:text-white">
          {value}
        </p>
      </div>
    </a>
  );
}
