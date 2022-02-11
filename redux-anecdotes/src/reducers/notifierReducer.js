const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "VOTE":
      return action.vote;

    case "NEW":
      return action.new_anecdote;
    default:
      return state;
  }
};

export const newVote = (msg) => {
  return {
    type: "VOTE",
    vote: msg === null ? null : `you voted for '${msg}'`,
  };
};

export const newAnecdote = (msg) => {
  return {
    type: "NEW",
    new_anecdote: msg === null ? null : `you added '${msg}'`,
  };
};

export default notificationReducer;
