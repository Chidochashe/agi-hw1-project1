import PropTypes from 'prop-types';

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

CurrentWeather.propTypes = {
  weather: PropTypes.shape({
    city: PropTypes.string.isRequired,
    temp: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    humidity: PropTypes.number.isRequired,
    wind: PropTypes.number.isRequired,
  }),
};

export default CurrentWeather;
