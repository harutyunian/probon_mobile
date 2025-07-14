import React from "react";
import {View, StyleSheet, useWindowDimensions} from "react-native";
import {Searchbar, useTheme} from "react-native-paper";
import {useDispatch} from "react-redux";
import {open} from "../../store/searchSlice/searchSlice";

export default function SearchInput() {
    const {width} = useWindowDimensions();
    const theme = useTheme();
    const dispatch = useDispatch();

    const handlePress = () => {
        dispatch(open())
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
    },
    headerContainer: {
        height: 150,
        borderBottomRightRadius: 16,
        borderBottomLeftRadius: 16,
        paddingBottom: 12,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});