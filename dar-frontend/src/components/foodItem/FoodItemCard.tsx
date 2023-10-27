import { FoodItemType, SingleFoodItemType } from "../../types";
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
  console.log(item);
  const [deleteFoodItem] = useDeleteFoodItemMutation();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditable = () => setIsEditing(true);

  return (
    <div
      style={{
        padding: "1rem",
        borderRadius: "0.3rem",
        margin: "1rem 0",
        display: "flex",
        maxWidth: "25rem",
        flexDirection: "column",
        alignItems: "center",
        color: "#7a9f83",
        fontSize: "1.1rem",
        backgroundColor: "#ffffffd6",
      }}
    >
      <h3>{name.toLocaleUpperCase()}</h3>
      <h4>
        {kcal} kcal per {convertUnit(unit)}
      </h4>
      {isEditing ? (
        <EditFoodItemModal item={item} closeModal={() => setIsEditing(false)} />
      ) : null}
      <button onClick={() => deleteFoodItem(id)}>Remove Item</button>
      {!isEditing ? <button onClick={toggleEditable}>Edit Item</button> : null}
    </div>
  );
};
