import { configureStore } from "@reduxjs/toolkit";

import AnecdoteReducer from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/notifierReducer";
import filterReducer from "./reducers/filterReducer";

const store = configureStore({
  reducer: {
    anecdotes: AnecdoteReducer,
    notifier: notificationReducer,
    filterkey: filterReducer,
  },
});

export default store;
