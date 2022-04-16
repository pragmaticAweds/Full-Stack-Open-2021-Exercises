const { ApolloServer, UserInputError } = require("apollo-server");
const mongoose = require("mongoose");

const { v1: uuid } = require("uuid");

const { URI } = require("./utils/config");

let { authors, books } = require("./data");
const { typeDefs } = require("./type-defs");
/*
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 */

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allAuthors: () => authors,
    allBooks: (root, args) => {
      if (args.author) {
        return books.filter((book) => book.author === args.author);
      }

      if (args.genre) {
        return books.filter((book) => book.genres.includes(args.genre));
      }

      if (args.author && args.genre) {
        return books.filter(
          (book) =>
            book.genres.includes(args.genre) && book.author === args.author
        );
      }
      return books;
    },
  },

  Author: {
    bookCount: (root) => {
      const authorBook = books.filter((book) => book.author === root.name);
      return authorBook.length;
    },
  },

  Mutation: {
    addBook: (root, args) => {
      const book = { ...args, id: uuid() };
      books = books.concat(book);
      const author = authors.find(
        (a) => a.name.toLowerCase() === args.author.toLowerCase()
      );
      if (!author) {
        authors = authors.concat({ name: args.author, born: null, id: uuid() });
      }
      return book;
    },

    editAuthor: (root, args) => {
      const isAuthor = authors.find((a) => a.name === args.name);
      if (!isAuthor) {
        return null;
      }
      const author = { ...isAuthor, born: args.setBornTo };
      authors = authors.map((a) => (a.name === args.name ? author : a));
      return author;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
