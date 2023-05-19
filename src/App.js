import { useContext, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import "./index.css";
import BlogForm from "./components/BlogForm";
import SuccessNotification from "./components/SuccessNotification";
import Togglable from "./components/Togglable";
import ErrorNotification from "./components/ErrorNotification";
import { CurrentUserContext, LSUSERKEY } from "./context/CurrentUserContext";
import CurrentUser from "./components/CurrentUser";

function App() {
  const blogFormRef = useRef();

  const [user, userDispatch] = useContext(CurrentUserContext);

  const getBlogs = async () => {
    const allBlogs = await blogService.getAll();
    allBlogs.sort((a, b) => b.likes - a.likes);
    return allBlogs;
  };

  useEffect(() => {
    const localUser = localStorage.getItem(LSUSERKEY);
    if (localUser) {
      const currentUser = JSON.parse(localUser);
      userDispatch({ type: "SET_USER", payload: currentUser });
      blogService.setToken(currentUser.token);
    }
  }, []);

  const toggleVisibility = () => {
    blogFormRef.current.toggleVisibility();
  };

  const result = useQuery("blogs", getBlogs);

  if (result.isLoading) {
    return <div>loading blogs...</div>;
  }

  const blogs = result.data;

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
        <BlogForm toggleVisibility={toggleVisibility} />
      </Togglable>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} currentUser={user} />
      ))}
    </div>
  );
}

export default App;
