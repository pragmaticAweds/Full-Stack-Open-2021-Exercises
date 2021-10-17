import axios from "axios";
import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from "./Services/persons";
import Button from "./components/Button";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    personService.getDatas().then((res) => setPersons(res));
  }, []);

  const updateNo = (id) => {
    const person = persons.find(
      (person) => person.name.toLowerCase() === id.name.toLowerCase()
    );
    console.log({ person });
    const changedNo = { ...person, number: id.number };
    personService
      .update(person.id, changedNo)
      .then((res) =>
        setPersons(
          persons.map((person) =>
            person.name.toLowerCase() === id.name ? person : res
          )
        )
      );
  };

  const addperson = (event) => {
    event.preventDefault();
    const newperson = {
      id: persons.length + 1,
      name: newName,
      number: Number(newNumber),
    };

    if (
      persons.find(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one` &&
          updateNo(newperson)
      );
      setNewName("");
      setNewNumber("");
      return;
    } else {
      personService.create(newperson).then((res) => {
        setPersons(persons.concat(res));
        console.log(res);
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const Delete = (id) =>
    personService
      .deleteData(id)
      .then((res) => setPersons(persons.filter((p) => p.id !== id)));

  const filterDisplay = persons.filter((person) =>
    person.name.toLowerCase().includes(search)
  );

  const displayName = filterDisplay.map((person, personindex) => (
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        value={search}
        keyvalue={(e) => {
          setSearch(e.target.value);
        }}
      />

      <h3>add a new</h3>
      <PersonForm
        submit={addperson}
        value1={newName}
        value2={newNumber}
        keychange1={(e) => {
          setNewName(e.target.value.trim());
        }}
        keychange2={(e) => {
          setNewNumber(e.target.value.trim());
        }}
      />

      <h3>Numbers</h3>
      <ul>{displayName}</ul>
    </div>
  );
}

export default App;
