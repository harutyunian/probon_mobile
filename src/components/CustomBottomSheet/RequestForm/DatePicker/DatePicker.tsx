import {useMemo, useCallback} from "react";
import {Platform, StyleSheet, View, TouchableOpacity} from "react-native";
import {FlashList} from "@shopify/flash-list";
import {Calendar, useDateRange, toDateId, fromDateId} from "@marceloterreiro/flash-calendar";
import {Text, Button} from "react-native-paper";
import {calendarTheme} from "../../../../contants/theme";
import Icon from "../../../Icon/Icon";
import {useAppDispatch} from "../../../../hooks/redux";
import {closeBottomSheet} from "../../../../store/bottomSheetSlice/bottomSheetSlice";
import {setCreateRequestFormField} from "../../../../store/createRequestFormSlice/createRequestFormSlice";
import {IDateRange} from "../../../../types/requestFormSlice";

const SafeFlashList = Platform.select({
    android: FlashList,
    ios: FlashList,
});

export default function DatePicker() {
    const dispatch = useAppDispatch();
    const dateRangeOne = useDateRange();

    const calendarInitialMonthId = useMemo(() => {
        const today = new Date();
        return toDateId(today);
    }, []);

    const calendarMinDateId = useMemo(() => {
        const today = new Date();
        return toDateId(today);
    }, []);

    const handleSave = useCallback(() => {
        // Extract dates from the date range hook
        // The useDateRange hook provides a dateRange object with startId and endId
        const {dateRange} = dateRangeOne;
        
        if (dateRange?.startId || dateRange?.endId) {
            // Convert Date objects to ISO strings for Redux serialization
            const savedDateRange: IDateRange = {
                startDate: dateRange.startId ? fromDateId(dateRange.startId).toISOString() : null,
                endDate: dateRange.endId ? fromDateId(dateRange.endId).toISOString() : null,
            };
            
            // Save to Redux
            dispatch(setCreateRequestFormField({dateRange: savedDateRange}));
        }
        
        // Close the bottom sheet
        dispatch(closeBottomSheet());
    }, [dateRangeOne, dispatch]);

    const handleClose = useCallback(() => {
        // Just close the bottom sheet without saving
        dispatch(closeBottomSheet());
    }, [dispatch]);

    return <View style={styles.container}>
        <View style={styles.heading}>
            <TouchableOpacity onPress={handleClose}>
                <Icon name="close" size={14} color="grey"/>
            </TouchableOpacity>
            <Text>Dates</Text>
            <Button mode='text' onPress={handleSave}>Save</Button>
        </View>
        <Calendar.List
            CalendarScrollComponent={SafeFlashList}
            calendarInitialMonthId={calendarInitialMonthId}
            calendarMinDateId={calendarMinDateId}
            theme={calendarTheme}
            {...dateRangeOne}
        />
    </View>
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        // todo: 150% heigh poxel a petq
        height: "150%",
    },
    heading: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 14,
    }
})