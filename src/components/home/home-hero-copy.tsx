"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Hero text + CTAs only — media stays server-rendered for LCP.
 */
export function HomeHeroCopy() {
  const reduceMotion = !!useReducedMotion();

  return (
    <>
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 py-14 text-center sm:px-8 md:px-12 md:py-16 lg:px-16">
        <motion.p
          className="text-[0.6875rem] font-medium tracking-[0.16em] text-white/70 uppercase"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.65, delay: 0.28, ease }
          }
        >
          Foto · Video · Content · Drone
        </motion.p>

        <motion.h1
          className="mt-4 max-w-[20ch] font-display text-[clamp(2rem,5.2vw,4rem)] leading-[1.05] tracking-[-0.035em] text-balance text-white sm:mt-5"
          initial={reduceMotion ? false : { y: 18 }}
          animate={{ y: 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.75, delay: 0.38, ease }
          }
        >
          Fotograf og videograf i Grindsted
        </motion.h1>

        <motion.p
          className="mt-5 max-w-[34rem] text-[0.9375rem] leading-[1.65] text-pretty text-white/78 sm:mt-6 sm:text-[1.0625rem]"
          initial={reduceMotion ? false : { y: 14 }}
          animate={{ y: 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.7, delay: 0.5, ease }
          }
        >
          Jeg tager foto- og videoopgaver for virksomheder, organisationer og
          private. Uanset om det er til hjemmeside, sociale medier, en kampagne
          eller en vigtig dag, leverer jeg materiale, der holder.
        </motion.p>

        <motion.p
          className="mt-4 max-w-[34rem] text-[0.9375rem] leading-[1.65] text-pretty text-white/65 sm:text-[1rem]"
          initial={reduceMotion ? false : { y: 12 }}
          animate={{ y: 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.7, delay: 0.58, ease }
          }
        >
          Base i Grindsted. Jeg møder op i Billund, Vejle, Esbjerg og resten af
          Jylland, når opgaven kræver det.
        </motion.p>

        <motion.div
          className="mt-8 flex w-full max-w-sm flex-col items-center gap-4 sm:mt-9 sm:max-w-none sm:flex-row sm:justify-center sm:gap-x-8 sm:gap-y-0"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.65, delay: 0.62, ease }
          }
        >
          <Link
            href="/booking"
            className="btn-solid w-full justify-center bg-paper text-ink sm:w-auto"
          >
            Book mig
          </Link>
          <Link href="/arbejde" className="btn-ghost-on-dark">
            Se mit arbejde
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-5 z-10 flex justify-center md:bottom-7"
        aria-hidden
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 0.8, delay: 1.05, ease }
        }
      >
        <span
          className={cn(
            "block h-7 w-px bg-white/35",
            !reduceMotion &&
              "animate-[hero-scroll-hint_2.4s_ease-in-out_infinite]"
          )}
        />
      </motion.div>
    </>
  );
}
