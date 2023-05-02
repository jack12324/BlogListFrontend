import {useState} from "react";

const Blog = ({blog}) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
    console.log(blog.user)
  }
  return (
    !showDetails
      ?
        <div className={'blog-item'}>
          {blog.title} {blog.author} <button onClick={toggleShowDetails}>view</button>
        </div>
      :
        <div className={'blog-item'}>
          <p>{blog.title} {blog.author}<button onClick={toggleShowDetails}>hide</button></p>
          <p>{blog.url}</p>
          <p>{blog.likes} <button>like</button></p>
          <p>{blog.user.name}</p>
        </div>
  )
}

export default Blog