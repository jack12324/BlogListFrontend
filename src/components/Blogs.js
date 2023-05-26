import { useSelector } from "react-redux";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useBreakpointValue } from "@chakra-ui/react";
import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import BlogsHeading from "./BlogsHeading";

function Blogs() {
  const blogs = useSelector((state) =>
    [...state.blogs].sort((a, b) => b.likes - a.likes)
  );
  const blogFormRef = useRef();
  const isBase = useBreakpointValue({ base: true, sm: false });

  const toggleBlogForm = () => {
    blogFormRef.current.toggleVisibility();
  };
  return (
    <section>
      {isBase ? null : <BlogsHeading />}
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
