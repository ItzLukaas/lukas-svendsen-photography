import { FadeIn } from "@/components/motion/fade-in";
import { Photo } from "@/components/photography/photo";
import {
  fredericiaSquadPlayers,
  type FredericiaSquadPlayer,
} from "@/lib/data/fredericia-squad";

const FHK_RED = "#ff0033";

function SquadPlayerCard({
  player,
  index,
}: {
  player: FredericiaSquadPlayer;
  index: number;
}) {
  return (
    <li>
      <FadeIn delay={Math.min(0.02 + index * 0.025, 0.22)}>
        <article className="group relative overflow-hidden bg-paper shadow-[0_1px_0_rgba(0,0,0,0.06)]">
          <div className="relative aspect-[640/880] bg-mist/30">
            <Photo
              src={player.image.src}
              alt={player.image.alt}
              fill
              sizes="(min-width: 1280px) 20vw, (min-width: 640px) 25vw, 50vw"
              className="absolute inset-0"
              imageClassName="object-cover object-top"
              quality={88}
              interactive
            />

            <p
              aria-hidden
              className="pointer-events-none absolute right-2 top-1 font-display text-[clamp(3rem,9vw,4.5rem)] leading-none tracking-[-0.05em] text-foreground/[0.08] sm:right-3 sm:top-2"
            >
              {player.number}
            </p>

            <div
              className="absolute bottom-0 left-0 max-w-[88%] px-3 py-2 sm:px-3.5 sm:py-2.5"
              style={{ backgroundColor: FHK_RED }}
            >
              <p className="font-display text-[0.8125rem] leading-tight tracking-[-0.01em] text-paper sm:text-[0.9375rem]">
                {player.name}
              </p>
            </div>
          </div>
        </article>
      </FadeIn>
    </li>
  );
}

export function FredericiaClubUse() {
  return (
    <div className="mx-auto max-w-[1600px] px-5 md:px-8 lg:px-12">
      <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 xl:grid-cols-5">
        {fredericiaSquadPlayers.map((player, index) => (
          <SquadPlayerCard key={player.number} player={player} index={index} />
        ))}
      </ul>
    </div>
  );
}
