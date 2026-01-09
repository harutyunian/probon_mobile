import {Pressable, StyleSheet, Text, View} from "react-native";
import {useEffect, useMemo} from "react";
import {Checkbox, TextInput, useTheme} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {openBottomSheet} from "../../../../store/bottomSheetSlice/bottomSheetSlice";
import {BOTTOM_SHEET} from "../../../../store/bottomSheetSlice/types";
import {setCreateRequestForm} from "../../../../store/createRequestFormSlice/createRequestFormSlice";

export default function RequestDetailsForm() {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    
    // Separate selectors to prevent re-renders when category/subcategory changes
    const dateRange = useAppSelector(state => state.createRequestForm.form.dateRange);
    const passengers = useAppSelector(state => state.createRequestForm.form.passengers);
    const priceRange = useAppSelector(state => state.createRequestForm.form.priceRange);
    const tourismType = useAppSelector(state => state.createRequestForm.form.tourismType);
    const isGroupTour = useAppSelector(state => state.createRequestForm.form.isGroupTour);
    const page = useAppSelector(state => state.createRequestForm.page);

    const handlePressPeople = () => {
        dispatch(openBottomSheet({type: BOTTOM_SHEET.SELECT_PASSENGER}))
    }
    const handlePressCalendar = () => {
        dispatch(openBottomSheet({type: BOTTOM_SHEET.DATE_PICKER, height: "65%"}))
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

    const formattedPriceRange = useMemo(() => {
        if (!priceRange) {
            return "";
        }

        const hasMin = typeof priceRange.min === "number";
        const hasMax = typeof priceRange.max === "number";

        if (hasMin && hasMax) {
            return `$${priceRange.min} - $${priceRange.max}`;
        }
        if (hasMin) {
            return `From $${priceRange.min}`;
        }
        if (hasMax) {
            return `Up to $${priceRange.max}`;
        }
        return "";
    }, [priceRange]);

    const formattedTourismType = useMemo(() => {
        if (!tourismType) {
            return "";
        }

        const suffix = isGroupTour === undefined
            ? ""
            : isGroupTour
                ? " • Group tour"
                : " • Private tour";

        return `${tourismType.type}${suffix}`;
    }, [tourismType, isGroupTour]);

    const tourAndEventValue = useMemo(() => {
        if (isGroupTour === undefined) {
            return "";
        }
        return isGroupTour ? "Group tour" : "Private tour";
    }, [isGroupTour]);

    // Enable Next when all required Request fields are filled; disable otherwise.
    useEffect(() => {
        if (page !== 1) {
            return;
        }

        const hasPassengers = !!(passengers && (passengers.adults + passengers.children + passengers.infants) > 0);
        // Accept at least a start date; end date optional for validation
        const hasDates = !!dateRange?.startDate;
        const hasTourismType = !!tourismType?.value;
        const hasPriceRange = typeof priceRange?.min === "number" && typeof priceRange?.max === "number";
        const hasGroupChoice = typeof isGroupTour === "boolean";

        const isRequestValid = hasPassengers && hasDates && hasTourismType && hasPriceRange && hasGroupChoice;

        dispatch(setCreateRequestForm({
            nextButtonDisabled: !isRequestValid,
            disableRequest: !isRequestValid, // Keep Property tab locked until Request is valid
        }));
    }, [page, passengers, dateRange, tourismType, priceRange, isGroupTour, dispatch]);


    const handlePressTourismType = () => {
        dispatch(openBottomSheet({type: BOTTOM_SHEET.TOURISM_TYPE, height: "60%"}))
    }
    const handlePressPriceRange = () => {
        dispatch(openBottomSheet({type: BOTTOM_SHEET.PRICE_RANGE}))
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
        <Pressable onPress={handlePressPeople} style={styles.textInput}>
            <TextInput
                key={`people-${formattedPassengers}`}
                style={styles.textInput}
                outlineStyle={styles.inputRadius}
                mode="outlined"
                placeholder="People"
                label="People"
                value={formattedPassengers}
                editable={false}
                pointerEvents="none"
                left={<TextInput.Icon icon="account"/>}
            />
        </Pressable>
        <Pressable onPress={handlePressCalendar} style={styles.textInput}>
            <TextInput
                style={styles.textInput}
                outlineStyle={styles.inputRadius}
                mode="outlined"
                placeholder="Dates"
                label="Dates"
                value={formattedDateRange}
                editable={false}
                pointerEvents="none"
                left={<TextInput.Icon icon="calendar-range-outline"/>}
            />
        </Pressable>
        <Pressable onPress={handlePressTourismType} style={styles.textInput}>
            <TextInput
                style={styles.textInput}
                outlineStyle={styles.inputRadius}
                mode="outlined"
                placeholder="Tourism Type*"
                label="Tourism Type*"
                editable={false}
                pointerEvents="none"
                value={formattedTourismType}
                left={<TextInput.Icon icon="flag-variant-outline"/>}
            />
        </Pressable>
        <TextInput
            style={styles.textInput}
            outlineStyle={styles.inputRadius}
            mode="outlined"
            placeholder="Tour & event"
            label="Tour & event"
            editable={false}
            pointerEvents="none"
            value={tourAndEventValue}
            left={<TextInput.Icon icon="search-web"/>}
        />
        <Pressable onPress={handlePressPriceRange} style={styles.textInput}>
            <TextInput
                style={styles.textInput}
                outlineStyle={styles.inputRadius}
                mode="outlined"
                placeholder="Price range"
                label="Price range"
                editable={false}
                pointerEvents="none"
                value={formattedPriceRange}
                left={<TextInput.Icon icon="currency-usd"/>}
            />
        </Pressable>
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