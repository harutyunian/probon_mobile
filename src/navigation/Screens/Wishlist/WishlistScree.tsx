import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useTheme} from "react-native-paper";
import Wishlist from "../../../pages/Wishlist/Wishlist";
import {memo, useMemo} from "react";

const WishlistStack = createNativeStackNavigator();

function WishlistStackScreen() {
    const theme = useTheme();

    const wishLstMainScreenOption = useMemo(() => {
        return {headerTintColor: '#fff', headerStyle: {backgroundColor: theme.colors.primary}}
    }, [])

    return <WishlistStack.Navigator screenOptions={wishLstMainScreenOption}>
        <WishlistStack.Screen name="Whishlist" component={Wishlist}/>
    </WishlistStack.Navigator>
}

export default memo(WishlistStackScreen);