import {useMemo, useCallback, useState} from "react";
import {StyleSheet, View, TouchableOpacity} from "react-native";
import {Calendar, DateData} from "react-native-calendars";
import {Text, Button} from "react-native-paper";
import Icon from "../../../Icon/Icon";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {closeBottomSheet} from "../../../../store/bottomSheetSlice/bottomSheetSlice";
import {setCreateRequestFormField} from "../../../../store/createRequestFormSlice/createRequestFormSlice";
import {IDateRange} from "../../../../types/requestFormSlice";

const PRIMARY_COLOR = '#5E4DED';
const SELECTED_RANGE_COLOR = '#DFDBFB';
const TEXT_COLOR = '#000000';
const DISABLED_COLOR = '#D0D0D0';

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

export default function DatePicker() {
    const dispatch = useAppDispatch();
    const existingDateRange = useAppSelector(state => state.createRequestForm.form.dateRange);

    // Initialize state from Redux if available
    const [selectedDates, setSelectedDates] = useState<{
        startDate: string | null;
        endDate: string | null;
    }>({
        startDate: existingDateRange?.startDate
            ? new Date(existingDateRange.startDate).toISOString().split('T')[0]
            : null,
        endDate: existingDateRange?.endDate
            ? new Date(existingDateRange.endDate).toISOString().split('T')[0]
            : null,
    });

    const minDate = useMemo(() => {
        return new Date().toISOString().split('T')[0];
    }, []);

    const markedDates = useMemo(() => {
        const marked: MarkedDates = {};

        if (!selectedDates.startDate) return marked;

        if (!selectedDates.endDate) {
            // Only start date selected
            marked[selectedDates.startDate] = {
                selected: true,
                color: PRIMARY_COLOR,
                textColor: '#FFFFFF',
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
                color: PRIMARY_COLOR,
                textColor: '#FFFFFF',
                startingDay: true,
            };

            // Mark end date
            marked[selectedDates.endDate] = {
                selected: true,
                color: PRIMARY_COLOR,
                textColor: '#FFFFFF',
                endingDay: true,
            };

            // Mark dates in between
            const currentDate = new Date(start);
            currentDate.setDate(currentDate.getDate() + 1);

            while (currentDate < end) {
                const dateString = currentDate.toISOString().split('T')[0];
                marked[dateString] = {
                    selected: true,
                    color: SELECTED_RANGE_COLOR,
                    textColor: TEXT_COLOR,
                };
                currentDate.setDate(currentDate.getDate() + 1);
            }
        }

        return marked;
    }, [selectedDates]);

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
                startDate: selectedDates.startDate ? new Date(selectedDates.startDate).toISOString() : null,
                endDate: selectedDates.endDate ? new Date(selectedDates.endDate).toISOString() : null,
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

        const formatDate = (dateString: string) => {
            const date = new Date(dateString);
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return `${months[date.getMonth()]} ${date.getDate()}`;
        };

        if (selectedDates.endDate) {
            return `${formatDate(selectedDates.startDate)} - ${formatDate(selectedDates.endDate)}`;
        }
        return formatDate(selectedDates.startDate);
    }, [selectedDates]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                    <Icon name="close" size={16} color="#74717A"/>
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
                theme={{
                    backgroundColor: '#FFFFFF',
                    calendarBackground: '#FFFFFF',
                    textSectionTitleColor: TEXT_COLOR,
                    selectedDayBackgroundColor: PRIMARY_COLOR,
                    selectedDayTextColor: '#FFFFFF',
                    todayTextColor: TEXT_COLOR,
                    dayTextColor: TEXT_COLOR,
                    textDisabledColor: DISABLED_COLOR,
                    arrowColor: PRIMARY_COLOR,
                    monthTextColor: PRIMARY_COLOR,
                    indicatorColor: PRIMARY_COLOR,
                    textDayFontFamily: 'System',
                    textMonthFontFamily: 'System',
                    textDayHeaderFontFamily: 'System',
                    textDayFontWeight: '400',
                    textMonthFontWeight: '600',
                    textDayHeaderFontWeight: '400',
                    textDayFontSize: 15,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 13,
                    'stylesheet.calendar.header': {
                        header: {
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingLeft: 10,
                            paddingRight: 10,
                            marginTop: 6,
                            alignItems: 'center',
                        },
                        monthText: {
                            fontSize: 16,
                            fontWeight: '600',
                            color: PRIMARY_COLOR,
                            margin: 10,
                        },
                        arrow: {
                            padding: 10,
                        },
                    },
                    'stylesheet.day.period': {
                        base: {
                            overflow: 'hidden',
                            height: 34,
                            alignItems: 'center',
                            width: 38,
                        },
                        fillers: {
                            position: 'absolute',
                            height: 34,
                            flexDirection: 'row',
                            left: 0,
                            right: 0,
                        },
                        leftFiller: {
                            height: 34,
                            flex: 1,
                        },
                        rightFiller: {
                            height: 34,
                            flex: 1,
                        },
                        wrapper: {
                            alignItems: 'center',
                            alignSelf: 'stretch',
                            marginLeft: -1,
                            marginRight: -1,
                        },
                    },
                }}
                style={styles.calendar}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#FFFFFF",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#F0F0F0",
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
        color: "#74717A",
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
        color: "#74717A",
    },
    calendar: {
        paddingHorizontal: 10,
    },
});