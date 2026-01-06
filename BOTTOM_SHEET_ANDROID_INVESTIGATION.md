# Bottom Sheet Android Investigation Report

## Problem
The bottom sheet is not working on the Create Request page on Android devices.

## Root Causes Identified

### 1. **CRITICAL: Invalid SnapPoints Configuration** ⚠️
**Location**: `src/components/CustomBottomSheet/CustomBottomSheet.tsx:25`

**Issue**: 
```typescript
const snapPoints = useMemo(() => [bottomSheetHeight, width], [bottomSheetHeight, width]);
```

The `width` value from Redux state is a **string** (e.g., `"38%"`, `"50%"`, `"60%"`), but `@gorhom/bottom-sheet` requires snapPoints to be **numbers** (either pixel values or percentage numbers, not percentage strings).

**Impact**: This causes the bottom sheet to fail initialization on Android, as the library cannot parse string values for snapPoints. The bottom sheet may not render at all or crash silently.

**Evidence**: 
- In `bottomSheetSlice.ts`, `width` is stored as a string: `width: '90%'`
- In `RequestDetailsForm.tsx` and `PropertyForm.tsx`, width is passed as strings: `width: "38%"`, `width: "50%"`, etc.
- The `@gorhom/bottom-sheet` library expects snapPoints to be an array of numbers

---

### 2. **Z-Index / Rendering Order Issue on Android** ⚠️
**Location**: `App.tsx:34`

**Issue**: 
The `CustomBottomSheet` component is rendered as a sibling to `MainNavigator` inside the `ProvidersTree`. On Android, the React Navigation Tab Navigator may have a higher z-index or elevation than the bottom sheet, causing it to render behind the tab bar.

**Impact**: 
- The bottom sheet may be rendered but hidden behind the tab navigator
- Touch events may be intercepted by the tab navigator instead of the bottom sheet
- This is a common Android-specific issue with modal components and tab navigators

**Evidence**:
- Bottom sheet is rendered outside the NavigationContainer
- Tab Navigator uses native Android components with elevation
- Android handles z-index differently than iOS

---

### 3. **Missing BottomSheetModalProvider (Potential Issue)** ⚠️
**Location**: `App.tsx`

**Issue**: 
The app uses `BottomSheet` component directly, but for better Android compatibility, especially with navigation, `@gorhom/bottom-sheet` recommends using `BottomSheetModal` wrapped in `BottomSheetModalProvider`.

**Impact**: 
- Better gesture handling on Android
- Proper modal behavior that works above navigation
- Better keyboard handling

**Evidence**:
- Current implementation uses `BottomSheet` (not `BottomSheetModal`)
- No `BottomSheetModalProvider` wrapper found
- Documentation recommends `BottomSheetModal` for modals that should appear above navigation

---

### 4. **Gesture Handler Conflicts** ⚠️
**Location**: Multiple files

**Issue**: 
The bottom sheet uses gesture handlers that may conflict with:
- Tab Navigator's swipe gestures
- React Native Paper Tabs' swipe gestures (used in CreateRequestPage)
- Other gesture handlers in the app

**Impact**: 
- Gestures may not work properly on Android
- Bottom sheet may not respond to pan gestures
- Tab swipes may interfere with bottom sheet gestures

**Evidence**:
- `CreateRequestPage` uses `react-native-paper-tabs` which has its own gesture handlers
- `MainNavigator` uses `@react-navigation/bottom-tabs` with swipe gestures
- Multiple gesture handler libraries in use

---

### 5. **Android-Specific Initial Index Issue** ⚠️
**Location**: `src/components/CustomBottomSheet/CustomBottomSheet.tsx:71`

**Issue**: 
Setting `index={-1}` (closed state) may not work correctly on Android. Some Android versions may render a small portion of the bottom sheet even when index is -1, blocking interactions.

**Impact**: 
- Bottom sheet may partially render on Android
- May block touch events even when "closed"
- Different behavior between iOS and Android

**Evidence**:
- Initial index is set to `-1`
- Known issue with `@gorhom/bottom-sheet` on Android 14 and some versions

---

## Recommended Solutions

### Priority 1: Fix SnapPoints (CRITICAL)
Convert the width string to a number before using it in snapPoints:

```typescript
const snapPoints = useMemo(() => {
    // Convert percentage string to number
    const widthPercent = parseFloat(width.replace('%', ''));
    const widthValue = (widthPercent / 100) * height;
    return [bottomSheetHeight, widthValue];
}, [bottomSheetHeight, width, height]);
```

### Priority 2: Use BottomSheetModalProvider
Wrap the app with `BottomSheetModalProvider` and consider using `BottomSheetModal` instead of `BottomSheet`:

```typescript
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

// In App.tsx
<BottomSheetModalProvider>
    <MainNavigator/>
    <CustomBottomSheet/>
</BottomSheetModalProvider>
```

### Priority 3: Adjust Z-Index/Elevation
Ensure the bottom sheet renders above the tab navigator by:
- Using `BottomSheetModal` which handles z-index automatically
- Or adding explicit `zIndex` and `elevation` props

### Priority 4: Handle Android-Specific Initial State
Consider using a different approach for initial state on Android, or ensure the bottom sheet is truly hidden when closed.

---

## Testing Checklist

- [ ] Test on Android 14+ devices
- [ ] Test with different screen sizes
- [ ] Test gesture interactions (swipe down to close)
- [ ] Test with keyboard open/close
- [ ] Test with tab navigator active
- [ ] Test with paper tabs active (CreateRequestPage)
- [ ] Verify bottom sheet appears above tab bar
- [ ] Verify touch events work correctly

---

## Files That Need Changes

1. `src/components/CustomBottomSheet/CustomBottomSheet.tsx` - Fix snapPoints calculation
2. `App.tsx` - Add BottomSheetModalProvider wrapper
3. Consider converting to `BottomSheetModal` for better Android support

---

## Additional Notes

- The bottom sheet works on other pages (HomeScreen) which suggests the issue is specific to the CreateRequestPage context
- The CreateRequestPage uses `react-native-paper-tabs` which may have additional gesture conflicts
- Android handles modals and z-index differently than iOS, requiring platform-specific considerations

