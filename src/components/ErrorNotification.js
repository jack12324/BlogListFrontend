import { useNotificationValue } from "../context/NotificationContext";

function ErrorNotification() {
  const message = useNotificationValue().error;
  if (message === null) {
    return null;
  }
  return <div className="notification error">{message}</div>;
}

export default ErrorNotification;
