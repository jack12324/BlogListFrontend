import {useState} from "react";

const LoginForm = ({loginUser}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = async (event) => {
    event.preventDefault()
    const success = await loginUser({
      username,
      password
    })
    if(success){
      setPassword('')
      setUsername('')
    }
  }

  return (
    <form onSubmit={login}>
      <p>
        <label htmlFor='username'>Username: </label>
        <input type='text' onChange={({target}) => setUsername(target.value)} value={username}
               id='username'/>
      </p>
      <p>
        <label htmlFor='password'>Password: </label>
        <input type='text' onChange={({target}) => setPassword(target.value)} value={password}
               id='password'/>
      </p>
      <button type='submit'>Login</button>
    </form>
  )
}

export default LoginForm