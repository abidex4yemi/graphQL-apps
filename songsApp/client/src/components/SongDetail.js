import React from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";

import fetchSongQuery from "../queries/fetchSong";
import AddLyric from "./AddLyric";

const SongDetail = props => {
  const { song } = props.data;

  const renderSongDetails = () => {
    if (props.data.loading) {
      return <div>Loading song detail...</div>;
    } else if (!props.data.song) {
      return <div>No song with the provided ID</div>;
    }

    return (
      <div>
        <h3>Song Detail</h3>
        <h4>Title: {song.title}</h4>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s6">
          <br />
          <Link to="/">Back</Link>
          {renderSongDetails()}
        </div>
        <div className="col s6">
          <AddLyric />
        </div>
      </div>
    </div>
  );
};

export default graphql(fetchSongQuery, {
  options: props => ({
    variables: {
      id: props.match.params.id
    }
  })
})(SongDetail);
