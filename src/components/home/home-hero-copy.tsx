"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

type HomeHeroCopyProps = {
  inverted?: boolean;
};

/**
 * Hero text + CTAs — minimal, confident studio intro.
 * Motion props stay identical on server and client to avoid hydration mismatch.
 * Reduced-motion is handled by globals.css and Tailwind motion-reduce utilities.
 */
export function HomeHeroCopy({ inverted = true }: HomeHeroCopyProps) {
  return (
    <>
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 py-16 text-center sm:px-8 md:px-12 md:py-20 lg:px-16">
        <motion.p
          className={cn(
            "text-[0.6875rem] font-medium tracking-[0.18em] uppercase",
            inverted ? "text-white/72" : "text-muted-ink"
          )}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease }}
        >
          Foto, video og meget mere
        </motion.p>

        <motion.h1
          className={cn(
            "mt-5 max-w-[12ch] font-display text-[clamp(2.35rem,6vw,4.75rem)] leading-[0.98] tracking-[-0.04em] text-balance sm:mt-6",
            inverted ? "text-white" : "text-ink"
          )}
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.75, delay: 0.32, ease }}
        >
          Foto. Film. Content.
        </motion.h1>

        <motion.p
          className={cn(
            "mt-6 max-w-[38rem] text-[0.9375rem] leading-[1.65] text-pretty sm:mt-7 sm:text-[1.0625rem]",
            inverted ? "text-white/76" : "text-muted-ink"
          )}
          initial={{ y: 14 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7, delay: 0.44, ease }}
        >
          Jeg er Lukas Svendsen, 16 år og fotograf og videograf i Grindsted. Jeg
          laver foto, video og content for virksomheder, organisationer og
          private i Danmark, og elsker at være med, når der skal skabes noget
          godt.
        </motion.p>

        <motion.div
          className="mt-9 flex w-full max-w-sm flex-col items-center gap-4 sm:mt-10 sm:max-w-none sm:flex-row sm:justify-center sm:gap-x-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.52, ease }}
        >
          <Link
            href="/booking"
            className={cn(
              "btn-solid w-full justify-center sm:w-auto",
              inverted ? "bg-paper text-ink" : "bg-ink text-paper"
            )}
          >
            Book en opgave
          </Link>
          <Link
            href="/arbejde"
            className={inverted ? "btn-ghost-on-dark" : "btn-ghost"}
          >
            Se mit arbejde
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center md:bottom-8"
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.95, ease }}
      >
        <span
          className={cn(
            "block h-8 w-px animate-[hero-scroll-hint_2.4s_ease-in-out_infinite] motion-reduce:animate-none",
            inverted ? "bg-white/35" : "bg-foreground/25"
          )}
        />
      </motion.div>
    </>
  );
}
