import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
    StyleSheet,
    Keyboard, useWindowDimensions
} from 'react-native';
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetView,
} from '@gorhom/bottom-sheet';

import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import BottomSheetContent from "./BottomSheetContent";
import {closeBottomSheet} from "../../store/bottomSheetSlice/bottomSheetSlice";

export default function CustomBottomSheet() {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const {type, isOpen} = useAppSelector((state) => state.bottomSheet);
    const dispatch = useAppDispatch();
    const {height} = useWindowDimensions()
    const bottomSheetHeight = height * 0.65;

    // Control Bottom Sheet open/close based on Redux state
    useEffect(() => {
        Keyboard.dismiss();
        if (isOpen) {
            bottomSheetRef.current?.expand();
        } else {
            bottomSheetRef.current?.close();
        }
    }, [isOpen]);

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
        dispatch(closeBottomSheet()); // Update Redux after sheet is fully closed
        bottomSheetRef.current?.close();
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
                <BottomSheetContent type={type}/>
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
