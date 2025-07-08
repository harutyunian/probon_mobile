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
import {CustomHeader} from "./CuatomHeader/CustomHeader";
import {AddButton} from "./AddButton/AddButton";

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
    const [showApp, setShowApp] = useState(false);

    const handleClose = () => {
        setShowApp(true)
    }
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

                        if (route.name === 'Home') iconName = 'home';
                        if (route.name === 'Add') iconName = 'home';
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
                <Tab.Screen key={MAIN_ROUTES.PUBLIC.DETAILS.KEY} name={MAIN_ROUTES.PUBLIC.DETAILS.NAME} component={PackageDetails}/>
                <Tab.Screen key={MAIN_ROUTES.PUBLIC.HOME.KEY} name={MAIN_ROUTES.PUBLIC.HOME.NAME} component={Home}/>
                <Tab.Screen
                    key={"Add"}
                    // here I just add empty string, bcs removing text is a waste of extra time
                    name={" "}
                    component={PackageDetails}
                    options={{
                        tabBarShowLabel: false,
                        tabBarIcon:() =>{
                            return  <AddButton  />
                        }}
                    }
                />

                <Tab.Screen key={MAIN_ROUTES.PUBLIC.PROFILE.KEY} name={MAIN_ROUTES.PUBLIC.PROFILE.NAME}component={Profile}/>
                <Tab.Screen key={'aper'} name={"aper"} component={Profile}/>
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