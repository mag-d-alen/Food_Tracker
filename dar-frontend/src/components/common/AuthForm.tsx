import { ChangeEvent, ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";

type FormPropsTypes = {
  navigationlink: string;
  navigationButtonText: string;
  children: ReactNode;
  handleDataSubmit: (arg: any) => void;
};
type InputPropTypes = {
  placeholder: string;
  name: string;
  type?: "text" | "number" | "password" | "email";
};
export const AuthForm = ({
  navigationlink,
  navigationButtonText,
  children,
  handleDataSubmit,
}: FormPropsTypes) => {
  const navigate = useNavigate();

  return (
    <>
      <form
        style={{ margin: "3rem 0", gap: "0.3rem" }}
        className="col centered"
        onSubmit={(e: any) => {
          e.preventDefault();
          let newFormData = {};
          for (let el of Array.from(e.target.elements).slice(0, -1)) {
            //@ts-ignore
            newFormData[el.name] = el.value;
          }
          handleDataSubmit(newFormData);
        }}
      >
        {children}
        <button type="submit">subimt</button>
      </form>
      <p>{navigationButtonText.toLocaleUpperCase()}</p>
      <button onClick={() => navigate(`/${navigationlink}`)}>
        {navigationlink}
      </button>
    </>
  );
};

export const Input = ({ name, placeholder, type = "text" }: InputPropTypes) => {
  const [fieldVal, setFieldVal] = useState({ label: name, value: "" });

  const handleChange = (e: any) => {
    setFieldVal({ ...fieldVal, value: e.target.value });
  };
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={fieldVal.value}
      onChange={handleChange}
    />
  );
};
