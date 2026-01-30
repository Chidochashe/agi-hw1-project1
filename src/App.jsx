import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import './App.css';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

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

    if (!API_KEY) {
      setError('API key is missing. Please add VITE_WEATHER_API_KEY to your .env file.');
      return;
    }

    // Important fix #1: AbortController to handle race conditions
    const abortController = new AbortController();

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const encodedCity = encodeURIComponent(city);

        const weatherRes = await fetch(
          `${BASE_URL}/weather?q=${encodedCity}&appid=${API_KEY}&units=metric`,
          { signal: abortController.signal }
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
          `${BASE_URL}/forecast?q=${encodedCity}&appid=${API_KEY}&units=metric`,
          { signal: abortController.signal }
        );

        if (!forecastRes.ok) {
          throw new Error('Failed to fetch forecast data');
        }

        const forecastData = await forecastRes.json();

        // Important fix #2: Calculate actual daily min/max temperatures
        const groupedByDay = {};
        forecastData.list.forEach((item) => {
          const date = new Date(item.dt * 1000).toDateString();
          if (!groupedByDay[date]) {
            groupedByDay[date] = {
              temps: [],
              icon: item.weather[0].icon,
              description: item.weather[0].description,
              dt: item.dt,
            };
          }
          groupedByDay[date].temps.push(item.main.temp);
        });

        const dailyForecast = Object.entries(groupedByDay)
          .slice(0, 5)
          .map(([date, day]) => ({
            id: date, // Important fix #3: Use date as unique key
            name: new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
            tempHigh: Math.max(...day.temps),
            tempLow: Math.min(...day.temps),
            icon: day.icon,
            description: day.description,
          }));

        setForecast(dailyForecast);
      } catch (err) {
        // Don't set error if request was aborted (user searched again)
        if (err.name === 'AbortError') return;
        setError(err.message);
        setWeather(null);
        setForecast(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();

    // Cleanup: abort fetch if city changes before request completes
    return () => abortController.abort();
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
