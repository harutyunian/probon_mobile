import {
    View, Text, StyleSheet
} from "react-native";
import {useTheme} from "react-native-paper";

export function AddButton() {
    const theme = useTheme();

    return <View style={[styles.container, {backgroundColor: theme.colors.primary}]}><Text style={styles.text}>+</Text></View>
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "100%",
        width: 52,
        height: 52,
    },
    text:{
        fontSize: 24,
        color: "white",
        fontWeight: "normal"
    }
})