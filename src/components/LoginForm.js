const LoginForm = ({handleSubmit, username, password}) => (
  <form onSubmit={handleSubmit}>
    <p>
      <label htmlFor='username'>Username: </label>
      <input type='text' onChange={({target}) => username.setUsername(target.value)} value={username.username} id='username'/>
    </p>
    <p>
      <label htmlFor='password'>Password: </label>
      <input type='text' onChange={({target}) => password.setPassword(target.value)} value={password.password} id='password'/>
    </p>
    <button type='submit'>Login</button>
  </form>
)

export default LoginForm