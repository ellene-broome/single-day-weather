console.log(import.meta.env.VITE_WEATHER_API_KEY);


import { useState } from 'react'
import './App.css';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; // Function to fetch weather data from API

function App() {
 
  const [city, setCity] = useState('Baton Rouge') // Initialize city state or default city
  const [weather, setWeather] = useState(null) // Initialize weather state or holds weather data
  
  const fetchWeather = async () => {
    if (!city) return // If city is empty, do not fetch data
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather(data); // Set weather data to state
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeather(null); // Reset weather state on error
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value); // Update city state when input changes
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchWeather(); // Fetch weather data when Enter key is pressed
    }
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input 
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={handleCityChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {weather && (
        <div>
          <h2>Weather in {weather.name}</h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Condition: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>

  );
}

export default App;

