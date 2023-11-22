import { useState } from "react";
import { useAddMealMutation } from "../../app/apiSlice";
import { FoodItemType } from "../../types";
import { LoadingToasts } from "../LoadingToasts";
import { NameInput } from "../common/NameInput";

export type newMealType = {
  name: string;
  food_items: FoodItemType[] | [];
  user: number;
  quantity: number;
};

export const AddMealModal = () => {
  //@ts-ignore
  const [addMealVisible, setAddMealVisible] = useState(false);
  const toggleAddMealForm = () => setAddMealVisible(!addMealVisible);
  const [createMeal, { isLoading, isError }] = useAddMealMutation();
  const addMeal = (key: string, val: string) => {
    createMeal({
      name: val,
    });
    toggleAddMealForm();
  };

  return (
    <>
      <div className="stick-to-bottom">
        <button onClick={toggleAddMealForm}>Add a meal</button>
      </div>
      {addMealVisible ? (
        <div className="modal--backdrop">
          <div className="modal--container">
            <button className="button-close" onClick={toggleAddMealForm}>
              x
            </button>
            <div className="meal-card--container">
              <LoadingToasts isLoading={isLoading} isError={isError} />
              <NameInput
                withLabel={false}
                placeholder="meal name"
                changeHandler={addMeal}
                asInput={true}
                saveOnlyOnEnterKey={true}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
