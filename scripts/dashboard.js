// Dashboard-specific JavaScript
let productionChartInstance;
let weatherChartInstance;
let predictionChartInstance;

// AI Prediction Data
const aiPredictions = {
    next24h: 42.5,
    peakGeneration: { value: 4.8, time: '2:30 PM' },
    weatherImpact: 15,
    batteryStrategy: 'Charge during peak sun',
    gridExport: 'Optimize for 3-6 PM',
    savingsPotential: 45
};

// Weather Data
const weatherData = {
    current: { condition: 'Sunny', temperature: 24 },
    windSpeed: 12,
    solarIrradiance: 850,
    forecast: [
        { time: '00:00', temp: 18, condition: 'Clear', irradiance: 0 },
        { time: '06:00', temp: 20, condition: 'Sunny', irradiance: 200 },
        { time: '12:00', temp: 26, condition: 'Sunny', irradiance: 900 },
        { time: '18:00', temp: 22, condition: 'Partly Cloudy', irradiance: 300 },
        { time: '24:00', temp: 19, condition: 'Clear', irradiance: 0 }
    ]
};

// Initialize charts
function initializeCharts() {
    // Production Chart
    const productionCtx = document.getElementById('productionChart');
    if (productionCtx) {
        productionChartInstance = new Chart(productionCtx, {
            type: 'line',
            data: {
                labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
                datasets: [
                    {
                        label: 'Solar Production',
                        data: [0, 0, 3.2, 6.8, 4.5, 0.5],
                        borderColor: '#f39c12',
                        backgroundColor: 'rgba(243, 156, 18, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'Wind Production',
                        data: [2.1, 2.8, 1.5, 1.2, 2.5, 3.1],
                        borderColor: '#3498db',
                        backgroundColor: 'rgba(52, 152, 219, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'Consumption',
                        data: [1.5, 1.2, 3.8, 4.2, 5.1, 4.3],
                        borderColor: '#e74c3c',
                        backgroundColor: 'rgba(231, 76, 60, 0.1)',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Energy Production & Consumption (Today)'
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        enabled: true,
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Power (kW)'
                        }
                    }
                }
            }
        });
    }
    
    // Efficiency Chart
    const efficiencyCtx = document.getElementById('efficiencyChart');
    if (efficiencyCtx) {
        new Chart(efficiencyCtx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [
                    {
                        label: 'System Efficiency (%)',
                        data: [82, 85, 78, 88, 90, 76, 83],
                        backgroundColor: 'rgba(0, 212, 170, 0.7)',
                        borderColor: '#00d4aa',
                        borderWidth: 2,
                        borderRadius: 8,
                        borderSkipped: false,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Weekly System Efficiency',
                        color: '#1e293b',
                        font: { size: 14, weight: 'bold' }
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Efficiency (%)',
                            color: '#64748b'
                        },
                        grid: {
                            color: 'rgba(100, 116, 139, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Weather Chart
    const weatherCtx = document.getElementById('weatherChart');
    if (weatherCtx) {
        weatherChartInstance = new Chart(weatherCtx, {
            type: 'line',
            data: {
                labels: weatherData.forecast.map(item => item.time),
                datasets: [
                    {
                        label: 'Temperature (°C)',
                        data: weatherData.forecast.map(item => item.temp),
                        borderColor: '#ff6b6b',
                        backgroundColor: 'rgba(255, 107, 107, 0.1)',
                        tension: 0.4,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Solar Irradiance (W/m²)',
                        data: weatherData.forecast.map(item => item.irradiance),
                        borderColor: '#f59e0b',
                        backgroundColor: 'rgba(245, 158, 11, 0.1)',
                        tension: 0.4,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'Weather & Solar Conditions',
                        color: '#1e293b',
                        font: { size: 14, weight: 'bold' }
                    }
                },
                scales: {
                    y: {
                        type: 'linear',
                        display: true,
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Temperature (°C)',
                            color: '#64748b'
                        }
                    },
                    y1: {
                        type: 'linear',
                        display: true,
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Solar Irradiance (W/m²)',
                            color: '#64748b'
                        },
                        grid: {
                            drawOnChartArea: false,
                        },
                    }
                }
            }
        });
    }

    // Prediction Chart
    const predictionCtx = document.getElementById('predictionChart');
    if (predictionCtx) {
        predictionChartInstance = new Chart(predictionCtx, {
            type: 'line',
            data: {
                labels: ['Now', '+1h', '+2h', '+3h', '+4h', '+5h', '+6h'],
                datasets: [
                    {
                        label: 'Actual Production',
                        data: [4.2, 4.5, 4.8, 4.6, 4.3, 3.9, 3.2],
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        tension: 0.4,
                        borderDash: [5, 5]
                    },
                    {
                        label: 'AI Prediction',
                        data: [4.2, 4.6, 4.9, 4.7, 4.4, 4.0, 3.3],
                        borderColor: '#8b5cf6',
                        backgroundColor: 'rgba(139, 92, 246, 0.1)',
                        tension: 0.4,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: 'AI Energy Production Forecast',
                        color: '#1e293b',
                        font: { size: 14, weight: 'bold' }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Power (kW)',
                            color: '#64748b'
                        }
                    }
                }
            }
        });
    }
}

// Render energy flow diagram
function renderEnergyFlow() {
    const flowDiagram = document.getElementById('flowDiagram');
    if (!flowDiagram) return;
    
    flowDiagram.innerHTML = `
        <div class="flow-container" style="display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 20px;">
            <div class="flow-source" style="text-align: center;">
                <div style="font-size: 2rem; color: #f39c12;"><i class="fas fa-sun"></i></div>
                <div>Solar</div>
                <div style="font-weight: bold;">4.2 kW</div>
            </div>
            
            <div class="flow-arrow" style="font-size: 1.5rem;">→</div>
            
            <div class="flow-inverter" style="text-align: center;">
                <div style="font-size: 2rem; color: #3498db;"><i class="fas fa-exchange-alt"></i></div>
                <div>Inverter</div>
                <div style="font-size: 0.8rem;">Online</div>
            </div>
            
            <div class="flow-arrow" style="font-size: 1.5rem;">→</div>
            
            <div class="flow-battery" style="text-align: center;">
                <div style="font-size: 2rem; color: #9b59b6;"><i class="fas fa-battery-half"></i></div>
                <div>Battery</div>
                <div style="font-weight: bold;">78%</div>
            </div>
            
            <div class="flow-arrow" style="font-size: 1.5rem;">→</div>
            
            <div class="flow-grid" style="text-align: center;">
                <div style="font-size: 2rem; color: #e74c3c;"><i class="fas fa-bolt"></i></div>
                <div>Grid</div>
                <div style="font-weight: bold;">Importing</div>
            </div>
        </div>
        
        <div style="margin-top: 20px; text-align: center;">
            <div style="display: inline-block; text-align: center; margin: 0 15px;">
                <div style="font-size: 1.5rem; color: #3498db;"><i class="fas fa-wind"></i></div>
                <div>Wind</div>
                <div style="font-weight: bold;">1.8 kW</div>
            </div>
        </div>
    `;
}

// Update real-time data
function updateRealtimeData() {
    // This would typically fetch data from an API
    // For demo purposes, we'll simulate data updates
    
    const solarValue = (Math.random() * 8 + 2).toFixed(1);
    const windValue = (Math.random() * 4).toFixed(1);
    const batteryValue = Math.max(0, Math.min(100, 78 + (Math.random() * 4 - 2)));
    
    // Update status cards
    const statusCards = document.querySelectorAll('.status-card');
    if (statusCards[0]) statusCards[0].querySelector('.value').textContent = `${solarValue} kW`;
    if (statusCards[1]) statusCards[1].querySelector('.value').textContent = `${windValue} kW`;
    if (statusCards[2]) statusCards[2].querySelector('.value').textContent = `${batteryValue.toFixed(0)}%`;
    
    // Update equipment uptime
    const equipmentItems = document.querySelectorAll('.equipment-item');
    equipmentItems.forEach(item => {
        const uptimeElement = item.querySelector('.uptime');
        if (uptimeElement) {
            const currentTime = uptimeElement.textContent;
            // Simulate time increment (in a real app, this would calculate actual uptime)
            uptimeElement.textContent = incrementUptime(currentTime);
        }
    });

    // Update AI predictions with slight variations
    updateAIPredictions();
    
    // Update weather data
    updateWeatherData();
}

// Update AI predictions
function updateAIPredictions() {
    // Simulate AI prediction updates
    const next24hElement = document.querySelector('.forecast-item strong');
    if (next24hElement) {
        const baseValue = aiPredictions.next24h;
        const variation = (Math.random() - 0.5) * 2; // ±1 kWh variation
        next24hElement.textContent = `${(baseValue + variation).toFixed(1)} kWh`;
    }
}

// Update weather data
function updateWeatherData() {
    // Simulate weather data updates
    const weatherItems = document.querySelectorAll('.weather-item strong');
    if (weatherItems.length >= 3) {
        // Update temperature
        const tempVariation = (Math.random() - 0.5) * 2; // ±1°C variation
        weatherItems[0].textContent = `Sunny, ${(weatherData.current.temperature + tempVariation).toFixed(0)}°C`;
        
        // Update wind speed
        const windVariation = (Math.random() - 0.5) * 4; // ±2 km/h variation
        weatherItems[1].textContent = `${(weatherData.windSpeed + windVariation).toFixed(0)} km/h`;
        
        // Update solar irradiance
        const irradianceVariation = (Math.random() - 0.5) * 100; // ±50 W/m² variation
        weatherItems[2].textContent = `${(weatherData.solarIrradiance + irradianceVariation).toFixed(0)} W/m²`;
    }
}

// Helper function to increment uptime display
function incrementUptime(timeString) {
    const parts = timeString.split(' ');
    let hours = parseInt(parts[0].replace('h', ''));
    let minutes = parseInt(parts[1].replace('m', ''));
    
    minutes += 1;
    if (minutes >= 60) {
        minutes = 0;
        hours += 1;
    }
    
    return `${hours}h ${minutes.toString().padStart(2, '0')}m`;
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    renderEnergyFlow();
    
    // Update real-time data every 5 seconds
    setInterval(updateRealtimeData, 5000);
    
    // Initial update
    updateRealtimeData();

    // Chart time range filter
    const chartTimeRange = document.getElementById('chartTimeRange');
    if (chartTimeRange) {
        chartTimeRange.addEventListener('change', (e) => {
            updateChartData(e.target.value);
        });
    }

    // Add smooth animations to cards
    addCardAnimations();
    
    // Initialize smart notifications
    initializeSmartNotifications();
});

// Add smooth animations to cards
function addCardAnimations() {
    const cards = document.querySelectorAll('.status-card, .config-card, .prediction-card, .optimization-card, .weather-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Initialize smart notifications
function initializeSmartNotifications() {
    // Simulate smart notifications based on system conditions
    setTimeout(() => {
        showSmartNotification('Battery optimization recommended during peak sun hours', 'info');
    }, 10000);
    
    setTimeout(() => {
        showSmartNotification('Weather forecast predicts 20% increase in solar production tomorrow', 'success');
    }, 15000);
}

// Show smart notification
function showSmartNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `smart-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-primary);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-lg);
        padding: var(--spacing-md);
        box-shadow: 0 8px 25px var(--shadow);
        z-index: 1000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function updateChartData(timeRange) {
    if (!productionChartInstance) return;

    let labels;
    let dataPoints;

    switch (timeRange) {
        case '7days':
            labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
            dataPoints = 7;
            break;
        case '30days':
            labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            dataPoints = 4;
            break;
        case 'today':
        default:
            labels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'];
            dataPoints = 6;
            break;
    }

    productionChartInstance.data.labels = labels;
    productionChartInstance.data.datasets.forEach(dataset => {
        dataset.data = Array.from({ length: dataPoints }, () => Math.random() * 10);
    });

    productionChartInstance.update();
}