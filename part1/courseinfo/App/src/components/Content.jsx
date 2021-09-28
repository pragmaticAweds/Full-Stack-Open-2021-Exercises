import React from "react";
import Parts from "./Parts";

function Content(props) {
  return (
    <div>
      <Parts part={props.part[0].name} exercise={props.part[0].exercises} />
      <Parts part={props.part[1].name} exercise={props.part[1].exercises} />
      <Parts part={props.part[2].name} exercise={props.part[2].exercises} />
    </div>
  );
}

export default Content;
