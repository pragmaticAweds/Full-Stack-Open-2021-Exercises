import { createSlice, current } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setErrorNotifier, setNotifier } from "./notifierReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    blogUpdate(state, action) {
      const id = action.payload;
      const findblog = state.find((blog) => blog.id === id);
      const updateBlog = { ...findblog, likes: findblog.likes + 1 };
      return state.map((blog) => (blog.id !== id ? blog : updateBlog));
    },

    blogComment(state, action) {
      const { id, res } = action.payload;
      const findblog = current(state).find((blog) => blog.id === id);
      console.log({ findblog });
      const updateBlog = {
        ...findblog,
        comment: findblog.comment.concat(res),
      };
      console.log({ updateBlog });
      return state.map((blog) => (blog.id !== id ? blog : updateBlog));
    },

    blogDelete(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

export const { setBlogs, appendBlog, blogComment, blogUpdate, blogDelete } =
  blogSlice.actions;

export default blogSlice.reducer;

export const intializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const newBlogPost = (obj) => {
  return async (dispatch) => {
    try {
      const newpost = await blogService.create(obj);
      dispatch(appendBlog(newpost));
      dispatch(
        setNotifier(`blog ${obj.title.toUpperCase()} created successfully`, 3)
      );
    } catch (error) {
      dispatch(setErrorNotifier(error.response.data.error, 3));
    }
  };
};

export const commentBlog = (obj) => {
  return async (dispatch) => {
    try {
      const { id } = obj;
      const res = await blogService.comment(obj);
      await dispatch(blogComment({ id, res }));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.update(blog);
      dispatch(blogUpdate(blog.id));
      dispatch(
        setNotifier(`blog ${blog.title.toUpperCase()} updated successfully`, 3)
      );
    } catch (err) {
      dispatch(setErrorNotifier(err.response.data.error, 3));
    }
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.deleteObj(blog.id);
      dispatch(blogDelete(blog.id));
      dispatch(
        setNotifier(`blog ${blog.title.toUpperCase()} deleted successfully`, 3)
      );
    } catch (err) {
      dispatch(setErrorNotifier(err.response.data.error, 3));
    }
  };
};
