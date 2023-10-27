import { JSX } from "react/jsx-runtime";
import { FoodItemType, SingleFoodItemType } from "../../types";
import { FoodItemCard } from "./FoodItemCard";
import { useGetAllFoodItemsQuery } from "../../app/apiSlice";
import { useState } from "react";
import { AddFoodItemModal } from "./AddFoodItemModal";
import { LoadingToasts } from "../LoadingToasts";

export const FoodItemsList = () => {
  const {
    data: foodItems,
    isLoading,
    isError,
  } = useGetAllFoodItemsQuery({ refetchOnMountOrArgChange: true });
  const [addItemVisible, setAddItemVisible] = useState(false);
  const toggleAddItemForm = () => setAddItemVisible(!addItemVisible);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <LoadingToasts
        isLoading={isLoading}
        isError={isError}
        isSuccess={false}
      />
      {addItemVisible ? (
        <AddFoodItemModal closeAddFoodItem={toggleAddItemForm} />
      ) : null}
      {foodItems ? (
        <>
          <h2>All Food food items</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              alignContent: "center",
              justifyContent: "space-around",
            }}
          >
            <button style={{ height: "5rem" }} onClick={toggleAddItemForm}>
              Add Food Item
            </button>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "80vh",
                overflowY: "auto",
                borderRadius: "0.3rem",
              }}
            >
              {foodItems.map(
                (item: JSX.IntrinsicAttributes & SingleFoodItemType) => (
                  <FoodItemCard item={item} key={JSON.stringify(item)} />
                )
              )}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
