const { UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const Author = require("./author-model");
const Book = require("./book-model");
const User = require("./user-model");
const { subscribe } = require("graphql");

const password = process.env.PASSWORD;
const secret_key = process.env.SECRET_KEY;

module.exports.resolvers = {
  Query: {
    allBooks: async (_, args) => {
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        const id = author["_id"];
        const book = await Book.find({ author: { $in: [id] } }).populate(
          "author"
        );
        return book;
      }

      if (args.genre) {
        const genreArg = args.genre;
        const booksGenre = await Book.find({
          genres: { $in: [genreArg] },
        }).populate("author");
        return booksGenre;
      }

      return Book.find({}).populate("author");
    },
    allAuthors: async () => Author.find({}),
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: () => authors.collection.countDocuments(),
    me: async (root, args, { currentUser }) => {
      return currentUser;
    },
  },

  Author: {
    bookCount: async (root) => {
      const books = await Book.find({}).populate("author");
      return books.filter((book) => book.author.name === root.name).length;
    },
  },
  Mutation: {
    addBook: async (_, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("Authentication Required");
      }

      const existingBook = await Book.findOne({ title: args.title });

      if (existingBook) {
        throw new UserInputError("Book Already exists");
      }

      let book;

      if (args.title.length < 4) {
        throw new UserInputError("title is too short", () => {
          invalidArgs: args.title;
        });
      }

      if (args.author.length < 4) {
        throw new UserInputError("author is too short", () => {
          invalidArgs: args.author;
        });
      }

      const authorIsExist = await Author.findOne({ name: args.author });

      if (!authorIsExist) {
        try {
          await new Author({ name: args.author }).save();
        } catch (error) {
          throw new UserInputError(error.message);
        }
      }

      const authorToSave = await Author.findOne({ name: args.author });

      book = new Book({ ...args, author: authorToSave });

      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message);
      }

      pubsub.publish("BOOK_ADDED", { bookAdded: book });

      return book;
    },

    editAuthor: async (_, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("Authentication Required");
      }

      const authorToUpdate = await Author.findOne({ name: args.name });

      if (!authorToUpdate) {
        throw new UserInputError("User does not Exist");
      }

      try {
        authorToUpdate.born = args.setBornTo;
        await authorToUpdate.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return authorToUpdate;
    },

    createUser: async (_, args) => {
      try {
        const newUser = await new User({ ...args }).save();
        return newUser;
      } catch (error) {
        throw new UserInputError(error.message);
      }
    },

    login: async (_, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== password) {
        throw new UserInputError("Wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, secret_key) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};
