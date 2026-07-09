import { inquiryStepLabels } from "@/data/inquiry-form";

interface InquiryProgressProps {
  currentStep: number;
  totalSteps?: number;
}

export function InquiryProgress({
  currentStep,
  totalSteps = inquiryStepLabels.length,
}: InquiryProgressProps) {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between gap-2">
        {inquiryStepLabels.map((label, index) => {
          const step = index + 1;
          const isActive = step === currentStep;
          const isComplete = step < currentStep;

          return (
            <div key={label} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex w-full items-center">
                {index > 0 && (
                  <div
                    className={`h-px flex-1 transition-colors duration-500 ease-premium ${
                      isComplete || isActive ? "bg-white/40" : "bg-white/10"
                    }`}
                  />
                )}
                <div
                  className={`flex h-2 w-2 shrink-0 rounded-full transition-all duration-500 ease-premium ${
                    isActive
                      ? "scale-125 bg-white"
                      : isComplete
                        ? "bg-white/60"
                        : "bg-white/15"
                  }`}
                />
                {index < totalSteps - 1 && (
                  <div
                    className={`h-px flex-1 transition-colors duration-500 ease-premium ${
                      isComplete ? "bg-white/40" : "bg-white/10"
                    }`}
                  />
                )}
              </div>
              <span
                className={`hidden text-[9px] tracking-[0.2em] uppercase sm:block ${
                  isActive ? "text-white/70" : "text-white/25"
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
