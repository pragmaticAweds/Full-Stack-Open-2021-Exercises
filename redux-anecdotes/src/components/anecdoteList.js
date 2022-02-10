import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseVote } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div>
      <span>{anecdote.content}</span> <br />
      <span>{anecdote.votes}</span>{" "}
      <button onClick={() => handleVote(anecdote.id)}>vote</button>
    </div>
  );
};

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  // eslint-disable-next-line no-unused-vars
  const sortedVote = anecdotes.sort((a, b) => b.votes - a.votes);

  const handleClick = (id) => dispatch(increaseVote(id));

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((val) => (
        <Anecdote key={val.id} anecdote={val} handleVote={handleClick} />
      ))}
    </div>
  );
};

export default AnecdoteList;
