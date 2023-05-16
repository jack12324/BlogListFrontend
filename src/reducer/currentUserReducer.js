import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import loginService from "../services/login";
import {
  displayErrorNotificationFor,
  displaySuccessNotificationFor,
} from "./notificationReducer";

const LSUSERKEY = "blogListAppLoggedInUser";

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: null,
  reducers: {
    setCurrentUser(state, action) {
      return action.payload;
    },
    clearCurrentUser() {
      return null;
    },
  },
});

export const { setCurrentUser, clearCurrentUser } = currentUserSlice.actions;

export const initializeCurrentUser = () => async (dispatch) => {
  const localUser = localStorage.getItem(LSUSERKEY);
  if (localUser) {
    const currentUser = JSON.parse(localUser);
    dispatch(setCurrentUser(currentUser));
    blogService.setToken(currentUser.token);
  }
};

export const loginUser = (user) => async (dispatch) => {
  try {
    const currentUser = await loginService.login(user);
    blogService.setToken(currentUser.token);
    localStorage.setItem(LSUSERKEY, JSON.stringify(currentUser));
    dispatch(setCurrentUser(currentUser));
    dispatch(displaySuccessNotificationFor("Login Successful", 5));
    return true;
  } catch (err) {
    dispatch(displayErrorNotificationFor("Wrong Username or Password", 5));
    return false;
  }
};

export const logout = () => async (dispatch) => {
  dispatch(clearCurrentUser());
  blogService.setToken(null);
  localStorage.removeItem(LSUSERKEY);
  dispatch(displaySuccessNotificationFor("Logout Successful", 5));
};
export default currentUserSlice.reducer;
