import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { RiArrowDropRightLine } from "react-icons/ri";
import { RiArrowDropLeftLine } from "react-icons/ri";
import { GrLocation } from "react-icons/gr";

import { getMaxMinTemperature } from "../../util/getMaxMinTemperature";
import { getTemperatureNow } from "../../util/getTemperatureNow";

import { dateIsAfterToday, dateIsWithinTenDays } from "../../util/date";
import { WiDayFog } from "react-icons/wi";

import "./WeatherTable.css";

const WeatherTable = () => {
  const navigate = useNavigate();

  const [isWeatherAvailable, setIsWeatherAvailable] = useState();
  const [maxTemp, setMaxTemp] = useState();
  const [minTemp, setMinTemp] = useState();
  const [nowTemp, setNowTemp] = useState();

  // Get weather for a given date in the route parameters OTHERWISE get todays weather.
  const { forecastDate } = useParams();
  const initialDate = forecastDate ? new Date(forecastDate) : new Date();
  const [currentDate, setCurrentDate] = useState(initialDate);

  const getData = async () => {
    try {
      const { minTemp, maxTemp } = await getMaxMinTemperature(
        currentDate.toISOString().substr(0, 10)
      );

      const nowTemp = await getTemperatureNow(
        currentDate.toISOString().substr(0, 10)
      );

      setIsWeatherAvailable(true);
      setMaxTemp(maxTemp);
      setMinTemp(minTemp);
      setNowTemp(nowTemp);
    } catch (e) {
      setIsWeatherAvailable(false);
    }
  };

  useEffect(() => {
    getData();
  }, [currentDate]);

  const timeNow = currentDate.toString().substr(16, 5);
  const today = currentDate.toString().substr(0, 16);

  let Weather;
  if (isWeatherAvailable) {
    Weather = (
      <div>
        <div className="weather_nowtemp">Now {nowTemp}</div>
        <div className="weather_mintemp">Min {minTemp}</div>
        <div className="weather_maxtemp">Max {maxTemp}</div>
      </div>
    );
  } else {
    Weather = (
      <div>
        <h1>Weather is unavailable</h1>
      </div>
    );
  }
  let iconStyles = { color: "white" };
  return (
    <div className="weather_app_container">
      <div className="weather-data-container">
        <div className="weather_data">
          <WiDayFog size="90" />

          {Weather}
        </div>
      </div>

      <div>
        <div className="weather__midscreen">
          <div>
            <h2>Stockholm, Slottet</h2>
          </div>

          <br />
          {nowTemp}
          <br />
        </div>
      </div>

      <div className="left_btn">
        <p>Previous day</p>
        <button
          disabled={!dateIsAfterToday(currentDate)}
          onClick={() => {
            const hours = new Date().getHours();
            const minutes = new Date().getMinutes();
            const prevDate = new Date(
              new Date(currentDate.setHours(hours)).setMinutes(minutes)
            ).addDays(-1);
            if (dateIsAfterToday(currentDate)) {
              setCurrentDate(prevDate);
              navigate(`/${prevDate.toISOString().substr(0, 10)}`);
            }
          }}
        >
          {" "}
          <RiArrowDropLeftLine
            className="svg__left"
            style={{ fontSize: "150px" }}
          />
        </button>
      </div>

      <div className="right_btn">
        <p>Next day</p>
        <button
          disabled={!dateIsWithinTenDays(currentDate)}
          onClick={() => {
            const hours = new Date().getHours();
            const minutes = new Date().getMinutes();
            const nextDate = new Date(
              new Date(currentDate.setHours(hours)).setMinutes(minutes)
            ).addDays(1);
            if (dateIsWithinTenDays(currentDate)) {
              setCurrentDate(nextDate);
              navigate(`/${nextDate.toISOString().substr(0, 10)}`);
            }
          }}
        >
          <RiArrowDropRightLine
            className="svg__right"
            style={{ fontSize: "150px" }}
          />
        </button>
      </div>
    </div>
  );
};

export default WeatherTable;
