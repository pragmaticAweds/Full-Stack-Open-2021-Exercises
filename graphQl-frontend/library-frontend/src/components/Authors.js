import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../Schema/queries";

const Authors = (props) => {
  const { data, loading } = useQuery(ALL_AUTHORS, {
    onError: (error) => {
      console.log({ error });
      props.err(error.message);
    },
  });

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    update: (cache, res) => {
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        const editedBorn = res.data.editAuthor;
        return {
          allAuthors: allAuthors.map((author) => {
            return author.name === editedBorn.name ? editedBorn : author;
          }),
        };
      });
    },
  });

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
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>author name</th>
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
