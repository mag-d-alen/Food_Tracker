import { SingleFoodItemType } from "../../types";
import { useDeleteFoodItemMutation } from "../../app/apiSlice";
import { useState } from "react";
import { EditFoodItemModal } from "./EditFoodItemModal";
import { convertUnit } from "../../utils/unitMeasuresConvertor";

export const FoodItemCard = ({
  item,
}: {
  item: SingleFoodItemType;
}): JSX.Element => {
  const { id, name, kcal, unit } = { ...item };
  const [deleteFoodItem] = useDeleteFoodItemMutation();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditable = () => setIsEditing(true);

  return (
    <div className="food-items__card">
      <h3>{name.toLocaleUpperCase()}</h3>
      <h4>
        {kcal} kcal per {convertUnit(unit)}
      </h4>
      {isEditing ? (
        <EditFoodItemModal item={item} closeModal={() => setIsEditing(false)} />
      ) : null}
      <button onClick={() => deleteFoodItem(id)}>Remove Item</button>
      <button className={isEditing ? "hidden" : ""} onClick={toggleEditable}>
        Edit Item
      </button>
    </div>
  );
};
