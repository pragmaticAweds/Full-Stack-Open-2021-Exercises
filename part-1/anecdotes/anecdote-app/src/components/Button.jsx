import React from "react";

function Button({ click, text }) {
  return <button onClick={click}>{text}</button>;
}

export default Button;
