# Billed-inbox

Smid dine rå billeder ind i den rigtige projektmappe (op til **40 MB** pr. fil).

## Mapper

| Mappe | Projekt |
| --- | --- |
| `hero/` | Forside-hero — billede (`hero.jpg`) eller dronevideo (`*.mp4`) |
| `about/` | Om mig-portræt (`public/images/about.jpg`) |
| `bork-festival/` | Bork Festival |
| `varde-open-air/` | Varde Open Air |
| `thor-farlov-smukfest/` | Thor Farlov — Smukfest (9 højformat) |
| `gron-koncert/` | Sivas — Grøn Koncert (9 portrætter) |
| `esbjerg-streetfood/` | Esbjerg Streetfood |
| `dm-finalen-herrer/` | DM-finalen – Herrer |
| `dm-finalen-kvinder/` | DM-finalen – Kvinder |

## Sådan gør du

1. Læg JPG/PNG/WEBP/HEIC i fx `inbox/bork-festival/`
2. Kør i terminalen:

```bash
npm run images:process
```

3. Scriptet:
   - komprimerer og tilpasser størrelse (web-klar)
   - lægger filerne i `public/images/projects/<projekt>/`
   - opdaterer galleriet på siden
   - flytter originalerne til `inbox/_done/<projekt>/`

## Tip til Thor Farlov — Smukfest

- Kun **højformat** (lodrette) billeder — 9 stk.
- Navngiv gerne `01-….jpg` … `09-….jpg`, så rækkefølgen matcher galleriet.
- Første billede bliver cover.

## Tip til Bork Festival

- **Lodrette** billeder (højde > bredde) bliver koncert-/hero-portrætter
- **Vandrette** billeder bliver festival-atmosfære

Sorter gerne filnavne, hvis rækkefølgen betyder noget (`01-artist.jpg`, `02-crowd.jpg`, …).

Læg MP4/MOV i `inbox/hero/` eller direkte i `inbox/` (op til **500 MB** — 4K er fint).

```bash
npm run hero:process
```

Scriptet laver to web-versioner fra din 4K-kilde:

| Fil | Format | Kvalitet |
| --- | --- | --- |
| `hero-hevc.mp4` | HEVC 1080p30 | Primær — bedst kvalitet/størrelse (Safari, mange Edge) |
| `hero.mp4` | H.264 1080p30 | Fallback — alle browsere |
| `hero-poster.jpg` | 1920px still | Mens video loader |

Originalen flyttes til `_done/hero/`. 300 MB rå 4K kan ikke serveres direkte — men 1080p30 med høj bitrate bevarer det meste af det visuelle.
