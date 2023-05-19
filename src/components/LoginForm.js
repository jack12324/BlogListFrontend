import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducer/currentUserReducer";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const login = async (event) => {
    event.preventDefault();
    const success = await dispatch(
      loginUser({
        username,
        password,
      })
    );
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
