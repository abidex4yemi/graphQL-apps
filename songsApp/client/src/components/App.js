import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import SongList from "./SongList";
import AddSong from "./AddSong";

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={SongList} />
      <Route exact path="/songs/new" component={AddSong} />
    </Router>
  );
};

export default App;
