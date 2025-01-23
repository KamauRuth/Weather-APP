import React, { useRef, useState } from 'react'
import './Weather.css'
import search from '../assets/search.png'
import rainny from '../assets/rainny.png'
import drizzle from '../assets/drizzle.png'
import sunny from '../assets/sunny.png'
import cloudy from '../assets/cloudy.png'
import wind from '../assets/wind.png'
import humidity from '../assets/humidity.png'
import snow from '../assets/snow.png'
import { useEffect } from 'react'

const Weather = () => {

  const inputRef = useRef()

  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d" : sunny,
    "01n" : sunny,
    "02d" : cloudy,
    "02n" : cloudy,
    "03d" : cloudy,
    "03n" : cloudy,
    "04d" : drizzle,
    "04n" : drizzle,
    "09d" : rainny,
    "09n" : rainny,
    "10d" : rainny,
    "10n" : rainny,
    "13d" : snow,
    "13n" : snow
 
  }

  const Search = async (city)=> {
    if (city === "") {
      alert ("Enter City Name")
      return;
    }
    console.log(import.meta.env.VITE_APP_ID);

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url)
      const data = await response.json()
      console.log(data);

      const icons = allIcons[data.weather[0].icon] || sunny;

      setWeatherData({
        Humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor (data.main.temp),
        location: data.name,
        icon : icons
      })
      
      
    } catch (error) {
      setWeatherData(false)
      console.error ("Error ")
    }
  }

  useEffect (()=>{
    Search("Nairobi")
  }, [])

  return (
    <div className='Weather'>
        <div className="searchbar">
            <input ref={inputRef} type='text' placeholder='Search'/>
            <img src= {search} alt="" onClick={()=>Search(inputRef.current.value)}/>
        </div>
        <img src= {weatherData.icon} alt="" className='weather-icon' />
        <p className='temperature'>{weatherData.temperature}°C</p>
        <p className='location'> {weatherData.location}</p>

        <div className="weather-data">
          <div className="col">
            <img src= {humidity} alt="" />
            <div>
              <p>{weatherData.Humidity}%</p>
              <span>Humidity</span>
            </div>
          </div>

          <div className="col">
            <img src= {wind} alt="" />
            <div>
              <p>{weatherData.windSpeed}km/h</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Weather