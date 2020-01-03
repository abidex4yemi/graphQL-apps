const graphql = require("graphql");
const RootQueryType = require("./types/RootQueryType");
const mutation = require("./mutations");

const { GraphQLSchema } = graphql;

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation
});
