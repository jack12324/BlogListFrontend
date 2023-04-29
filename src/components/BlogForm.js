const BlogForm = ({handleSubmit, title, author, url}) => (
  <form onSubmit={handleSubmit}>
    <p><label htmlFor='title'>Title:</label><input type={'text'} value={title.title} onChange={({target}) => title.setTitle(target.value)} id='title'/></p>
    <p><label htmlFor='author'>Author:</label><input type={'text'} value={author.author} onChange={({target}) => author.setAuthor(target.value)} id='author'/></p>
    <p><label htmlFor='url'>Url:</label><input type={'text'} value={url.url} onChange={({target}) => url.setUrl(target.value)} id='url'/></p>
    <button type={'submit'}>create</button>
  </form>
)

export default BlogForm