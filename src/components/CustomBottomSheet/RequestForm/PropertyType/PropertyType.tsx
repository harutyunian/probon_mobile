import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import Icon from "../../../Icon/Icon";
import {Button, useTheme} from "react-native-paper";
import CustomCheckBox from "../../../CustomCheckBox/CustomCheckBox";
import {useCallback, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {closeBottomSheet} from "../../../../store/bottomSheetSlice/bottomSheetSlice";
import {setCreateRequestFormField} from "../../../../store/createRequestFormSlice/createRequestFormSlice";
import {IPropertyTypeOption} from "../../../../types/requestFormSlice";

const data: IPropertyTypeOption[] = [
    { label: "Apartment", value: "apartment" },
    { label: "Hotel", value: "hotel" },
    { label: "Villa", value: "villa" },
    { label: "Resort", value: "resort" },
    { label: "Hostel", value: "hostel" },
    { label: "Motel", value: "motel" },
    { label: "Cottage", value: "cottage" },
    { label: "Lodge", value: "lodge" },
];

export default function PropertyType() {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const savedTypes = useAppSelector(state => state.createRequestForm.form.propertyTypes) || [];
    const [selectedTypes, setSelectedTypes] = useState<IPropertyTypeOption[]>(savedTypes);

    const handleClose = useCallback(() => {
        dispatch(closeBottomSheet());
    }, [dispatch]);

    const handleSave = useCallback(() => {
        dispatch(setCreateRequestFormField({propertyTypes: selectedTypes}));
        dispatch(closeBottomSheet());
    }, [dispatch, selectedTypes]);

    const handleChange = useCallback((value: IPropertyTypeOption[]) => {
        setSelectedTypes(value);
    }, []);

    return <View style={styles.container}>
        <View style={styles.heading}>
            <TouchableOpacity onPress={handleClose}>
                <Icon name="close" size={14} color="grey"/>
            </TouchableOpacity>
            <Text style={styles.title}>Property Type</Text>
            <Button mode="text" onPress={handleSave} textColor={theme.colors.primary}>
                Save
            </Button>
        </View>
        <ScrollView>
            <CustomCheckBox
                onChange={handleChange}
                data={data}
                value={selectedTypes}
                multiSelect
            />
        </ScrollView>
    </View>
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: 8,
    },
    heading: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
        paddingVertical: 14,
        paddingHorizontal: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: "#000",
    }
})