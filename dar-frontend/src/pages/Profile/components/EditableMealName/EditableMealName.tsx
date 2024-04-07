import { useUpdateMealMutation } from "@/app/apiSlice";
import { Meal } from "@/app/types";
import { EditableInput } from "@/components";
import './EditableMealName.css'

export const EditableMealName = ({ meal }: { meal: Meal }) => {
  const [saveChanges] = useUpdateMealMutation();

  const updateName = (name: string) => {
    saveChanges({ ...meal, name: name });
  };
  return (
    <div className="editable-meal-name">
    <EditableInput
      onSubmit={updateName}
      placeholder={meal.name ? meal.name : "Name"}
      value={meal.name}
      label={"name"}
      saveOnlyOnEnterKey={true}
    />
    </div>
  );
};
