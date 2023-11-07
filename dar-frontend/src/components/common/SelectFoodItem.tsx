import { SingleFoodItemType } from "../../types";

export const SelectFoodItem = ({
  foodItems,
  setNewItem,
}: {
  foodItems: SingleFoodItemType[];
  setNewItem: (item: SingleFoodItemType) => void;
}) => {
  const handleSelect = (e: any) => {
    setNewItem(JSON.parse(e.target.value));
  };
  return (
    <select onChange={handleSelect}>
      <option value="">--choose item--</option>
      {foodItems.map((item: SingleFoodItemType) => (
        <option key={item.id} value={JSON.stringify(item)}>
          {item.name}
        </option>
      ))}
    </select>
  );
};
