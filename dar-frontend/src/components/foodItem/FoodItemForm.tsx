import { FoodItemInputType } from "../../types";


export const FoodItemForm = ({
  updateNewItem,
  newFoodItem,
}: {
  updateNewItem: (newFoodItem: Partial<FoodItemInputType>) => void;
  newFoodItem: FoodItemInputType;
}) => {
  return (
    <div>
      <input
        name="name"
        onChange={(e) => updateNewItem(e.target)}
        value={newFoodItem.name}></input>
      <input
        name="kcal"
        onChange={(e) => updateNewItem(e.target)}
        value={newFoodItem.kcal}></input>
      <select name="unit" onChange={(e) => updateNewItem(e.target)}>
        <option value="PC">1 piece</option>
        <option value="GR">100 gram</option>
        <option value="ML">100 ml</option>
      </select>
    </div>
  );
};
