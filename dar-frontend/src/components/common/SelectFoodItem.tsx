import { OptionType, SingleFoodItemType } from "../../types";
import { CustomSelect } from "./CustomSelect";

export const SelectFoodItem = ({
  foodItems,
  setNewItem,
}: {
  foodItems: SingleFoodItemType[];
  setNewItem: (item: string) => void;
}) => {
  const handleSelect = (option: OptionType) => {
    setNewItem(option.value);
  };
  const options = foodItems.map((item: SingleFoodItemType) => {
    return { value: JSON.stringify(item), label: item.name };
  });
  return <CustomSelect options={options} handleChange={handleSelect} />;
};
