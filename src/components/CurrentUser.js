import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../reducer/currentUserReducer";

function CurrentUser() {
  const user = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!user) return null;
  return (
    <span>
      {user.name} is logged in{" "}
      <button type="button" onClick={onLogout}>
        Log Out
      </button>
    </span>
  );
}

export default CurrentUser;
