import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Users() {
  const users = useSelector((state) => state.users);
  if (!users) return null;
  return (
    <section>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th> </th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Users;
