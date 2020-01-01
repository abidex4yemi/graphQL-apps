import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SongList from "./SongList";
import AddSong from "./AddSong";
import SongDetail from "./SongDetail";

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={SongList} />

      <Route
        path="/songs"
        render={({ match: { path } }) => (
          <Switch>
            <Route exact path={`${path}/new`} component={AddSong} />
            <Route exact path={`${path}/:id`} component={SongDetail} />
          </Switch>
        )}
      />
    </Router>
  );
};

export default App;
