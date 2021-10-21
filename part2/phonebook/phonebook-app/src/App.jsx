import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personService from "./Services/persons";
import Persons from "./components/Persons";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    personService.getDatas().then((res) => setPersons(res));
  }, []);

  const updateNo = (pers, obj) => {
    const changedNo = { ...pers, number: obj.number };
    personService
      .update(pers.id, changedNo)
      .then((res) => {
        console.log(res);
        setPersons(
          persons.map((person) => (person.id !== pers.id ? person : res))
        );
      })
      .catch((err) => {
        alert(`the person '${changedNo.name}' was deleted from server`);
        setPersons(persons.filter((person) => person.id !== pers.id));
      });
  };

  const addperson = (e) => {
    e.preventDefault();
    const newperson = {
      name: newName,
      number: Number(newNumber),
    };

    const findPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (findPerson) {
      window.confirm(
        ` ${findPerson.name} is already added to phonebook, replace the old number with a new one`
      ) && updateNo(findPerson, newperson);
      setNewName("");
      setNewNumber("");
      return;
    } else {
      personService.create(newperson).then((res) => {
        setPersons(persons.concat(res));
        setNewName("");
        setNewNumber("");
      });
    }
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
          setNewName(e.target.value.trim());
        }}
        keychange2={(e) => {
          setNewNumber(e.target.value.trim());
        }}
      />

      <h3>Numbers</h3>
      <ul>
        <Persons
          filterDisplay={filterDisplay}
          setPersons={setPersons}
          persons={persons}
        />
      </ul>
    </div>
  );
}

export default App;
