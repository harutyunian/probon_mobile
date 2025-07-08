import {View, StyleSheet} from "react-native";
import {Text, useTheme} from "react-native-paper";
import Icon from "../../../components/Icon/Icon";

export function ContactInfo() {
    const {colors} = useTheme();

    return <View style={{marginTop: 36
    }}>
        <View style={styles.info}>
            <View style={styles.iconContainer}>
                <Icon name='locationIcon' size={15} color={colors.primary}/>
            </View>
            <View style={styles.mainText}>
                <Text style={styles.type}>Working hours</Text>
                <Text style={styles.infoDetails}>Armenia , Baghramyan Str 17</Text>
            </View>
        </View>
        <View style={styles.info}>
            <View style={styles.iconContainer}>
                <Icon name='clock' size={15} color={colors.primary}/>
            </View>
            <View style={styles.mainText}>
                <Text style={styles.type}>Working hours</Text>
                <Text style={styles.infoDetails}>Every day 10:00 - 18:00</Text>

            </View>
        </View>
        <View style={styles.info}>
            <View style={styles.iconContainer}>
                <Icon name='phone' size={15} color={colors.primary}/>
            </View>
            <View style={styles.mainText}>
                <Text style={styles.type}>Contact</Text>
                <Text style={styles.infoDetails}>+374 98 00 00 00</Text>
            </View>
        </View>
    </View>
}

const styles = StyleSheet.create({
    iconContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        width: 48,
        height: 48,
        backgroundColor: "#EFEDFD"
    },
    infoDetails: {
        fontSize: 16,
        fontWeight: "500",
    },
    type: {
        fontSize: 12,
        lineHeight: 16,
        color: "#45424D",
    },
    mainText: {

    },
    info: {
        paddingVertical: 8,
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderColor: "#E7E6E8",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        columnGap: 16
    }
})