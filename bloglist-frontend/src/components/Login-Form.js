import React, { useState } from "react";
import ErrorNotifier from "./Error-Notifier";

const LoginForm = ({ loginObj, Msg }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    loginObj({ username, password });
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      {Msg.error && <ErrorNotifier msg={Msg.error} />}
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          Password:
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="login-btn">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
