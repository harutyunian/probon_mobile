// App.tsx - CORRECTED VERSION
import { PaperProvider } from 'react-native-paper';
import MainNavigator from "./src/navigation/MainNavigator";
import { paperTheme } from "./src/contants/theme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "./src/store";
import CustomBottomSheet from "./src/components/CustomBottomSheet/CustomBottomSheet";
import React, { useState, useCallback } from "react";
import SplashScreen from "./src/components/SplashScreen/SplashScreen";
import { StyleSheet, View } from "react-native";

export default function App() {
    const [showApp, setShowApp] = useState(false);

    const handleClose = useCallback(() => setShowApp(true), []);

    if (!showApp) {
        return <SplashScreen onFinish={handleClose} />;
    }

    return (
        // ✅ Redux Provider MUST be outermost so bottom sheet can access store
        <Provider store={store}>
            {/* ✅ GestureHandlerRootView with STYLE prop (not direct flex) */}
            <GestureHandlerRootView style={styles.container}>
                <SafeAreaProvider>
                    <PaperProvider theme={paperTheme}>
                        {/* ✅ Use a View wrapper to control z-index stacking */}
                        <View style={styles.container}>
                            <MainNavigator />
                            {/* ✅ BottomSheet rendered AFTER Navigator = higher in view hierarchy */}
                            <CustomBottomSheet />
                        </View>
                    </PaperProvider>
                </SafeAreaProvider>
            </GestureHandlerRootView>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});