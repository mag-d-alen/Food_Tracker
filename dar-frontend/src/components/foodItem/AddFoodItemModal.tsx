import { useEffect, useState } from "react";
import { useAddFoodItemMutation } from "../../app/apiSlice";
import { FoodItemForm } from "./FoodItemForm";

export const AddFoodItemModal = ({
  closeAddFoodItem,
}: {
  closeAddFoodItem: () => void;
}) => {
  const [newFoodItem, setNewFoodItem] = useState({
    name: "soya cappuccino",
    kcal: 59,
    unit: "PC",
    qty:1
  });
  const [addFoodItem, response] = useAddFoodItemMutation();
  const [isError, setError] = useState("");
  const [isLoading, setIsLoading] = useState("");
  useEffect(() => {
    response.isLoading && setIsLoading(response.status);
    response.isError && setError(response.status);
    response.isSuccess && closeAddFoodItem();
    return () => {
      setIsLoading("");
      setError("");
    };
  }, [response]);

  const updateNewItem = (item: any) => {
    let newItem = { ...newFoodItem, [item.name]: item.value };
    setNewFoodItem(newItem);
  };
  const addItem = () => addFoodItem({ body: newFoodItem });

  return (
    <div>
      <h2>Add New Item to the food items library</h2>
      {isLoading || isError ? (
        isLoading ? (
          <div>{isLoading}</div>
        ) : (
          <div>{isError}</div>
        )
      ) : (
        <>
          <FoodItemForm
            updateNewItem={updateNewItem}
            newFoodItem={newFoodItem}
          />
          <button onClick={addItem}>Add New Item</button>
        </>
      )}
    </div>
  );
};
