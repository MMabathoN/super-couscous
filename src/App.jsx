import React, { useState, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { fetchWeather, fetchForecast, fetchWeatherByCoordinates } from "./api";
import Result from "./Result";
import LocationInput from "./LocationInput";
import LoadingIndicator from "./LoadingIndicator";
import "./styles.css";
import Footer from "./Footer";

function WeatherSearch() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    if (city) {
      handleSubmitByCity();
    }
  }, [city]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmitByCity = async () => {
    e.preventDefault();
    setLoading(true);
    try {
      const weather = await fetchWeather(city);
      setWeatherData(weather);
      const forecast = await fetchForecast(city);
      setForecastData(forecast.slice(0, 5));
      updateBackgroundImage(weather.weather[0].description);
      setError(null);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Error fetching weather data. Please try again.");
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
      setForecastData(forecast.slice(0, 5));
      updateBackgroundImage(weather.weather[0].description);
      setError(null);
    } catch (error) {
      console.error("Error fetching weather data by coordinates:", error);
      setError("Error fetching weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateBackgroundImage = useCallback((description) => {
    if (description) {
      const url = `https://api.unsplash.com/photos/random?query=${description}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`;
      axios
        .get(url)
        .then((response) => {
          document.body.style.backgroundImage = `url('${response.data.urls.regular}')`;
        })
        .catch((error) => {
          console.error("Error fetching image:", error);
          document.body.style.backgroundImage = "url('fallback-image-url')";
        });
    }
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
      <header/>
      <div className="card">
        <h1>Weather Search</h1>
        <LocationInput onSubmit={handleSubmitByCoordinates} />
        <form id="Search" onSubmit={handleSubmitByCity}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter a city..."
          />
          <button type="submit">Search</button>
        </form>
        <p>Current Date & Time: {currentDateTime.toLocaleString()}</p>
        {loading && <LoadingIndicator />}
        {error && <Error message={error} />}
        {weatherData && <Results weatherData={weatherData} forecastData={forecastData} />}
      <Footer/>
      </div>
    </div>
  );
}

export default WeatherSearch;
