import { useDispatch } from "react-redux";

import { newBlogPost } from "../reducers/blogReducer";

const BlogForm = () => {
  const dispatch = useDispatch();

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    e.target.title.value = "";
    const author = e.target.author.value;
    e.target.author.value = "";
    const url = e.target.url.value;
    e.target.url.value = "";
    dispatch(newBlogPost({ title, author, url }));
  };

  return (
    <div className="blog">
      <h2>create new blog</h2>
      <form onSubmit={handleBlogSubmit}>
        <div>
          title:
          <input id="title" type="text" name="title" />
        </div>
        <div>
          author:
          <input id="author" type="text" name="author" />
        </div>
        <div>
          url:
          <input id="url" type="text" name="url" />
        </div>
        <button type="submit" id="create">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
