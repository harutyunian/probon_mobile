
import React from 'react';
import { Animated } from 'react-native';

type ScrollContextType = {
    scrollY: Animated.Value | null;
};

export const ScrollContext = React.createContext<ScrollContextType>({
    scrollY: null,
});