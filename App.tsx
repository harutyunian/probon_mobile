import {PaperProvider, useTheme} from 'react-native-paper';
import buildProvidersTree from "./src/utils/buildProvidersTree";
import MainNavigator from "./src/navigation/MainNavigator";
import {paperTheme} from "./src/contants/theme";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Provider} from "react-redux";
import {store} from "./src/store";
import CustomBottomSheet from "./src/components/CustomBottomSheet/CustomBottomSheet";
import React, {useEffect, useState} from "react";
import SplashScreen from "./src/components/SplashScreen/SplashScreen";


const ProvidersTree = buildProvidersTree([
    [SafeAreaProvider],
    [GestureHandlerRootView, {flex: 1}],
    [PaperProvider, {theme: paperTheme}],
    [Provider, {store}]
]);


export default function App() {
    const [showApp, setShowApp] = useState(false);

    const handleClose = () => setShowApp(true)

    if (!showApp) {
        return <SplashScreen onFinish={handleClose}/>;
    }

    return (
        <ProvidersTree>
            <MainNavigator/>
            <CustomBottomSheet/>
        </ProvidersTree>
    );
}