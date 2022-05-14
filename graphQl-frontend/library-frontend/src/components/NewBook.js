import { useMutation } from "@apollo/client";
import { useState } from "react";
import { updateCache } from "../helper-function";
import { ALL_BOOKS, NEW_BOOK } from "../Schema/queries";

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState(0);
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [newBook] = useMutation(NEW_BOOK, {
    onError: (error) => {
      props.err(error.message);

      setTimeout(() => {
        props.err("");
      }, 4000);
    },

    update: (cache, res) => {
      updateCache(cache, { query: ALL_BOOKS }, res.data.addBook);
    },
  });

  if (!props.show) {
    return null;
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

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
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
            onChange={({ target }) => setPublished(Number(target.value))}
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
