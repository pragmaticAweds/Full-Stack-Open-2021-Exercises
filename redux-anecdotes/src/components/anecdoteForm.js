import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { newNotification } from "../reducers/notifierReducer";

const AnecdoteForm = ({ createAnecdote, newNotification }) => {
  const handleNewAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";
    createAnecdote(content);
    newNotification(content);
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

export default connect(null, { createAnecdote, newNotification })(AnecdoteForm);
