import React from "react";
import { connect } from "react-redux";
import { filterContent } from "../reducers/filterReducer";

const Filter = ({ filterContent }) => {
  const handleChange = (e) => {
    const filterEvent = e.target.value;
    filterContent(filterEvent);
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

export default connect(null, { filterContent })(Filter);
