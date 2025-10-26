# Dawwar Setup Instructions for Demo

## Prerequisites Completed

- Database schema created with all necessary tables
- Dummy data seeded (users, categories, buyers, transactions, achievements, etc.)
- Supabase client configured
- Gemini AI integration ready
- All screens updated to use real database

## IMPORTANT: Get Your Gemini API Key

To enable AI scanning, you need a Google Gemini API key:

1. Go to: https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the API key

4. Open `.env` file and replace:
   ```
   EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   with your actual key:
   ```
   EXPO_PUBLIC_GEMINI_API_KEY=AIzaSy...your-actual-key
   ```

## Database Info

The database is already set up with:

- **Demo User ID**: `11111111-1111-1111-1111-111111111111`
- **Email**: demo@dawwar.tn
- **Stats**: 45 items sold, 856.50 TND earned, 12.8 kg CO₂ saved

### Categories:
- Plastic (2.5 TND/kg)
- Metal (4.0 TND/kg)
- Glass (1.5 TND/kg)
- Paper (1.0 TND/kg)
- Cardboard (0.8 TND/kg)

### Buyers:
- EcoRecycle Tunisia (4.8★, 2.3 km)
- Green Earth Center (4.9★, 3.8 km)
- Metal Masters (4.9★, 1.8 km)
- Tunisia Recycling Co. (4.7★, 5.2 km)
- Plastic Reclaim Ltd (4.6★, 4.5 km)
- Paper Perfect (4.5★, 6.1 km)

## Testing the Workflow

### 1. Scan Item
- Open Scanner tab
- Point camera at recyclable item
- Tap capture button
- AI analyzes using Gemini (or shows fallback data if no API key)
- Shows: Item name, category, weight, CO₂ saved, estimated value

### 2. Add to Bag
- After scan, tap "Add to Bag"
- Item is saved to Supabase database
- Navigate to Recycle Bin to see all items

### 3. Smart Matching
- In Recycle Bin, tap "Sell Now"
- AI analyzes your items
- Fetches real buyers from database
- Calculates match scores based on:
  - Category prices offered
  - Distance from you
  - Buyer rating
  - Response time
  - Verification status

### 4. Select Buyer
- Choose from top 3 matched buyers
- See match score, price offer, location

### 5. Confirmation
- Transaction is saved to database
- User stats updated (total earned, CO₂ saved, items sold)
- Items marked as "sold"

### 6. View Profile
- See updated stats
- View transaction history (loaded from database)
- Track achievements progress

## Running the App

```bash
npm start
```

Then scan QR code with Expo Go or press `i` for iOS / `a` for Android.

## Troubleshooting

### No API Key
If you don't add a Gemini API key, the app will still work with fallback data (plastic bottle, 0.5kg, etc.)

### Camera Not Working
- Grant camera permissions when prompted
- Try `npx expo start --clear` if issues persist

### Database Connection Issues
- The Supabase connection is already configured in `.env`
- Check network connection

## What's Integrated

✅ Supabase database with RLS policies
✅ Gemini AI for image analysis
✅ Real-time data fetching from database
✅ Smart matching algorithm
✅ Transaction tracking
✅ User stats and achievements
✅ Marketplace listings
✅ Profile with activity history

## Demo Tips

1. **Pre-scan items** before the demo (they'll be in the database)
2. **Show the AI analysis** - it's impressive!
3. **Highlight the smart matching** - real buyers with calculated scores
4. **Show the profile stats** - they update in real-time
5. **Mention the database** - everything is persisted

## Next Steps for Production

- Add real user authentication (Supabase Auth)
- Implement photo upload to Supabase Storage
- Add push notifications for buyer responses
- Implement real-time chat with buyers
- Add payment gateway integration
- Enable location services for accurate distance calculation

---

Good luck with your demo tomorrow! 🚀♻️
