# Dawwar - AI-Powered Waste-to-Cash Marketplace

<div align="center">
  
**Turn Your Recyclables Into Cash - Powered by AI**

A modern mobile app for Tunisia that helps users scan recyclables with AI (Gemini), add them to cart, and sell to nearby buyers or list on the marketplace.

[![React Native](https://img.shields.io/badge/React%20Native-0.81-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-SDK%2052-000020.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)

</div>

---

## 📱 Features

### Current Implementation
- ✅ **Home Tab** - Beautiful dashboard with services, recycling materials, and nearby stations
- ✅ **Scanner Tab** - Camera functionality with scan result modal and AI-ready integration
- ✅ **Marketplace Tab** - Browse categories and nearby buyers
- ✅ **Profile Tab** - User profile with stats and settings
- ✅ **Bottom Tab Navigation** - Professional navigation with elevated center button
- ✅ **Scan Result Modal** - Beautiful result screen showing material, CO₂ saved, and rewards
- ✅ **Modern Theme System** - Comprehensive color palette and design system
- ✅ **TypeScript** - Fully typed codebase for better development experience

### Coming Soon
- 🔄 AI-powered recyclable detection (Google Gemini integration)
- 🔄 Shopping cart functionality
- 🔄 Real-time marketplace listings
- 🔄 Location-based buyer search
- 🔄 Payment integration
- 🔄 User authentication
- 🔄 Backend API integration

---

## 🏗️ Project Structure

```
dawwar/
├── src/
│   ├── screens/              # Screen components
│   │   ├── HomeScreen.tsx
│   │   ├── ScannerScreen.tsx
│   │   ├── MarketplaceScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── navigation/           # Navigation configuration
│   │   └── BottomTabNavigator.tsx
│   ├── components/           # Reusable components
│   │   └── ScanResultModal.tsx
│   ├── theme/               # Theme configuration
│   │   ├── colors.ts        # Color palette
│   │   ├── spacing.ts       # Spacing system
│   │   ├── typography.ts    # Typography system
│   │   └── index.ts         # Theme exports
│   ├── types/               # TypeScript type definitions
│   │   └── navigation.ts
│   ├── utils/               # Utility functions
│   ├── hooks/               # Custom React hooks
│   └── assets/              # Images, icons, fonts
├── App.tsx                  # Main app entry point
├── app.json                 # Expo configuration
├── package.json             # Dependencies
└── tsconfig.json           # TypeScript configuration
```

---

## 🎨 Design System

### Color Palette

```typescript
Primary Colors:
- Primary: #10B981 (Emerald Green)
- Primary Dark: #059669
- Primary Light: #6EE7B7

Secondary Colors:
- Secondary: #3B82F6 (Blue)
- Secondary Dark: #1E40AF
- Secondary Light: #93C5FD

Neutral Colors:
- Background: #FFFFFF
- Surface: #F9FAFB
- Text: #111827
- Text Secondary: #6B7280
```

### Spacing System

```typescript
xs: 4px
sm: 8px
md: 16px
lg: 24px
xl: 32px
xxl: 48px
xxxl: 64px
```

### Typography

```typescript
Font Sizes: 12px - 40px
Font Weights: Regular, Medium, Semibold, Bold
Line Heights: Tight, Normal, Relaxed
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (Note: Current version is 18.20.8, but 20.19.4+ is recommended)
- npm or yarn
- Expo CLI
- iOS Simulator (Mac only) or Android Emulator

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd dawwar
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   npx expo start
   ```

4. **Run on your device**
   - **iOS**: Press `i` in the terminal or scan QR code with Expo Go app
   - **Android**: Press `a` in the terminal or scan QR code with Expo Go app
   - **Web**: Press `w` in the terminal

### Development Commands

```bash
# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on web
npm run web

# Clear cache and restart
npx expo start --clear
```

---

## 📦 Dependencies

### Core
- `react-native` - Mobile framework
- `expo` - Development platform
- `typescript` - Type safety

### Navigation
- `@react-navigation/native` - Navigation framework
- `@react-navigation/bottom-tabs` - Bottom tab navigator
- `react-native-screens` - Native screen optimization
- `react-native-safe-area-context` - Safe area handling

### Camera & Permissions
- `expo-camera` - Camera functionality with permissions

### UI & Icons
- `@expo/vector-icons` - Icon library (Ionicons)

---

## 🎯 Features by Screen

### Home Screen
- ✅ User greeting with location
- ✅ Search bar with QR scanner
- ✅ Service cards (Pick up, Smart bin, Reward, Recycling)
- ✅ Material categories with visual cards
- ✅ Nearby recycle station with map preview
- ✅ Quick stats (CO₂ Saved, Total Earned)

### Scanner Screen
- ✅ Camera view with permission handling
- ✅ Professional scanning frame overlay
- ✅ Flash toggle functionality
- ✅ Capture button with animations
- ✅ Scan result modal with material detection
- ✅ Shows CO₂ saved and reward points
- ✅ "Add to Recycle Bag" functionality (UI ready)
- 🔄 AI-powered object detection (coming soon)

### Marketplace Screen
- ✅ Material categories (Plastic, Paper, Metal, Glass)
- ✅ Nearby buyers list with ratings and prices
- ✅ Shopping cart indicator
- ✅ Quick actions for listing and history
- 🔄 Real marketplace data integration (coming soon)

### Profile Screen
- ✅ User profile information
- ✅ Stats dashboard (Items Sold, Total Earned, CO₂ Saved)
- ✅ Settings menu items
- ✅ Logout functionality
- 🔄 User authentication (coming soon)

---

## 🔐 Permissions

The app requires the following permissions:

### iOS
- Camera: For scanning recyclable items

### Android
- Camera: For scanning recyclable items
- Storage: For saving and accessing photos

Permissions are configured in `app.json` and will be requested at runtime.

---

## 🛠️ Tech Stack Details

### Frontend
- **React Native 0.81** - Cross-platform mobile development
- **Expo SDK 52** - Managed workflow and tooling
- **TypeScript 5.3** - Static typing and better DX
- **React Navigation 7** - Navigation library

### Design
- **Custom Theme System** - Consistent colors, spacing, and typography
- **Ionicons** - Professional icon library
- **Platform-specific Styling** - iOS and Android optimizations

### Development Tools
- **Expo Go** - Quick testing on physical devices
- **Metro Bundler** - Fast refresh and bundling
- **TypeScript Compiler** - Type checking

---

## 📱 Screenshots

(Screenshots will be added here)

---

## 🗺️ Roadmap

### Phase 1: Core Features ✅ (Current)
- [x] Project setup and structure
- [x] Navigation system
- [x] Camera functionality
- [x] UI/UX implementation
- [x] Theme system

### Phase 2: AI Integration (Next)
- [ ] Google Gemini API integration
- [ ] Image recognition for recyclables
- [ ] Material classification
- [ ] Confidence scoring

### Phase 3: Marketplace
- [ ] Shopping cart functionality
- [ ] Real-time listings
- [ ] Buyer profiles
- [ ] Location services
- [ ] Distance calculation

### Phase 4: Backend & Auth
- [ ] User authentication
- [ ] Backend API development
- [ ] Database setup
- [ ] Cloud storage for images

### Phase 5: Payments & Analytics
- [ ] Payment gateway integration
- [ ] Transaction history
- [ ] Analytics dashboard
- [ ] Environmental impact tracking

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👥 Team

Built with ❤️ for a sustainable Tunisia

---

## 📞 Support

For support, email support@dawwar.tn or join our community channel.

---

## 🙏 Acknowledgments

- React Native community
- Expo team
- All contributors and testers

---

<div align="center">
  <strong>Made in Tunisia 🇹🇳</strong>
</div>
