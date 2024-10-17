import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import './weatherChart.css'; // Import your CSS file here

Chart.register(...registerables);

const WeatherChart = ({ dailyAggregates }) => {
  const labels = dailyAggregates.map(aggregate => aggregate.city); // Extract city names

  const avgTempData = dailyAggregates.map(aggregate => aggregate.averageTemp);
  const maxTempData = dailyAggregates.map(aggregate => aggregate.maxTemp);
  const minTempData = dailyAggregates.map(aggregate => aggregate.minTemp);
  const humidityData = dailyAggregates.map(aggregate => aggregate.humidity); // Add humidity data
  const windSpeedData = dailyAggregates.map(aggregate => aggregate.windSpeed); // Add wind speed data

  const data = {
    labels, // Use city names as labels
    datasets: [
      {
        label: 'Average Temperature',
        data: avgTempData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        tension: 0.3,
      },
      {
        label: 'Maximum Temperature',
        data: maxTempData,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 2,
        tension: 0.3,
      },
      {
        label: 'Minimum Temperature',
        data: minTempData,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 2,
        tension: 0.3,
      },
      {
        label: 'Humidity',
        data: humidityData,
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderWidth: 2,
        tension: 0.3,
      },
      {
        label: 'Wind Speed',
        data: windSpeedData,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="weather-chart-container">
      <div className="chart-item">
        <h3>Average Temperature</h3>
        <Line data={{ ...data, datasets: [data.datasets[0]] }} />
      </div>
      <div className="chart-item">
        <h3>Maximum Temperature</h3>
        <Line data={{ ...data, datasets: [data.datasets[1]] }} />
      </div>
      <div className="chart-item">
        <h3>Minimum Temperature</h3>
        <Line data={{ ...data, datasets: [data.datasets[2]] }} />
      </div>
      <div className="chart-item">
        <h3>Humidity</h3>
        <Line data={{ ...data, datasets: [data.datasets[3]] }} />
      </div>
      <div className="chart-item">
        <h3>Wind Speed</h3>
        <Line data={{ ...data, datasets: [data.datasets[4]] }} />
      </div>
    </div>
  );
};

export default WeatherChart;
