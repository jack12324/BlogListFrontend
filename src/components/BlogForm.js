import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import PropTypes from "prop-types";
import {
  displayErrorNotificationFor,
  displaySuccessNotificationFor,
  useNotificationDispatch,
} from "../context/NotificationContext";
import blogService from "../services/blogs";
import { useCurrentUserValue } from "../context/CurrentUserContext";

function BlogForm({ toggleVisibility }) {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const queryClient = useQueryClient();
  const newBlogMutation = useMutation(blogService.create);
  const notificationDispatch = useNotificationDispatch();
  const user = useCurrentUserValue();

  const handleNewBlog = async (blogIn) => {
    newBlogMutation.mutate(blogIn, {
      onSuccess: (newBlog) => {
        const blogs = queryClient.getQueryData("blogs");
        queryClient.setQueryData("blogs", blogs.concat({ ...newBlog, user }));
        displaySuccessNotificationFor(
          notificationDispatch,
          `Added ${blogIn.title} by ${blogIn.author}`,
          5
        );
        toggleVisibility();
        return true;
      },
      onError: () => {
        displayErrorNotificationFor(
          notificationDispatch,
          "Adding Blog Failed",
          5
        );
        return false;
      },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const success = await handleNewBlog({
      author,
      title,
      url,
    });
    if (success) {
      setAuthor("");
      setTitle("");
      setUrl("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label htmlFor="title">
          Title:
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            id="title"
          />
        </label>
      </p>
      <p>
        <label htmlFor="author">
          Author:
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
            id="author"
          />
        </label>
      </p>
      <p>
        <label htmlFor="url">
          Url:
          <input
            type="text"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
            id="url"
          />
        </label>
      </p>
      <button id="blog-form-submit-button" type="submit">
        create
      </button>
    </form>
  );
}

BlogForm.propTypes = {
  toggleVisibility: PropTypes.func,
};

BlogForm.defaultProps = {
  toggleVisibility: () => {},
};

export default BlogForm;
