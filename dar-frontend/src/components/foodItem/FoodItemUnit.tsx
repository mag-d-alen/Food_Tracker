import { OptionType, OptionsType } from "../../types";
import { convertUnit } from "../../utils/unitMeasuresConvertor";
import { CustomSelect } from "../common/CustomSelect";

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
}) => {
  const options: OptionsType = [
    { label: "1 piece", value: "PC" },
    {
      value: "GR",
      label: "100 gram",
    },
    { value: "ML", label: "100 ml" },
    { value: "C", label: "1 cup" },
  ];

  return (
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
          <CustomSelect
            options={options}
            handleChange={function (option: OptionType): void {
              setNewUnit(option.value);
            }}
          />

          <div> * {convertUnit(unit)}</div>
        </>
      )}
    </div>
  );
};
