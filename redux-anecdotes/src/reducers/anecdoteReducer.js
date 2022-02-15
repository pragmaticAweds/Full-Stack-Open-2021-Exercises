import { createSlice } from "@reduxjs/toolkit";
const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const newAnecote = action.payload;
      state.push(newAnecote);
    },
    setAnecdotes(state, action) {
      return action.payload;
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

export const { setAnecdotes, createAnecdote, increaseVote } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
