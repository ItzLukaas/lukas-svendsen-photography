"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { HeroBackground } from "@/components/home/hero-background";
import { heroImage, heroMobileImage } from "@/lib/data/projects";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Framed, centered hero — first impression of the brand.
 * Positioning headline (not the name), soft readability veil, staggered entrance.
 */
export function HomeHero() {
  const reduceMotion = !!useReducedMotion();

  return (
    <section aria-label="Intro" className="bg-paper pt-[var(--chrome-h)]">
      <div className="mx-auto max-w-[1600px] px-5 pt-5 pb-10 sm:pt-6 md:px-8 md:pt-8 md:pb-14 lg:px-12 lg:pt-10 lg:pb-16">
        <div className="relative aspect-[3/4] overflow-hidden bg-ink sm:aspect-[4/5] md:aspect-[16/10] lg:aspect-[2.05/1]">
          <motion.div
            className="absolute inset-0"
            initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 1.15, ease }
            }
          >
            <HeroBackground image={heroImage} mobileImage={heroMobileImage} />
          </motion.div>

          {/* Soft center veil — keeps the photo visible, text readable */}
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(14_14_13_/_0.52)_0%,rgb(14_14_13_/_0.36)_46%,rgb(14_14_13_/_0.22)_72%,rgb(14_14_13_/_0.12)_100%)]"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(14_14_13_/_0.18)_0%,transparent_30%,transparent_70%,rgb(14_14_13_/_0.22)_100%)]"
            aria-hidden
          />

          <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 py-14 text-center sm:px-8 md:px-12 md:py-16 lg:px-16">
            <motion.p
              className="text-[0.6875rem] font-medium tracking-[0.16em] text-white/55 uppercase"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.65, delay: 0.28, ease }
              }
            >
              Foto · Video · Drone
            </motion.p>

            <motion.h1
              className="mt-4 font-display text-[clamp(2rem,5.2vw,4rem)] leading-[1.05] tracking-[-0.035em] text-balance text-white sm:mt-5"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.75, delay: 0.38, ease }
              }
            >
              Fotograf og videograf fra Grindsted
            </motion.h1>

            <motion.p
              className="mt-5 max-w-[28rem] text-[0.9375rem] leading-[1.65] text-pretty text-white/78 sm:mt-6 sm:text-[1.0625rem] md:max-w-[32rem]"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.7, delay: 0.5, ease }
              }
            >
              Jeg er {siteConfig.name}. Jeg laver foto, video og drone til
              koncerter, sport, events og brands — fra{" "}
              {siteConfig.location.city} og ud i Jylland.
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
                !reduceMotion && "animate-[hero-scroll-hint_2.4s_ease-in-out_infinite]"
              )}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
