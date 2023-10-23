import { convertUnit } from "../../utils/unitMeasuresConvertor";

export const FoodItemUnit = ({
  unit,
  setNewUnit = () => {},
  qty,
  setNewQty = () => {},
  canEditUnit = true,
}: {
  unit: string;
  setNewUnit?: (unit: string) => void;
  qty?: number;
  setNewQty?: (qty: string) => void;
  canEditUnit?: boolean;
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "1rem",
      flexWrap: "wrap",
      justifyContent: "center",
      // backgroundColor: "#7a9f8378",
      borderRadius: "0.3rem",
      color: "#7a9f83f0",
    }}
  >
    <span>{canEditUnit ? "default unit" : "default meal size"}</span>
    {!canEditUnit ? (
      <input
        type="number"
        name="qty"
        placeholder="default quantity"
        onChange={(e) => setNewQty(e.target.value)}
        value={qty}
      ></input>
    ) : (
      <>
        <select
          name="unit"
          value={unit}
          onChange={(e) => setNewUnit(e.target.value)}
        >
          <option value="">--choose option--</option>
          <option value="PC">1 piece</option>
          <option value="GR">100 gram</option>
          <option value="ML"> 100 ml</option>
          <option value="C">1 cup</option>
        </select>
        <div> * {convertUnit(unit)}</div>
      </>
    )}
  </div>
);
