import { useAddMealMutation } from "../../app/apiSlice";
import { FoodItemType } from "../../types";
import { LoadingToasts } from "../LoadingToasts";
import { NameInput } from "../atoms/NameInput";

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
  const [createMeal, { isLoading, isError }] = useAddMealMutation();
  const addMeal = (key: string, val: string) => {
    createMeal({
      name: val,
      user: 1,
    });
    closeAddMeal();
  };

  return (
    <div className="modal--backdrop">
      <div className="modal--container">
        <button className="button-close" onClick={closeAddMeal}>
          x
        </button>
        <div className="meal-card--container">
          <LoadingToasts isLoading={isLoading} isError={isError} />
          <NameInput
            withLabel={false}
            placeholder="meal name"
            changeHandler={addMeal}
            asInput={true}
          />
          {/* {mealName ? <button onClick={addMeal}>save</button> : null} */}
        </div>
      </div>
    </div>
  );
};
