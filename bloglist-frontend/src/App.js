import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/Login-Form";
import Togglable from "./components/Togglable";
import BlogForm from "./components/Blog-Form";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [Msg, setMsg] = useState({ success: "", error: "" });

  const handleLogin = async (newobj) => {
    try {
      const user = await loginService.login(newobj);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (err) {
      setMsg({
        ...Msg,
        error: err.response.data.error,
      });
      setTimeout(() => {
        setMsg({ ...Msg, error: "" });
      }, 4000);
    }
  };

  const handleBlogSubmit = async (noteObject) => {
    try {
      const blog = await blogService.create(noteObject);
      setBlogs([...blogs, blog]);
      setMsg({
        ...Msg,
        success: `a new blog ${noteObject.title.toUpperCase()} added`,
      });
      setTimeout(() => {
        setMsg({ ...Msg, success: "" });
      }, 4000);
    } catch (err) {
      setMsg({ ...Msg, error: err.response.data.error });
      setTimeout(() => {
        setMsg({ ...Msg, error: "" });
      }, 4000);
    }
  };

  const handlelLogout = async (e) => {
    window.localStorage.clear();
    setUser(null);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <h2>Blogs</h2>

      {user === null ? (
        <Togglable buttonLabel="Log in">
          <LoginForm Msg={Msg} loginObj={handleLogin} />
        </Togglable>
      ) : (
        <div>
          <p>
            {user.name} logged - in{" "}
            <button onClick={handlelLogout}>logout</button>
          </p>
          <Togglable buttonLabel="Create Blog">
            <BlogForm Msg={Msg} createBlog={handleBlogSubmit} />
          </Togglable>
        </div>
      )}

      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default App;
