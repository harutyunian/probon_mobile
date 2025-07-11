import React from "react";
import {Pressable, StyleSheet, useWindowDimensions} from "react-native";
import {Searchbar} from "react-native-paper";
import {useDispatch} from "react-redux";
import {open} from "../../store/searchSlice/searchSlice";

export default function SearchInput() {
    const {width} = useWindowDimensions();
    const dispatch = useDispatch();

    const handlePress = () => {
        dispatch(open())
    }


    return <Searchbar
            style={[styles.searchBarStyle, {width: width * 0.92}]}
            placeholder="Search for a event, package..."
            value={""}
            autoCapitalize="none"
            onPress={handlePress}
        />
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
    },
})