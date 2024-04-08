import { useDeleteMealMutation } from "@/app/apiSlice";
import { Meal, MealFoodItem } from "@/app/types";

import { EditableMealName, MealCardDate, MealCardFoodItem } from "..";
import { Button } from "@/components";
import { AddFoodToMealForm } from "@/features/add-food-to-meal/AddFoodToMealForm";
import "./MealCard.css";
type PropsType = {
  meal: Meal;
  existingMeal?: boolean;
};
export const MealCardWrapper: React.FC<PropsType> = ({ meal }) => {
  const [deleteMeal] = useDeleteMealMutation();
  return (
    <div className="meals__meal-card--container">
      <div className="card__title">
        <EditableMealName meal={meal} />
      </div>
      <MealCardDate detail={meal.created_at} />
      {meal.food_items ? (
        <>
          {meal.food_items.map((item: MealFoodItem) => (
            <MealCardFoodItem key={item.id} item={item} meal={meal} />
          ))}
          <div>total kcal: {meal.total_meal_kcal}</div>
        </>
      ) : (
        <div>No food recorded</div>
      )}
      <div className="meals__meal-card--buttons">
        <Button variant="secondary" onClick={() => deleteMeal(meal.id)}>
          Delete Meal
        </Button>
        <AddFoodToMealForm meal={meal} />
      </div>
    </div>
  );
};
