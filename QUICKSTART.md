# 🚀 Dawwar Quick Start Guide

## Getting Started in 3 Steps

### 1️⃣ Start the Development Server

```bash
npm start
```

This will start the Expo development server and show you a QR code.

### 2️⃣ Run on Your Device

**Option A: Physical Device (Recommended)**
- Install **Expo Go** app from App Store or Play Store
- Open Expo Go and scan the QR code from your terminal
- The app will load on your device

**Option B: Simulator/Emulator**
- iOS: Press `i` (requires Mac with Xcode)
- Android: Press `a` (requires Android Studio)

### 3️⃣ Grant Camera Permissions

When you open the app and tap the Scanner tab, grant camera permissions to test the scanning feature.

---

## 📱 App Navigation

The app has **4 main tabs**:

### 🏠 Home Tab (Default)
- User dashboard with greeting
- Quick service access
- Recycling material categories
- Nearby recycle stations
- Your stats (CO₂ saved, earnings)

### 📸 Scanner Tab (Center, Elevated)
- Camera view for scanning items
- Tap the big circular button to scan
- See instant results with:
  - Material type detected
  - CO₂ impact
  - Reward points
- Add items to your recycle bag

### 🛍️ Marketplace Tab
- Browse recyclable categories
- Find nearby buyers
- View prices and ratings
- Quick actions for listing items

### 👤 Profile Tab
- Your profile information
- Stats dashboard
- Settings and preferences
- Help & support

---

## 🎯 Testing the Scanner

1. **Open the app** → Tap the **Scanner** tab (center button)
2. **Grant camera permission** when prompted
3. **Point at any object** → Tap the **capture button**
4. **View the result** in the beautiful modal:
   - Material type
   - CO₂ saved
   - Reward points
5. **Tap "Add Recycle Bag"** (UI ready, backend integration pending)

---

## 🐛 Troubleshooting

### Issue: Camera not working / Casting error

**Solution:** The app has been fixed! Just make sure to:
```bash
# Clear cache and restart
npx expo start --clear
```

### Issue: QR code not scanning

**Solution:** 
- Make sure you have the latest Expo Go app
- Check that your phone and computer are on the same network
- Try using the manual connection option in Expo Go

### Issue: App crashes on startup

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
npx expo start --clear
```

### Issue: TypeScript errors in IDE

**Solution:**
```bash
# Regenerate TypeScript types
npx expo customize tsconfig.json
```

---

## 🎨 Customization

### Change Colors
Edit `/src/theme/colors.ts` to customize the app's color scheme.

### Modify Spacing
Edit `/src/theme/spacing.ts` for consistent spacing throughout the app.

### Update Typography
Edit `/src/theme/typography.ts` for font sizes and weights.

---

## 📝 Next Steps

### For Development:
1. **Add Gemini AI Integration** - Connect Google Gemini API for real object detection
2. **Implement Shopping Cart** - Store scanned items before checkout
3. **Add Backend API** - Connect to your backend services
4. **User Authentication** - Implement login/signup

### For Testing:
1. Test on both iOS and Android devices
2. Try different lighting conditions for camera
3. Test navigation between tabs
4. Verify all buttons and interactions work

---

## 🔗 Useful Commands

```bash
# Start development server
npm start

# Start with cache cleared
npx expo start --clear

# Run on Android emulator
npm run android

# Run on iOS simulator (Mac only)
npm run ios

# Check for TypeScript errors
npx tsc --noEmit

# View project info
npx expo --version
```

---

## 📚 Resources

- **Expo Docs**: https://docs.expo.dev/
- **React Native Docs**: https://reactnative.dev/
- **React Navigation**: https://reactnavigation.org/
- **Expo Camera**: https://docs.expo.dev/versions/latest/sdk/camera/

---

## 💚 What's Working

✅ Beautiful Home dashboard  
✅ Working camera with permissions  
✅ Scan result modal  
✅ Navigation with elevated center button  
✅ Professional UI matching inspiration  
✅ TypeScript with no errors  
✅ Theme system for easy customization  

---

## 🎉 You're All Set!

Your Dawwar app is ready for development. The camera works, the UI is polished, and the structure is scalable. Happy coding! 🇹🇳

For questions or issues, check `FIXES.md` or `README.md`.
