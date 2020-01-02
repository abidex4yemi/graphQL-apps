const graphql = require("graphql");
const RootQueryType = require("./types/RootQueryType");
const mutation = require("./mutations");

const { GraphQLInputObjectType } = graphql;

module.exports = new GraphQLInputObjectType({
  query: RootQueryType,
  mutation
});
