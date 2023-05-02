import {useState} from "react";

const BlogForm = ({addBlog}) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const success = await addBlog({
      author,
      title,
      url
    })
    if(success){
      setAuthor('')
      setTitle('')
      setUrl('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <p><label htmlFor='title'>Title:</label><input type={'text'} value={title} onChange={({target}) => setTitle(target.value)} id='title'/></p>
      <p><label htmlFor='author'>Author:</label><input type={'text'} value={author} onChange={({target}) => setAuthor(target.value)} id='author'/></p>
      <p><label htmlFor='url'>Url:</label><input type={'text'} value={url} onChange={({target}) => setUrl(target.value)} id='url'/></p>
      <button type={'submit'}>create</button>
    </form>
  )
}

export default BlogForm