import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios("https://restcountries.com/v3.1/all")
      .then(({ data }) => setCountries(data))
      .catch(console.error);
  }, []);

  const filteredCountry = query
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(query)
      )
    : countries;

  console.log(filteredCountry);

  const output = !query ? (
    ""
  ) : filteredCountry.length > 10 ? (
    <p>be specific</p>
  ) : filteredCountry.length === 1 ? (
    <div key={filteredCountry[0].flag}>
      <h1>{filteredCountry[0].name.common}</h1>
      <p>Capital: {filteredCountry[0].capital}</p>
      <p>Population: {filteredCountry[0].population}</p>
      <img src={filteredCountry[0].flags.png} alt="flag" />
      <ul>
        {Object.values(filteredCountry[0].languages).map(
          (language, langIndex) => (
            <li key={langIndex}>{language}</li>
          )
        )}
      </ul>
    </div>
  ) : (
    filteredCountry.map(({ name: { common } }) => (
      <div key={common}>
        <p>{common}</p>
      </div>
    ))
  );

  return (
    <div className="App">
      <form>
        <span>Find Country</span>{" "}
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value.trim());
          }}
        />
      </form>
      <div>{output}</div>
    </div>
  );
}

export default App;
