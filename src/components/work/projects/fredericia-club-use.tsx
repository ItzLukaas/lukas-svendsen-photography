import { FadeIn } from "@/components/motion/fade-in";
import { Photo } from "@/components/photography/photo";
import {
  fredericiaPhotographedCount,
  fredericiaSquadPlayers,
  fredericiaSquadUrl,
  type FredericiaSquadPlayer,
} from "@/lib/data/fredericia-squad";

function SquadPlayerCard({
  player,
  index,
}: {
  player: FredericiaSquadPlayer;
  index: number;
}) {
  const hasPortrait = Boolean(player.portrait);

  return (
    <li className="bg-paper">
      <FadeIn delay={Math.min(0.02 + index * 0.025, 0.22)}>
        <article className="group h-full">
          {hasPortrait && player.portrait ? (
            <div className="relative aspect-[2/3] overflow-hidden">
              <Photo
                src={player.portrait.src}
                alt={player.portrait.alt}
                fill
                sizes="(min-width: 1280px) 20vw, (min-width: 640px) 25vw, 50vw"
                className="absolute inset-0"
                imageClassName="object-cover"
                quality={88}
                interactive
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:opacity-0"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-1 px-4 pb-4 opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:hidden"
              >
                <p className="font-display text-[1.125rem] leading-tight tracking-[-0.02em] text-paper">
                  {player.name}
                </p>
                <p className="mt-0.5 text-[0.75rem] text-paper/75">
                  #{player.number}
                </p>
              </div>
            </div>
          ) : (
            <div className="relative flex aspect-[2/3] flex-col justify-end border-b border-foreground/8 bg-mist/40 px-4 py-5">
              <p
                aria-hidden
                className="font-display text-[clamp(2.5rem,6vw,3.25rem)] leading-none tracking-[-0.04em] text-foreground/10"
              >
                {player.number}
              </p>
            </div>
          )}

          <div className="border-t border-foreground/8 px-3 py-3.5 sm:px-4 sm:py-4">
            <h3 className="font-display text-[0.9375rem] leading-tight tracking-[-0.02em] sm:text-[1.05rem]">
              {player.name}
            </h3>
            <p className="mt-1 text-[0.6875rem] tracking-[0.04em] text-muted-ink uppercase">
              #{player.number}
              {player.jerseyName ? (
                <span className="normal-case tracking-normal">
                  {" "}
                  · {player.jerseyName} på trøjen
                </span>
              ) : null}
              {hasPortrait ? (
                <span className="normal-case tracking-normal">
                  {" "}
                  · Mit portræt
                </span>
              ) : null}
            </p>
          </div>
        </article>
      </FadeIn>
    </li>
  );
}

export function FredericiaClubUse() {
  return (
    <section
      aria-labelledby="fredericia-club-use-heading"
      className="mt-24 border-t border-foreground/10 md:mt-32"
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

        <ul className="mt-12 m-0 grid list-none grid-cols-2 gap-px border border-foreground/10 bg-foreground/10 p-0 sm:grid-cols-3 md:grid-cols-4 lg:mt-16 xl:grid-cols-5">
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
