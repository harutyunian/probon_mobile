import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
    Dimensions,
    StyleSheet,
    Keyboard, View
} from 'react-native';
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetView,
} from '@gorhom/bottom-sheet';

import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {close} from '../../store/searchSlice/searchSlice';
import Search from "./Search/Search";

const {height, width} = Dimensions.get('window');
const bottomSheetHeight = height * 0.65;

export default function SearchInfoBottomSheet() {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const dispatch = useAppDispatch();
    const open = useAppSelector((state) => state.search.open);

    // Control Bottom Sheet open/close based on Redux state
    useEffect(() => {
        Keyboard.dismiss();
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
        Keyboard.dismiss();
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
            <BottomSheetView style={[styles.bottomSheetContainer, {height: bottomSheetHeight}]}>
                <Search/>
            </BottomSheetView>
        </BottomSheet>
    );
}

const styles = StyleSheet.create({
    bottomSheetContainer: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 16,
    }
});
