import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import {
  displayErrorNotificationFor,
  displaySuccessNotificationFor,
} from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id);
    },
    updateBlog(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      );
    },
  },
});

export default blogSlice.reducer;

export const { setBlogs, appendBlog, removeBlog, updateBlog } =
  blogSlice.actions;

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch(setBlogs(blogs));
};

export const createBlog = (blog, user) => async (dispatch) => {
  try {
    const newBlog = await blogService.create(blog);
    dispatch(appendBlog({ ...newBlog, user }));
    dispatch(
      displaySuccessNotificationFor(
        `Added ${newBlog.title} by ${newBlog.author}`,
        5
      )
    );
    return true;
  } catch (err) {
    dispatch(displayErrorNotificationFor("Adding Blog Failed", 5));
    return false;
  }
};

export const deleteBlog = (blog) => async (dispatch) => {
  try {
    await blogService.deleteBlog(blog.id);
    dispatch(removeBlog(blog));
    dispatch(
      displaySuccessNotificationFor(
        `Deleted ${blog.title} by ${blog.author}`,
        5
      )
    );
  } catch (err) {
    dispatch(
      displayErrorNotificationFor(
        `Deleting ${blog.title} by ${blog.author} failed`,
        5
      )
    );
  }
};

export const likeBlog = (blog) => async (dispatch) => {
  try {
    const updatedBlog = await blogService.update({
      ...blog,
      likes: blog.likes + 1,
    });
    dispatch(updateBlog(updatedBlog));
  } catch (err) {
    dispatch(displayErrorNotificationFor("Liking blog failed", 5));
  }
};

export const addCommentToBlog = (blog, comment) => async (dispatch) => {
  try {
    const addedComment = await blogService.addCommentToBlog(blog.id, comment);
    dispatch(
      updateBlog({ ...blog, comments: blog.comments.concat(addedComment) })
    );
  } catch (err) {
    let errMessage = "Adding comment failed";
    const msg = err.response.data.error;
    if (msg && msg.includes("comments:")) {
      errMessage = `${errMessage}: ${msg.slice(msg.indexOf("comments:") + 10)}`;
    }
    dispatch(displayErrorNotificationFor(errMessage, 5));
  }
};
