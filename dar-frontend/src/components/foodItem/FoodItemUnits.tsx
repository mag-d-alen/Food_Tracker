import { useState } from "react";
import { useUpdateFoodItemMutation } from "../../app/apiSlice";

export const FoodItemUnit = ({
  unit,
  id,
}: {
  unit: string;
  id: number;
}) => {
  const [newUnit, setNewUnit] = useState(unit);
  const [editable, setEditable] = useState(false);
  const startUpdate = () => {
    setEditable(!editable);
  };
  const submitUpdate = () => {
    setEditable(!editable);
    setChanges({ id: id, unit: newUnit });
  };
  const [setChanges] = useUpdateFoodItemMutation();

  return (
    <div>
      {editable ? (
        <input
          onChange={(e) => setNewUnit(e.target.value)}
          value={newUnit}></input>
      ) : (
        <div onClick={startUpdate}>{newUnit}</div>
      )}
      {editable ? <button onClick={submitUpdate}>Save Changes</button> : null}
    </div>
  );
};
