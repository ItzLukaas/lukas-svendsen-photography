import type { ReactNode } from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/** Shared underline field look — zero radius, editorial forms */
export const fieldClass =
  "h-12 w-full min-w-0 max-w-full rounded-none border-0 border-b border-foreground/20 bg-transparent px-0 text-base shadow-none transition-[border-color] duration-300 placeholder:text-muted-ink/45 focus-visible:border-foreground focus-visible:ring-0";

export const selectClass = cn(
  fieldClass,
  "appearance-none cursor-pointer pr-6 bg-[length:0.65rem] bg-[right_0_center] bg-no-repeat",
  "bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22 viewBox=%220 0 12 8%22 fill=%22none%22%3E%3Cpath d=%22M1 1.5L6 6.5L11 1.5%22 stroke=%22%230e0e0e%22 stroke-width=%221.25%22/%3E%3C/svg%3E')]"
);

export function FormField({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="label-meta">
        {label}
        {optional ? (
          <span className="ml-1.5 font-normal normal-case tracking-normal text-muted-ink/70">
            (valgfrit)
          </span>
        ) : null}
      </Label>
      {children}
      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
