import Part from "./Part";

interface ContentProps {
  content: Array<{ name: string; exerciseCount: number }>;
}

const Content = ({ content }: ContentProps) => {
  console.log(content);
  return (
    <div>
      {content.map(({ name, exerciseCount }, i) => (
        <Part key={`name_${i}`} name={name} exerciseCount={exerciseCount} />
      ))}
    </div>
  );
};

export default Content;
