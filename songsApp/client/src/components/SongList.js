import React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

const SongList = props => {
  console.log(props);
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
        <div className="col s4">
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
        </div>
      </div>
    </div>
  );
};

const query = gql`
  {
    songs {
      title
      id
    }
  }
`;

export default graphql(query)(SongList);
