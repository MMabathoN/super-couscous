import React, { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { fetchWeather, fetchForecast, fetchWeatherByCoordinates } from "./api";
import Results from "./Results";
import LocationInput from "./LocationInput";
import "./styles.css";

function WeatherSearch() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (city) {
      handleSubmitByCity();
    }
  }, [city]);

  const handleSubmitByCity = async () => {
    setLoading(true);
    try {
      const weather = await fetchWeather(city);
      setWeatherData(weather);
      const forecast = await fetchForecast(city);
      setForecastData(forecast.slice(0, 5)); // Limit to 5 days
      updateBackgroundImage(weather.weather[0].description);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      // Display user-friendly error message
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitByCoordinates = useCallback(async (latitude, longitude) => {
    setLoading(true);
    try {
      const weather = await fetchWeatherByCoordinates(latitude, longitude);
      setWeatherData(weather);
      const forecast = await fetchForecast(weather.name);
      setForecastData(forecast.slice(0, 5)); // Limit to 5 days
      updateBackgroundImage(weather.weather[0].description);
    } catch (error) {
      console.error("Error fetching weather data by coordinates:", error);
      // Display user-friendly error message
    } finally {
      setLoading(false);
    }
  }, []);

  const updateBackgroundImage = useCallback((description) => {
    const url = `https://api.unsplash.com/photos/random?query=${description}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`;
    axios
      .get(url)
      .then((response) => {
        document.body.style.backgroundImage = `url('${response.data.urls.regular}')`;
      })
      .catch((error) => console.error("Error fetching image:", error));
  }, []);

  return (
    <div className="container">
      <Helmet>
        <title>Weather Search App</title>
        <meta
          name="description"
          content="A simple weather search application built with React."
        />
        <meta name="keywords" content="weather, forecast, React, application" />
      </Helmet>
      <div className="card">
        <h1>Weather Search</h1>
        <LocationInput onSubmit={handleSubmitByCoordinates} />
        <form onSubmit={handleSubmitByCity}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter a city..."
          />
          <button type="submit">Search</button>
        </form>
        {loading && <p>Loading...</p>}
        {weatherData && (
          <Results weatherData={weatherData} forecastData={forecastData} />
        )}
      </div>
    </div>
  );
}

export default WeatherSearch;
