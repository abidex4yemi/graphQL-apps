import React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const LyricList = props => {
  const handleLike = (id, likes) => {
    props.mutate({
      variables: {
        id
      },
      optimisticResponse: {
        __typename: "Mutation",
        likeLyric: {
          id,
          __typename: "LyricType",
          likes: likes + 1
        }
      }
    });
  };

  const renderLyrics = () => {
    if (!props.lyrics.length) {
      return <div>No lyric yet</div>;
    }

    return props.lyrics.map(({ content, id, likes }) => (
      <li className="collection-item" key={id}>
        {content}
        <small className="right"> {likes}</small>
        <i
          className="material-icons right"
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => handleLike(id, likes)}
        >
          thumb_up
        </i>
      </li>
    ));
  };
  return (
    <ul className="collection with-header">
      <li className="collection-header">
        <h5>Lyrics</h5>
      </li>
      {renderLyrics()}
    </ul>
  );
};

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);
