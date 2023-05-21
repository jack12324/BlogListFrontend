import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import "./index.css";
import SuccessNotification from "./components/SuccessNotification";
import ErrorNotification from "./components/ErrorNotification";
import { initializeBlogs } from "./reducer/blogReducer";
import { initializeCurrentUser } from "./reducer/currentUserReducer";
import Login from "./components/Login";
import Blogs from "./components/Blogs";
import Users from "./components/Users";
import { initializeUsers } from "./reducer/usersReducer";
import User from "./components/User";
import Blog from "./components/Blog";
import NavBar from "./components/NavBar";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.currentUser);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    dispatch(initializeCurrentUser());
  }, []);

  useEffect(() => {
    dispatch(initializeUsers());
  }, []);

  const requireLogin = (element) => {
    if (user) {
      return element;
    }
    return <Navigate replace to="/login" />;
  };

  return (
    <Router>
      <NavBar />
      <h1>Blogs App</h1>
      <SuccessNotification />
      <ErrorNotification />

      <Routes>
        <Route path="/" element={requireLogin(<Blogs />)} />
        <Route path="/users" element={requireLogin(<Users />)} />
        <Route path="/users/:id" element={requireLogin(<User />)} />
        <Route path="/blogs/:id" element={requireLogin(<Blog />)} />
        <Route
          path="/login"
          element={user ? <Navigate replace to="/" /> : <Login />}
        />
      </Routes>
    </Router>
  );
}

export default App;
