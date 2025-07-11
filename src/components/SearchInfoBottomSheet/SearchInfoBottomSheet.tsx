import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    Text
} from 'react-native';
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetView,
} from '@gorhom/bottom-sheet';
import { TextInput, Button } from 'react-native-paper';

import SearchResult from './SearchResult/SearchResult';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { close } from '../../store/searchSlice/searchSlice';

const { height, width } = Dimensions.get('window');
const bottomSheetHeight = height * 0.65;

export default function SearchInfoBottomSheet() {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const dispatch = useAppDispatch();
    const open = useAppSelector((state) => state.search.open);
    const [searchQuery, setSearchQuery] = useState<string>('');

    // Control Bottom Sheet open/close based on Redux state
    useEffect(() => {
        if (open) {
            bottomSheetRef.current?.expand();
        } else {
            bottomSheetRef.current?.close();
        }
    }, [open]);

    // Render custom backdrop
    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                opacity={0.5}
                pressBehavior="close"
            />
        ),
        []
    );

    // Handle closing the sheet (manually)
    const handleClose = () => {
        bottomSheetRef.current?.close(); // Only close, dispatch handled below
    };

    // Handle sheet animation complete
    const handleSheetClosed = () => {
        dispatch(close()); // Update Redux after sheet is fully closed
    };

    // Input change
    const handleSearchQueryChange = (text: string) => {
        setSearchQuery(text);
    };

    return (
        <BottomSheet
            enablePanDownToClose={true}
            ref={bottomSheetRef}
            index={-1} // Initially closed
            snapPoints={[bottomSheetHeight, '90%']}
            backdropComponent={renderBackdrop}
            onClose={handleSheetClosed} // Called after close animation
        >
            <BottomSheetView style={[styles.bottomSheetContainer, { height: bottomSheetHeight }]}>
                <TextInput
                    outlineStyle={{ borderRadius: 16 }}
                    style={[styles.search, { width: width * 0.92 }]}
                    mode="outlined"
                    label="Search"
                    value={searchQuery}
                    onChangeText={handleSearchQueryChange}
                    left={<TextInput.Icon icon="magnify" />}
                />

                {/* Example search results */}
                <SearchResult />
                <SearchResult />
                <SearchResult />
                <SearchResult />

                <Button mode="contained" style={{ marginTop: 20 }} onPress={handleClose}>
                    Close
                </Button>
            </BottomSheetView>
        </BottomSheet>
    );
}

const styles = StyleSheet.create({
    bottomSheetContainer: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 16,
    },
    search: {
        backgroundColor: '#FFFFFF',
        height: 56,
        borderRadius: 160,
    },
});
