import React from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";

import fetchSongQuery from "../queries/fetchSongs";

const SongList = props => {
  const renderSongs = () => {
    return props.data.songs.map(song => (
      <li className="collection-item" key={song.id}>
        {song.title}
      </li>
    ));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s6">
          {props.data.loading ? (
            <div>Loading</div>
          ) : (
            <ul className="collection with-header">
              <li className="collection-header">
                <h4>Songs</h4>
              </li>
              {renderSongs()}
            </ul>
          )}
          <br />
          <Link to="/songs/new" className="btn-floating btn-large red right">
            <i className="material-icons">add</i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default graphql(fetchSongQuery)(SongList);
