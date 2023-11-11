import { useState, KeyboardEvent } from "react";
import { useDebounce } from "../../app/hooks/useDebounce";

type PropsType = {
  name?: string;
  withLabel: boolean;
  placeholder?: string;
  changeHandler: (label: string, value: string) => void;
  asInput?: boolean;
  meal?: boolean;
};

export const NameInput = ({
  withLabel,
  placeholder,
  changeHandler,
  name,
  asInput = false,
  meal = false,
}: PropsType) => {
  const [newName, setNewName] = useState("");
  const [isEditing, setIsEditing] = useState(asInput);

  const changeSubmit = () => {
    changeHandler("name", newName);
  };
  const debouncedChangeSubmit = useDebounce(changeSubmit);

  const getPlaceholder = () => (name ? name : placeholder);
  const saveChange = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") changeSubmit();
    else {
      !meal ? debouncedChangeSubmit() : () => {};
    }
  };

  return (
    <>
      {withLabel && <label style={{ color: "#7a9f83db" }}>name</label>}
      {isEditing ? (
        <>
          <input
            className="card__input"
            placeholder={getPlaceholder()}
            name="name"
            onChange={(e) => {
              setNewName(e.target.value);
            }}
            onKeyDown={(e) => saveChange(e)}
          ></input>
          {asInput ? <sub>Press Enter to confirm</sub> : null}
        </>
      ) : (
        <div onClick={() => setIsEditing(true)} className="card__title">
          {name}
        </div>
      )}
    </>
  );
};
