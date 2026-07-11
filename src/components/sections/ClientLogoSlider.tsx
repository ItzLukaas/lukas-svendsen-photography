import Image from "next/image";
import type { ClientLogo } from "@/data/clients";

interface ClientLogoSliderProps {
  logos: ClientLogo[];
}

function LogoItem({
  client,
  interactive,
}: {
  client: ClientLogo;
  interactive: boolean;
}) {
  const image = (
    <Image
      src={client.src}
      alt={client.alt}
      width={client.width}
      height={client.height}
      loading="eager"
      sizes="(max-width: 640px) 120px, 160px"
      quality={75}
      className="logo-marquee-img"
    />
  );

  return (
    <li
      className={`logo-marquee-item${interactive ? "" : " logo-marquee-item-duplicate"}`}
      aria-hidden={interactive ? undefined : true}
    >
      {interactive && client.href ? (
        <a
          href={client.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Besøg ${client.name}`}
          className="logo-marquee-link"
        >
          {image}
        </a>
      ) : (
        <span className="logo-marquee-link pointer-events-none">{image}</span>
      )}
    </li>
  );
}

export function ClientLogoSlider({ logos }: ClientLogoSliderProps) {
  return (
    <div className="logo-marquee" aria-label="Kundelogoer">
      <div className="logo-marquee-track motion-reduce:animate-none">
        {[0, 1].map((segment) => (
          <ul
            key={segment}
            className={`logo-marquee-segment${
              segment > 0 ? " logo-marquee-segment-duplicate" : ""
            }`}
            aria-hidden={segment > 0 ? true : undefined}
          >
            {logos.map((client) => (
              <LogoItem
                key={`${client.id}-${segment}`}
                client={client}
                interactive={segment === 0}
              />
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
