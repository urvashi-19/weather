const express = require('express');
const { fetchWeatherData } = require('../controllers/weatherController');

const router = express.Router();

router.get('/fetch', fetchWeatherData);

module.exports = router;
