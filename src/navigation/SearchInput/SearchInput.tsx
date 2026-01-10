// src/navigation/SearchInput/SearchInput.tsx - IMPROVED
import React, { useCallback } from "react";
import { StyleSheet, useWindowDimensions, View, Pressable } from "react-native";
import { Searchbar, useTheme } from "react-native-paper";
import { openBottomSheet } from "../../store/bottomSheetSlice/bottomSheetSlice";
import { BOTTOM_SHEET } from "../../store/bottomSheetSlice/types";
import { useAppDispatch } from "../../hooks/redux";

export default function SearchInput() {
    const { width } = useWindowDimensions();
    const theme = useTheme();
    const dispatch = useAppDispatch();

    // ✅ Use useCallback to prevent unnecessary re-renders
    const handlePress = useCallback(() => {
        dispatch(openBottomSheet({ type: BOTTOM_SHEET.SEARCH, height: "90%" }));
    }, [dispatch]);

    return (
        <View style={[styles.headerContainer, { backgroundColor: theme.colors.primary }]}>
            {/* ✅ Wrap with Pressable for reliable touch handling on all Android versions */}
            <Pressable onPress={handlePress} style={[styles.searchBarStyle, { width: width * 0.92 }]}>
                {/* ✅ pointerEvents="none" prevents Searchbar from capturing touches */}
                <View pointerEvents="none" style={styles.searchBarInner}>
                    <Searchbar
                        style={styles.searchBarContent}
                        placeholder="Search for a event, package..."
                        value=""
                        editable={false}  // ✅ Prevents keyboard from opening
                    />
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    searchBarStyle: {
        top: 25,
    },
    searchBarInner: {
        width: '100%',
    },
    searchBarContent: {
        backgroundColor: '#FFFFFF',
        height: 56,
        borderRadius: 16,
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