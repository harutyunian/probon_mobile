import {StyleSheet} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import buildProvidersTree from "./src/utils/buildProvidersTree";
import MainNavigator from "./src/navigation/MainNavigator";
import {paperTheme} from "./src/contants/theme";
import {SafeAreaProvider} from "react-native-safe-area-context";

const ProvidersTree = buildProvidersTree([
    [SafeAreaProvider],
    [PaperProvider, {theme: paperTheme}],
]);


export default function App() {
    return (
        <ProvidersTree>
            <MainNavigator/>
        </ProvidersTree>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
