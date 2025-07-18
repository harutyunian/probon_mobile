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


## 🔧 Available Scripts

| Command            | Description                          |
|--------------------| ------------------------------------ |
| `npm run  start`   | Start Expo dev server                |
| `npm run android`  | Launch Android emulator              |
| `npm run  ios`     | Launch iOS simulator (Mac only)      |
| `npm run  lint`    | Run ESLint (if configured)           |
| `npm run lint:fix` | Run tests (if configured)            |

---

## 📄 License

MIT License © 2025 

---

## 👨‍💻 Authors

Made with ❤️ by Probon team