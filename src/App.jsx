import CurrentWeather from './components/CurrentWeather';
import './App.css';

function App() {
  const mockWeather = {
    city: 'New York',
    temp: 22,
    description: 'Partly Cloudy',
    icon: '02d',
    humidity: 45,
    wind: 3.5,
  };

  return (
    <div className="app">
      <h1>Weather Dashboard</h1>
      <CurrentWeather weather={mockWeather} />
    </div>
  );
}

export default App;
