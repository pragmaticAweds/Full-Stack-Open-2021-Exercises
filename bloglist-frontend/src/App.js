import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import ErrorNotifier from "./components/Error-Notifier";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [Msg, setMsg] = useState({ success: "", error: "" });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
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

  const handleBlogSubmit = async (e) => {
    e.preventDefault();

    try {
      await blogService.create({ title, author, url });
      setMsg({ ...Msg, success: `a new blog ${title.toUpperCase()} added` });
      setTimeout(() => {
        setMsg({ ...Msg, success: "" });
      }, 4000);
      setTitle("");
      setAuthor("");
      setUrl("");
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

  const loginForm = () => (
    <div>
      {Msg.error && <ErrorNotifier msg={Msg.error} />}
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div>
          Password:
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );

  const blogForm = () => (
    <div>
      {Msg.success && <Notification msg={Msg.success} />}
      {Msg.error && <ErrorNotifier msg={Msg.error} />}
      <h2>create new blog</h2>
      <form onSubmit={handleBlogSubmit}>
        <div>
          title:
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            name="title"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );

  return (
    <div>
      <h2>Blogs</h2>

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged - in{" "}
            <button onClick={handlelLogout}>logout</button>
          </p>
          {blogForm()}
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
