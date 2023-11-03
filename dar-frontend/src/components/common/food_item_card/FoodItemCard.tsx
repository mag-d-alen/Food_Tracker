import { FoodItemInputType } from "../../../types";
import { useState } from "react";
import { EditFoodItemModal } from "../../foodItem/EditFoodItemModal";
import { convertUnit } from "../../../utils/unitMeasuresConvertor";

export const FoodItemCard = ({
  item,
  deleteFoodItem,
}: {
  deleteFoodItem: (id: number) => void;
  item: FoodItemInputType;
}): JSX.Element => {
  const { name, kcal, unit, id } = item;
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditable = () => setIsEditing(true);
  const clickHandle = () => {
    if (!id) return;
    deleteFoodItem(id);
  };

  return (
    <div className="food-items__card">
      <h3>{name.toLocaleUpperCase()}</h3>
      <h4>
        {kcal} kcal per {convertUnit(unit)}
      </h4>
      {isEditing ? (
        <EditFoodItemModal item={item} closeModal={() => setIsEditing(false)} />
      ) : null}
      <button onClick={clickHandle}>Remove Item</button>
      <button className={isEditing ? "hidden" : ""} onClick={toggleEditable}>
        Edit Item
      </button>
    </div>
  );
};
