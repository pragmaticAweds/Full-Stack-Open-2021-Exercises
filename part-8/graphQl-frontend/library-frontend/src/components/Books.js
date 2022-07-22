import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ALL_BOOKS } from "../Schema/queries";

const Books = (props) => {
  const [filter, setFilter] = useState("");
  const { data, loading, refetch } = useQuery(ALL_BOOKS, {
    variables: { genre: filter },
  });

  const filterBtnType = useQuery(ALL_BOOKS);

  useEffect(() => {
    refetch();
  }, [filter]);

  if (!props.show) {
    return null;
  }

  if (loading) {
    return <h1>Loading</h1>;
  }

  const genres = filterBtnType.data.allBooks.map((book) => book.genres).flat(5);

  const genreSet = [...new Set(genres)];

  // const filterGenre = filter
  //   ? data.allBooks.filter((book) => {
  //       if (book.genres.includes(filter))
  //         return book;

  //     })
  //   : data.allBooks;

  // console.log({ filterGenre });
  return (
    <div>
      <h2>books</h2>
      {filter && (
        <p>
          in genre <strong>{filter.toUpperCase()}</strong>
        </p>
      )}
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
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genreSet.map((genre) => (
          <button key={`key_${genre}`} onClick={() => setFilter(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setFilter("")}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
