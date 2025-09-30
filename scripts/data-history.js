 // Data History JavaScript
let dhState = {
  raw: [],
  filtered: [],
  page: 1,
  pageSize: 10,
  totalPages: 1,
  currentView: 'timeline',
  live: true,
  lastUpdatedIso: null,
  map: null,
  mapMarkers: [],
  weatherApiKey: null,
  charts: {
    timeline: null,
    efficiency: null,
    cost: null,
    weatherCorrelation: null,
  },
};

// Static cities for geocoding without API
const cities = {
  "new york": { lat: 40.7128, lon: -74.0060 },
  "london": { lat: 51.5074, lon: -0.1278 },
  "tokyo": { lat: 35.6762, lon: 139.6503 },
  "paris": { lat: 48.8566, lon: 2.3522 },
  "mumbai": { lat: 19.0760, lon: 72.8777 },
  "sydney": { lat: -33.8688, lon: 151.2093 },
  "berlin": { lat: 52.5200, lon: 13.4050 },
  "moscow": { lat: 55.7558, lon: 37.6173 },
  "beijing": { lat: 39.9042, lon: 116.4074 },
  "cairo": { lat: 30.0444, lon: 31.2357 },
  "delhi": { lat: 28.7041, lon: 77.1025 },
  "shanghai": { lat: 31.2304, lon: 121.4737 },
  "sao paulo": { lat: -23.5505, lon: -46.6333 },
  "mexico city": { lat: 19.4326, lon: -99.1332 },
  "dhaka": { lat: 23.8103, lon: 90.4125 },
  "osaka": { lat: 34.6937, lon: 135.5023 },
  "karachi": { lat: 24.8607, lon: 67.0011 },
  "chongqing": { lat: 29.4316, lon: 106.9123 },
  "istanbul": { lat: 41.0082, lon: 28.9784 },
  "buenos aires": { lat: -34.6118, lon: -58.3960 },
  "kolkata": { lat: 22.5726, lon: 88.3639 },
  "manila": { lat: 14.5995, lon: 120.9842 },
  "lagos": { lat: 6.5244, lon: 3.3792 },
  "rio de janeiro": { lat: -22.9068, lon: -43.1729 },
  "tianjin": { lat: 39.3434, lon: 117.3616 },
  "kinshasa": { lat: -4.4419, lon: 15.2663 },
  "guangzhou": { lat: 23.1291, lon: 113.2644 },
  "los angeles": { lat: 34.0522, lon: -118.2437 },
  "moscow": { lat: 55.7558, lon: 37.6173 },
  "shenzhen": { lat: 22.3193, lon: 114.1694 },
  "lahore": { lat: 31.5497, lon: 74.3436 },
  "bangalore": { lat: 12.9716, lon: 77.5946 },
  "jakarta": { lat: -6.2088, lon: 106.8456 },
  "chennai": { lat: 13.0827, lon: 80.2707 },
  "limpopo": { lat: -23.4013, lon: 29.4179 },
  "bangkok": { lat: 13.7563, lon: 100.5018 },
  "seoul": { lat: 37.5665, lon: 126.9780 },
  "nagoya": { lat: 35.1815, lon: 136.9066 },
  "hyderabad": { lat: 17.3850, lon: 78.4867 },
  "london": { lat: 51.5074, lon: -0.1278 },
  "tehran": { lat: 35.6892, lon: 51.3890 },
  "chicago": { lat: 41.8781, lon: -87.6298 },
  "chengdu": { lat: 30.5728, lon: 104.0668 },
  "nanjing": { lat: 32.0603, lon: 118.7969 },
  "wuhan": { lat: 30.5928, lon: 114.3055 },
  "ho chi minh city": { lat: 10.8231, lon: 106.6297 },
  "luanda": { lat: -8.8390, lon: 13.2894 },
  "ahmedabad": { lat: 23.0225, lon: 72.5714 },
  "kuala lumpur": { lat: 3.1390, lon: 101.6869 },
  "xi'an": { lat: 34.3416, lon: 108.9398 },
  "hong kong": { lat: 22.3193, lon: 114.1694 },
  "dongguan": { lat: 23.0205, lon: 113.7518 },
  "hangzhou": { lat: 30.2741, lon: 120.1551 },
  "foshan": { lat: 23.0215, lon: 113.1214 },
  "shenyang": { lat: 41.8057, lon: 123.4315 },
  "riyadh": { lat: 24.7136, lon: 46.6753 },
  "baghdad": { lat: 33.3152, lon: 44.3661 },
  "santiago": { lat: -33.4489, lon: -70.6693 },
  "surat": { lat: 21.1702, lon: 72.8311 },
  "madrid": { lat: 40.4168, lon: -3.7038 },
  "suzhou": { lat: 31.2989, lon: 120.5853 },
  "pune": { lat: 18.5204, lon: 73.8567 },
  "harbin": { lat: 45.8038, lon: 126.5340 },
  "houston": { lat: 29.7604, lon: -95.3698 },
  "dallas": { lat: 32.7767, lon: -96.7970 },
  "toronto": { lat: 43.6532, lon: -79.3832 },
  "miami": { lat: 25.7617, lon: -80.1918 },
  "singapore": { lat: 1.3521, lon: 103.8198 },
  "philadelphia": { lat: 39.9526, lon: -75.1652 },
  "atlanta": { lat: 33.7490, lon: -84.3880 },
  "fukuoka": { lat: 33.5904, lon: 130.4017 },
  "khartoum": { lat: 15.5007, lon: 32.5599 },
  "barcelona": { lat: 41.3851, lon: 2.1734 },
  "johannesburg": { lat: -26.2041, lon: 28.0473 },
  "saint petersburg": { lat: 59.9343, lon: 30.3351 },
  "qingdao": { lat: 36.0671, lon: 120.3826 },
  "dalian": { lat: 38.9140, lon: 121.6147 },
  "zhanjiang": { lat: 21.2707, lon: 110.3593 },
  "wuxi": { lat: 31.4912, lon: 120.3119 },
  "xian": { lat: 34.3416, lon: 108.9398 },
  "yokohama": { lat: 35.4437, lon: 139.6380 },
  "washington": { lat: 38.9072, lon: -77.0369 },
  "boston": { lat: 42.3601, lon: -71.0589 },
  "detroit": { lat: 42.3314, lon: -83.0458 },
  "phoenix": { lat: 33.4484, lon: -112.0740 },
  "seattle": { lat: 47.6062, lon: -122.3321 },
  "san diego": { lat: 32.7157, lon: -117.1611 },
  "san antonio": { lat: 29.4241, lon: -98.4936 },
  "san jose": { lat: 37.3382, lon: -121.8863 },
  "indianapolis": { lat: 39.7684, lon: -86.1581 },
  "jacksonville": { lat: 30.3322, lon: -81.6557 },
  "san francisco": { lat: 37.7749, lon: -122.4194 },
  "columbus": { lat: 39.9612, lon: -82.9988 },
  "fort worth": { lat: 32.7555, lon: -97.3308 },
  "charlotte": { lat: 35.2271, lon: -80.8431 },
  "memphis": { lat: 35.1495, lon: -90.0490 },
  "baltimore": { lat: 39.2904, lon: -76.6122 },
  "el paso": { lat: 31.7619, lon: -106.4850 },
  "denver": { lat: 39.7392, lon: -104.9903 },
  "nashville": { lat: 36.1627, lon: -86.7816 },
  "louisville": { lat: 38.2527, lon: -85.7585 },
  "milwaukee": { lat: 43.0389, lon: -87.9065 },
  "portland": { lat: 45.5152, lon: -122.6784 },
  "tucson": { lat: 32.2226, lon: -110.9747 },
  "fresno": { lat: 36.7378, lon: -119.7871 },
  "sacramento": { lat: 38.5816, lon: -121.4944 },
  "mesa": { lat: 33.4152, lon: -111.8315 },
  "kansas city": { lat: 39.0997, lon: -94.5786 },
  "atlanta": { lat: 33.7490, lon: -84.3880 },
  "long beach": { lat: 33.7701, lon: -118.1937 },
  "colorado springs": { lat: 38.8339, lon: -104.8214 },
  "raleigh": { lat: 35.7796, lon: -78.6382 },
  "omaha": { lat: 41.2565, lon: -95.9345 },
  "miami": { lat: 25.7617, lon: -80.1918 },
  "oakland": { lat: 37.8044, lon: -122.2711 },
  "minneapolis": { lat: 44.9778, lon: -93.2650 },
  "tulsa": { lat: 36.1540, lon: -95.9928 },
  "arlington": { lat: 32.7357, lon: -97.1081 },
  "tampa": { lat: 27.9506, lon: -82.4572 },
  "new orleans": { lat: 30.0687, lon: -89.9288 },
  "wichita": { lat: 37.6872, lon: -97.3301 },
  "bakersfield": { lat: 35.3733, lon: -119.0187 },
  "cleveland": { lat: 41.4993, lon: -81.6944 },
  "aurora": { lat: 39.7294, lon: -104.8319 },
  "anaheim": { lat: 33.8366, lon: -117.9143 },
  "honolulu": { lat: 21.3069, lon: -157.8583 },
  "corpus christi": { lat: 27.8006, lon: -97.3964 },
  "riverside": { lat: 33.9806, lon: -117.3755 },
  "lexington": { lat: 38.0406, lon: -84.5037 },
  "stockton": { lat: 37.9577, lon: -121.2908 },
  "henderson": { lat: 36.0395, lon: -114.9817 },
  "saint paul": { lat: 44.9537, lon: -93.0900 },
  "st. louis": { lat: 38.6270, lon: -90.1994 },
  "cincinnati": { lat: 39.1031, lon: -84.5120 },
  "pittsburgh": { lat: 40.4406, lon: -79.9959 },
  "greensboro": { lat: 36.0726, lon: -79.7920 },
  "anchorage": { lat: 61.2181, lon: -149.9003 },
  "plano": { lat: 33.0198, lon: -96.6989 },
  "lincoln": { lat: 40.8136, lon: -96.7026 },
  "orlando": { lat: 28.5383, lon: -81.3792 },
  "irvine": { lat: 33.6846, lon: -117.8265 },
  "newark": { lat: 40.7357, lon: -74.1724 },
  "durham": { lat: 35.9940, lon: -78.8986 },
  "chula vista": { lat: 32.6401, lon: -117.0842 },
  "toledo": { lat: 41.6639, lon: -83.5552 },
  "fort wayne": { lat: 41.0793, lon: -85.1394 },
  "st. petersburg": { lat: 27.7676, lon: -82.6403 },
  "laredo": { lat: 27.5064, lon: -99.5075 },
  "jersey city": { lat: 40.7178, lon: -74.0431 },
  "chandler": { lat: 33.3062, lon: -111.8413 },
  "madison": { lat: 43.0731, lon: -89.4012 },
  "lubbock": { lat: 33.5779, lon: -101.8552 },
  "scottsdale": { lat: 33.4942, lon: -111.9261 },
  "reno": { lat: 39.5296, lon: -119.8138 },
  "buffalo": { lat: 42.8864, lon: -78.8784 },
  "gilbert": { lat: 33.3528, lon: -111.7890 },
  "glendale": { lat: 33.5387, lon: -112.1859 },
  "winston-salem": { lat: 36.0999, lon: -80.2442 },
  "chesapeake": { lat: 36.7682, lon: -76.2875 },
  "norfolk": { lat: 36.8508, lon: -76.2859 },
  "fremont": { lat: 37.5483, lon: -121.9886 },
  "garland": { lat: 32.9126, lon: -96.6389 },
  "irving": { lat: 32.8140, lon: -96.9489 },
  "hialeah": { lat: 25.8576, lon: -80.2781 },
  "richmond": { lat: 37.5407, lon: -77.4360 },
  "boise": { lat: 43.6150, lon: -114.2100 },
  "spokane": { lat: 47.6587, lon: -117.4260 },
  "baton rouge": { lat: 30.4515, lon: -91.1871 },
  "wichita": { lat: 37.6872, lon: -97.3301 },
  "birmingham": { lat: 33.5186, lon: -86.8104 },
  "montgomery": { lat: 32.3792, lon: -86.3077 },
  "des moines": { lat: 41.5868, lon: -93.6250 },
  "grand rapids": { lat: 42.9634, lon: -85.6681 },
  "mobile": { lat: 30.6944, lon: -88.0431 },
  "little rock": { lat: 34.7465, lon: -92.2896 },
  "providence": { lat: 41.8240, lon: -71.4128 },
  "salt lake city": { lat: 40.7608, lon: -111.8910 },
  "knoxville": { lat: 35.9606, lon: -83.9207 },
  "huntsville": { lat: 34.7304, lon: -86.5861 },
  "worcester": { lat: 42.2626, lon: -71.8023 },
  "new haven": { lat: 41.3083, lon: -72.9279 },
  "brownsville": { lat: 25.9018, lon: -97.4975 },
  "jackson": { lat: 32.2988, lon: -90.1848 },
  "fort lauderdale": { lat: 26.1224, lon: -80.1373 },
  "hartford": { lat: 41.7658, lon: -72.6734 },
  "bridgeport": { lat: 41.1865, lon: -73.1952 },
  "tallahassee": { lat: 30.4518, lon: -84.2807 },
  "springfield": { lat: 39.7817, lon: -89.6501 },
  "alexandria": { lat: 38.8048, lon: -77.0469 },
  "paterson": { lat: 40.9168, lon: -74.1718 },
  "lakewood": { lat: 39.7047, lon: -105.0814 },
  "syracuse": { lat: 43.0481, lon: -76.1474 },
  "mesquite": { lat: 32.7668, lon: -96.5992 },
  "savannah": { lat: 32.0809, lon: -81.0912 },
  "dayton": { lat: 39.7589, lon: -84.1916 },
  "rockford": { lat: 42.2711, lon: -89.0940 },
  "pomona": { lat: 34.0551, lon: -117.7490 },
  "joliet": { lat: 41.5250, lon: -88.0817 },
  "naperville": { lat: 41.7508, lon: -88.1535 },
  "pasadena": { lat: 34.1478, lon: -118.1445 },
  "hayward": { lat: 37.6688, lon: -122.0808 },
  "jacksonville": { lat: 30.3322, lon: -81.6557 },
  "escondido": { lat: 33.1192, lon: -117.0864 },
  "sunnyvale": { lat: 37.3688, lon: -122.0363 },
  "kansas city": { lat: 39.0997, lon: -94.5786 },
  "bridgeport": { lat: 41.1865, lon: -73.1952 },
  "lakewood": { lat: 39.7047, lon: -105.0814 },
  "hollywood": { lat: 26.0112, lon: -80.1495 },
  "paterson": { lat: 40.9168, lon: -74.1718 },
  "naperville": { lat: 41.7508, lon: -88.1535 },
  "syracuse": { lat: 43.0481, lon: -76.1474 },
  "mesquite": { lat: 32.7668, lon: -96.5992 },
  "dayton": { lat: 39.7589, lon: -84.1916 },
  "joliet": { lat: 41.5250, lon: -88.0817 },
  "pomona": { lat: 34.0551, lon: -117.7490 },
  "escondido": { lat: 33.1192, lon: -117.0864 },
  "sunnyvale": { lat: 37.3688, lon: -122.0363 },
  "torrance": { lat: 33.8358, lon: -118.3406 },
  "bridgeport": { lat: 41.1865, lon: -73.1952 },
  "pasadena": { lat: 34.1478, lon: -118.1445 },
  "orange": { lat: 33.7879, lon: -117.8531 },
  "fullerton": { lat: 33.8704, lon: -117.9242 },
  "thousand oaks": { lat: 34.1706, lon: -118.8376 },
  "flint": { lat: 43.0125, lon: -83.6875 },
  "beaumont": { lat: 30.0802, lon: -94.1266 },
  "grand prairie": { lat: 32.7459, lon: -96.9974 },
  "west valley city": { lat: 40.6916, lon: -112.0011 },
  "hampton": { lat: 37.0299, lon: -76.3452 },
  "mcallen": { lat: 26.2034, lon: -98.2300 },
  "warren": { lat: 42.5145, lon: -83.0147 },
  "bellevue": { lat: 47.6104, lon: -122.2007 },
  "huntsville": { lat: 34.7304, lon: -86.5861 },
  "roseville": { lat: 38.7521, lon: -121.2880 },
  "salem": { lat: 44.9429, lon: -123.0351 },
  "killeen": { lat: 31.1171, lon: -97.7278 },
  "coral springs": { lat: 26.2712, lon: -80.2706 },
  "round rock": { lat: 30.5083, lon: -97.6789 },
  "york": { lat: 39.9626, lon: -76.7277 },
  "sterling heights": { lat: 42.5803, lon: -83.0302 },
  "baytown": { lat: 29.7355, lon: -94.9774 },
  "pompano beach": { lat: 26.2379, lon: -80.1248 },
  "burbank": { lat: 34.1808, lon: -118.3090 },
  "green bay": { lat: 44.5192, lon: -88.0198 },
  "west jordan": { lat: 40.6097, lon: -111.9391 },
  "richmond": { lat: 37.5407, lon: -77.4360 },
  "college station": { lat: 30.6279, lon: -96.3344 },
  "kent": { lat: 47.3809, lon: -122.2348 },
  "lake charles": { lat: 30.2266, lon: -93.2174 },
  "davenport": { lat: 41.5236, lon: -90.5776 },
  "san mateo": { lat: 37.5629, lon: -122.3255 },
  "lewisville": { lat: 33.0462, lon: -96.9942 },
  "sanford": { lat: 28.8029, lon: -81.2695 },
  "waco": { lat: 31.5493, lon: -97.1467 },
  "kennewick": { lat: 46.2112, lon: -119.1372 },
  "carrollton": { lat: 32.9756, lon: -96.8899 },
  "denton": { lat: 33.2148, lon: -97.1331 },
  "surprise": { lat: 33.6292, lon: -112.3679 },
  "roseville": { lat: 38.7521, lon: -121.2880 },
  "thornton": { lat: 39.8680, lon: -104.9719 },
  "miramar": { lat: 25.9861, lon: -80.3036 },
  "pasadena": { lat: 34.1478, lon: -118.1445 },
  "mesquite": { lat: 32.7668, lon: -96.5992 },
  "olathe": { lat: 38.8814, lon: -94.8191 },
  "daytona beach": { lat: 29.2108, lon: -81.0228 },
  "alexandria": { lat: 38.8048, lon: -77.0469 },
  "tulsa": { lat: 36.1540, lon: -95.9928 },
  "oceanside": { lat: 33.1959, lon: -117.3795 },
  "wichita falls": { lat: 33.9137, lon: -98.4934 },
  "clarksville": { lat: 36.5298, lon: -87.3595 },
  "jacksonville": { lat: 30.3322, lon: -81.6557 },
  "palm bay": { lat: 28.0345, lon: -80.5887 },
  "providence": { lat: 41.8240, lon: -71.4128 },
  "paterson": { lat: 40.9168, lon: -74.1718 },
  "joliet": { lat: 41.5250, lon: -88.0817 },
  "bridgeport": { lat: 41.1865, lon: -73.1952 },
  "irving": { lat: 32.8140, lon: -96.9489 },
  "sunnyvale": { lat: 37.3688, lon: -122.0363 },
  "naperville": { lat: 41.7508, lon: -88.1535 },
  "escondido": { lat: 33.1192, lon: -117.0864 },
  "savannah": { lat: 32.0809, lon: -81.0912 },
  "mesquite": { lat: 32.7668, lon: -96.5992 },
  "pasadena": { lat: 34.1478, lon: -118.1445 },
  "fullerton": { lat: 33.8704, lon: -117.9242 },
  "orange": { lat: 33.7879, lon: -117.8531 },
  "thousand oaks": { lat: 34.1706, lon: -118.8376 },
  "warren": { lat: 42.5145, lon: -83.0147 },
  "huntsville": { lat: 34.7304, lon: -86.5861 },
  "roseville": { lat: 38.7521, lon: -121.2880 },
  "salem": { lat: 44.9429, lon: -123.0351 },
  "killeen": { lat: 31.1171, lon: -97.7278 },
  "coral springs": { lat: 26.2712, lon: -80.2706 },
  "round rock": { lat: 30.5083, lon: -97.6789 },
  "york": { lat: 39.9626, lon: -76.7277 },
  "sterling heights": { lat: 42.5803, lon: -83.0302 },
  "baytown": { lat: 29.7355, lon: -94.9774 },
  "pompano beach": { lat: 26.2379, lon: -80.1248 },
  "burbank": { lat: 34.1808, lon: -118.3090 },
  "green bay": { lat: 44.5192, lon: -88.0198 },
  "west jordan": { lat: 40.6097, lon: -111.9391 },
  "richmond": { lat: 37.5407, lon: -77.4360 },
  "college station": { lat: 30.6279, lon: -96.3344 },
  "kent": { lat: 47.3809, lon: -122.2348 },
  "lake charles": { lat: 30.2266, lon: -93.2174 },
  "davenport": { lat: 41.5236, lon: -90.5776 },
  "san mateo": { lat: 37.5629, lon: -122.3255 },
  "lewisville": { lat: 33.0462, lon: -96.9942 },
  "sanford": { lat: 28.8029, lon: -81.2695 },
  "waco": { lat: 31.5493, lon: -97.1467 },
  "kennewick": { lat: 46.2112, lon: -119.1372 },
  "carrollton": { lat: 32.9756, lon: -96.8899 },
  "denton": { lat: 33.2148, lon: -97.1331 },
  "surprise": { lat: 33.6292, lon: -112.3679 },
  "roseville": { lat: 38.7521, lon: -121.2880 },
  "thornton": { lat: 39.8680, lon: -104.9719 },
  "miramar": { lat: 25.9861, lon: -80.3036 },
  "pasadena": { lat: 34.1478, lon: -118.1445 },
  "mesquite": { lat: 32.7668, lon: -96.5992 },
  "olathe": { lat: 38.8814, lon: -94.8191 },
  "daytona beach": { lat: 29.2108, lon: -81.0228 },
  "alexandria": { lat: 38.8048, lon: -77.0469 },
  "tulsa": { lat: 36.1540, lon: -95.9928 },
  "oceanside": { lat: 33.1959, lon: -117.3795 },
  "wichita falls": { lat: 33.9137, lon: -98.4934 },
  "clarksville": { lat: 36.5298, lon: -87.3595 },
  "jacksonville": { lat: 30.3322, lon: -81.6557 },
  "palm bay": { lat: 28.0345, lon: -80.5887 },
  "providence": { lat: 41.8240, lon: -71.4128 },
  "paterson": { lat: 40.9168, lon: -74.1718 },
  "joliet": { lat: 41.5250, lon: -88.0817 },
  "bridgeport": { lat: 41.1865, lon: -73.1952 },
  "irving": { lat: 32.8140, lon: -96.9489 },
  "sunnyvale": { lat: 37.3688, lon: -122.0363 },
  "naperville": { lat: 41.7508, lon: -88.1535 },
  "escondido": { lat: 33.1192, lon: -117.0864 },
  "savannah": { lat: 32.0809, lon: -81.0912 },
  "mesquite": { lat: 32.7668, lon: -96.5992 },
  "pasadena": { lat: 34.1478, lon: -118.1445 },
  "fullerton": { lat: 33.8704, lon: -117.9242 },
  "orange": { lat: 33.7879, lon: -117.8531 },
  "thousand oaks": { lat: 34.1706, lon: -118.8376 },
  "warren": { lat: 42.5145, lon: -83.0147 },
  "huntsville": { lat: 34.7304, lon: -86.5861 },
  "roseville": { lat: 38.7521, lon: -121.2880 },
  "salem": { lat: 44.9429, lon: -123.0351 },
  "killeen": { lat: 31.1171, lon: -97.7278 },
  "coral springs": { lat: 26.2712, lon: -80.2706 },
  "round rock": { lat: 30.5083, lon: -97.6789 },
  "york": { lat: 39.9626, lon: -76.7277 },
  "sterling heights": { lat: 42.5803, lon: -83.0302 },
  "baytown": { lat: 29.7355, lon: -94.9774 },
  "pompano beach": { lat: 26.2379, lon: -80.1248 },
  "burbank": { lat: 34.1808, lon: -118.3090 },
  "green bay": { lat: 44.5192, lon: -88.0198 },
  "west jordan": { lat: 40.6097, lon: -111.9391 },
}

function readLocalHistory() {
  try {
    const saved = localStorage.getItem('smartMeterData');
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    const arr = Array.isArray(parsed?.history) ? parsed.history : [];
    // Normalize records and ensure timestamp Date objects
    return arr
      .map((r) => ({
        timestamp: r.timestamp || r.time || new Date().toISOString(),
        solar: Number(r.solar ?? 0),
        wind: Number(r.wind ?? 0),
        consumption: Number(r.consumption ?? 0),
        gridImport: Number(r.gridImport ?? 0),
        batteryLevel: Number(r.batteryLevel ?? 0),
        efficiency: Number(r.efficiency ?? 0),
      }))
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  } catch (e) {
    console.error('Failed to read smartMeterData from localStorage', e);
    return [];
  }
}

function applyFilters() {
  const dateRange = document.getElementById('dateRange')?.value || '30days';
  const dataType = document.getElementById('dataType')?.value || 'all';

  const now = new Date();
  let from = null;
  switch (dateRange) {
    case 'today':
      from = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case '7days':
      from = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case '30days':
      from = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      break;
    case '90days':
      from = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      break;
    default:
      from = null; // custom range hook (not implemented)
  }

  let filtered = dhState.raw;
  if (from) {
    filtered = filtered.filter((r) => new Date(r.timestamp) >= from);
  }

  // dataType filter can be used to decide which series to show; keep rows intact
  dhState.filtered = filtered;
  dhState.totalPages = Math.max(1, Math.ceil(filtered.length / dhState.pageSize));
  dhState.page = Math.min(dhState.page, dhState.totalPages);
}

function datasetVisibilityForType(dataType) {
  return {
    solar: dataType === 'all' || dataType === 'production',
    wind: dataType === 'all' || dataType === 'production',
    consumption: dataType === 'all' || dataType === 'consumption',
    efficiency: dataType === 'all' || dataType === 'efficiency',
  };
}

function buildTimelineChart() {
  const ctx = document.getElementById('timelineChart');
  if (!ctx) return;
  const dataType = document.getElementById('dataType')?.value || 'all';
  const vis = datasetVisibilityForType(dataType);

  const labels = dhState.filtered.map((r) => new Date(r.timestamp));
  const datasets = [];
  if (vis.solar) datasets.push({ label: 'Solar (kW)', data: dhState.filtered.map((r) => r.solar), borderColor: '#f59e0b', backgroundColor: 'rgba(245,158,11,0.1)', tension: 0.35 });
  if (vis.wind) datasets.push({ label: 'Wind (kW)', data: dhState.filtered.map((r) => r.wind), borderColor: '#06b6d4', backgroundColor: 'rgba(6,182,212,0.1)', tension: 0.35 });
  if (vis.consumption) datasets.push({ label: 'Consumption (kW)', data: dhState.filtered.map((r) => r.consumption), borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.1)', tension: 0.35 });

  if (dhState.charts.timeline) dhState.charts.timeline.destroy();
  dhState.charts.timeline = new Chart(ctx, {
    type: 'line',
    data: { labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      parsing: false,
      scales: {
        x: { type: 'time', time: { unit: 'hour', displayFormats: { hour: 'MMM d, HH:mm', minute: 'MMM d, HH:mm', second: 'MMM d, HH:mm:ss' } } },
        y: { beginAtZero: true, title: { display: true, text: 'kW' } },
      },
      plugins: {
        title: { display: true, text: 'Production & Consumption Over Time' },
        tooltip: {
          callbacks: {
            title: (items) => {
              const ts = items?.[0]?.parsed?.x;
              const d = ts ? new Date(ts) : null;
              return d ? d.toLocaleString() : '';
            },
          },
        },
      },
    },
  });
}

function buildEfficiencyChart() {
  const ctx = document.getElementById('efficiencyChart');
  if (!ctx) return;
  const labels = dhState.filtered.map((r) => new Date(r.timestamp));
  const data = dhState.filtered.map((r) => r.efficiency || 0);

  if (dhState.charts.efficiency) dhState.charts.efficiency.destroy();
  dhState.charts.efficiency = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: 'Efficiency (%)', data, backgroundColor: 'rgba(16,185,129,0.7)', borderColor: '#10b981', borderWidth: 1 },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { type: 'time', time: { unit: 'hour', displayFormats: { hour: 'MMM d, HH:mm', minute: 'MMM d, HH:mm' } } },
        y: { beginAtZero: true, max: 100, title: { display: true, text: '%' } },
      },
      plugins: {
        title: { display: true, text: 'System Efficiency' },
        legend: { display: false },
        tooltip: {
          callbacks: {
            title: (items) => {
              const ts = items?.[0]?.parsed?.x;
              const d = ts ? new Date(ts) : null;
              return d ? d.toLocaleString() : '';
            },
          },
        },
      },
    },
  });
}

function buildCostChart() {
  const ctx = document.getElementById('costChart');
  if (!ctx) return;
  // Simple tariff model: import cost = 8/unit, production value (export) = 4/unit
  const importRate = 8; // arbitrary units
  const exportRate = 4;
  const labels = dhState.filtered.map((r) => new Date(r.timestamp));
  const cost = dhState.filtered.map((r) => Math.max(0, r.gridImport) * importRate);
  const savings = dhState.filtered.map((r) => Math.max(0, r.solar + r.wind - r.consumption) * exportRate);

  if (dhState.charts.cost) dhState.charts.cost.destroy();
  dhState.charts.cost = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        { label: 'Import Cost', data: cost, borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.1)', tension: 0.35 },
        { label: 'Export Savings', data: savings, borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.1)', tension: 0.35 },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { x: { type: 'time', time: { unit: 'hour', displayFormats: { hour: 'MMM d, HH:mm' } } }, y: { beginAtZero: true } },
      plugins: {
        title: { display: true, text: 'Cost & Savings Trend' },
        tooltip: {
          callbacks: {
            title: (items) => {
              const ts = items?.[0]?.parsed?.x;
              const d = ts ? new Date(ts) : null;
              return d ? d.toLocaleString() : '';
            },
          },
        },
      },
    },
  });
}

function buildWeatherCorrelationChart() {
  const ctx = document.getElementById('weatherCorrelationChart');
  if (!ctx) return;
  // Proxy for weather correlation: scatter solar irradiance proxy (solar output) vs efficiency
  const points = dhState.filtered.map((r) => ({ x: r.solar, y: r.efficiency }));

  if (dhState.charts.weatherCorrelation) dhState.charts.weatherCorrelation.destroy();
  dhState.charts.weatherCorrelation = new Chart(ctx, {
    type: 'scatter',
    data: {
      datasets: [
        { label: 'Solar vs Efficiency', data: points, backgroundColor: 'rgba(245,158,11,0.6)', borderColor: '#f59e0b' },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { title: { display: true, text: 'Solar (kW)' } },
        y: { title: { display: true, text: 'Efficiency (%)' }, min: 0, max: 100 },
      },
      plugins: { title: { display: true, text: 'Weather Correlation (Proxy)' } },
    },
  });
}

function populateTable() {
  const tbody = document.getElementById('dataTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  const start = (dhState.page - 1) * dhState.pageSize;
  const slice = dhState.filtered.slice(start, start + dhState.pageSize);
  const rows = slice
    .map((r) => {
      const d = new Date(r.timestamp);
      const dateStr = d.toLocaleString([], { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
      return `<tr>
        <td>${dateStr}</td>
        <td>${r.solar.toFixed(2)}</td>
        <td>${r.wind.toFixed(2)}</td>
        <td>${r.consumption.toFixed(2)}</td>
        <td>${(r.efficiency || 0).toFixed(1)}</td>
        <td>${Math.max(0, r.gridImport * 8).toFixed(2)}</td>
        <td>${r.solar > 0 ? 'Sunny' : 'Night'}</td>
      </tr>`;
    })
    .join('');

  tbody.insertAdjacentHTML('beforeend', rows);

  const pageInfo = document.querySelector('.table-pagination .page-info');
  if (pageInfo) pageInfo.textContent = `Page ${dhState.page} of ${dhState.totalPages}`;
}

function renderAll() {
  applyFilters();
  buildTimelineChart();
  buildEfficiencyChart();
  buildCostChart();
  buildWeatherCorrelationChart();
  populateTable();
  updateKpis();
  updateLastUpdated();
}

function refreshData() {
  dhState.raw = readLocalHistory();
  renderAll();
}

function switchChartView(view) {
  dhState.currentView = view;
  // Optional: could toggle visibility of chart containers by CSS classes
}

function toggleLive() {
  dhState.live = !dhState.live;
  const btn = document.getElementById('liveToggleBtn');
  const indicator = document.getElementById('liveIndicator');
  if (btn) btn.innerHTML = dhState.live ? '<i class="fas fa-circle"></i> Pause Live' : '<i class="fas fa-play"></i> Resume Live';
  if (indicator) indicator.textContent = dhState.live ? 'Live' : 'Paused';
}

function updateLastUpdated() {
  const last = dhState.raw.length ? dhState.raw[dhState.raw.length - 1].timestamp : null;
  dhState.lastUpdatedIso = last || dhState.lastUpdatedIso;
  const el = document.getElementById('lastUpdated');
  if (el && dhState.lastUpdatedIso) {
    const d = new Date(dhState.lastUpdatedIso);
    el.textContent = `Updated: ${d.toLocaleString([], { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
  }
}

function setTimeZoneLabel() {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Local';
  const tzEl = document.getElementById('timeZoneLabel');
  const offsetMin = new Date().getTimezoneOffset();
  const sign = offsetMin <= 0 ? '+' : '-';
  const hh = String(Math.floor(Math.abs(offsetMin) / 60)).padStart(2, '0');
  const mm = String(Math.abs(offsetMin) % 60).padStart(2, '0');
  if (tzEl) tzEl.textContent = `Timezone: ${tz} (GMT${sign}${hh}:${mm})`;
}

function trendArrow(curr, prev) {
  if (prev == null) return '--';
  const delta = curr - prev;
  const pct = prev !== 0 ? (delta / prev) * 100 : 0;
  const icon = delta > 0 ? '▲' : (delta < 0 ? '▼' : '•');
  return `${icon} ${Math.abs(pct).toFixed(1)}%`;
}

function updateKpis() {
  const n = dhState.raw.length;
  const last = n ? dhState.raw[n - 1] : null;
  const prev = n > 1 ? dhState.raw[n - 2] : null;
  if (!last) return;
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('kpiSolar', `${(last.solar ?? 0).toFixed(2)} kW`);
  set('kpiWind', `${(last.wind ?? 0).toFixed(2)} kW`);
  set('kpiConsumption', `${(last.consumption ?? 0).toFixed(2)} kW`);
  set('kpiBattery', `${(last.batteryLevel ?? 0).toFixed(1)}%`);

  set('kpiSolarTrend', trendArrow(last.solar ?? 0, prev?.solar));
  set('kpiWindTrend', trendArrow(last.wind ?? 0, prev?.wind));
  set('kpiConsumptionTrend', trendArrow(last.consumption ?? 0, prev?.consumption));
  set('kpiBatteryTrend', trendArrow(last.batteryLevel ?? 0, prev?.batteryLevel));
}

function previousPage() {
  if (dhState.page > 1) {
    dhState.page -= 1;
    populateTable();
  }
}

function nextPage() {
  if (dhState.page < dhState.totalPages) {
    dhState.page += 1;
    populateTable();
  }
}

function exportData() {
  const format = document.getElementById('exportFormat')?.value || 'csv';
  const data = dhState.filtered;
  if (format === 'json') {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    downloadBlob(blob, `data-history-${Date.now()}.json`);
    return;
  }
  if (format === 'csv') {
    const headers = ['timestamp', 'solar', 'wind', 'consumption', 'gridImport', 'batteryLevel', 'efficiency'];
    const rows = data.map((r) => headers.map((h) => r[h]).join(','));
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    downloadBlob(blob, `data-history-${Date.now()}.csv`);
    return;
  }
  if (format === 'pdf') {
    alert('PDF export is a placeholder. Integrate a PDF library (e.g., jsPDF) for real export.');
  }
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

document.addEventListener('DOMContentLoaded', function () {
  // Initialize data and listeners
  dhState.raw = readLocalHistory();
  renderAll();
  setTimeZoneLabel();

  // Initialize map if container exists
  initDhMap();

  const dateRange = document.getElementById('dateRange');
  const dataType = document.getElementById('dataType');
  if (dateRange) dateRange.addEventListener('change', renderAll);
  if (dataType) dataType.addEventListener('change', renderAll);

  // Auto-refresh every 5 seconds to stay dynamic
  setInterval(() => {
    if (!dhState.live) return;
    const prevLast = dhState.raw.length ? dhState.raw[dhState.raw.length - 1].timestamp : null;
    const fresh = readLocalHistory();
    const newLast = fresh.length ? fresh[fresh.length - 1].timestamp : null;
    if (newLast !== prevLast) {
      dhState.raw = fresh;
      renderAll();
    } else {
      // Even if no new sample, update the timestamp display to reflect current time window
      updateLastUpdated();
    }
  }, 5000);
});

// Expose globals expected by HTML buttons
window.switchChartView = switchChartView;
window.refreshData = refreshData;
window.exportData = exportData;
window.previousPage = previousPage;
window.nextPage = nextPage;
window.toggleLive = toggleLive;

// ---------------- Map & City Search ----------------
function initDhMap() {
  const el = document.getElementById('dhCityMap');
  if (!el || typeof L === 'undefined') return;
  // Read API key from settings
  dhState.weatherApiKey = localStorage.getItem('weatherKey') || localStorage.getItem('settings.weatherKey') || null;
  dhState.map = L.map('dhCityMap').setView([20, 0], 2);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
  }).addTo(dhState.map);
}

async function geocodeCity(query) {
  if (!query) return null;
  // Use static cities object instead of API
  const key = query.trim().toLowerCase();
  if (cities[key]) {
    return { name: query, lat: cities[key].lat, lon: cities[key].lon };
  } else {
    alert('City not found in static list. Please try another city.');
    return null;
  }
}

async function fetchCityWeather(lat, lon) {
  const apiKey = dhState.weatherApiKey;
  if (!apiKey) return null;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const res = await fetch(url);
  if (!res.ok) return null;
  return res.json();
}

function clearDhMarkers() {
  if (!dhState.map) return;
  dhState.mapMarkers.forEach(m => dhState.map.removeLayer(m));
  dhState.mapMarkers = [];
}

async function addCityOnHistory() {
  const input = document.getElementById('dhCityInput');
  if (!input) return;
  const q = input.value.trim();
  if (!q) return;
  const loc = await geocodeCity(q);
  if (!loc) {
    alert('City not found. Try another query or set your API key in Settings.');
    return;
  }
  if (dhState.map) dhState.map.setView([loc.lat, loc.lon], 8);
  const wx = await fetchCityWeather(loc.lat, loc.lon);
  const temp = wx?.main?.temp != null ? `${Math.round(wx.main.temp)}°C` : '';
  const desc = wx?.weather?.[0]?.description || '';
  const icon = L.divIcon({
    className: 'dh-city-marker',
    html: `<div style="display:flex;align-items:center;gap:6px;padding:6px 8px;background:#3b82f6;color:#fff;border-radius:14px;box-shadow:0 2px 8px rgba(0,0,0,.2);font-size:12px;">
      <i class=\"fas fa-location-dot\"></i>
      <span>${loc.name}</span>
      <span>${temp}</span>
    </div>`
  });
  const marker = L.marker([loc.lat, loc.lon], { icon }).addTo(dhState.map);
  marker.bindPopup(`<strong>${loc.name}</strong><br>${desc}${temp ? `<br>Temp: ${temp}`:''}`);
  dhState.mapMarkers.push(marker);
  input.value = '';
}

window.addCityOnHistory = addCityOnHistory;
