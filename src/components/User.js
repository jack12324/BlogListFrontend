import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function User() {
  const { id } = useParams();
  const user = useSelector((state) => state.users.find((u) => u.id === id));

  if (!user) return null;

  return (
    <section>
      <h2>{user.name}</h2>
      <h3>Added Blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </section>
  );
}

export default User;
