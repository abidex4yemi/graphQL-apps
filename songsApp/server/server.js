const express = require("express");
const expressGraphQL = require("express-graphql");
const bodyParser = require("body-parser");
const webpack = require("webpack");
const webpackMiddleware = require("webpack-dev-middleware");
const webpackConfig = require("../webpack.config");

const { connectDB } = require("./models");

const schema = require("./schema");

connectDB();

const app = express();
app.use(bodyParser.json());

app.use(
  "/graphql",
  expressGraphQL({
    graphiql: true,
    schema
  })
);

app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
