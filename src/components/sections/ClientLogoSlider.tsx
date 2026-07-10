import Image from "next/image";
import Link from "next/link";
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
      loading="lazy"
      fetchPriority="low"
      sizes="(max-width: 640px) 120px, 160px"
      quality={75}
      className="logo-marquee-img"
    />
  );

  const isExternal = client.href?.startsWith("http");

  return (
    <li
      className={`logo-marquee-item${interactive ? "" : " logo-marquee-item-duplicate"}`}
      aria-hidden={interactive ? undefined : true}
    >
      {interactive && client.href ? (
        <Link href={client.href} className="logo-marquee-link" aria-label={client.name}>
          {image}
        </Link>
      ) : (
        <span className="logo-marquee-link pointer-events-none">{image}</span>
      )}
    </li>
  );
}

export function ClientLogoSlider({ logos }: ClientLogoSliderProps) {
  const trackLogos = [...logos, ...logos];

  return (
    <div className="logo-marquee" aria-label="Kundelogoer">
      <ul className="logo-marquee-track motion-reduce:animate-none">
        {trackLogos.map((client, index) => (
          <LogoItem
            key={`${client.id}-${index}`}
            client={client}
            interactive={index < logos.length}
          />
        ))}
      </ul>
    </div>
  );
}
