import { convertUnit } from "../../utils/unitMeasuresConvertor";

export const FoodItemCalories = ({
  kcal,
  unit,
  setNewKcal = () => {},
  canEdit = true,
}: {
  kcal?: number;
  unit: string;
  setNewKcal?: (val: any) => void;
  canEdit?: boolean;
}) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label style={{ color: "#7a9f83f0" }} htmlFor="calories">
        calories
      </label>
      {canEdit ? (
        <input
          placeholder="default calories"
          name="calories"
          type="number"
          onChange={(e) => setNewKcal(Number(e.target.value))}
          value={kcal}
        ></input>
      ) : (
        <div>
          {kcal} kcal / {convertUnit(unit)}
        </div>
      )}
    </div>
  );
};
