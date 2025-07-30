import {createNativeStackNavigator} from "@react-navigation/native-stack";
import UserAccountPage from "../../../pages/UserAccountPage/UserAccountPage";
import {useTheme} from "react-native-paper";

const HomeStack = createNativeStackNavigator();

export function UserAccountPageScreen (){

    const theme = useTheme();


    return <HomeStack.Navigator
        screenOptions={{headerTintColor: '#fff', headerStyle: {backgroundColor: theme.colors.primary}}}
    >
        <HomeStack.Screen name="Profile" component={UserAccountPage}/>
    </HomeStack.Navigator>
}