import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Routes,
  Route,
  Navigate,
  useMatch,
  useNavigate,
  Link,
} from "react-router-dom";

import Users from "./components/Users";
import User from "./components/User";
import Blogs from "./components/Blogs";
import LoginForm from "./components/Login-Form";
import Togglable from "./components/Togglable";

import { getUsers } from "./reducers/userReducer";
import { intializeBlogs } from "./reducers/blogReducer";
import { resignIn, signOut } from "./reducers/authReducer";
import Blog from "./components/Blog";

const App = () => {
  const userState = useSelector((state) => state.auth);
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);

  const match = useMatch("/users/:id");
  const matchUser = match
    ? users.find((user) => user.id === match.params.id)
    : null;

  const blogMatch = useMatch("/blogs/:id");
  const matchBlog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(signOut());
    navigate("/");
  };

  useEffect(() => {
    dispatch(intializeBlogs());
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(resignIn());
  }, [dispatch]);

  return (
    <div>
      <div>
        {userState && (
          <nav>
            <div className="links">
              <div>
                <Link to="/blogs" className="link">
                  blogs
                </Link>
              </div>
              <div>
                <Link to="/users" className="link">
                  users
                </Link>
              </div>
            </div>
            <p>{userState.name} logged - in </p>
            <button onClick={handleLogout}>logout</button>
          </nav>
        )}
      </div>
      <div className="app">
        <h1>blog app</h1>

        <Routes>
          <Route path="/users/:id" element={<User user={matchUser} />} />
          <Route path="/blogs/:id" element={<Blog blog={matchBlog} />} />
          <Route
            path="/users"
            element={!userState ? <h1>pls log in</h1> : <Users />}
          />
          <Route
            path="/blogs"
            element={userState ? <Blogs /> : <Navigate replace to="/" />}
          />
          <Route
            path="/login"
            element={
              <Togglable buttonLabel="Log in">
                <LoginForm />
              </Togglable>
            }
          />
          <Route
            path="/"
            element={
              !userState ? (
                <Togglable buttonLabel="Log in">
                  <LoginForm />
                </Togglable>
              ) : (
                <Navigate replace to="/blogs" />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
