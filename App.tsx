import {PaperProvider} from 'react-native-paper';
import MainNavigator from "./src/navigation/MainNavigator";
import {paperTheme} from "./src/contants/theme";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {Provider} from "react-redux";
import {store} from "./src/store";
import CustomBottomSheet from "./src/components/CustomBottomSheet/CustomBottomSheet";
import React, {useState, useCallback} from "react";
import SplashScreen from "./src/components/SplashScreen/SplashScreen";
import {StyleSheet, View, Platform, UIManager} from "react-native";

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
    const [showApp, setShowApp] = useState(false);

    const handleClose = useCallback(() => setShowApp(true), []);

    if (!showApp) {
        return <SplashScreen onFinish={handleClose}/>;
    }

    return (
        <Provider store={store}>
            <GestureHandlerRootView style={styles.container}>
                    <PaperProvider theme={paperTheme}>
                        <View style={styles.container}>
                            <MainNavigator/>
                        </View>
                        {/* BottomSheet outside the main View for proper z-index stacking */}
                        <CustomBottomSheet/>
                    </PaperProvider>
            </GestureHandlerRootView>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
