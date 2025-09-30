// Weather page logic
// Dependencies: Leaflet, OpenWeatherMap
// Note: Requires an OpenWeatherMap API key. Set it in Settings page (weatherKey) or save to localStorage under 'weatherKey'.

(function(){
  const state = {
    map: null,
    owmLayer: null,
    layerName: 'precipitation_new',
    live: true,
    markers: [],
    cities: [], // {name, lat, lon, selected}
    apiKey: null,
    refreshMs: 60_000, // 1 minute
  };

  function readApiKey() {
    // Try several common places
    const fromLS = localStorage.getItem('weatherKey') || localStorage.getItem('settings.weatherKey');
    return fromLS && fromLS !== '' ? fromLS : null;
  }

  function initMap() {
    state.map = L.map('weatherMap').setView([20, 0], 2);

    // Base layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
    }).addTo(state.map);

    // Weather overlay (requires API key)
    createOrUpdateWeatherLayer();
  }

  function createOrUpdateWeatherLayer() {
    if (!state.apiKey) return;
    if (state.owmLayer) {
      state.map.removeLayer(state.owmLayer);
    }
    const url = `https://tile.openweathermap.org/map/${state.layerName}/{z}/{x}/{y}.png?appid=${state.apiKey}`;
    state.owmLayer = L.tileLayer(url, { opacity: 0.6 });
    state.owmLayer.addTo(state.map);
  }

  function setUpdated(ts) {
    const el = document.getElementById('weatherUpdated');
    if (!el) return;
    const d = ts ? new Date(ts) : new Date();
    el.textContent = `Updated: ${d.toLocaleString()}`;
  }

  async function geocodeCity(query) {
    if (!state.apiKey) throw new Error('Missing OpenWeatherMap API key');
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=1&appid=${state.apiKey}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to geocode city');
    const arr = await res.json();
    return arr && arr.length ? { name: arr[0].name, lat: arr[0].lat, lon: arr[0].lon } : null;
  }

  async function fetchCityWeather(lat, lon) {
    if (!state.apiKey) throw new Error('Missing OpenWeatherMap API key');
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${state.apiKey}&units=metric`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch weather');
    const data = await res.json();
    // Map One Call API response to expected format
    return {
      main: {
        temp: data.current.temp,
        feels_like: data.current.feels_like,
        humidity: data.current.humidity
      },
      weather: data.current.weather,
      wind: { speed: data.current.wind_speed },
      dt: data.current.dt
    };
  }

  async function fetchCitiesFromAPI() {
    try {
      const res = await fetch('https://datasets-server.huggingface.co/rows?dataset=opdullah%2Fturkish-google-maps-reviews&config=default&split=train&offset=0&length=500');
      if (!res.ok) throw new Error('Failed to fetch cities from Hugging Face');
      const data = await res.json();
      const cities = [];
      const citySet = new Set();
      data.rows.forEach(row => {
        const city = row.row.city;
        if (city && !citySet.has(city)) {
          citySet.add(city);
          cities.push({ name: city, lat: row.row.latitude || 0, lon: row.row.longitude || 0, selected: false });
        }
      });
      return cities;
    } catch (e) {
      console.warn('Failed to fetch cities from Hugging Face, using defaults', e);
      return [
        { name: 'Istanbul', lat: 41.0082, lon: 28.9784, selected: false },
        { name: 'Ankara', lat: 39.9334, lon: 32.8597, selected: false },
        { name: 'Izmir', lat: 38.4192, lon: 27.1287, selected: false }
      ];
    }
  }

  function clearMarkers() {
    state.markers.forEach(m => state.map.removeLayer(m));
    state.markers = [];
  }

  function addCityMarker(city, weather, highlight=false) {
    const icon = L.divIcon({
      className: 'city-marker',
      html: `<div style="display:flex;align-items:center;gap:6px;padding:6px 8px;background:${highlight?'#ef4444':'#3b82f6'};color:#fff;border-radius:14px;box-shadow:0 2px 8px rgba(0,0,0,.2);font-size:12px;">`+
            `<i class=\"fas fa-location-dot\"></i>`+
            `<span>${city.name}</span>`+
            `<span>${Math.round(weather.main.temp)}°C</span>`+
            `</div>`
    });
    const marker = L.marker([city.lat, city.lon], { icon }).addTo(state.map);
    marker.bindPopup(`
      <div style="min-width:200px">
        <strong>${city.name}</strong><br/>
        ${weather.weather?.[0]?.description ?? ''}<br/>
        Temp: ${Math.round(weather.main.temp)}°C (feels ${Math.round(weather.main.feels_like)}°C)<br/>
        Humidity: ${weather.main.humidity}%<br/>
        Wind: ${Math.round(weather.wind.speed)} m/s
      </div>
    `);
    state.markers.push(marker);
  }

  function renderCityPanel(citiesData) {
    const panel = document.getElementById('cityPanel');
    if (!panel) return;
    panel.innerHTML = citiesData.map(({city, weather}) => {
      return `
        <div class="city-card">
          <h3><i class="fas fa-city"></i> ${city.name}</h3>
          <div class="meta">Updated: ${new Date(weather.dt*1000).toLocaleString()}</div>
          <div style="margin-top:8px; display:flex; gap:14px; flex-wrap:wrap;">
            <div>Temp: <strong>${Math.round(weather.main.temp)}°C</strong></div>
            <div>Feels: <strong>${Math.round(weather.main.feels_like)}°C</strong></div>
            <div>Humidity: <strong>${weather.main.humidity}%</strong></div>
            <div>Wind: <strong>${Math.round(weather.wind.speed)} m/s</strong></div>
            <div>Conditions: <strong>${weather.weather?.[0]?.main ?? ''}</strong></div>
          </div>
        </div>
      `;
    }).join('');
  }

  async function refreshAllCities() {
    if (!state.cities.length) return;
    clearMarkers();
    const data = [];
    for (const city of state.cities) {
      try {
        const wx = state.apiKey ? await fetchCityWeather(city.lat, city.lon) : { main: { temp: 'N/A', temp_min: 'N/A', temp_max: 'N/A', humidity: 'N/A' }, weather: [{ description: 'API key required' }], wind: { speed: 'N/A' }, dt: Date.now() / 1000 };
        data.push({ city, weather: wx });
        addCityMarker(city, wx, !!city.selected);
      } catch (e) {
        console.warn('Failed to update city weather', city, e);
      }
    }
    renderCityPanel(data);
    setUpdated(Date.now());
  }

  async function addCityFromInput() {
    const input = document.getElementById('cityInput');
    if (!input) return;
    const q = input.value.trim();
    if (!q) return;
    try {
      const loc = await geocodeCity(q);
      if (!loc) {
        alert('City not found. Try another query.');
        return;
      }
      state.cities.push({ name: loc.name, lat: loc.lat, lon: loc.lon, selected: true });
      state.map.setView([loc.lat, loc.lon], 7);
      await refreshAllCities();
      input.value = '';
    } catch (e) {
      alert('Unable to add city. Ensure API key is set in Settings.');
    }
  }

  function switchWxLayer() {
    const sel = document.getElementById('layerSelect');
    if (!sel) return;
    state.layerName = sel.value;
    createOrUpdateWeatherLayer();
  }

  function toggleWeatherLive() {
    state.live = !state.live;
    const btn = document.querySelector('.weather-toolbar .subtle');
    const badge = document.getElementById('weatherLive');
    if (btn) btn.innerHTML = state.live ? '<i class="fas fa-circle"></i> Pause Live' : '<i class="fas fa-play"></i> Resume Live';
    if (badge) badge.textContent = state.live ? 'Live' : 'Paused';
  }

  function attachGlobals(){
    window.addCityFromInput = addCityFromInput;
    window.switchWxLayer = switchWxLayer;
    window.toggleWeatherLive = toggleWeatherLive;
  }

  function checkApiKeyBanner(){
    if (!state.apiKey) {
      // Soft notice via console and UI updated timestamp
      console.warn('OpenWeatherMap API key missing. Set it in Settings.');
      const el = document.getElementById('weatherUpdated');
      if (el) el.textContent = 'Updated: API key missing (Settings > API Integration)';
    }
  }

  document.addEventListener('DOMContentLoaded', async () => {
    state.apiKey = readApiKey();
    initMap();
    attachGlobals();
    checkApiKeyBanner();

    // Fetch cities from API
    state.cities = await fetchCitiesFromAPI();

    refreshAllCities();

    setInterval(() => {
      if (!state.live) return;
      refreshAllCities();
    }, state.refreshMs);
  });
})();
