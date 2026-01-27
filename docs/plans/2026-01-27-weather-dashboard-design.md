# Weather Dashboard Design

A React learning project focused on fundamentals and API integration.

## Goals

- Learn React fundamentals: components, props, useState, useEffect
- Practice API integration: fetching, loading states, error handling
- Build something real: weather dashboard with current weather, 5-day forecast, location search

## Tech Stack

- **Framework**: React (via Vite)
- **Styling**: Plain CSS
- **API**: OpenWeatherMap (free tier)

## Project Structure

```
src/
  components/
    SearchBar.jsx      # Location search input
    CurrentWeather.jsx # Today's weather display
    Forecast.jsx       # 5-day forecast container
    ForecastDay.jsx    # Single day in forecast
  App.jsx              # Main app, holds state, fetches data
  App.css              # All styles
  main.jsx             # Vite entry point
```

## Data Flow

All state lives in App.jsx. Child components receive props and display them.

```
App (state: city, weather, forecast, loading, error)
  ├── SearchBar (receives: onSearch callback)
  ├── CurrentWeather (receives: weather data)
  └── Forecast (receives: forecast array)
        └── ForecastDay (receives: single day data)
```

## Components

### SearchBar.jsx

Controlled input with submit button. Manages local input state, calls `onSearch(city)` on submit.

Concepts: useState, controlled inputs, callback props

### CurrentWeather.jsx

Displays: city name, temperature, weather icon, description, humidity, wind.

Concepts: props, destructuring, rendering dynamic data

### Forecast.jsx

Maps over 5-day array, renders ForecastDay for each.

Concepts: .map(), React keys, component composition

### ForecastDay.jsx

Displays: day name, high/low temps, weather icon.

Concepts: props, presentational components

## API Integration

### Endpoints

- Current weather: `api.openweathermap.org/data/2.5/weather?q={city}&appid={key}&units=metric`
- 5-day forecast: `api.openweathermap.org/data/2.5/forecast?q={city}&appid={key}&units=metric`

### Fetch Pattern

1. User submits city in SearchBar
2. App updates city state
3. useEffect triggers fetch when city changes
4. Response stored in weather/forecast state
5. Components re-render with new data

### State Management

```jsx
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [weather, setWeather] = useState(null);
const [forecast, setForecast] = useState(null);
```

### Error Handling

- Empty search: ignore or show message
- City not found: display error message
- Network failure: try/catch, display error message

## Layout

```
┌─────────────────────────────────┐
│         Weather Dashboard       │
├─────────────────────────────────┤
│  [Search city...] [Search]      │
├─────────────────────────────────┤
│  ┌───────────────────────────┐  │
│  │  New York        72°F     │  │
│  │  ☀️ Sunny                  │  │
│  │  Humidity: 45%  Wind: 8mph│  │
│  └───────────────────────────┘  │
├─────────────────────────────────┤
│  Mon   Tue   Wed   Thu   Fri    │
│  68°   72°   70°   65°   63°    │
└─────────────────────────────────┘
```

## Styling

- Single App.css file
- Flexbox for layout
- Centered, max-width container
- Minimal styling (focus is on React)

## API Key

Store in `.env` file:
```
VITE_WEATHER_API_KEY=your_key_here
```

Access via `import.meta.env.VITE_WEATHER_API_KEY`

## Implementation Order

1. Set up Vite project
2. Create static components with hardcoded data
3. Add SearchBar with useState
4. Add useEffect to fetch current weather
5. Add forecast fetch and render list
6. Add loading and error states
7. Style with CSS
