import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import "./index.css";
import BlogForm from "./components/BlogForm";
import SuccessNotification from "./components/SuccessNotification";
import Togglable from "./components/Togglable";
import ErrorNotification from "./components/ErrorNotification";
import {
  displayErrorNotificationFor,
  displaySuccessNotificationFor,
} from "./reducer/notificationReducer";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  const LSUSERKEY = "blogListAppLoggedInUser";
  const dispatch = useDispatch();

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
      dispatch(displaySuccessNotificationFor("Login Successful", 5));
      return true;
    } catch (err) {
      dispatch(displayErrorNotificationFor("Wrong Username or Password", 5));
      return false;
    }
  };

  const handleLogout = () => {
    setUser(null);
    blogService.setToken(null);
    localStorage.removeItem(LSUSERKEY);
    dispatch(displaySuccessNotificationFor("Logout Successful", 5));
  };

  const handleNewBlog = async (blogIn) => {
    try {
      const newBlog = await blogService.create(blogIn);
      setBlogs(blogs.concat({ ...newBlog, user }));
      dispatch(
        displaySuccessNotificationFor(
          `Added ${newBlog.title} by ${newBlog.author}`,
          5
        )
      );
      blogFormRef.current.toggleVisibility();
      return true;
    } catch (err) {
      dispatch(displayErrorNotificationFor("Adding Blog Failed", 5));
      return false;
    }
  };

  const handleLike = async (blog) => {
    try {
      const response = await blogService.update({
        ...blog,
        likes: blog.likes + 1,
      });
      const updatedBlogs = blogs.map((b) =>
        b.id === response.id ? response : b
      );
      updatedBlogs.sort((a, b) => b.likes - a.likes);
      setBlogs(updatedBlogs);
    } catch (err) {
      dispatch(displayErrorNotificationFor("Liking blog failed", 5));
    }
  };

  const handleDelete = async (blog) => {
    try {
      await blogService.deleteBlog(blog.id);
      setBlogs(blogs.filter((b) => b.id !== blog.id));
    } catch (err) {
      dispatch(
        displayErrorNotificationFor(
          `Deleting ${blog.title} by ${blog.author} failed`,
          5
        )
      );
    }
  };

  if (!user) {
    return (
      <div>
        <h2>Log In</h2>
        <SuccessNotification />
        <ErrorNotification />
        <Togglable key="loginToggle" buttonLabel="login">
          <LoginForm loginUser={handleLogin} />
        </Togglable>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <SuccessNotification />
      <ErrorNotification />
      <p>
        {user.name} is logged in{" "}
        <button type="button" onClick={handleLogout}>
          Log Out
        </button>
      </p>

      <Togglable key="newBlogToggle" buttonLabel="Add a blog" ref={blogFormRef}>
        <BlogForm addBlog={handleNewBlog} />
      </Togglable>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleDelete={handleDelete}
          currentUser={user}
        />
      ))}
    </div>
  );
}

export default App;
