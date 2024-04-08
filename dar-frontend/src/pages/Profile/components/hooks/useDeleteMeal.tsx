import { useUpdateMealMutation } from "@/app/apiSlice";
import { Meal, MealFoodItem } from "@/app/types";

export const useDeleteMeal = ({ id, meal }: { id: number; meal: Meal }) => {
  const [saveChanges] = useUpdateMealMutation();
  const deleteFoodItem = () => {
    const updatedFoodItems = meal.food_items.filter(
      (item: MealFoodItem) => item.id != id
    );
    saveChanges({ ...meal, food_items: updatedFoodItems });
  };
  return { deleteFoodItem };
};
