import { JSX } from "react/jsx-runtime";
import { FoodItemType, SingleFoodItemType } from "../../types";
import { FoodItemCard } from "./FoodItemCard";
import { useGetAllFoodItemsQuery } from "../../app/apiSlice";
import { useState } from "react";
import { AddFoodItemModal } from "./AddFoodItemModal";

export const FoodItemsList = () => {
  const {
    data: foodItems,
    isLoading,
    isSuccess,
  } = useGetAllFoodItemsQuery({ refetchOnMountOrArgChange: true });
  const [addItemVisible, setAddItemVisible] = useState(false);
  const toggleAddItemForm = () => setAddItemVisible(!addItemVisible);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading ? <div>Loading...</div> : null}
      {foodItems && !addItemVisible ? (
        <button onClick={toggleAddItemForm}>Add Food Item</button>
      ) : null}
      {foodItems && addItemVisible ? (
        <>
          <AddFoodItemModal closeAddFoodItem={toggleAddItemForm} />
          <button onClick={() => setAddItemVisible(false)}>
            Back to All Food
          </button>
        </>
      ) : isSuccess && foodItems ? (
        <>
          <h2>All Food Items</h2>
          {foodItems.map(
            (item: JSX.IntrinsicAttributes & SingleFoodItemType) => (
              <FoodItemCard item={item} key={JSON.stringify(item)} />
            )
          )}
        </>
      ) : null}
    </div>
  );
};
