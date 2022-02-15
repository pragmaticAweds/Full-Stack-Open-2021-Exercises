import React from "react";
import { useDispatch } from "react-redux";
import anecdoteService from "../services/anecdote";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { newAnecdote as notifier } from "../reducers/notifierReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleNewAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";

    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(createAnecdote(newAnecdote));

    dispatch(notifier(content));
    setTimeout(() => {
      dispatch(notifier(null));
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
