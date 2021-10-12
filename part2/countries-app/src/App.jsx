import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState({});
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios("https://restcountries.com/v3.1/all")
      .then(({ data }) => setCountries(data))
      .catch(console.error);
  }, []);

  const getWeather = ({ name: { common } }) => {
    axios("http://api.weatherstack.com/current", {
      params: {
        query: common,
        access_key: "5387861e6aa81b179334b5fd5bc2ff73",
      },
    })
      .then(({ data }) => {
        console.log({ ww: data });
        setWeather(data.current ? data.current : {});
      })
      .catch((err) => console.log(err));
  };

  //console.log(getWeather);

  // console.log(weather("Nigeria"));

  const filteredCountry = query
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(query)
      )
    : countries;

  useEffect(() => {
    console.log("called");
    if (filteredCountry.length === 1) {
      getWeather(filteredCountry[0]);
    }
  }, [query]);

  //console.log(filteredCountry);

  const output = !query ? (
    ""
  ) : filteredCountry.length > 10 ? (
    <p>be specific</p>
  ) : filteredCountry.length === 1 ? (
    (() => {
      // weather(filteredCountry[0].name.common);
    },
    console.log(filteredCountry[0]),
    (
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
        <p>Temperature {filteredCountry[0].temperature}</p>
      </div>
    ))
  ) : (
    filteredCountry.map(({ name: { common } }) => (
      <div key={common}>
        <span>{common}</span>{" "}
        <button
          onClick={() => {
            weather(common);
          }}
        >
          {" "}
          show
        </button>
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
