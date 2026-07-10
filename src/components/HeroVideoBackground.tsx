"use client";

import { useEffect, useRef, useState } from "react";

type HeroVideoBackgroundProps = {
  src: string;
  poster: string;
};

export function HeroVideoBackground({ src, poster }: HeroVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const video = videoRef.current;
    if (!video) return;

    let hls: { destroy: () => void } | null = null;
    let cancelled = false;

    const startPlayback = () => {
      if (cancelled) return;
      void video.play().catch(() => {
        // Autoplay kan blokeres — poster vises stadig.
      });
    };

    const setup = async () => {
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = src;
        video.addEventListener("loadedmetadata", startPlayback, { once: true });
        return;
      }

      const { default: Hls } = await import("hls.js");
      if (cancelled || !Hls.isSupported()) return;

      const instance = new Hls({ enableWorker: true });
      hls = instance;
      instance.loadSource(src);
      instance.attachMedia(video);
      instance.on(Hls.Events.MANIFEST_PARSED, startPlayback);
    };

    void setup();

    return () => {
      cancelled = true;
      hls?.destroy();
    };
  }, [prefersReducedMotion, src]);

  if (prefersReducedMotion) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={poster}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <video
        ref={videoRef}
        className="absolute left-1/2 top-1/2 h-full w-full min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover"
        poster={poster}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
      />
    </div>
  );
}
