import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import BlogForm from "./Blog-Form";
import Togglable from "./Togglable";

import Notification from "./Notification";
import ErrorNotifier from "./Error-Notifier";

const Blogs = () => {
  const blogArr = useSelector((state) => state.blogs);
  const notifier = useSelector((state) => state.notification.good);
  const errorNotifier = useSelector((state) => state.notification.err);

  const sortedData = [].concat(blogArr).sort((a, b) => b.likes - a.likes);

  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginTop: 5,
  };

  return (
    <div>
      <Notification msg={notifier} />
      <ErrorNotifier msg={errorNotifier} />
      <Togglable buttonLabel="Create Blog">
        <BlogForm />
      </Togglable>
      {sortedData.map((blog) => (
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
