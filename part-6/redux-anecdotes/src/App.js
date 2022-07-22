import React, { useEffect } from "react";

import anecdoteService from "../src/services/anecdote";

import Notification from "./components/Notification";
import AnecdoteForm from "./components/anecdoteForm";
import AnecdoteList from "./components/anecdoteList";
import Filter from "./components/Filter";
import { useDispatch } from "react-redux";
import { initializeAnecdotes, setAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
