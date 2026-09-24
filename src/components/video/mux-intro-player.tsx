"use client";

import MuxPlayer from "@mux/mux-player-react/lazy";
import type { MuxPlayerProps } from "@mux/mux-player-react";
import type MuxPlayerElement from "@mux/mux-player";
import { useRef, useState } from "react";

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

/**
 * Mux Player — 1:1, contain. Soft end-trim; discrete load without CLS.
 */
export function MuxIntroPlayer({ className }: MuxIntroPlayerProps) {
  const endGuardActive = useRef(false);
  const [ready, setReady] = useState(false);
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
    }
  };

  const handlePlay: NonNullable<MuxPlayerProps["onPlay"]> = (event) => {
    const player = getPlayerFromEvent(event);
    if (!player) return;

    const stopAt = stopAtFor(player.duration);
    if (stopAt == null) return;

    // Soft end → restart from beginning (intentional replay).
    if (player.currentTime >= stopAt - 0.05) {
      endGuardActive.current = false;
      player.currentTime = 0;
    }
  };

  if (!hasIntroPlaybackId()) {
    return (
      <div
        className={cn(className)}
        style={{ aspectRatio: introVideo.aspectRatio }}
        role="status"
      >
        <div className="flex size-full items-center justify-center rounded-[1.25rem] border border-paper/15 bg-ink px-6 text-center">
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
      id="moed-lukas-player"
      data-ready={ready ? "true" : "false"}
      className={cn(
        "mux-intro-player aspect-square overflow-hidden rounded-[1.25rem] bg-ink",
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
        preload="metadata"
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
      />
    </div>
  );
}
