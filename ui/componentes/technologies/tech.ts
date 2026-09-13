import data from "./technologies.json";

export type Technology = {
  name: string;
  context: string;
  icon: string;
  area: string;
  description: string;
};

export const technologies = data.items as Technology[];
export const techMobilePositions = data.mobilePositions as [number, number][];
export const technologiesCopy = data;
