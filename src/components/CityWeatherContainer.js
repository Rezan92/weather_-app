import React, { useState, useContext } from "react";
import "../style/cityWeather.css";
import SearchForm from "./SearchForm";
import CityWeather from "./CityWeather";
import ErrorText from "./ErrorText";
import Spinner from "./Spinner";
import { weatherContext } from "./context/weatherContext";

const API_KEY = process.env.REACT_APP_API_KEY;

const CityWeatherContainer = () => {
  const [weatherInfo, setWeatherInfo] = useContext(weatherContext);
  const [cityName, setCityName] = useState("");
  const [ifError, setIfError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();
      if (data.cod >= 400) {
        const error = new Error();
        error.data = data;
        throw error;
      } else {
        setIfError({});
        setWeatherInfo([data, ...weatherInfo]);
      }
    } catch (err) {
      setIfError(err.data);
    } finally {
      setIsLoading(false);
      setCityName("");
    }
  };

  const handleDelete = (id) => {
    const newWeatherInfo = weatherInfo.filter((cityWeather) => {
      return cityWeather.uniqeId !== id;
    });
    setWeatherInfo(newWeatherInfo);
  };

  return (
    <div className="city-weather-container">
      <SearchForm
        cityName={cityName}
        setCityName={setCityName}
        handleSubmit={handleSubmit}
      />
      {Object.keys(ifError).length > 0 && <ErrorText ifError={ifError} />}
      {isLoading && <Spinner />}
      {weatherInfo.length > 0 &&
        weatherInfo.map((cityWeather, index) => (
          <CityWeather
            key={cityWeather.id + index}
            index={index}
            cityWeather={cityWeather}
            handleDelete={handleDelete}
          />
        ))}
    </div>
  );
};

export default CityWeatherContainer;
