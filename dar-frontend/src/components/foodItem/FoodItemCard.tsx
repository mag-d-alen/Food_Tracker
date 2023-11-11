import { SingleFoodItemType } from "../../types";
import { useState } from "react";
import { FoodItemModal } from "./FoodItemModal";
import { convertUnit } from "../../utils/unitMeasuresConvertor";
import { useDeleteFoodItemMutation } from "../../app/apiSlice";

export const FoodItemCard = ({
  item,
}: {
  item: SingleFoodItemType;
}): JSX.Element => {
  const { id, name, kcal, unit } = { ...item };
  const [isEditing, setIsEditing] = useState(false);
  const [deleteFoodItem] = useDeleteFoodItemMutation();
  const toggleEditable = () => setIsEditing(true);
  const clickHandler = () => {
    if (!id) return;
    deleteFoodItem(id!);
  };

  return (
    <div className="food-items__card">
      <h3>{name.toLocaleUpperCase()}</h3>
      <h4>
        {kcal} kcal per {convertUnit(unit)}
      </h4>
      {isEditing ? (
        <FoodItemModal item={item} closeModal={() => setIsEditing(false)} />
      ) : null}
      <button onClick={clickHandler}>Remove Item</button>
      <button className={isEditing ? "hidden" : ""} onClick={toggleEditable}>
        Edit Item
      </button>
    </div>
  );
};
