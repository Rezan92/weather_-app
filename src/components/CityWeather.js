import React from "react";
import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";

const CityWeather = ({ cityWeather, handleDelete, index }) => {
  cityWeather.uniqeId = cityWeather.id + index; // to have a unique id for each city, even if we fetch the same city more then one time.
  const { name, sys, weather, main, coord, uniqeId, id } = cityWeather;
  const { country } = sys;
  const { main: weatherSituation, description, icon } = weather[0];
  const { temp, temp_max, temp_min } = main;
  const { lat, lon } = coord;
  return (
    <div className="city-container">
      <div className="city-delete" onClick={() => handleDelete(uniqeId)}>
        <MdCancel className="delete-icon" />
        <span className="tooltiptext">Remove</span>
      </div>
      <h3 className="city-name">
        <Link to={`/${id}`}>
          {name}, {country}
        </Link>
      </h3>
      <div className="temp-icon_container">
        <img
          className="temp-icon"
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={`${weatherSituation} icon`}
        />
        <h3 className="temp">{temp} °C</h3>
      </div>
      <div className="weather-info">
        <h4 className="weather-condition">{weatherSituation}</h4>
        <p className="weather-description">{description}</p>
        <p>
          max temp: <strong>{temp_max} °C</strong>
        </p>
        <p>
          min temp: <strong>{temp_min} °C</strong>
        </p>
        <p className="weather-location">
          location:{" "}
          <strong>
            {lat}, {lon}
          </strong>
        </p>
      </div>
    </div>
  );
};

export default CityWeather;
