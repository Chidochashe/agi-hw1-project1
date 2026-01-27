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
