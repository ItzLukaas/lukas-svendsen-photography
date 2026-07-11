"use client";

import { m } from "framer-motion";
import { Check } from "lucide-react";
import { inquiryStepLabels } from "@/data/inquiry-form";
import { EASE } from "@/lib/motion";

interface InquiryProgressProps {
  currentStep: number;
  totalSteps?: number;
  compact?: boolean;
}

export function InquiryProgress({
  currentStep,
  totalSteps = inquiryStepLabels.length,
  compact = false,
}: InquiryProgressProps) {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className={compact ? "mb-8" : "mb-12"}>
      <div className="mb-2.5 flex items-center justify-between text-[10px] tracking-[0.25em] text-muted uppercase">
        <span>Trin {currentStep}</span>
        <span>af {totalSteps}</span>
      </div>

      <div className={`relative h-px bg-primary/[0.08] ${compact ? "mb-6" : "mb-8"}`}>
        <m.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-white/20 via-white/50 to-white/30"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: EASE }}
        />
      </div>

      <div className="flex items-start justify-between gap-1 sm:gap-2">
        {inquiryStepLabels.map((label, index) => {
          const step = index + 1;
          const isActive = step === currentStep;
          const isComplete = step < currentStep;

          return (
            <div key={label} className={`flex min-w-0 flex-1 flex-col items-center ${compact ? "gap-2" : "gap-3"}`}>
              <m.div
                className={`flex shrink-0 items-center justify-center rounded-full border text-[10px] tracking-wider transition-colors duration-500 ease-premium ${
                  compact ? "h-7 w-7" : "h-8 w-8"
                } ${
                  isActive
                    ? "border-foreground/40 bg-accent-strong text-foreground"
                    : isComplete
                      ? "border-foreground/20 bg-primary/[0.06] text-foreground/80"
                      : "border-border bg-transparent text-muted-subtle"
                }`}
                animate={isActive ? { scale: 1.08 } : { scale: 1 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                {isComplete ? (
                  <Check size={12} strokeWidth={2} aria-hidden="true" />
                ) : (
                  step
                )}
              </m.div>
              <span
                className={`hidden text-center text-[9px] leading-tight tracking-[0.18em] uppercase sm:block ${
                  isActive ? "text-foreground/70" : isComplete ? "text-muted" : "text-muted-subtle"
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
