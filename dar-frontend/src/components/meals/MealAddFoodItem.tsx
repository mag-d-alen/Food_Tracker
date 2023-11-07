import { useGetAllFoodItemsQuery } from "../../app/apiSlice";
import { FoodItemCalories } from "../foodItem/FoodItemsCalories";
import { FoodItemUnit } from "../foodItem/FoodItemUnit";
import { LoadingToasts } from "../LoadingToasts";

import { SelectFoodItem } from "../common/SelectFoodItem";
import { SingleFoodItemType } from "../../types";
import { useState } from "react";

export const MealAddFoodItem = ({
  handleSubmit,
  closeModal,
}: {
  handleSubmit: (item: SingleFoodItemType, qty: string) => void;
  closeModal: () => void;
}) => {
  const { data, isLoading } = useGetAllFoodItemsQuery({
    refetchOnMountOrArgChange: true,
  });

  const [newFoodItem, setNewFoodItem] = useState<SingleFoodItemType>({
    unit: "",
    kcal: 0,
    name: "",
    id: 0,
  });

  const [qty, setQty] = useState("");
  const [isError, setIsError] = useState(false);
  const submitHandler = () => {
    if (!Number(qty) || !newFoodItem.name.length) return setIsError(true);
    handleSubmit(newFoodItem, qty);
  };

  return (
    <div className="modal--backdrop">
      <div className="modal--container">
        <button
          style={{
            margin: "-2rem -2rem auto auto",
          }}
          onClick={closeModal}
        >
          x
        </button>
        <LoadingToasts
          isLoading={isLoading}
          isError={isError}
          isSuccess={false}
          message="Please fill all fields"
        />
        {data ? (
          <SelectFoodItem
            foodItems={data}
            setNewItem={(item) => setNewFoodItem(item)}
          />
        ) : null}
        <FoodItemCalories
          kcal={Number(newFoodItem.kcal)}
          unit={newFoodItem.unit}
          canEdit={false}
        />
        <FoodItemUnit
          canEditUnit={false}
          unit={newFoodItem.unit}
          setNewQty={(field: string, val: string) => setQty(val)}
        />
        <button onClick={submitHandler}>save </button>
      </div>
    </div>
  );
};
