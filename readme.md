# 🚀 Probon

**Probon** is a cross-platform mobile app built with [React Native](https://reactnative.dev/) using [Expo](https://expo.dev/) and TypeScript.

This guide covers **100% of the setup process**, including installation of Node.js, Expo CLI, Android Studio, Xcode, and running the app on real or virtual devices.

---

## 🛠️ Full Setup Guide

### 1. 🟢 Install Node.js

Download and install Node.js (v16 or higher):

- 🔗 https://nodejs.org/

Verify installation:

```bash
node -v
npm -v
```

> Optional but recommended: Install Yarn

```bash
npm install -g yarn
```

---

### 2. 🌐 Install Expo CLI

Install Expo globally:

```bash
npm install -g expo-cli
```

Check Expo version:

```bash
expo --version
```

---

### 3. 📱 Set Up Android Studio

> Needed to run app on Android emulator

- Download and install:  
  🔗 https://developer.android.com/studio

#### During installation:

- ✅ Select “Android SDK”
- ✅ Select “Android SDK Platform”
- ✅ Select “Android Virtual Device (AVD)”

#### After installation:

- Open **Device Manager**
- Create a virtual device (e.g., Pixel 5 with API 31)

Set environment variable (macOS):

```bash
echo 'export ANDROID_HOME=$HOME/Library/Android/sdk' >> ~/.zshrc
source ~/.zshrc
```

Make sure platform tools are in your PATH.

---

### 4. 🍏 Set Up Xcode (macOS only)

> Needed to run app on iOS Simulator

- Install from Mac App Store
- Open and accept license
- Install CLI tools:

```bash
xcode-select --install
```

- Go to Xcode → Preferences → Locations → Select Command Line Tools

---

### 5. 📱 Install Expo Go App

Use this to test on a physical device.

- **iOS**: https://apps.apple.com/app/apple-store/id982107779
- **Android**: https://play.google.com/store/apps/details?id=host.exp.exponent

---

## 📁 Project Setup

### Clone the Repository

```bash
git clone https://github.com/harutyunian/probon_mobile
cd probon
```

### Install Dependencies

```bash
yarn install
# or
npm install
```

---

## ▶️ Run the App

Start the development server:

```bash
yarn start
# or
npm run start
```

This opens a browser with:

- QR Code (scan with Expo Go on your phone)
- Press `a` to launch Android emulator
- Press `i` to launch iOS simulator (macOS only)

---

## 📦 Run on Emulator

```bash
# Android
npm run android

# iOS (macOS only)
npm run  ios
```

---

## 🏗️ Build for Production

### Install EAS CLI (Expo Application Services)

```bash
npm install -g eas-cli
eas login
```

### Build Commands

```bash
# Android (AAB)
eas build --platform android

# iOS (IPA)
eas build --platform ios
```

> You may need to configure an `eas.json` file.

---


## 🏗️ Architecture & Tech Stack

| Layer | Technology | Version |
|---|---|---|
| **Core Runtime** | Expo SDK / React Native / React | `53.0.20` / `0.79.5` / `19.0.0` |
| **Language** | TypeScript | `~5.8.3` |
| **State Management** | Redux Toolkit (`@reduxjs/toolkit`) & React-Redux | `^2.8.2` / `^9.2.0` |
| **Navigation** | React Navigation v7 (Native Stack, Bottom Tabs, Drawer) | `^7.x` |
| **Lists & Animations** | `@shopify/flash-list`, `react-native-reanimated`, `@gorhom/bottom-sheet` | `1.7.6` / `~3.17.4` / `^5.1.6` |
| **Localization** | `expo-localization` + `i18n-js` | `~16.1.6` / `^4.5.1` |

### 📂 Directory Structure (`src/`)

- `src/components/` — Reusable UI components, cards, modals, and layout primitives
- `src/navigation/` — Stack, Bottom Tab, and Drawer navigators
- `src/pages/` — Feature screens and route views
- `src/store/` — Redux Toolkit slices, selectors, and store configuration
- `src/translations/` & `src/i18n.ts` — Multi-language dictionaries and localization setup
- `src/hooks/` & `src/utils/` — Custom React hooks and helper utilities

---

## 🔧 Available Scripts

| Command            | Description                          |
|--------------------| ------------------------------------ |
| `npm run start`    | Start Expo dev server                |
| `npm run android`  | Launch Android emulator              |
| `npm run ios`      | Launch iOS simulator (Mac only)      |
| `npm run web`      | Start Expo Web build                 |
| `npm run lint`     | Run ESLint across `.ts` / `.tsx`     |
| `npm run lint:fix` | Auto-fix ESLint issues               |

---

## 📄 License

MIT License © 2026

---

## 👨‍💻 Authors

Made with ❤️ by Probon team