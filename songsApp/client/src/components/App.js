import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import SongList from "./SongList";
import AddSong from "./AddSong";
import SongDetail from "./SongDetail";

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={SongList} />
      <Route exact path="/songs/new" component={AddSong} />
      <Route exact path="/songs/:id" component={SongDetail} />
    </Router>
  );
};

export default App;
