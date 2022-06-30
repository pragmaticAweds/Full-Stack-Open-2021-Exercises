interface TotalProps {
  content: Array<{ name?: string; exerciseCount: number }>;
}
const Total = ({ content }: TotalProps) => {
  return (
    <p>
      Number of exercises{" "}
      {content.reduce((acc, { exerciseCount }) => acc + exerciseCount, 0)}
    </p>
  );
};

export default Total;
