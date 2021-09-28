import { useState } from "react";
import Buttons from "./components/Buttons";
import Statistics from "./components/Statistics";

function App() {
  const [click, setClicks] = useState({
    good: 0,
    bad: 0,
    neutral: 0,
  });
  const [totalClicks, setTotalClicks] = useState(0);

  const goodClick = () => (
    setTotalClicks(totalClicks + 1),
    setClicks({ ...click, good: click.good + 1 })
  );
  const badClick = () => (
    setTotalClicks(totalClicks + 1), setClicks({ ...click, bad: click.bad + 1 })
  );
  const neutralClick = () => (
    setTotalClicks(totalClicks + 1),
    setClicks({ ...click, neutral: click.neutral + 1 })
  );

  return (
    <div>
      <h1>give feedback</h1>

      <Buttons click={goodClick} text="Good" />
      <Buttons click={neutralClick} text="Neutral" />
      <Buttons click={badClick} text="Bad" />

      <Statistics
        good={click.good}
        bad={click.bad}
        neutral={click.neutral}
        average={
          (click.good + click.neutral + click.bad) /
          (click.good + click.neutral + click.bad + totalClicks)
        }
        all={totalClicks}
        positive={(click.good / totalClicks) * 100 + " %"}
      />
    </div>
  );
}

export default App;
