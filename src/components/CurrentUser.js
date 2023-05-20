import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducer/currentUserReducer";

function CurrentUser() {
  const user = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  if (!user) return null;
  return (
    <p>
      {user.name} is logged in{" "}
      <button type="button" onClick={() => dispatch(logout())}>
        Log Out
      </button>
    </p>
  );
}

export default CurrentUser;
