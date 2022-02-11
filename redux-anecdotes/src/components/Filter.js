import React from "react";
import { useDispatch } from "react-redux";
import { filterContent } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const filterEvent = e.target.value;
    dispatch(filterContent(filterEvent));
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input name="filtering" onChange={(e) => handleChange(e)} />
    </div>
  );
};

export default Filter;
