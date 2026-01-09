import {Pressable, ScrollView, StyleSheet, View} from "react-native";
import {TextInput} from "react-native-paper";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {openBottomSheet} from "../../../../store/bottomSheetSlice/bottomSheetSlice";
import {BOTTOM_SHEET} from "../../../../store/bottomSheetSlice/types";
import {useMemo} from "react";


export default function PropertyForm() {
    const dispatch = useAppDispatch();
    const propertyTypes = useAppSelector(state => state.createRequestForm.form.propertyTypes);
    const rating = useAppSelector(state => state.createRequestForm.form.rating);
    const facilities = useAppSelector(state => state.createRequestForm.form.facilities);
    const meals = useAppSelector(state => state.createRequestForm.form.meals);
    const room = useAppSelector(state => state.createRequestForm.form.room);

    const propertyTypesLabel = useMemo(() => {
        if (!propertyTypes || propertyTypes.length === 0) {
            return "";
        }
        return propertyTypes.map(p => p.label).join(", ");
    }, [propertyTypes]);

    const ratingLabel = useMemo(() => {
        const stars = rating?.ratings;
        if (!stars || stars.length === 0) {
            return "";
        }
        return stars.map(s => `${s}★`).join(", ");
    }, [rating]);

    const facilitiesLabel = useMemo(() => {
        if (!facilities || facilities.length === 0) {
            return "";
        }
        return facilities.map(f => f.label).join(", ");
    }, [facilities]);

    const mealsLabel = useMemo(() => {
        if (!meals || meals.length === 0) {
            return "";
        }
        return meals.map(m => m.label).join(", ");
    }, [meals]);

    const roomLabel = useMemo(() => {
        if (!room || !room.types || room.types.length === 0) {
            return "";
        }
        const types = room.types.map(t => t.label).join(", ");
        return `${types} • ${room.count}`;
    }, [room]);


    const handlePressRating = () => {
        dispatch(openBottomSheet({type: BOTTOM_SHEET.RATING}))
    }
    const handlePressFacilities = () => {
        dispatch(openBottomSheet({type: BOTTOM_SHEET.FACILITIES}))
    }
    const handlePressProperty = () => {
        dispatch(openBottomSheet({type: BOTTOM_SHEET.PROPERTY_TYPE}))
    }
    const handlePressMeals = () => {
        dispatch(openBottomSheet({type: BOTTOM_SHEET.MEALS}))
    }
    const handlePressRoom = () => {
        dispatch(openBottomSheet({type: BOTTOM_SHEET.ROOM}))
    }

    return <View style={styles.container}>

        <ScrollView
            contentContainerStyle={styles.formContainer}
            showsVerticalScrollIndicator={false}
        >
            <Pressable onPress={handlePressProperty} style={styles.textInput}>
                <TextInput
                    style={styles.textInput}
                    outlineStyle={styles.inputRadius}
                    mode="outlined"
                    placeholder="Property Type"
                    label="Property Type"
                    editable={false}
                    pointerEvents="none"
                    value={propertyTypesLabel}
                    left={<TextInput.Icon icon="domain"/>}
                />
            </Pressable>
            <Pressable onPress={handlePressRating} style={styles.textInput}>
                <TextInput
                    style={styles.textInput}
                    outlineStyle={styles.inputRadius}
                    mode="outlined"
                    placeholder="Rating"
                    label="Rating"
                    editable={false}
                    pointerEvents="none"
                    value={ratingLabel}
                    left={<TextInput.Icon icon="star-outline"/>}
                />
            </Pressable>
            <Pressable onPress={handlePressFacilities} style={styles.textInput}>
                <TextInput
                    style={styles.textInput}
                    outlineStyle={styles.inputRadius}
                    mode="outlined"
                    placeholder="Facilities"
                    label="Facilities"
                    editable={false}
                    pointerEvents="none"
                    value={facilitiesLabel}
                    left={<TextInput.Icon icon="checkbox-multiple-marked-outline"/>}
                />
            </Pressable>
            <Pressable onPress={handlePressRoom} style={styles.textInput}>
                <TextInput
                    style={styles.textInput}
                    outlineStyle={styles.inputRadius}
                    mode="outlined"
                    placeholder="Room"
                    label="Room"
                    editable={false}
                    pointerEvents="none"
                    value={roomLabel}
                    left={<TextInput.Icon icon="bed-outline"/>}
                />
            </Pressable>
            <Pressable onPress={handlePressMeals} style={styles.textInput}>
                <TextInput
                    style={styles.textInput}
                    outlineStyle={styles.inputRadius}
                    mode="outlined"
                    placeholder="Meals"
                    label="Meals"
                    editable={false}
                    pointerEvents="none"
                    value={mealsLabel}
                    left={<TextInput.Icon icon="food-fork-drink"/>}
                />
            </Pressable>
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