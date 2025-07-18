import React from 'react';
import {StyleSheet, useWindowDimensions, View} from "react-native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {Home} from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import {MAIN_ROUTES} from "../contants/routes";
import Icon from "../components/Icon/Icon";
import {PackageDetails} from "../pages/PackageDetails/PackageDetails";
import {AddButton} from "./AddButton/AddButton";
import {useTheme} from "react-native-paper";
import {useDispatch} from "react-redux";
import SearchInput from "./SearchInput/SearchInput";
import UserAccountPage from "../pages/UserAccountPage/UserAccountPage";
import {HomeScreen} from "./Screens/HomeScreen/HomeScreen";

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
    const theme = useTheme();


    return (
        <>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({route}) => ({
                        headerStyle: {
                            backgroundColor: theme.colors.primary,
                        },
                        headerShown: false,
                        headerTitleStyle: styles.headerTitleStyle,
                        tabBarIcon: ({focused, color, size}) => {
                            let iconName;
                            if (route.name === MAIN_ROUTES.PUBLIC.HOME.NAME) iconName = 'home';
                            if (route.name === MAIN_ROUTES.PUBLIC.PROFILE.NAME) iconName = 'profile';
                            if (route.name === MAIN_ROUTES.PUBLIC.REQUESTS.NAME) iconName = 'request';
                            if (route.name === MAIN_ROUTES.PUBLIC.WISHLIST.NAME) iconName = 'heart';
                            else if (route.name === 'Profile') iconName = 'profile';
                            return (
                                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                    <Icon
                                        //@ts-ignore
                                        name={iconName}
                                        size={size}
                                        color={focused ? '#5E4DED' : 'gray'}
                                    />
                                </View>
                            );
                        },
                        tabBarActiveTintColor: '#5E4DED',
                        tabBarInactiveTintColor: 'gray',
                    })}
                >
                    <Tab.Screen
                        // options={{
                        //     headerStyle: [styles.homePageHeaderStyle, {backgroundColor: theme.colors.primary}],
                        //     headerTitle: () => {
                        //         // in figma design input height is 92% on full width , so
                        //         // I think it's will be a good to do by % bcs will look good on other devices
                        //         // Also need to make another components for his to easy handle bottom shit
                        //         return <SearchInput/>
                        //     }
                        // }}
                        key={MAIN_ROUTES.PUBLIC.HOME.KEY}
                        name={MAIN_ROUTES.PUBLIC.HOME.NAME}
                        component={HomeScreen}
                    />
                    <Tab.Screen key={MAIN_ROUTES.PUBLIC.WISHLIST.KEY} name={MAIN_ROUTES.PUBLIC.WISHLIST.NAME}
                                component={PackageDetails}/>
                    <Tab.Screen
                        key={"Add"}
                        name={" "}
                        component={PackageDetails}
                        options={{
                            tabBarShowLabel: false,
                            tabBarIcon: () => {
                                return <AddButton/>
                            }
                        }
                        }
                    />

                    <Tab.Screen key={MAIN_ROUTES.PUBLIC.REQUESTS.KEY} name={MAIN_ROUTES.PUBLIC.REQUESTS.NAME}
                                component={Profile}/>
                    <Tab.Screen key={MAIN_ROUTES.PUBLIC.PROFILE.KEY} name={MAIN_ROUTES.PUBLIC.PROFILE.NAME}
                                component={UserAccountPage}/>
                </Tab.Navigator>
            </NavigationContainer>
        </>
    );
}

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: '#5E4DED',
        borderBottomEndRadius: 24,
        borderBottomStartRadius: 24,
    },
    searchBarStyle: {
        backgroundColor: '#FFFFFF',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 56,
        borderRadius: 16,
        width: '100%',
    },
    headerTitleStyle: {
        fontSize: 22,
        color: '#FFFFFF',
        fontWeight: '400',
    }
})