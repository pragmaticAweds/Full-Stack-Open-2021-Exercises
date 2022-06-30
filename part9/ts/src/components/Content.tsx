import { assertNever, CoursePart } from "../type";

const Content = ({ content }: { content: CoursePart[] }) => {
  console.log(content);
  return (
    <div>
      {content.map((part, i) => {
        switch (part.type) {
          case "normal":
            return (
              <div key={`id_${i}`}>
                <strong>
                  {part.name} {part.exerciseCount}
                </strong>
                <p>{part.description}</p>
              </div>
            );
          case "groupProject":
            return (
              <div key={`id_${i}`}>
                <strong>
                  {part.name} {part.exerciseCount}
                </strong>
                <p> Number of exercises {part.groupProjectCount}</p>
              </div>
            );
          case "submission":
            return (
              <div key={`id_${i}`}>
                <strong>
                  {part.name} {part.exerciseCount}
                </strong>
                <p>{part.description}</p>
                <p>submit to {part.exerciseSubmissionLink}</p>
              </div>
            );
          case "special":
            return (
              <div key={`id_${i}`}>
                <strong>
                  {part.name} {part.exerciseCount}
                </strong>
                <p>{part.description}</p>
                <p>
                  required skills:
                  {part.requirements.map((single) => (
                    <span key={single}> {single}</span>
                  ))}
                </p>
              </div>
            );

          default:
            assertNever(part);
            break;
        }
      })}
    </div>
  );
};

export default Content;
