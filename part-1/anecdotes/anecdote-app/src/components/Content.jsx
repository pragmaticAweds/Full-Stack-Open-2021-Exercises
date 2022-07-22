import React from "react";

function Content({ heading, text, vote }) {
  return (
    <div>
      <h1>{heading}</h1>
      <p>{text}</p>
      <p>has {vote} votes</p>
    </div>
  );
}

export default Content;
