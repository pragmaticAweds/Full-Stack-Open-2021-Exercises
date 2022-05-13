import { useQuery } from "@apollo/client";
import React from "react";
import { ALL_BOOKS, USER } from "../Schema/queries";

const Recommend = ({ show }) => {
  const result = useQuery(USER);
  const { data, loading } = useQuery(ALL_BOOKS);
  if (!show) {
    return null;
  }
  if (loading) {
    return <h1>...Loading</h1>;
  }

  const favorite = result.data.me.favoriteGenre;
  const filteredDatas = data.allBooks.filter((dat) =>
    dat.genres.includes(favorite)
  );

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favourite genre <strong>{favorite}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredDatas.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommend;
