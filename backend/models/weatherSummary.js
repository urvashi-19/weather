const mongoose = require('mongoose');

const WeatherSummarySchema = new mongoose.Schema({
  city: String,
  date: Date,
  averageTemperature: Number,
  maxTemperature: Number,
  minTemperature: Number,
  dominantWeather: String,
});

module.exports = mongoose.model('WeatherSummary', WeatherSummarySchema);
