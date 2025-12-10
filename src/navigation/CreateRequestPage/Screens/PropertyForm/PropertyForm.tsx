import {ScrollView, StyleSheet, View} from "react-native";
import {TextInput} from "react-native-paper";
import {useAppDispatch} from "../../../../hooks/redux";
import {openBottomSheet} from "../../../../store/bottomSheetSlice/bottomSheetSlice";
import {BOTTOM_SHEET} from "../../../../store/bottomSheetSlice/types";


export default function PropertyForm() {
    const dispatch = useAppDispatch();


    const handlePressRating = () => {
        dispatch(openBottomSheet({type: BOTTOM_SHEET.RATING, width: "40%"}))
    }
    const handlePressProperty = () => {
        dispatch(openBottomSheet({type: BOTTOM_SHEET.PROPERTY_TYPE, width: "40%"}))
    }

    return <View style={styles.container}>

        <ScrollView
            contentContainerStyle={styles.formContainer}
            showsVerticalScrollIndicator={false}
        >
            <TextInput
                style={styles.textInput}
                outlineStyle={styles.inputRadius}
                mode="outlined"
                placeholder="Property Type"
                label="Property Type"
                onPress={handlePressProperty}
                left={<TextInput.Icon icon="domain"/>}
            />
            <TextInput
                style={styles.textInput}
                outlineStyle={styles.inputRadius}
                mode="outlined"
                placeholder="Rating"
                label="Rating"
                onPress={handlePressRating}
                left={<TextInput.Icon icon="star-outline"/>}
            />
            <TextInput
                style={styles.textInput}
                outlineStyle={styles.inputRadius}
                mode="outlined"
                placeholder="Facilities"
                label="Facilities"
            />
            <TextInput
                style={styles.textInput}
                outlineStyle={styles.inputRadius}
                mode="outlined"
                placeholder="Room"
                label="Room"
                left={<TextInput.Icon icon="bed-outline"/>}
            />
            <TextInput
                style={styles.textInput}
                outlineStyle={styles.inputRadius}
                mode="outlined"
                placeholder="Room Facilities"
                label="Room Facilities"
            />
            <TextInput
                style={styles.textInput}
                outlineStyle={styles.inputRadius}
                mode="outlined"
                placeholder="Meals"
                label="Meals"
                left={<TextInput.Icon icon="food-fork-drink"/>}
            />
            <TextInput
                style={[styles.textInput, {height: 118}]}
                outlineStyle={styles.inputRadius}
                mode="outlined"
                multiline={true}
                placeholder="Notes"
                numberOfLines={2}
                label="Notes"
                left={<TextInput.Icon icon="note-edit-outline"/>}
            />
        </ScrollView>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    formContainer: {
        paddingVertical: 24,
        paddingHorizontal: 16,
        rowGap: 20
    },
    inputRadius: {
        borderRadius: 16,
    },
    textInput: {
        width: '100%',
        height: 56
    },
    heading: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 16,
    }
})