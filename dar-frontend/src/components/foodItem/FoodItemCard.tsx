import { SingleFoodItemType } from "../../types";
import { useState } from "react";
import { FoodItemModal } from "./FoodItemModal";
import { convertUnit } from "../../utils/unitMeasuresConvertor";

export const FoodItemCard = ({
  item,
  handleDelete,
}: {
  item: SingleFoodItemType;
  handleDelete: (id: number) => void;
}): JSX.Element => {
  const { id, name, kcal, unit, totalKcal } = { ...item };
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditable = () => setIsEditing(true);
  const clickHandler = () => {
    if (!id) return;
    handleDelete(id!);
  };

  return (
    <div className="food-items__card">
      <h3>{name.toLocaleUpperCase()}</h3>
      <h4>
        {kcal | totalKcal} kcal per {convertUnit(unit)}
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
