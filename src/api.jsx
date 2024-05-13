import axios from "axios";

const UNSPLASH_API_KEY = "v1Ywe_PlkifPWtvKQWuh-5qX1vHYFGzzKoCtrsNEhaU";
const API_KEY = "25324be609828c6f9afbdcede01115a5";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

export async function fetchWeather(city) {
  try {
    const response = await axios.get(
      `${BASE_URL}weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}

export async function fetchForecast(city) {
  try {
    const response = await axios.get(
      `${BASE_URL}forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    throw error;
  }
}

export async function fetchWeatherByCoordinates(latitude, longitude) {
  try {
    const response = await axios.get(
      `${BASE_URL}weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data by coordinates:", error);
    throw error;
  }
}
