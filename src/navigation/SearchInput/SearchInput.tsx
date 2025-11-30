import React from "react";
import {StyleSheet, useWindowDimensions, View} from "react-native";
import {Searchbar, useTheme} from "react-native-paper";
import {openBottomSheet} from "../../store/bottomSheetSlice/bottomSheetSlice";
import {BOTTOM_SHEET} from "../../store/bottomSheetSlice/types";
import {useAppDispatch} from "../../hooks/redux";

export default function SearchInput() {
    const {width} = useWindowDimensions();
    const theme = useTheme();
    const dispatch = useAppDispatch()

    const handlePress = () => {
        dispatch(openBottomSheet({type: BOTTOM_SHEET.SEARCH, width: "90%"}))
    }


    return <View style={[styles.headerContainer, {backgroundColor: theme.colors.primary}]}>
        <Searchbar
            style={[styles.searchBarStyle, {width: width * 0.92}]}
            placeholder="Search for a event, package..."
            value={""}
            autoCapitalize="none"
            onPress={handlePress}
        />
    </View>
}


const styles = StyleSheet.create({
    searchBarStyle: {
        backgroundColor: '#FFFFFF',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 56,
        borderRadius: 16,
        width: '100%',
        top: 25
    },
    headerContainer: {
        height: 140,
        borderBottomRightRadius: 16,
        borderBottomLeftRadius: 16,
        paddingBottom: 12,
        justifyContent: 'center',
        alignItems: 'center',

    },
});