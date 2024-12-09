import { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';  // Importamos el Navbar
import './WeatherApp.css';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    if (!city) return; // Evitar la consulta si la ciudad está vacía

    setLoading(true);
    setError(null);

    axios
      .get(`https://api.weatherapi.com/v1/current.json?key=60feeb2fb4c740adb1a132532240912&q=${city}&lang=es`)
      .then((response) => {
        setWeatherData(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('No se pudo obtener el clima. Intenta de nuevo.');
        setLoading(false);
      });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getWeatherGif = (condition) => {
    switch (condition) {
      case 'Sunny':
        return './assets/sol.png';
      case 'Cloudy':
        return './assets/nublado.png';
      case 'Rain':
        return './assets/lluvia.png';
      case 'Thunderstorm':
        return './assets/tormenta.png';
      case 'Snow':
        return './assets/nieve.png';
      default:
        return './assets/normal.png'; 
    }
  };

  return (
    <div className="weather-app">
      <Navbar />  {/* Colocamos el Navbar en la parte superior */}
      
      <div className="weather-container">
        {/* Título de la página */}
        <h1 className="page-title">Weather Fast</h1>

        {/* Contenedor de búsqueda */}
        <div className="search-container">
          <input
            type="text"
            className="city-input"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ingresa una ciudad"
          />
          <button className="search-button" onClick={handleSearch}>Buscar</button>
        </div>

        {loading && <div className="loading-text">Cargando...</div>}
        {error && <div className="error-text">{error}</div>}

        {weatherData && (
          <div className="weather-card">
            <h2 className="weather-title">Clima en {weatherData.location.name}</h2>
            <div className="city-name">{weatherData.location.name}, {weatherData.location.country}</div>
            <img
              className="weather-icon"
              src={getWeatherGif(weatherData.current.condition.text)}
              alt={weatherData.current.condition.text}
            />
            <div className="temperature">{weatherData.current.temp_c}°C</div>
            <div className="weather-condition">{weatherData.current.condition.text}</div>
            <div className="info-text">Viento: {weatherData.current.wind_kph} km/h</div>
            <div className="info-text">Humedad: {weatherData.current.humidity}%</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
