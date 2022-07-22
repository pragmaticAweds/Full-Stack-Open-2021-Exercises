import React, { useEffect } from "react";
import { LOGIN } from "../Schema/queries";
import { useMutation } from "@apollo/client";

const LoginForm = ({ handleSetToken, handleError }) => {
  const [logIn, { data }] = useMutation(LOGIN, {
    onError: (error) => {
      handleError(error.message);
    },
  });

  useEffect(() => {
    if (data) {
      const token = data.login.value;
      handleSetToken(token);
      localStorage.setItem("loginToken", token);
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.name.value;
    const password = "known_to_me_only";

    logIn({ variables: { username, password } });
    console.log(username, password);
    console.log(data);
    e.target.name.value = "";
  };

  return (
    <div>
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit}>
        name: <input type="text" name="name" />
        <br />
        password: <input type="password" />
        <br />
        <button>login</button>
      </form>
    </div>
  );
};

export default LoginForm;
