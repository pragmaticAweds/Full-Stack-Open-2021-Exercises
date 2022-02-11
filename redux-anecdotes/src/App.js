import React from "react";
import Notification from "./components/Notification";
import AnecdoteForm from "./components/anecdoteForm";
import AnecdoteList from "./components/anecdoteList";
import Filter from "./components/Filter";

const App = () => {
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
