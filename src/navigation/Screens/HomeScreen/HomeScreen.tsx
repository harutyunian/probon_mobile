import {memo, useCallback, useMemo, useRef} from "react";
import {Animated, StyleSheet} from 'react-native';
import {useTheme} from "react-native-paper";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from "../../../pages/Home/Home";
import {MAIN_ROUTES} from "../../../contants/routes";
import SearchInput from "../../SearchInput/SearchInput";
import {PackageDetails} from "../../../pages/PackageDetails/PackageDetails";
import Profile from "../../../pages/Profile/Profile";
import {ScrollContext} from "./ScrollContext";

const HomeStack = createNativeStackNavigator();
const HEADER_HEIGHT = 60;

function HomeScreen(): React.JSX.Element {
    const theme = useTheme();
    const scrollY = useRef(new Animated.Value(0)).current;

    const headerTranslateY = useMemo(() => scrollY.interpolate({
        inputRange: [0, HEADER_HEIGHT],
        outputRange: [0, -HEADER_HEIGHT],
        extrapolate: 'clamp',
    }), [HEADER_HEIGHT])

    const headerOpacity = useMemo(() => scrollY.interpolate({
        inputRange: [0, HEADER_HEIGHT / 2],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    }), [HEADER_HEIGHT])

    const homeStackScreenOptions = useMemo(() => {
        return {
            headerStyle: {backgroundColor: theme.colors.primary},
            headerTransparent: true,
        }
    }, [theme])

    const packageDetailsScreenOptions = useMemo(() => {
        return {
            gestureEnabled: true,
            headerTintColor: '#fff',
            headerTransparent: false,
            headerStyle: {backgroundColor: theme.colors.primary}
        }
    }, [])

    const profileScreenOptions = useMemo(() => {
        return {
            headerTintColor: '#fff',
            headerTransparent: false,
            headerStyle: {backgroundColor: theme.colors.primary}
        }
    }, [])

    const animatedSearchStyles = useMemo(() => {
        return {
            backgroundColor: theme.colors.primary,
            transform: [{translateY: headerTranslateY}],
            opacity: headerOpacity,
        }
    }, [headerOpacity, theme, headerTranslateY])

    const HeaderSearch = useCallback(() => {
        return <Animated.View style={[styles.searchAnimated, animatedSearchStyles]}>
            <SearchInput/>
        </Animated.View>
    }, [animatedSearchStyles])

    return (
        <ScrollContext.Provider value={{scrollY}}>
            <HomeStack.Navigator screenOptions={homeStackScreenOptions}>
                <HomeStack.Screen
                    name={"HomeStackScreen"}
                    component={Home}
                    options={{
                        headerTitle: "",
                        header: () => <HeaderSearch/>,
                    }}
                />
                <HomeStack.Screen
                    options={packageDetailsScreenOptions}
                    key={MAIN_ROUTES.PUBLIC.DETAILS.KEY}
                    name={MAIN_ROUTES.PUBLIC.DETAILS.NAME}
                    component={PackageDetails}
                />
                <HomeStack.Screen
                    options={profileScreenOptions}
                    key={MAIN_ROUTES.PUBLIC.PROFILE.KEY}
                    name={MAIN_ROUTES.PUBLIC.PROFILE.NAME}
                    component={Profile}
                />
            </HomeStack.Navigator>
        </ScrollContext.Provider>
    );
}

const styles = StyleSheet.create({
    searchAnimated: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: HEADER_HEIGHT,
        elevation: 4,
        zIndex: 100,
    }
})

export default HomeScreen