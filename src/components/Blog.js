import { useState } from 'react';
import PropTypes from 'prop-types';

function Blog({
  blog, handleLike, handleDelete, currentUser,
}) {
  const [showDetails, setShowDetails] = useState(false);

  const toggleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    !showDetails
      ? (
        <div className="blog-item">
          {blog.title}
          {' '}
          {blog.author}
          <button type="button" onClick={toggleShowDetails}>view</button>
        </div>
      )
      : (
        <div className="blog-item">
          <p>
            {blog.title}
            {' '}
            {blog.author}
            <button type="button" onClick={toggleShowDetails}>hide</button>
          </p>
          <p>{blog.url}</p>
          <p>
            {blog.likes}
            <button type="button" onClick={() => handleLike(blog)}>like</button>
          </p>
          <p>{blog.user.name}</p>
          { blog.user.username === currentUser.username
            ? <p><button type="button" onClick={() => handleDelete(blog)}>remove</button></p>
            : null}
        </div>
      )
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
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default Blog;
