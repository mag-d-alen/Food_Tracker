import { NameInput } from "../common/NameInput";
import { useUpdateMealMutation } from "../../app/apiSlice";

import { MealType } from "../../types";

export const EditableMealName = ({ meal }: { meal: MealType }) => {
  const [saveChanges] = useUpdateMealMutation();

  const updateName = (label: string, name: string) => {
    saveChanges({ ...meal, [label]: name });
  };
  return (
    <NameInput
      withLabel={false}
      changeHandler={updateName}
      placeholder={meal.name}
      name={meal.name}
    />
  );
};
