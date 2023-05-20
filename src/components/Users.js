import { useSelector } from "react-redux";

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
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Users;
