# MediAid Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Google Maps API**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable "Maps JavaScript API" and "Places API"
   - Create an API key
   - Update `index.html` line 12:
     ```html
     <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>
     ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## Firebase Setup (Optional - for production)

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)

2. Enable Firestore Database
   - Go to Firestore Database
   - Create database in production mode
   - Set security rules (for production)

3. Enable Authentication
   - Go to Authentication
   - Enable Email/Password sign-in method

4. Get your Firebase config:
   - Go to Project Settings > General
   - Scroll down to "Your apps"
   - Click the web icon (</>)
   - Copy the configuration object

5. Update `src/config/firebase.js` with your config:
   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-auth-domain",
     projectId: "your-project-id",
     // ... etc
   }
   ```

## Important Notes

- The app currently uses **mock data** for services
- Replace mock data in:
  - `src/pages/Home.jsx` (mockServices)
  - `src/pages/Services.jsx` (mockServices)
  - `src/pages/BloodRequests.jsx` (mockRequests)

- For production, integrate with:
  - Google Places API for real service data
  - Firestore for blood requests and user profiles
  - Firebase Functions for SOS alerts

## Testing

- Test location permissions in different browsers
- Test on mobile devices for mobile-first design
- Test dark mode toggle
- Verify all navigation links work
- Test SOS button functionality
- Test form submissions

## Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
- Drag and drop the `dist` folder after running `npm run build`
- Or connect your Git repository

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## Troubleshooting

**Google Maps not loading?**
- Check API key is correct
- Verify Maps JavaScript API is enabled
- Check browser console for errors
- Ensure Places API is enabled

**Location not working?**
- User must grant location permission
- Test in HTTPS (required for geolocation)
- Check browser console for errors

**Dark mode not persisting?**
- Check localStorage is enabled
- Clear cache and try again
