"use client";

import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Photo } from "@/components/photography/photo";
import type { ProjectImage } from "@/lib/data/projects";

type HeroBackgroundProps = {
  poster: ProjectImage;
  videoSrc: string;
  videoSrcHevc?: string;
};

function pickVideoSrc(h264: string, hevc?: string) {
  if (!hevc || typeof document === "undefined") return h264;

  const probe = document.createElement("video");
  const support = probe.canPlayType('video/mp4; codecs="hvc1"');
  return support === "probably" || support === "maybe" ? hevc : h264;
}

function prefersVideoPlayback() {
  if (typeof window === "undefined") return false;

  const desktop = window.matchMedia("(min-width: 768px)").matches;
  const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
  const saveData = nav.connection?.saveData === true;
  return desktop && !saveData;
}

/**
 * Hero media — poster everywhere; muted looping video on desktop only.
 */
export function HeroBackground({
  poster,
  videoSrc,
  videoSrcHevc,
}: HeroBackgroundProps) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const triedFallback = useRef(false);
  const [src, setSrc] = useState(() =>
    pickVideoSrc(videoSrc, videoSrcHevc)
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [canPlayVideo, setCanPlayVideo] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setCanPlayVideo(prefersVideoPlayback());

    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const showVideo = reduceMotion !== true && canPlayVideo;

  const syncPlaying = useCallback((video: HTMLVideoElement) => {
    if (!video.paused && video.readyState >= 2) {
      setIsPlaying(true);
    }
  }, []);

  const tryPlay = useCallback(
    async (video: HTMLVideoElement) => {
      video.muted = true;
      try {
        await video.play();
        syncPlaying(video);
      } catch {
        /* Poster forbliver synlig indtil afspilning lykkes */
      }
    },
    [syncPlaying]
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!showVideo || !video) {
      setIsPlaying(false);
      return;
    }

    let active = true;
    setIsPlaying(false);
    triedFallback.current = false;

    const play = () => {
      if (active) void tryPlay(video);
    };

    const onPlaying = () => {
      if (active) setIsPlaying(true);
    };

    video.load();
    play();

    video.addEventListener("loadeddata", play);
    video.addEventListener("canplay", play);
    video.addEventListener("playing", onPlaying);
    video.addEventListener("timeupdate", onPlaying, { once: true });

    const onPageShow = (event: PageTransitionEvent) => {
      if (!active) return;
      setIsPlaying(false);
      if (event.persisted) video.load();
      play();
    };

    const onVisibility = () => {
      if (!active || document.hidden) return;
      if (video.paused) play();
    };

    window.addEventListener("pageshow", onPageShow);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      active = false;
      video.removeEventListener("loadeddata", play);
      video.removeEventListener("canplay", play);
      video.removeEventListener("playing", onPlaying);
      window.removeEventListener("pageshow", onPageShow);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [showVideo, src, tryPlay]);

  function handleError() {
    if (!triedFallback.current && src !== videoSrc) {
      triedFallback.current = true;
      setSrc(videoSrc);
      setIsPlaying(false);
    }
  }

  return (
    <>
      <Photo
        src={poster.src}
        alt={poster.alt}
        fill
        priority
        quality={88}
        sizes="100vw"
        className="absolute inset-0 z-0"
        imageClassName={`object-cover object-center transition-opacity duration-1000 ${
          isPlaying ? "opacity-0" : "opacity-100"
        }`}
      />

      {showVideo ? (
        <video
          ref={videoRef}
          src={src}
          className={`absolute inset-0 z-0 h-full w-full object-cover object-center transition-opacity duration-1000 ${
            isPlaying ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster.src}
          aria-hidden
          onPlaying={() => setIsPlaying(true)}
          onError={handleError}
        />
      ) : null}
    </>
  );
}
