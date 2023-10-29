import { useGetAllFoodItemsQuery } from "../../app/apiSlice";
import { EditableItemName } from "../common/EditableItemName";
import { FoodItemUnit } from "./FoodItemUnit";
import { FoodItemCalories } from "./FoodItemsCalories";
import { LoadingToasts } from "../LoadingToasts";

export const FoodItemCardForm = ({
  newName,
  setNewName,
  newKcal,
  setNewKcal,
  newUnit,
  setNewUnit,
  handleSubmit,
  closeModal,
}: {
  newName: string;
  setNewName: (name: string) => void;
  newKcal?: number;
  setNewKcal: (kcal: number) => void;
  newUnit: string;
  setNewUnit: (unit: string) => void;
  handleSubmit: () => void;
  closeModal: () => void;
}) => {
  return (
    <div className="food-items__modal">
      <div className="food-items__modal--container">
        <button className="food-items__modal--button" onClick={closeModal}>
          x
        </button>
        <EditableItemName name={newName!} setNewName={setNewName!} />
        <FoodItemCalories
          kcal={newKcal}
          unit={newUnit}
          setNewKcal={setNewKcal}
        />
        <FoodItemUnit unit={newUnit} setNewUnit={setNewUnit} />
        <button onClick={handleSubmit}>save</button>
      </div>
    </div>
  );
};
