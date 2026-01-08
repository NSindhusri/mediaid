# MediAid - Emergency Health Information Platform

A responsive, production-ready web application designed to help users quickly find nearby emergency medical services and take action during critical situations.

## Features

### Core Functionality
- 🗺️ **Location-Based Emergency Search** - Automatically detect user location and show nearby:
  - Hospitals
  - Ambulance services
  - Blood banks
  - 24/7 pharmacies

- 🗺️ **Interactive Map View** - Google Maps integration with markers for all service types

- 🚨 **SOS Emergency Button** - Prominent red button for instant emergency alerts

- 🩸 **Blood Request Module** - Post and view blood donation requests by location

- ⚕️ **Emergency First Aid Guide** - Visual step-by-step guides for:
  - CPR
  - Heavy bleeding
  - Burns
  - Choking
  - Fractures

- 🔍 **Smart Filters** - Filter services by type, distance, and open status

- 💳 **Emergency Health Card** - Create and save personal medical information

## Tech Stack

- **Frontend:** React 18 with Vite
- **Routing:** React Router v6
- **Styling:** CSS3 with CSS Variables (Dark mode support)
- **Maps:** Google Maps JavaScript API
- **Backend Ready:** Firebase (Firestore + Auth) - Configuration included
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Maps API key

### Installation

1. Clone the repository or extract the project files

2. Install dependencies:
```bash
npm install
```

3. Set up Google Maps API:
   - Get your API key from [Google Cloud Console](https://console.cloud.google.com/)
   - Enable "Maps JavaScript API" and "Places API"
   - Replace `YOUR_API_KEY` in `index.html` with your actual API key

4. (Optional) Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Get your Firebase configuration
   - Update `src/config/firebase.js` with your credentials

5. Start the development server:
```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
GDG/
├── public/
│   ├── manifest.json       # PWA manifest
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Layout/         # Header, Footer
│   │   ├── SOSButton/      # Emergency SOS button
│   │   ├── LocationService/# Location permission handler
│   │   ├── Map/            # Google Maps component
│   │   └── ServiceCard/    # Service display card
│   ├── contexts/
│   │   └── ThemeContext.jsx # Dark mode context
│   ├── pages/
│   │   ├── Home.jsx        # Main landing page
│   │   ├── Services.jsx    # Services directory
│   │   ├── BloodRequests.jsx
│   │   ├── FirstAid.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   └── Profile.jsx     # Health card
│   ├── config/
│   │   └── firebase.js     # Firebase configuration
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## Key Features Implementation

### Location Services
- Automatic location detection (with user permission)
- Fallback handling for denied permissions
- Distance calculation and sorting

### SOS Button
- Fixed position, always visible
- Emergency type selection
- Location sharing (ready for backend integration)

### Map Integration
- Interactive Google Maps
- Service markers with different colors
- Info windows with service details
- Click to view service information

### Dark Mode
- System preference detection
- Manual toggle
- Persistent theme preference

## Configuration

### Google Maps API
1. Create a project in Google Cloud Console
2. Enable "Maps JavaScript API" and "Places API"
3. Create an API key
4. Add domain restrictions for security
5. Replace the key in `index.html`

### Firebase Setup (Optional)
For production, you'll want to:
1. Create a Firebase project
2. Enable Firestore Database
3. Enable Authentication (Email/Password)
4. Update `src/config/firebase.js`
5. Replace mock data with Firestore queries

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Vercel:** Connect your GitHub repo and deploy automatically
- **Netlify:** Drag and drop the `dist` folder
- **Firebase Hosting:** Use Firebase CLI
- **GitHub Pages:** Configure build and deploy workflow

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Important Notes

- **Medical Emergency Disclaimer:** This platform provides information only. Always call emergency services (108 in India) first in any medical emergency.
- **Location Privacy:** Location data is only used to find nearby services and is not stored or shared without user consent.
- **Mock Data:** Current implementation uses mock data. Replace with actual API calls for production.

## Future Enhancements

- [ ] Firebase integration for real-time data
- [ ] User authentication
- [ ] Push notifications for SOS alerts
- [ ] Offline support with Service Workers
- [ ] Multi-language support
- [ ] Advanced filtering options
- [ ] Ratings and reviews for services

## Contributing

This is a production-ready template. Feel free to:
- Add your own backend integration
- Customize the design
- Add additional features
- Improve accessibility

## License

This project is open source and available for educational and commercial use.

## Support

For issues or questions, please contact: info@mediaid.com

---

**Made with ❤️ for emergencies**
