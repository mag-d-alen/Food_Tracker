import { JSX } from "react/jsx-runtime";
import { SingleFoodItemType } from "../../types";
import { FoodItemCard } from "./FoodItemCard";
import { useGetAllFoodItemsQuery } from "../../app/apiSlice";
import { useState } from "react";
import { LoadingToasts } from "../LoadingToasts";
import { FoodItemModal } from "./FoodItemModal";

export const FoodItemsList = () => {
  const {
    data: foodItems,
    isLoading,
    isError,
  } = useGetAllFoodItemsQuery({ refetchOnMountOrArgChange: true });
  const [addItemVisible, setAddItemVisible] = useState(false);
  const toggleAddItemForm = () => setAddItemVisible(!addItemVisible);

  return (
    <div className="col">
      <h2>All Food food items</h2>
      <LoadingToasts
        isLoading={isLoading}
        isError={isError}
        isSuccess={false}
      />
      {addItemVisible ? (
        <FoodItemModal closeModal={toggleAddItemForm} editItem={false} />
      ) : null}
      <div className="list-container">
        <button onClick={toggleAddItemForm}>Add Food Item</button>
        {foodItems ? (
          <div className="list-scroll">
            {foodItems.map(
              (item: JSX.IntrinsicAttributes & SingleFoodItemType) => (
                <FoodItemCard item={item} key={item.id} />
              )
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};
