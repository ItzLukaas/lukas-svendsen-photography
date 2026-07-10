"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { Pause, Play } from "lucide-react";

type StreamVideoPlayerProps = {
  src: string;
  poster: string;
  title: string;
};

export function StreamVideoPlayer({ src, poster, title }: StreamVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const destroyHls = useCallback(() => {
    hlsRef.current?.destroy();
    hlsRef.current = null;
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    const video = videoRef.current;
    if (!video) return;

    setIsLoading(true);

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      setIsLoading(false);
      return;
    }

    if (!Hls.isSupported()) {
      setIsLoading(false);
      return;
    }

    const hls = new Hls({ enableWorker: true });
    hlsRef.current = hls;
    hls.loadSource(src);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, () => setIsLoading(false));
    hls.on(Hls.Events.ERROR, (_, data) => {
      if (data.fatal) {
        setIsLoading(false);
      }
    });

    return destroyHls;
  }, [destroyHls, hasStarted, src]);

  useEffect(() => {
    return destroyHls;
  }, [destroyHls]);

  const togglePlayback = async () => {
    const video = videoRef.current;
    if (!video) return;

    if (!hasStarted) {
      setIsLoading(true);
      setHasStarted(true);
      return;
    }

    if (video.paused) {
      await video.play();
    } else {
      video.pause();
    }
  };

  useEffect(() => {
    if (!hasStarted || isLoading) return;

    const video = videoRef.current;
    if (!video) return;

    void video.play().catch(() => {
      // Autoplay kan blokeres — brugeren kan trykke play igen.
    });
  }, [hasStarted, isLoading]);

  return (
    <div className="group relative aspect-video overflow-hidden border border-white/10 bg-[#070707]">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        poster={poster}
        preload="none"
        playsInline
        controls={hasStarted && !isLoading}
        aria-label={title}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      {(!hasStarted || isLoading) && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={poster}
            alt={title}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-[#0a0a0a]/20 to-[#0a0a0a]/30" />
        </>
      )}

      {(!hasStarted || isLoading || !isPlaying) && (
        <button
          type="button"
          onClick={() => void togglePlayback()}
          className="absolute inset-0 flex items-center justify-center"
          aria-label={hasStarted ? "Afspil video" : `Afspil ${title}`}
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-[#0a0a0a]/55 text-white backdrop-blur-sm transition-all duration-500 ease-premium group-hover:scale-105 group-hover:border-white/40">
            {isLoading ? (
              <span className="h-5 w-5 animate-pulse rounded-full bg-white/70" />
            ) : isPlaying ? (
              <Pause size={22} strokeWidth={1.5} />
            ) : (
              <Play size={22} strokeWidth={1.5} className="ml-0.5" />
            )}
          </span>
        </button>
      )}
    </div>
  );
}
