import { useState, useEffect } from "react";
import axios from "axios";
import CountryDisplay from "./components/CountryDisplay";
import OneCountry from "./components/OneCountry";

function App() {
  const [countries, setcountry] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({
    state: false,
    data: {},
  });

  const handleDisplay = (countryData) => {
    setSelectedCountry({ state: true, data: countryData });
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setcountry(response.data);
    });
  }, []);

  let searchQuery = search.trim()
    ? countries.filter((country) => {
        const {
          name: { common },
        } = country;
        const filterdisplay = common.toLowerCase().includes(search);
        return filterdisplay;
      })
    : [];

  console.log({ searchQuery });

  return (
    <div className="App">
      <div>
        find countries{" "}
        <input
          type="text"
          onChange={(e) => {
            if (selectedCountry.state)
              console.log("selected country true:", selectedCountry.state);
            setSelectedCountry({ ...selectedCountry, state: false });
            setSearch(e.target.value);
            console.log("selected country false:", selectedCountry.state);
          }}
        />
      </div>
      <div className="content">
        {selectedCountry.state ? (
          <OneCountry countryData={selectedCountry.data} />
        ) : (
          <CountryDisplay content={searchQuery} handleDisplay={handleDisplay} />
        )}
      </div>
    </div>
  );
}
export default App;
