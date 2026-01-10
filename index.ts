// Required for react-native-gesture-handler (must be first import on Android)
import 'react-native-gesture-handler';
// Patch Reanimated with legacy gesture handler API for libs still calling useAnimatedGestureHandler
import './src/utils/reanimatedPolyfill';

import { registerRootComponent } from 'expo';

import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
