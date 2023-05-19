import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { createBlog } from "../reducer/blogReducer";

function BlogForm({ toggle }) {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUser);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const success = await dispatch(
      createBlog(
        {
          author,
          title,
          url,
        },
        user
      )
    );
    if (success) {
      setAuthor("");
      setTitle("");
      setUrl("");
      toggle();
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
  toggle: PropTypes.func,
};

BlogForm.defaultProps = {
  toggle: () => {},
};

export default BlogForm;
