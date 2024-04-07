import React from "react";
import "./Button.css";
interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  type?: "button" | "submit" | "reset" | undefined;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  ...props
}) => {
  return (
    <button {...props} className={`button ${variant} ${props.disabled && "disabled"}`}>
      {children}
    </button>
  );
};
export const ButtonContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="button-container">{children}</div>;
};
