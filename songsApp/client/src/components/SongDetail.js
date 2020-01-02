import React from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";

import fetchSongQuery from "../queries/fetchSong";
import AddLyric from "./AddLyric";
import LyricList from "./LyricList";

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
        <h5>Title: {song.title}</h5>
        <LyricList lyrics={song.lyrics} />
      </div>
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s6">
          <br />
          <br />
          <Link to="/">Back</Link>
          {renderSongDetails()}
        </div>
        <div className="col s6">
          <br />
          <br />
          <AddLyric songId={props.match.params.id} />
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
