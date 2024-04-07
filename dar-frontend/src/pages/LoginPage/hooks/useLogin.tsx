import { useLoginUserMutation } from "@/app/authSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [loginUser, { data, isError, error, isSuccess }] =
    useLoginUserMutation();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!sessionStorage.getItem("token")
  );
  const navigate = useNavigate();
  const login = (formData: FormData) => {
    loginUser(formData);
  };

  useEffect(() => {
    if (isLoggedIn) return;
    if (!data) return;
    sessionStorage.setItem("token", JSON.stringify(data.access));
    navigate("/my-meals");
  }, [data, navigate, isLoggedIn]);

  const logout = () => {
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return {
    login,
    logout,
    isLoggedIn,
    isError,
    error,
    isSuccess,
  };
};
