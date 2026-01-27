import { useState } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
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

  const handleSearch = (city) => {
    setSearchedCity(city);
    console.log('Searching for:', city);
  };

  return (
    <div className="app">
      <h1>Weather Dashboard</h1>
      <SearchBar onSearch={handleSearch} />
      <CurrentWeather weather={mockWeather} />
    </div>
  );
}

export default App;
