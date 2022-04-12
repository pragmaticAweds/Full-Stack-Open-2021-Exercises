import { useState } from "react";
import Content from "./components/Content";
import Button from "./components/Button";

function App() {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(Array(anecdotes.length).fill(0));

  const handleSelected = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const voteHandler = () => {
    const copyVote = [...vote];
    copyVote[selected] += 1;
    setVote(copyVote);
    console.log(copyVote);
  };

  const highestVote = Math.max(...vote);

  const highestVoteindex = vote.indexOf(highestVote);

  return (
    <div>
      <Content
        heading="Anecdote of the day"
        text={anecdotes[selected]}
        vote={vote[selected]}
      />

      <Button click={handleSelected} text="Next Anecdote" />
      <Button click={voteHandler} text="Vote anecdote" />
      <Content
        heading="Anecdote with the most votes"
        text={anecdotes[highestVoteindex]}
        vote={highestVote}
      />
    </div>
  );
}

export default App;
