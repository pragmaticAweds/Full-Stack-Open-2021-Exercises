import React, { useState } from "react";
function App() {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addperson = (event) => {
    event.preventDefault();
    const newperson = {
      name: newName,
    };

    setPersons(newName === "" ? persons : persons.concat(newperson));
    setNewName("");
  };
  const addname = (event) => {
    setNewName(event.target.value);
  };

  console.log(persons);

  const displayName = persons.map((person) => (
    <p key={person.name}>{person.name}</p>
  ));

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addperson}>
        <div>
          name: <input value={newName} onChange={addname} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <div>
        <h2>Numbers</h2>
        {displayName}
      </div>
    </div>
  );
}

export default App;
