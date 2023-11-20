import { ReactNode, forwardRef, useState } from "react";
import {
  useDeleteMealMutation,
  useGetMealQuery,
  useUpdateMealMutation,
} from "../../app/apiSlice";
import { SingleFoodItemType } from "../../types";
import { MealAddFoodItem } from "./MealAddFoodItem";

type PropsType = {
  item: any;
  existingMeal?: boolean;
  children: ReactNode;
};
export const MealCardWrapper = forwardRef<HTMLDivElement, PropsType>(
  ({ item, existingMeal = true, children }, ref?) => {
    const [deleteMeal] = useDeleteMealMutation();
    const [setChanges] = useUpdateMealMutation();

    const [addItemVisible, setAddItemVisible] = useState(false);
    const meal = existingMeal ? item : useGetMealQuery(item.id);
    const { id: mealId, food_items: mealFoodItems } = meal;

    const addNewFoodItem = (item: SingleFoodItemType, qty: string) => {
      const calculatedKcal = item.kcal ? item.kcal * Number(qty) : 0;
      const newItem = {
        qty: qty,
        total_kcal: calculatedKcal,
        meal: mealId,
        food_item: item,
      };
      setAddItemVisible(false);
      saveChanges({ food_items: [...mealFoodItems, newItem] });
    };

    const saveChanges = ({
      food_items = mealFoodItems,
    }: {
      name?: string;
      food_items?: any[];
    }) => {
      const updatedFoodItems = food_items.map((item: any) => {
        const { total_kcal, ...rest } = Object.assign({}, item);
        return rest;
      });
      const { total_meal_kcal, ...rest } = Object.assign({}, item);
      const updatedMeal = {
        ...rest,
        food_items: updatedFoodItems,
      };
      setChanges(updatedMeal);
    };

    return (
      <>
        <div className="meals__meal-card--container" ref={ref}>
          {children}
          <div className="row centered">
            {existingMeal && (
              <button onClick={() => deleteMeal(mealId)}>Delete Meal</button>
            )}
            <button onClick={() => setAddItemVisible(true)}>Add Food</button>
          </div>
        </div>

        {addItemVisible ? (
          <MealAddFoodItem
            handleSubmit={addNewFoodItem}
            closeModal={() => setAddItemVisible(false)}
          />
        ) : null}
      </>
    );
  }
);
