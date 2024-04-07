import { useState, ChangeEvent } from "react";
import { Input } from ".";
import { Button } from "..";
import "./Input.css";

type EditableInputProps = {
  value: string;
  placeholder: string;
  saveOnlyOnEnterKey?: boolean;
  type?: "number" | "text" | "select";
  label: "name" | "kcal" | "qty" | "unit" | "food_item";
  name:string;
  onSubmit?: (value: string) => void;
};

export const EditableInput = ({
  placeholder,
  value,
  type = "text",
  saveOnlyOnEnterKey = false,
  onSubmit,
  name,
}: EditableInputProps) => {
  const [isEditing, setIsEditing] = useState(!value);
  const [newValue, setNewValue] = useState<string>(value);
  const updateValue = (e: ChangeEvent<HTMLInputElement>) => {
    setNewValue(e.currentTarget.value);
  };

  return (
    <div className="row" onClick={() => setIsEditing(true)}>
     
        {isEditing ? (
          <>
            <Input
              onKeyDown={(e) => {
                if (!saveOnlyOnEnterKey || !newValue) return;
                if (e.key === "Enter" && onSubmit) {
                  onSubmit(newValue);
                  setIsEditing(false);
                }
              }}
              placeholder={placeholder}
              name={name}
              onChange={updateValue}
              type={type}
              label={"name"}
            ></Input>

            {!saveOnlyOnEnterKey ? (
              <Button label="save" onClick={() => onSubmit &&onSubmit(newValue)}>
                Confirm
              </Button>
            ) : null}
          </>
        ) : (
          <div className="input--display">{newValue}</div>
        )}
      </div>

  );
};
// const Input = ({
//   type,
//   value,
//   newValue,
//   unit,
//   placeholder,
//   setNewValue,
//   changeHandler,
//   setIsEditing,
//   label,
// }: any = {}) => {
//   const saveChange = (e: KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter")
//     setNewValue();
//   };

//   const changeSubmit = () => {
//     changeHandler(label, newValue);
//     setIsEditing(false);
//   };

//   if (type === "number" || type === "text") {
//     return (
//       <input
//         type={type}
//         className="input"
//         placeholder={placeholder.toUpperCase()}
//         name={value?.toUpperCase()}
//         value={
//           newValue
//             ? typeof newValue === "number"
//               ? newValue
//               : newValue?.toUpperCase()
//             : value
//         }
//         onChange={(e) => {
//           setNewValue(e.target.value);
//         }}
//         onKeyDown={(e) => saveChange(e)}
//       ></input>
//     );
//   } else if (type === "select") {
//     return (
//       <select
//         className="select"
//         value={value}
//         onChange={(e) => setNewValue({e.target.value)}
//         defaultValue={unit}
//       >
//         <option value="">--choose option--</option>
//         <option value="PC">1 piece</option>
//         <option value="GR">100 gram</option>
//         <option value="ML"> 100 ml</option>
//         <option value="C">1 cup</option>
//       </select>
//     );
//   }
// };
