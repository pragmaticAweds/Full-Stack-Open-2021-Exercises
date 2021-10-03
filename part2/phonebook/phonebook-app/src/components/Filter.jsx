import React from "react";

const Filter = ({ value, keyvalue }) => (
  <div>
    <span>filter shown with</span>{" "}
    <input type="text" value={value} onChange={keyvalue} />
  </div>
);

export default Filter;
