# Weather Monitoring System

A React-based Weather Monitoring System that provides real-time weather data for multiple cities, including daily aggregates, temperature thresholds, and graphical representation of weather trends.

## Features

- Fetches weather data from OpenWeatherMap API and displays it in a user-friendly format.
- Displays daily aggregates, including average temperature, maximum temperature, minimum temperature, humidity, wind speed, and dominant weather condition.
- Allows users to toggle between Celsius and Fahrenheit temperature units.
- Users can set a temperature threshold and receive notifications when the threshold is exceeded.
- Visualizes daily weather summaries, historical trends, and triggered alerts through graphical representations.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Axios**: For making API requests to fetch weather data.
- **Chart.js**: For visualizing weather trends in a graphical format.
- **Express.js**: A web application framework for Node.js, used to handle API requests.

## Dependencies

### Frontend (Client)

- **react**: ^17.0.2
- **react-dom**: ^17.0.2
- **axios**: ^0.21.1
- **chart.js**: ^3.5.1
- **react-chartjs-2**: ^3.0.4

### Backend (Server)

- **express**: ^4.17.1
- **cors**: ^2.8.5
- **dotenv**: ^8.2.0
- **nodemon** (for development): ^2.0.7

## Setup Instructions
1. **Clone the repository:**
   
   ```bash
   git clone https://github.com/urvashi-19/weather.git
   ```

2. **Navigate to the project directory:**
   
   ```bash
   cd weather
   ```

3. **Install the dependencies for the server:**

   ```bash
   cd backend 
   npm install
   ```

4. **Set Up Environment Variables:**
   
   Create a .env file in the backend directory and add the following variables:
   
   ```bash
   MONGO_URI= your_mongodb_uri
   OPENWEATHER_API_KEY=your_openweather_api_key
   PORT=5000
   ```

5. **Start the Express server:**

   ```bash
   npm start
   ```

6. **Install the dependencies for the client:**

   ```bash
   cd ../frontend
   npm install
   ```

7. **Start the React application:**

   ```bash
   npm start
   ```
