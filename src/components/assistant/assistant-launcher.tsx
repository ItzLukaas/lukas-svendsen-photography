"use client";

import { MessageCircle, X } from "lucide-react";
import { useReducedMotion } from "motion/react";

import { useAssistant } from "@/components/assistant/assistant-provider";
import { cn } from "@/lib/utils";

/**
 * Minimized floating chip — subtle entrance, no pulse.
 */
export function AssistantLauncher() {
  const { view, open, close } = useAssistant();
  const reduceMotion = !!useReducedMotion();

  if (view === "open") return null;

  if (view === "closed") {
    return (
      <div
        className={cn(
          "pointer-events-auto fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[60] sm:right-6 sm:bottom-6",
          !reduceMotion &&
            "animate-[assistant-enter_520ms_cubic-bezier(0.22,1,0.36,1)_both]"
        )}
      >
        <button
          type="button"
          onClick={open}
          aria-label="Åbn Lukas' assistent"
          className="flex size-12 items-center justify-center border border-foreground/15 bg-ink text-paper shadow-[0_12px_40px_rgb(14_14_13/0.18)] transition-opacity duration-300 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          <MessageCircle className="size-5" strokeWidth={1.5} aria-hidden />
        </button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "pointer-events-auto fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[60] sm:right-6 sm:bottom-6",
        !reduceMotion &&
          "animate-[assistant-enter_520ms_cubic-bezier(0.22,1,0.36,1)_both]"
      )}
    >
      <div className="relative">
        <button
          type="button"
          onClick={close}
          aria-label="Skjul assistent"
          className="absolute -top-2 -right-2 z-10 flex size-7 items-center justify-center border border-foreground/12 bg-paper text-muted-ink transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          <X className="size-3.5" strokeWidth={1.5} aria-hidden />
        </button>

        <button
          type="button"
          onClick={open}
          className="group flex max-w-[min(100vw-2rem,20.5rem)] items-stretch border border-foreground/12 bg-paper text-left shadow-[0_16px_48px_rgb(14_14_13/0.14)] transition-[border-color] duration-300 hover:border-foreground/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          <span className="flex size-12 shrink-0 items-center justify-center border-r border-foreground/10 bg-ink text-paper">
            <MessageCircle className="size-5" strokeWidth={1.5} aria-hidden />
          </span>
          <span className="min-w-0 px-3.5 py-2.5 pr-5">
            <span className="block text-[0.8125rem] font-medium tracking-[-0.01em] text-ink">
              👋 Har du et projekt i tankerne?
            </span>
            <span className="mt-0.5 block text-[0.6875rem] leading-snug text-muted-ink">
              Jeg hjælper dig med at finde den rigtige løsning.
            </span>
            <span className="mt-1.5 inline-flex items-center gap-1 text-[0.6875rem] font-semibold tracking-[0.04em] text-ink">
              Start her
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                →
              </span>
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}
