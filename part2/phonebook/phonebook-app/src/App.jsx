import axios from "axios";
import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log(response.data);
      setPersons(response.data);
    });
  }, []);

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
