"use client";

import MuxPlayer from "@mux/mux-player-react/lazy";
import type { MuxPlayerProps } from "@mux/mux-player-react";
import type MuxPlayerElement from "@mux/mux-player";
import { useEffect, useRef, useState } from "react";

import {
  hasIntroPlaybackId,
  introPosterUrl,
  introVideo,
} from "@/lib/video/intro";
import { cn } from "@/lib/utils";

type MuxIntroPlayerProps = {
  className?: string;
};

function getPlayerFromEvent(event: Event): MuxPlayerElement | null {
  const target = event.currentTarget ?? event.target;
  if (!target || !(target instanceof HTMLElement)) return null;
  return target as unknown as MuxPlayerElement;
}

type DocumentWithWebkitFullscreen = Document & {
  webkitFullscreenElement?: Element | null;
  webkitCurrentFullScreenElement?: Element | null;
  webkitExitFullscreen?: () => void;
};

function isNodeInside(root: Node, node: EventTarget | null) {
  if (!(node instanceof Node)) return false;
  return root === node || root.contains(node);
}

function exitFullscreenIfIntro(root: HTMLElement) {
  const doc = document as DocumentWithWebkitFullscreen;
  const fullscreenElement =
    document.fullscreenElement ??
    doc.webkitFullscreenElement ??
    doc.webkitCurrentFullScreenElement ??
    null;

  if (!fullscreenElement || !isNodeInside(root, fullscreenElement)) return;

  if (document.exitFullscreen) {
    void document.exitFullscreen().catch(() => {});
    return;
  }

  doc.webkitExitFullscreen?.();
}

function disableNativeFullscreen(element: HTMLElement) {
  try {
    Object.defineProperty(element, "requestFullscreen", {
      configurable: true,
      value: async () => undefined,
    });
  } catch {
    /* getter-only in some browsers; fullscreenchange still exits */
  }

  const video = (
    element instanceof HTMLVideoElement
      ? element
      : element.shadowRoot?.querySelector("video") ??
        element.querySelector("video")
  ) as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;

  if (!video) return;

  video.playsInline = true;
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  try {
    video.webkitEnterFullscreen = () => {};
  } catch {
    /* iOS may expose a getter-only webkitEnterFullscreen */
  }
}

/**
 * Mux Player — 1:1, contain. Soft end-trim; discrete load without CLS.
 */
export function MuxIntroPlayer({ className }: MuxIntroPlayerProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const endGuardActive = useRef(false);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const playingRef = useRef(false);
  const playbackId = introVideo.playbackId.trim();
  const endTrim = introVideo.endTrimSeconds;
  const poster = introPosterUrl(playbackId);

  const playerStyle = {
    width: "100%",
    height: "100%",
    aspectRatio: introVideo.aspectRatio,
    "--media-object-fit": "contain",
    "--media-object-position": "center",
    "--controls-backdrop-color": "transparent",
    "--big-play-button": "none",
    "--seek-backward-button": "none",
    "--seek-forward-button": "none",
    "--pip-button": "none",
    "--cast-button": "none",
    "--airplay-button": "none",
    "--playback-rate-button": "none",
    "--rendition-menu-button": "none",
    "--fullscreen-button": "none",
    "--title-display": "none",
  } satisfies MuxPlayerProps["style"];

  const stopAtFor = (duration: number) =>
    Number.isFinite(duration) && duration > endTrim
      ? duration - endTrim
      : null;

  function getPlayer() {
    return (rootRef.current?.querySelector("mux-player") ??
      null) as MuxPlayerElement | null;
  }

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const onFullscreenChange = () => exitFullscreenIfIntro(root);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "f" && event.key !== "F") return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT")
      ) {
        return;
      }

      const path = event.composedPath();
      const active = document.activeElement;
      const inPlayer =
        path.includes(root) || isNodeInside(root, active);
      const playerHasPageFocus =
        playingRef.current &&
        (active === document.body ||
          active === document.documentElement ||
          inPlayer);
      if (!inPlayer && !playerHasPageFocus) return;

      event.preventDefault();
      event.stopPropagation();
      exitFullscreenIfIntro(root);
    };

    const onDoubleClick = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
    };

    const onBeginFullscreen = (event: Event) => {
      event.preventDefault();
      event.stopPropagation();
      exitFullscreenIfIntro(root);
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    document.addEventListener("webkitfullscreenchange", onFullscreenChange);
    document.addEventListener("keydown", onKeyDown, true);
    root.addEventListener("dblclick", onDoubleClick, true);
    root.addEventListener("webkitbeginfullscreen", onBeginFullscreen, true);

    const player = getPlayer();
    if (player) {
      player.setAttribute("hotkeys", "nof");
      player.setAttribute("playsinline", "");
      disableNativeFullscreen(player as unknown as HTMLElement);
    }

    const video = root.querySelector("video");
    if (video) disableNativeFullscreen(video);

    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", onFullscreenChange);
      document.removeEventListener("keydown", onKeyDown, true);
      root.removeEventListener("dblclick", onDoubleClick, true);
      root.removeEventListener("webkitbeginfullscreen", onBeginFullscreen, true);
    };
  }, [ready]);

  function playIntro() {
    const player = getPlayer();
    if (!player) return;
    void player.play();
  }

  const handleTimeUpdate: NonNullable<MuxPlayerProps["onTimeUpdate"]> = (
    event
  ) => {
    const player = getPlayerFromEvent(event);
    if (!player) return;

    const stopAt = stopAtFor(player.duration);
    if (stopAt == null) return;

    if (player.currentTime < stopAt) {
      endGuardActive.current = false;
      return;
    }

    if (endGuardActive.current) return;
    endGuardActive.current = true;
    player.pause();
    setPlaying(false);
    if (Math.abs(player.currentTime - stopAt) > 0.04) {
      player.currentTime = stopAt;
    }
  };

  const handleSeeked: NonNullable<MuxPlayerProps["onSeeked"]> = (event) => {
    const player = getPlayerFromEvent(event);
    if (!player) return;

    const stopAt = stopAtFor(player.duration);
    if (stopAt == null) return;

    if (player.currentTime > stopAt) {
      endGuardActive.current = true;
      player.currentTime = stopAt;
      player.pause();
      setPlaying(false);
    }
  };

  const handlePlay: NonNullable<MuxPlayerProps["onPlay"]> = (event) => {
    const player = getPlayerFromEvent(event);
    if (!player) return;

    const stopAt = stopAtFor(player.duration);
    if (stopAt == null) {
      setPlaying(true);
      return;
    }

    // Soft end → restart from beginning (intentional replay).
    if (player.currentTime >= stopAt - 0.05) {
      endGuardActive.current = false;
      player.currentTime = 0;
    }
    setPlaying(true);
  };

  if (!hasIntroPlaybackId()) {
    return (
      <div
        className={cn(className)}
        style={{ aspectRatio: introVideo.aspectRatio }}
        role="status"
      >
        <div className="flex size-full items-center justify-center border border-paper/15 bg-ink px-6 text-center">
          <p className="max-w-[28ch] text-[0.8125rem] leading-[1.55] text-paper/70">
            Indsæt Playback ID i{" "}
            <code className="font-mono text-[0.75rem] text-paper">
              src/lib/video/intro.ts
            </code>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      id="moed-lukas-player"
      data-ready={ready ? "true" : "false"}
      data-playing={playing ? "true" : "false"}
      className={cn(
        "mux-intro-player aspect-square overflow-hidden rounded-[1rem] bg-ink",
        className
      )}
      style={{
        aspectRatio: introVideo.aspectRatio,
        backgroundImage: poster ? `url(${poster})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <MuxPlayer
        className="mux-intro-player__media size-full"
        loading="viewport"
        playbackId={playbackId}
        streamType="on-demand"
        preload="none"
        poster={poster}
        thumbnailTime={introVideo.thumbnailTime}
        primaryColor="var(--paper)"
        secondaryColor="var(--ink)"
        accentColor="var(--ink)"
        metadata={{
          video_id: "homepage-intro",
          video_title: introVideo.title,
        }}
        style={playerStyle}
        onLoadedData={() => setReady(true)}
        onTimeUpdate={handleTimeUpdate}
        onSeeked={handleSeeked}
        onPlay={handlePlay}
        onPause={() => setPlaying(false)}
      />

      {!playing ? (
        <button
          type="button"
          className="mux-intro-player__play group/play absolute inset-0 z-10 flex items-center justify-center bg-ink/0 transition-colors duration-400 hover:bg-ink/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-6px] focus-visible:outline-paper"
          aria-label={`Afspil ${introVideo.title}`}
          onClick={playIntro}
        >
          <span className="inline-flex size-12 items-center justify-center bg-paper text-ink transition-[opacity,transform] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/play:opacity-90">
            <svg
              viewBox="0 0 12 12"
              className="size-3.5 translate-x-px"
              aria-hidden
            >
              <path fill="currentColor" d="M2.2 1.1v9.8L11 6z" />
            </svg>
          </span>
        </button>
      ) : null}
    </div>
  );
}
