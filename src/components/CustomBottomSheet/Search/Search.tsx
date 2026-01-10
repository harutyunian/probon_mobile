import SearchResult from "../SearchResult/SearchResult";
import React, { useState } from "react";
import { StyleSheet, View, useWindowDimensions, TextInput } from "react-native";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import Icon from "../../Icon/Icon";

export default function Search() {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const { width } = useWindowDimensions();

    const handleSearchQueryChange = (text: string) => {
        setSearchQuery(text);
    };

    return (
        <View style={styles.container}>
            <View style={[styles.searchContainer, { width: width * 0.92 }]}>
                <Icon name="search" size={20} color="#666" />
                <BottomSheetTextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    placeholderTextColor="#999"
                    value={searchQuery}
                    onChangeText={handleSearchQueryChange}
                />
            </View>
            <SearchResult />
            <SearchResult />
            <SearchResult />
            <SearchResult />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 56,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        marginLeft: 12,
        color: '#333',
    },
});