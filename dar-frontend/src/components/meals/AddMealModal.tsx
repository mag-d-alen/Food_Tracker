import { useContext } from "react";
import { useAddMealMutation } from "../../app/apiSlice";
import { FoodItemType } from "../../types";
import { LoadingToasts } from "../LoadingToasts";
import { NameInput } from "../common/NameInput";
import { AddMealContext } from "../../app/ModalContext";

export type newMealType = {
  name: string;
  food_items: FoodItemType[] | [];
  user: number;
  quantity: number;
};

export const AddMealModal = () => {
  //@ts-ignore
  const { addMealVisible, toggleAddMealForm } = useContext(AddMealContext);
  const [createMeal, { isLoading, isError }] = useAddMealMutation();
  const addMeal = (key: string, val: string) => {
    createMeal({
      name: val,
    });
    toggleAddMealForm();
  };

  return (
    <>
      <button onClick={toggleAddMealForm}>Add a meal</button>
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
              {/* {mealName ? <button onClick={addMeal}>save</button> : null} */}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
