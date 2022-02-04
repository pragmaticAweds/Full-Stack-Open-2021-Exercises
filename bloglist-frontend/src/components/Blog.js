import React, { useState } from "react";

const Blog = ({ blog, updateLike, deleteHandler }) => {
  const [visible, setVisible] = useState(false);

  const handleLikes = () => {
    const newObj = { ...blog, likes: blog.likes + 1 };
    updateLike(blog.id, newObj);
  };

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      return deleteHandler(blog.id);
    }
  };

  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginTop: 5,
  };

  return (
    <div style={blogStyle}>
      {blog.title}{" "}
      <button onClick={() => setVisible(!visible)}>
        {visible ? "hide" : "view"}
      </button>
      <div style={{ display: visible ? "" : "none" }}>
        <span>{blog.url}</span> <br />
        <span>
          likes {blog.likes} <button onClick={handleLikes}>like</button>
        </span>
        <br />
        <span>{blog.author}</span> <br />
        <button onClick={handleDelete}>remove</button>
      </div>
    </div>
  );
};

export default Blog;
