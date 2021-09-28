import React from "react";

function Total(props) {
  return (
    <div>
      <p>
        {props.part[0].exercises +
          props.part[1].exercises +
          props.part[2].exercises}
      </p>
    </div>
  );
}

export default Total;
