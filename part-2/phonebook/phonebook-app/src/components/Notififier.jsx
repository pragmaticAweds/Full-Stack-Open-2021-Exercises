import React from "react";

const Notififier = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="Notifier">{message}</div>;
};

export default Notififier;
