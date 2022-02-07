import React from "react";

const ErrorNotifier = ({ msg }) => {
  return (
    <p style={styles.notify} className="error">
      {msg}
    </p>
  );
};

const styles = {
  notify: {
    padding: "14px",
    background: "lightgrey",
    border: "4px solid red",
    borderRadius: "0.5rem",
    color: "red",
    fontSize: "20px",
  },
};

export default ErrorNotifier;
