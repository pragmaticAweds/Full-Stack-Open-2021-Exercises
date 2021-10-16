import axios from "axios";
import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./Services/persons";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (persons.length !== 0) {
      personService.getDatas().then((response) => {
        setPersons(response);
      });
    }
  }, []);

  console.log(persons);

  const addperson = (event) => {
    event.preventDefault();
    const newperson = {
      id: persons.length + 1,
      name: newName,
      number: Number(newNumber),
    };

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
      return;
    }

    setPersons(persons.concat(newperson));
    setNewName("");
    setNewNumber("");
  };

  const filterDisplay = persons.filter((person) =>
    person.name.toLowerCase().includes(search)
  );

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
          setNewName(e.target.value);
        }}
        keychange2={(e) => {
          setNewNumber(e.target.value);
        }}
      />

      <h3>Numbers</h3>
      <Persons items={filterDisplay} />
    </div>
  );
}

export default App;
