export type MealFoodItem = {
  id?: number;
  qty: number;
  total_kcal: number;
  food_item: FoodItem;
};
export type FoodItem = {
  id?: number;
  name: string;
  kcal: number | undefined;
  unit: string;
};
export type FoodItemInput = {
  name: string;
  kcal: number;
  unit: string;
  qty: string | number;
  total_kcal: number;
};
export type Meal = {
  id: number;
  name: string;
  created_at: string;
  food_items: MealFoodItem[] | [];
  total_meal_kcal: number;
};
export type PartialMeal =  Omit <Meal, "total_meal_kcal">
export type UnitChoices = {
  GR: string;
  PC: string;
  TBS: string;
  ML: string;
  C: string;
};
