import { useContext } from "react";
import { CurrentUserContext, LSUSERKEY } from "../context/CurrentUserContext";
import blogService from "../services/blogs";
import {
  displaySuccessNotificationFor,
  useNotificationDispatch,
} from "../context/NotificationContext";

function CurrentUser() {
  const [user, userDispatch] = useContext(CurrentUserContext);
  const notificationDispatch = useNotificationDispatch();
  const handleLogout = () => {
    userDispatch({ type: "CLEAR_USER" });
    blogService.setToken(null);
    localStorage.removeItem(LSUSERKEY);
    displaySuccessNotificationFor(notificationDispatch, "Logout Successful", 5);
  };
  return (
    <p>
      {user.name} is logged in{" "}
      <button type="button" onClick={handleLogout}>
        Log Out
      </button>
    </p>
  );
}

export default CurrentUser;
