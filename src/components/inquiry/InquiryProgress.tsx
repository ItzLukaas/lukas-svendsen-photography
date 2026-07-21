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
    <div className={compact ? "mb-8" : "mb-10"}>
      <div className="mb-3 flex items-center justify-between gap-3">
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
        className={`relative overflow-hidden rounded-full bg-primary/[0.07] ${
          compact ? "h-1" : "h-1.5"
        }`}
        role="progressbar"
        aria-valuenow={progressPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Booking fremskridt ${progressPercent} procent`}
      >
        <m.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-white/30 via-white/55 to-white/40"
          initial={false}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5, ease: EASE }}
        />
      </div>
    </div>
  );
}
