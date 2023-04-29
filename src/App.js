import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from "./components/LoginForm";
import './index.css'
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)


  const LSUSERKEY = 'blogListAppLoggedInUser'

  const displayNotificationFor = (message, seconds, setNotification) => {
    setNotification(message)
    setTimeout( () => {
      setNotification(null)
    }, 1000 * seconds
    )
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const localUser = localStorage.getItem(LSUSERKEY)
    if(localUser){
      const user = JSON.parse(localUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      setUser(user)
      blogService.setToken(user.token)
      localStorage.setItem(LSUSERKEY, JSON.stringify(user))
      setUsername('')
      setPassword('')
      displayNotificationFor('Login Successful', 5, setSuccess)
    } catch(error) {
      displayNotificationFor('Wrong Username or Password', 5, setError)
    }
  }

  const handleLogout = () => {
    setUser(null)
    blogService.setToken(null)
    localStorage.removeItem(LSUSERKEY)
    displayNotificationFor('Logout Successful', 5, setSuccess)
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.create({title, author, url})
      setBlogs(blogs.concat(newBlog))
      setTitle('')
      setUrl('')
      setAuthor('')
      displayNotificationFor(`Added ${newBlog.title} by ${newBlog.author}`, 5, setSuccess)
    } catch(error) {
      displayNotificationFor('Adding Blog Failed', 5, setError)
    }
  }


  if(!user){
    return (
      <div>
        <h2>Log In</h2>
        <Notification message={error} className={'error'}/>
        <Notification message={success} className={'success'}/>
        <LoginForm handleSubmit={handleLogin} password={{password, setPassword}} username={{username, setUsername}}/>
      </div>

    )
  }

  return (
    <div>

      <h2>blogs</h2>
      <Notification message={error} className={'error'}/>
      <Notification message={success} className={'success'}/>
      <p>{user.name} is logged in <button onClick={handleLogout}>Log Out</button></p>

      <BlogForm handleSubmit={handleNewBlog} author={{author, setAuthor}} title={{title, setTitle}} url={{url, setUrl}}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

    </div>
  )
}

export default App