import { useState, useEffect } from "react";
import axios from "axios";
import Country from "./components/Country";

function App() {
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState({});
  const [query, setQuery] = useState("");
  const [country, setcountry] = useState({
    toggle: false,
    data: {},
  });

  useEffect(() => {
    axios("https://restcountries.com/v3.1/all")
      .then(({ data }) => setCountries(data))
      .catch(console.error);
  }, []);

  const getWeather = ({ name: { common } }) => {
    axios(
      `http://api.weatherstack.com/current?query=${common}&access_key=26e834681363492ae04791fa10f8b6b8`
    )
      .then(({ data }) => {
        setWeather(data.current ? data.current : {});
      })
      .catch((err) => console.log(err));
  };

  const filteredCountry = query
    ? countries.filter((country) =>
        country.name.common.toLowerCase().includes(query)
      )
    : countries;

  useEffect(() => {
    if (filteredCountry.length === 1) {
      getWeather(filteredCountry[0]);
    }
    return;
    console.log("called");
  }, [query]);

  useEffect(() => {
    if (country.toggle === true) {
      getWeather(country.data);
    }
    return;
  }, [country.toggle]);

  const output = !query ? (
    ""
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
      <p>
        <b>Temperature:</b> {weather.temperature} Celcius
      </p>
      <img src={weather.weather_icons} alt="" />
      <p>
        <b>Wind:</b> {weather.wind_speed} mph direction {weather.wind_dir}
      </p>
    </div>
  ) : filteredCountry.length > 10 ? (
    <p>Too many search, specify with another filter</p>
  ) : (
    filteredCountry.map((country) => (
      <div key={country.flag}>
        <span>{country.name.common}</span>{" "}
        <button
          onClick={() => {
            setcountry({ toggle: true, data: country });
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
            setcountry({ toggle: false });
          }}
        />
      </form>
      <div>
        {country.toggle ? (
          <Country country={country.data} weather={weather} />
        ) : (
          output
        )}
      </div>
    </div>
  );
}

export default App;
