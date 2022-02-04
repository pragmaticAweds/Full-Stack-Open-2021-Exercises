import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/Login-Form";
import Togglable from "./components/Togglable";
import BlogForm from "./components/Blog-Form";

const App = () => {
  const [blogs, setBlogs] = useState([]);
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
    blogFormRef.current.toggleVisibility();
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

  const handleBlogLikes = async (id, noteObject) => {
    try {
      await blogService.update(id, noteObject);
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : noteObject)));
      setMsg({
        ...Msg,
        success: `blog ${noteObject.title.toUpperCase()} updated successfully`,
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

  const handleDelete = async (id) => {
    try {
      await blogService.deleteObj(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (err) {
      console.error({ error: err.message });
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

  const sortedData = [].concat(blogs).sort((a, b) => b.likes - a.likes);

  const blogFormRef = useRef();

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
          <Togglable buttonLabel="Create Blog" ref={blogFormRef}>
            <BlogForm Msg={Msg} createBlog={handleBlogSubmit} />
          </Togglable>
        </div>
      )}

      <div>
        {sortedData
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateLike={handleBlogLikes}
              deleteHandler={handleDelete}
            />
          ))
          .sort()}
      </div>
    </div>
  );
};

export default App;
