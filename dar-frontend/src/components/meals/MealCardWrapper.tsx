import { useState } from "react";
import {
  useDeleteMealMutation,
  useUpdateMealMutation,
} from "../../app/apiSlice";
import { SingleFoodItemType } from "../../types";
import { LoadingToasts } from "../LoadingToasts";
import { MealAddFoodItem } from "./MealAddFoodItem";
import moment from "moment";
import { EditableItemName } from "../common/EditableItemName";
import { MealCardDate } from "./MealCardDate";
import { MealCardFoodItemCard } from "./MealCardFoodItemCard";

export const MealCardWrapper = ({
  item,
  existingMeal = true,
}: {
  item: any;
  existingMeal?: boolean;
}) => {
  const {
    id: mealId,
    name: mealName,
    created_at,
    food_items: prevFoodItems,
    total_meal_kcal: totalKcal,
  } = item;
  const [deleteMeal] = useDeleteMealMutation();
  const [setChanges, { isSuccess, isError, isLoading }] =
    useUpdateMealMutation();

  const [newMealName, setNewMealName] = useState("");
  const [newFoodItems, setNewFoodItems] = useState(prevFoodItems);
  const [addItemVisible, setAddItemVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const addNewFoodItem = (item: SingleFoodItemType, qty: string) => {
    setIsEditing(true);
    const calculatedKcal = item.kcal * Number(qty);
    const newItem = {
      qty: qty,
      total_kcal: calculatedKcal,
      meal: mealId,
      food_item: item,
    };
    setNewFoodItems([...newFoodItems, newItem]);
    setAddItemVisible(false);
  };
  const updateName = (label: string, name: string) => setNewMealName(name);
  const deleteFoodItem = (id: number) => {
    setIsEditing(true);
    const updatedFoodItems = newFoodItems.filter(
      (item: SingleFoodItemType) => item.id != id
    );
    setNewFoodItems(updatedFoodItems);
  };

  const saveChanges = () => {
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
    setNewMealName("");
  };

  return (
    <>
      <div className="meal-card--container">
        {isEditing ? (
          <EditableItemName
            name={newMealName}
            setNewName={updateName}
            placeholder={newMealName || mealName || "set Meal name"}
            withLabel={false}
          />
        ) : (
          <div
            style={{ fontSize: "2rem", padding: "0.5rem 0 0 0" }}
            onClick={() => setIsEditing(true)}
          >
            {mealName.toUpperCase()}
          </div>
        )}

        <MealCardDate detail={moment(created_at).format("DD.MM.YYYY HH:mm")} />

        {newFoodItems ? (
          <>
            {newFoodItems.map((item: any) => (
              <MealCardFoodItemCard
                key={JSON.stringify(item)}
                item={item}
                deleteFoodItem={deleteFoodItem}
              />
            ))}
            {!isEditing && existingMeal && <div>total kcal: {totalKcal}</div>}
          </>
        ) : (
          <div>No food recorded</div>
        )}
        <LoadingToasts
          isError={isError}
          isLoading={isLoading}
          isSuccess={isSuccess}
        />
        {existingMeal && (
          <button
            style={{ margin: "-0.5rem 0 2rem 0" }}
            onClick={() => deleteMeal(mealId)}
          >
            Delete Meal
          </button>
        )}
        <button onClick={() => setAddItemVisible(true)}>Add new Item</button>
        {isEditing && <button onClick={saveChanges}>save changes</button>}
      </div>

      {addItemVisible ? (
        <MealAddFoodItem
          handleSubmit={addNewFoodItem}
          closeModal={() => setAddItemVisible(false)}
        />
      ) : null}
    </>
  );
};
