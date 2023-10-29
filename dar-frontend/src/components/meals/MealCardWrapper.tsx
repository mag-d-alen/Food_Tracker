import { useState } from "react";
import {
  useDeleteMealMutation,
  useUpdateMealMutation,
} from "../../app/apiSlice";
import { SingleFoodItemType } from "../../types";
import { LoadingToasts } from "../LoadingToasts";
import { MealCard } from "./MealCard";
import { MealAddFoodItem } from "./MealAddFoodItem";

export const MealCardWrapper = (item: any): JSX.Element => {
  const {
    id: mealId,
    name: mealName,
    created_at,
    user,
    food_items: prevFoodItems,
    total_meal_kcal: totalKcal,
  } = item;

  const [deleteMeal] = useDeleteMealMutation();
  const [newMealName, setNewMealName] = useState("");
  const [newFoodItems, setNewFoodItems] = useState(prevFoodItems);
  const [addItemVisible, setAddItemVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const initialNewItemState = {
    id: undefined,
    name: "",
    kcal: 0,
    unit: "",
    qty: "",
    totalKcal: undefined,
  };
  const [newFoodItem, setNewFoodItem] = useState(initialNewItemState);
  const [setChanges, { isSuccess, isError, isLoading }] =
    useUpdateMealMutation();

  const updateNewItem = (item: any) => {
    let updatedItem: any = {};
    for (let [key, value] of Object.entries(item)) updatedItem[key] = value;
    setNewFoodItems([newFoodItems, updateNewItem]);
    setNewFoodItem({ ...newFoodItem, ...item });
  };

  const addNewFoodItem = () => {
    const { qty, kcal } = newFoodItem;
    const calculatedKcal = kcal * Number(qty);
    const newItem = {
      qty: qty,
      total_kcal: calculatedKcal,
      meal: mealId,
      food_item: newFoodItem,
    };
    setNewFoodItems([...newFoodItems, newItem]);
    setAddItemVisible(false);
  };

  const deleteFoodItem = (id: number) => {
    const updatedFoodItems = newFoodItems.filter(
      (item: SingleFoodItemType) => item.id != id
    );
    setNewFoodItems(updatedFoodItems);
  };

  const addMeal = () => {
    const updatedFoodItems = newFoodItems.map((item: any) => {
      const { total_kcal, ...rest } = Object.assign({}, item);
      return rest;
    });
    const { total_meal_kcal, ...rest } = Object.assign({}, item);
    const updatedMeal = {
      ...rest,
      name: newMealName || mealName,
      food_items: updatedFoodItems,
    };
    setChanges(updatedMeal);
    setIsEditing(false);
    setNewFoodItem(initialNewItemState);
    setNewMealName("");
  };
  return (
    <>
      <LoadingToasts
        isError={isError}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
      <MealCard
        isEditing={isEditing}
        newMealName={newMealName}
        setNewMealName={setNewMealName}
        setIsEditing={setIsEditing}
        mealName={mealName}
        newFoodItems={newFoodItems}
        deleteFoodItem={deleteFoodItem}
        newFoodItem={newFoodItem}
        addMeal={addMeal}
        addItemVisible={addItemVisible}
        setAddItemVisible={setAddItemVisible}
        setNewFoodItem={setNewFoodItem}
        totalKcal={totalKcal}
        created_at={created_at}
      />
      {addItemVisible ? (
        <MealAddFoodItem
          setNewItem={(value) => setNewFoodItem(value)}
          newName={newFoodItem.name}
          newKcal={newFoodItem.kcal}
          newUnit={newFoodItem.unit}
          newQty={newFoodItem.qty}
          handleSubmit={addNewFoodItem}
          closeModal={() => setAddItemVisible(false)}
          setNewQty={(value) => setNewFoodItem({ ...newFoodItem, qty: value })}
        />
      ) : null}
      <button
        style={{ margin: "-0.5rem 0 2rem 0" }}
        onClick={() => deleteMeal(mealId)}
      >
        Delete Meal
      </button>
    </>
  );
};
