import { IconName, IconType } from "./icons";

export type { IconName, IconType };

export type CostCalculatorOption = {
  id: string;
  title: string;
  icon: string;
  subOptions: {
    id: string;
    title: string;
    duration: string;
    cost: string;
  }[];
};
