import { SingleFoodItemType } from "../../types";
import {
  useAddFoodItemMutation,
  useUpdateFoodItemMutation,
} from "../../app/apiSlice";
import { useState } from "react";
import { LoadingToasts } from "../LoadingToasts";
import { FoodItemCalories } from "./FoodItemsCalories";
import { FoodItemUnit } from "./FoodItemUnit";
import { NameInput } from "../atoms/NameInput";

export const FoodItemModal = ({
  item = { name: "", kcal: undefined, unit: "" },
  closeModal,
  editItem = true,
}: {
  item?: SingleFoodItemType;
  closeModal: () => void;
  editItem?: boolean;
}): JSX.Element => {
  const { name, kcal, unit } = { ...item };

  const [handleFoodItem, { isSuccess, isError, isLoading }] = editItem
    ? useUpdateFoodItemMutation()
    : useAddFoodItemMutation();

  const [foodItem, setFoodItem] = useState({
    name: name,
    kcal: kcal,
    unit: unit,
  });
  const handleFieldUpdate = (field: string, value: any) => {
    setFoodItem({
      ...foodItem,
      [field]: value,
    });
  };
  const handleSubmit = () => {
    const editedItem = { ...foodItem, id: item.id };
    editItem ? handleFoodItem(editedItem) : handleFoodItem(foodItem);
    closeModal();
  };

  return (
    <div>
      <LoadingToasts
        isError={isError}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
      <div className="modal--backdrop">
        <div className="modal--container">
          <button className="modal--button" onClick={closeModal}>
            x
          </button>
          <NameInput
            name={foodItem.name || undefined}
            withLabel={true}
            changeHandler={handleFieldUpdate}
            asInput={!editItem}
          />
          <FoodItemCalories
            kcal={foodItem.kcal}
            unit={foodItem.unit}
            setNewKcal={handleFieldUpdate}
          />
          <FoodItemUnit unit={foodItem.unit} setNewUnit={handleFieldUpdate} />
          {foodItem.name ? <button onClick={handleSubmit}>save</button> : null}
        </div>
      </div>
    </div>
  );
};
