import { PageWrapper } from "../PageWrapper/PageWrapper";
import { extractErrorMessage } from "@/utils/extractErrorMessage";
import { LoadingToast } from "@/components/Toast/LoadingToast";
import { Button, AuthForm, Input, Header } from "@/components";
import "./Login.css";
import { useLogin } from "./hooks";
import { useNavigate } from "react-router-dom";
export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, logout, isLoggedIn, isError, error, isSuccess } = useLogin();
  return (
    <PageWrapper>
      {isLoggedIn ? (
        <>
          <Header>Welcome</Header>
          <Button onClick={logout}>Log out</Button>
        </>
      ) : (
        <>
          <Header>Login</Header>
          <LoadingToast
            isError={isError}
            isSuccess={isSuccess}
            message={extractErrorMessage(error)}
          />
          <AuthForm handleDataSubmit={login}> {renderInputs()}</AuthForm>
          <div className="navigate-button-section">
            <span> Don't have an account?</span>
            <Button variant="secondary" onClick={() => navigate("/signup")}>
              Register
            </Button>
          </div>
        </>
      )}
    </PageWrapper>
  );
};

const renderInputs = () => {
  const fields = [
    {
      name: "username",
      placeholder: "username",
      label: "username",
      type: "text",
    },
    {
      name: "password",
      placeholder: "password",
      type: "password",
      label: "password",
    },
  ];
  return fields.map((field) => {
    return <Input key={field.name} {...field} />;
  });
};
