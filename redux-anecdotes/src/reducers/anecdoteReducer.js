import { createSlice } from "@reduxjs/toolkit";

import anecdoteService from "../services/anecdote";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    append(state, action) {
      state.push(action.payload);
    },
    increaseVote(state, action) {
      const id = action.payload;
      const findAnecdote = state.find((obj) => obj.id === id);
      const newAnecote = {
        ...findAnecdote,
        votes: findAnecdote.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : newAnecote
      );
    },
  },
});

export const { setAnecdotes, append, increaseVote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newContent = await anecdoteService.createNew(content);
    dispatch(append(newContent));
  };
};

export const voteIncrease = (obj) => {
  return async (dispatch) => {
    const newobj = await anecdoteService.update({
      ...obj,
      votes: obj.votes + 1,
    });
    dispatch(increaseVote(newobj.id));
  };
};

export default anecdoteSlice.reducer;
