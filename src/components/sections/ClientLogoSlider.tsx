import Image from "next/image";
import type { ClientLogo } from "@/data/clients";

interface ClientLogoSliderProps {
  logos: ClientLogo[];
}

function LogoItem({
  client,
  duplicate = false,
}: {
  client: ClientLogo;
  duplicate?: boolean;
}) {
  return (
    <li className={`logo-marquee-item${duplicate ? " logo-marquee-item-duplicate" : ""}`}>
      <Image
        src={client.src}
        alt={duplicate ? "" : client.alt}
        width={client.width}
        height={client.height}
        loading="lazy"
        sizes="(max-width: 640px) 120px, 160px"
        quality={75}
        aria-hidden={duplicate ? true : undefined}
        className="logo-marquee-img brightness-[0.85] transition-opacity duration-500 ease-premium hover:opacity-90 sm:brightness-100"
      />
    </li>
  );
}

function LogoSet({
  logos,
  duplicate = false,
}: {
  logos: ClientLogo[];
  duplicate?: boolean;
}) {
  return (
    <ul className="logo-marquee-set" aria-hidden={duplicate ? true : undefined}>
      {logos.map((client) => (
        <LogoItem
          key={duplicate ? `${client.id}-dup` : client.id}
          client={client}
          duplicate={duplicate}
        />
      ))}
    </ul>
  );
}

export function ClientLogoSlider({ logos }: ClientLogoSliderProps) {
  return (
    <div className="logo-marquee" aria-label="Kundelogoer">
      <div className="logo-marquee-track motion-reduce:animate-none">
        <LogoSet logos={logos} />
        <LogoSet logos={logos} duplicate />
      </div>
    </div>
  );
}
