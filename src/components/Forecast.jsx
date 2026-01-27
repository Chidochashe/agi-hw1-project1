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
