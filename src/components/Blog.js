import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, likeBlog } from "../reducer/blogReducer";

function Blog({ blog }) {
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);

  const toggleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  return !showDetails ? (
    <div className="blog-item">
      {blog.title} {blog.author}
      <button type="button" onClick={toggleShowDetails}>
        view
      </button>
    </div>
  ) : (
    <div className="blog-item">
      <p>
        {blog.title} {blog.author}
        <button type="button" onClick={toggleShowDetails}>
          hide
        </button>
      </p>
      <p>{blog.url}</p>
      <p className="likes">
        {blog.likes}
        <button type="button" onClick={() => dispatch(likeBlog(blog))}>
          like
        </button>
      </p>
      <p>{blog.user.name}</p>
      {blog.user.username === currentUser.username ? (
        <p>
          <button
            id="delete-blog-button"
            type="button"
            onClick={() => dispatch(deleteBlog(blog))}
          >
            remove
          </button>
        </p>
      ) : null}
    </div>
  );
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Blog;
