import React from "react";
import Part from "./Part";

function Content({ name, parts }) {
  return (
    <div>
      <Part parts={parts} head={name} />
    </div>
  );
}

export default Content;
