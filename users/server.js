const express = require("express");
const expressGraphQL = require("express-graphql");
const schema = require("./schema/schema");

const app = express();

// Quick note: graphiql is meant to be use on dev environment
app.use(
  "/graphql",
  expressGraphQL({
    graphiql: true,
    schema
  })
);

app.listen(2019, console.log("App listening on port: 2019"));
