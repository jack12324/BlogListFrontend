import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./index.css";
import SuccessNotification from "./components/SuccessNotification";
import ErrorNotification from "./components/ErrorNotification";
import { initializeBlogs } from "./reducer/blogReducer";
import { initializeCurrentUser } from "./reducer/currentUserReducer";
import CurrentUser from "./components/CurrentUser";
import Login from "./components/Login";
import Blogs from "./components/Blogs";
import Users from "./components/Users";
import { initializeUsers } from "./reducer/usersReducer";

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

  return (
    <Router>
      <div>
        <h2>{user ? "Blogs" : "Log In"}</h2>
        <SuccessNotification />
        <ErrorNotification />
        <CurrentUser />
      </div>

      <Routes>
        <Route path="/" element={user ? <Blogs /> : <Login />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
}

export default App;
