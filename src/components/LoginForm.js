import { useState } from 'react';
import PropTypes from 'prop-types';

function LoginForm({ loginUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async (event) => {
    event.preventDefault();
    const success = await loginUser({
      username,
      password,
    });
    if (success) {
      setPassword('');
      setUsername('');
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
      <button id="login-form-submit" type="submit">Login</button>
    </form>
  );
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

export default LoginForm;
