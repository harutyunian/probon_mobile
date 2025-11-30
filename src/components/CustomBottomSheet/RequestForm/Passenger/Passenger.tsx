import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {Button, useTheme} from "react-native-paper";
import Icon from "../../../Icon/Icon";
import {useState} from "react";
import {useAppDispatch} from "../../../../hooks/redux";
import {closeBottomSheet} from "../../../../store/bottomSheetSlice/bottomSheetSlice";

interface PassengerCounts {
    adults: number;
    children: number;
    infants: number;
}

export default function Passenger() {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const [counts, setCounts] = useState<PassengerCounts>({
        adults: 1,
        children: 0,
        infants: 0,
    });

    const handleDecrease = (type: keyof PassengerCounts) => {
        setCounts((prev) => {
            const newValue = Math.max(0, prev[type] - 1);
            // Ensure at least 1 adult if there are children or infants
            if (type === 'adults' && newValue === 0 && (prev.children > 0 || prev.infants > 0)) {
                return prev;
            }
            return {...prev, [type]: newValue};
        });
    };

    const handleIncrease = (type: keyof PassengerCounts) => {
        setCounts((prev) => ({
            ...prev,
            [type]: prev[type] + 1,
        }));
    };

    const handleSave = () => {
        // TODO: Save passenger counts to Redux store
        dispatch(closeBottomSheet());
    };

    const handleClose = () => {
        dispatch(closeBottomSheet());
    };

    const renderPassengerRow = (
        label: string,
        ageRange: string,
        type: keyof PassengerCounts
    ) => {
        const count = counts[type];
        const isDecreaseDisabled = count === 0 || (type === 'adults' && count === 1 && (counts.children > 0 || counts.infants > 0));

        return (
            <View style={styles.passengerRow}>
                <View style={styles.passengerInfo}>
                    <Text style={styles.passengerLabel}>{label}</Text>
                    <Text style={styles.passengerAgeRange}>{ageRange}</Text>
                </View>
                <View style={styles.stepperContainer}>
                    <TouchableOpacity
                        style={[
                            styles.stepperButton,
                            isDecreaseDisabled && styles.stepperButtonDisabled,
                        ]}
                        onPress={() => handleDecrease(type)}
                        disabled={isDecreaseDisabled}
                    >
                        <Text
                            style={[
                                styles.stepperButtonText,
                                isDecreaseDisabled && styles.stepperButtonTextDisabled,
                            ]}
                        >
                            -
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.countText}>{count}</Text>
                    <TouchableOpacity
                        style={styles.stepperButton}
                        onPress={() => handleIncrease(type)}
                    >
                        <Text style={styles.stepperButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <Button mode="text" onPress={handleClose}>
                    <Icon name="close" size={14} color={"grey"}/>
                </Button>
                <Text style={styles.title}>Passengers</Text>
                <Button mode="text" onPress={handleSave} textColor={theme.colors.primary}>
                    Save
                </Button>
            </View>
            <View style={styles.passengerSelectionBody}>
                {renderPassengerRow('Adults', 'Over 12 years old', 'adults')}
                {renderPassengerRow('Children', '2-12 years old', 'children')}
                {renderPassengerRow('Infants', '0-2 years old', 'infants')}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: 16,
    },
    head: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 24,
        paddingTop: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: "#000",
    },
    passengerSelectionBody: {
        gap: 24,
    },
    passengerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    passengerInfo: {
        flex: 1,
    },
    passengerLabel: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000",
        marginBottom: 4,
    },
    passengerAgeRange: {
        fontSize: 14,
        color: "#74717A",
    },
    stepperContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
    },
    stepperButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#5E4DED",
        alignItems: "center",
        justifyContent: "center",
    },
    stepperButtonDisabled: {
        backgroundColor: "#E0E0E0",
    },
    stepperButtonText: {
        fontSize: 18,
        fontWeight: "600",
        color: "#FFFFFF",
    },
    stepperButtonTextDisabled: {
        color: "#74717A",
    },
    countText: {
        fontSize: 16,
        fontWeight: "400",
        color: "#000",
        minWidth: 20,
        textAlign: "center",
    },
})