import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import "./index.css";
import BlogForm from "./components/BlogForm";
import SuccessNotification from "./components/SuccessNotification";
import Togglable from "./components/Togglable";
import ErrorNotification from "./components/ErrorNotification";
import { initializeBlogs } from "./reducer/blogReducer";
import { initializeCurrentUser, logout } from "./reducer/currentUserReducer";

function App() {
  const dispatch = useDispatch();
  const blogs = useSelector((state) =>
    [...state.blogs].sort((a, b) => b.likes - a.likes)
  );
  const user = useSelector((state) => state.currentUser);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    dispatch(initializeCurrentUser());
  }, []);

  if (!user) {
    return (
      <div>
        <h2>Log In</h2>
        <SuccessNotification />
        <ErrorNotification />
        <Togglable key="loginToggle" buttonLabel="login">
          <LoginForm />
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
        <button type="button" onClick={() => dispatch(logout())}>
          Log Out
        </button>
      </p>

      <Togglable key="newBlogToggle" buttonLabel="Add a blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default App;
