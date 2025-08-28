import {View, StyleSheet} from "react-native";
import {Button, Text} from "react-native-paper";
import {memo} from "react";
import {useSafeAreaInsets} from "react-native-safe-area-context";

function EventCardInfo() {
    const insets = useSafeAreaInsets();
    const navigationBarHeight = insets.bottom;


    return <View style={[styles.overlayWrap, {bottom: navigationBarHeight+60}]}>
        <View style={styles.overlayCard}>
            <Text style={styles.overlayBy}>By One Way Tour</Text>
            <Text style={styles.overlayTitle}>Wine days in Dilijan</Text>
            <Text style={styles.overlayMeta}>Dilijan, Armenia</Text>
            <Text style={styles.overlayMeta}>Jul 3 - Jul 12</Text>
            <Text style={styles.overlayDesc}>
                Get to know Abu Dhabi on a day trip from Dubai that lets you explore the largest emirate on a time
                budget. All transportation is included
            </Text>
            <Button
                mode="contained"
                onPress={() => console.log('See more')}
                style={styles.overlayButton}
            >
                See more
            </Button>
        </View>
    </View>
}

const styles = StyleSheet.create({
    overlayWrap: {
        position: 'absolute',
        left: 12,
        right: 12,
        alignItems: 'center',

    },
    overlayCard: {
        backgroundColor: 'rgba(0,0,0,0.55)',
        borderRadius: 16,
        padding: 16,
        width: '92%',
        alignSelf: 'center',
    },
    overlayBy: {
        color: 'rgba(255,255,255,0.85)',
        marginBottom: 4,
        fontSize: 12,
    },
    overlayTitle: {
        color: 'white',
        fontWeight: '800',
        fontSize: 22,
        marginBottom: 8,
    },
    overlayMeta: {
        color: 'white',
        opacity: 0.9,
        marginBottom: 6,
    },
    overlayDesc: {
        color: 'white',
        opacity: 0.9,
        marginTop: 8,
        marginBottom: 14,
    },
    overlayButton: {
        alignSelf: 'stretch',
        borderRadius: 28,
    },
})
export default memo(EventCardInfo);