"use client";

import { useSyncExternalStore } from "react";

import { heroVideoPaths } from "@/lib/hero-video";
import { cn } from "@/lib/utils";

type HeroVideoBackgroundProps = {
  className?: string;
};

const DESKTOP_MQ = "(min-width: 768px)";
const REDUCE_MOTION_MQ = "(prefers-reduced-motion: reduce)";

function subscribeMedia(query: string, onStoreChange: () => void) {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getMediaMatch(query: string) {
  return () => window.matchMedia(query).matches;
}

function getMediaMatchServer() {
  return false;
}

/**
 * Hero background loop — HTML5 video only, no player library.
 * Desktop only (mobile keeps poster). Skipped when prefers-reduced-motion.
 */
export function HeroVideoBackground({ className }: HeroVideoBackgroundProps) {
  const isDesktop = useSyncExternalStore(
    (onChange) => subscribeMedia(DESKTOP_MQ, onChange),
    getMediaMatch(DESKTOP_MQ),
    getMediaMatchServer
  );
  const reduceMotion = useSyncExternalStore(
    (onChange) => subscribeMedia(REDUCE_MOTION_MQ, onChange),
    getMediaMatch(REDUCE_MOTION_MQ),
    getMediaMatchServer
  );

  if (!isDesktop || reduceMotion) return null;

  return (
    <video
      className={cn(
        "absolute inset-0 z-[1] h-full w-full object-cover object-[50%_38%] md:object-[40%_42%]",
        className
      )}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={heroVideoPaths.poster}
      disablePictureInPicture
      disableRemotePlayback
      aria-hidden
    >
      <source
        src={heroVideoPaths.hevc}
        type='video/mp4; codecs="hvc1.1.6.L120.B0"'
      />
      <source src={heroVideoPaths.h264} type="video/mp4" />
    </video>
  );
}
