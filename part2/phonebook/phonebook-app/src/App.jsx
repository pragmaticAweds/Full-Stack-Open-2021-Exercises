import React, { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

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

  const addname = (event) => {
    setNewName(event.target.value);
  };

  const addnumber = (e) => {
    setNewNumber(e.target.value);
  };

  const searchKey = (e) => {
    setSearch(e.target.value);
  };

  const filterDisplay = persons.filter((person) =>
    person.name.toLowerCase().includes(search)
  );

  console.log(filterDisplay);
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={search} keyvalue={searchKey} />

      <h3>add a new</h3>
      <PersonForm
        submit={addperson}
        value1={newName}
        value2={newNumber}
        keychange1={addname}
        keychange2={addnumber}
      />

      <h3>Numbers</h3>
      <Persons items={filterDisplay} />
    </div>
  );
}

export default App;
