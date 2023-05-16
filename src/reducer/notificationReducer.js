import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { error: null, success: null },
  reducers: {
    setErrorNotification(state, action) {
      return { ...state, error: action.payload };
    },
    clearErrorNotification(state) {
      return { ...state, error: null };
    },
    setSuccessNotification(state, action) {
      return { ...state, success: action.payload };
    },
    clearSuccessNotification(state) {
      return { ...state, success: null };
    },
  },
});

export const {
  clearErrorNotification,
  setErrorNotification,
  clearSuccessNotification,
  setSuccessNotification,
} = notificationSlice.actions;

export const displayErrorNotificationFor =
  (message, seconds) => async (dispatch) => {
    dispatch(setErrorNotification(message));
    setTimeout(() => {
      dispatch(clearErrorNotification());
    }, 1000 * seconds);
  };

export const displaySuccessNotificationFor =
  (message, seconds) => async (dispatch) => {
    dispatch(setSuccessNotification(message));
    setTimeout(() => {
      dispatch(clearSuccessNotification());
    }, 1000 * seconds);
  };

export default notificationSlice.reducer;
