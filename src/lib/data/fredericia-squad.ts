/**
 * 1. divisionskvinder — Fredericia Håndboldklub.
 * Navne og numre fra den officielle spillertrup (offentligt tilgængeligt).
 * Portrætbilleder er kun Lukas Svendsens egne fotografier.
 */
export type FredericiaSquadPlayer = {
  name: string;
  number: string;
  jerseyName?: string;
  portrait?: {
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
): FredericiaSquadPlayer["portrait"] => ({
  src,
  alt,
  width: 1467,
  height: 2200,
});

export const fredericiaSquadPlayers: FredericiaSquadPlayer[] = [
  {
    name: "Elina Nyholm Sørensen",
    number: "2",
  },
  {
    name: "Freja Thor Ammidtsbøl Andersen",
    jerseyName: "Midtsbøl",
    number: "3",
    portrait: portrait(
      "/images/projects/fredericia-haandboldklub/05-04-fhk-03-pose.jpg",
      "Freja Thor Ammidtsbøl Andersen — Fredericia Håndbold spillerportræt, nummer 3"
    ),
  },
  {
    name: "Maria Husted",
    number: "4",
    portrait: portrait(
      "/images/projects/fredericia-haandboldklub/06-05-fhk-04-pose.jpg",
      "Maria Husted — Fredericia Håndbold spillerportræt, nummer 4"
    ),
  },
  {
    name: "Mille Bekke Andersen",
    number: "5",
  },
  {
    name: "Laura Galle Hansen",
    number: "6",
  },
  {
    name: "Louise Haandbæk",
    number: "7",
  },
  {
    name: "Julie Laursen",
    number: "11",
  },
  {
    name: "Andrea Kemph",
    number: "12",
  },
  {
    name: "Kira Nyboe",
    number: "16",
  },
  {
    name: "Amalie Fejrskov Knudsen",
    number: "17",
  },
  {
    name: "Eline Osland",
    number: "19",
    portrait: portrait(
      "/images/projects/fredericia-haandboldklub/07-06-fhk-19-pose.jpg",
      "Eline Osland — Fredericia Håndbold spillerportræt, nummer 19"
    ),
  },
  {
    name: "Emma Skou Larsen",
    number: "20",
  },
  {
    name: "Sophie Voldby",
    number: "23",
  },
  {
    name: "Isabel Jakobsen",
    number: "25",
  },
  {
    name: "Caroline Busk",
    number: "26",
  },
  {
    name: "Annette Wirén Larsen",
    number: "27",
    portrait: portrait(
      "/images/projects/fredericia-haandboldklub/09-08-fhk-27-pose.jpg",
      "Annette Wirén Larsen — Fredericia Håndbold spillerportræt, nummer 27"
    ),
  },
  {
    name: "Katrine Langfeldt",
    number: "28",
  },
  {
    name: "Julie Grønne Thinggård",
    number: "29",
    portrait: portrait(
      "/images/projects/fredericia-haandboldklub/08-07-fhk-29-pose.jpg",
      "Julie Grønne Thinggård — Fredericia Håndbold spillerportræt, nummer 29"
    ),
  },
  {
    name: "Nikoline Johansen",
    number: "37",
    portrait: portrait(
      "/images/projects/fredericia-haandboldklub/10-09-fhk-37-pose.jpg",
      "Nikoline Johansen — Fredericia Håndbold spillerportræt, nummer 37"
    ),
  },
  {
    name: "Amanda Brogaard",
    number: "44",
  },
  {
    name: "Nr. 82",
    number: "82",
    portrait: portrait(
      "/images/projects/fredericia-haandboldklub/11-10-fhk-82-pose.jpg",
      "Fredericia Håndbold spillerportræt, nummer 82"
    ),
  },
];

export const fredericiaPhotographedCount = fredericiaSquadPlayers.filter(
  (player) => player.portrait
).length;
