import React from "react";

function Parts(props) {
  return (
    <div>
      <p>
        {props.part} {props.exercise}
      </p>
    </div>
  );
}

export default Parts;
