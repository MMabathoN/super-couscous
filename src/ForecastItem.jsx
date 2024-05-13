import React from "react";

const ForecastItem = ({ day }) => {
  return (
    <div className="forecast-item">
      <h3>{day.date}</h3>
      <p>Temperature: {day.temperature}</p>
      <p>Description: {day.description}</p>
      <p>icon: {day.icon}</p>
    </div>
  );
};

export default ForecastItem;
