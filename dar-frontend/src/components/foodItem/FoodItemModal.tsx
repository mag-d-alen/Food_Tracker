import { SingleFoodItemType } from "../../types";
import {
  useAddFoodItemMutation,
  useUpdateFoodItemMutation,
} from "../../app/apiSlice";
import { useState } from "react";
import { LoadingToasts } from "../LoadingToasts";
import { EditableItemName } from "../common/EditableItemName";
import { FoodItemCalories } from "./FoodItemsCalories";
import { FoodItemUnit } from "./FoodItemUnit";

export const FoodItemModal = ({
  item,
  closeModal,
  editItem = true,
}: {
  item: SingleFoodItemType;
  closeModal: () => void;
  editItem?: boolean;
}): JSX.Element => {
  const { name, kcal, unit } = { ...item };

  const [handleFoodItem, { isSuccess, isError, isLoading }] = editItem
    ? useUpdateFoodItemMutation()
    : useAddFoodItemMutation();

  const [editedItem, setEditedItem] = useState({
    name: name,
    kcal: kcal,
    unit: unit,
  });
  const handleFieldUpdate = (field: string, value: any) => {
    setEditedItem({
      ...editedItem,
      [field]: value,
    });
  };

  return (
    <div>
      <LoadingToasts
        isError={isError}
        isLoading={isLoading}
        isSuccess={isSuccess}
      />
      <div className="modal--backdrop">
        <div className="modal--container">
          <button className="modal--button" onClick={closeModal}>
            x
          </button>
          <EditableItemName
            name={editedItem.name!}
            setNewName={handleFieldUpdate}
          />
          <FoodItemCalories
            kcal={editedItem.kcal}
            unit={editedItem.unit}
            setNewKcal={handleFieldUpdate}
          />
          <FoodItemUnit unit={editedItem.unit} setNewUnit={handleFieldUpdate} />
          <button
            onClick={() => {
              editItem
                ? handleFoodItem({ ...editedItem, id: item.id })
                : //@ts-ignore
                  handleFoodItem({ body: editedItem });
            }}
          >
            save
          </button>
        </div>
      </div>
    </div>
  );
};
