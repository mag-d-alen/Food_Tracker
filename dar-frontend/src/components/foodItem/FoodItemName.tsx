import { useState } from "react";
import { useUpdateFoodItemMutation } from "../../app/apiSlice";


export const FoodItemName = ({ name, id }: { name: string; id: number }) => {
  const [newName, setNewName] = useState(name);
  const [editable, setEditable] = useState(false);
  const startUpdate = () => {
    setEditable(!editable);
  };
  const submitUpdate = () => {
    setEditable(!editable);
    setChanges({ id: id, name: newName });
  };
  const [setChanges, response] = useUpdateFoodItemMutation();

  return (
    <div>
      {editable ? (
        <input
          onChange={(e) => setNewName(e.target.value)}
          value={newName}></input>
      ) : (
        <div onClick={startUpdate}>{newName}</div>
      )}
      {editable ? <button onClick={submitUpdate}>Save Changes</button> : null}
    </div>
  );
};
