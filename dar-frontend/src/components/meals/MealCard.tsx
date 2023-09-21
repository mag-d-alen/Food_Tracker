import { useState } from "react";
import {
  useDeleteMealMutation,
  useUpdateMealMutation,
} from "../../app/apiSlice";
import { Toast } from "../Toast";
import { FoodItemName } from "../foodItem/FoodItemName";
import { FoodItemType } from "../../types";
import moment from "moment";
import { MealCardDate } from "./MealCardDate";
import { MealFoods } from "./MealFoods";

export const MealCard = (item: any): JSX.Element => {
  const { id, name, created_at, user, food_items, total_meal_kcal } = item;

  const [deleteFoodItem] = useDeleteMealMutation();
  const [newName, setNewName] = useState(name);
  const [newfoodItems, setFoodItems] = useState({ ...food_items });

  const [editable, setEditable] = useState(false);

  const [setChanges, { isSuccess, isError, isLoading }] =
    useUpdateMealMutation();

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
      <MealCardDate detail={moment(created_at).format("DD.MM.YYYY HH:mm")} />
      {food_items ? (
        <>
          {food_items.map((item: FoodItemType) => (
            <MealFoods key={item.id} item={item} />
          ))}
          <div>total kcal: {total_meal_kcal}</div>
        </>
      ) : (
        <div>No food recorded</div>
      )}
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
            setChanges({
              name: newName,
              food_items: newfoodItems,
              id: id,
            });
            toggleEditable();
          }}>
          save
        </button>
      ) : null}
      <button onClick={() => deleteFoodItem(id)}>Delete Meal</button>
    </div>
  );
};
