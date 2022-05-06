import { useMutation } from "@apollo/client";
import { useState } from "react";
import { NEW_BOOK } from "../Schema/queries";

const NewBook = (props) => {
  const [err, setErr] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [newBook, { error }] = useMutation(NEW_BOOK, {
    onError: (error) => {
      setErr(error.graphQLErrors[0].path?.join(". "));
    },
  });

  if (!props.show) {
    return null;
  }
  if (error) {
    console.log({ err });
  }

  const submit = async (event) => {
    event.preventDefault();
    newBook({ variables: { title, author, published, genres } });
    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  // if (err) {
  //   setTimeout(() => {
  //     setErr("");
  //   }, 4000);
  // }
  console.log(err);

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <p style={{ color: "red" }}>error: {err}</p>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
