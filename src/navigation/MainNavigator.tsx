import React, {useState} from 'react';
import {StyleSheet, View} from "react-native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {Home} from "../pages/Home/Home";
import Profile from "../pages/Profile/Profile";
import {MAIN_ROUTES} from "../contants/routes";
import Icon from "../components/Icon/Icon";
import {PackageDetails} from "../pages/PackageDetails/PackageDetails";
import SplashScreen from "../components/SplashScreen/SplashScreen";
import {AddButton} from "./AddButton/AddButton";

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
    const [showApp, setShowApp] = useState(false);

    const handleClose = () => setShowApp(true)

    if (!showApp) {
        return <SplashScreen onFinish={handleClose}/>;
    }

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({route}) => ({
                    // header: (navigation) => <CustomHeader {...navigation} />,
                    headerBackButtonDisplayMode: 'minimal',
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
                <Tab.Screen key={MAIN_ROUTES.PUBLIC.HOME.KEY} name={MAIN_ROUTES.PUBLIC.HOME.NAME} component={Home}/>
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
                            component={Profile}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: '#5E4DED',
        borderBottomEndRadius: 24,
        borderBottomStartRadius: 24,
    }
})