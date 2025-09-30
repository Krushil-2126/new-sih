const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Load cities data
let cities = [];
try {
  const citiesData = fs.readFileSync(path.join(__dirname, 'cities.json'), 'utf8');
  cities = JSON.parse(citiesData);
} catch (error) {
  console.error('Error loading cities.json:', error);
}

// Mock weather data generator
function generateMockWeather(lat, lon) {
  const now = Math.floor(Date.now() / 1000);
  const temp = Math.round((Math.random() * 30) + 5); // 5-35°C
  const feelsLike = temp + Math.round((Math.random() * 6) - 3); // ±3°C
  const humidity = Math.round(Math.random() * 60) + 20; // 20-80%
  const windSpeed = Math.round(Math.random() * 15); // 0-15 m/s
  const pressure = Math.round(Math.random() * 100) + 1000; // 1000-1100 hPa
  const visibility = Math.round(Math.random() * 10) + 5; // 5-15 km

  const conditions = ['Clear', 'Clouds', 'Rain', 'Drizzle', 'Thunderstorm', 'Snow', 'Mist'];
  const descriptions = {
    'Clear': 'clear sky',
    'Clouds': 'scattered clouds',
    'Rain': 'moderate rain',
    'Drizzle': 'light drizzle',
    'Thunderstorm': 'thunderstorm',
    'Snow': 'light snow',
    'Mist': 'mist'
  };
  const icons = {
    'Clear': '01d',
    'Clouds': '02d',
    'Rain': '10d',
    'Drizzle': '09d',
    'Thunderstorm': '11d',
    'Snow': '13d',
    'Mist': '50d'
  };

  const mainCondition = conditions[Math.floor(Math.random() * conditions.length)];

  return {
    main: {
      temp: temp,
      feels_like: feelsLike,
      humidity: humidity,
      pressure: pressure
    },
    weather: [{
      main: mainCondition,
      description: descriptions[mainCondition],
      icon: icons[mainCondition]
    }],
    wind: {
      speed: windSpeed
    },
    visibility: visibility * 1000, // in meters
    dt: now
  };
}

// Routes
app.get('/api/cities', (req, res) => {
  res.json(cities);
});

app.get('/api/weather/:lat/:lon', (req, res) => {
  const { lat, lon } = req.params;
  const weather = generateMockWeather(parseFloat(lat), parseFloat(lon));
  res.json(weather);
});

app.get('/api/geocode', (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: 'Query parameter required' });
  }

  // Simple mock geocoding - find city by name
  const city = cities.find(c => c.name.toLowerCase().includes(q.toLowerCase()));
  if (city) {
    res.json([{
      name: city.name,
      lat: city.lat,
      lon: city.lon,
      country: city.country
    }]);
  } else {
    res.status(404).json({ error: 'City not found' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Weather API server running on port ${PORT}`);
});
