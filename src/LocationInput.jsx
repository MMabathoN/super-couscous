import React, { useState } from "react";

const LocationInput = ({ onSubmit }) => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (latitude && longitude) {
      onSubmit(latitude, longitude);
    } else {
      // Handle invalid input
    }
  };

  return (
    <form id="Gps" onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Latitude"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
      />
      <input
        type="number"
        placeholder="Longitude"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default LocationInput;
