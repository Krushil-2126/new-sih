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
    const url = `http://localhost:3001/api/geocode?q=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to geocode city');
    const arr = await res.json();
    return arr && arr.length ? { name: arr[0].name, lat: arr[0].lat, lon: arr[0].lon } : null;
  }

  async function fetchCityWeather(lat, lon) {
    // Use full URL with localhost and port to avoid CORS issues when opening file locally
    const url = `http://localhost:3001/api/weather/${lat}/${lon}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch weather');
    const data = await res.json();
    return data;
  }

  async function fetchCitiesFromAPI() {
    try {
      const res = await fetch('http://localhost:3001/api/cities');
      if (!res.ok) throw new Error('Failed to fetch cities from local API');
      const cities = await res.json();
      return cities.map(c => ({ name: c.name, lat: c.lat, lon: c.lon, selected: false, country: c.country }));
    } catch (e) {
      console.warn('Failed to fetch cities from local API, using defaults', e);
      return [
        { name: 'Istanbul', lat: 41.0082, lon: 28.9784, selected: false, country: 'TR' },
        { name: 'Ankara', lat: 39.9334, lon: 32.8597, selected: false, country: 'TR' },
        { name: 'Izmir', lat: 38.4192, lon: 27.1287, selected: false, country: 'TR' }
      ];
    }
  }

  function clearMarkers() {
    state.markers.forEach(m => state.map.removeLayer(m));
    state.markers = [];
  }

  function addCityMarker(city, weather, highlight=false) {
    const weatherIcon = weather.weather?.[0]?.icon ? `<img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" width="24" height="24" style="filter: brightness(0) invert(1);" />` : '<i class="fas fa-cloud-sun"></i>';
    const icon = L.divIcon({
      className: 'city-marker',
      html: `<div style="display:flex;align-items:center;gap:6px;padding:8px 10px;background:${highlight?'#ef4444':'#3b82f6'};color:#fff;border-radius:16px;box-shadow:0 4px 12px rgba(0,0,0,.3);font-size:13px;font-weight:500;min-width:120px;justify-content:space-between;">`+
            `${weatherIcon}`+
            `<span>${city.name}</span>`+
            `<span>${Math.round(weather.main.temp)}°C</span>`+
            `</div>`
    });
    const marker = L.marker([city.lat, city.lon], { icon }).addTo(state.map);
    marker.bindPopup(`
      <div style="min-width:220px;font-family:Arial,sans-serif;">
        <h3 style="margin:0 0 8px 0;display:flex;align-items:center;gap:8px;">
          ${weatherIcon.replace('filter: brightness(0) invert(1);', '')}
          ${city.name}, ${city.country || ''}
        </h3>
        <p style="margin:4px 0;"><strong>${weather.weather?.[0]?.description ?? ''}</strong></p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px;">
          <div>Temp: <strong>${Math.round(weather.main.temp)}°C</strong></div>
          <div>Feels like: <strong>${Math.round(weather.main.feels_like)}°C</strong></div>
          <div>Humidity: <strong>${weather.main.humidity}%</strong></div>
          <div>Wind: <strong>${Math.round(weather.wind.speed)} m/s</strong></div>
          <div>Pressure: <strong>${weather.main.pressure || 'N/A'} hPa</strong></div>
          <div>Visibility: <strong>${weather.visibility ? Math.round(weather.visibility / 1000) + ' km' : 'N/A'}</strong></div>
        </div>
        <small style="color:#666;">Updated: ${new Date(weather.dt*1000).toLocaleString()}</small>
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
        // Always fetch weather from API server (mock data)
        const wx = await fetchCityWeather(city.lat, city.lon);
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
      const existing = state.cities.find(c => c.name.toLowerCase() === loc.name.toLowerCase());
      if (existing) {
        existing.selected = true;
        state.map.setView([loc.lat, loc.lon], 7);
        await refreshAllCities();
      } else {
        state.cities.push({ name: loc.name, lat: loc.lat, lon: loc.lon, selected: true, country: loc.country });
        state.map.setView([loc.lat, loc.lon], 7);
        await refreshAllCities();
      }
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
