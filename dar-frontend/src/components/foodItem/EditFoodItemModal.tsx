import { SingleFoodItemType } from "../../types";
import { useUpdateFoodItemMutation } from "../../app/apiSlice";
import { useState } from "react";
import { Toast } from "../Toast";
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
  const [setChanges, { isSuccess, isError, isLoading, status, error }] =
    useUpdateFoodItemMutation();
  const [newName, setNewName] = useState(name);
  const [newKcal, setNewKcal] = useState(kcal);
  const [newUnit, setNewUnit] = useState(unit);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgba(3, 89, 40, 0.343)",
        visibility: "visible",
        opacity: 1,
        transition: "visibility 0s, opacity 0.5s ease-in-out",
      }}
    >
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
