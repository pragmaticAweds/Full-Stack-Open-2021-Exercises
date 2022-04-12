import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { good: "", err: "" },
  reducers: {
    setGoodMsg(state, action) {
      state.good = action.payload;
    },
    setErrorMsg(state, action) {
      state.err = action.payload;
    },
  },
});

export const { setGoodMsg, setErrorMsg } = notificationSlice.actions;

export const setNotifier = (msg, time) => {
  return async (dispatch) => {
    dispatch(setGoodMsg(msg));
    setTimeout(() => {
      dispatch(setGoodMsg(""));
    }, time * 1000);
  };
};

export const setErrorNotifier = (msg, time) => {
  return async (dispatch) => {
    dispatch(setErrorMsg(msg));
    setTimeout(() => {
      dispatch(setErrorMsg(""));
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
