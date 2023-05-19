import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducer/notificationReducer";
import blogReducer from "./reducer/blogReducer";
import currentUserReducer from "./reducer/currentUserReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    currentUser: currentUserReducer,
  },
});

export default store;
