import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { addCommentToBlog, deleteBlog, likeBlog } from "../reducer/blogReducer";

function Blog() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  const { id } = useParams();
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id));
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState("");

  const handleDelete = async () => {
    await dispatch(deleteBlog(blog));
    navigate("/");
  };

  const handleComment = async (event) => {
    event.preventDefault();
    await dispatch(addCommentToBlog(blog, newComment));
  };

  if (!blog) return null;

  return (
    <section>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <p>{blog.url}</p>
      <p className="likes">
        {blog.likes}
        <button type="button" onClick={() => dispatch(likeBlog(blog))}>
          like
        </button>
      </p>
      <p>{`Added by ${blog.user.name}`}</p>
      {blog.user.username === currentUser.username ? (
        <p>
          <button id="delete-blog-button" type="button" onClick={handleDelete}>
            remove
          </button>
        </p>
      ) : null}
      <section>
        <h3>Comments</h3>
        <form onSubmit={handleComment}>
          <input
            type="text"
            onChange={({ target }) => setNewComment(target.value)}
            value={newComment}
          />
          <button type="submit">add Comment</button>
        </form>
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment}>{comment}</li>
          ))}
        </ul>
      </section>
    </section>
  );
}

export default Blog;
