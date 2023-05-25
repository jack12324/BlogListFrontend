import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import "./index.css";
import {
  Box,
  Center,
  Container,
  Heading,
  Highlight,
  useTheme,
} from "@chakra-ui/react";
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
  const theme = useTheme();

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
    <Box
      as="section"
      pb={{
        base: "12",
        md: "24",
      }}
    >
      <Container w={{ xl: theme.breakpoints.xl }} maxW="100%">
        <NavBar />
        <Center pt="2" pb="4">
          <Heading as="h1" size="2xl">
            <Highlight query="Enrich" styles={{ color: "green.300" }}>
              Blogs to Enrich Your Life
            </Highlight>
          </Heading>
        </Center>
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
      </Container>
    </Box>
  );
}

export default App;
