import { useSelector } from "react-redux";

function ErrorNotification() {
  const message = useSelector((state) => state.notification.error);
  if (message === null) {
    return null;
  }
  return <div className="notification error">{message}</div>;
}

export default ErrorNotification;
