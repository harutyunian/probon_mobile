import {TextInput} from "react-native-paper";
import SearchResult from "../SearchResult/SearchResult";
import React, {useState} from "react";
import {Dimensions, StyleSheet} from "react-native";


const {width} = Dimensions.get('window');


export default function Search() {
    const [searchQuery, setSearchQuery] = useState<string>('');


    // Input change
    const handleSearchQueryChange = (text: string) => {
        setSearchQuery(text);
    };


    return <> <TextInput
        outlineStyle={{borderRadius: 16}}
        style={[styles.search, {width: width * 0.92}]}
        mode="outlined"
        label="Search"
        value={searchQuery}
        onChangeText={handleSearchQueryChange}
        left={<TextInput.Icon icon="magnify"/>}
    /><SearchResult/>
        <SearchResult/>
        <SearchResult/>
        <SearchResult/>
    </>
}
const styles = StyleSheet.create({
    search: {
        backgroundColor: '#FFFFFF',
        height: 56,
        borderRadius: 160,
    },
})