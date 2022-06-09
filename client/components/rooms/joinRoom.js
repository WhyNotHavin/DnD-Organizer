import React, { useState } from "react";
import { Link } from "react-router-dom";
const JoinRoom = () => {
  const [room, setRoom] = useState({
    room: "",
  });

  const handleChange = (evt) => {
    setRoom({
      ...room,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    //Go to new Room
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Create or join a room!</label>
        <input name="room" onChange={handleChange} value={room.name} />
      </div>
      <div>
        <button type="submit">Submit</button>
        <Link to="/">Cancel</Link>
      </div>
    </form>
  );
};

export default JoinRoom;
