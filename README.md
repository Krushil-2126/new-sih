# EnergyGrid Pro - Advanced Smart Energy Management System

A modern, feature-rich energy management dashboard with AI-powered insights, real-time monitoring, and comprehensive analytics.

## 🚀 Features

### ✨ Modern Design
- **Dark/Light Theme Support** - Toggle between themes with persistent storage
- **Glassmorphism UI** - Modern glass-like design with backdrop blur effects
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Smooth Animations** - Card animations, hover effects, and transitions
- **Gradient Color Scheme** - Modern color palette with energy-themed gradients

### 🧠 AI-Powered Features
- **Energy Forecasting** - AI predictions for next 24h production
- **Smart Optimization** - Battery strategy and grid export optimization
- **Weather Integration** - Real-time weather data and solar irradiance
- **Performance Analytics** - Advanced efficiency metrics and cost analysis

### 📊 Advanced Data Visualization
- **Interactive Charts** - Production, consumption, efficiency, and cost charts
- **Weather Correlation** - Weather impact on solar production
- **Timeline Analytics** - Historical data with multiple time ranges
- **Real-time Updates** - Live data updates every 5 seconds

### 🔔 Smart Notifications
- **Contextual Alerts** - Battery optimization and weather predictions
- **Push Notifications** - Real-time system alerts
- **Smart Recommendations** - AI-driven energy optimization tips

### 📱 Mobile-First Design
- **Touch-Friendly Interface** - Optimized for mobile interactions
- **Collapsible Sidebar** - Full-screen mobile navigation
- **Responsive Charts** - Charts adapt to screen size
- **Mobile Notifications** - Touch-optimized notification system

### 📈 Data Management
- **Historical Data** - Comprehensive data history with filtering
- **Export Features** - CSV, JSON, and PDF export options
- **Pagination** - Efficient data browsing
- **Real-time Sync** - Live data synchronization

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Charts**: Chart.js with advanced configurations
- **Icons**: Font Awesome 6.4.0
- **Styling**: CSS Custom Properties, Flexbox, Grid
- **Animations**: CSS Transitions and Keyframes
- **Responsive**: Mobile-first CSS approach

## 📁 Project Structure

```
krushil/
├── assets/
│   └── logo.png
├── pages/
│   ├── dashboard.html      # Asset management page
│   ├── data-history.html   # Advanced analytics page
│   ├── profile.html        # User profile page
│   └── settings.html       # System settings page
├── scripts/
│   ├── main.js            # Core functionality & theme management
│   ├── dashboard.js       # Dashboard features & AI predictions
│   ├── data-history.js    # Data visualization & analytics
│   ├── profile.js         # User profile management
│   └── settings.js        # System configuration
├── styles/
│   ├── main.css           # Core styles & theme variables
│   ├── dashboard.css      # Dashboard-specific styles
│   └── responsive.css     # Mobile responsiveness
├── index.html             # Main dashboard page
└── README.md              # Project documentation
```

## 🎨 Design System

### Color Palette
- **Primary**: Slate dark (#0f172a)
- **Secondary**: Slate medium (#1e293b)
- **Accent**: Blue professional (#3b82f6)
- **Success**: Emerald green (#10b981)
- **Warning**: Amber (#f59e0b)
- **Energy Colors**: Solar (amber), Wind (cyan), Battery (purple), Grid (red)

### Typography
- **Font Family**: Segoe UI, system fonts
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- **Sizes**: Responsive scaling from 0.8rem to 1.8rem

### Spacing System
- **XS**: 0.25rem (4px)
- **SM**: 0.5rem (8px)
- **MD**: 1rem (16px)
- **LG**: 1.5rem (24px)
- **XL**: 2rem (32px)
- **2XL**: 3rem (48px)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd krushil
   ```

2. **Open in browser**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Or simply open index.html in your browser
   ```

3. **Access the application**
   - Main Dashboard: `http://localhost:8000`
   - Asset Management: `http://localhost:8000/pages/dashboard.html`
   - Data History: `http://localhost:8000/pages/data-history.html`

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: 480px - 767px
- **Small Mobile**: Below 480px

## 🔧 Customization

### Theme Customization
Edit CSS custom properties in `styles/main.css`:
```css
:root {
    --primary: #0f172a;
    --secondary: #1e293b;
    --accent: #3b82f6;
    /* ... more variables */
}
```

### Adding New Features
1. Add HTML structure in respective page files
2. Style with CSS using the design system
3. Add JavaScript functionality
4. Update responsive styles if needed

## 📊 Performance Features

- **Lazy Loading**: Charts and data load on demand
- **Efficient Updates**: Real-time data updates without page refresh
- **Optimized Animations**: Hardware-accelerated CSS transitions
- **Responsive Images**: Optimized for different screen sizes

## 🔒 Security Features

- **Input Validation**: Form inputs are validated
- **XSS Protection**: Content sanitization
- **Theme Persistence**: Secure localStorage usage
- **API Key Management**: Secure API key handling

## 🌟 Advanced Features

### AI Predictions
- Machine learning-based energy forecasting
- Weather pattern analysis
- Optimization recommendations
- Cost savings predictions

### Real-time Monitoring
- Live energy flow visualization
- Equipment status tracking
- Performance metrics
- Alert system

### Data Analytics
- Historical trend analysis
- Comparative performance metrics
- Weather correlation studies
- Cost-benefit analysis

## 📈 Future Enhancements

- [ ] Machine learning model integration
- [ ] IoT device connectivity
- [ ] Advanced reporting system
- [ ] Multi-language support
- [ ] Offline functionality
- [ ] Progressive Web App (PWA) features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Chart.js for powerful data visualization
- Font Awesome for beautiful icons
- Modern CSS techniques and best practices
- Energy industry standards and guidelines

---

**EnergyGrid Pro** - Empowering smart energy management with cutting-edge technology and intuitive design.
