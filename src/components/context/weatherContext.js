import React, { createContext, useState } from "react";

export const weatherContext = createContext();
export const WeatherContextProvider = (props) => {
  const [weather, setWeather] = useState([]);
  return (
    <weatherContext.Provider value={[weather, setWeather]}>
      {props.children}
    </weatherContext.Provider>
  );
};
