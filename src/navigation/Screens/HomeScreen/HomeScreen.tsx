// src/navigation/Screens/HomeScreen/HomeScreen.tsx

// --- TYPE ADDED ---
import React, { useRef } from "react";
import { useTheme } from "react-native-paper";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Animated } from 'react-native';

import { Home } from "../../../pages/Home/Home";
import { MAIN_ROUTES } from "../../../contants/routes";
import SearchInput from "../../SearchInput/SearchInput";
import { PackageDetails } from "../../../pages/PackageDetails/PackageDetails";
import Profile from "../../../pages/Profile/Profile";
import { ScrollContext } from "./ScrollContext";

const HomeStack = createNativeStackNavigator();
const HEADER_HEIGHT = 60;

// --- TYPE ADDED: Explicit component return type ---
export function HomeScreen(): React.JSX.Element {
    const theme = useTheme();
    // TypeScript correctly infers the type of scrollY from its initial value
    const scrollY = useRef(new Animated.Value(0)).current;

    const headerTranslateY = scrollY.interpolate({
        inputRange: [0, HEADER_HEIGHT],
        outputRange: [0, -HEADER_HEIGHT],
        extrapolate: 'clamp',
    });

    const headerOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_HEIGHT / 2],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    return (
        <ScrollContext.Provider value={{ scrollY }}>
            <HomeStack.Navigator
                screenOptions={{
                    // animation: 'fade_from_bottom',
                    gestureDirection: 'horizontal',
                    headerSearchBarOptions: {
                        autoCapitalize: 'characters',
                        barTintColor: 'white',
                        // tintColor: 'green',
                        cancelButtonText: 'aper',
                        placement:  "automatic",
                    },
                    headerStyle: { backgroundColor: theme.colors.primary },
                    headerTransparent: true,
                }}
            >
                <HomeStack.Screen
                    name={"HomeStackScreen"}
                    component={Home}
                    options={{
                        headerTitle: '',
                        header: () => (
                            <Animated.View
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    height: HEADER_HEIGHT,
                                    backgroundColor: theme.colors.primary,
                                    transform: [{ translateY: headerTranslateY }],
                                    opacity: headerOpacity,
                                    elevation: 4,
                                    zIndex: 100,
                                }}
                            >
                                <SearchInput />
                            </Animated.View>
                        ),
                    }}
                />
                <HomeStack.Screen
                    options={{
                        gestureEnabled: true,
                        headerTintColor: '#fff',
                        headerTransparent: false,
                        headerStyle: { backgroundColor: theme.colors.primary }
                    }}
                    key={MAIN_ROUTES.PUBLIC.DETAILS.KEY}
                    name={MAIN_ROUTES.PUBLIC.DETAILS.NAME}
                    component={PackageDetails}
                />
                <HomeStack.Screen
                    options={{
                        headerTintColor: '#fff',
                        headerTransparent: false,
                        headerStyle: { backgroundColor: theme.colors.primary }
                    }}
                    key={MAIN_ROUTES.PUBLIC.PROFILE.KEY}
                    name={MAIN_ROUTES.PUBLIC.PROFILE.NAME}
                    component={Profile}
                />
            </HomeStack.Navigator>
        </ScrollContext.Provider>
    );
}