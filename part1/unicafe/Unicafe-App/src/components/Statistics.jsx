import React from "react";

const Statistics = ({ good, bad, neutral, all, average, positive }) => {
  if (all < 1) {
    return <p>No feedback given</p>;
  }
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <tr>
            <td>Good {good}</td>
          </tr>
          <tr>
            <td>Neutral {neutral}</td>
          </tr>
          <tr>
            <td>Bad {bad}</td>
          </tr>
          <tr>
            <td>All {all}</td>
          </tr>
          <tr>
            <td>Average {average}</td>
          </tr>
          <tr>
            <td>Positive {positive}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Statistics;
