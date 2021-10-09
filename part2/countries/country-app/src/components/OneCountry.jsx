import React from "react";

const OneCountry = ({ countryData }) => {
  const {
    name: { common },
  } = countryData;
  console.log("common", common);
  return <div>{common}</div>;
};

export default OneCountry;
