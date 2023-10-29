import { SingleFoodItemType } from "../../types";
import { useUpdateFoodItemMutation } from "../../app/apiSlice";
import { useState } from "react";
import { FoodItemCardForm } from "./FoodItemCardForm";
import { LoadingToasts } from "../LoadingToasts";

export const EditFoodItemModal = ({
  item,
  closeModal,
}: {
  item: SingleFoodItemType;
  closeModal: () => void;
}): JSX.Element => {
  const { name, kcal, unit, id } = { ...item };
  const [setChanges, { isSuccess, isError, isLoading }] =
    useUpdateFoodItemMutation();
  const [newName, setNewName] = useState(name);
  const [newKcal, setNewKcal] = useState(kcal);
  const [newUnit, setNewUnit] = useState(unit);

  return (
    <div className="foot-items__modal">
      <LoadingToasts
        isError={isError}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
      <FoodItemCardForm
        closeModal={closeModal}
        newName={newName}
        setNewName={setNewName}
        newKcal={newKcal}
        setNewKcal={setNewKcal}
        newUnit={newUnit}
        setNewUnit={setNewUnit}
        handleSubmit={() => {
          setChanges({
            name: newName,
            unit: newUnit,
            kcal: newKcal,
            id: id,
          });
        }}
      />
    </div>
  );
};
