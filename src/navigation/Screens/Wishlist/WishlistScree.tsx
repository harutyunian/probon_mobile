import {createNativeStackNavigator} from "@react-navigation/native-stack";
import UserAccountPage from "../../../pages/UserAccountPage/UserAccountPage";
import {useTheme} from "react-native-paper";
import Wishlist from "../../../pages/Wishlist/Wishlist";

const  WishlistStack= createNativeStackNavigator();

export function WishlistStackScreen (){

    const theme = useTheme();


    return <WishlistStack.Navigator
        screenOptions={{headerTintColor: '#fff', headerStyle: {backgroundColor: theme.colors.primary}}}
    >
        <WishlistStack.Screen name="Whishlist" component={Wishlist}/>
    </WishlistStack.Navigator>
}