export type ShowcaseVideo = {
  playbackId: string;
  title: string;
  description?: string;
};

export function muxStreamUrl(playbackId: string) {
  return `https://stream.mux.com/${playbackId}.m3u8`;
}

export function muxPosterUrl(playbackId: string, time = 1) {
  return `https://image.mux.com/${playbackId}/thumbnail.jpg?width=1920&time=${time}`;
}

export const videoproduktionShowcase: ShowcaseVideo = {
  playbackId: "P02DhMvXfXYetWG4nG02DVfj2DgmKPzUYOthHAS83OxCc",
  title: "Aftermovie",
  description: "Et udpluk fra fotografering, videoproduktion og droneflyvning.",
};
