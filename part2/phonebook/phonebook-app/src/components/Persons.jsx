import React from "react";
import Button from "./Button";
import delperson from "../Services/persons";

function Persons({ items }) {
  const displayName = items.map((person, personindex) => (
    <li key={person.id}>
      {person.name} {person.number}{" "}
      <Button
        onclick={() => {
          {
            window.confirm(`Delete ${person.name}`) &&
              delperson.deleteData(person.id);
          }
        }}
      />
    </li>
  ));
  return <ul>{displayName}</ul>;
}

export default Persons;
