import { useState } from "react";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "react-query";
import { useCurrentUserValue } from "../context/CurrentUserContext";
import {
  displayErrorNotificationFor,
  useNotificationDispatch,
} from "../context/NotificationContext";
import blogService from "../services/blogs";

function Blog({ blog }) {
  const [showDetails, setShowDetails] = useState(false);
  const currentUser = useCurrentUserValue();
  const updateBlogMutation = useMutation(blogService.update);
  const deleteBlogMutation = useMutation(blogService.deleteBlog);
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const handleLike = async () => {
    updateBlogMutation.mutate(
      { ...blog, likes: blog.likes + 1 },
      {
        onSuccess: (updatedBlog) => {
          const blogs = queryClient.getQueryData("blogs");
          const updatedBlogs = blogs.map((b) =>
            b.id === updatedBlog.id ? updatedBlog : b
          );
          updatedBlogs.sort((a, b) => b.likes - a.likes);
          queryClient.setQueryData("blogs", updatedBlogs);
        },
        onError: () => {
          displayErrorNotificationFor(
            notificationDispatch,
            "Liking blog failed",
            5
          );
        },
      }
    );
  };

  const handleDelete = async () => {
    deleteBlogMutation.mutate(blog.id, {
      onSuccess: () => {
        const blogs = queryClient.getQueryData("blogs");
        queryClient.setQueryData(
          "blogs",
          blogs.filter((b) => b.id !== blog.id)
        );
      },
      onError: () => {
        displayErrorNotificationFor(
          notificationDispatch,
          `Deleting ${blog.title} by ${blog.author} failed`,
          5
        );
      },
    });
  };
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
        <button type="button" onClick={() => handleLike()}>
          like
        </button>
      </p>
      <p>{blog.user.name}</p>
      {blog.user.username === currentUser.username ? (
        <p>
          <button
            id="delete-blog-button"
            type="button"
            onClick={() => handleDelete()}
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
    id: PropTypes.string.isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default Blog;
