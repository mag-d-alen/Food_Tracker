import React, { useEffect, useState } from "react";
import { AuthForm, Input } from "../common/AuthForm";
import { useRegisterUserMutation } from "../../app/authSlice";
import { useNavigate } from "react-router-dom";
import { LoadingToasts } from "../LoadingToasts";
import { extractErrorMessage } from "../../utils/extractErrorMessage";

export const Signup = () => {
  const [signup, { status, data, isError, error }] = useRegisterUserMutation();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(error);
    if (status != "fulfilled") return;
    console.log(data);
    navigate("/login");
  }, [status]);

  return (
    <AuthForm
      navigationlink={"login"}
      navigationButtonText={"Log in to your account"}
      handleDataSubmit={signup}
    >
      <LoadingToasts isError={isError} message={extractErrorMessage(error)} />
      <Input name="username" placeholder="Username" />
      <Input type="password" name="password" placeholder="Password" />
      <Input type="password" name="password2" placeholder="repeat password" />
      <Input type="email" name="email" placeholder="email" />
      <Input name="firstName" placeholder="First Name" />
      <Input name="lastName" placeholder="Last Name" />
    </AuthForm>
  );
};
