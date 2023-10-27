import { useState, useEffect } from "react";
import { useAddMealMutation } from "../../app/apiSlice";
import { MealForm } from "./MealForm";
import { SingleFoodItemType } from "../../types";
import { LoadingToasts } from "../LoadingToasts";

export const AddMealModal = ({
  closeAddMeal,
}: {
  closeAddMeal: () => void;
}) => {
  const [newMeal, setNewMeal] = useState({
    name: "",
    food_items: [{ name: "" }],
  });
  const [addMeal, { isError, isSuccess, isLoading }] = useAddMealMutation();

  const updateMealName = (name: string) => {
    setNewMeal({ name: name, food_items: [...newMeal.food_items] });
  };
  const updateMealFood = (foodItem: SingleFoodItemType) => {
    const updatedFoodItems = newMeal.food_items[0]
      ? [...newMeal.food_items, foodItem]
      : [foodItem];
    setNewMeal({ name: newMeal.name, food_items: updatedFoodItems });
  };

  const addItem = () => addMeal(newMeal);

  return (
    <div>
      <h2>Add New Item to the food items library</h2>
      {!isError && !isLoading && !isSuccess ? (
        <>
          <div>
            Meal's name:
            <input onChange={(e) => updateMealName(e.target.value)}></input>
          </div>
          <MealForm updateNewItem={updateMealFood} newMeal={newMeal} />
          {newMeal.food_items[0].name ? (
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
      )}
    </div>
  );
};
