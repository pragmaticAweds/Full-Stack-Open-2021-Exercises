import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { newAnecdote } from "../reducers/notifierReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleNewAnecdote = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";
    dispatch(createAnecdote(content));
    dispatch(newAnecdote(content));

    setTimeout(() => {
      dispatch(newAnecdote(null));
    }, 5000);
  };

  return (
    <div>
      <h2>Create New Anecdote</h2>
      <form onSubmit={handleNewAnecdote}>
        <input type="text" name="anecdote" />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
};

export default AnecdoteForm;
