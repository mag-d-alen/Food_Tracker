export type FoodItemType = {
  id: number;
  name: string;
  kcal: number;
  unit: string;
};
export type FoodItemInputType = {
  name: string;
  kcal: number;
  unit: string;
};
export type FoodItemsApiResponse = FoodItemType[];
export type UnitChoicesType = {
  GR: string;
  PC: string;
  TBS: string;
  ML: string;
  C: string;
};
