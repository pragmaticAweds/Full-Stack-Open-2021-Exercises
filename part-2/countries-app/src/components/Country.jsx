const Country = ({ weather, country }) => {
  const {
    name: { common },
    population,
    capital,
    flags: { png },
    languages,
  } = country;

  const { temperature } = weather;

  const lang = Object.values(languages).map((language, langIndex) => (
    <li key={langIndex}>{language}</li>
  ));

  return (
    <div>
      <h1>{common}</h1>
      <p>
        {" "}
        <b>Capital:</b> {capital}
      </p>
      <p>
        {" "}
        <b>Population:</b> {population}
      </p>
      <img src={png} alt="flags" />
      <ul>{lang}</ul>
      <p>
        <b>Temperature</b> {temperature}
      </p>
    </div>
  );
};

export default Country;
