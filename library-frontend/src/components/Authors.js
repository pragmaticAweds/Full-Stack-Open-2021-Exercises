import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { ALL_AUTHORS, EDIT_YEAR } from "../query";

const Authors = (props) => {
  const [name, setName] = useState("");
  const [setBornTo, setBorn] = useState("");
  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 2000,
  });

  const [editAuthor] = useMutation(EDIT_YEAR);

  const handleYear = (e) => {
    e.preventDefault();

    editAuthor({ variables: { name, setBornTo } });

    setName(" ");
    setBorn(" ");
  };

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>please wait... while we fetch your data</div>;
  }

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
          {result.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={handleYear}>
          name:{" "}
          {/* <input
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />{" "} */}
          <select
            name="authors"
            value={name}
            onChange={({ target }) => setName(target.value)}
          >
            <option defaultValue="">select an author name</option>
            {result.data.allAuthors.map((a) => (
              <option value={a.name} key={a.name}>
                {a.name}
              </option>
            ))}
          </select>
          <br />
          born:{" "}
          <input
            type="text"
            value={setBornTo}
            onChange={({ target }) => setBorn(Number(target.value))}
          />{" "}
          <br />
          <button>update author</button>
        </form>
      </div>
    </div>
  );
};

export default Authors;
