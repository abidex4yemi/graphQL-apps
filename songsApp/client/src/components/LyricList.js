import React from "react";

const LyricList = props => {
  const renderLyrics = () => {
    if (!props.lyrics.length) {
      return <div>No lyric yet</div>;
    }

    return props.lyrics.map(({ content, id }) => (
      <li className="collection-item" key={id}>
        {content}
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

export default LyricList;
