import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

import SongList from "./components/SongList";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: ""
});

const client = new ApolloClient({
  cache,
  link
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Route exact path="/" render={props => <SongList {...props} />} />
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
