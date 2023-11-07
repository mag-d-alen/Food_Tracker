import { useState } from "react";
import { useAddMealMutation } from "../../app/apiSlice";
import { FoodItemType } from "../../types";
import { EditableItemName } from "../common/EditableItemName";
import { MealCardWrapper } from "./MealCardWrapper";

export type newMealType = {
  name: string;
  food_items: FoodItemType[] | [];
  user: number;
  quantity: number;
};

export const AddMealModal = ({
  closeAddMeal,
}: {
  closeAddMeal: () => void;
}) => {
  const [createMeal, { data }] = useAddMealMutation();
  const [isAddingFoodItems, setIsAddingFoodItems] = useState(false);

  const addMeal = () => {
    createMeal({
      body: {
        name: newMeal.name,
        user: 1,
      },
    });
    setIsAddingFoodItems(true);
  };

  const [newMeal, setNewMeal] = useState<newMealType>({
    name: "",
    food_items: [],
    user: 1,
    quantity: 3,
  });

  const updateMealName = (key: string, val: string) => {
    setNewMeal({
      ...newMeal,
      name: val,
    });
  };

  return (
    <div className="modal--backdrop">
      <div className="modal--container">
        <button className="button-close" onClick={closeAddMeal}>
          x
        </button>

        <div className="meal-card--container">
          {!isAddingFoodItems ? (
            <>
              <EditableItemName
                withLabel={false}
                name={newMeal.name}
                setNewName={updateMealName}
                placeholder="meal name"
              />
              <button onClick={addMeal}>save</button>
            </>
          ) : null}
          {data ? <MealCardWrapper item={data} existingMeal={false} /> : null}

          {newMeal.food_items[0] ? (
            <button onClick={addMeal}>Save meal info</button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
