import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBlog, likeBlog } from "../reducer/blogReducer";

function Blog() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  const { id } = useParams();
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id));
  const navigate = useNavigate();

  const handleDelete = async () => {
    await dispatch(deleteBlog(blog));
    navigate("/");
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
    </section>
  );
}

export default Blog;
