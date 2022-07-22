import { updateBlog, deleteBlog, commentBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target.comment.value;
    const newObj = { id: blog.id, text };
    dispatch(commentBlog(newObj));
    e.target.comment.value = "";
  };

  if (!blog) return null;

  const handleLikes = () => {
    dispatch(updateBlog(blog));
  };

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog));
    }
    navigate(-1);
  };

  return (
    <div>
      <div>
        <h1>
          {blog.title} {blog.author}
        </h1>

        <div>
          <div>{blog.url}</div>
          <div>
            {blog.likes} likes
            <button onClick={handleLikes} id="likebtn">
              like
            </button>
          </div>
          added by {blog.user.name}
          <br />
          <button onClick={handleDelete}>remove</button>
        </div>
        <h2>Comment</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="comment" style={{ marginRight: "0.5rem" }} />
          <button type="submit">add comment</button>
        </form>
        <ul>
          {blog.comment.map((text, index) => (
            <li key={`comment_id_${(text._id, index)}`}>{text.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;
