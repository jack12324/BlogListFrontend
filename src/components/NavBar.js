import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CurrentUser from "./CurrentUser";

function NavBar() {
  const user = useSelector((state) => state.currentUser);
  if (!user) return null;
  return (
    <div className="nav-bar">
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      <CurrentUser />
    </div>
  );
}

export default NavBar;
