import { useState } from "react";
import { useAddFoodItemMutation } from "../../app/apiSlice";
import { FoodItemCardForm } from "./FoodItemCardForm";
import { LoadingToasts } from "../LoadingToasts";
import { DELAY } from "../../app/constants";

export const AddFoodItemModal = ({
  closeAddFoodItem,
  name = "",
}: {
  closeAddFoodItem: () => void;
  name: string;
}) => {
  const [newFoodItem, setNewFoodItem] = useState({
    name: name,
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
    }, DELAY);
  };
  return (
    <>
      <LoadingToasts
        isError={isError}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
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
    </>
  );
};
