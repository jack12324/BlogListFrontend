import { useState } from 'react';
import PropTypes from 'prop-types';

function BlogForm({ addBlog }) {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const success = await addBlog({
      author,
      title,
      url,
    });
    if (success) {
      setAuthor('');
      setTitle('');
      setUrl('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label htmlFor="title">
          Title:
          <input type="text" value={title} onChange={({ target }) => setTitle(target.value)} id="title" />
        </label>
      </p>
      <p>
        <label htmlFor="author">
          Author:
          <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)} id="author" />
        </label>
      </p>
      <p>
        <label htmlFor="url">
          Url:
          <input type="text" value={url} onChange={({ target }) => setUrl(target.value)} id="url" />
        </label>
      </p>
      <button type="submit">create</button>
    </form>
  );
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
};

export default BlogForm;
