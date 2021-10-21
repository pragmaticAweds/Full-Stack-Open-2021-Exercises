import React from "react";

const Errormsg = ({ error }) => {
  if (error === null) return null;

  return <div className="Errormsg">{error}</div>;
};

export default Errormsg;
