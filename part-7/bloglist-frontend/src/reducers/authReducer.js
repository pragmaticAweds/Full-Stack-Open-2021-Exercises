import { createSlice } from "@reduxjs/toolkit";

import loginService from "../services/login";
import blogService from "../services/blogs";

import { setErrorNotifier } from "./notifierReducer";

const authSlice = createSlice({
  name: "auth",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;

export const signIn = (isUser) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(isUser);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      await dispatch(setUser(user));
      blogService.setToken(user.token);
    } catch (error) {
      dispatch(setErrorNotifier(error.response.data.error, 3));
    }
  };
};

export const resignIn = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch(setUser(user));
    }
  };
};

export const signOut = () => {
  return async (dispatch) => {
    window.localStorage.clear();
    blogService.setToken("");
    await dispatch(setUser(null));
  };
};

export default authSlice.reducer;
