import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { signIn } from "../reducers/authReducer";
import ErrorNotifier from "./Error-Notifier";

const LoginForm = () => {
  const errorMsg = useSelector((state) => state.notification.err);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    e.target.username.value = "";
    const password = e.target.password.value;
    e.target.password.value = "";
    try {
      dispatch(signIn({ username, password }));
      navigate("/blogs");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ErrorNotifier msg={errorMsg} />
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input id="username" type="text" name="Username" />
        </div>

        <div>
          Password:
          <input id="password" type="password" name="Password" />
        </div>
        <button type="submit" id="login-btn">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
