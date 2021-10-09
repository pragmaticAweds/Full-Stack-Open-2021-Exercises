import React, { useState } from "react";

function CountryDisplay({ content, handleDisplay }) {
  return (
    <div>
      {content.length === 1 ? (
        content.map(
          (
            {
              name: { common },
              flags: { png },
              capital,
              population,
              languages,
            },
            index
          ) => (
            <div key={`countryIndex = ${index}`}>
              <h1>{common}</h1>
              <p> Capital {capital} </p>
              <p> Population {population}</p>

              <h2>languages</h2>
              <ul>
                {Object.values(languages).map((language) => (
                  <li>{language}</li>
                ))}
              </ul>
              <img src={png} alt="" />
            </div>
          )
        )
      ) : content.length < 10 ? (
        content.map((country, index) => {
          return (
            <div>
              {" "}
              <span key={`countryIndex = ${index}`}>
                {country.name.common}
              </span>{" "}
              {""}
              <button onClick={() => handleDisplay(country)}>show</button>
            </div>
          );
        })
      ) : (
        <p> Too many matches, specify another filter</p>
      )}
    </div>
  );
}

export default CountryDisplay;
