import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from "./components/LoginForm";
import './index.css'
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

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

  const handleLogin = async (userIn) => {
    try {
      const user = await loginService.login(userIn)
      setUser(user)
      blogService.setToken(user.token)
      localStorage.setItem(LSUSERKEY, JSON.stringify(user))
      displayNotificationFor('Login Successful', 5, setSuccess)
      return true
    } catch(error) {
      displayNotificationFor('Wrong Username or Password', 5, setError)
      return false
    }
  }

  const handleLogout = () => {
    setUser(null)
    blogService.setToken(null)
    localStorage.removeItem(LSUSERKEY)
    displayNotificationFor('Logout Successful', 5, setSuccess)
  }

  const handleNewBlog = async (blogIn) => {
    try {
      const newBlog = await blogService.create(blogIn)
      setBlogs(blogs.concat(newBlog))
      displayNotificationFor(`Added ${newBlog.title} by ${newBlog.author}`, 5, setSuccess)
      return true
    } catch(error) {
      displayNotificationFor('Adding Blog Failed', 5, setError)
      return false
    }
  }


  if(!user){
    return (
      <div>
        <h2>Log In</h2>
        <Notification message={error} className={'error'}/>
        <Notification message={success} className={'success'}/>
        <Togglable buttonLabel={'login'}>
          <LoginForm loginUser={handleLogin}/>
        </Togglable>
      </div>

    )
  }

  return (
    <div>

      <h2>blogs</h2>
      <Notification message={error} className={'error'}/>
      <Notification message={success} className={'success'}/>
      <p>{user.name} is logged in <button onClick={handleLogout}>Log Out</button></p>

      <Togglable buttonLabel={'Add a blog'}>
        <BlogForm addBlog={handleNewBlog}/>
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

    </div>
  )
}

export default App