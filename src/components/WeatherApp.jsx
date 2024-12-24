import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "./WeatherApp.css";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchedCity, setSearchedCity] = useState("");

  const formatLocalTime = (date) => {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    const localTime = new Date(date).toLocaleString("es-ES", options);
    return localTime;
  };

  const fetchWeatherByGeolocation = (latitude, longitude) => {
    setLoading(true);
    setError(null);
    axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=60feeb2fb4c740adb1a132532240912&q=${latitude},${longitude}&lang=es`
      )
      .then((response) => {
        handleWeatherData(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError("No se pudo obtener el clima para tu ubicación.");
        setLoading(false);
      });
  };

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByGeolocation(latitude, longitude);
        },
        () => {
          setError("No se pudo acceder a tu ubicación.");
        }
      );
    } else {
      setError("La geolocalización no está soportada en tu navegador.");
    }
  };

  useEffect(() => {
    handleGeolocation();

    // Agregar el script de Windguru
    const loader = () => {
      const arg = [
        "s=220832",
        "m=3",
        "uid=wg_fwdg_220832_3_1735047982116",
        "wj=kmh",
        "tj=c",
        "waj=m",
        "tij=m",
        "odh=0",
        "doh=24",
        "fhours=240",
        "hrsm=3",
        "vt=forecasts",
        "lng=es",
        "p=TMP,WCHILL,WINDSPD,GUST,MWINDSPD,SMER,TMPE,FLHGT,CDC,TCDC,APCP1s,RH,RATING",
      ];
      const script = document.createElement("script");
      script.src = `https://www.windguru.cz/js/widget.php?${arg.join("&")}`;
      script.id = "wg_fwdg_220832_3_1735047982116";
      document.body.appendChild(script);
    };
    loader();
  }, []);

  const handleSearch = () => {
    const normalizedCity = city.trim().toLowerCase();

    if (!normalizedCity) {
      setError("Por favor, ingresa un nombre de ciudad válido.");
      return;
    }

    setLoading(true);
    setError(null);
    setSearchedCity(city);

    axios
      .get(
        `https://api.weatherapi.com/v1/forecast.json?key=60feeb2fb4c740adb1a132532240912&q=${normalizedCity}&lang=es`
      )
      .then((response) => {
        handleWeatherData(response.data);
      })
      .catch((err) => {
        console.error(err);
        setError(
          "No se pudo obtener el clima para la ciudad especificada. Verifica el nombre e intenta nuevamente."
        );
        setLoading(false);
      });
  };

  const handleWeatherData = (data) => {
    setWeatherData(data.current);
    const forecastData = data.forecast.forecastday[0].hour;

    const currentTime = new Date();
    const futureHours = forecastData.filter((hour) => {
      const hourTime = new Date(hour.time);
      return hourTime > currentTime;
    });

    const hourlyForecastLocal = futureHours.map((hour) => {
      const localHour = formatLocalTime(new Date(hour.time));
      return { ...hour, localTime: localHour };
    });

    setHourlyForecast(hourlyForecastLocal.slice(0, 5));

    const cityName = data.location.name;
    setSearchedCity(cityName);

    setLoading(false);
  };

  return (
    <div className="weather-app">
      <Navbar />
      <div className="weather-container">
        <h1 className="page-title">Weather Fast</h1>
        <div className="search-container">
          <input
            type="text"
            className="city-input"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Ingresa una ciudad"
          />
          <button className="search-button" onClick={handleSearch}>
            Buscar
          </button>
        </div>
        {loading && <div className="loading-text">Cargando...</div>}
        {error && <div className="error-text">{error}</div>}

        {weatherData && (
          <>
            <div className="weather-card">
              <h2 className="weather-title">
                {searchedCity ? `Clima en ${searchedCity}` : "Clima en tu ubicación"}
              </h2>
              <img
                className="weather-icon"
                src={`https:${weatherData.condition.icon}`}
                alt={weatherData.condition.text}
              />
              <div className="temperature">{weatherData.temp_c}°C</div>
              <div className="weather-condition">
                {weatherData.condition.text}
              </div>
              <div className="info-text">Viento: {weatherData.wind_kph} km/h</div>
              <div className="info-text">Humedad: {weatherData.humidity}%</div>
            </div>

            <div className="hourly-forecast">
              <h3>Clima en las próximas horas:</h3>
              <div className="hourly-details">
                {hourlyForecast.map((hour, index) => (
                  <div className="hourly-item" key={index}>
                    <div className="hour">{hour.localTime}</div>
                    <img
                      className="hourly-icon"
                      src={`https:${hour.condition.icon}`}
                      alt={hour.condition.text}
                    />
                    <div className="temperature">{hour.temp_c}°C</div>
                    <div className="weather-condition">{hour.condition.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
