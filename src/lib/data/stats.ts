export type HomeStat = {
  id: string;
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

/**
 * Homepage trust metrics.
 */
export const homeStats: HomeStat[] = [
  {
    id: "viewers",
    value: 100,
    suffix: "K+",
    label: "Månedlige seere",
  },
  {
    id: "projects",
    value: 30,
    suffix: "+",
    label: "Projekter og samarbejder",
  },
  {
    id: "deliveries",
    value: 99,
    suffix: "+",
    label: "Leverancer",
  },
];
