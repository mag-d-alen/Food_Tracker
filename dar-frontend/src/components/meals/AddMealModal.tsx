import { useState } from "react";
import {
  useAddMealMutation,
  useGetAllFoodItemsQuery,
} from "../../app/apiSlice";
import { LoadingToasts } from "../LoadingToasts";
import { SelectFoodItem } from "../common/SelectFoodItem";
import { FoodItemCard } from "../common/food_item_card/FoodItemCard";
import { AddFoodItemModal } from "../foodItem/AddFoodItemModal";
import { FoodItemInputType, FoodItemType } from "../../types";
import { MealCardFoodItemCard } from "./MealCardFoodItemCard";
import { MealCardWrapper } from "./MealCardWrapper";

export const AddMealModal = ({
  closeAddMeal,
}: {
  closeAddMeal: () => void;
}) => {
  const [newMeal, setNewMeal] = useState<{
    name: string;
    foodItems: FoodItemType[];
  }>({
    name: "",
    foodItems: [],
  });

  const [addMeal] = useAddMealMutation();
  const { data: foodItems } = useGetAllFoodItemsQuery({
    refetchOnMountOrArgChange: true,
  });

  const updateMealName = (name: string) => {
    setNewMeal({ name: name, foodItems: [...newMeal.foodItems] });
  };

  const updateMealFood = (foodItem: string) => {
    const updatedFoodItems = newMeal.foodItems.length
      ? [...newMeal.foodItems, JSON.parse(foodItem[0])]
      : [JSON.parse(foodItem)];
    setNewMeal({ name: newMeal.name, foodItems: updatedFoodItems });
  };

  const addItem = () => addMeal(newMeal);

  return (
    <div>
      <h2>Add New Item to the food items library</h2>
      <MealCardWrapper />
      {/* {!isError && !isLoading && !isSuccess ? (
        <>
          <div>
            Meal's name:
            <input onChange={(e) => updateMealName(e.target.value)}></input>
          </div>

          {foodItems ? (
            <SelectFoodItem foodItems={foodItems} setNewItem={updateMealFood} />
          ) : null}

          {newMeal.foodItems.length
            ? newMeal.foodItems.map((item) => item.food_item.unit)
            : null}

          {newMeal.foodItems.length ? (
            <button onClick={addItem}>Save meal info</button>
          ) : null}
          <button onClick={closeAddMeal}>Back</button>
        </>
      ) : (
        <LoadingToasts
          isLoading={isLoading}
          isError={isError}
          isSuccess={isSuccess}
        />
      )} */}
    </div>
  );
};
