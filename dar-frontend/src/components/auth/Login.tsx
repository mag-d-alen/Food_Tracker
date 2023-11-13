// LoginForm.js (React component)
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthForm, Input } from "../common/AuthForm";
import { useLoginUserMutation } from "../../app/authSlice";
import { extractErrorMessage } from "../../utils/extractErrorMessage";
import { LoadingToasts } from "../LoadingToasts";

export const Login = () => {
  const [loginUser, { status, data, isError, error }] = useLoginUserMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (status != "fulfilled") return;
    localStorage.setItem("token", JSON.stringify(data.access));
    navigate("/my-meals");
  }, [status]);

  return (
    <AuthForm
      handleDataSubmit={loginUser}
      navigationlink={"signup"}
      navigationButtonText={"dont have an account yet? Sign up"}
    >
      <LoadingToasts isError={isError} message={extractErrorMessage(error)} />
      <Input placeholder="username" name="username" />
      <Input placeholder="password" name="password" type="password" />
    </AuthForm>
  );
};
