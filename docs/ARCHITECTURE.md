# Probon Mobile — Architecture Overview

## 1. Core Stack
- **Framework:** Expo SDK 53 (`53.0.20`) + React Native `0.79.5` + React `19.0.0`
- **Type Safety:** TypeScript `5.8.3`
- **State Layer:** Redux Toolkit (`@reduxjs/toolkit`) with typed hooks in `src/store/`
- **Navigation Layer:** React Navigation v7 (`native-stack`, `bottom-tabs`, `drawer`) in `src/navigation/`
- **Performance Primitives:** `@shopify/flash-list` for virtualized feeds, `expo-image` for cached media rendering, and `react-native-reanimated` (`~3.17.4`) + `@gorhom/bottom-sheet` (`^5.1.6`) for 60/120fps native gesture interactions.

## 2. Module Breakdown (`src/`)
- `components/` — Shared atomic and composite UI elements
- `pages/` — Screen-level containers wired to navigation routes
- `store/` — Global Redux state slices
- `translations/` & `i18n.ts` — Localization configuration (`expo-localization` + `i18n-js`)
- `hooks/`, `helper/`, `utils/`, `types/` — Domain hooks, formatters, and TypeScript interfaces
