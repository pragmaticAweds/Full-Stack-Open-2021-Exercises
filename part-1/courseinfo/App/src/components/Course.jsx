import React from "react";
import Content from "./Content";
function Course({ course }) {
  const courseMap = course.map((course) => (
    <Content key={course.id} name={course.name} parts={course.parts} />
  ));
  return (
    <div>
      <h1>Web development curriculum</h1>
      {courseMap}
    </div>
  );
}

export default Course;
