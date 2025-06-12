# Airbnb Finance Manager

A cross-platform mobile application for managing Airbnb stays and expenses across iOS, Android, and web platforms.

## Features

- Track Airbnb stays and bookings
- Manage expenses and income
- Generate financial reports
- Cross-platform support (iOS, Android, Web)
- Offline support
- Data synchronization

## Tech Stack

- React Native
- TypeScript
- Expo
- React Navigation
- AsyncStorage for local data persistence
- React Native Paper for UI components

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac users)
- Android Studio (for Android development)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

### Development

- `npm start` or `yarn start` - Start the Expo development server
- `npm run ios` or `yarn ios` - Run on iOS simulator
- `npm run android` or `yarn android` - Run on Android emulator
- `npm run web` or `yarn web` - Run on web browser

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── screens/        # Screen components
  ├── navigation/     # Navigation configuration
  ├── services/       # API and business logic
  ├── store/         # State management
  ├── types/         # TypeScript type definitions
  ├── utils/         # Utility functions
  └── assets/        # Images, fonts, etc.
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
