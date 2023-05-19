import { createContext, useContext, useMemo, useReducer } from "react";
import PropTypes from "prop-types";

const currentUserReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    case "CLEAR_USER":
      return null;
    default:
      return state;
  }
};

export const LSUSERKEY = "blogListAppLoggedInUser";

export const CurrentUserContext = createContext();

export const useCurrentUserValue = () => {
  const valueAndDispatch = useContext(CurrentUserContext);
  return valueAndDispatch[0];
};

export const useCurrentUserDispatch = () => {
  const valueAndDispatch = useContext(CurrentUserContext);
  return valueAndDispatch[1];
};

export function CurrentUserContextProvider({ children }) {
  const [currentUser, currentUserDispatch] = useReducer(
    currentUserReducer,
    null
  );
  return (
    <CurrentUserContext.Provider
      value={useMemo(() => [currentUser, currentUserDispatch], [currentUser])}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}

CurrentUserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
