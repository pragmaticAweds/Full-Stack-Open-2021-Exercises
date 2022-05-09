const { ApolloServer } = require("apollo-server");
require("dotenv").config();

const User = require("./schema/user-model");

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const uri = process.env.db_key;
const secery_key = process.env.SECRET_KEY;

const { typeDefs } = require("./schema/models");
const { resolvers } = require("./schema/resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), secery_key);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected to database successfully"))
  .catch((err) => console.log(err));

server.listen().then(({ url }) => console.log(`Server ready at port:: ${url}`));
