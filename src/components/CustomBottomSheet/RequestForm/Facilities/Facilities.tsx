import {useCallback, useMemo, useState} from "react";
import {ScrollView, StyleSheet, TextInput as RNTextInput, View} from "react-native";
import {Button, Text, useTheme} from "react-native-paper";
import Icon from "../../../Icon/Icon";
import CustomCheckBox from "../../../CustomCheckBox/CustomCheckBox";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {closeBottomSheet} from "../../../../store/bottomSheetSlice/bottomSheetSlice";
import {setCreateRequestFormField} from "../../../../store/createRequestFormSlice/createRequestFormSlice";
import {IFacilityOption} from "../../../../types/requestFormSlice";

const FACILITY_OPTIONS: IFacilityOption[] = [
    {label: "Free wi-fi", value: "wifi"},
    {label: "Parking", value: "parking"},
    {label: "Pool", value: "pool"},
    {label: "Restaurant", value: "restaurant"},
    {label: "Spa & wellness center", value: "spa"},
    {label: "Gym", value: "gym"},
    {label: "Bar", value: "bar"},
    {label: "Room service", value: "room_service"},
];

export default function Facilities() {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const savedFacilities = useAppSelector(state => state.createRequestForm.form.facilities) || [];

    const [selectedFacilities, setSelectedFacilities] = useState<IFacilityOption[]>(savedFacilities);
    const [query, setQuery] = useState("");

    const handleClose = useCallback(() => {
        dispatch(closeBottomSheet());
    }, [dispatch]);

    const handleSave = useCallback(() => {
        dispatch(setCreateRequestFormField({facilities: selectedFacilities}));
        dispatch(closeBottomSheet());
    }, [dispatch, selectedFacilities]);

    const handleChange = useCallback((value: IFacilityOption[]) => {
        setSelectedFacilities(value);
    }, []);

    const filteredOptions = useMemo(() => {
        if (!query.trim()) {
            return FACILITY_OPTIONS;
        }
        const lower = query.toLowerCase();
        return FACILITY_OPTIONS.filter(o => o.label.toLowerCase().includes(lower));
    }, [query]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Button mode="text" onPress={handleClose}>
                    <Icon name="close" size={14} color={"grey"}/>
                </Button>
                <Text style={styles.title}>Facilities</Text>
                <Button mode="text" onPress={handleSave} textColor={theme.colors.primary}>
                    Save
                </Button>
            </View>

            <View style={styles.searchWrapper}>
                <Icon name="search" size={16} color="#8A8A8A" style={styles.searchIcon}/>
                <RNTextInput
                    style={styles.searchInput}
                    placeholder="Search for a facility"
                    placeholderTextColor="#8A8A8A"
                    value={query}
                    onChangeText={setQuery}
                />
            </View>

            <ScrollView>
                <CustomCheckBox
                    data={filteredOptions}
                    value={selectedFacilities}
                    onChange={handleChange}
                    multiSelect
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: 12,
        paddingTop: 4,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: "#000",
    },
    searchWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E0E0E0",
        borderRadius: 12,
        paddingHorizontal: 12,
        marginBottom: 12,
        height: 48,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: "#000",
        paddingVertical: 0,
    },
});
