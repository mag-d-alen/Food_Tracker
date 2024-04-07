// import React from "react";
// import "./Input.css";
// import { convertUnit } from "../../../utils/unitMeasuresConvertor";

// type InputProps = {
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   value: string;
//   placeholder: string;
//   name: string;
//   type: string;
//   unit?: string;
//   canEdit?: boolean;
//   setNewKcal?: (field: string, value: any) => void;
//   kcal?: number;
//   convertUnit?: (unit: string) => string;
// };
// export const Input: React.FC<InputProps> = ({ canEdit, onChange, value, unit }) => (
//   <div style={{ display: "flex", flexDirection: "column" }}>
//     <label style={{ color: "#7a9f83f0" }} htmlFor="calories">
//       calories
//     </label>
//     {canEdit ? (
//       <input
//         className="input"
//         placeholder="default calories"
//         name="calories"
//         type="number"
//         onChange={onChange}
//         value={value}
//       ></input>
//     ) : (
//       <div>
//         {value} kcal / {convertUnit(unit)}
//       </div>
//     )}
//   </div>
// );
export type InputPropType = {
  placeholder: string;
  name: string;
  type?: string;
  unit?: string;
  canEdit?: boolean;
  value?: string;
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  required?: boolean;
};
export const Input = ({
  name,
  placeholder,
  type = "text",
  onChange,
  onKeyDown,
  label,
  required = false,
  ...props
}: InputPropType) => {
  return (
    <div className="input--outer">
      <div className="input--container">
        <label className="input-label">{label}</label>
        <input
          required={required}
          onKeyDown={onKeyDown}
          className="input"
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          {...props}
        />
      </div>
    </div>
  );
};
