import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifier",
  initialState: "",
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
  },
});

const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case "VOTE":
      return action.vote;

    case "NEW":
      return action.new_anecdote;
    default:
      return state;
  }
};

export const { setNotification } = notificationSlice.actions;

export const clearNotification = () => {
  return async (dispatch) => {
    dispatch(setNotification(""));
  };
};

export const newNotification = (msg) => {
  return async (dispatch) => {
    const newNotification = msg === "" ? "" : `new anecdote '${msg}'`;
    dispatch(setNotification(newNotification));
    setTimeout(() => {
      dispatch(setNotification(""));
    }, 5000);
  };
};

export const newVote = (msg, time) => {
  return async (dispatch) => {
    if (msg === "") {
      return;
    }
    let vote = `you voted '${msg}'`;
    dispatch(setNotification(vote));
    let timeout = setTimeout(() => {
      dispatch(clearNotification());
    }, time * 1000);
    if (vote !== msg) {
      clearTimeout(timeout);
      dispatch(setNotification(`you voted '${msg}'`));
      setTimeout(() => {
        dispatch(clearNotification());
      }, time * 1000);
    }
  };
};

export default notificationSlice.reducer;
