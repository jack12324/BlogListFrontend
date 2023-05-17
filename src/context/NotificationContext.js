import { createContext, useContext, useMemo, useReducer } from "react";
import PropTypes from "prop-types";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_SUCCESS":
      return { ...state, success: action.payload };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    case "CLEAR_SUCCESS":
      return { ...state, success: null };
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const useNotificationValue = () => {
  const valueAndDispatch = useContext(NotificationContext);
  return valueAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const valueAndDispatch = useContext(NotificationContext);
  return valueAndDispatch[1];
};

// const displaySuccessNotificationFor = (message, seconds) => {
//   notificationDispatch({ type: "SET_SUCCESS", payload: message });
//   setTimeout(() => {
//     notificationDispatch({ type: "CLEAR_SUCCESS" });
//   }, 1000 * seconds);
// };

export const displaySuccessNotificationFor = (dispatch, message, seconds) => {
  dispatch({ type: "SET_SUCCESS", payload: message });
  setTimeout(() => {
    dispatch({ type: "CLEAR_SUCCESS" });
  }, 1000 * seconds);
};

export const displayErrorNotificationFor = (dispatch, message, seconds) => {
  dispatch({ type: "SET_ERROR", payload: message });
  setTimeout(() => {
    dispatch({ type: "CLEAR_ERROR" });
  }, 1000 * seconds);
};

export function NotificationContextProvider({ children }) {
  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    error: null,
    success: null,
  });
  return (
    <NotificationContext.Provider
      value={useMemo(
        () => [notification, notificationDispatch],
        [notification]
      )}
    >
      {children}
    </NotificationContext.Provider>
  );
}

NotificationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NotificationContext;
