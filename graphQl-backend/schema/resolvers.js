const _ = require("lodash");
const { v4: uuidv4 } = require("uuid");
let { books, authors } = require("../data");

module.exports.resolvers = {
  Query: {
    allBooks: (_, args) => {
      const author = args.author;
      const genre = args.genre;
      return author
        ? books.filter((book) => book.author === author)
        : genre
        ? books.filter((book) => book.genres.includes(genre))
        : genre && author
        ? books.find(
            (book) => book.genres.includes(genre) && book.author === author
          )
        : books;
    },
    allAuthors: () => authors,
    bookCount: () => books.length,
    authorCount: () => authors.length,
  },

  Author: {
    bookCount: (root) =>
      books.filter((book) => book.author === root.name).length,
  },
  Mutation: {
    addBook: (_, args) => {
      const book = { ...args, id: uuidv4() };
      const author = authors.find(
        (author) => author.name.toLowerCase() === args.author.toLowerCase()
      );

      if (!author) {
        authors = authors.concat({
          name: args.author,
          born: null,
          id: uuidv4(),
        });
      }

      books = books.concat(book);
      return book;
    },

    editAuthor: (_, args) => {
      const foundAuthor = authors.find(
        (author) => author.name.toLowerCase() === args.name.toLowerCase()
      );

      if (!foundAuthor) {
        return null;
      }

      const editedAuthor = { ...foundAuthor, born: args.setBornTo };

      authors = authors.map((author) =>
        author.id === editedAuthor.id ? editedAuthor : author
      );

      return editedAuthor;
    },
  },
};
