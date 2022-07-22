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

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  const fetchData = async () => {
    const req = await axios(baseUrl);
    const res = await req.data;
    setResources(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const create = async (resource) => {
    const obj = { ...resource };
    const req = await axios.post(baseUrl, obj);
    const res = await req.data;
    setResources([...resources, res]);
  };

  const service = {
    create,
  };

  return [resources, service];
};
