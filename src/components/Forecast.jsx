import PropTypes from 'prop-types';
import ForecastDay from './ForecastDay';

function Forecast({ forecast }) {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="forecast">
      <h3>5-Day Forecast</h3>
      <div className="forecast-list">
        {forecast.map((day) => (
          <ForecastDay key={day.id} day={day} />
        ))}
      </div>
    </div>
  );
}

Forecast.propTypes = {
  forecast: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      tempHigh: PropTypes.number.isRequired,
      tempLow: PropTypes.number.isRequired,
      icon: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ),
};

export default Forecast;
