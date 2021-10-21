import React from "react";
import Button from "../components/Button";
import delService from "../Services/persons";

const Persons = ({ filterDisplay, setPersons, persons }) => {
  const person = persons;

  const Delete = (id) =>
    delService
      .deleteData(id)
      .then((res) => setPersons(persons.filter((p) => p.id !== id)));

  const display = filterDisplay.map((person, personindex) => (
    <li key={person.id}>
      {person.name} {person.number}{" "}
      <Button
        onclick={() => {
          {
            window.confirm(`Delete ${person.name}`) && Delete(person.id);
          }
        }}
      />
    </li>
  ));

  return <div>{display}</div>;
};

export default Persons;
