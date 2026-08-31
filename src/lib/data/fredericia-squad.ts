/**
 * 1. divisionskvinder — Fredericia Håndboldklub.
 * Navne og numre fra den officielle spillertrup (offentligt tilgængeligt).
 * Visningsbilleder hentet fra fhk.dk; `photographedByLukas` markerer Lukas' egne portrætter.
 */
export type FredericiaSquadPlayer = {
  name: string;
  number: string;
  jerseyName?: string;
  photographedByLukas?: boolean;
  fhkImage?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export const fredericiaSquadUrl =
  "https://fhk.dk/1div-kvinder/1-div-kvinder-spillertrup-og-stab";

const fhk = (
  src: string,
  alt: string,
  width = 640,
  height = 880
): FredericiaSquadPlayer["fhkImage"] => ({
  src,
  alt,
  width,
  height,
});

export const fredericiaSquadPlayers: FredericiaSquadPlayer[] = [
  {
    name: "Elina Nyholm Sørensen",
    number: "2",
    fhkImage: fhk(
      "/images/projects/fredericia-haandboldklub/fhk-squad/02-fhk-elina-nyholm-sorensen.jpg",
      "Elina Nyholm Sørensen — Fredericia Håndbold, nummer 2"
    ),
  },
  {
    name: "Freja Thor Ammidtsbøl Andersen",
    jerseyName: "Midtsbøl",
    number: "3",
    photographedByLukas: true,
    fhkImage: fhk(
      "/images/projects/fredericia-haandboldklub/fhk-squad/03-fhk-freja-thor-ammidtsbol-andersen.jpg",
      "Freja Thor Ammidtsbøl Andersen — Fredericia Håndbold, nummer 3"
    ),
  },
  {
    name: "Maria Husted",
    number: "4",
    photographedByLukas: true,
    fhkImage: fhk(
      "/images/projects/fredericia-haandboldklub/fhk-squad/04-fhk-maria-husted.jpg",
      "Maria Husted — Fredericia Håndbold, nummer 4"
    ),
  },
  {
    name: "Mille Bekke Andersen",
    number: "5",
    fhkImage: fhk(
      "/images/projects/fredericia-haandboldklub/fhk-squad/05-fhk-mille-bekke-andersen.jpg",
      "Mille Bekke Andersen — Fredericia Håndbold, nummer 5"
    ),
  },
  {
    name: "Laura Galle Hansen",
    number: "6",
    fhkImage: fhk(
      "/images/projects/fredericia-haandboldklub/fhk-squad/06-fhk-laura-galle-hansen.jpg",
      "Laura Galle Hansen — Fredericia Håndbold, nummer 6"
    ),
  },
  {
    name: "Louise Haandbæk",
    number: "7",
    fhkImage: fhk(
      "/images/projects/fredericia-haandboldklub/fhk-squad/07-fhk-louise-haandbaek.jpg",
      "Louise Haandbæk — Fredericia Håndbold, nummer 7"
    ),
  },
  {
    name: "Julie Laursen",
    number: "11",
    fhkImage: fhk(
      "/images/projects/fredericia-haandboldklub/fhk-squad/11-fhk-julie-laursen.jpg",
      "Julie Laursen — Fredericia Håndbold, nummer 11"
    ),
  },
  {
    name: "Andrea Kemph",
    number: "12",
    fhkImage: fhk(
      "/images/projects/fredericia-haandboldklub/fhk-squad/12-fhk-andrea-kemph.jpg",
      "Andrea Kemph — Fredericia Håndbold, nummer 12"
    ),
  },
  {
    name: "Kira Nyboe",
    number: "16",
    fhkImage: fhk(
      "/images/projects/fredericia-haandboldklub/fhk-squad/16-fhk-kira-nyboe.jpg",
      "Kira Nyboe — Fredericia Håndbold, nummer 16",
      320,
      440
    ),
  },
  {
    name: "Amalie Fejrskov Knudsen",
    number: "17",
    fhkImage: fhk(
      "/images/projects/fredericia-haandboldklub/fhk-squad/17-fhk-amalie-fejrskov-knudsen.jpg",
      "Amalie Fejrskov Knudsen — Fredericia Håndbold, nummer 17"
    ),
  },
  {
    name: "Eline Osland",
    number: "19",
    photographedByLukas: true,
    fhkImage: fhk(
      "/images/projects/fredericia-haandboldklub/fhk-squad/19-fhk-eline-osland.jpg",
      "Eline Osland — Fredericia Håndbold, nummer 19"
    ),
  },
  {
    name: "Emma Skou Larsen",
    number: "20",
    fhkImage: fhk(
      "/images/projects/fredericia-haandboldklub/fhk-squad/20-fhk-emma-skou-larsen.jpg",
      "Emma Skou Larsen — Fredericia Håndbold, nummer 20"
    ),
  },
  {
    name: "Sophie Voldby",
    number: "23",
    fhkImage: fhk(
      "/images/projects/fredericia-haandboldklub/fhk-squad/23-fhk-sophie-voldby.jpg",
      "Sophie Voldby — Fredericia Håndbold, nummer 23"
    ),
  },
  {
    name: "Isabel Jakobsen",
    number: "25",
    fhkImage: fhk(
      "/images/projects/fredericia-haandboldklub/fhk-squad/25-fhk-isabel-jakobsen.jpg",
      "Isabel Jakobsen — Fredericia Håndbold, nummer 25"
    ),
  },
  {
    name: "Caroline Busk",
    number: "26",
    fhkImage: fhk(
      "/images/projects/fredericia-haandboldklub/fhk-squad/26-fhk-caroline-busk.jpg",
      "Caroline Busk — Fredericia Håndbold, nummer 26",
      320,
      440
    ),
  },
  {
    name: "Annette Wirén Larsen",
    number: "27",
    photographedByLukas: true,
    fhkImage: fhk(
      "/images/projects/fredericia-haandboldklub/fhk-squad/27-fhk-annette-wiren-larsen.jpg",
      "Annette Wirén Larsen — Fredericia Håndbold, nummer 27"
    ),
  },
  {
    name: "Katrine Langfeldt",
    number: "28",
    fhkImage: fhk(
      "/images/projects/fredericia-haandboldklub/fhk-squad/28-fhk-katrine-langfeldt.jpg",
      "Katrine Langfeldt — Fredericia Håndbold, nummer 28"
    ),
  },
  {
    name: "Julie Grønne Thinggård",
    number: "29",
    photographedByLukas: true,
    fhkImage: fhk(
      "/images/projects/fredericia-haandboldklub/fhk-squad/29-fhk-julie-gronne-thinggard.jpg",
      "Julie Grønne Thinggård — Fredericia Håndbold, nummer 29"
    ),
  },
  {
    name: "Nikoline Johansen",
    number: "37",
    photographedByLukas: true,
    fhkImage: fhk(
      "/images/projects/fredericia-haandboldklub/fhk-squad/37-fhk-nikoline-johansen.jpg",
      "Nikoline Johansen — Fredericia Håndbold, nummer 37"
    ),
  },
  {
    name: "Amanda Brogaard",
    number: "44",
  },
];

export const fredericiaPhotographedCount = fredericiaSquadPlayers.filter(
  (player) => player.photographedByLukas
).length;
