import { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";
import {
  displayErrorNotificationFor,
  displaySuccessNotificationFor,
  useNotificationDispatch,
} from "../context/NotificationContext";
import {
  LSUSERKEY,
  useCurrentUserDispatch,
} from "../context/CurrentUserContext";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userDispatch = useCurrentUserDispatch();
  const notificationDispatch = useNotificationDispatch();

  const handleLogin = async (userIn) => {
    try {
      const currentUser = await loginService.login(userIn);
      blogService.setToken(currentUser.token);
      localStorage.setItem(LSUSERKEY, JSON.stringify(currentUser));
      userDispatch({ type: "SET_USER", payload: currentUser });
      displaySuccessNotificationFor(
        notificationDispatch,
        "Login Successful",
        5
      );
      return true;
    } catch (err) {
      displayErrorNotificationFor(
        notificationDispatch,
        "Wrong Username or Password",
        5
      );
      return false;
    }
  };

  const login = async (event) => {
    event.preventDefault();
    const success = await handleLogin({
      username,
      password,
    });
    if (success) {
      setPassword("");
      setUsername("");
    }
  };

  return (
    <form onSubmit={login}>
      <p>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            onChange={({ target }) => setUsername(target.value)}
            value={username}
            id="username"
          />
        </label>
      </p>
      <p>
        <label htmlFor="password">
          Password:
          <input
            type="text"
            onChange={({ target }) => setPassword(target.value)}
            value={password}
            id="password"
          />
        </label>
      </p>
      <button id="login-form-submit" type="submit">
        Login
      </button>
    </form>
  );
}

export default LoginForm;
