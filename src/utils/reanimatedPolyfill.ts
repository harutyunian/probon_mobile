/**
 * Runtime polyfill for useAnimatedGestureHandler (removed in react-native-reanimated v4)
 * This patches react-native-reanimated to add backward compatibility
 * 
 * The old API returned an animated event handler compatible with PanGestureHandler.onGestureEvent
 */
import * as Reanimated from 'react-native-reanimated';
import { useSharedValue } from 'react-native-reanimated';

type GestureHandlerContext = Record<string, any>;
type GestureHandlerEvent = {
  nativeEvent: {
    translationX?: number;
    translationY?: number;
    velocityX?: number;
    velocityY?: number;
    x?: number;
    y?: number;
    absoluteX?: number;
    absoluteY?: number;
    state?: number;
  };
};

type GestureHandlers<T extends GestureHandlerContext> = {
  onStart?: (event: GestureHandlerEvent, context: T) => void;
  onActive?: (event: GestureHandlerEvent, context: T) => void;
  onEnd?: (event: GestureHandlerEvent, context: T) => void;
  onFail?: (event: GestureHandlerEvent, context: T) => void;
  onCancel?: (event: GestureHandlerEvent, context: T) => void;
  onFinish?: (event: GestureHandlerEvent, context: T) => void;
};

/**
 * Polyfill implementation for useAnimatedGestureHandler
 * Returns a worklet function compatible with PanGestureHandler.onGestureEvent
 */
function useAnimatedGestureHandlerPolyfill<T extends GestureHandlerContext>(
  handlers: GestureHandlers<T>
) {
  const context = useSharedValue<T>({} as T);
  const isActive = useSharedValue(false);
  const hasStarted = useSharedValue(false);
  
  // Return a worklet function that can be passed to PanGestureHandler.onGestureEvent
  // The 'worklet' directive ensures this runs on the UI thread
  function eventHandler(event: any) {
    'worklet';
    const nativeEvent = event.nativeEvent || event;
    const state = nativeEvent.state;
    
    // Handle state changes if available
    if (state !== undefined) {
      if (state === 2 && !hasStarted.value) { // ACTIVE (BEGAN) - gesture started
        hasStarted.value = true;
        isActive.value = true;
        if (handlers.onStart) {
          handlers.onStart({ nativeEvent }, context.value);
        }
      } else if (state === 4 && isActive.value) { // END - gesture ended
        isActive.value = false;
        hasStarted.value = false;
        if (handlers.onEnd) {
          handlers.onEnd({ nativeEvent }, context.value);
        }
        if (handlers.onFinish) {
          handlers.onFinish({ nativeEvent }, context.value);
        }
      } else if (state === 3) { // CANCELLED
        isActive.value = false;
        hasStarted.value = false;
        if (handlers.onCancel) {
          handlers.onCancel({ nativeEvent }, context.value);
        }
      } else if (state === 5) { // FAILED
        isActive.value = false;
        hasStarted.value = false;
        if (handlers.onFail) {
          handlers.onFail({ nativeEvent }, context.value);
        }
      }
    }
    
    // onActive is called continuously during active gestures
    // Call it if gesture is active or if we don't have state info
    if (isActive.value || (state === undefined && hasStarted.value)) {
      if (handlers.onActive) {
        handlers.onActive({ nativeEvent }, context.value);
      }
    }
    
    // If no state info and this looks like the first event, call onStart
    if (state === undefined && !hasStarted.value) {
      const hasTranslation = 
        Math.abs(nativeEvent.translationX || 0) > 0.1 ||
        Math.abs(nativeEvent.translationY || 0) > 0.1;
      if (hasTranslation && handlers.onStart) {
        hasStarted.value = true;
        isActive.value = true;
        handlers.onStart({ nativeEvent }, context.value);
      }
    }
  }
  
  return eventHandler;
}

// Patch react-native-reanimated if useAnimatedGestureHandler doesn't exist
// This must happen synchronously at module load time
if (!(Reanimated as any).useAnimatedGestureHandler) {
  (Reanimated as any).useAnimatedGestureHandler = useAnimatedGestureHandlerPolyfill;
  // Also patch the default export if it exists
  if ((Reanimated as any).default && !(Reanimated as any).default.useAnimatedGestureHandler) {
    (Reanimated as any).default.useAnimatedGestureHandler = useAnimatedGestureHandlerPolyfill;
  }
}

// Export the polyfill function
export { useAnimatedGestureHandlerPolyfill as useAnimatedGestureHandler };

