import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { voteIncrease } from "../reducers/anecdoteReducer";
import { newVote } from "../reducers/notifierReducer";

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div>
      <span>{anecdote.content}</span> <br />
      <span>{anecdote.votes}</span>{" "}
      <button onClick={() => handleVote(anecdote, anecdote.content)}>
        vote
      </button>
    </div>
  );
};

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    const anecdoteState = !state.filterkey
      ? state.anecdotes
      : state.anecdotes.filter(({ content }) =>
          content.toLowerCase().includes(state.filterkey.toLowerCase())
        );
    return anecdoteState;
  });

  const sorted = [...anecdotes].sort((a, b) => b.votes - a.votes);

  const dispatch = useDispatch();

  const handleClick = (obj, msg) => {
    dispatch(voteIncrease(obj));
    dispatch(newVote(msg, 3));
  };

  return (
    <div>
      {sorted.map((val) => (
        <Anecdote key={val.id} anecdote={val} handleVote={handleClick} />
      ))}
    </div>
  );
};

export default AnecdoteList;
