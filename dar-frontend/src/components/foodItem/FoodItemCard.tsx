import { FoodItemType } from "../../types";
import { useDeleteFoodItemMutation } from "../../app/apiSlice";
import { FoodItemName } from "./FoodItemName";
import { FoodItemCalories } from "./FoodItemsCalories";
import { FoodItemUnit } from "./FoodItemUnits";
import { convertUnit } from "../../utils/unitMeasuresConvertor";

export const FoodItemCard = (item: FoodItemType): JSX.Element => {
  const { id, name, kcal, unit } = { ...item };
  const [deleteFoodItem] = useDeleteFoodItemMutation();

  return (
    <div style={{ padding: "1rem", border:"1px solid lightgray", borderRadius:"0.3rem", margin:"1rem"}}>
      <FoodItemName name={name} id={id} />
      <FoodItemCalories kcal={kcal} id={id} />
      <FoodItemUnit unit={convertUnit(unit)} id={id} />
      <button onClick={() => deleteFoodItem(id)}>Remove Item</button>
    </div>
  );
};
