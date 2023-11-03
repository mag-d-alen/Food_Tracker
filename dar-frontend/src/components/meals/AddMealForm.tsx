import { useGetAllFoodItemsQuery } from "../../app/apiSlice";
import { FoodItemType } from "../../types";
import { SelectFoodItem } from "../common/SelectFoodItem";
import { MealCardFoodItemCard } from "./MealCardFoodItemCard";

export const MealForm = (updateNewItem: any, newMeal: any) => {
  const {
    data: foodItems,
    isLoading,
    isSuccess,
  } = useGetAllFoodItemsQuery({ refetchOnMountOrArgChange: true });

  const items = newMeal.foodItems;
  console.log(items);
  return (
    <div>
      {newMeal.name}
      {isLoading ? <div>Loading all food items...</div> : null}
      {isSuccess ? (
        <SelectFoodItem foodItems={foodItems} setNewItem={updateNewItem} />
      ) : null}
      {items.length
        ? items.map((item: FoodItemType) => (
            <MealCardFoodItemCard
              key={item.id}
              item={item}
              deleteFoodItem={() => {}}
            />
          ))
        : null}
    </div>
  );
};
