import React, { useState } from "react";
const JoinRoom = () => {
  const [room, setRoom] = useState({
    room: "",
  });

  const handleChange = (evt) => {
    setFilters({
      ...filter,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    //Go to new Room
  };

  return (
    <div>
      <form onSubmit={handleSubmit}></form>
    </div>
  );
};
