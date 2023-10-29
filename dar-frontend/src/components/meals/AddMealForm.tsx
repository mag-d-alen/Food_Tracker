import { useGetAllFoodItemsQuery } from "../../app/apiSlice";
import { SelectFoodItem } from "../common/SelectFoodItem";

export const AddMealForm = (updateNewItem: any, newMeal: any) => {
  const {
    data: foodItems,
    isLoading,
    isSuccess,
  } = useGetAllFoodItemsQuery({ refetchOnMountOrArgChange: true });

  return (
    <div>
      {newMeal.name}
      {isLoading ? <div>Loading all food items...</div> : null}
      {isSuccess ? (
        <SelectFoodItem foodItems={foodItems} setNewItem={updateNewItem} />
      ) : null}
    </div>
  );
};
