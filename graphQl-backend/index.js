const { ApolloServer } = require("apollo-server");

const { typeDefs } = require("./schema/models");
const { resolvers } = require("./schema/resolvers");

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`Server ready at port:: ${url}`));
