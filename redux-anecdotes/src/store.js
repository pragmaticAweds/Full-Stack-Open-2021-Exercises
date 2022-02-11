import { createStore, combineReducers } from "redux";
import AnecdoteReducer from "./reducers/anecdoteReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import notificationReducer from "./reducers/notifierReducer";

const reducer = combineReducers({
  anecdotes: AnecdoteReducer,
  notifier: notificationReducer,
});

const store = createStore(reducer, composeWithDevTools());

export default store;
