const { UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

const Author = require("./author-model");
const Book = require("./book-model");
const User = require("./user-model");

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
      return Book.find({}).populate("author");
    },
    allAuthors: async () => Author.find({}),
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: () => authors.collection.countDocuments(),
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

      const findAuthor = await Author.findOne({ name: args.author });

      if (findAuthor) {
        book = await new Book({ ...args, author: findAuthor }).save();
        return book;
      }

      const newAuthor = await new Author({ name: args.author }).save();

      book = await new Book({ ...args, author: newAuthor.name }).save();

      return book;
    },

    editAuthor: async (_, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("Authentication Required");
      }

      const authorToUpdate = await Author.findOne({ name: args.name });

      console.log(args.name);
      console.log({ authorToUpdate });

      if (!authorToUpdate) {
        throw new UserInputError("User does not Exist");
      }

      try {
        authorToUpdate.born = args.setBornTo;
        authorToUpdate.save();
        return authorToUpdate;
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
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
};
