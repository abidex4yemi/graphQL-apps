import React, { useState } from "react";

const AddSong = () => {
  const [songTitle, setSongTitle] = useState("");

  const handleInputChange = evt => {
    setSongTitle(evt.target.value);
  };

  const handleOnSubmit = evt => {
    evt.preventDefault();
  };

  return (
    <div className="container">
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
      </form>
    </div>
  );
};

export default AddSong;
