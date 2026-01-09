import {useMemo, useCallback, useState} from "react";
import {StyleSheet, View, TouchableOpacity} from "react-native";
import {Calendar, DateData} from "react-native-calendars";
import {Text, Button, useTheme} from "react-native-paper";
import Icon from "../../../Icon/Icon";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {closeBottomSheet} from "../../../../store/bottomSheetSlice/bottomSheetSlice";
import {setCreateRequestFormField} from "../../../../store/createRequestFormSlice/createRequestFormSlice";
import {IDateRange} from "../../../../types/requestFormSlice";

// Constants for colors that don't come from theme
const SELECTED_RANGE_COLOR = '#DFDBFB';
const TEXT_COLOR = '#000000';
const DISABLED_COLOR = '#D0D0D0';
const SECONDARY_TEXT_COLOR = '#74717A';
const BORDER_COLOR = '#F0F0F0';
const WHITE_COLOR = '#FFFFFF';

interface MarkedDates {
    [date: string]: {
        selected?: boolean;
        marked?: boolean;
        startingDay?: boolean;
        endingDay?: boolean;
        color?: string;
        textColor?: string;
        disabled?: boolean;
        disableTouchEvent?: boolean;
    };
}

// Month names array defined outside component for performance
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Helper function to format date - defined outside component to prevent recreation
const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}`;
};

// Helper function to convert date string to ISO format
const toISOString = (dateString: string): string => {
    return new Date(dateString).toISOString();
};

// Helper function to get today's date in YYYY-MM-DD format
const getTodayDateString = (): string => {
    return new Date().toISOString().split('T')[0];
};

export default function DatePicker() {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const existingDateRange = useAppSelector(state => state.createRequestForm.form.dateRange);
    
    // Use primary color from theme
    const primaryColor = theme.colors.primary;

    // Initialize state from Redux if available - optimized with early return
    const [selectedDates, setSelectedDates] = useState<{
        startDate: string | null;
        endDate: string | null;
    }>(() => ({
        startDate: existingDateRange?.startDate 
            ? new Date(existingDateRange.startDate).toISOString().split('T')[0] 
            : null,
        endDate: existingDateRange?.endDate 
            ? new Date(existingDateRange.endDate).toISOString().split('T')[0] 
            : null,
    }));

    // Memoized min date - only calculated once
    const minDate = useMemo(getTodayDateString, []);

    // Memoized calendar theme to prevent recreation on every render
    const calendarTheme = useMemo(() => ({
        backgroundColor: WHITE_COLOR,
        calendarBackground: WHITE_COLOR,
        textSectionTitleColor: TEXT_COLOR,
        selectedDayBackgroundColor: primaryColor,
        selectedDayTextColor: WHITE_COLOR,
        todayTextColor: TEXT_COLOR,
        dayTextColor: TEXT_COLOR,
        textDisabledColor: DISABLED_COLOR,
        arrowColor: primaryColor,
        monthTextColor: primaryColor,
        indicatorColor: primaryColor,
        textDayFontFamily: 'System',
        textMonthFontFamily: 'System',
        textDayHeaderFontFamily: 'System',
        textDayFontWeight: '400' as const,
        textMonthFontWeight: '600' as const,
        textDayHeaderFontWeight: '400' as const,
        textDayFontSize: 15,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 13,
    }), [primaryColor]);

    // Optimized marked dates calculation
    const markedDates = useMemo(() => {
        const marked: MarkedDates = {};
        
        if (!selectedDates.startDate) return marked;

        if (!selectedDates.endDate) {
            // Only start date selected
            marked[selectedDates.startDate] = {
                selected: true,
                color: primaryColor,
                textColor: WHITE_COLOR,
                startingDay: true,
                endingDay: true,
            };
        } else {
            // Both dates selected - create range
            const start = new Date(selectedDates.startDate);
            const end = new Date(selectedDates.endDate);
            
            // Mark start date
            marked[selectedDates.startDate] = {
                selected: true,
                color: primaryColor,
                textColor: WHITE_COLOR,
                startingDay: true,
            };
            
            // Mark end date
            marked[selectedDates.endDate] = {
                selected: true,
                color: primaryColor,
                textColor: WHITE_COLOR,
                endingDay: true,
            };
            
            // Mark dates in between - optimized loop
            const dayInMs = 86400000; // 24 * 60 * 60 * 1000
            const startTime = start.getTime() + dayInMs;
            const endTime = end.getTime();
            
            for (let time = startTime; time < endTime; time += dayInMs) {
                const dateString = new Date(time).toISOString().split('T')[0];
                marked[dateString] = {
                    selected: true,
                    color: SELECTED_RANGE_COLOR,
                    textColor: TEXT_COLOR,
                };
            }
        }
        
        return marked;
    }, [selectedDates, primaryColor]);

    const handleDayPress = useCallback((day: DateData) => {
        const selectedDate = day.dateString;
        
        if (!selectedDates.startDate || (selectedDates.startDate && selectedDates.endDate)) {
            // No dates selected or both dates selected - start new selection
            setSelectedDates({
                startDate: selectedDate,
                endDate: null,
            });
        } else {
            // Start date selected, now selecting end date
            const start = new Date(selectedDates.startDate);
            const end = new Date(selectedDate);
            
            if (end < start) {
                // If selected date is before start date, make it the new start date
                setSelectedDates({
                    startDate: selectedDate,
                    endDate: null,
                });
            } else {
                // Normal case - set end date
                setSelectedDates({
                    startDate: selectedDates.startDate,
                    endDate: selectedDate,
                });
            }
        }
    }, [selectedDates]);

    const handleSave = useCallback(() => {
        if (selectedDates.startDate) {
            const savedDateRange: IDateRange = {
                startDate: toISOString(selectedDates.startDate),
                endDate: selectedDates.endDate ? toISOString(selectedDates.endDate) : null,
            };
            
            dispatch(setCreateRequestFormField({dateRange: savedDateRange}));
        }
        
        dispatch(closeBottomSheet());
    }, [selectedDates, dispatch]);

    const handleClose = useCallback(() => {
        dispatch(closeBottomSheet());
    }, [dispatch]);

    const formattedDateRange = useMemo(() => {
        if (!selectedDates.startDate) return null;
        
        if (selectedDates.endDate) {
            return `${formatDate(selectedDates.startDate)} - ${formatDate(selectedDates.endDate)}`;
        }
        return formatDate(selectedDates.startDate);
    }, [selectedDates]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                    <Icon name="close" size={16} color={SECONDARY_TEXT_COLOR}/>
                </TouchableOpacity>
                <View style={styles.headerCenter}>
                    <Text style={styles.headerTitle}>Dates</Text>
                    {formattedDateRange && (
                        <Text style={styles.selectedDatesText}>{formattedDateRange}</Text>
                    )}
                </View>
                <Button 
                    mode="text" 
                    onPress={handleSave}
                    disabled={!selectedDates.startDate}
                    labelStyle={styles.saveButtonLabel}
                    style={styles.saveButton}
                >
                    Save
                </Button>
            </View>
            
            <View style={styles.labelContainer}>
                <Text style={styles.label}>Depart - Return dates</Text>
            </View>
            
            <Calendar
                minDate={minDate}
                onDayPress={handleDayPress}
                markedDates={markedDates}
                markingType="period"
                theme={calendarTheme}
                style={styles.calendar}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE_COLOR,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: BORDER_COLOR,
    },
    closeButton: {
        padding: 4,
        width: 32,
    },
    headerCenter: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: TEXT_COLOR,
    },
    selectedDatesText: {
        fontSize: 12,
        color: SECONDARY_TEXT_COLOR,
        marginTop: 2,
    },
    saveButton: {
        minWidth: 60,
    },
    saveButtonLabel: {
        fontSize: 14,
        fontWeight: "600",
    },
    labelContainer: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: "400",
        color: SECONDARY_TEXT_COLOR,
    },
    calendar: {
        paddingHorizontal: 10,
    },
});