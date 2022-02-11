import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseVote } from "../reducers/anecdoteReducer";
import { newVote } from "../reducers/notifierReducer";

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div>
      <span>{anecdote.content}</span> <br />
      <span>{anecdote.votes}</span>{" "}
      <button onClick={() => handleVote(anecdote.id, anecdote.content)}>
        vote
      </button>
    </div>
  );
};

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.anecdotes.sort((a, b) => b.votes - a.votes)
  );
  const dispatch = useDispatch();

  const handleClick = (id, msg) => {
    dispatch(increaseVote(id));
    dispatch(newVote(msg));
    setTimeout(() => {
      dispatch(newVote(null));
    }, 5000);
  };

  return (
    <div>
      {anecdotes.map((val) => (
        <Anecdote key={val.id} anecdote={val} handleVote={handleClick} />
      ))}
    </div>
  );
};

export default AnecdoteList;
