import { useState, useEffect } from "react";
import axios from "axios";

export const useField = (type) => {
  const [value, setValue] = useState("");
  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  const fetchCountry = async () => {
    const req = await axios(
      `https://restcountries.com/v3.1/name/${name}?fullText=true`
    );
    const res = await req.data;
    setCountry(res[0]);
  };

  useEffect(() => {
    fetchCountry();
  }, [name]);
  return country;
};
