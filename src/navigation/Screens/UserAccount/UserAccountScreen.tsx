import {createNativeStackNavigator} from "@react-navigation/native-stack";
import UserAccountPage from "../../../pages/UserAccountPage/UserAccountPage";
import {useTheme} from "react-native-paper";
import {memo, useMemo} from "react";

const HomeStack = createNativeStackNavigator();

export function UserAccountPageScreen() {
    const theme = useTheme();

    const userAccountMainScreenOptions = useMemo(() => {
        return {headerTintColor: '#fff', headerStyle: {backgroundColor: theme.colors.primary}}
    }, [])

    return <HomeStack.Navigator screenOptions={userAccountMainScreenOptions}>
        <HomeStack.Screen name="Profile" component={UserAccountPage}/>
    </HomeStack.Navigator>
}

export default memo(UserAccountPageScreen);