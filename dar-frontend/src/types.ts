export type FoodItemType = {
  id: number;
  name: string;
  kcal: number;
  unit: string;
  qty: number;
};
export type FoodItemInputType = {
  name: string;
  kcal: number;
  unit: string;
  qty: number;
};
export type FoodItemsApiResponse = FoodItemType[];
export type MealType = {
  id: number;
  name: string,
  user: string,
  created_at: string,
  food_items: FoodItemInputType[]
}
export type UnitChoicesType = {
  GR: string;
  PC: string;
  TBS: string;
  ML: string;
  C: string;
};
