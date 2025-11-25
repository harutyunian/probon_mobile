import {StyleSheet, View} from "react-native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {MAIN_ROUTES} from "../contants/routes";
import Icon from "../components/Icon/Icon";
import {PackageDetails} from "../pages/PackageDetails/PackageDetails";
import {AddButton} from "./AddButton/AddButton";
import {useTheme} from "react-native-paper";
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import UserAccountPageScreen from "./Screens/UserAccount/UserAccountScreen";
import WishlistStackScreen from "./Screens/Wishlist/WishlistScree";
import UserRequestsPage from "../pages/UserRequest/UserRequest";
import {useCallback} from "react";
import type {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import type {RouteProp} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

type MainScreenOptionsProps = {
    route: RouteProp<Record<string, object | undefined>, string>;
};

export default function MainNavigator() {
    const theme = useTheme();
    const {primary} = theme.colors

    const mainScreenOptions = useCallback(({route}: MainScreenOptionsProps): BottomTabNavigationOptions => {
        return {
            headerShown: false,
            tabBarActiveTintColor: primary,
            tabBarInactiveTintColor: 'gray',
            headerStyle: { backgroundColor: primary},
            headerTitleStyle: styles.headerTitleStyle,
            tabBarIcon: ({focused, size}: any) => {
                const iconMap: Record<string, string> = {
                    [MAIN_ROUTES.PUBLIC.HOME.NAME]: 'home',
                    [MAIN_ROUTES.PUBLIC.PROFILE.NAME]: 'profile',
                    [MAIN_ROUTES.PUBLIC.REQUESTS.NAME]: 'request',
                    [MAIN_ROUTES.PUBLIC.WISHLIST.NAME]: 'heart',
                };
                const iconName = iconMap[route.name] ?? 'defaultIcon';
                return (
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Icon
                            //@ts-ignore
                            name={iconName}
                            size={size}
                            color={focused ? primary : 'gray'}
                        />
                    </View>
                );
            }
        }
    }, [theme])


    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={mainScreenOptions}>
                <Tab.Screen
                    key={MAIN_ROUTES.PUBLIC.HOME.KEY}
                    name={MAIN_ROUTES.PUBLIC.HOME.NAME}
                    component={HomeScreen}
                />
                <Tab.Screen
                    key={MAIN_ROUTES.PUBLIC.WISHLIST.KEY}
                    name={MAIN_ROUTES.PUBLIC.WISHLIST.NAME}
                    component={WishlistStackScreen}
                />
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

                <Tab.Screen
                    options={{
                        headerShown: true
                    }}
                    key={MAIN_ROUTES.PUBLIC.REQUESTS.KEY}
                    name={MAIN_ROUTES.PUBLIC.REQUESTS.NAME}
                    component={UserRequestsPage}
                />
                <Tab.Screen
                    key={MAIN_ROUTES.PUBLIC.PROFILE.KEY}
                    name={MAIN_ROUTES.PUBLIC.PROFILE.NAME}
                    component={UserAccountPageScreen}
                />
            </Tab.Navigator>
        </NavigationContainer>
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