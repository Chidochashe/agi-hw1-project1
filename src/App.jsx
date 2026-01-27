import { useState } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import './App.css';

function App() {
  const [searchedCity, setSearchedCity] = useState('');

  const mockWeather = {
    city: searchedCity || 'New York',
    temp: 22,
    description: 'Partly Cloudy',
    icon: '02d',
    humidity: 45,
    wind: 3.5,
  };

  const mockForecast = [
    { name: 'Mon', tempHigh: 24, tempLow: 18, icon: '01d', description: 'Clear' },
    { name: 'Tue', tempHigh: 22, tempLow: 16, icon: '02d', description: 'Partly Cloudy' },
    { name: 'Wed', tempHigh: 20, tempLow: 14, icon: '03d', description: 'Cloudy' },
    { name: 'Thu', tempHigh: 19, tempLow: 13, icon: '10d', description: 'Rain' },
    { name: 'Fri', tempHigh: 21, tempLow: 15, icon: '01d', description: 'Clear' },
  ];

  const handleSearch = (city) => {
    setSearchedCity(city);
  };

  return (
    <div className="app">
      <h1>Weather Dashboard</h1>
      <SearchBar onSearch={handleSearch} />
      <CurrentWeather weather={mockWeather} />
      <Forecast forecast={mockForecast} />
    </div>
  );
}

export default App;
