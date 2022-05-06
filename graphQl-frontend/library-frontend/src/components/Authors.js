import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../Schema/queries";

const Authors = (props) => {
  const { data, loading, refetch } = useQuery(ALL_AUTHORS);
  const [editAuthor] = useMutation(EDIT_AUTHOR);

  if (!props.show) {
    return null;
  }

  if (loading) {
    return <h1>Loading</h1>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const author = e.target.name.value;
    const born = Number(e.target.born.value);

    editAuthor({ variables: { name: author, setBornTo: born } });

    e.target.born.value = "";

    refetch();
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>set Author</h2>
        <form onSubmit={handleSubmit}>
          author:{" "}
          <select name="name">
            <option>Select your value</option>
            {data.allAuthors.map((author) => (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
          <br />
          born: <input type="number" name="born" /> <br />
          <button>submit</button>
        </form>
      </div>
    </div>
  );
};

export default Authors;
