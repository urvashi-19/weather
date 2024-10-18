import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WeatherChart from './components/WeatherChart';
import './App.css'; // Import CSS file for styling

const App = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [threshold, setThreshold] = useState(35); // Default threshold
  const [userThreshold, setUserThreshold] = useState('');
  const [dailyAggregates, setDailyAggregates] = useState([]); // Store aggregates here
  const [tempUnit, setTempUnit] = useState('Celsius'); // Default unit
  const [showPopup, setShowPopup] = useState(false); // Pop-up visibility state
  const [exceededCity, setExceededCity] = useState(''); // Store city that exceeded the threshold

  // Function to fetch weather data
  const fetchWeatherData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/weather/fetch');
      if (response.data && response.data.data) {
        setWeatherData(response.data.data);
        console.log('Fetched weather data:', response.data.data);
      } else {
        console.error('No data found in response:', response.data);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to convert Celsius to Fahrenheit
  const celsiusToFahrenheit = (celsius) => (celsius * 9 / 5) + 32;

  // Function to calculate daily aggregates
  const calculateDailyAggregates = () => {
    return weatherData.map(cityData => {
      const avgTemp = parseFloat(cityData.averageTemperature) || 0;
      const maxTemp = parseFloat(cityData.maxTemperature) || 0;
      const minTemp = parseFloat(cityData.minTemperature) || 0;
      const humidity = cityData.humidity || 'No Data';
      const windSpeed = cityData.windSpeed || 'No Data';
      const dominantCondition = cityData.dominantWeather || 'No Data';
      const dateTime = cityData.dateTime || 'No Date Available';  // Added dateTime

      return {
        city: cityData.city || 'Unknown City',
        dateTime, // Include dateTime in the returned object
        averageTemp: tempUnit === 'Celsius' ? avgTemp : celsiusToFahrenheit(avgTemp),
        maxTemp: tempUnit === 'Celsius' ? maxTemp : celsiusToFahrenheit(maxTemp),
        minTemp: tempUnit === 'Celsius' ? minTemp : celsiusToFahrenheit(minTemp),
        humidity,
        windSpeed,
        dominantCondition,
      };
    });
  };

  // Function to check thresholds
  const checkThreshold = (aggregates, currentThreshold) => {
    let thresholdExceeded = false; // Flag to check if any city exceeds the threshold

    aggregates.forEach(aggregate => {
      let averageTemp = aggregate.averageTemp;

      // Convert average temperature to Celsius if it's in Fahrenheit
      if (tempUnit === 'Fahrenheit') {
        averageTemp = (averageTemp - 32) * 5 / 9; // Convert back to Celsius
      }

      // Compare with threshold only if the temperature is in Celsius
      if (tempUnit === 'Celsius' && averageTemp > currentThreshold) {
        console.log(`Alert: ${aggregate.city} has an average temperature greater than the threshold of ${currentThreshold}°C`);
        setExceededCity(aggregate.city); // Set city that exceeds the threshold
        setShowPopup(true); // Trigger pop-up to show
        thresholdExceeded = true; // Set flag to true if any threshold is exceeded
      }
    });

    // If any city exceeded the threshold, clear the userThreshold state
    setUserThreshold(''); // Clear the user threshold input
  };

  // Function to check threshold against current daily aggregates
  const checkCurrentThreshold = () => {
    const aggregates = calculateDailyAggregates(); // Get new aggregates
    checkThreshold(aggregates, threshold); // Pass the current threshold
  };

  // useEffect to fetch data on component mount and set up interval
  useEffect(() => {
    fetchWeatherData(); // Initial data fetch
    const interval = setInterval(fetchWeatherData, 5 * 60 * 1000); // Update every 5 minutes
    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  // useEffect to calculate daily aggregates when weatherData changes
  useEffect(() => {
    const aggregates = calculateDailyAggregates();
    setDailyAggregates(aggregates); // Update daily aggregates
    checkThreshold(aggregates, threshold); // Check thresholds whenever aggregates are updated
  }, [weatherData]); // Re-run when weatherData changes

  // Loading state
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // Function to handle threshold input
  const handleThresholdChange = (event) => {
    setUserThreshold(event.target.value);
  };

  // Function to update threshold
  const updateThreshold = () => {
    const newThreshold = parseFloat(userThreshold);
    if (!isNaN(newThreshold)) {
      setThreshold(newThreshold);
      console.log(`Threshold updated to: ${newThreshold}°C`);

      // Recalculate daily aggregates and check the threshold
      const aggregates = calculateDailyAggregates(); // Get new aggregates
      setDailyAggregates(aggregates); // Update state with new aggregates
      //checkCurrentThreshold(); // Check current threshold after updating
    } else {
      console.error('Invalid threshold value entered.');
    }
  };

  // Function to toggle temperature unit
  const toggleTempUnit = () => {
    setTempUnit(prevUnit => (prevUnit === 'Celsius' ? 'Fahrenheit' : 'Celsius'));
  };

  // Function to close the pop-up
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather Monitoring System</h1>
      </header>
      <main>
        <section className="weather-summary">
          <h2>Weather Summary for Cities</h2>
          <div className="city-list">
            {dailyAggregates.length > 0 ? (
              dailyAggregates.map((aggregate, index) => (
                <div className="city-card" key={index}>
                  <h3>{aggregate.city}</h3>
                  <p className='tempCss'>Date and Time: {aggregate.dateTime}</p>
                  <p className='tempCss'>Temperature: {aggregate.averageTemp.toFixed(2)} °{tempUnit.charAt(0)}</p>
                  <p className='tempCss'>Maximum Temperature: {aggregate.maxTemp.toFixed(2)} °{tempUnit.charAt(0)}</p>
                  <p className='tempCss'>Minimum Temperature: {aggregate.minTemp.toFixed(2)} °{tempUnit.charAt(0)}</p>
                  <p className='tempCss'>Humidity: {aggregate.humidity}%</p>
                  <p className='tempCss'>Wind Speed: {aggregate.windSpeed} m/s</p>
                  <p className='tempCss'>Dominant Weather Condition: {aggregate.dominantCondition}</p>
                </div>
              ))
            ) : (
              <p>No city data available.</p>
            )}
          </div>
          <div className="temp-unit-toggle">
            <h3>Temperature Unit</h3>
            <button onClick={toggleTempUnit}>
              Switch to {tempUnit === 'Celsius' ? 'Fahrenheit' : 'Celsius'}
            </button>
          </div>
          <div className="threshold-setting">
            <h3>Set Temperature Threshold in °C</h3>
            <input
              type="number"
              value={userThreshold}
              onChange={handleThresholdChange}
              placeholder="Enter new threshold"
            />
            <button onClick={updateThreshold}>Set Threshold</button>
            <button onClick={checkCurrentThreshold}>Check Threshold</button> {/* Added Check Threshold button */}
          </div>
        </section>
        <section className="weather-chart">
          <WeatherChart dailyAggregates={dailyAggregates} />
        </section>
      </main>

      {/* Pop-up for exceeding threshold */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3>Threshold Exceeded</h3>
            <p> Some cities has an average temperature greater than the threshold. Check console for more info!</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
