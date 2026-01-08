# Google Maps API Setup Guide

## Quick Steps to Get Your API Key

### Step 1: Create/Select a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Click on the project dropdown at the top
4. Click "New Project" or select an existing project
5. Give your project a name (e.g., "MediAid") and click "Create"

### Step 2: Enable Required APIs
1. In the Google Cloud Console, go to **APIs & Services** > **Library**
2. Search for "Maps JavaScript API" and click on it
3. Click **"Enable"** button
4. Search for "Places API" and click on it
5. Click **"Enable"** button

### Step 3: Create API Key
1. Go to **APIs & Services** > **Credentials**
2. Click **"+ CREATE CREDENTIALS"** at the top
3. Select **"API key"**
4. Copy your API key (it will look like: `AIzaSyAbCdEfGhIjKlMnOpQrStUvWxYz1234567`)

### Step 4: (Recommended) Restrict Your API Key
1. Click on the API key you just created
2. Under **"API restrictions"**, select "Restrict key"
3. Check both:
   - ✅ Maps JavaScript API
   - ✅ Places API
4. Under **"Website restrictions"**, select "HTTP referrers"
5. Add your domains:
   - `localhost:3000/*` (for development)
   - `localhost:*/*` (for any localhost port)
   - Your production domain (e.g., `https://yourapp.com/*`)
6. Click **"Save"**

### Step 5: Add API Key to Your Project

**Option A: In index.html (Current Method)**
1. Open `index.html` file
2. Find line 10:
   ```html
   <script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_ACTUAL_API_KEY_HERE&libraries=places"></script>
   ```
3. Replace `YOUR_ACTUAL_API_KEY_HERE` with your actual API key:
   ```html
   <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAbCdEfGhIjKlMnOpQrStUvWxYz1234567&libraries=places"></script>
   ```

**Option B: Using Environment Variable (More Secure)**
1. Create a `.env` file in the root directory
2. Add:
   ```
   VITE_GOOGLE_MAPS_API_KEY=YOUR_ACTUAL_API_KEY_HERE
   ```
3. Update `index.html` to read from environment:
   ```html
   <script async defer src="https://maps.googleapis.com/maps/api/js?key=%VITE_GOOGLE_MAPS_API_KEY%&libraries=places"></script>
   ```
   Note: For Vite, you need to use `import.meta.env.VITE_GOOGLE_MAPS_API_KEY` in JavaScript, not in HTML script tags.

### Step 6: Test Your Setup
1. Save the file
2. Run `npm run dev`
3. Open the app in your browser
4. Try enabling location and viewing the map
5. Check the browser console for any errors

## Common Issues

### Issue: "This page can't load Google Maps correctly"
- **Solution**: Check that your API key is correct and that Maps JavaScript API is enabled

### Issue: "RefererNotAllowedMapError"
- **Solution**: Add your current domain to the HTTP referrers list in API key restrictions

### Issue: "API key not valid"
- **Solution**: 
  - Verify the API key is correct (no extra spaces)
  - Check that Maps JavaScript API and Places API are enabled
  - Make sure billing is enabled (Google gives $200 free credit/month)

### Issue: Maps not loading
- **Solution**: 
  - Check browser console for errors
  - Verify script tag is loading (check Network tab)
  - Make sure you're using `async defer` attributes

## Enable Billing (Required)

Google Maps requires billing to be enabled, but:
- You get **$200 free credit per month**
- Maps JavaScript API: $7 per 1,000 requests (first 28,000 free)
- Places API: Various pricing (generous free tier)

1. Go to **Billing** in Google Cloud Console
2. Link a billing account (credit card required)
3. Don't worry - you won't be charged unless you exceed free credits

## Security Best Practices

1. **Always restrict your API key** to specific APIs and domains
2. **Never commit API keys** to public repositories
3. **Use environment variables** for production
4. **Monitor usage** in Google Cloud Console
5. **Set up usage alerts** to prevent unexpected charges

## Your API Key Format
```
AIzaSyAbCdEfGhIjKlMnOpQrStUvWxYz1234567
```
(Replace with your actual key from Google Cloud Console)

## Need Help?

- [Google Maps API Documentation](https://developers.google.com/maps/documentation/javascript)
- [Google Cloud Console](https://console.cloud.google.com/)
- [API Key Best Practices](https://developers.google.com/maps/api-security-best-practices)
