import React from "react";

function Persons({ items }) {
  const displayName = items.map((person) => (
    <li key={person.id}>
      {person.name} {person.number}
    </li>
  ));
  return <ul>{displayName}</ul>;
}

export default Persons;
