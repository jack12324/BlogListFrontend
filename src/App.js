import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import './index.css';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const LSUSERKEY = 'blogListAppLoggedInUser';

  const displayNotificationFor = (message, seconds, setNotification) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 1000 * seconds);
  };

  useEffect(() => {
    const getBlogs = async () => {
      const allBlogs = await blogService.getAll();
      allBlogs.sort((a, b) => b.likes - a.likes);
      setBlogs(allBlogs);
    };
    getBlogs();
  }, []);

  useEffect(() => {
    const localUser = localStorage.getItem(LSUSERKEY);
    if (localUser) {
      const currentUser = JSON.parse(localUser);
      setUser(currentUser);
      blogService.setToken(currentUser.token);
    }
  }, []);

  const handleLogin = async (userIn) => {
    try {
      const currentUser = await loginService.login(userIn);
      blogService.setToken(currentUser.token);
      localStorage.setItem(LSUSERKEY, JSON.stringify(currentUser));
      setUser(currentUser);
      displayNotificationFor('Login Successful', 5, setSuccess);
      return true;
    } catch (err) {
      displayNotificationFor('Wrong Username or Password', 5, setError);
      return false;
    }
  };

  const handleLogout = () => {
    setUser(null);
    blogService.setToken(null);
    localStorage.removeItem(LSUSERKEY);
    displayNotificationFor('Logout Successful', 5, setSuccess);
  };

  const handleNewBlog = async (blogIn) => {
    try {
      const newBlog = await blogService.create(blogIn);
      setBlogs(blogs.concat({ ...newBlog, user }));
      displayNotificationFor(`Added ${newBlog.title} by ${newBlog.author}`, 5, setSuccess);
      return true;
    } catch (err) {
      displayNotificationFor('Adding Blog Failed', 5, setError);
      return false;
    }
  };

  const handleLike = async (blog) => {
    try {
      const response = await blogService.update({ ...blog, likes: blog.likes + 1 });
      const updatedBlogs = blogs.map((b) => (b.id === response.id ? response : b));
      updatedBlogs.sort((a, b) => b.likes - a.likes);
      setBlogs(updatedBlogs);
    } catch (err) {
      displayNotificationFor('Liking blog failed', 5, setError);
    }
  };

  const handleDelete = async (blog) => {
    try {
      await blogService.deleteBlog(blog.id);
      setBlogs(blogs.filter((b) => b.id !== blog.id));
    } catch (err) {
      displayNotificationFor(`Deleting ${blog.title} by ${blog.author} failed`, 5, setError);
    }
  };

  if (!user) {
    return (
      <div>
        <h2>Log In</h2>
        <Notification message={error} className="error" />
        <Notification message={success} className="success" />
        <Togglable key="loginToggle" buttonLabel="login">
          <LoginForm loginUser={handleLogin} />
        </Togglable>
      </div>

    );
  }

  return (
    <div>

      <h2>blogs</h2>
      <Notification message={error} className="error" />
      <Notification message={success} className="success" />
      <p>
        {user.name}
        {' '}
        is logged in
        {' '}
        <button type="button" onClick={handleLogout}>Log Out</button>
      </p>

      <Togglable key="newBlogToggle" buttonLabel="Add a blog">
        <BlogForm addBlog={handleNewBlog} />
      </Togglable>

      {blogs.map(
        (blog) => <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} currentUser={user} />,
      )}

    </div>
  );
}

export default App;
