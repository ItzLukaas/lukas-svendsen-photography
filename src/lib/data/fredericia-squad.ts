/**
 * Fredericia Håndboldklub — 1. divisionskvinder.
 * Kun spillere med Halv-Hvid-portræt fra shoot-mappen.
 */
export type FredericiaSquadPlayer = {
  name: string;
  number: string;
  jerseyName?: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export const fredericiaSquadUrl =
  "https://fhk.dk/1div-kvinder/1-div-kvinder-spillertrup-og-stab";

const portrait = (
  src: string,
  alt: string
): FredericiaSquadPlayer["image"] => ({
  src,
  alt,
  width: 1467,
  height: 2200,
});

/** Sorteret efter trøjenummer — kun fotograferede spillere. */
export const fredericiaSquadPlayers: FredericiaSquadPlayer[] = [
  {
    name: "Elina Nyholm Sørensen",
    number: "2",
    image: portrait(
      "/images/projects/fredericia-haandboldklub/fhk-squad/02-fhk-elina-nyholm-sorensen.jpg",
      "Elina Nyholm Sørensen — Fredericia Håndbold, nummer 2"
    ),
  },
  {
    name: "Freja Thor Ammidtsbøl Andersen",
    jerseyName: "Midtsbøl",
    number: "3",
    image: portrait(
      "/images/projects/fredericia-haandboldklub/fhk-squad/03-fhk-freja-thor-ammidtsbol-andersen.jpg",
      "Freja Thor Ammidtsbøl Andersen — Fredericia Håndbold, nummer 3"
    ),
  },
  {
    name: "Maria Husted",
    number: "4",
    image: portrait(
      "/images/projects/fredericia-haandboldklub/fhk-squad/04-fhk-maria-husted.jpg",
      "Maria Husted — Fredericia Håndbold, nummer 4"
    ),
  },
  {
    name: "Mille Bekke Andersen",
    number: "5",
    image: portrait(
      "/images/projects/fredericia-haandboldklub/fhk-squad/05-fhk-mille-bekke-andersen.jpg",
      "Mille Bekke Andersen — Fredericia Håndbold, nummer 5"
    ),
  },
  {
    name: "Laura Galle Hansen",
    number: "6",
    image: portrait(
      "/images/projects/fredericia-haandboldklub/fhk-squad/06-fhk-laura-galle-hansen.jpg",
      "Laura Galle Hansen — Fredericia Håndbold, nummer 6"
    ),
  },
  {
    name: "Louise Haandbæk",
    number: "7",
    image: portrait(
      "/images/projects/fredericia-haandboldklub/fhk-squad/07-fhk-louise-haandbaek.jpg",
      "Louise Haandbæk — Fredericia Håndbold, nummer 7"
    ),
  },
  {
    name: "Julie Laursen",
    number: "11",
    image: portrait(
      "/images/projects/fredericia-haandboldklub/fhk-squad/11-fhk-julie-laursen.jpg",
      "Julie Laursen — Fredericia Håndbold, nummer 11"
    ),
  },
  {
    name: "Andrea Kemph",
    number: "12",
    image: portrait(
      "/images/projects/fredericia-haandboldklub/fhk-squad/12-fhk-andrea-kemph.jpg",
      "Andrea Kemph — Fredericia Håndbold, nummer 12"
    ),
  },
  {
    name: "Amalie Fejrskov Knudsen",
    number: "17",
    image: portrait(
      "/images/projects/fredericia-haandboldklub/fhk-squad/17-fhk-amalie-fejrskov-knudsen.jpg",
      "Amalie Fejrskov Knudsen — Fredericia Håndbold, nummer 17"
    ),
  },
  {
    name: "Eline Osland",
    number: "19",
    image: portrait(
      "/images/projects/fredericia-haandboldklub/fhk-squad/19-fhk-eline-osland.jpg",
      "Eline Osland — Fredericia Håndbold, nummer 19"
    ),
  },
  {
    name: "Emma Skou Larsen",
    number: "20",
    image: portrait(
      "/images/projects/fredericia-haandboldklub/fhk-squad/20-fhk-emma-skou-larsen.jpg",
      "Emma Skou Larsen — Fredericia Håndbold, nummer 20"
    ),
  },
  {
    name: "Sophie Voldby",
    number: "23",
    image: portrait(
      "/images/projects/fredericia-haandboldklub/fhk-squad/23-fhk-sophie-voldby.jpg",
      "Sophie Voldby — Fredericia Håndbold, nummer 23"
    ),
  },
  {
    name: "Isabel Jakobsen",
    number: "25",
    image: portrait(
      "/images/projects/fredericia-haandboldklub/fhk-squad/25-fhk-isabel-jakobsen.jpg",
      "Isabel Jakobsen — Fredericia Håndbold, nummer 25"
    ),
  },
  {
    name: "Annette Wirén Larsen",
    number: "27",
    image: portrait(
      "/images/projects/fredericia-haandboldklub/fhk-squad/27-fhk-annette-wiren-larsen.jpg",
      "Annette Wirén Larsen — Fredericia Håndbold, nummer 27"
    ),
  },
  {
    name: "Katrine Langfeldt",
    number: "28",
    image: portrait(
      "/images/projects/fredericia-haandboldklub/fhk-squad/28-fhk-katrine-langfeldt.jpg",
      "Katrine Langfeldt — Fredericia Håndbold, nummer 28"
    ),
  },
  {
    name: "Julie Grønne Thinggård",
    number: "29",
    image: portrait(
      "/images/projects/fredericia-haandboldklub/fhk-squad/29-fhk-julie-gronne-thinggard.jpg",
      "Julie Grønne Thinggård — Fredericia Håndbold, nummer 29"
    ),
  },
  {
    name: "Nikoline Johansen",
    number: "37",
    image: portrait(
      "/images/projects/fredericia-haandboldklub/fhk-squad/37-fhk-nikoline-johansen.jpg",
      "Nikoline Johansen — Fredericia Håndbold, nummer 37"
    ),
  },
];

export const fredericiaSquadCount = fredericiaSquadPlayers.length;
