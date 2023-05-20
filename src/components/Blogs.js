import { useSelector } from "react-redux";
import { useRef } from "react";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import Blog from "./Blog";

function Blogs() {
  const blogs = useSelector((state) =>
    [...state.blogs].sort((a, b) => b.likes - a.likes)
  );
  const blogFormRef = useRef();

  const toggleBlogForm = () => {
    blogFormRef.current.toggleVisibility();
  };
  return (
    <>
      <Togglable key="newBlogToggle" buttonLabel="Add a blog" ref={blogFormRef}>
        <BlogForm toggle={toggleBlogForm} />
      </Togglable>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  );
}

export default Blogs;
