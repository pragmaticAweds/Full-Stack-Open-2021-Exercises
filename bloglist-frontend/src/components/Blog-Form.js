import React, { useState } from "react";

import Notification from "./Notification";
import ErrorNotifier from "./Error-Notifier";

const BlogForm = ({ Msg, createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    createBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
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
};

export default BlogForm;
