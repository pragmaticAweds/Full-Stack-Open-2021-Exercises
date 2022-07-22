import React from "react";

function Part({ parts, head }) {
  const Part = parts.map((part) => (
    <p key={part.id}>
      {part.name} {part.exercises}
    </p>
  ));
  const total = parts.reduce((acc, cur) => acc + cur.exercises, 0);
  return (
    <div>
      <h2>{head}</h2>
      {Part}
      <h3>total of {total} exercises</h3>
    </div>
  );
}

export default Part;
