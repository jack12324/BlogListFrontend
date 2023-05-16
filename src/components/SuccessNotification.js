import { useSelector } from "react-redux";

function SuccessNotification() {
  const message = useSelector((state) => state.notification.success);
  if (message === null) {
    return null;
  }
  return <div className="notification success">{message}</div>;
}

export default SuccessNotification;
