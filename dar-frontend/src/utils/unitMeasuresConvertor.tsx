import { UnitChoicesType } from "../types";

const unitChoices: UnitChoicesType = {
  GR: "100 gram",
  PC: "1 piece",
  TBS: "1 table spoon",
  ML: "100 ml",
  C: "1 cup",
};

export const convertUnit = (unit: any):string => {
  const dynamicKey: keyof UnitChoicesType = unit;
  return unitChoices[dynamicKey];
};
