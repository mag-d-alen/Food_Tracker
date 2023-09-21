import { FoodItemType } from "../../types";
import {
  useDeleteFoodItemMutation,
  useUpdateFoodItemMutation,
} from "../../app/apiSlice";
import { FoodItemName } from "./FoodItemName";
import { FoodItemCalories } from "./FoodItemsCalories";
import { FoodItemUnit } from "./FoodItemUnits";
import { useState } from "react";
import { Toast } from "../Toast";
import { FoodItemQty } from "./FoodItemQty";

export const FoodItemCard = (item: FoodItemType): JSX.Element => {
  const { id, name, kcal, unit, qty } = { ...item };
  const [deleteFoodItem] = useDeleteFoodItemMutation();

  const [newName, setNewName] = useState(name);
  const [newKcal, setNewKcal] = useState(kcal);
  const [newUnit, setNewUnit] = useState(unit);
  const [newQty, setNewQty] = useState(qty);
  
  const [editable, setEditable] = useState(false);

  const [setChanges, { isSuccess, isError, isLoading }] =
    useUpdateFoodItemMutation();

  const toggleEditable = () => setEditable(!editable);

  return (
    <div
      style={{
        padding: "1rem",
        border: "1px solid lightgray",
        borderRadius: "0.3rem",
        margin: "1rem",
        display: "flex",
        width: "25rem",
        flexDirection: "column",
      }}>
      <FoodItemName
        name={newName}
        setNewName={setNewName}
        editable={editable}
      />
      <FoodItemCalories
        kcal={newKcal}
        unit={unit}
        setNewKcal={setNewKcal}
        editable={editable}
      />
      <FoodItemUnit
        unit={newUnit}
        setNewUnit={setNewUnit}
        editable={editable}
      />
      <FoodItemQty qty={newQty} setNewQty={setNewQty} editable={editable} />
      
      {isLoading ? (
        <Toast text={"saving your changes..."} success={isSuccess} />
      ) : null}
      {isError ? (
        <Toast
          text={"An unexpected error occured, try again, please..."}
          success={isError}
        />
      ) : null}
      {isSuccess ? (
        <Toast text={"Changes saved successfully"} success={isSuccess} />
      ) : null}

      {!editable && !isLoading ? (
        <button onClick={toggleEditable}>edit</button>
      ) : null}
      {editable && !isLoading ? (
        <button
          onClick={() => {
            setChanges({ name: newName, unit: newUnit, kcal: newKcal, id: id, qty:newQty});
            toggleEditable();
          }}>
          save
        </button>
      ) : null}
      <button onClick={() => deleteFoodItem(id)}>Remove Item</button>
    </div>
  );
};
