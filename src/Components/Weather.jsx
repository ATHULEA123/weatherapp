import React, { useEffect, useState ,useRef} from "react";
import "./Weather.css";

import humidity_icon from "../assets/humidity.png";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import dizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city,setCity] = useState("guruvayur")

  const allicon = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": dizzle_icon,
    "04n": dizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const inputRef = useRef()

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      setWeatherData({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: allicon[data.weather[0].icon] || clear_icon,
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };
  const handleSearch = ()=>{
    const city = inputRef.current.value;
    console.log(city);
    setCity(city);
  }

  useEffect(() => {
    search(city);
  }, [city]);

  return (
    <div className="weather">
      <div className="searchbar">
        <input ref={inputRef} type="text" placeholder="search" />
        <button onClick={handleSearch}>
          <img src={search_icon} alt="search" />
        </button>
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="weather icon" className="weather-icon" />
          <p className="temperature">{weatherData.temperature}°c</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="humidity" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span className="humidity">Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="wind speed" />
              <div>
                <p>{weatherData.windspeed} m/s</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Weather;

