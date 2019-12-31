import React from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";

import fetchSongQuery from "../queries/fetchSongs";
import gql from "graphql-tag";

const SongList = props => {
  const handleSongDelete = id => {
    props
      .mutate({
        variables: {
          id
        }
      })
      .then(res => props.data.refetch());
  };

  const renderSongs = () => {
    return props.data.songs.map(song => (
      <li className="collection-item" key={song.id}>
        {song.title}
        <i
          className="material-icons right"
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => handleSongDelete(song.id)}
        >
          delete
        </i>
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

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(graphql(fetchSongQuery)(SongList));
