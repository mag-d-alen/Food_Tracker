import { JSX } from "react/jsx-runtime";
import { FoodItemType } from "../types";
import { FoodItemCard } from "./foodItem/FoodItemCard";
import { useGetAllFoodItemsQuery } from "../app/apiSlice";
import { useState } from "react";
import { AddFoodItemModal } from "./foodItem/AddFoodItemModal";

export const FoodItemsList = () => {
  const {
    data: foodItems,
    isLoading,
    isSuccess,
  } = useGetAllFoodItemsQuery({ refetchOnMountOrArgChange: true });
  const [addItemVisible, setAddItemVisible] = useState(false);
  const toggleAddItemForm = () => setAddItemVisible(!addItemVisible);
  return (
    <div>
      {isLoading ? <div>Loading...</div> : null}
      {!addItemVisible ? (
        <button onClick={toggleAddItemForm}>Add Food Item</button>
      ) : null}
      {addItemVisible ? (
        <>
          <AddFoodItemModal closeAddFoodItem={toggleAddItemForm} />
          <button onClick={() => setAddItemVisible(false)}>
            Back to All Food
          </button>
        </>
      ) : isSuccess ? (
        <>
          <h2>All Food Items</h2>
          {foodItems.map((item: JSX.IntrinsicAttributes & FoodItemType) => (
            <FoodItemCard key={item.key} {...item} />
          ))}
        </>
      ) : null}
    </div>
  );
};
