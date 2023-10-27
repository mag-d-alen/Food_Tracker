import { useState } from "react";
import {
  useDeleteMealMutation,
  useUpdateMealMutation,
} from "../../app/apiSlice";
import { Toast } from "../Toast";
import { FoodItemName } from "../foodItem/FoodItemName";
import moment from "moment";
import { MealCardDate } from "./MealCardDate";
import { MealFoods } from "./MealFoods";
import { MealFoodItemCardForm } from "./MealFoodItemCardForm";
import { LoadingToasts } from "../LoadingToasts";
import { SingleFoodItemType } from "../../types";

export const MealCard = (item: any): JSX.Element => {
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
    <div
      key={item.id}
      style={{
        padding: "1rem",
        border: "1px solid lightgray",
        borderRadius: "0.3rem",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "lavender",
        color: "black",
        margin: "0.5rem 0 1rem 0",
      }}
    >
      {isEditing ? (
        <FoodItemName name={newMealName} setNewName={setNewMealName} />
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
            <MealFoods
              key={JSON.stringify(item)}
              item={item}
              deleteFoodItem={deleteFoodItem}
            />
          ))}
          {!newFoodItem.name ? <div>total kcal: {totalKcal}</div> : null}
        </>
      ) : (
        <div>No food recorded</div>
      )}
      <LoadingToasts
        isError={isError}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />

      {newFoodItem.name.length || newMealName.length ? (
        <button onClick={addMeal}>save changes</button>
      ) : null}
      <button onClick={() => setAddItemVisible(true)}>Add new Item</button>

      {addItemVisible ? (
        <MealFoodItemCardForm
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

      <button onClick={() => deleteMeal(mealId)}>Delete Meal</button>
    </div>
  );
};
