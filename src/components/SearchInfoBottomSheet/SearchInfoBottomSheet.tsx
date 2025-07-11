import {Dimensions, StyleSheet, Text} from "react-native";
import {useCallback, useEffect, useRef, useState} from "react";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import {Searchbar, TextInput} from "react-native-paper";
import {NativeSyntheticEvent} from "react-native/Libraries/Types/CoreEventTypes";
import {TextInputChangeEventData} from "react-native/Libraries/Components/TextInput/TextInput";
import Icon from "../Icon/Icon";
import SearchResult from "./SearchResult/SearchResult";

const {height, width} = Dimensions.get("window");
const bottomSheetHeight = height * 0.65;

export default function SearchInfoBottomSheet() {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const renderBackdrop = useCallback((props: any) => (
        <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            opacity={0.5}
            pressBehavior="close"
        />
    ), []);

    useEffect(() => {
        bottomSheetRef?.current?.expand();
    }, []);

    // todo partadir poxelu es type
    const handleSearchQuery = (e:any) => {
        e.target.value && setSearchQuery(e.target.value);
    }
    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={0}
            snapPoints={[bottomSheetHeight]}
            backdropComponent={renderBackdrop}
        >
            <BottomSheetView
                style={[styles.bottomSheetContainer, {height: bottomSheetHeight}]}>
                <TextInput
                    outlineStyle={{ borderRadius: 16 }}
                    style={[styles.search, {width: width * 0.92}]}
                    mode="outlined"
                    label="Search"
                    left={<TextInput.Icon icon={'magnify'}/>}
                />
                <SearchResult/>
                <SearchResult/>
                <SearchResult/>
                <SearchResult/>
                <SearchResult/>
                <SearchResult/>
            </BottomSheetView>
        </BottomSheet>
    );
}

const styles = StyleSheet.create({
    bottomSheetContainer: {
        display: "flex",
        alignItems: "center",
        paddingVertical: 16,
    },
    search: {
        backgroundColor: "#FFFFFF",
        height: 56,
        borderRadius: 160,
    }
});
