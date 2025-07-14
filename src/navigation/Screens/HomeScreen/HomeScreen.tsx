import React from "react";
import { useTheme } from "react-native-paper";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from "../../../pages/Home/Home";
import { MAIN_ROUTES } from "../../../contants/routes";
import SearchInput from "../../SearchInput/SearchInput";
import { PackageDetails } from "../../../pages/PackageDetails/PackageDetails";
import Profile from "../../../pages/Profile/Profile";

const HomeStack = createNativeStackNavigator();

export function HomeScreen() {
    const theme = useTheme();

    return (
        <HomeStack.Navigator
            screenOptions={{headerStyle: { backgroundColor: theme.colors.primary}}}
        >
            <HomeStack.Screen
                name={"HomeStackScreen"}
                component={Home}
                options={{
                    header: () => <SearchInput />,
                }}
            />
            <HomeStack.Screen
                options={{
                    headerTintColor: '#fff',
                }}
                key={MAIN_ROUTES.PUBLIC.DETAILS.KEY}
                name={MAIN_ROUTES.PUBLIC.DETAILS.NAME}
                component={PackageDetails}
            />
            <HomeStack.Screen
                options={{
                    headerTintColor: '#fff',
                }}
                key={MAIN_ROUTES.PUBLIC.PROFILE.KEY}
                name={MAIN_ROUTES.PUBLIC.PROFILE.NAME}
                component={Profile}
            />
        </HomeStack.Navigator>
    );
}

