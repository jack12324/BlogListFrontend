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
import { initializeCurrentUser } from "./reducer/currentUserReducer";
import CurrentUser from "./components/CurrentUser";

function App() {
  const dispatch = useDispatch();
  const blogs = useSelector((state) =>
    [...state.blogs].sort((a, b) => b.likes - a.likes)
  );
  const user = useSelector((state) => state.currentUser);

  const blogFormRef = useRef();

  const toggleBlogForm = () => {
    blogFormRef.current.toggleVisibility();
  };

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
      <CurrentUser />

      <Togglable key="newBlogToggle" buttonLabel="Add a blog" ref={blogFormRef}>
        <BlogForm toggle={toggleBlogForm} />
      </Togglable>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default App;
