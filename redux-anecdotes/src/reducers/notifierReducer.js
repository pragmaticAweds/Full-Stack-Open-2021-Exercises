import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifier",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
  },
});

const notificationReducer = (state = null, action) => {
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

export const newNotification = (msg) => {
  return async (dispatch) => {
    const newNotification = msg === null ? null : `new anecdote '${msg}'`;
    dispatch(setNotification(newNotification));
    setTimeout(() => {
      dispatch(setNotification(null));
    }, 5000);
  };
};

export const newVote = (msg, time) => {
  return async (dispatch) => {
    const vote = msg === null ? null : `you voted '${msg}'`;
    dispatch(setNotification(vote));
    setTimeout(() => {
      dispatch(setNotification(null));
    }, Number(`${time}000`));
  };
};

export default notificationSlice.reducer;
