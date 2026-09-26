/**
 * Intro video — Mux Playback ID lives here only.
 */
export const introVideo = {
  playbackId: "02Nq3at7lYkAyG8NKDbr6MY4682rBAkPkhLDpk008ps4Q",
  title: "Lukas Svendsen – Introduktion",
  description:
    "Personlig introduktion — hvem jeg er, hvad jeg laver, og hvordan jeg arbejder.",
  aspectRatio: "1 / 1" as const,
  thumbnailTime: 0,
  /** Seconds trimmed from the end — player pauses before true EOF. */
  endTrimSeconds: 3,
} as const;

export function introPosterUrl(playbackId: string = introVideo.playbackId) {
  const id = playbackId.trim();
  if (!id) return undefined;
  return `https://image.mux.com/${id}/thumbnail.webp?time=${introVideo.thumbnailTime}&width=800`;
}

export function hasIntroPlaybackId() {
  return introVideo.playbackId.trim().length > 0;
}
