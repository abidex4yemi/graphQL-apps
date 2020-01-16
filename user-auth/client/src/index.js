import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { BrowserRouter as Router, Route } from "react-router-dom";

import App from "./components/App";
import Login from "./components/login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import requireAuth from "./components/HOC/requireAuth";

const cache = new InMemoryCache();

const link = new HttpLink({
  uri: "http://localhost:5000/graphql",
  credentials: "include"
});

const client = new ApolloClient({
  cache,
  link,
  dataIdFromObject: o => o.id
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <Route path="/" component={App} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/dashboard" component={requireAuth(Dashboard)} />
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
