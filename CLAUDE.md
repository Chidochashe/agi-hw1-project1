# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React weather dashboard learning project using Vite, focused on components, hooks, and API integration with OpenWeatherMap.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server at http://localhost:5173
npm run build        # Production build
npm run preview      # Preview production build
```

## GitHub

Repository: https://github.com/Chidochashe/agi-hw1-project1

```bash
~/bin/gh repo view --web    # Open repo in browser
~/bin/gh pr create          # Create pull request
```

## Code Quality Patterns

- PropTypes on all components for runtime validation
- AbortController in useEffect for async race conditions
- ErrorBoundary wraps App for graceful error handling
- aria-label on form inputs for accessibility

## Architecture

**State Management**: All state lives in `App.jsx` - child components are presentational and receive data via props.

**Data Flow**:
```
App (state: city, weather, forecast, loading, error)
  ├── SearchBar (receives: onSearch callback)
  ├── CurrentWeather (receives: weather data)
  └── Forecast (receives: forecast array)
        └── ForecastDay (receives: single day data)
```

**Key Patterns**:
- useEffect triggers API fetch when city state changes
- SearchBar uses useState for local input, calls parent callback on submit
- Conditional rendering for loading/error/success states

## API Configuration

OpenWeatherMap API key stored in `.env`:
```
VITE_WEATHER_API_KEY=your_key_here
```

Access via `import.meta.env.VITE_WEATHER_API_KEY`

## Implementation Plan

See `docs/plans/2026-01-27-weather-dashboard-implementation.md` for step-by-step task guide.
