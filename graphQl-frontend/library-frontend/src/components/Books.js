import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../Schema/queries";

const Books = (props) => {
  const { data, loading, refetch } = useQuery(ALL_BOOKS);

  if (!props.show) {
    return null;
  }
  refetch();
  if (loading) {
    return <h1>Loading</h1>;
  }
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
