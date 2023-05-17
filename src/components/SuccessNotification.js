import { useNotificationValue } from "../context/NotificationContext";

function SuccessNotification() {
  const message = useNotificationValue().success;
  if (message === null) {
    return null;
  }
  return <div className="notification success">{message}</div>;
}

export default SuccessNotification;
