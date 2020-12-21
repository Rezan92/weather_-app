import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import Spinner from "./Spinner";
import { MdKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";

const API_KEY = process.env.REACT_APP_API_KEY;

const Chart = ({ match }) => {
  const [chart, setChart] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const id = match.params.id;
  const URL = `https://api.openweathermap.org/data/2.5/forecast?id=${id}&units=metric&appid=${API_KEY}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(URL);
        const data = await res.json();
        setChart(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    return () => {
      setChart("");
    };
  }, [URL]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        chart.city && (
          <div
            style={{
              background: "#9c9c9c",
              width: "900px",
              margin: "auto",
              padding: "1rem",
              position: "relative",
            }}
          >
            <Link to="/">
              <div className="back">
                <MdKeyboardBackspace size="1.5rem" />
                <span>Go Back</span>
              </div>
            </Link>
            <h2>
              {chart.city.name}, {chart.city.country}
            </h2>
            <AreaChart
              width={800}
              height={500}
              data={chart.list}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 10,
              }}
              style={{
                background: "#000000",
                margin: "auto",
                padding: ".2rem",
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dt_txt" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                name="temp"
                dataKey="main.temp"
                stroke="red"
                fill="green"
              />
              <Area
                type="monotone"
                name="weather"
                dataKey="weather[0].main"
                stroke="red"
                fill="red"
              />
            </AreaChart>
          </div>
        )
      )}
    </>
  );
};

export default Chart;
