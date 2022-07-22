import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "../reducers/blogReducer";
import notifierReducer from "../reducers/notifierReducer";
import authReducer from "../reducers/authReducer";
import userReducer from "../reducers/userReducer";

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notifierReducer,
    auth: authReducer,
    users: userReducer,
  },
});

export default store;
