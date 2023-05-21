import { useSelector } from "react-redux";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";

function Blogs() {
  const blogs = useSelector((state) =>
    [...state.blogs].sort((a, b) => b.likes - a.likes)
  );
  const blogFormRef = useRef();

  const toggleBlogForm = () => {
    blogFormRef.current.toggleVisibility();
  };
  return (
    <section>
      <Togglable key="newBlogToggle" buttonLabel="Add a blog" ref={blogFormRef}>
        <BlogForm toggle={toggleBlogForm} />
      </Togglable>

      {blogs.map((blog) => (
        <div key={blog.id} className="blog-item">
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      ))}
    </section>
  );
}

export default Blogs;
