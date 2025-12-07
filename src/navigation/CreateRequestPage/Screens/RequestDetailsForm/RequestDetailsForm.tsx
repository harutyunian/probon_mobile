import {StyleSheet, Text, View} from "react-native";
import {useMemo} from "react";
import {Checkbox, TextInput, useTheme} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {openBottomSheet} from "../../../../store/bottomSheetSlice/bottomSheetSlice";
import {BOTTOM_SHEET} from "../../../../store/bottomSheetSlice/types";

export default function RequestDetailsForm() {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const {dateRange, passengers} = useAppSelector(state => state.createRequestForm.form);

    const handlePressPeople = () => {
        dispatch(openBottomSheet({type: BOTTOM_SHEET.SELECT_PASSENGER, width: "38%"}))
    }
    const handlePressCalendar = () => {
        dispatch(openBottomSheet({type: BOTTOM_SHEET.DATE_PICKER, width: "50%"}))
    }

    const formattedDateRange = useMemo(() => {
        if (!dateRange?.startDate && !dateRange?.endDate) {
            return "Dates";
        }

        const formatDate = (dateString: string) => {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        };

        if (dateRange.startDate && dateRange.endDate) {
            return `${formatDate(dateRange.startDate)} - ${formatDate(dateRange.endDate)}`;
        } else if (dateRange.startDate) {
            return `From ${formatDate(dateRange.startDate)}`;
        } else if (dateRange.endDate) {
            return `Until ${formatDate(dateRange.endDate)}`;
        }

        return "Dates";
    }, [dateRange]);

    const formattedPassengers = useMemo(() => {
        if (!passengers) {
            return "";
        }

        const parts: string[] = [];

        if (passengers.adults > 0) {
            parts.push(`${passengers.adults} ${passengers.adults === 1 ? 'Adult' : 'Adults'}`);
        }
        if (passengers.children > 0) {
            parts.push(`${passengers.children} ${passengers.children === 1 ? 'Child' : 'Children'}`);
        }
        if (passengers.infants > 0) {
            parts.push(`${passengers.infants} ${passengers.infants === 1 ? 'Infant' : 'Infants'}`);
        }

        // If we have passengers object but all counts are 0, show default
        if (parts.length === 0) {
            return "";
        }

        return parts.join(', ');
    }, [passengers]);


    const handlePressTourismType = () => {
        dispatch(openBottomSheet({type: BOTTOM_SHEET.TOURISM_TYPE, width: "40%"}))
    }

    return <View style={styles.container}>
        <TextInput
            style={styles.textInput}
            outlineStyle={styles.inputRadius}
            mode="outlined"
            placeholder="Request title"
            label="Request title"
            left={<TextInput.Icon icon="format-title"/>}
        />
        <TextInput
            key={`people-${formattedPassengers}`}
            onPress={handlePressPeople}
            style={styles.textInput}
            outlineStyle={styles.inputRadius}
            mode="outlined"
            placeholder="People"
            label="People"
            value={formattedPassengers}
            editable={false}
            left={<TextInput.Icon icon="account"/>}
        />
        <TextInput
            style={styles.textInput}
            outlineStyle={styles.inputRadius}
            onPress={handlePressCalendar}
            mode="outlined"
            placeholder="Dates"
            label="Dates"
            value={formattedDateRange}
            editable={false}
            left={<TextInput.Icon icon="calendar-range-outline"/>}
        />
        <TextInput
            style={styles.textInput}
            outlineStyle={styles.inputRadius}
            onPress={handlePressTourismType}
            mode="outlined"
            placeholder="Tourism Type*"
            label="Tourism Type*"
            left={<TextInput.Icon icon="flag-variant-outline"/>}
        />
        <TextInput
            style={styles.textInput}
            outlineStyle={styles.inputRadius}
            mode="outlined"
            placeholder="Tour & event"
            label="Tour & event"
            left={<TextInput.Icon icon="search-web"/>}
        />
        <TextInput
            style={styles.textInput}
            outlineStyle={styles.inputRadius}
            mode="outlined"
            placeholder="Price range"
            label="Price range"
            left={<TextInput.Icon icon="currency-usd"/>}
        />
        <Text>Please write price range in a currency you selected from
            <Text style={{
                color: theme.colors.primary,
                textDecorationLine: 'underline',
                fontWeight: '700'
            }}> Currency</Text>
        </Text>
        <View style={styles.visaWrapper}>
            <Checkbox.Android
                status={"checked"}
            />
            <Text style={{marginLeft: 8}}>Visa Included</Text>
        </View>
    </View>
}
const styles = StyleSheet.create({
    container: {
        rowGap: 20,
        paddingHorizontal: 16,
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    inputRadius: {
        borderRadius: 16,
    },
    textInput: {
        width: '100%',
        height: 56
    },
    visaWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
    }
})