import { StyleSheet, View } from "react-native";
import { Text } from 'react-native-paper';
import Icon from "../../Icon/Icon";

export default function SearchResult() {
    return (
        <View style={styles.container}>
            <Icon name="search" size={18} color="#666" />
            <View style={styles.textContainer}>
                <Text style={styles.text}>Search result item</Text>
            </View>
            <Icon name="leftArrow" size={18} color="#999" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 52,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#FAFAFA',
        borderRadius: 12,
        marginBottom: 8,
    },
    textContainer: {
        flex: 1,
        marginLeft: 12,
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
});