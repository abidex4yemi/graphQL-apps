import React, { useState } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const AddLyric = props => {
  const [lyric, setLyric] = useState({ content: "" });

  const handleInputChange = evt => {
    setLyric({ [evt.target.name]: evt.target.value });
  };

  const handleOnSubmit = evt => {
    evt.preventDefault();
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div>
        <label htmlFor="add-lyric">Add a lyric</label>
        <input
          type="text"
          name="content"
          value={lyric.content}
          id="add-lyric"
          onChange={handleInputChange}
        />
      </div>
      <button
        className="btn waves-effect waves-light right"
        type="submit"
        name="action"
      >
        Add
      </button>
    </form>
  );
};

const mutation = gql`
  mutation AddLyricToSong($songId: ID, $content: String) {
    addLyricToSong(songId: $songId, content: $content) {
      id
      content
    }
  }
`;

export default graphql(mutation)(AddLyric);
