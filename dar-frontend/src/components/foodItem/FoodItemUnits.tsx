import { convertUnit } from "../../utils/unitMeasuresConvertor";

export const FoodItemUnit = ({
  unit,
  editable,
  setNewUnit,
}: {
  unit: string;
  editable: boolean;
  setNewUnit: (unit: string) => void;
}) => {
  return (
    <div>
      {editable ? (
        <select name="unit" onChange={(e) => setNewUnit(e.target.value)}>
          <option value="PC">1 piece</option>
          <option value="GR">100 gram</option>
          <option value="ML">100 ml</option>
        </select>
      ) : (
        <div>unit: {convertUnit(unit)}</div>
      )}
    </div>
  );
};
