import { Button, Input, SelectFoodItem } from "..";
import "./Form.css";
import { UnitSelect } from "@/components/Input/FoodItemUnit";

type FormPropsTypes = {
  handleDataSubmit: (data: { [key: string]: string | number }) => void;
  children?: React.ReactNode;
  inputs: InputType[];
  editMode?: boolean;
};
export const Form: React.FC<FormPropsTypes> = ({
  handleDataSubmit,
  inputs,
  editMode = false,
}) => {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const formData = Object.fromEntries(data.entries());
    handleDataSubmit(formData as { [key: string]: string | number });
  };

  return (
    <>
      <form className="form" method="post" onSubmit={(e) => onSubmit(e)}>
        {inputs.map((input) =>
          input.type === "select" ? (
            input.label === "unit" ? (
              <UnitSelect
                key={input.name}
                required={!editMode}
                label={input.label}
                value={input.value}
                name={input.name}
              ></UnitSelect>
            ) : (
              <SelectFoodItem required={!editMode} key={input.name} />
            )
          ) : (
            <Input
              key={input.name}
              required={!editMode}
              label={input.label}
              name={input.name}
              placeholder={input.placeholder}
              type={input.type}
            ></Input>
          )
        )}
        <div className="form--buttons">
          <Button variant="secondary" type="reset">
            Clear
          </Button>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </div>
      </form>
    </>
  );
};

export type InputType = {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  type?: "text" | "number" | "password" | "email" | "select";
};
