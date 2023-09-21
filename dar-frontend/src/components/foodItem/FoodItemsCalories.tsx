import { convertUnit } from "../../utils/unitMeasuresConvertor";

export const FoodItemCalories = ({
  kcal,
  unit,
  setNewKcal,
  editable,
}: {
    kcal: number;
    unit: string;
  setNewKcal: (newKcal: number) => void;
  editable: boolean;
}) => {
  return (
    <div>
      {editable ? (
        <input
          onChange={(e) => setNewKcal(Number(e.target.value))}
          value={kcal}></input>
      ) : (
          <div>{kcal} kcal / { convertUnit(unit)}</div>
      )}
    </div>
  );
};
