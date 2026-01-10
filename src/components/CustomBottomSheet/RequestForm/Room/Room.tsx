import {useCallback, useMemo, useState} from "react";
import {Pressable, StyleSheet, View} from "react-native";
import {Button, Text, useTheme} from "react-native-paper";
import Icon from "../../../Icon/Icon";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {closeBottomSheet} from "../../../../store/bottomSheetSlice/bottomSheetSlice";
import {setCreateRequestFormField} from "../../../../store/createRequestFormSlice/createRequestFormSlice";
import {IRoomOption, IRoomSelection} from "../../../../types/requestFormSlice";
import CustomCheckBox from "../../../CustomCheckBox/CustomCheckBox";

const ROOM_OPTIONS: IRoomOption[] = [
    {label: "Single room", value: "single"},
    {label: "Double room", value: "double"},
    {label: "Triple room", value: "triple"},
    {label: "Family room", value: "family"},
    {label: "Accessible/Disabled room", value: "accessible"},
    {label: "Studio", value: "studio"},
    {label: "Lux room", value: "lux"},
    {label: "Presidential suite", value: "presidential"},
];

export default function Room() {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const savedRoom = useAppSelector(state => state.createRequestForm.form.room);

    const [selectedTypes, setSelectedTypes] = useState<IRoomOption[]>(savedRoom?.types ?? []);
    const [count, setCount] = useState<number>(savedRoom?.count ?? 1);

    const handleClose = useCallback(() => {
        dispatch(closeBottomSheet());
    }, [dispatch]);

    const handleSave = useCallback(() => {
        const payload: IRoomSelection = {
            types: selectedTypes,
            count,
        };
        dispatch(setCreateRequestFormField({room: payload}));
        dispatch(closeBottomSheet());
    }, [dispatch, selectedTypes, count]);

    const increment = useCallback(() => setCount(c => Math.min(99, c + 1)), []);
    const decrement = useCallback(() => setCount(c => Math.max(1, c - 1)), []);

    const roomList = useMemo(() => ROOM_OPTIONS, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Button mode="text" onPress={handleClose}>
                    <Icon name="close" size={14} color={"grey"}/>
                </Button>
                <Text style={styles.title}>Room</Text>
                <Button mode="text" onPress={handleSave} textColor={theme.colors.primary}>
                    Save
                </Button>
            </View>

            <View style={styles.counterRow}>
                <Text style={styles.counterLabel}>Rooms</Text>
                <View style={styles.counterControls}>
                    <Pressable onPress={decrement} style={styles.circleBtn}>
                        <Text style={styles.counterBtnText}>-</Text>
                    </Pressable>
                    <Text style={styles.counterValue}>{count}</Text>
                    <Pressable onPress={increment} style={styles.circleBtn}>
                        <Text style={styles.counterBtnText}>+</Text>
                    </Pressable>
                </View>
            </View>

            <View style={styles.list}>
                <CustomCheckBox
                    data={roomList}
                    value={selectedTypes}
                    onChange={setSelectedTypes}
                    multiSelect
                />
            </View>
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
    counterRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 4,
    },
    counterLabel: {
        fontSize: 16,
        fontWeight: "500",
        color: "#000",
    },
    counterControls: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    circleBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "#F1EEFF",
        alignItems: "center",
        justifyContent: "center",
    },
    counterBtnText: {
        fontSize: 18,
        fontWeight: "700",
        color: "#5E4DED",
    },
    counterValue: {
        fontSize: 16,
        fontWeight: "600",
        minWidth: 24,
        textAlign: "center",
    },
    list: {
        paddingVertical: 8,
    },
});
