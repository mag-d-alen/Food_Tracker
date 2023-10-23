// LoginForm.js (React component)
import { useState } from "react";
import { useLoginUserMutation } from "../../app/apiSlice";

export const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loginUser, response] = useLoginUserMutation();

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(credentials);
    loginUser(credentials);
  };

  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={credentials.username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>
  );
};
