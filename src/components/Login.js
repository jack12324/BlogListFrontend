import Togglable from "./Togglable";
import LoginForm from "./LoginForm";

function Login() {
  return (
    <Togglable key="loginToggle" buttonLabel="login">
      <LoginForm />
    </Togglable>
  );
}

export default Login;
