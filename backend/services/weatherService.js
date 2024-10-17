// Convert Kelvin to Celsius
const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(2);

// Format date and time
const formatDateTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString('en-IN', {
    weekday: 'long', // e.g., Monday
    year: 'numeric',
    month: 'long',   // e.g., October
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true     // For AM/PM format
  });
};

// Process weather data and prepare for storing
const processWeatherData = (data) => {
  const { main, weather, dt, name, wind } = data;
  const city = name;
  const dateTime = formatDateTime(dt);  // Get formatted date and time

  const averageTemperature = kelvinToCelsius(main.temp);
  const maxTemperature = kelvinToCelsius(main.temp_max);
  const minTemperature = kelvinToCelsius(main.temp_min);
  const humidity = main.humidity;
  const windSpeed = wind.speed;
  const dominantWeather = weather[0].main;  // e.g., Rain, Snow, Clear

  return {
    city,
    dateTime,          // Added formatted date and time
    averageTemperature,
    maxTemperature,
    minTemperature,
    humidity,
    windSpeed,
    dominantWeather,
  };
};

module.exports = { processWeatherData };
