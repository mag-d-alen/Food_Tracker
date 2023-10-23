export type FoodItemType = {
  id?: number;
  qty: number;
  total_kcal: number;
  food_item: SingleFoodItemType;
};
export type SingleFoodItemType = {
  id?: number;
  name: string;
  kcal: number;
  unit: string;
};
export type FoodItemInputType = {
  name: string;
  kcal: number;
  unit: string;
  qty: string | number;
  total_kcal: number;
};
export type FoodItemsApiResponse = FoodItemType[];
export type MealType = {
  id: number;
  name: string;
  user: string;
  created_at: string;
  food_items: SingleFoodItemType[];
};
export type UnitChoicesType = {
  GR: string;
  PC: string;
  TBS: string;
  ML: string;
  C: string;
};