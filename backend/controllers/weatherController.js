const axios = require('axios');
const WeatherSummary = require('../models/weatherSummary');
const { processWeatherData } = require('../services/weatherService');

// Fetch weather data from OpenWeatherMap API and process it
const fetchWeatherData = async (req, res) => {
  const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
  const apiKey = process.env.OPENWEATHER_API_KEY; // Use your actual API key

  try {
    // Fetch weather data for all cities
    const weatherUpdates = await Promise.all(
      cities.map(city =>
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
      )
    );

    // Process the weather data
    const processedData = weatherUpdates.map(response => processWeatherData(response.data));
    console.log("hi" , processedData)
    
    // Save the processed data to MongoDB
    await WeatherSummary.insertMany(processedData);

    // Send the processed data back in the response
    res.status(200).json({
      message: 'Weather data fetched and saved successfully',
      data: processedData // Send back the weather data
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { fetchWeatherData };
