/**
 * Patched GestureHandler component that supports both onGestureEvent and onHandlerStateChange
 * This is needed for react-native-reanimated v4 compatibility
 */
import React, { memo } from 'react';
import { PanGestureHandler, PanGestureHandlerProps, gestureHandlerRootHOC } from 'react-native-gesture-handler';

const GestureHandler = gestureHandlerRootHOC(
  ({ children, onGestureEvent }: PanGestureHandlerProps) => {
    // Extract onHandlerStateChange from onGestureEvent if it's a function with properties
    // (our polyfill returns a function with onHandlerStateChange property)
    const gestureHandler = onGestureEvent as any;
    const onHandlerStateChange = 
      gestureHandler && 
      (typeof gestureHandler === 'function' || typeof gestureHandler === 'object') &&
      gestureHandler.onHandlerStateChange
        ? gestureHandler.onHandlerStateChange
        : undefined;
    
    // Use the function directly or extract onGestureEvent property
    const onGestureEventHandler = 
      gestureHandler && 
      typeof gestureHandler === 'object' && 
      gestureHandler.onGestureEvent
        ? gestureHandler.onGestureEvent
        : onGestureEvent;

    return (
      <PanGestureHandler 
        onGestureEvent={onGestureEventHandler}
        onHandlerStateChange={onHandlerStateChange}
      >
        {children}
      </PanGestureHandler>
    );
  },
);

export default memo(GestureHandler);

