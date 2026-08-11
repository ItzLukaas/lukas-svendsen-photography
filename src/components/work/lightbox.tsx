"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import type { ProjectImage } from "@/lib/data/projects";
import { cn } from "@/lib/utils";

type LightboxProps = {
  images: ProjectImage[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
  projectTitle: string;
};

export function Lightbox({
  images,
  index,
  onClose,
  onChange,
  projectTitle,
}: LightboxProps) {
  const open = index !== null;
  const reduceMotion = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const labelId = useId();
  const current = index !== null ? images[index] : null;

  const goPrev = useCallback(() => {
    if (index === null || images.length === 0) return;
    onChange((index - 1 + images.length) % images.length);
  }, [index, images.length, onChange]);

  const goNext = useCallback(() => {
    if (index === null || images.length === 0) return;
    onChange((index + 1) % images.length);
  }, [index, images.length, onChange]);

  useEffect(() => {
    if (!open) return;
    const root = document.getElementById("site-scroll");
    const previousBody = document.body.style.overflow;
    const previousRoot = root?.style.overflowY ?? "";
    document.body.style.overflow = "hidden";
    if (root) root.style.overflowY = "hidden";
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousBody;
      if (root) root.style.overflowY = previousRoot || "scroll";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, goPrev, goNext]);

  function onDialogKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    const focusable = event.currentTarget.querySelectorAll<HTMLElement>(
      "button[data-lightbox-control]"
    );
    if (focusable.length === 0 || event.key !== "Tab") return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <AnimatePresence>
      {open && current ? (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelId}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[100] flex flex-col bg-ink"
          onKeyDown={onDialogKeyDown}
        >
          <header className="relative z-20 flex shrink-0 items-center justify-between px-5 py-4 md:px-8">
            <p
              id={labelId}
              className="truncate text-sm font-medium text-paper/65"
            >
              {projectTitle}
              <span className="mx-2 text-paper/25" aria-hidden>
                /
              </span>
              <span className="tabular-nums text-paper/45">
                {(index ?? 0) + 1} / {images.length}
              </span>
            </p>
            <button
              ref={closeRef}
              type="button"
              data-lightbox-control
              onClick={onClose}
              className="min-h-11 min-w-11 text-sm font-medium text-paper/50 transition-colors hover:text-paper"
            >
              Luk
            </button>
          </header>

          <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center px-4 pb-4 md:px-20">
            <button
              type="button"
              data-lightbox-control
              onClick={goPrev}
              className="absolute left-3 z-20 hidden size-11 items-center justify-center text-paper/40 transition-colors hover:text-paper focus-visible:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper md:flex"
              aria-label="Forrige billede"
            >
              <span aria-hidden className="text-[1.75rem] font-light leading-none">
                ←
              </span>
            </button>

            <motion.div
              key={current.src + String(index)}
              initial={reduceMotion ? false : { opacity: 0.35 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.28 }}
              className="relative h-full max-h-[calc(100svh-8rem)] w-full max-w-[1680px]"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                priority
                unoptimized
                quality={95}
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>

            <button
              type="button"
              data-lightbox-control
              onClick={goNext}
              className="absolute right-3 z-20 hidden size-11 items-center justify-center text-paper/40 transition-colors hover:text-paper focus-visible:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper md:flex"
              aria-label="Næste billede"
            >
              <span aria-hidden className="text-[1.75rem] font-light leading-none">
                →
              </span>
            </button>
          </div>

          <footer className="relative z-20 flex shrink-0 items-center justify-center gap-10 pb-6 md:hidden">
            <button
              type="button"
              data-lightbox-control
              onClick={goPrev}
              className="min-h-11 px-2 text-sm font-medium text-paper/50 transition-colors hover:text-paper"
            >
              Forrige
            </button>
            <button
              type="button"
              data-lightbox-control
              onClick={goNext}
              className="min-h-11 px-2 text-sm font-medium text-paper/50 transition-colors hover:text-paper"
            >
              Næste
            </button>
          </footer>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

type GalleryFrameProps = {
  children: React.ReactNode;
  className?: string;
  label: string;
  onOpen: () => void;
};

/** Clickable frame — opens the lightbox. */
export function GalleryFrame({
  children,
  className,
  label,
  onOpen,
}: GalleryFrameProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={label}
      className={cn(
        "group relative block w-full cursor-zoom-in text-left outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink",
        className
      )}
    >
      {children}
    </button>
  );
}
