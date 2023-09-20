import { useState } from "react";
import { useUpdateFoodItemMutation } from "../../app/apiSlice";


export const FoodItemCalories = ({ kcal, id }: { kcal: number; id: number }) => {
  const [newKcal, setNewKcal] = useState(kcal);
  const [editable, setEditable] = useState(false);
  const startUpdate = () => {
    setEditable(!editable);
  };
  const submitUpdate = () => {
    setEditable(!editable);
    setChanges({ id: id, kcal: newKcal });
  };
  const [setChanges, response] = useUpdateFoodItemMutation();

  return (
    <div>
      {editable ? (
        <input
          onChange={(e) => setNewKcal(Number(e.target.value))}
          value={newKcal}></input>
      ) : (
        <div onClick={startUpdate}>{newKcal}</div>
      )}
      {editable ? <button onClick={submitUpdate}>Save Changes</button> : null}
    </div>
  );
};
