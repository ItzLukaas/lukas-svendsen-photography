"use client";

import { m } from "framer-motion";
import { TOTAL_INQUIRY_STEPS } from "@/data/inquiry-form";
import { EASE } from "@/lib/motion";

interface InquiryProgressProps {
  currentStep: number;
  totalSteps?: number;
  compact?: boolean;
}

export function InquiryProgress({
  currentStep,
  totalSteps = TOTAL_INQUIRY_STEPS,
  compact = false,
}: InquiryProgressProps) {
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className={compact ? "mb-7" : "mb-9"}>
      <div className="mb-2.5 flex items-center justify-between gap-3">
        <p className="text-[10px] tracking-[0.28em] text-muted uppercase">
          Trin {currentStep} af {totalSteps}
        </p>
        <p
          className="text-[10px] tabular-nums tracking-wider text-muted-subtle"
          aria-live="polite"
        >
          {progressPercent}%
        </p>
      </div>

      <div
        className={`relative overflow-hidden rounded-full bg-primary/[0.06] ${
          compact ? "h-px" : "h-0.5"
        }`}
        role="progressbar"
        aria-valuenow={progressPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Booking fremskridt ${progressPercent} procent`}
      >
        <m.div
          className="absolute inset-y-0 left-0 rounded-full bg-foreground/35"
          initial={false}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.45, ease: EASE }}
        />
      </div>
    </div>
  );
}
