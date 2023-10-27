import { useState } from "react";
import { useAddFoodItemMutation } from "../../app/apiSlice";
import { FoodItemCardForm } from "./FoodItemCardForm";
import { LoadingToasts } from "../LoadingToasts";

export const AddFoodItemModal = ({
  closeAddFoodItem,
}: {
  closeAddFoodItem: () => void;
}) => {
  const [newFoodItem, setNewFoodItem] = useState({
    name: "",
    kcal: undefined,
    unit: "",
  });
  const [addFoodItem, { isLoading, isError, isSuccess }] =
    useAddFoodItemMutation();

  const updateNewItem = (item: any) => {
    let newItem = { ...newFoodItem, [item.name]: item.value };
    setNewFoodItem(newItem);
  };

  const addItem = () => {
    addFoodItem({ body: newFoodItem });
    setTimeout(() => {
      closeAddFoodItem();
    }, 1500);
  };
  return (
    <div>
      <h2>Add New Item to the food items library</h2>

      {!isLoading && !isSuccess && !isError && (
        <FoodItemCardForm
          newName={newFoodItem.name}
          setNewName={(value) => updateNewItem({ name: "name", value: value })}
          newKcal={newFoodItem.kcal}
          setNewKcal={(value) => updateNewItem({ name: "kcal", value: value })}
          newUnit={newFoodItem.unit}
          setNewUnit={(value) => updateNewItem({ name: "unit", value: value })}
          closeModal={closeAddFoodItem}
          handleSubmit={addItem}
        />
      )}
    </div>
  );
};
