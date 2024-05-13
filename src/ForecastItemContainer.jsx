import React from "react";
import ForecastItem from "./ForecastItem";

const ForecastItemContainer = ({ forecastData }) => {
  return (
    <div className="forecast-item-container">
      {forecastData.map((item, index) => (
        <ForecastItem key={index} forecast={item} />
      ))}
    </div>
  );
};

export default ForecastItemContainer;
