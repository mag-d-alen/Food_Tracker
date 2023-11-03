import { JSX } from "react/jsx-runtime";
import { SingleFoodItemType } from "../../types";
import { FoodItemCard } from "../common/food_item_card/FoodItemCard";
import {
  useDeleteFoodItemMutation,
  useGetAllFoodItemsQuery,
} from "../../app/apiSlice";
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
  const [deleteFoodItem] = useDeleteFoodItemMutation();

  return (
    <div className="col">
      <LoadingToasts
        isLoading={isLoading}
        isError={isError}
        isSuccess={false}
      />
      {addItemVisible ? (
        <AddFoodItemModal closeAddFoodItem={toggleAddItemForm} name={""} />
      ) : null}
      {foodItems ? (
        <>
          <h2>All Food food items</h2>
          <div className="list-container">
            <button onClick={toggleAddItemForm}>Add Food Item</button>
            <div className="list-scroll">
              {foodItems.map(
                (item: JSX.IntrinsicAttributes & SingleFoodItemType) => (
                  <FoodItemCard
                    item={item}
                    key={JSON.stringify(item)}
                    deleteFoodItem={deleteFoodItem}
                  />
                )
              )}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
