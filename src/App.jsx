import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import './App.css';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Critical fix #1: Validate API key at startup
if (!API_KEY) {
  console.error('Missing VITE_WEATHER_API_KEY environment variable. Add it to your .env file.');
}

function App() {
  const [city, setCity] = useState('London');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

    // Critical fix #1: Don't fetch if API key is missing
    if (!API_KEY) {
      setError('API key is missing. Please add VITE_WEATHER_API_KEY to your .env file.');
      return;
    }

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fix: URL encode city name for cities with spaces/special chars
        const encodedCity = encodeURIComponent(city);

        const weatherRes = await fetch(
          `${BASE_URL}/weather?q=${encodedCity}&appid=${API_KEY}&units=metric`
        );

        if (!weatherRes.ok) {
          if (weatherRes.status === 404) {
            throw new Error(`City "${city}" not found. Please check the spelling.`);
          } else if (weatherRes.status === 401) {
            throw new Error('API key is invalid or expired.');
          } else {
            throw new Error(`Failed to fetch weather data (${weatherRes.status})`);
          }
        }

        const weatherData = await weatherRes.json();

        setWeather({
          city: weatherData.name,
          temp: weatherData.main.temp,
          description: weatherData.weather[0].description,
          icon: weatherData.weather[0].icon,
          humidity: weatherData.main.humidity,
          wind: weatherData.wind.speed,
        });

        const forecastRes = await fetch(
          `${BASE_URL}/forecast?q=${encodedCity}&appid=${API_KEY}&units=metric`
        );

        // Critical fix #2: Check forecast response for errors
        if (!forecastRes.ok) {
          throw new Error('Failed to fetch forecast data');
        }

        const forecastData = await forecastRes.json();

        const dailyForecast = forecastData.list
          .filter((item, index) => index % 8 === 0)
          .slice(0, 5)
          .map((item) => ({
            name: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
            tempHigh: item.main.temp_max,
            tempLow: item.main.temp_min,
            icon: item.weather[0].icon,
            description: item.weather[0].description,
          }));

        setForecast(dailyForecast);
      } catch (err) {
        setError(err.message);
        setWeather(null);
        setForecast(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  const handleSearch = (searchCity) => {
    setCity(searchCity);
  };

  return (
    <div className="app">
      <h1>Weather Dashboard</h1>
      <SearchBar onSearch={handleSearch} />
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <>
          <CurrentWeather weather={weather} />
          <Forecast forecast={forecast} />
        </>
      )}
    </div>
  );
}

export default App;
