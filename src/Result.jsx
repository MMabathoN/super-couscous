import React from "react";

// Fu
const formatSunriseSunset = (timestamp) => {
  if (!timestamp) return "";
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const Result = ({ weatherData }) => {
  if (!weatherData) {
    return null;
  }

  const { weather, main, wind, sys } = weatherData;

  return (
    <div id="weather-result" className="weather-result-large">
      <h2>{weather && weather.length > 0 && weather[0].description}</h2>
      <p>Temperature: {main && main.temp}°C</p>
      <p>Feels Like: {main && main.feels_like}°C</p>
      <p>Humidity: {main && main.humidity}%</p>
      <p>Wind Speed: {wind && wind.speed} km/h</p>
      <p>Pressure: {main && main.pressure} hPa</p>
      <p>Sunrise: {formatSunriseSunset(sys && sys.sunrise)}</p>
      <p>Sunset: {formatSunriseSunset(sys && sys.sunset)}</p>
      {weather && weather.length > 0 && (
        <img
          src={`http://openweathermap.org/img/w/${weather[0].icon}.png`}
          alt={weather[0].description}
        />
      )}
    </div>
  );
};

export default Result;
