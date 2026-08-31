import { FadeIn } from "@/components/motion/fade-in";
import { Photo } from "@/components/photography/photo";
import {
  fredericiaPhotographedCount,
  fredericiaSquadPlayers,
  fredericiaSquadUrl,
  type FredericiaSquadPlayer,
} from "@/lib/data/fredericia-squad";
import { cn } from "@/lib/utils";

const FHK_RED = "#ff0033";

function SquadPlayerCard({
  player,
  index,
}: {
  player: FredericiaSquadPlayer;
  index: number;
}) {
  const hasImage = Boolean(player.fhkImage);

  return (
    <li>
      <FadeIn delay={Math.min(0.02 + index * 0.025, 0.22)}>
        <article className="group relative overflow-hidden bg-paper shadow-[0_1px_0_rgba(0,0,0,0.06)]">
          <div className="relative aspect-[640/880] bg-mist/30">
            {hasImage && player.fhkImage ? (
              <Photo
                src={player.fhkImage.src}
                alt={player.fhkImage.alt}
                fill
                sizes="(min-width: 1280px) 20vw, (min-width: 640px) 25vw, 50vw"
                className="absolute inset-0"
                imageClassName="object-cover object-top"
                quality={88}
                interactive
              />
            ) : (
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-b from-mist/20 to-mist/50"
              />
            )}

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

type FredericiaClubUseProps = {
  /** When true, section is the main project content (not an add-on below a gallery). */
  primary?: boolean;
};

export function FredericiaClubUse({ primary = false }: FredericiaClubUseProps) {
  return (
    <section
      aria-labelledby="fredericia-club-use-heading"
      className={cn(
        primary ? "mt-0" : "mt-24 border-t border-foreground/10 md:mt-32"
      )}
    >
      <div className="mx-auto max-w-[1600px] px-5 py-[var(--space-section-sm)] md:px-8 lg:px-12">
        <FadeIn>
          <p className="label-meta">Brugt af Fredericia Håndboldklub</p>
          <h2
            id="fredericia-club-use-heading"
            className="mt-3 max-w-[14ch] font-display text-[clamp(1.85rem,3.8vw,2.85rem)] leading-[1.05] tracking-[-0.03em]"
          >
            I brug i klubben
          </h2>
          <p className="text-body mt-5 max-w-[52ch]">
            Mine billeder bliver ikke kun brugt i portfolioen. De indgår
            direkte i Fredericia Håndboldklubs kommunikation og præsentation af
            spillertruppen — sammen med resten af 1. divisionsholdet.
          </p>
        </FadeIn>

        <ul className="mt-12 m-0 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:mt-16 xl:grid-cols-5">
          {fredericiaSquadPlayers.map((player, index) => (
            <SquadPlayerCard key={player.number} player={player} index={index} />
          ))}
        </ul>

        <FadeIn delay={0.08}>
          <p className="mx-auto mt-12 max-w-[52ch] text-center text-[0.9375rem] leading-[1.65] text-muted-ink md:mt-14">
            {fredericiaPhotographedCount} af portrætterne i gridet er mine
            fotografier — brugt i klubbens officielle præsentation på{" "}
            <a
              href={fredericiaSquadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ink underline decoration-foreground/25 underline-offset-[0.2em] transition-[decoration-color,opacity] duration-300 hover:decoration-foreground/60 hover:opacity-80"
            >
              fhk.dk
            </a>
            .
          </p>
          <p className="mx-auto mt-4 max-w-[44ch] text-center text-[0.875rem] leading-[1.65] text-muted-ink">
            Fotografierne indgår som en del af klubbens officielle
            spillerpræsentation — fra shoot til live på klubbens hjemmeside.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
