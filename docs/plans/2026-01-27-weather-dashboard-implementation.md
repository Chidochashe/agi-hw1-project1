# Weather Dashboard Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a React weather dashboard to learn components, hooks, and API integration.

**Architecture:** Single-page app with App.jsx managing all state. Child components receive data as props. useEffect fetches weather data when city changes.

**Tech Stack:** Vite, React 18, Plain CSS, OpenWeatherMap API

---

## Task 1: Project Setup

**Files:**
- Create: `package.json` (via npm)
- Create: `src/main.jsx`
- Create: `src/App.jsx`
- Create: `index.html`

**Step 1: Initialize Vite React project**

Run:
```bash
npm create vite@latest . -- --template react
```

Select: Overwrite when prompted (directory not empty)

**Step 2: Install dependencies**

Run:
```bash
npm install
```

**Step 3: Verify project runs**

Run:
```bash
npm run dev
```

Expected: Terminal shows local server URL (http://localhost:5173)
Visit URL in browser, see Vite + React default page

**Step 4: Stop dev server and commit**

Press Ctrl+C to stop server

```bash
git add -A
git commit -m "chore: initialize Vite React project"
```

---

## Task 2: Create Static CurrentWeather Component

**Files:**
- Create: `src/components/CurrentWeather.jsx`
- Modify: `src/App.jsx`

**Step 1: Create CurrentWeather component with hardcoded data**

Create `src/components/CurrentWeather.jsx`:

```jsx
function CurrentWeather({ weather }) {
  if (!weather) return null;

  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

  return (
    <div className="current-weather">
      <h2>{weather.city}</h2>
      <div className="weather-main">
        <img src={iconUrl} alt={weather.description} />
        <span className="temperature">{Math.round(weather.temp)}°C</span>
      </div>
      <p className="description">{weather.description}</p>
      <div className="details">
        <span>Humidity: {weather.humidity}%</span>
        <span>Wind: {weather.wind} m/s</span>
      </div>
    </div>
  );
}

export default CurrentWeather;
```

**Step 2: Update App.jsx with hardcoded weather data**

Replace contents of `src/App.jsx`:

```jsx
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
```

**Step 3: Verify component renders**

Run:
```bash
npm run dev
```

Expected: See "Weather Dashboard" heading and weather data displayed (unstyled)

**Step 4: Commit**

```bash
git add src/components/CurrentWeather.jsx src/App.jsx
git commit -m "feat: add CurrentWeather component with props"
```

---

## Task 3: Create SearchBar Component

**Files:**
- Create: `src/components/SearchBar.jsx`
- Modify: `src/App.jsx`

**Step 1: Create SearchBar component**

Create `src/components/SearchBar.jsx`:

```jsx
import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity('');
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name..."
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
```

**Step 2: Add SearchBar to App.jsx**

Update `src/App.jsx`:

```jsx
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
```

**Step 3: Verify search updates city**

Run:
```bash
npm run dev
```

Type a city name in the input and click Search
Expected: City name appears in CurrentWeather component, console shows "Searching for: [city]"

**Step 4: Commit**

```bash
git add src/components/SearchBar.jsx src/App.jsx
git commit -m "feat: add SearchBar with useState and callback"
```

---

## Task 4: Create ForecastDay and Forecast Components

**Files:**
- Create: `src/components/ForecastDay.jsx`
- Create: `src/components/Forecast.jsx`
- Modify: `src/App.jsx`

**Step 1: Create ForecastDay component**

Create `src/components/ForecastDay.jsx`:

```jsx
function ForecastDay({ day }) {
  const iconUrl = `https://openweathermap.org/img/wn/${day.icon}@2x.png`;

  return (
    <div className="forecast-day">
      <p className="day-name">{day.name}</p>
      <img src={iconUrl} alt={day.description} />
      <p className="temp-high">{Math.round(day.tempHigh)}°</p>
      <p className="temp-low">{Math.round(day.tempLow)}°</p>
    </div>
  );
}

export default ForecastDay;
```

**Step 2: Create Forecast component**

Create `src/components/Forecast.jsx`:

```jsx
import ForecastDay from './ForecastDay';

function Forecast({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="forecast">
      <h3>5-Day Forecast</h3>
      <div className="forecast-list">
        {forecast.map((day, index) => (
          <ForecastDay key={index} day={day} />
        ))}
      </div>
    </div>
  );
}

export default Forecast;
```

**Step 3: Add mock forecast to App.jsx**

Update `src/App.jsx`:

```jsx
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
```

**Step 4: Verify forecast renders**

Run:
```bash
npm run dev
```

Expected: See 5-day forecast rendered below current weather (unstyled)

**Step 5: Commit**

```bash
git add src/components/ForecastDay.jsx src/components/Forecast.jsx src/App.jsx
git commit -m "feat: add Forecast components with list rendering"
```

---

## Task 5: Add API Integration

**Files:**
- Create: `.env`
- Modify: `src/App.jsx`

**Step 1: Create .env file for API key**

Create `.env` in project root:

```
VITE_WEATHER_API_KEY=your_api_key_here
```

Note: Replace `your_api_key_here` with actual key from https://openweathermap.org/api

**Step 2: Update App.jsx with API fetching**

Replace `src/App.jsx`:

```jsx
import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import './App.css';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

function App() {
  const [city, setCity] = useState('London');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const weatherRes = await fetch(
          `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!weatherRes.ok) {
          throw new Error('City not found');
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
          `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );
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
```

**Step 3: Verify API works**

Run:
```bash
npm run dev
```

Expected: Real weather data loads for London, search works for other cities

**Step 4: Commit**

```bash
git add src/App.jsx
git commit -m "feat: add API integration with useEffect"
```

Note: Do NOT commit .env file (it's in .gitignore)

---

## Task 6: Add Styling

**Files:**
- Modify: `src/App.css`

**Step 1: Replace App.css with dashboard styles**

Replace `src/App.css`:

```css
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.app {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

h1 {
  color: white;
  text-align: center;
  margin-bottom: 1.5rem;
}

.search-bar {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.search-bar input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
}

.search-bar button {
  padding: 0.75rem 1.5rem;
  background: #4c51bf;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}

.search-bar button:hover {
  background: #434190;
}

.current-weather {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
}

.current-weather h2 {
  color: #333;
  margin-bottom: 0.5rem;
}

.weather-main {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.temperature {
  font-size: 3rem;
  font-weight: bold;
  color: #333;
}

.description {
  color: #666;
  text-transform: capitalize;
  margin-bottom: 1rem;
}

.details {
  display: flex;
  justify-content: center;
  gap: 2rem;
  color: #666;
}

.forecast {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
}

.forecast h3 {
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
}

.forecast-list {
  display: flex;
  justify-content: space-between;
}

.forecast-day {
  text-align: center;
  flex: 1;
}

.day-name {
  font-weight: bold;
  color: #333;
  margin-bottom: 0.25rem;
}

.forecast-day img {
  width: 50px;
  height: 50px;
}

.temp-high {
  color: #333;
  font-weight: bold;
}

.temp-low {
  color: #999;
}

.loading,
.error {
  text-align: center;
  padding: 2rem;
  color: white;
  font-size: 1.25rem;
}

.error {
  background: rgba(255, 0, 0, 0.2);
  border-radius: 8px;
}
```

**Step 2: Verify styling looks correct**

Run:
```bash
npm run dev
```

Expected: Purple gradient background, white cards, centered layout, responsive design

**Step 3: Commit**

```bash
git add src/App.css
git commit -m "feat: add dashboard styling"
```

---

## Task 7: Final Cleanup

**Files:**
- Delete: `src/assets/` (unused Vite assets)
- Modify: `index.html` (update title)

**Step 1: Remove unused Vite assets**

Run:
```bash
rm -rf src/assets
```

**Step 2: Update page title**

In `index.html`, change the `<title>` tag:

```html
<title>Weather Dashboard</title>
```

**Step 3: Final verification**

Run:
```bash
npm run dev
```

Test:
- Page loads with London weather
- Search for another city works
- Invalid city shows error
- 5-day forecast displays

**Step 4: Final commit**

```bash
git add -A
git commit -m "chore: cleanup and update page title"
```

---

## Summary

After completing all tasks, you will have learned:

1. **Components & Props** - CurrentWeather, ForecastDay receive data as props
2. **useState** - SearchBar manages input, App manages city/weather/loading/error
3. **useEffect** - Fetches data when city changes
4. **Conditional rendering** - Loading, error, and success states
5. **Lists & keys** - Forecast renders array with .map()
6. **Controlled inputs** - SearchBar input bound to state
7. **Callback props** - SearchBar calls onSearch from parent
