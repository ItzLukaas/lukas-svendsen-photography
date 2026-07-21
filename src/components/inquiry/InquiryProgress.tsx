"use client";

import { m } from "framer-motion";
import { Check } from "lucide-react";
import { inquiryStepLabels, TOTAL_INQUIRY_STEPS } from "@/data/inquiry-form";
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
      <div className="mb-3 flex items-end justify-between gap-4">
        <div>
          <p className="text-[10px] tracking-[0.28em] text-muted uppercase">
            Trin {currentStep} af {totalSteps}
          </p>
          <p
            className={`mt-1 font-display font-light tabular-nums text-foreground ${
              compact ? "text-lg" : "text-xl"
            }`}
            aria-live="polite"
          >
            {progressPercent}%
          </p>
        </div>
        <p className="hidden max-w-[10rem] text-right text-[10px] leading-relaxed tracking-[0.18em] text-muted-subtle uppercase sm:block">
          {inquiryStepLabels[currentStep - 1]}
        </p>
      </div>

      <div
        className={`relative overflow-hidden rounded-full bg-primary/[0.06] ${
          compact ? "mb-6 h-1" : "mb-8 h-1.5"
        }`}
        role="progressbar"
        aria-valuenow={progressPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Booking fremskridt ${progressPercent} procent`}
      >
        <m.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-white/25 via-white/55 to-white/35"
          initial={false}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.55, ease: EASE }}
        />
      </div>

      <div className="hidden items-start justify-between gap-1 sm:flex sm:gap-2">
        {inquiryStepLabels.map((label, index) => {
          const step = index + 1;
          const isActive = step === currentStep;
          const isComplete = step < currentStep;

          return (
            <div
              key={label}
              className={`flex min-w-0 flex-1 flex-col items-center ${compact ? "gap-2" : "gap-2.5"}`}
            >
              <m.div
                className={`flex shrink-0 items-center justify-center rounded-full border text-[10px] tracking-wider transition-colors duration-500 ease-premium ${
                  compact ? "h-7 w-7" : "h-8 w-8"
                } ${
                  isActive
                    ? "border-foreground/40 bg-accent-strong text-foreground shadow-[0_0_20px_rgba(255,255,255,0.06)]"
                    : isComplete
                      ? "border-foreground/20 bg-primary/[0.06] text-foreground/80"
                      : "border-border bg-transparent text-muted-subtle"
                }`}
                animate={isActive ? { scale: 1.06 } : { scale: 1 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                {isComplete ? (
                  <Check size={12} strokeWidth={2} aria-hidden="true" />
                ) : (
                  step
                )}
              </m.div>
              <span
                className={`text-center text-[9px] leading-tight tracking-[0.16em] uppercase ${
                  isActive
                    ? "text-foreground/75"
                    : isComplete
                      ? "text-muted"
                      : "text-muted-subtle"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
