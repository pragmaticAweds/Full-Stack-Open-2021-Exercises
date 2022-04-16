const { ApolloServer, UserInputError } = require("apollo-server");
const mongoose = require("mongoose");

const { v1: uuid } = require("uuid");

const { URI } = require("./utils/config");

let { authors, books } = require("./data");
const Book = require("./model/book.model");
const Author = require("./model/author.model");

const { typeDefs } = require("./type-defs");

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to mongoose successfully");
  })
  .catch((err) => {
    console.log("error connecting to mongodb", err.message);
  });

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async () => Author.find({}),
    allBooks: async (root, args) => {
      return Book.find({});

      // if (args.author) {
      //   return books.filter((book) => book.author === args.author);
      // }
      // if (args.genre) {
      //   return books.filter((book) => book.genres.includes(args.genre));
      // }
      // if (args.author && args.genre) {
      //   return books.filter(
      //     (book) =>
      //       book.genres.includes(args.genre) && book.author === args.author
      //   );
      // }
      // return books;
    },
  },

  // Author: {
  //   bookCount: (root) => {
  //     const authorBook = books.filter((book) => book.author === root.name);
  //     return authorBook.length;
  //   },
  // },

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
