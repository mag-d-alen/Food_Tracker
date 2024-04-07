import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useRegisterUserMutation } from "../../app/authSlice";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import { PageWrapper } from "../PageWrapper";
import "./RegisterPage.css";
import { LoadingToast } from "../../components/Toast/LoadingToast";
import { AuthForm, Button, Input } from "../../components";

export const RegisterPage = () => {
  const [signup, { status, isError, error }] = useRegisterUserMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (status != "fulfilled") return;
    navigate("/login");
  }, [navigate, status]);
  const registerUser = (formData: FormData) => {
    signup(formData);
  };

  return (
    <PageWrapper>
      <LoadingToast isError={isError} message={extractErrorMessage(error)} />
      <AuthForm handleDataSubmit={registerUser}>{renderInputs()}</AuthForm>
      <div className="navigate-button-section">
        <span> Already have an account?</span>
        <Button
          type="button"
          variant="secondary"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </div>
    </PageWrapper>
  );
};
const renderInputs = () => {
  const fields = [
    {
      name: "username",
      placeholder: "username",
      label: "username",
    },
    {
      name: "password",
      placeholder: "password",
      type: "password",
      label: "password",
    },
    {
      name: "password2",
      placeholder: "repeat password",
      type: "password",
      label: "repeat password",
    },
    {
      name: "email",
      placeholder: "email",
      type: "email",
      label: "email",
    },
    {
      name: "firstName",
      placeholder: "First Name",
      label: "First Name",
      type: "text",
    },
    {
      name: "lastName",
      placeholder: "Last Name",
      label: "Last Name",
      type: "text",
    },
  ];

  return fields.map((field) => {
    return <Input key={field.name} {...field} />;
  });
};
