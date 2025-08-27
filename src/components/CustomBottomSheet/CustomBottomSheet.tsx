import React, {useCallback, useEffect, useRef, memo, useMemo} from 'react';
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

function CustomBottomSheet() {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const {type, isOpen} = useAppSelector((state) => state.bottomSheet);
    const dispatch = useAppDispatch();
    const {height} = useWindowDimensions()
    
    // ✅ OPTIMIZATION #6: Memoize bottom sheet height calculation
    const bottomSheetHeight = useMemo(() => height * 0.65, [height]);

    // ✅ OPTIMIZATION #6: Memoize snap points to prevent recalculation
    const snapPoints = useMemo(() => [bottomSheetHeight, '90%'], [bottomSheetHeight]);

    // Control Bottom Sheet open/close based on Redux state
    useEffect(() => {
        Keyboard.dismiss();
        if (isOpen) {
            bottomSheetRef.current?.expand();
        } else {
            bottomSheetRef.current?.close();
        }
    }, [isOpen]);

    // ✅ OPTIMIZATION #6: Memoize backdrop render function to prevent re-renders
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

    // ✅ OPTIMIZATION #6: Memoize close handlers to prevent child re-renders
    const handleClose = useCallback(() => {
        bottomSheetRef.current?.close(); // Only close, dispatch handled below
    }, []);

    const handleSheetClosed = useCallback(() => {
        dispatch(closeBottomSheet()); // Update Redux after sheet is fully closed
        bottomSheetRef.current?.close();
        Keyboard.dismiss();
    }, [dispatch]);

    // ✅ OPTIMIZATION #6: Memoize keyboard dismiss to prevent recreation
    const handleKeyboardDismiss = useCallback(() => {
        Keyboard.dismiss();
    }, []);

    return (
        <BottomSheet
            enablePanDownToClose={true}
            ref={bottomSheetRef}
            index={-1} // Initially closed
            snapPoints={snapPoints}
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

// ✅ OPTIMIZATION #6: Memoize the entire component to prevent parent re-renders
export default memo(CustomBottomSheet);