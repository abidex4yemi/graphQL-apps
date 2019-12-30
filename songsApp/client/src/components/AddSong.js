import React, { useState } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";

import fetchSongQuery from "../queries/fetchSongs";

const AddSong = props => {
  const [songTitle, setSongTitle] = useState("");

  const handleInputChange = evt => {
    setSongTitle(evt.target.value);
  };

  const handleOnSubmit = evt => {
    evt.preventDefault();
    props
      .mutate({
        variables: {
          title: songTitle
        },
        refetchQueries: [
          {
            query: fetchSongQuery
          }
        ]
      })
      .then(res => props.history.push("/"));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s6">
          <br />
          <Link to="/">Back</Link>
          <h3>Add new song</h3>
          <form onSubmit={handleOnSubmit}>
            <div>
              <label>Song title:</label>
              <input
                type="text"
                name="title"
                value={songTitle}
                onChange={handleInputChange}
              />
            </div>

            <button
              className="btn waves-effect waves-light right"
              type="submit"
              name="action"
              onSubmit={handleOnSubmit}
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export default graphql(mutation)(AddSong);
